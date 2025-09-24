import React, { useState } from "react";
import { WidgetSettings } from "../lib/defaultSettings";

export const TabIntegrations = ({ onSave, widgetId, onClose, initialSettings }: { onSave: (data: WidgetSettings) => void, widgetId: string, onClose: () => void, initialSettings: WidgetSettings }) => {
  const [settings, setSettings] = useState<WidgetSettings>(initialSettings);

  const handleChange = (field: keyof WidgetSettings | keyof WidgetSettings["integrations"], value: string | number) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleSubmit = () => {
    onSave(settings);
    onClose();
  };

  return (
    <div className="">
      <label className="block mb-2">Telegram</label>
      <input
        type="text"
        value={settings.integrations.telegram}
        onChange={(e) => handleChange("integrations.telegram", e.target.value)}
        className="w-full mb-4 p-2 rounded bg-[#2b2f45]"
      />
      <label className="block mb-2">Google Analytics</label>
      <input
        type="text"
        value={settings.integrations.googleAnalytics}
        onChange={(e) => handleChange("integrations.googleAnalytics", e.target.value)}
        className="w-full mb-4 p-2 rounded bg-[#2b2f45]"
      />
    </div>
  );
};
