import React, { useState } from "react";
import { WidgetSettings } from "../lib/defaultSettings";
import { Help } from "../ui/help";

export const TabIntegrations = ({ 
  onUpdate,
  settings 
}: { 
  onUpdate: (data: WidgetSettings) => void, 
  settings: WidgetSettings
 }) => {
  const [initialSettings, setSettings] = useState<WidgetSettings>(settings);

  const handleChange = (field: keyof WidgetSettings, value: string | number) => {
    setSettings({ ...initialSettings, integrations: { ...initialSettings.integrations, [field]: value } });
    onUpdate({ ...initialSettings, integrations: { ...initialSettings.integrations, [field]: value } });
  };


  return (
    <div className="">
      <div className="modal_p">Telegram</div>
      <Help>
        Новые заявки будут приходить в Telegram
      </Help>
      <Help>
        Чтобы привязать личный аккаунт, откройте бота @lp9_bot. Нажмите кнопку «start» и укажите ваш ID в поле ниже.
      </Help>
      <Help>
        Если вы хотите создать чат из нескольких человек с оповещением о новых заявках, необходимо создать чат, добавить в него участников, а затем подключить туда бота @lp9_bot и отправить команду /start. Затем укажите укажите ID с отрицательным значением в поле ниже. Пример: -23288472294
      </Help>
      <input
        type="text"
        value={settings.integrations.telegram}
        onChange={(e) => handleChange("telegram", e.target.value)}
        className="w-full mb-4 p-2 rounded bg-[#2b2f45]"
        placeholder="Telegram ID"
      />
      <div className="modal_p">Google Analytics</div>
      <Help>
        Мы отправляем цели lp9_open при открытии виджета и lp9_send при отправке заявки. В Google Analytics перейдите в раздел «Администратор» → «Ресурс» → «Ассистент настройки» → «Установка тега», кликнуть на поток и скопировать «Идентификатор потока данных». Он должен быть примерно такого вида: G-5KHNSWDHJK
      </Help>
      <input
        type="text"
        value={settings.integrations.googleAnalytics}
        onChange={(e) => handleChange("googleAnalytics", e.target.value)}
        className="w-full mb-4 p-2 rounded bg-[#2b2f45]"
        placeholder="Идентификатор потока данных"
      />
      
      <div className="modal_p">Внешний URL</div>
      <Help>
        На указанный URL придёт POST запрос с данными: name - название виджета, lead - контакт, bonus - выигранный приз, time - время выигрыша.
      </Help>
      <input
        type="text"
        value={settings.integrations.externalUrl}
        onChange={(e) => handleChange("externalUrl", e.target.value)}
        className="w-full mb-4 p-2 rounded bg-[#2b2f45]"
        placeholder="Укажите URL"
      />
    </div>
  );
};
