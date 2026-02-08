import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Sparkles } from 'lucide-react';
import { useRecordAcceptance } from '@/hooks/useAcceptance';

interface YesOnlyProposalProps {
  onAccept: () => void;
}

export default function YesOnlyProposal({ onAccept }: YesOnlyProposalProps) {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noAttempts, setNoAttempts] = useState(0);
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const recordAcceptance = useRecordAcceptance();

  const messages = [
    "Are you sure? 🥺",
    "Please? Pretty please? 💕",
    "Think about it... 💭",
    "You know you want to say yes! 😊",
    "Come on, Astha! 💖",
    "Just say yes already! 🌹"
  ];

  const handleNoHover = () => {
    if (noButtonRef.current) {
      const container = noButtonRef.current.parentElement;
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const buttonRect = noButtonRef.current.getBoundingClientRect();
        
        const maxX = containerRect.width - buttonRect.width - 20;
        const maxY = containerRect.height - buttonRect.height - 20;
        
        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;
        
        setNoButtonPosition({ x: newX, y: newY });
        setNoAttempts(prev => prev + 1);
        setYesButtonSize(prev => Math.min(prev + 0.15, 2));
      }
    }
  };

  const handleYesClick = async () => {
    await recordAcceptance.mutateAsync("She said YES! 💕");
    onAccept();
  };

  useEffect(() => {
    // Increase yes button size over time
    const interval = setInterval(() => {
      if (noAttempts > 0) {
        setYesButtonSize(prev => Math.min(prev + 0.05, 2));
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [noAttempts]);

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
      <Card className="max-w-2xl w-full bg-white/95 dark:bg-pink-950/95 backdrop-blur-sm border-pink-300 dark:border-pink-700 shadow-2xl">
        <CardHeader className="text-center space-y-4 pb-4">
          <div className="flex justify-center">
            <img 
              src="/assets/generated/heart-mascot.dim_800x800.png" 
              alt="Heart mascot"
              className="w-48 h-48 object-contain animate-bounce"
            />
          </div>
          <CardTitle className="text-4xl md:text-5xl font-bold text-pink-600 dark:text-pink-400 flex items-center justify-center gap-3">
            <Heart className="w-10 h-10 fill-current animate-pulse" />
            Hey Astha!
            <Heart className="w-10 h-10 fill-current animate-pulse" />
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-8">
          <div className="text-center space-y-4">
            <p className="text-2xl md:text-3xl font-semibold text-pink-700 dark:text-pink-300">
              Will you be my Valentine? 💝
            </p>
            <p className="text-lg text-pink-600 dark:text-pink-400 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              Let's make this Valentine's Day magical together!
              <Sparkles className="w-5 h-5" />
            </p>
          </div>

          {noAttempts > 0 && (
            <div className="text-center p-4 bg-pink-100 dark:bg-pink-900/50 rounded-lg animate-pulse">
              <p className="text-lg font-medium text-pink-700 dark:text-pink-300">
                {messages[Math.min(noAttempts - 1, messages.length - 1)]}
              </p>
            </div>
          )}

          <div className="relative min-h-[200px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-6">
              <Button
                onClick={handleYesClick}
                disabled={recordAcceptance.isPending}
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xl px-12 py-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                style={{
                  transform: `scale(${yesButtonSize})`,
                  transition: 'transform 0.3s ease-in-out'
                }}
              >
                {recordAcceptance.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⏳</span>
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Heart className="w-6 h-6 fill-current" />
                    YES! 💕
                    <Heart className="w-6 h-6 fill-current" />
                  </span>
                )}
              </Button>

              <Button
                ref={noButtonRef}
                onMouseEnter={handleNoHover}
                onTouchStart={handleNoHover}
                onClick={handleNoHover}
                variant="outline"
                size="sm"
                className="absolute border-pink-300 text-pink-600 hover:bg-pink-50 dark:border-pink-700 dark:text-pink-400 dark:hover:bg-pink-900/30 transition-all duration-200"
                style={{
                  left: `${noButtonPosition.x}px`,
                  top: `${noButtonPosition.y}px`,
                  position: 'absolute'
                }}
              >
                No 😢
              </Button>
            </div>
          </div>

          {noAttempts > 3 && (
            <div className="text-center text-sm text-pink-500 dark:text-pink-400 italic">
              <p>Hint: The "No" button is shy... but the "Yes" button is getting bigger! 😉</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
