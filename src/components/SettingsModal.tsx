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

export const WidgetSettingsModal = ({
  onSave,
  widgetId,
  onClose,
  initialSettings,
}: {
  onSave: (data: WidgetSettings) => void;
  widgetId: string;
  onClose: () => void;
  initialSettings: WidgetSettings;
}) => {
  const [settings, setSettings] = useState<WidgetSettings>({ ...initialSettings }); // Копіюємо початкові налаштування
  const [activeTab, setActiveTab] = useState<string>("main");
    console.log(settings);
  // Оновлення стану settings на основі даних від вкладених компонентів
  const handleUpdateSettings = (updatedSettings: Partial<WidgetSettings>) => {
    setSettings((prev) => ({ ...prev, ...updatedSettings }));
  };

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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-[#1a1d2e] text-white p-6 rounded-lg w-[400px] max-h-[90vh] overflow-y-auto relative">
        {/* Кнопка закриття */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 w-10 h-10 border-none outline-none hover:border-none bg-transparent flex items-center justify-center group"
        >
          <span className="absolute w-5 h-0.5 bg-gray-400 group-hover:bg-gray-600 transition-all duration-200 rotate-45"></span>
          <span className="absolute w-5 h-0.5 bg-gray-400 group-hover:bg-gray-600 transition-all duration-200 -rotate-45"></span>
        </button>

        {/* Заголовок */}
        <h2 className="text-2xl font-bold mb-4 text-center">Настройки</h2>

        {/* Таби */}
        <Tabs className="w-full mb-4">
          <TabsList className="flex justify-around">
            <TabsTrigger
              value="main"
              isActive={activeTab === "main"}
              onClick={() => setActiveTab("main")}
            >
              Основные
            </TabsTrigger>
            <TabsTrigger
              value="bonus"
              isActive={activeTab === "bonus"}
              onClick={() => setActiveTab("bonus")}
            >
              Бонусы
            </TabsTrigger>
            <TabsTrigger
              value="integrations"
              isActive={activeTab === "integrations"}
              onClick={() => setActiveTab("integrations")}
            >
              Интеграции
            </TabsTrigger>
            <TabsTrigger
              value="code"
              isActive={activeTab === "code"}
              onClick={() => setActiveTab("code")}
            >
              Код
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Контент вкладок */}
        {activeTab === "main" && (
          <TabsContent value="main">
            <TabMainSettings
              onUpdate={handleUpdateSettings} // Нова функція для оновлення
              widgetId={widgetId}
              onClose={onClose}
              settings={settings} // Передаємо поточні налаштування
            />
          </TabsContent>
        )}
        {activeTab === "bonus" && (
          <TabsContent value="bonus">
            <TabBonus
              onUpdate={handleUpdateSettings}
              widgetId={widgetId}
              onClose={onClose}
              settings={settings}
            />
          </TabsContent>
        )}
        {activeTab === "integrations" && (
          <TabsContent value="integrations">
            <TabIntegrations
              onUpdate={handleUpdateSettings}
              widgetId={widgetId}
              onClose={onClose}
              settings={settings}
            />
          </TabsContent>
        )}
        {activeTab === "code" && (
          <TabsContent value="code">
            <TabCode
              onUpdate={handleUpdateSettings}
              widgetId={widgetId}
              onClose={onClose}
              settings={settings}
            />
          </TabsContent>
        )}

        {/* Кнопка збереження */}
        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          Зберегти
        </button>
      </div>
    </div>
  );
};