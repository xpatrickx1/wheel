import { useEffect, useRef, useCallback } from "react";
import createWheel from "../core/createWheel";

export function useWheel(options) {
  const containerRef = useRef(null);
  const wheelInstanceRef = useRef(null);

  const initializeWheel = useCallback(() => {
    if (!containerRef.current || wheelInstanceRef.current) return;

    try {
      wheelInstanceRef.current = createWheel(containerRef.current.id, options);
    } catch (error) {
      console.error('Failed to initialize wheel:', error);
    }
  }, [options]);

  const destroyWheel = useCallback(() => {
    if (wheelInstanceRef.current) {
      // Очистка, якщо createWheel повертає метод destroy
      if (typeof wheelInstanceRef.current.destroy === 'function') {
        wheelInstanceRef.current.destroy();
      }
      
      // Видаляємо DOM елементи
      const container = containerRef.current;
      if (container) {
        const wheelElements = container.querySelectorAll('.widget-wheel-wrap, .widget-open-btn');
        wheelElements.forEach(el => el.remove());
      }
      
      wheelInstanceRef.current = null;
    }
  }, []);

  useEffect(() => {
    // Ініціалізація при монтуванні
    const timeoutId = setTimeout(initializeWheel, 100);
    
    // Очистка при демонтажі
    return () => {
      clearTimeout(timeoutId);
      destroyWheel();
      
      // Видаляємо наші стилі
      const style = document.getElementById('wheel-react-styles');
      if (style) style.remove();
    };
  }, [initializeWheel, destroyWheel]);

  // Переініціалізація при зміні опцій
  useEffect(() => {
    if (wheelInstanceRef.current) {
      destroyWheel();
      initializeWheel();
    }
  }, [options, destroyWheel, initializeWheel]);

  return containerRef;
}