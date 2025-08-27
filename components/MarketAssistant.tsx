import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { streamChatResponse } from '../services/geminiService';
import { ICONS } from '../constants';

const MarketAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'bot', text: 'Hello! Need help listing your produce? Ask me for pricing tips, description ideas, or selling advice!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const systemInstruction = "You are an AI assistant for the 'Farm Connect' direct market. You help farmers with listing their produce. You can suggest prices, write good descriptions, and give tips on how to attract buyers. Keep your advice practical and encouraging.";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { sender: 'user', text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    let botResponse = '';
    setMessages(prev => [...prev, { sender: 'bot', text: '' }]);

    try {
      for await (const chunk of streamChatResponse(newMessages, systemInstruction)) {
        botResponse += chunk;
        setMessages(prev => {
          const lastMsg = prev[prev.length - 1];
          if (lastMsg && lastMsg.sender === 'bot') {
            return [...prev.slice(0, -1), { sender: 'bot', text: botResponse }];
          }
          return prev;
        });
      }
    } catch (error) {
      console.error("Failed to get AI response:", error);
      setMessages(prev => {
         const lastMsg = prev[prev.length - 1];
          if (lastMsg && lastMsg.sender === 'bot') {
            return [...prev.slice(0, -1), { sender: 'bot', text: 'Sorry, I encountered an error.' }];
          }
          return prev;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-600 text-white rounded-full p-4 shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-transform transform hover:scale-110"
          aria-label="Toggle Market Assistant"
        >
          <ICONS.MarketChat className="h-8 w-8" />
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 left-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl z-50 flex flex-col transition-all duration-300 ease-in-out">
          <div className="bg-green-700 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Market Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-200 hover:text-white">&times;</button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
            {messages.map((msg, index) => (
              <div key={index} className={`flex mb-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-lg px-4 py-2 max-w-xs lg:max-w-md ${msg.sender === 'user' ? 'bg-green-600 text-white' : 'bg-white text-gray-800'}`}>
                  {msg.text || <span className="animate-pulse">...</span>}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t bg-white rounded-b-lg">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask for selling advice..."
                className="flex-1 border rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                className="bg-green-600 text-white px-4 rounded-r-md hover:bg-green-700 disabled:bg-green-300"
                disabled={isLoading}
              >
                {isLoading ? '...' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MarketAssistant;