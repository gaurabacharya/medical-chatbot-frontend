import { useState } from 'react';
import Image from 'next/image';

interface MessageInputProps {
  onSend: (message: string) => void;
  loading: boolean;
}

export default function MessageInput({ onSend, loading }: MessageInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim()) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask me anything about medical related topics..."
        className="w-full bg-white/80 backdrop-blur-sm border rounded-xl px-6 py-4 pr-12 outline-none focus:border-blue-500 transition-colors"
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        disabled={loading}
      />
      <button
        onClick={handleSubmit}
        disabled={loading || !input.trim()}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-blue-600 hover:text-blue-700 disabled:text-gray-300 transition-colors"
      >
        <Image
          src="/Send.svg"
          alt="Send"
          width={24}
          height={24}
          className="opacity-80"
        />
      </button>
    </div>
  );
}
  