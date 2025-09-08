import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function LoadingDisplay() {
  const loadingMessages = [
    "Cooking something amazing...",
    "Polishing your website...",
    "Applying some magic...",
    "Aligning pixels perfectly...",
    "Mixing the perfect color palette...",
    "Adding a sprinkle of creativity...",
    "Training the design hamsters...",
    "Brewing code magic...",
    "Making it responsive...",
    "Injecting user experience..."
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 2500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="mx-auto max-w-xl bg-gradient-to-br from-slate-50 to-slate-100 border-0 shadow-xl shadow-blue-900/10">
      <CardContent className="flex flex-col items-center justify-center p-12">
        <div className="relative w-28 h-28 mb-8">
          {/* Outer ring */}
          <div className="absolute inset-0 border-4 border-t-blue-500 border-r-purple-500 border-b-violet-600 border-l-pink-500 rounded-full animate-spin"></div>
          
          {/* Middle ring */}
          <div className="absolute inset-2 border-4 border-t-transparent border-r-blue-400 border-b-transparent border-l-violet-400 rounded-full animate-spin-slow"></div>
          
          {/* Inner content */}
          <div className="absolute inset-6 bg-white rounded-full flex items-center justify-center shadow-inner">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-violet-600 rounded-lg animate-pulse"></div>
          </div>
        </div>
        
        <div className="text-center space-y-5">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">
            Creating Your Website
          </h3>
          
          <div className="relative h-8">
            <p className="absolute inset-0 text-gray-600 animate-fade-in-out opacity-100 transition-opacity duration-500 ease-in-out flex items-center justify-center">
              {loadingMessages[messageIndex]}
            </p>
          </div>
          
          <div className="flex justify-center space-x-2 pt-2">
            <div className="h-2 w-2 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full animate-bounce delay-0"></div>
            <div className="h-2 w-2 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full animate-bounce delay-150"></div>
            <div className="h-2 w-2 bg-gradient-to-br from-violet-400 to-violet-600 rounded-full animate-bounce delay-300"></div>
            <div className="h-2 w-2 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full animate-bounce delay-450"></div>
          </div>

          <div className="w-full max-w-xs bg-gray-100 rounded-full h-1.5 mt-6">
            <div className="bg-gradient-to-r from-blue-500 to-violet-500 h-1.5 rounded-full animate-progress"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}