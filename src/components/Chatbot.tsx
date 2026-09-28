import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User, RotateCcw, Sparkles } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

const N8N_WEBHOOK_URL =
  'https://induganga.app.n8n.cloud/webhook/78d26eaa-826c-472d-b23f-356e9437ac0e/chat';

const SUGGESTIONS = [
  'Tell me about Sunday Sadhya',
  'What are your signature dosas?',
  'Do you have vegan options?',
  'How do I reserve a table?',
];

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'welcome-1',
        sender: 'bot',
        text: 'Vanakkam! 🙏 Welcome to Dakshin Heritage. I am your AI concierge. Ask me about our stone-ground dosas, spices, Sunday Sadhya feast, dietary needs, or table reservations!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
  });

  const [sessionId, setSessionId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize unique session ID for n8n memory persistence
  useEffect(() => {
    let storedSession = sessionStorage.getItem('dakshin_n8n_session');
    if (!storedSession) {
      storedSession = 'session_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
      sessionStorage.setItem('dakshin_n8n_session', storedSession);
    }
    setSessionId(storedSession);
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || input).trim();
    if (!messageText || loading) return;

    const userMessage: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      // Send payload compatible with n8n Chat Trigger node & Webhook nodes
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json, text/plain, */*',
        },
        body: JSON.stringify({
          action: 'sendMessage',
          sessionId: sessionId || 'guest-session',
          chatInput: messageText,
          message: messageText,
          input: messageText,
        }),
      });

      let botReply = '';

      if (response.ok) {
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await response.json();
          // Extract reply from standard n8n chat formats
          if (typeof data === 'string') {
            botReply = data;
          } else if (Array.isArray(data) && data.length > 0) {
            const first = data[0];
            botReply = first.output || first.text || first.message || first.response || JSON.stringify(first);
          } else if (typeof data === 'object' && data !== null) {
            botReply = data.output || data.text || data.message || data.response || data.reply || '';
            if (!botReply && typeof data === 'object') {
              // Check values
              const values = Object.values(data);
              if (values.length > 0 && typeof values[0] === 'string') {
                botReply = values[0] as string;
              } else {
                botReply = JSON.stringify(data);
              }
            }
          }
        } else {
          // Plain text response
          botReply = await response.text();
        }
      } else {
        botReply = `Could not reach the concierge service (Status ${response.status}). Please try again shortly or call us at (212) 555-0372.`;
      }

      if (!botReply) {
        botReply = 'Thank you for your message! Our kitchen and concierge team are at your service.';
      }

      const botMessage: ChatMessage = {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error communicating with n8n chatbot:', error);
      const errorMessage: ChatMessage = {
        id: 'err-' + Date.now(),
        sender: 'bot',
        text: 'Sorry, I am having trouble connecting to the concierge server. Please verify your internet connection or call our restaurant directly at (212) 555-0372.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleResetChat = () => {
    const newSession = 'session_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
    sessionStorage.setItem('dakshin_n8n_session', newSession);
    setSessionId(newSession);
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'bot',
        text: 'Vanakkam! The conversation has been reset. How may I assist you with your Dakshin Heritage dining experience today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <aside aria-label="Dakshin AI Concierge" className="fixed bottom-5 right-5 z-50">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          type="button"
          className="group flex items-center gap-2.5 px-4 py-3 bg-[#B84A24] hover:bg-[#933418] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-[#B84A24]"
          aria-label="Open Dakshin AI Concierge Chat"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-amber-100" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#B84A24]" />
          </div>
          <span className="text-sm font-semibold tracking-wide pr-1">
            Chat with Concierge
          </span>
          <span className="hidden sm:inline-flex items-center text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-black/20 rounded-full text-amber-200">
            n8n AI
          </span>
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[410px] h-[580px] max-h-[85vh] bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E8DEC8] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#B84A24] via-[#C2410C] to-[#933418] text-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-amber-200 backdrop-blur-xs">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#B84A24]" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold leading-tight flex items-center gap-1.5">
                  <span>Dakshin Concierge</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </h3>
                <p className="text-[11px] text-amber-100/90 leading-tight">
                  Powered by n8n AI · Online
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                type="button"
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                title="Reset conversation"
                aria-label="Reset conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                type="button"
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                title="Close chat"
                aria-label="Close chat window"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-[#FAF3EB] border border-[#E8DEC8] text-[#B84A24] flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className="max-w-[78%] space-y-1">
                  <div
                    className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-[#B84A24] text-white rounded-tr-none'
                        : 'bg-white text-[#29221F] border border-[#E8DEC8] rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <div
                    className={`text-[10px] text-[#8C6D58] px-1 ${
                      msg.sender === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-[#E5DBCB] text-[#594A42] flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing / Loading indicator */}
            {loading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-full bg-[#FAF3EB] border border-[#E8DEC8] text-[#B84A24] flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white text-[#594A42] border border-[#E8DEC8] rounded-2xl rounded-tl-none p-3.5 shadow-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#B84A24] rounded-full animate-bounce" />
                  <span
                    className="w-1.5 h-1.5 bg-[#B84A24] rounded-full animate-bounce"
                    style={{ animationDelay: '0.15s' }}
                  />
                  <span
                    className="w-1.5 h-1.5 bg-[#B84A24] rounded-full animate-bounce"
                    style={{ animationDelay: '0.3s' }}
                  />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions pills */}
          <div className="px-3.5 py-2 border-t border-[#E8DEC8] bg-[#F4EFE6] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {SUGGESTIONS.map((sug) => (
              <button
                key={sug}
                type="button"
                onClick={() => handleSendMessage(sug)}
                disabled={loading}
                className="text-[11px] whitespace-nowrap px-2.5 py-1 bg-white hover:bg-[#FAF3EB] text-[#594A42] hover:text-[#B84A24] border border-[#DDCFBC] rounded-full transition-colors shrink-0 disabled:opacity-50"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-[#E8DEC8] flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about dishes, hours, reservations..."
              disabled={loading}
              className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#DDCFBC] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B84A24] text-[#29221F] placeholder-[#8C6D58]"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 bg-[#B84A24] hover:bg-[#933418] disabled:bg-[#DDCFBC] text-white rounded-xl shadow-xs transition-colors flex items-center justify-center shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </aside>
  );
};
