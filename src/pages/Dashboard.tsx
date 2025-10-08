import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Header } from '../components/Header';
import { ModalCreateWidget } from '../components/ModalCreateWidget';
import { ModalSettings } from '../components/ModalSettings';
import { defaultWidgetSettings, WidgetSettings } from '../lib/defaultSettings';
import { Eye, Funnel, Settings } from 'lucide-react';
import Loader from '../ui/loader';

interface Widget {
  id: string;
  slug: string;
  name: string;
  created_at: string;
  is_active?: boolean;
  settings?: WidgetSettings;
}

export default function Dashboard() {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isModalSettingsOpen, setIsModalSettingsOpen] = useState(false);
  const [widgetId, setWidgetId] = useState<string | null>(null); // Змінено на null для кращої типізації
  const [widgetName, setWidgetName] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();
  }, []);

  useEffect(() => {
    async function fetchWidgets() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('widgets')
          .select('id, slug, name, created_at, is_active, settings')
          .eq('user_id', user?.id);

        if (error) throw error;
        setWidgets((data as Widget[]) || []);
      } catch (error) {
        console.error('Error fetching widgets:', error.message);
      } finally {
        setLoading(false);
      }
    }

    if (user?.id) {
      fetchWidgets();
    }
  }, [user?.id]);

  // const handleCreateWidget = async () => {
  //   if (!widgetName.trim() || !user?.id) return;

  //   const response = await fetch('https://ptulighepuqttsocdovp.supabase.co/functions/v1/create-widget', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ name: 'My Widget', description: 'Test widget', settings: { prizes: ['Prize 1', 'Prize 2'] } }),
  //   });
  //   const { widget, embedCode } = await response.json();
  //   console.log(embedCode);

  //   try {
  //     const { data, error } = await supabase
  //       .from('widgets')
  //       .insert([
  //         {
  //           name: widgetName.trim(),
  //           user_id: user.id,
  //           is_active: true,
  //           settings: defaultWidgetSettings, // Додаємо дефолтні налаштування
  //         },
  //       ])
  //       .select();

  //     if (error) throw error;

  //     setWidgets([...(data as Widget[]), ...widgets]); // Додаємо новий віджет на початок
  //     setWidgetName('');
  //     setIsCreateModalOpen(false);
  //   } catch (error) {
  //     console.error('Error creating widget:', error.message);
  //   }
  // };

  const handleCreateWidget = async () => {
    if (!widgetName.trim() || !user?.id) {
      console.error("Missing widgetName or user.id");
      return;
    }
    const { data: { session } } = await supabase.auth.getSession();
    try {
      const response = await fetch('https://ptulighepuqttsocdovp.supabase.co/functions/v1/create-widget', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          name: widgetName,
          is_active: true,
          settings: defaultWidgetSettings,
          user_id: user.id,
          is_public: true,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Create widget error:", errorData);
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }
  
      const { widget, embedCode } = await response.json();
      console.log("Embed code:", embedCode);
      // Збережіть embedCode для відображення користувачу
    } catch (error) {
      console.error("Failed to create widget:", error);
    }
  };

  const handleToggleWidget = async (widgetId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('widgets')
        .update({ is_active: !isActive })
        .eq('id', widgetId);

      if (error) throw error;

      setWidgets((prev) =>
        prev.map((widget) =>
          widget.id === widgetId ? { ...widget, is_active: !isActive } : widget
        )
      );
    } catch (error) {
      console.error('Error toggling widget:', error.message);
    }
  };

  const handleOpenSettings = (widgetId: string) => {
    setWidgetId(widgetId);
    setIsModalSettingsOpen(true); 
  };

  const handleSaveSettings = async (newSettings: WidgetSettings) => {
    if (!widgetId) return;

    try {
      const { data, error } = await supabase
        .from('widgets')
        .update({ settings: newSettings })
        .eq('id', widgetId)
        .select();

      if (error) throw error;

      setWidgets((prev) =>
        prev.map((widget) =>
          widget.id === widgetId ? { ...widget, settings: newSettings } : widget
        )
      );
      setIsModalSettingsOpen(false); 
    } catch (error) {
      console.error('Error saving settings:', error.message);
    }
  };

  const currentWidget = widgets.find((w) => w.id === widgetId);

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto p-4 pt-[10rem]">
        <h1 className="text-2xl font-bold mb-4">Мої віджети</h1>
        
        {loading ? (
          <Loader />
        ) : widgets.length > 0 ? (
          <>
          <ul className="space-y-2">
            {widgets.map((widget) => (
              <li
                key={widget.id}
                className="flex items-center justify-between p-4 bg-gray-700 rounded-lg shadow hover:bg-gray-600 transition pointer"
              >
                <div className="flex items-center space-x-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={widget.is_active || false}
                      onChange={() => handleToggleWidget(widget.id, widget.is_active || false)}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                  <span className="text-left font-bold ml-4 flex-1 min-w-0 overflow-hidden text-ellipsis">
                    {widget.name}
                  </span>
                </div>
                <div className="flex items-center justify-end space-x-2 flex-1">
                  <a
                    href={`/widgets/${widget.slug}`}
                    className="flex items-center space-x-2 text-blue-500"
                  >
                    <span className="text-blue-400"><Eye size={16} /></span>
                    <span className="text-white">Відкрити</span>
                  </a>
                  <a
                    href={`/leads/${widget.slug}`}
                    className="flex items-center space-x-2 text-white hover:text-blue-300 text-sm"
                  >
                    <span className="text-blue-400"><Funnel size={16} /></span>
                    <span className="text-white">Відкрити заявки</span>
                  </a>
                  <a
                    onClick={() => handleOpenSettings(widget.id)}
                    className="flex items-center space-x-2 text-green-400 hover:text-green-300 text-sm"
                  >
                    <span className="text-blue-400"><Settings size={16} /></span>
                    <span className="text-white">Налаштування</span>
                  </a>
                </div>
              </li>
            ))}
          </ul>
          <button
            className="mt-4 bg-blue-600 rounded-lg mt-10 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full md:w-auto cursor-pointer"
            onClick={() => setIsCreateModalOpen(true)}
          >
            Новий віджет
          </button>
          </>
        ) : (
          <p className="text-center text-gray-500">Віджетів поки нема</p>
        )}

        

        <ModalCreateWidget
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          widgetName={widgetName}
          setWidgetName={setWidgetName}
          onCreateWidget={handleCreateWidget}
        />

        {isModalSettingsOpen && currentWidget && (
          <ModalSettings
            widgetId={widgetId || ''}
            slug={currentWidget.slug || ''}
            onSave={handleSaveSettings}
            initialSettings={currentWidget.settings || defaultWidgetSettings}
            onClose={() => {
              setIsModalSettingsOpen(false);
              setWidgetId(null); 
            }}
          />
        )}
      </div>
    </>
  );
}