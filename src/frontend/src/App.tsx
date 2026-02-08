import { useState } from 'react';
import YesOnlyProposal from './components/proposal/YesOnlyProposal';
import SuccessCelebration from './components/proposal/SuccessCelebration';

function App() {
  const [hasAccepted, setHasAccepted] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/generated/valentine-bg.dim_1920x1080.png)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100/80 via-rose-50/70 to-pink-200/80 dark:from-pink-950/80 dark:via-rose-900/70 dark:to-pink-800/80" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {!hasAccepted ? (
          <YesOnlyProposal onAccept={() => setHasAccepted(true)} />
        ) : (
          <SuccessCelebration />
        )}
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-sm text-pink-700 dark:text-pink-300">
        <p>
          © 2026. Built with <span className="text-red-500">♥</span> using{' '}
          <a 
            href="https://caffeine.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:text-pink-900 dark:hover:text-pink-100 transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
