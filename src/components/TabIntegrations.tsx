import React, { useState } from "react";
import { WidgetSettings } from "../lib/defaultSettings";
import { Help } from "../ui/help";
import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation();
  
  return (
    <div className="">
      <div className="modal_p">Telegram</div>
      <Help>
        {t("tabIntegrationsTelegram")}
      </Help>
      <Help>
        {t("tabIntegrationsTelegramInfo")}
      </Help>
      <Help>
      {t("tabIntegrationsTelegramDescription")}
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
        {t("tabIntegrationsGoogleDescription")}
      </Help>
      <input
        type="text"
        value={settings.integrations.googleAnalytics}
        onChange={(e) => handleChange("googleAnalytics", e.target.value)}
        className="w-full mb-4 p-2 rounded bg-[#2b2f45]"
        placeholder={t("tabIntegrationsGooglePlaceholder")}
      />
      
      <div className="modal_p">{t("tabIntegrationsUrlTitle")}</div>
      <Help>
        {t("tabIntegrationsUrlInfo")}
      </Help>
      <input
        type="text"
        value={settings.integrations.externalUrl}
        onChange={(e) => handleChange("externalUrl", e.target.value)}
        className="w-full mb-4 p-2 rounded bg-[#2b2f45]"
        placeholder={t("tabIntegrationsUrlPlaceholder")}
      />
    </div>
  );
};
