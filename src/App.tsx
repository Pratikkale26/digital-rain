import { useState } from 'react';
import { RainGrid } from './components/RainGrid';
import { SettingsPanel } from './components/SettingsPanel';
import { Settings } from './types';
import { Terminal } from 'lucide-react';

function App() {
  const [settings, setSettings] = useState<Settings>({
    rows: 15,
    cols: 20,
    speed: 50,
    maxDrops: 10,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Header */}
      <header className="bg-gray-900 border-b border-blue-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-center gap-3">
          <Terminal className="w-8 h-8 text-gray-500" />
          <h1 className="text-3xl font-extrabold text-green-400 tracking-wide">
            Digital Rain Matrix
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 sm:px-8 lg:px-10 flex items-center justify-center ">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <div className="w-full md:w-3/5">
            <RainGrid settings={settings} />
          </div>
          <div className="w-full md:w-2/5 bg-gray-800 rounded-lg shadow-lg ">
            <SettingsPanel settings={settings} onSettingsChange={setSettings} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-center">
          <p className="text-sm text-gray-400">
            &copy; 2025 Pratik Digital Rain Matrix. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
