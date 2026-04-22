import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrls: ['./chatbot.css']
})
export class ChatbotComponent {
  messages: Message[] = [
    { 
      sender: 'bot', 
      text: 'Hello  How can I help you today?',
      timestamp: new Date()
    }
  ];

  userInput = '';
  isOpen = false;
  isTyping = false;
  
  // Context tracking for intelligent responses
  private conversationContext: string[] = [];
  private userName: string = '';

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  async sendMessage() {
    if (!this.userInput.trim()) return;

    const userMessage = this.userInput.trim();
    this.messages.push({ 
      sender: 'user', 
      text: userMessage,
      timestamp: new Date()
    });

    this.conversationContext.push(userMessage);
    this.userInput = '';
    
    this.isTyping = true;
    
    try {
      const reply = await this.getClaudeResponse(userMessage);
      
      setTimeout(() => {
        this.messages.push({ 
          sender: 'bot', 
          text: reply,
          timestamp: new Date()
        });
        this.isTyping = false;
        this.scrollToBottom();
      }, 500);
    } catch (error) {
      setTimeout(() => {
        this.messages.push({ 
          sender: 'bot', 
          text: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date()
        });
        this.isTyping = false;
        this.scrollToBottom();
      }, 500);
    }
  }

  async getClaudeResponse(message: string): Promise<string> {
    try {
      // na3mlou historique de conversation
      const conversationHistory = this.messages
        .slice(-6) // e5er 6 messages
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        }));

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `You are a helpful, friendly chatbot assistant. Keep responses concise (2-3 sentences max) and conversational. Be warm and engaging. If the user shares their name, remember it and use it naturally in conversation.`,
          messages: [
            ...conversationHistory,
            { role: 'user', content: message }
          ]
        })
      });

      const data = await response.json();
      
      if (data.content && data.content[0]) {
        return data.content[0].text;
      }
      
      return "I'm here to help! What would you like to know?";
    } catch (error) {
      console.error('API Error:', error);
      return this.getFallbackResponse(message);
    }
  }

  getFallbackResponse(message: string): string {
    const msg = message.toLowerCase();

    // Name extraction
    if (msg.includes('my name is') || msg.includes("i'm ") || msg.includes("i am ")) {
      const nameMatch = msg.match(/(?:my name is|i'm|i am)\s+([a-z]+)/i);
      if (nameMatch) {
        this.userName = nameMatch[1];
        return `Nice to meet you, ${this.userName}! How can I help you today?`;
      }
    }

    //taslim
    if (msg.includes('hello') || msg.includes('hi ') || msg === 'hi') {
      const greeting = this.userName 
        ? `Hello ${this.userName}! ` 
        : 'Hello! ';
      return `${greeting} How can I assist you today?`;
    }

    // as2ela
    if (msg.includes('what can you do') || msg.includes('help me')) {
      return 'I can chat with you, answer questions, provide information, and help with various topics. What would you like to know?';
    }

    // Angular related
    if (msg.includes('angular')) {
      return 'Angular is a powerful framework!  Are you working on a specific Angular project or do you have questions about it?';
    }

    // How are you
    if (msg.includes('how are you')) {
      return "I'm doing great, thanks for asking!  How can I help you today?";
    }

    // Thanks
    if (msg.includes('thank')) {
      return "You're very welcome! Let me know if you need anything else!";
    }

    // Goodbye
    if (msg.includes('bye') || msg.includes('goodbye')) {
      const farewell = this.userName 
        ? `Goodbye ${this.userName}! ` 
        : 'Goodbye! ';
      return `${farewell} Feel free to come back anytime!`;
    }

    // Default with context awareness
    if (this.conversationContext.length > 1) {
      return "That's interesting! Could you tell me more about that? Or is there something specific I can help you with?";
    }

    return "I'm here to help! Could you tell me more about what you'd like to know? ";
  }

  scrollToBottom() {
    setTimeout(() => {
      const messagesContainer = document.querySelector('.messages');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }, 100);
  }
}