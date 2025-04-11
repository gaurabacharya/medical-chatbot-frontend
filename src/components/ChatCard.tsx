'use client';

import { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import { sendMessage } from '../lib/api';

interface Message {
  sender: 'user' | 'assistant';
  text: string;
}

export default function ChatCard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [introText, setIntroText] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (msg: string) => {
    const newMessages: Message[] = [...messages, { sender: 'user' as const, text: msg }];
    setMessages(newMessages);
    setLoading(true);
    setIntroText(false);

    try {
      const reply = await sendMessage(msg);
      setMessages([...newMessages, { sender: 'assistant' as const, text: reply }]);
    } catch (err) {
      console.error('Error sending message:', err);
      setMessages([...newMessages, { 
        sender: 'assistant' as const, 
        text: `Error: ${err instanceof Error ? err.message : 'Failed to contact the server.'}` 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const suggestionQuestions = [
    "What is type 2 diabetes?",
    "What is the best treatment for high cholesterol?",
    "What is the best medicine for skin rashes?"
  ];

  return (
    <div className="fixed inset-0 flex flex-col bg-white">
      {/* Gradient Background */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#869EFF] to-[#89BCFF] opacity-75 blur-3xl rounded-full" />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0 relative">
        {introText && (
          <div className="text-center pt-36">
            <img src="/public-health.svg" alt="logo" className="w-24 h-24 mb-6 mx-auto" />
            <h2 className="text-2xl font-medium text-gray-800 mb-16">Ask our Medical AI Anything</h2>
          </div>
        )}
        
        {/* Scrollable Messages Container */}
        <div className="flex-1 overflow-y-auto px-4">
          <div className="w-full max-w-3xl mx-auto space-y-4 py-4">
            {messages.map((msg, index) => (
              <MessageBubble key={index} message={msg.text} sender={msg.sender} />
            ))}
            {loading && <MessageBubble message="Typing..." sender="assistant" />}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Bottom Section with Suggestions and Input - Fixed */}
      <div className="w-full relative bg-transparent">
        {introText && (
          <div className="max-w-3xl mx-auto px-4 py-6">
            <p className="text-gray-600 mb-4">Suggestions on what to ask our Medical AI</p>
            <div className="flex gap-3 justify-between">
              {suggestionQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(question)}
                  className="p-4 text-left bg-gray-100 rounded-xl border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-all w-[32%]"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="max-w-3xl mx-auto p-4 pb-12">
          <MessageInput onSend={handleSend} loading={loading} />
        </div>
      </div>
    </div>
  );
}
