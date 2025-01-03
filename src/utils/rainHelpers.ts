import { ANIMATION_CONSTANTS } from './constants';

export interface Raindrop {
  x: number;
  y: number;
  length: number;
  intensity: number;
  lastUpdate: number;
  velocity: number; // Added velocity for smooth movement
}

// Create a new raindrop with consistent properties
export const createDrop = (cols: number): Raindrop => ({
  x: Math.floor(Math.random() * cols),
  y: 0,
  length: ANIMATION_CONSTANTS.DROP_LENGTH,
  intensity: Math.random() * 0.5 + 0.5,
  lastUpdate: Date.now(),
  velocity: 0.1 + Math.random() * 0.1 // Random initial velocity
});

// Update drop with smooth movement
export const updateDrop = (drop: Raindrop, speed: number): Raindrop => {
  const currentTime = Date.now();
  const deltaTime = currentTime - drop.lastUpdate;
  
  // Convert speed (ms) to movement rate (smaller speed = faster movement)
  const speedFactor = 1 - (speed - ANIMATION_CONSTANTS.MIN_SPEED) / 
                         (ANIMATION_CONSTANTS.MAX_SPEED - ANIMATION_CONSTANTS.MIN_SPEED);
  
  // Calculate new position
  const newY = drop.y + (drop.velocity * speedFactor * deltaTime * 0.1);
  
  return {
    ...drop,
    y: newY,
    lastUpdate: currentTime
  };
};