import { useEffect, useState } from 'react';
import { Settings } from 'lucide-react';

interface Drop {
  x: number;
  y: number;
  length: number;
  speed: number;
  colorPhase: number; // Represents the current phase in the gradient
}

export default function RainGrid() {
  const [gridSize, setGridSize] = useState({ rows: 15, cols: 20 });
  const [drops, setDrops] = useState<Drop[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(100); // Speed in milliseconds

  // Initialize drops
  useEffect(() => {
    const initialDrops = Array.from({ length: 7 }, () => createNewDrop(gridSize.cols));
    setDrops(initialDrops);
  }, [gridSize.cols]);

  // Animation loop
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setDrops((currentDrops) => {
        return currentDrops.map((drop) => {
          // If drop is out of bounds, reset it
          if (drop.y >= gridSize.rows + drop.length) {
            return createNewDrop(gridSize.cols);
          }
          return { ...drop, y: drop.y + drop.speed, colorPhase: (drop.colorPhase + 1) % 360 };
        });
      });
    }, speed);

    return () => clearInterval(interval);
  }, [gridSize, isPaused, speed]);

  // Create a new drop with random properties
  function createNewDrop(cols: number): Drop {
    return {
      x: Math.floor(Math.random() * cols),
      y: -Math.floor(Math.random() * 5),
      length: Math.floor(Math.random() * 3) + 5,
      speed: Math.random() * 0.3 + 0.2,
      colorPhase: Math.floor(Math.random() * 360),
    };
  }

  // Get the color of a cell based on its position relative to the raindrop
  function getCellColor(row: number, col: number): string {
    for (const drop of drops) {
      const relativePos = row - Math.floor(drop.y);
      if (col === drop.x && relativePos >= 0 && relativePos < drop.length) {
        const opacity = 1 - relativePos / drop.length;
        // Create a gradient that cycles through colors based on the color phase
        return `hsla(${drop.colorPhase}, 100%, 50%, ${opacity})`;
      }
    }
    return 'transparent';
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center py-8">
      {/* Header with title and controls */}
      <div className="mb-6 flex items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-100">Digital Rain</h1>
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-pink-700"
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        <button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className="p-2 text-pink-500 hover:text-green-400"
        >
          <Settings size={24} />
        </button>
      </div>

      {/* Settings panel */}
      {isSettingsOpen && (
        <div className="mb-4 p-4 bg-gray-800 rounded shadow-lg">
          <div className="flex gap-4">
            <div>
              <label className="text-white">Rows:</label>
              <input
                type="number"
                value={gridSize.rows}
                onChange={(e) =>
                  setGridSize((prev) => ({ ...prev, rows: Math.max(5, parseInt(e.target.value) || 5) }))
                }
                className="ml-2 w-20 px-2 py-1 bg-gray-700 text-white rounded"
              />
            </div>
            <div>
              <label className="text-white">Columns:</label>
              <input
                type="number"
                value={gridSize.cols}
                onChange={(e) =>
                  setGridSize((prev) => ({ ...prev, cols: Math.max(5, parseInt(e.target.value) || 5) }))
                }
                className="ml-2 w-20 px-2 py-1 bg-gray-700 text-white rounded"
              />
            </div>
            <div>
              <label className="text-white">Speed (ms):</label>
              <input
                type="number"
                value={speed}
                onChange={(e) => setSpeed(Math.max(50, parseInt(e.target.value) || 50))}
                className="ml-2 w-20 px-2 py-1 bg-gray-700 text-white rounded"
              />
            </div>
          </div>
        </div>
      )}

      {/* Grid display */}
      <div
        className="grid gap-px bg-gray-800 p-1 rounded-lg shadow-2xl"
        style={{
          gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
          width: `${gridSize.cols * 25}px`,
        }}
      >
        {Array.from({ length: gridSize.rows * gridSize.cols }).map((_, index) => {
          const row = Math.floor(index / gridSize.cols);
          const col = index % gridSize.cols;
          return (
            <div
              key={index}
              className="w-6 h-6 rounded-sm border border-gray-700 transition-colors duration-100"
              style={{
                backgroundColor: getCellColor(row, col),
                boxShadow:
                  getCellColor(row, col) !== 'transparent'
                    ? '0 0 10px rgba(255, 255, 255, 0.5)'
                    : 'none',
              }}
            />
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-6 text-gray-400 text-center">
        <p>Adjust grid size and speed using the settings button above</p>
        <p>Watch how the digital rain creates beautiful patterns 🤍</p>
      </div>
    </div>
  );
}
