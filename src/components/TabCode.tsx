import React, { useState } from "react";
import { WidgetSettings } from "../lib/defaultSettings";
import { Help } from "../ui/help";

export const TabCode = ({ 
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
    <div className="">
      <div className="modal_p">Код віджета</div>
      <Help>
        Добавьте этот код на сайт перед тегом /body
      </Help>
      <textarea
        value={settings.code}
        onChange={(e) => handleChange("code", e.target.value)}
        className="w-full mb-4 p-2 rounded bg-[#2b2f45]"
      />
      
      <div className="modal_p">Прямая ссылка на виджет</div>
      <Help>
        Если не требуется подключение виджета к сайту
      </Help>
      <input
        type="text"
        value={settings.link}
        onChange={(e) => handleChange("link", e.target.value)}
        className="w-full mb-4 p-2 rounded bg-[#2b2f45]"
      />

    </div>
  );
};
