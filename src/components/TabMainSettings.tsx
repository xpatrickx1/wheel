import React, { useState } from "react";
import { WidgetSettings } from "../lib/defaultSettings";

export const TabMainSettings = ({ 
  onUpdate,
  widgetId, 
  onClose, 
  settings 
}: { 
  onSave: (data: WidgetSettings) => void, widgetId: string, 
  onClose: () => void, initialSettings: WidgetSettings }) => {
  const [initialSettings, setSettings] = useState<WidgetSettings>(settings);

  const handleChange = (field: keyof WidgetSettings, value: string | number) => {
    setSettings({ ...initialSettings, [field]: value });
  };
  console.log('settings', settings);
  
  const handleSubmit = () => {
    onClose();
  };

  return (
    <div className="">
      {/* Цвет */}
      <label className="block mb-2">Цвет виджета</label>
      <div className="w-full mb-4">
        <div className="flex items-center gap-2 p-2 rounded bg-[#2b2f45]">
          {/* Кружечок з кольором */}
          <div
            className="w-6 h-6 rounded-full border border-gray-400 cursor-pointer"
            style={{ backgroundColor: settings.color }}
            onClick={() => document.getElementById("colorPicker")?.click()}
          />

          {/* Текстове поле з hex */}
          <input
            type="text"
            value={settings.color}
            onChange={(e) => handleChange("color", e.target.value)}
            className="flex-1 bg-transparent outline-none text-white"
          />

          {/* Схований color picker */}
          <input
            id="colorPicker"
            type="color"
            value={settings.color}
            onChange={(e) => handleChange("color", e.target.value)}
            className="hidden"
          />
        </div>
      </div>

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
    </div>
  );
};
