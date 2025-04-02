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

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase
        .from('message')
        .select('*')
        .eq('channel_id', channelId)
        .order('created_at', { ascending: true });
      setMessages(data || []);
    };

    const subscription = supabase
      .channel('realtime-messages')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'message',
        filter: `channel_id=eq.${channelId}`
      }, (payload) => {
        setMessages((msgs) => [...msgs, payload.new]);
      })
      .subscribe();

    fetchMessages();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [channelId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    
    await supabase.from('message').insert({
      channel_id: channelId,
      sender_id: currentUser.id,
      sender_name: currentUser.name,
      text: newMessage
    });
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