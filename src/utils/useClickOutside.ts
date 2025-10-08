import { useEffect } from 'react';

export const useClickOutside = (selector: string, setOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(selector)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selector, setOpen]);
};