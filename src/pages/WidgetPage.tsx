import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { supabase } from '../lib/supabaseClient';
import { Wheel } from '../components/Wheel';

export default function WidgetPage() {
  const { id } = useParams<{ id: string }>();
  const [widget, setWidget] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWidget() {
      try {
        const res = await supabase
          .from('widgets')
          .select('*')
          .eq('id', id);
        const data = await res.data;
        setWidget(data);
      } catch (err) {
        console.error("Error loading widget", err);
      } finally {
        setLoading(false);
      }
    }

    loadWidget();
  }, [id]);

  if (loading) return <p className="text-white">Завантаження...</p>;
  if (!widget) return <p className="text-red-500">Віджет не знайдено</p>;

  return (
    <div>
      <h1 className="text-xl font-bold text-white">{widget.name}</h1>
      <p className="text-gray-300">{widget.description}</p>
      <Wheel id={id} />
      {/* Тут можеш рендерити кастомні налаштування */}
      <pre className="bg-gray-800 p-2 rounded text-white mt-4">
        {JSON.stringify(widget.settings, null, 2)}
      </pre>
    </div>
  );
}
