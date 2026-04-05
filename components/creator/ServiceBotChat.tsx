'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { 
  Send, 
  Bot, 
  User, 
  ThumbsUp, 
  ThumbsDown, 
  Clock,
  AlertCircle,
  CheckCircle,
  MessageSquare,
  X,
  Minimize2,
  Maximize2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot' | 'system';
  content: string;
  timestamp: Date;
  confidence?: number;
  suggestedActions?: string[];
  requiresHumanReview?: boolean;
  feedback?: 'helpful' | 'not_helpful';
}

interface QuickAction {
  id: string;
  label: string;
  query: string;
  category: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'payment_status',
    label: 'Check Payment Status',
    query: 'When will I receive my payment?',
    category: 'payment'
  },
  {
    id: 'upload_content',
    label: 'Upload Campaign Content',
    query: 'How do I submit my campaign deliverables?',
    category: 'campaign'
  },
  {
    id: 'update_payment',
    label: 'Update Payment Info',
    query: 'How do I update my payment information?',
    category: 'payment'
  },
  {
    id: 'contact_support',
    label: 'Contact Human Support',
    query: 'I need to speak with a human agent',
    category: 'general'
  }
];

interface ServiceBotChatProps {
  creatorId: string;
  isMinimized?: boolean;
  onMinimize?: () => void;
  onClose?: () => void;
}

export default function ServiceBotChat({ 
  creatorId, 
  isMinimized = false, 
  onMinimize, 
  onClose 
}: ServiceBotChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Initialize with welcome message
    const welcomeMessage: ChatMessage = {
      id: 'welcome',
      type: 'bot',
      content: "Hi! I'm your AI assistant. I can help you with payments, campaigns, technical issues, and general questions. How can I assist you today?",
      timestamp: new Date(),
      confidence: 1.0,
      suggestedActions: ['Check payment status', 'Upload content', 'Contact support']
    };
    
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (content: string, category: string = 'general') => {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Simulate API call to service bot
      const response = await simulateBotResponse(content, category, creatorId);
      
      // Add typing delay for better UX
      setTimeout(() => {
        const botMessage: ChatMessage = {
          id: `bot_${Date.now()}`,
          type: 'bot',
          content: response.response,
          timestamp: new Date(),
          confidence: response.confidence,
          suggestedActions: response.suggestedActions,
          requiresHumanReview: response.requiresHumanReview
        };

        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
        setIsTyping(false);

        // If human review is required, add system message
        if (response.requiresHumanReview) {
          setTimeout(() => {
            const systemMessage: ChatMessage = {
              id: `system_${Date.now()}`,
              type: 'system',
              content: "This query has been forwarded to our human support team for additional assistance.",
              timestamp: new Date()
            };
            setMessages(prev => [...prev, systemMessage]);
          }, 1000);
        }
      }, 1000 + Math.random() * 1000); // 1-2 second delay

    } catch (error) {
      setIsLoading(false);
      setIsTyping(false);
      
      const errorMessage: ChatMessage = {
        id: `error_${Date.now()}`,
        type: 'system',
        content: "I'm experiencing some technical difficulties. Please try again or contact our support team directly.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleQuickAction = (action: QuickAction) => {
    sendMessage(action.query, action.category);
  };

  const handleFeedback = (messageId: string, feedback: 'helpful' | 'not_helpful') => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, feedback } : msg
    ));
    
    // In a real implementation, this would send feedback to the backend
    console.log(`Feedback for message ${messageId}: ${feedback}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={onMinimize}
          className="rounded-full w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 h-[600px] bg-white rounded-lg shadow-2xl border flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-blue-600 text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          <span className="font-medium">AI Assistant</span>
          <div className="flex items-center gap-1 text-xs bg-blue-500 px-2 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Online
          </div>
        </div>
        <div className="flex items-center gap-1">
          {onMinimize && (
            <Button variant="ghost" size="sm" onClick={onMinimize} className="text-white hover:bg-blue-500">
              <Minimize2 className="h-4 w-4" />
            </Button>
          )}
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-blue-500">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] ${
              message.type === 'user' 
                ? 'bg-blue-600 text-white rounded-l-lg rounded-tr-lg' 
                : message.type === 'system'
                ? 'bg-yellow-100 text-yellow-800 rounded-lg border border-yellow-200'
                : 'bg-gray-100 text-gray-900 rounded-r-lg rounded-tl-lg'
            } p-3`}>
              <div className="flex items-start gap-2">
                {message.type === 'bot' && <Bot className="h-4 w-4 mt-0.5 text-blue-600" />}
                {message.type === 'user' && <User className="h-4 w-4 mt-0.5" />}
                {message.type === 'system' && <AlertCircle className="h-4 w-4 mt-0.5" />}
                
                <div className="flex-1">
                  <p className="text-sm">{message.content}</p>
                  
                  {/* Confidence indicator for bot messages */}
                  {message.type === 'bot' && message.confidence !== undefined && (
                    <div className="flex items-center gap-1 mt-2 text-xs opacity-70">
                      <div className={`w-2 h-2 rounded-full ${
                        message.confidence > 0.8 ? 'bg-green-500' :
                        message.confidence > 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      Confidence: {Math.round(message.confidence * 100)}%
                    </div>
                  )}
                  
                  {/* Suggested actions */}
                  {message.suggestedActions && message.suggestedActions.length > 0 && (
                    <div className="mt-2 space-y-1">
                      <p className="text-xs font-medium opacity-70">Suggested actions:</p>
                      {message.suggestedActions.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => sendMessage(action)}
                          className="block w-full text-left text-xs p-2 bg-white bg-opacity-20 rounded hover:bg-opacity-30 transition-colors"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {/* Human review indicator */}
                  {message.requiresHumanReview && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-orange-600">
                      <Clock className="h-3 w-3" />
                      Escalated to human support
                    </div>
                  )}
                </div>
              </div>
              
              {/* Feedback buttons for bot messages */}
              {message.type === 'bot' && !message.feedback && (
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-200">
                  <span className="text-xs opacity-70">Was this helpful?</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFeedback(message.id, 'helpful')}
                    className="h-6 w-6 p-0 hover:bg-green-100"
                  >
                    <ThumbsUp className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFeedback(message.id, 'not_helpful')}
                    className="h-6 w-6 p-0 hover:bg-red-100"
                  >
                    <ThumbsDown className="h-3 w-3" />
                  </Button>
                </div>
              )}
              
              {/* Feedback confirmation */}
              {message.feedback && (
                <div className="flex items-center gap-1 mt-2 pt-2 border-t border-gray-200 text-xs">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">
                    Thank you for your feedback!
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-r-lg rounded-tl-lg p-3 max-w-[80%]">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-blue-600" />
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length === 1 && (
        <div className="p-4 border-t bg-gray-50">
          <p className="text-xs font-medium text-gray-600 mb-2">Quick actions:</p>
          <div className="grid grid-cols-2 gap-2">
            {QUICK_ACTIONS.map((action) => (
              <Button
                key={action.id}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction(action)}
                className="text-xs h-8"
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <Button
            onClick={() => sendMessage(inputValue)}
            disabled={isLoading || !inputValue.trim()}
            size="sm"
            className="px-3"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Press Enter to send • Powered by AI
        </p>
      </div>
    </div>
  );
}

// Simulate bot response (in production, this would call the actual service bot API)
async function simulateBotResponse(query: string, category: string, creatorId: string) {
  const responses = {
    payment: {
      response: "I can help you with payment-related questions. Payments are typically processed within 7-14 business days after campaign completion. You can check your payment status in the dashboard under 'Payments' section.",
      confidence: 0.9,
      suggestedActions: ['Check payment dashboard', 'Review payment terms', 'Contact finance team'],
      requiresHumanReview: false
    },
    campaign: {
      response: "For campaign-related questions, I recommend checking your campaign dashboard first. You can upload deliverables, view requirements, and track progress there. Is there something specific about your campaign you need help with?",
      confidence: 0.85,
      suggestedActions: ['View campaign dashboard', 'Upload content', 'Review brief'],
      requiresHumanReview: false
    },
    technical: {
      response: "I understand you're experiencing a technical issue. Let me help you troubleshoot. First, try clearing your browser cache and cookies, then refresh the page. If the problem persists, try using a different browser.",
      confidence: 0.7,
      suggestedActions: ['Clear browser cache', 'Try different browser', 'Check system status'],
      requiresHumanReview: true
    },
    general: {
      response: "I'm here to help! I can assist with payments, campaigns, technical issues, and general questions. What specific topic would you like help with?",
      confidence: 0.6,
      suggestedActions: ['Ask about payments', 'Campaign questions', 'Technical support', 'Contact human agent'],
      requiresHumanReview: false
    }
  };

  // Check for specific keywords to provide more targeted responses
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('human') || lowerQuery.includes('agent') || lowerQuery.includes('person')) {
    return {
      response: "I understand you'd like to speak with a human agent. I'm connecting you with our support team now. They'll be able to provide more personalized assistance.",
      confidence: 1.0,
      suggestedActions: ['Wait for agent', 'Provide more details'],
      requiresHumanReview: true
    };
  }

  return responses[category as keyof typeof responses] || responses.general;
}