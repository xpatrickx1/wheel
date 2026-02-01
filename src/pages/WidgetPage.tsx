import { useParams } from "react-router-dom";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";
import WheelWidget from '../components/WheelWidget';
interface WidgetData {
  id: string;
  slug: string;
  name: string;
  settings: any;
}

export default function WidgetPage() {
  const { slug } = useParams<{ slug: string }>();
  const [widget, setWidget] = useState<WidgetData | null>(null);
  const [loading, setLoading] = useState(true);
  const buttonRemovedRef = useRef(false);

  const removeOpenButtons = useCallback(() => {
    if (buttonRemovedRef.current) return;
    
    const observer = new MutationObserver(() => {
      const buttons = document.querySelectorAll('.widget-open-btn');
      if (buttons.length > 0) {
        buttons.forEach(button => {
          button.remove();
          console.log('Widget open button removed from preview');
        });
        buttonRemovedRef.current = true;
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    removeOpenButtons();
    
    // Також перевіряємо при кожній зміні DOM
    const checkInterval = setInterval(() => {
      if (!buttonRemovedRef.current) {
        const buttons = document.querySelectorAll('.widget-open-btn');
        if (buttons.length > 0) {
          buttons.forEach(button => button.remove());
          buttonRemovedRef.current = true;
        }
      }
    }, 500);

    return () => clearInterval(checkInterval);
  }, [removeOpenButtons]);


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

  if (loading) return <p className="text-white">Завантаження...</p>;
  if (!widget) return <p className="text-red-500">Віджет не знайдено</p>;

  return (
    <div>
      <div className="bg-[#1d1d27] widget-page">
      <div id="wheelee-container" className="flex justify-center items-center align-middle mx-auto bg-[#262635] w-full h-[100vh] max-w-[1000px]"/>
        {widget.settings && (
          <WheelWidget 
            options={widget.settings}
            // containerId="page-wheel-widget"
          />
        )}
      {/* </div> */}
      </div>
    </div>
    
  );
}