import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { streamChatResponse } from '../services/geminiService';
import { useTranslation } from '../hooks/useTranslation';

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'bot', text: t('aiAssistant.greeting') }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const systemInstruction = 'You are a helpful assistant for the Voice of Bharat platform. You provide concise, helpful information about Indian government schemes, education, health, and welfare. Be polite and encouraging.';

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
            return [...prev.slice(0, -1), { sender: 'bot', text: t('aiAssistant.error') }];
          }
          return prev;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-orange-500 text-white rounded-full p-4 shadow-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-transform transform hover:scale-110"
          aria-label="Toggle AI Assistant"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" /><path d="M13 16h-2v-6h2v6zm-1-7.5c-.827 0-1.5-.673-1.5-1.5s.673-1.5 1.5-1.5 1.5.673 1.5 1.5-.673 1.5-1.5 1.5z" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl z-50 flex flex-col transition-all duration-300 ease-in-out">
          <div className="bg-gray-800 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">{t('aiAssistant.title')}</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white">&times;</button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
            {messages.map((msg, index) => (
              <div key={index} className={`flex mb-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-lg px-4 py-2 max-w-xs lg:max-w-md ${msg.sender === 'user' ? 'bg-orange-500 text-white' : 'bg-white text-gray-800'}`}>
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
                placeholder={t('aiAssistant.placeholder')}
                className="flex-1 border rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                className="bg-orange-500 text-white px-4 rounded-r-md hover:bg-orange-600 disabled:bg-orange-300"
                disabled={isLoading}
              >
                {isLoading ? t('aiAssistant.sending') : t('aiAssistant.send')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AiAssistant;