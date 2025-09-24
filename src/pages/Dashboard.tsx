import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Header } from '../components/Header';
import { CreateWidgetModal } from '../components/CreateWidgetModal';
import { WidgetSettingsModal } from '../components/SettingsModal';
import { defaultWidgetSettings, WidgetSettings } from '../lib/defaultSettings';
import { Eye, Funnel, Settings } from 'lucide-react';

interface Widget {
  id: string;
  name: string;
  created_at: string;
  is_active?: boolean;
  settings?: WidgetSettings;
}

export default function Dashboard() {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
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
          .select('id, name, created_at, is_active, settings')
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

  const handleCreateWidget = async () => {
    if (!widgetName.trim() || !user?.id) return;

    try {
      const { data, error } = await supabase
        .from('widgets')
        .insert([
          {
            name: widgetName.trim(),
            user_id: user.id,
            is_active: true,
            settings: defaultWidgetSettings, // Додаємо дефолтні налаштування
          },
        ])
        .select();

      if (error) throw error;

      setWidgets([...(data as Widget[]), ...widgets]); // Додаємо новий віджет на початок
      setWidgetName('');
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating widget:', error.message);
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

  const handleOpenRequests = (widgetId: string) => {
    console.log(`Open requests for widget ${widgetId}`);
    // Логіка для navigate(`/widgets/${widgetId}/requests`) з useNavigate, якщо потрібно
  };

  const handleOpenSettings = (widgetId: string) => {
    setWidgetId(widgetId);
    setIsSettingsModalOpen(true); 
    // console.log(widgets);
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
      setIsSettingsModalOpen(false); // Закриваємо модалку після збереження
    } catch (error) {
      console.error('Error saving settings:', error.message);
    }
  };

  const currentWidget = widgets.find((w) => w.id === widgetId);

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Мої віджети</h1>

        {loading ? (
          <p className="text-center">Завантаження...</p>
        ) : widgets.length > 0 ? (
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
                    href={`/widgets/${widget.id}`}
                    className="flex items-center space-x-2 text-blue-500"
                  >
                    <span className="text-blue-400"><Eye size={16} /></span>
                    <span className="text-white">Відкрити</span>
                  </a>
                  <a
                    onClick={() => handleOpenRequests(widget.id)}
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
        ) : (
          <p className="text-center text-gray-500">Віджетів поки нема</p>
        )}

        <button
          className="mt-4 bg-blue-600 rounded-lg mt-10 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full md:w-auto"
          onClick={() => setIsCreateModalOpen(true)}
        >
          Новий віджет
        </button>

        <CreateWidgetModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          widgetName={widgetName}
          setWidgetName={setWidgetName}
          onCreateWidget={handleCreateWidget}
        />

        {isSettingsModalOpen && currentWidget && (
          <WidgetSettingsModal
            widgetId={widgetId || ''}
            onSave={handleSaveSettings}
            initialSettings={currentWidget.settings || defaultWidgetSettings}
            onClose={() => {
              setIsSettingsModalOpen(false);
              setWidgetId(null); 
            }}
          />
        )}
      </div>
    </>
  );
}