import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Calendar, Sparkles } from 'lucide-react';
import HeartsConfetti from './HeartsConfetti';
import { useGetLatestRecord, useGetAcceptanceCount } from '@/hooks/useAcceptance';

export default function SuccessCelebration() {
  const { data: latestRecord } = useGetLatestRecord();
  const { data: acceptanceCount } = useGetAcceptanceCount();

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000); // Convert nanoseconds to milliseconds
    return date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <>
      <HeartsConfetti />
      
      <div className="container mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
        <Card className="max-w-2xl w-full bg-white/95 dark:bg-pink-950/95 backdrop-blur-sm border-pink-300 dark:border-pink-700 shadow-2xl">
          <CardHeader className="text-center space-y-4 pb-4">
            <div className="flex justify-center relative">
              <img 
                src="/assets/generated/valentine-stickers.dim_1024x1024.png" 
                alt="Valentine stickers"
                className="w-64 h-64 object-contain animate-pulse"
              />
            </div>
            <CardTitle className="text-4xl md:text-5xl font-bold text-pink-600 dark:text-pink-400 flex items-center justify-center gap-3">
              <Heart className="w-12 h-12 fill-current animate-bounce" />
              Yay! She Said YES!
              <Heart className="w-12 h-12 fill-current animate-bounce" />
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-8">
            <div className="text-center space-y-6">
              <div className="p-6 bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/50 dark:to-rose-900/50 rounded-2xl">
                <p className="text-3xl md:text-4xl font-bold text-pink-700 dark:text-pink-300 mb-4">
                  Astha, you've made me the happiest! 💖
                </p>
                <p className="text-xl text-pink-600 dark:text-pink-400">
                  I can't wait to spend this Valentine's Day with you!
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 text-lg text-pink-600 dark:text-pink-400">
                <Sparkles className="w-6 h-6 animate-spin" />
                <span className="font-semibold">This moment is saved forever!</span>
                <Sparkles className="w-6 h-6 animate-spin" />
              </div>

              {latestRecord && (
                <div className="p-4 bg-pink-50 dark:bg-pink-900/30 rounded-lg border-2 border-pink-200 dark:border-pink-700">
                  <div className="flex items-center justify-center gap-2 text-pink-700 dark:text-pink-300 mb-2">
                    <Calendar className="w-5 h-5" />
                    <span className="font-semibold">Acceptance Recorded:</span>
                  </div>
                  <p className="text-pink-600 dark:text-pink-400">
                    {formatDate(latestRecord.timestamp)}
                  </p>
                  {acceptanceCount !== undefined && acceptanceCount > 0 && (
                    <p className="text-sm text-pink-500 dark:text-pink-500 mt-2">
                      Total acceptances: {acceptanceCount.toString()} 💕
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-4 pt-4">
                <p className="text-2xl font-semibold text-pink-700 dark:text-pink-300">
                  What should we do together? 🌹
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { emoji: '🍽️', text: 'Romantic Dinner' },
                    { emoji: '🎬', text: 'Movie Night' },
                    { emoji: '🌅', text: 'Sunset Walk' },
                    { emoji: '🎨', text: 'Creative Date' }
                  ].map((option, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/40 dark:to-rose-900/40 rounded-xl border-2 border-pink-200 dark:border-pink-700 hover:scale-105 transition-transform cursor-pointer"
                    >
                      <span className="text-3xl mb-2 block">{option.emoji}</span>
                      <span className="text-pink-700 dark:text-pink-300 font-medium">
                        {option.text}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-pink-500 dark:text-pink-400 italic">
                  They all sound perfect because I'll be with you! 💕
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
