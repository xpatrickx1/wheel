import React, { useState } from "react";
import { WidgetSettings } from "../lib/defaultSettings";

export const TabCode = ({ onSave, widgetId, onClose, initialSettings }: { onSave: (data: WidgetSettings) => void, widgetId: string, onClose: () => void, initialSettings: WidgetSettings }) => {
  const [settings, setSettings] = useState<WidgetSettings>(initialSettings);

  const handleChange = (field: keyof WidgetSettings, value: string | number) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleSubmit = () => {
    onSave(settings);
    onClose();
  };

  return (
    <div className="">
      Код віджета
      <textarea
        value={settings.code}
        onChange={(e) => handleChange("code", e.target.value)}
        className="w-full mb-4 p-2 rounded bg-[#2b2f45]"
      />

      Прямая ссылка на виджет
      <input
        type="text"
        value={settings.link}
        onChange={(e) => handleChange("link", e.target.value)}
        className="w-full mb-4 p-2 rounded bg-[#2b2f45]"
      />

    </div>
  );
};
