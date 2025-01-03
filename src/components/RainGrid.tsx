import React, { useState, useEffect, useCallback } from 'react';
import { GridCell } from './GridCell';
import { createDrop, updateDrop, Raindrop } from '../utils/rainHelpers';
import { ANIMATION_CONSTANTS } from '../utils/constants';
import { Settings } from '../types';

interface GridState {
  intensity: number;
}

interface RainGridProps {
  settings: Settings;
}

export const RainGrid: React.FC<RainGridProps> = ({ settings }) => {
  const [drops, setDrops] = useState<Raindrop[]>([]);
  const [grid, setGrid] = useState<GridState[][]>([]);
  const [colorIndex, setColorIndex] = useState(0);

  // Initialize empty grid
  const initializeGrid = useCallback(() => {
    return Array(settings.rows).fill(0).map(() => 
      Array(settings.cols).fill({ intensity: 0 })
    );
  }, [settings.rows, settings.cols]);

  // Maintain correct number of drops
  const maintainDropCount = useCallback(() => {
    setDrops(prevDrops => {
      const activeDrops = prevDrops.filter(drop => drop.y < settings.rows);
      const neededDrops = settings.maxDrops - activeDrops.length;
      
      if (neededDrops > 0) {
        const newDrops = Array(neededDrops)
          .fill(0)
          .map(() => createDrop(settings.cols));
        return [...activeDrops, ...newDrops];
      }
      
      return activeDrops;
    });
  }, [settings.maxDrops, settings.cols, settings.rows]);

  // Update drops with smooth movement
  const updateDrops = useCallback(() => {
    setDrops(prevDrops => 
      prevDrops
        .map(drop => updateDrop(drop, settings.speed))
        .filter(drop => drop.y < settings.rows)
    );
  }, [settings.rows, settings.speed]);

  // Color cycling effect
  useEffect(() => {
    const colorInterval = setInterval(() => {
      setColorIndex(prev => (prev + 1) % 5);
    }, ANIMATION_CONSTANTS.COLOR_CHANGE_INTERVAL);
    return () => clearInterval(colorInterval);
  }, []);

  // Initialize drops
  useEffect(() => {
    setDrops(Array(settings.maxDrops)
      .fill(0)
      .map(() => createDrop(settings.cols)));
  }, [settings.maxDrops, settings.cols]);

  // Main animation loop
  useEffect(() => {
    const animationInterval = setInterval(updateDrops, ANIMATION_CONSTANTS.FRAME_RATE);
    const dropCheckInterval = setInterval(maintainDropCount, ANIMATION_CONSTANTS.DROP_CHECK_INTERVAL);
    
    return () => {
      clearInterval(animationInterval);
      clearInterval(dropCheckInterval);
    };
  }, [updateDrops, maintainDropCount]);

  // Update grid state
  useEffect(() => {
    const newGrid = initializeGrid();
    
    drops.forEach(drop => {
      for (let i = 0; i < ANIMATION_CONSTANTS.DROP_LENGTH; i++) {
        const y = Math.floor(drop.y) - i;
        if (y >= 0 && y < settings.rows) {
          const fadeIntensity = drop.intensity * (1 - (i / ANIMATION_CONSTANTS.DROP_LENGTH));
          newGrid[y][drop.x] = { intensity: fadeIntensity };
        }
      }
    });

    setGrid(newGrid);
  }, [drops, settings.rows, initializeGrid]);

  return (
    <div 
      className="grid gap-px p-2 bg-gray-800 rounded-lg shadow-xl border-2 border-blue-900" 
      style={{ 
        gridTemplateColumns: `repeat(${settings.cols}, minmax(0, 1fr))`,
        width: 'fit-content'
      }}
    >
      {grid.map((row, i) => 
        row.map((cell, j) => (
          <GridCell 
            key={`${i}-${j}`} 
            intensity={cell.intensity} 
            colorIndex={colorIndex} 
          />
        ))
      )}
    </div>
  );
};