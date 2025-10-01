import { useParams } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabaseClient";

interface WidgetData {
  id: string;
  slug: string;
  name: string;
  settings: any;
}

// const WHEELE_URL = "https://ptulighepuqttsocdovp.supabase.co/storage/v1/object/public/wheelee/wheelee-min.js";
const WHEELE_URL = "https://ptulighepuqttsocdovp.supabase.co/storage/v1/object/public/wheelee/wheelee.js";

export default function WidgetPage() {
  const { slug } = useParams<{ slug: string }>();
  const [widget, setWidget] = useState<WidgetData | null>(null);
  const [loading, setLoading] = useState(true);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    async function loadSettings() {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("widgets")
          .select("id, slug, name, settings")
          .eq("slug", slug)
          .single();

        if (error) throw error;
        if (!data) throw new Error("Widget not found");
        setWidget(data);
      } catch (err) {
        console.error("Error loading widget:", err);
        setWidget(null);
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, [slug]);

  useEffect(() => {
    if (!widget?.id) return;

    // Передаємо id (UUID) у window.wheeleeKey
    (window as any).wheeleeKey = widget.id;

    if (scriptRef.current) {
      document.head.removeChild(scriptRef.current);
      scriptRef.current = null;
    }

    const script = document.createElement("script");
    script.src = `${WHEELE_URL}?${Date.now()}`; // Кеш-бастинг
    script.async = true;

    script.onload = () => {
      console.log(`Widget script loaded for id: ${widget.id}`);
      delete (window as any).wheeleeKey;
    };
    script.onerror = () => console.error(`Failed to load widget script for id: ${widget.id}`);

    scriptRef.current = script;
    document.head.appendChild(script);

    return () => {
      if (scriptRef.current) {
        document.head.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
      delete (window as any).wheeleeKey;
    };
  }, [widget?.id]);

  if (loading) return <p className="text-white">Завантаження...</p>;
  if (!widget) return <p className="text-red-500">Віджет не знайдено</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold text-white">{widget.name}</h1>
      <div id="wheelee-container" />
    </div>
  );
}