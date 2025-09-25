import React from "react";
import { WidgetSettings } from "../lib/defaultSettings";
import { Help } from "../ui/help";

export const TabBonus = ({
  onUpdate,
  settings,
}: {
  onUpdate: (data: Partial<WidgetSettings>) => void;
  settings: WidgetSettings;
}) => {
  const handleChange = (index: number, field: keyof { value: string; is_participating: boolean }, value: string | boolean) => {
    const newBonuses = [...settings.bonuses];
    const updatedBonus = { ...newBonuses[index], [field]: value };
    newBonuses[index] = updatedBonus;
    onUpdate({ bonuses: newBonuses });
  };

  return (
    <div className="p-4">
      <Help>Укажите от одного до восьми бонусов</Help>
      {settings.bonuses.map((bonus, i) => (
        <div key={i} className="mb-4">
          <label className="block mb-2 text-left">Бонус #{i + 1}</label>
          <input
            type="text"
            value={bonus.value}
            onChange={(e) => handleChange(i, "value", e.target.value)}
            className="w-full p-2 rounded bg-[#2b2f45] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center mt-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={bonus.is_participating}
                onChange={(e) => handleChange(i, "is_participating", e.target.checked)}
                className="sr-only peer"
              />
              <div className={`peer-checked relative w-5 h-5 border-2 border-gray-500 bg-gray-700 peer-checked:border-blue-500 peer-checked:bg-blue-500 transition-colors duration-200 ease-in-out ${bonus.is_participating ? 'peer-checked' : ''}`}></div>
            </label>
            <label className="ml-2 text-xs text-white">Участвует в розыгрыше</label>
          </div>
        </div>
      ))}
    </div>
  );
};