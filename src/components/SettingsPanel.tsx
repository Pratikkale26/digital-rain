import React from 'react';
import { Settings } from '../types';
import { Sliders, Droplets, Gauge } from 'lucide-react';
import { ANIMATION_CONSTANTS } from '../utils/constants';

interface SettingsPanelProps {
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ 
  settings, 
  onSettingsChange 
}) => {
  const handleChange = (key: keyof Settings, value: number) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-80 border-2 border-blue-900">
      <div className="flex items-center gap-2 mb-6">
        <Sliders className="w-5 h-5 text-red-500" />
        <h2 className="text-xl font-semibold text-red-500">Controls</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Gauge className="w-4 h-4 text-red-500" />
            <label className="text-sm font-medium text-red-400">
              Speed Control
            </label>
          </div>
          <input
            type="range"
            min={ANIMATION_CONSTANTS.MIN_SPEED}
            max={ANIMATION_CONSTANTS.MAX_SPEED}
            value={settings.speed}
            onChange={(e) => handleChange('speed', Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm text-gray-400">{settings.speed}ms</span>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="w-4 h-4 text-red-500" />
            <label className="text-sm font-medium text-red-400">
              Rain Intensity
            </label>
          </div>
          <input
            type="range"
            min="1"
            max="20"
            value={settings.maxDrops}
            onChange={(e) => handleChange('maxDrops', Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm text-gray-400">{settings.maxDrops} drops</span>
        </div>
      </div>
    </div>
  );
};