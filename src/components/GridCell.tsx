import React from 'react';
import { getDropColor } from '../utils/colorHelpers';

interface GridCellProps {
  intensity: number;
  colorIndex: number;
}

export const GridCell: React.FC<GridCellProps> = ({ intensity, colorIndex }) => {
  const backgroundColor = intensity > 0 ? getDropColor(colorIndex, intensity) : 'rgb(17, 24, 39)';

  return (
    <div
      className="w-5 h-5 rounded-sm transition-colors duration-150 border border-gray-800"
      style={{ backgroundColor }}
    />
  );
};