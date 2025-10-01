import React, { useState } from "react";
import { WidgetSettings } from "../lib/defaultSettings";
import { Help } from "../ui/help";

export const TabCode = ({ 
  onUpdate,
  settings,
  slug
}: { 
  onUpdate: (data: WidgetSettings) => void,
  settings: WidgetSettings,
  slug: string
 }) => {
  const [initialSettings, setSettings] = useState<WidgetSettings>(settings);

  const handleChange = (field: keyof WidgetSettings, value: string | number) => {
    setSettings({ ...initialSettings, [field]: value });
    onUpdate({ ...initialSettings, [field]: value });
  };

  const handleTextareaClick = (event) => {
    event.target.select(); 
  };

  function generateEmbedCode(slug: string) {
    return `<script>(function(d, w) {w.wheeleeKey = '${slug}';var s = d.createElement('script');s.async = true;s.src = 'https://ptulighepuqttsocdovp.supabase.co/storage/v1/object/public/wheelee/wheelee-min.js?' + Date.now();s.charset = 'UTF-8';if (d.head) d.head.appendChild(s);})(document, window);</script>`;
  }

  return (
    <div className="">
      <div className="modal_p text-left">Код віджета</div>
      <Help>
        Добавьте этот код на сайт перед тегом &#60;/body&#62;
      </Help>
      <textarea
        value={generateEmbedCode(slug)}
        onClick={handleTextareaClick} 
        className="w-full h-[170px] mb-4 p-2 rounded bg-[#2b2f45]"
      />
      
      <div className="modal_p text-left">Прямая ссылка на виджет</div>
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
