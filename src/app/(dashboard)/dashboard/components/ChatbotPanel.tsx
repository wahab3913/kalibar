'use client';

import type React from 'react';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Send,
  Bot,
  User,
  Sparkles,
  TrendingUp,
  Users,
  Clock,
  Truck,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const suggestedQuestions = [
  "What's our delivery performance today?",
  'Which drivers are performing best this week?',
  'Show me routes with delays',
  "What's causing delivery failures?",
  'Compare this week vs last week',
  'Which zones need optimization?',
];

const sampleResponses = {
  "What's our delivery performance today?": {
    content:
      "Today's delivery performance is strong with 2,847 completed deliveries and a 94.2% success rate. We're running 8% ahead of yesterday's numbers. Average delivery time is 24.3 minutes, which is 2.1 minutes faster than our target. The main challenge areas are Zone C (87% success rate) and afternoon time slots (15% slower than morning).",
    suggestions: [
      'Show me Zone C details',
      'Why are afternoons slower?',
      'Which drivers are in Zone C?',
    ],
  },
  'Which drivers are performing best this week?': {
    content:
      'Top performers this week:\n\n1. **Sarah Johnson (#156)** - 347 deliveries, 100% success rate, 18% faster than average\n2. **Mike Chen (#203)** - 312 deliveries, 98.7% success rate, 12% faster than average\n3. **Lisa Rodriguez (#089)** - 298 deliveries, 97.3% success rate, 8% faster than average\n\nThese drivers consistently optimize their routes and maintain excellent customer communication.',
    suggestions: [
      'What makes Sarah so efficient?',
      'Show me underperforming drivers',
      'How can we replicate their success?',
    ],
  },
  'Show me routes with delays': {
    content:
      'Current routes experiencing delays:\n\n🔴 **Route 47** - Driver #247, 15 minutes behind schedule\n- Traffic congestion on Highway 101\n- 3 deliveries remaining\n\n🟡 **Route 23** - Driver #134, 8 minutes behind schedule\n- Customer unavailable at 2 stops\n- 5 deliveries remaining\n\n🟡 **Route 12** - Driver #098, 6 minutes behind schedule\n- Construction detour added 12 minutes\n- 2 deliveries remaining',
    suggestions: [
      'How can we prevent these delays?',
      'Reroute suggestions for Route 47',
      'Contact customers for Route 23',
    ],
  },
};

export function ChatbotTab() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content:
        "Hello! I'm your AI delivery operations assistant. I can help you analyze performance data, identify trends, and provide actionable insights. What would you like to know about your operations?",
      timestamp: new Date(),
      suggestions: suggestedQuestions.slice(0, 3),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = sampleResponses[
        content as keyof typeof sampleResponses
      ] || {
        content: `I understand you're asking about "${content}". Based on your current operational data, I can provide insights about delivery performance, driver analytics, route optimization, and operational efficiency. Let me analyze the relevant data and provide you with actionable recommendations.`,
        suggestions: [
          "Show me today's metrics",
          'Analyze driver performance',
          'Route optimization tips',
        ],
      };

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        suggestions: response.suggestions,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            AI Operations Assistant
          </h2>
          <p className="text-muted-foreground">
            Ask questions about your delivery data in natural language
          </p>
        </div>
        <Badge className="bg-accent/10 text-accent border-accent/20">
          <Sparkles className="h-3 w-3 mr-1" />
          AI Powered
        </Badge>
      </div>

      {/* Chat Container */}
      <Card className="flex-1 flex flex-col border-border bg-card">
        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex gap-3',
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.type === 'assistant' && (
                  <Avatar className="h-8 w-8 bg-primary">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={cn(
                    'max-w-[80%] space-y-2',
                    message.type === 'user' ? 'items-end' : 'items-start'
                  )}
                >
                  <div
                    className={cn(
                      'rounded-lg px-4 py-2 text-sm',
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground ml-auto'
                        : 'bg-muted text-foreground'
                    )}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>

                  {message.suggestions && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs border-border hover:bg-accent hover:text-accent-foreground"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>

                {message.type === 'user' && (
                  <Avatar className="h-8 w-8 bg-secondary">
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start">
                <Avatar className="h-8 w-8 bg-primary">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted text-foreground rounded-lg px-4 py-2 text-sm">
                  <div className="flex items-center gap-1">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    </div>
                    <span className="text-muted-foreground ml-2">
                      Analyzing data...
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-border p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about delivery performance, driver analytics, routes..."
              className="flex-1 bg-input border-border text-foreground"
              disabled={isTyping}
            />
            <Button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>

          {/* Quick Actions */}
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-xs text-muted-foreground mr-2">
              Quick questions:
            </span>
            {suggestedQuestions.slice(0, 4).map((question, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => handleSendMessage(question)}
                className="text-xs h-7 px-2 text-muted-foreground hover:text-foreground hover:bg-accent"
                disabled={isTyping}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
