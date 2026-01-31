import React, { useState } from "react";
import { supabase } from '../lib/supabaseClient';
import { WidgetSettings } from "../lib/defaultSettings";
import { TabMainSettings } from "./TabMainSettings";
import { TabBonus } from "./TabBonus";
import { TabIntegrations } from "./TabIntegrations";
import { TabCode } from "./TabCode";
import { Tabs } from "../ui/tabs";
import { TabsList } from "../ui/tabs";
import { TabsTrigger } from "../ui/tabs";
import { TabsContent } from "../ui/tabs";
import { useTranslation } from 'react-i18next';

export const ModalSettings = ({
  onSave,
  widgetId,
  slug,
  onClose,
  initialSettings,
}: {
  onSave: (data: WidgetSettings) => void;
  widgetId: string;
  slug: string;
  onClose: () => void;
  initialSettings: WidgetSettings;
}) => {
  const [settings, setSettings] = useState<WidgetSettings>({ ...initialSettings }); // Копіюємо початкові налаштування
  const [activeTab, setActiveTab] = useState<string>("main");

  // Оновлення стану settings на основі даних від вкладених компонентів
  const handleUpdateSettings = (updatedSettings: Partial<WidgetSettings>) => {
    setSettings((prev) => ({ ...prev, ...updatedSettings }));
  };

  const { t } = useTranslation();
  const handleSubmit = async () => {
    try {
      const { error } = await supabase
        .from('widgets')
        .update({ settings })
        .eq('id', widgetId);

      if (error) throw error;
      console.log("Settings saved to Supabase for widget:", widgetId);
      onSave(settings); // Передаємо оновлені налаштування вгору
      onClose(); // Закриваємо модалку
    } catch (error) {
      console.error("Error saving settings:", error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 bg-opacity-70 z-50">
      <div className="flex flex-col justify-between bg-[#1a1d2e] p-6 pt-12 pb-[7rem] rounded-lg w-[500px] max-h-[90vh] overflow-y-auto relative">
        {/* Кнопка закриття */}
        <div
          onClick={onClose}
          className="absolute right-4 top-4 w-10 h-10 border-none outline-none hover:border-none bg-transparent flex items-center justify-center group cursor-pointer"
        >
          <span className="absolute w-5 h-0.5 bg-gray-400 group-hover:bg-gray-600 transition-all duration-200 rotate-45"></span>
          <span className="absolute w-5 h-0.5 bg-gray-400 group-hover:bg-gray-600 transition-all duration-200 -rotate-45"></span>
        </div>

        {/* Заголовок */}
        <h2 className="text-2xl font-bold mb-4 text-center">{t("settingsTitle")}</h2>

        {/* Таби */}
        <Tabs className="w-full mb-4">
          <TabsList>
            <TabsTrigger
              value="main"
              isActive={activeTab === "main"}
              onClick={() => setActiveTab("main")}
            >
              {t("settingsTabMain")}
            </TabsTrigger>
            <TabsTrigger
              value="bonus"
              isActive={activeTab === "bonus"}
              onClick={() => setActiveTab("bonus")}
            >
              {t("settingsTabBonuses")}
            </TabsTrigger>
            <TabsTrigger
              value="integrations"
              isActive={activeTab === "integrations"}
              onClick={() => setActiveTab("integrations")}
            >
              {t("settingsTabIntegrations")}
            </TabsTrigger>
            <TabsTrigger
              value="code"
              isActive={activeTab === "code"}
              onClick={() => setActiveTab("code")}
            >
              {t("settingsTabCode")}
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Контент вкладок */}
        {activeTab === "main" && (
          <TabsContent value="main">
            <TabMainSettings
              onUpdate={handleUpdateSettings} 
              settings={settings} 
            />
          </TabsContent>
        )}
        {activeTab === "bonus" && (
          <TabsContent value="bonus">
            <TabBonus
              onUpdate={handleUpdateSettings}
              settings={settings}
            />
          </TabsContent>
        )}
        {activeTab === "integrations" && (
          <TabsContent value="integrations">
            <TabIntegrations
              onUpdate={handleUpdateSettings}
              settings={settings}
            />
          </TabsContent>
        )}
        {activeTab === "code" && (
          <TabsContent value="code">
            <TabCode
              onUpdate={handleUpdateSettings}
              settings={settings}
              slug={slug}
            />
          </TabsContent>
        )}

        {/* Кнопка збереження */}
        {activeTab !== "code" && (
        <button
          onClick={handleSubmit}
          className="button__main fixed bottom-20 m-auto w-fit bg-blue-600 hover:bg-blue-700 text-white font-bold -translate-x-1/2 left-1/2  uppercase"
        >
          {t("settingsSave")}
        </button>
        )}
      </div>
    </div>
  );
};