interface MessageBubbleProps {
    message: string;
    sender: 'user' | 'assistant';
  }
  
  export default function MessageBubble({ message, sender }: MessageBubbleProps) {
    const alignment = sender === 'user' ? 'justify-end' : 'justify-start';
    const bgColor = sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800';
  
    return (
      <div className={`flex ${alignment} mb-2`}>
        <div className={`max-w-xs px-4 py-2 rounded-2xl ${bgColor}`}>
          {message}
        </div>
      </div>
    );
  }