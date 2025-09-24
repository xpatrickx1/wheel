import React, { useState } from "react";
import { WidgetSettings } from "../lib/defaultSettings";

export const TabBonus = ({
  onUpdate,
  widgetId,
  onClose,
  settings,
}: {
  onUpdate: (data: Partial<WidgetSettings>) => void;
  widgetId: string;
  onClose: () => void;
  settings: WidgetSettings;
}) => {
  const handleChange = (index: number, value: string) => {
    const newBonuses = [...settings.bonuses];
    newBonuses[index] = value;
    onUpdate({ bonuses: newBonuses }); // Передаємо оновлені bonuses
  };

  return (
    <div className="p-4">
      {settings.bonuses.map((bonus, i) => (
        <div key={i} className="mb-4">
          <label className="block mb-2 text-white">Бонус {i + 1}</label>
          <input
            type="text"
            value={bonus}
            onChange={(e) => handleChange(i, e.target.value)}
            className="w-full p-2 rounded bg-[#2b2f45] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}
    </div>
  );
};