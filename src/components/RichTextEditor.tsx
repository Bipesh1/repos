"use client";

import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export type RichTextEditorHandle = {
  getContent: () => string;
};

interface RichTextEditorProps {
  initialContent?: string;
  onChange?: (content: string) => void;
}

const RichTextEditor = forwardRef<RichTextEditorHandle, RichTextEditorProps>(
  ({ initialContent = '', onChange }, ref) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<Quill | null>(null);
    const uniqueId = useRef(`quill-editor-${Math.random().toString(36).substring(2, 9)}`);

    useEffect(() => {
      // Clean up function to remove any existing Quill instances
      const cleanupQuill = () => {
        // Find and remove any existing toolbar that might be associated with this instance
        const container = editorRef.current;
        if (container) {
          const toolbars = container.parentElement?.querySelectorAll('.ql-toolbar');
          toolbars?.forEach(toolbar => toolbar.remove());
        }
        
        // Nullify quill reference
        quillRef.current = null;
      };

      // Initialize only if the editor ref exists and we don't have an instance
      if (editorRef.current && !quillRef.current) {
        // Clean up any existing instances first
        cleanupQuill();
        
        // Add a unique ID to help with cleanup
        if (editorRef.current) {
          editorRef.current.id = uniqueId.current;
        }
        
        // Initialize new Quill instance with image button removed from toolbar
        quillRef.current = new Quill(editorRef.current, {
          theme: 'snow',
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link'], // Removed 'image' from here
              ['clean'],
            ],
          },
          placeholder: 'Write something...',
        });

        // Set initial content
        if (initialContent) {
          quillRef.current.root.innerHTML = initialContent;
        }

        // Set up change handler
        quillRef.current.on('text-change', () => {
          if (onChange && quillRef.current) {
            onChange(quillRef.current.root.innerHTML);
          }
        });
      } else if (quillRef.current && initialContent !== quillRef.current.root.innerHTML) {
        // Update content if initialContent prop changes
        quillRef.current.root.innerHTML = initialContent;
      }

      // Return cleanup function
      return () => {
        cleanupQuill();
      };
    }, [initialContent, onChange]);

    useImperativeHandle(ref, () => ({
      getContent: () => {
        if (quillRef.current) {
          return quillRef.current.root.innerHTML;
        }
        return '';
      },
    }));

    return (
      <div className="quill-wrapper" style={{ position: 'relative' }}>
        <div ref={editorRef} style={{ height: '300px', background: 'white' }} />
      </div>
    );
  }
);

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;