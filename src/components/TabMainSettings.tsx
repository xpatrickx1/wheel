import React, { useState } from "react";
import { WidgetSettings } from "../lib/defaultSettings";
import { Help } from "../ui/help";
import { useTranslation } from 'react-i18next';

import giftImg from "../assets/img/gift2.png";

// Додайте ці типи до вашого WidgetSettings
interface PositionSettings {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'right';
  offset: number;
}

// Візуальний компонент для прев'ю
const PositionPreview = ({ vertical, horizontal, offset }: PositionSettings) => {
  const containerStyle = {
    width: '200px',
    height: '150px',
    background: 'linear-gradient(135deg, #2b2f45 0%, #3a3f5c 100%)',
    borderRadius: '8px',
    position: 'relative' as const,
    border: '1px solid #4a4f73',
    overflow: 'hidden',
  };

  const buttonStyle = {
    width: '40px',
    height: '40px',
    background: 'transparenrt',
    borderRadius: '50%',
    position: 'absolute' as const,
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '20px', 
    transform: 'translateY(-20px)',
  };

  // Розрахунок позиції
  const getPosition = () => {
    const positions: any = {
      top: { top: `${Math.min(offset, 100)}px` },
      bottom: { bottom: `${Math.min(offset, 100)}px` },
      left: { left: '20px' },
      right: { right: '20px' },
    };

    return {
      ...positions[vertical],
      ...positions[horizontal],
    };
  };

  return (
    <div style={containerStyle}>
      <div style={{ ...buttonStyle, ...getPosition() }}>
      <img
        src={giftImg}
        alt="Подарок"
        className=""
      />
      </div>
      
      {/* Імітація інших елементів на сторінці */}
      {/* <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        width: '30px',
        height: '30px',
        background: '#ef4444',
        borderRadius: '4px',
        opacity: 0.6,
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        width: '30px',
        height: '30px',
        background: '#10b981',
        borderRadius: '4px',
        opacity: 0.6,
      }} /> */}
    </div>
  );
};

export const TabMainSettings = ({ 
  onUpdate,
  settings 
}: { 
  onUpdate: (data: WidgetSettings) => void,
  settings: WidgetSettings
 }) => {
  const [initialSettings, setSettings] = useState<WidgetSettings>(settings);
  const { t } = useTranslation();
  
  // Ініціалізація позиційних налаштувань
  const positionSettings = settings.position || {
    vertical: 'bottom',
    horizontal: 'right',
    offset: 20
  };

  const handleChange = (field: keyof WidgetSettings, value: string | number) => {
    setSettings({ ...initialSettings, [field]: value });
    onUpdate({ ...initialSettings, [field]: value });
  };

  const handlePositionChange = (field: keyof PositionSettings, value: any) => {
    const updatedPosition = {
      ...positionSettings,
      [field]: value
    };
    
    const updatedSettings = {
      ...initialSettings,
      position: updatedPosition
    };
    
    setSettings(updatedSettings);
    onUpdate(updatedSettings);
  };

  return (
    <div className="pt-4">
      

      <div className="mb-8">
        <label className="block text-left mb-2 relative">{t("tabMainColor")}</label>
        <div className="w-full mb-4 relative">
          <div className="flex items-center gap-2 p-2 rounded bg-[#2b2f45] relative">
            <div
              className="w-6 h-6 rounded-full border border-gray-400 cursor-pointer"
              style={{ backgroundColor: settings.color }}
              onClick={() => document.getElementById("colorPicker")?.click()}
            />
            <input
              type="text"
              value={settings.color}
              onChange={(e) => handleChange("color", e.target.value)}
              className="flex-1 bg-transparent outline-none text-white"
            />
            <input
              id="colorPicker"
              type="color"
              value={settings.color}
              onChange={(e) => handleChange("color", e.target.value)}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Секунди */}
      <div className="mb-4">
        <label className="block text-left mb-2">{t("tabMainSeconds")}</label>
        <input
          type="number"
          value={settings.autoOpenDelay}
          onChange={(e) => handleChange("autoOpenDelay", Number(e.target.value))}
          className="w-full p-2 rounded bg-[#2b2f45]"
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
          onChange={(e) => handleChange("actionButton", e.target.value)}
          className="w-full p-2 rounded bg-[#2b2f45]"
        >
          <option value="off">{t("tabMainSelectBtn1")}</option>
          <option value="on">{t("tabMainSelectBtn2")}</option>
        </select>
        <Help>{t("tabMainActionBtnInfo")}</Help>
      </div>

      {/* Секція позиціонування кнопки */}
      <div className="mb-8 p-4 rounded-lg bg-[#2a2e44] border border-[#3a3f5c]">
        <h3 className="text-lg font-semibold mb-4 text-left">
          {t("tabMainButtonPosition")}
        </h3>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Ліва частина - прев'ю */}
          <div className="md:w-[47%]">
            <div className="mb-4">
              <label className="block text-left mb-2 text-sm opacity-80">
                {t("tabMainButtonPreview")}
              </label>
              <div className="flex justify-center">
                <PositionPreview {...positionSettings} />
              </div>
              <Help>{t("tabMainButtonPreviewInfo")}</Help>
            </div>
          </div>
          
          {/* Права частина - налаштування */}
          <div className="md:w-[47%] space-y-4">
            {/* Вертикальна позиція */}
            <div>
              <label className="block text-left mb-2">
                {t("tabMainVerticalPosition")}
              </label>
              <select
                value={positionSettings.vertical}
                onChange={(e) => handlePositionChange("vertical", e.target.value)}
                className="w-full p-2 rounded bg-[#2b2f45] border border-[#3a3f5c] focus:border-[#667eea] focus:outline-none"
              >
                <option value="top">{t("tabMainPositionTop")}</option>
                <option value="bottom">{t("tabMainPositionBottom")}</option>
              </select>
              <Help>{t("tabMainVerticalPositionInfo")}</Help>
            </div>
            
            {/* Горизонтальна позиція */}
            <div>
              <label className="block text-left mb-2">
                {t("tabMainHorizontalPosition")}
              </label>
              <select
                value={positionSettings.horizontal}
                onChange={(e) => handlePositionChange("horizontal", e.target.value)}
                className="w-full p-2 rounded bg-[#2b2f45] border border-[#3a3f5c] focus:border-[#667eea] focus:outline-none"
              >
                <option value="left">{t("tabMainPositionLeft")}</option>
                <option value="right">{t("tabMainPositionRight")}</option>
              </select>
              <Help>{t("tabMainHorizontalPositionInfo")}</Help>
            </div>
            
            {/* Відступ */}
            <div>
              <label className="block text-left mb-2">
                {t("tabMainButtonOffset")}
                <span className="ml-2 text-sm opacity-70">
                  ({positionSettings.offset}px)
                </span>
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="-20"
                  max="100"
                  step="5"
                  value={positionSettings.offset}
                  onChange={(e) => handlePositionChange("offset", parseInt(e.target.value))}
                  className="flex-1 h-2 bg-[#3a3f5c] rounded-lg appearance-none cursor-pointer max-w-[50%]"
                />
                <input
                  type="number"
                  min="0"
                  max="200"
                  value={positionSettings.offset}
                  onChange={(e) => handlePositionChange("offset", parseInt(e.target.value) || 0)}
                  className="w-20 p-2 rounded bg-[#2b2f45] border border-[#3a3f5c] text-center"
                />
              </div>
              <Help>{t("tabMainButtonOffsetInfo")}</Help>
            </div>
            
            {/* Пресети позицій */}
            {/* <div>
              <label className="block text-left mb-2">
                {t("tabMainPositionPresets")}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { vertical: 'bottom', horizontal: 'right', label: 'Нижній правий' },
                  { vertical: 'bottom', horizontal: 'left', label: 'Нижній лівий' },
                  { vertical: 'top', horizontal: 'right', label: 'Верхній правий' },
                  { vertical: 'top', horizontal: 'left', label: 'Верхній лівий' },
                ].map((preset) => (
                  <button
                    key={`${preset.vertical}-${preset.horizontal}`}
                    type="button"
                    onClick={() => {
                      handlePositionChange("vertical", preset.vertical);
                      handlePositionChange("horizontal", preset.horizontal);
                    }}
                    className={`p-2 rounded text-sm transition-colors ${
                      positionSettings.vertical === preset.vertical && 
                      positionSettings.horizontal === preset.horizontal
                        ? 'bg-[#667eea] text-white'
                        : 'bg-[#2b2f45] hover:bg-[#3a3f5c]'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};