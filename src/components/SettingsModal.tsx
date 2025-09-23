import React, { useState } from "react";
import { WidgetSettings, defaultWidgetSettings } from "../lib/defaultSettings";

export const WidgetSettingsModal = ({ onSave, widgetId }: { onSave: (data: WidgetSettings) => void, widgetId: string }) => {
  const [settings, setSettings] = useState<WidgetSettings>(defaultWidgetSettings);

  const handleChange = (field: keyof WidgetSettings, value: string | number) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleSubmit = () => {
    onSave(settings);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-[#1a1d2e] text-white p-6 rounded-2xl w-[400px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Настройки</h2>

        {/* Цвет */}
        <label className="block mb-2">Цвет виджета</label>
        <input
          type="color"
          value={settings.color}
          onChange={(e) => handleChange("color", e.target.value)}
          className="w-full mb-4 p-2 rounded bg-[#2b2f45]"
        />

        {/* Секунды */}
        <label className="block mb-2">Секунд до авто-открытия</label>
        <input
          type="number"
          value={settings.autoOpenDelay}
          onChange={(e) => handleChange("autoOpenDelay", Number(e.target.value))}
          className="w-full mb-4 p-2 rounded bg-[#2b2f45]"
        />

        {/* Остальные поля */}
        {[
          { field: "collectData", label: "Какие данные собираем?" },
          { field: "title", label: "Заголовок" },
          { field: "subtitle", label: "Подзаголовок" },
          { field: "successMessage", label: "Сообщение после выигрыша" },
          { field: "privacyUrl", label: "Ссылка на политику" },
          { field: "phoneRegion", label: "Регион номера по умолчанию" },
          { field: "buttonText", label: "Текст в кнопке" },
          { field: "callFilter", label: "Фильтр звонков" },
          { field: "actionButton", label: "Кнопка действия" }
        ].map(({ field, label }) => (
          <div key={field} className="mb-4">
            <label className="block mb-2">{label}</label>
            <input
              type="text"
              value={settings[field as keyof WidgetSettings]}
              onChange={(e) => handleChange(field as keyof WidgetSettings, e.target.value)}
              className="w-full p-2 rounded bg-[#2b2f45]"
            />
          </div>
        ))}

        {/* Кнопка */}
        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded"
        >
          СОХРАНИТЬ
        </button>
      </div>
    </div>
  );
};
