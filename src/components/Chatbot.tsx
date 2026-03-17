import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import Markdown from 'react-markdown';

const systemInstruction = `Bạn là trợ lý ảo của SmartGIS - Bản Đồ Thông Minh. Nhiệm vụ của bạn là trả lời các câu hỏi của khách hàng về SmartGIS dựa trên thông tin sau:
- Giới thiệu: SmartGIS là hệ thống giải pháp thông minh ứng dụng bản đồ, kết nối dữ liệu thuộc tính với vị trí địa lý. Quản lý trên server, nền tảng Java, giao diện web.
- Tính năng: Tạo/nhập dữ liệu không gian, tổ chức quản lý, trực quan hóa, phân tích. Upload file không giới hạn, quản lý bài viết quy hoạch, tra cứu thông minh, đọc dữ liệu qua mã màu, phân quyền dữ liệu, tích hợp dịch vụ công.
- Ứng dụng: Quy hoạch đô thị, Nông nghiệp, Môi trường, Khí tượng thủy văn, Giao thông, Chính quyền địa phương, Y tế, Giáo dục.
- Bảng giá: Vui lòng liên hệ trực tiếp để nhận báo giá chi tiết cho các dịch vụ (Phí thiết kế - khởi tạo, Phần mềm tra cứu trên web, Chuyển giao license máy chủ).
- Liên hệ: MobiFone Vĩnh Long và Công ty CP Lera Group. Email: Info@smartgis.vn. Website: smartgis.vn.
Hãy trả lời ngắn gọn, lịch sự, chuyên nghiệp bằng tiếng Việt.`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: 'Xin chào! Tôi là trợ lý ảo của SmartGIS. Tôi có thể giúp gì cho bạn?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<any>(null);

  useEffect(() => {
    if (!chatRef.current && process.env.GEMINI_API_KEY) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        chatRef.current = ai.chats.create({
          model: 'gemini-3-flash-preview',
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.2,
          }
        });
      } catch (e) {
        console.error("Failed to initialize Gemini API", e);
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    if (!chatRef.current) {
      setMessages(prev => [...prev, { role: 'model', text: 'Lỗi: Không tìm thấy API Key của Gemini. Vui lòng cấu hình trong phần cài đặt.' }]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await chatRef.current.sendMessage({ message: userMsg });
      setMessages(prev => [...prev, { role: 'model', text: response.text }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: 'Xin lỗi, đã có lỗi xảy ra khi kết nối với máy chủ. Vui lòng thử lại sau.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-emerald-600 text-white rounded-full shadow-xl hover:bg-emerald-700 transition-all duration-300 z-50 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Mở chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 w-[calc(100vw-3rem)] sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden flex flex-col h-[500px] max-h-[80vh] transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="bg-emerald-600 text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6" />
            <span className="font-semibold">SmartGIS Assistant</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-emerald-100 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'model' && (
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="h-5 w-5 text-emerald-600" />
                </div>
              )}
              <div 
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                  msg.role === 'user' 
                    ? 'bg-emerald-600 text-white rounded-tr-sm' 
                    : 'bg-white text-gray-800 border border-gray-200 rounded-tl-sm shadow-sm'
                }`}
              >
                {msg.role === 'model' ? (
                  <div className="text-sm">
                    <Markdown
                      components={{
                        p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                        li: ({node, ...props}) => <li className="" {...props} />,
                        strong: ({node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />,
                        a: ({node, ...props}) => <a className="text-emerald-600 hover:underline" {...props} />
                      }}
                    >
                      {msg.text}
                    </Markdown>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap text-sm">{msg.text}</p>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-2">
                <Loader2 className="h-4 w-4 text-emerald-600 animate-spin" />
                <span className="text-sm text-gray-500">Đang trả lời...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-gray-200">
          <div className="flex gap-2 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nhập câu hỏi của bạn..."
              className="flex-1 resize-none rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 p-3 pr-12 text-sm max-h-32 min-h-[44px] outline-none transition-all"
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 bottom-2 p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600 transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
