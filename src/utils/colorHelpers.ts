// Available colors for the drops
export const COLORS = [
  { r: 255, g: 0, b: 0 },    // Red
  { r: 0, g: 255, b: 0 },    // Green
  { r: 255, g: 255, b: 0 },  // Yellow
  { r: 0, g: 255, b: 255 },  // Cyan
  { r: 255, g: 0, b: 255 },  // Magenta
];

// Get color based on colorIndex and intensity
export const getDropColor = (colorIndex: number, intensity: number) => {
  const color = COLORS[colorIndex % COLORS.length];
  return `rgb(${Math.floor(color.r * intensity)}, ${Math.floor(color.g * intensity)}, ${Math.floor(color.b * intensity)})`;
};