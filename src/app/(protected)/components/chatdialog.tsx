"use client";
import { useState, useEffect, useRef } from 'react';
import { supabase }  from '@/lib/supabase';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Send } from 'lucide-react';

export default function ChatDialog({
  open,
  onOpenChange,
  channelId,
  currentUser
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  channelId: string;
  currentUser: { id: string; name: string };
}) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const subscriptionRef = useRef<any>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Only set up subscription when the dialog is open
    if (!open) return;

    const fetchMessages = async () => {
      const { data } = await supabase
        .from('message')
        .select('*')
        .eq('channel_id', channelId)
        .order('created_at', { ascending: true });
      setMessages(data || []);
    };

    // Create a unique channel name using the channelId to prevent conflicts
    const channelName = `messages-for-channel-${channelId}`;
    
    // Set up the subscription with the unique channel name
    subscriptionRef.current = supabase
      .channel(channelName)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'message',
        filter: `channel_id=eq.${channelId}`
      }, (payload) => {
        // Check if this message is already in our state to prevent duplicates
        setMessages((currentMessages) => {
          if (!currentMessages.some(msg => msg.id === payload.new.id)) {
            return [...currentMessages, payload.new];
          }
          return currentMessages;
        });
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log(`Subscribed to channel: ${channelName}`);
        }
      });

    fetchMessages();

    // Clean up subscription when component unmounts or dialog closes
    return () => {
      if (subscriptionRef.current) {
        console.log(`Unsubscribing from channel: ${channelName}`);
        supabase.removeChannel(subscriptionRef.current);
      }
    };
  }, [channelId, open]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    
    const { data, error } = await supabase.from('message').insert({
      channel_id: channelId,
      sender_id: currentUser.id,
      sender_name: currentUser.name,
      text: newMessage
    }).select();
    
    if (error) {
      console.error("Error sending message:", error);
      return;
    }
    
    // Immediately add the new message to the local state
    // This gives immediate feedback to the sender
    if (data && data[0]) {
      setMessages((msgs) => [...msgs, data[0]]);
    }
    
    setNewMessage('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl h-[80vh] flex flex-col bg-white shadow-2xl rounded-xl border-none">
        <DialogHeader className="border-b border-gray-200 pb-4">
          <DialogTitle className="text-xl font-bold text-gray-800">
            Chat Conversation
          </DialogTitle>
        </DialogHeader>
        
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender_id === currentUser.id 
                  ? 'items-end' 
                  : 'items-start'
              }`}
            >
              <div 
                className={`
                  max-w-[75%] p-3 rounded-lg shadow-sm 
                  ${msg.sender_id === currentUser.id 
                    ? 'bg-indigo-500 text-white' 
                    : 'bg-white text-gray-800 border border-gray-200'
                  }
                `}
              >
                <div className="font-semibold text-sm mb-1">
                  {msg.sender_name}
                </div>
                <div className="text-base">{msg.text}</div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Message Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="
              bg-white
                flex-1 
                border 
                border-gray-300 
                rounded-full 
                px-4 
                py-2 
                focus:outline-none 
                focus:ring-2 
                focus:ring-indigo-500
                text-gray-700
              "
              placeholder="Type a message..."
            />
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="
                bg-indigo-500 
                text-white 
                p-2 
                rounded-full 
                hover:bg-indigo-600 
                transition-colors 
                disabled:opacity-50
                disabled:cursor-not-allowed
                flex items-center justify-center
              "
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}