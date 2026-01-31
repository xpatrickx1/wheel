import React from 'react';
import { useTheme } from '../theme/ThemeContext';

export function ToggleButton() {
  const { toggleTheme, theme } = useTheme();

  return <button onClick={toggleTheme}>{ theme === 'light' ? '🌞' : '🌜' }</button>;
}
