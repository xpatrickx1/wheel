import React, { useState } from "react";
import { WidgetSettings } from "../lib/defaultSettings";
import { Help } from "../ui/help";

export const TabMainSettings = ({ 
  onUpdate,
  settings 
}: { 
  onUpdate: (data: WidgetSettings) => void,
  settings: WidgetSettings
 }) => {
  const [initialSettings, setSettings] = useState<WidgetSettings>(settings);

  const handleChange = (field: keyof WidgetSettings, value: string | number) => {
    setSettings({ ...initialSettings, [field]: value });
    onUpdate({ ...initialSettings, [field]: value });
  };
  

  return (
    <div className="pt-4">
      {/* Цвет */}
      <label className="block text-left mb-2 relative">Цвет виджета</label>
      <div className="w-full mb-4 relative">
        <div className="flex items-center gap-2 p-2 rounded bg-[#2b2f45] relative">
          {/* Кружечок з кольором */}
          <div
            className="w-6 h-6 rounded-full border border-gray-400 cursor-pointer "
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
      <div className="mb-4">
        <label className="block text-left mb-2">Секунд до авто-открытия</label>
        <input
          type="number"
          value={settings.autoOpenDelay}
          onChange={(e) => handleChange("autoOpenDelay", Number(e.target.value))}
          className="w-full  p-2 rounded bg-[#2b2f45]"
        />
        <Help>Укажите, через сколько секунд окно с виджетом откроется автоматически или оставьте поле пустым</Help>
      </div>

      <div className="mb-4">
        <label className="block text-left mb-2">Какие данные собираем?</label>
        <select
          value={settings.collectData}
          onChange={(e) => handleChange("collectData", e.target.value)}
          className="w-full p-2 rounded bg-[#2b2f45]"
        >
          <option value="tel">Телефон</option>
          <option value="email">Email</option>
          <option value="message">не собираем</option>
        </select>
        <Help>Опция «не собираем данные» доступна только при активном тарифе «Эксперт»</Help>
      </div>

      {/* Остальные поля */}
      {[
        { field: "title", label: "Заголовок" },
        { field: "subtitle", label: "Подзаголовок" },
        { field: "successMessage", label: "Сообщение после выигрыша" },
        { field: "privacyUrl", label: "Ссылка на политику" },
        { field: "phoneRegion", label: "Регион номера по умолчанию" },
        { field: "buttonText", label: "Текст в кнопке", helpText: "Текст в кнопке для старта вращения колеса" },
        { field: "callFilter", label: "Фильтр заявок", helpText: "Заявка не будет учитываться, если такой номер телефона или email уже был ранее" },
      ].map(({ field, label, helpText }) => (
        <div key={field} className="mb-4">
          <label className="block text-left mb-2">{label}</label>
          <input
            type="text"
            value={settings[field as keyof WidgetSettings]}
            onChange={(e) => handleChange(field as keyof WidgetSettings, e.target.value)}
            className="w-full p-2 rounded bg-[#2b2f45]"
          />
          {helpText && <Help>{helpText}</Help>}
        </div>
      ))}
      <div className="mb-4">
        <label className="block text-left mb-2">Кнопка действия</label>
        <select
          value={settings.actionButton}
          onChange={(e) => handleChange("collectData", e.target.value)}
          className="w-full p-2 rounded bg-[#2b2f45]"
        >
          <option value="off">Кнопка отключена</option>
          <option value="on">Кнопка включена</option>
        </select>
        <Help>Возможность увести клиента в мессенджер или на страницу после отправки заявки</Help>
      </div>
    </div>
  );
};
