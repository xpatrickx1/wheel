// wheel/components/WheelWidget.jsx
import React, { useEffect, useRef } from 'react';
import { useWheel } from "../wheel/react/useWheel";

const WheelWidget = ({ options, containerId = "wheel-container", isPreview = false }) => {
//   const wheelRef = useWheel(options);

  const wheelRef = useWheel({
    ...options,
    showOpenButton: !isPreview 
  });
  useEffect(() => {
    if (!isPreview) return;
    
    const removeButton = () => {
      const buttons = document.querySelectorAll('.widget-open-btn');
      buttons.forEach(button => button.remove());
    };
    
    // Чекаємо поки кнопка з'явиться
    const timer = setTimeout(removeButton, 300);
    
    return () => clearTimeout(timer);
  }, [isPreview]);
  return (
    <div 
      ref={wheelRef} 
      id={containerId}
      className="wheel-widget-container"
      style={{

      }}
    />
  );
};

export default WheelWidget;