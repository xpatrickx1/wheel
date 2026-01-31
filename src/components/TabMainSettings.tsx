import React, { useState } from "react";
import { WidgetSettings } from "../lib/defaultSettings";
import { Help } from "../ui/help";
import { useTranslation } from 'react-i18next';

export const TabMainSettings = ({ 
  onUpdate,
  settings 
}: { 
  onUpdate: (data: WidgetSettings) => void,
  settings: WidgetSettings
 }) => {
  const [initialSettings, setSettings] = useState<WidgetSettings>(settings);
  const { t } = useTranslation();
  const handleChange = (field: keyof WidgetSettings, value: string | number) => {
    setSettings({ ...initialSettings, [field]: value });
    onUpdate({ ...initialSettings, [field]: value });
  };
  

  return (
    <div className="pt-4">
      {/* Цвет */}
      <label className="block text-left mb-2 relative">{t("tabMainColor")}</label>
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
        <label className="block text-left mb-2">{t("tabMainSeconds")}</label>
        <input
          type="number"
          value={settings.autoOpenDelay}
          onChange={(e) => handleChange("autoOpenDelay", Number(e.target.value))}
          className="w-full  p-2 rounded bg-[#2b2f45]"
        />
        <Help>{t("tabMainSecondsInfo")}</Help>
      </div>

      <div className="mb-4">
        <label className="block text-left mb-2">{t("tabMainCollect")}</label>
        <select
          value={settings.collectData}
          onChange={(e) => handleChange("collectData", e.target.value)}
          className="w-full p-2 rounded bg-[#2b2f45]"
        >
          <option value="tel">Телефон</option>
          <option value="email">Email</option>
          <option value="message">{t("tabMainCollectSelect")}</option>
        </select>
        <Help>{t("tabMainCollectInfo")}</Help>
      </div>

      {/* Остальные поля */}
      {[
        { field: "title", label: `${t("tabMainTitle")}` },
        { field: "subtitle", label: `${t("tabMainSubtitle")}` },
        { field: "successMessage", label: `${t("tabMainMessage")}` },
        { field: "privacyUrl", label: `${t("tabMainPoliciLink")}` },
        { field: "phoneRegion", label: `${t("tabMainRegion")}` },
        { field: "buttonText", label: `${t("tabMainBtnText")}`, helpText: `${t("tabMainBtnTextInfo")}` },
        { field: "callFilter", label: `${t("tabMainFilter")}`, helpText: `${t("tabMainFilterInfo")}` },
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
        <label className="block text-left mb-2">{t("tabMainActionBtn")}</label>
        <select
          value={settings.actionButton}
          onChange={(e) => handleChange("collectData", e.target.value)}
          className="w-full p-2 rounded bg-[#2b2f45]"
        >
          <option value="off">{t("tabMainSelectBtn1")}</option>
          <option value="on">{t("tabMainSelectBtn2")}</option>
        </select>
        <Help>{t("tabMainActionBtnInfo")}</Help>
      </div>
    </div>
  );
};
