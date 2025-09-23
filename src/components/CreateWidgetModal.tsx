import React from 'react';

interface CreateWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  widgetName: string;
  setWidgetName: (name: string) => void;
  onCreateWidget: () => void;
}

export function CreateWidgetModal({
  isOpen,
  onClose,
  widgetName,
  setWidgetName,
  onCreateWidget,
}: CreateWidgetModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (widgetName.trim()) {
      onCreateWidget();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-60 flex items-center justify-center z-50">
      <div className="relative bg-[#2b2f40] rounded-0 p-10 w-full max-w-md mx-4">
        <a
            onClick={onClose}
            className="absolute right-4 top-4 w-10 h-10 border-none outline-none hover:border-none bg-transparent flex items-center justify-center group"
            >
            <span className="absolute w-5 h-0.5 bg-gray-400 group-hover:bg-gray-600 transition-all duration-200 rotate-45"></span>
            <span className="absolute w-5 h-0.5 bg-gray-400 group-hover:bg-gray-600 transition-all duration-200 -rotate-45"></span>
        </a>

        <h2 className="text-xl mb-4 font-bold text-center">Створити віджет</h2>
        
        <p className="text-gray-600 mb-4">Вкажіть назву віджета</p>
        
        <form className="w-full flex gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            value={widgetName}
            onChange={(e) => setWidgetName(e.target.value)}
            placeholder="Новий віджет"
            className="w-full p-3 border border-gray-500 rounded-0 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          
          <div className="flex ">
            <button
              type="submit"
              disabled={!widgetName.trim()}
              className="bg-blue-600 max-h-[50px] hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-1 px-4 rounded-0 transition"
            >
              Створити
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
