import React, { useRef, useState, useEffect } from 'react';
import Winwheel from '../lib/Winwheel';
import { supabase } from '../lib/supabaseClient';

export function Wheel({ id }: { id: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let theWheel = null as Winwheel | null;
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPolicyAccepted, setIsPolicyAccepted] = useState<boolean>(false);
  const [indicatedSegment, setIndicatedSegment] = useState<any>(null);

  function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  }
  
  function rgbToHex(r: number, g: number, b: number) {
    return "#" + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
  }

  function darkenColor(hex: string, percent: number) {
    const rgb = hexToRgb(hex);
    const factor = 1 - percent / 100;
    const r = Math.round(rgb.r * factor);
    const g = Math.round(rgb.g * factor);
    const b = Math.round(rgb.b * factor);
    return rgbToHex(r, g, b);
  }

  useEffect(() => {
    async function fetchSettings() {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('widgets')
          .select('settings')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching settings:', error.message);
          setError('Помилка завантаження налаштувань');
          return;
        }

        if (data) {
          setSettings(data.settings);
        } else {
          setError('Налаштування не знайдено');
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('Непередбачена помилка');
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, [id]);

  useEffect(() => {
    if (settings && canvasRef.current && !loading) {
      const participatingBonuses = settings.bonuses.filter((bonus: any) => bonus.is_participating);
      const numSegments = participatingBonuses.length || 8;

      const baseColor = settings.color || '#eb112a'; // Дефолтний колір, як у прикладі
      const darkerColor = darkenColor(baseColor, 20);

      const segments = participatingBonuses.map((bonus: any, index: number) => ({
        'fillStyle': index % 2 === 0 ? baseColor : darkerColor,
        'text': bonus.value || `Prize ${index + 1}`,
      }));

      theWheel = new Winwheel({
        'numSegments': numSegments,
        'outerRadius': 212,
        'innerRadius': 50,
        'textFontSize': 16,
        'textMargin': 0,
        'segments': segments.length > 0 ? segments : [
          {'fillStyle': baseColor, 'text': 'Prize 1'},
          {'fillStyle': darkerColor, 'text': 'Prize 2'},
          {'fillStyle': baseColor, 'text': 'Prize 3'},
          {'fillStyle': darkerColor, 'text': 'Prize 4'},
          {'fillStyle': baseColor, 'text': 'Prize 5'},
          {'fillStyle': darkerColor, 'text': 'Prize 6'},
          {'fillStyle': baseColor, 'text': 'Prize 7'},
          {'fillStyle': darkerColor, 'text': 'Prize 8'},
        ],
        'animation': {
          'type': 'spinToStop',
          'duration': 5,
          'spins': 8,
          'callbackFinished': alertPrize,
        },
      });

      theWheel.canvas = canvasRef.current;
      theWheel.draw();
    }
  }, [settings, loading, isPolicyAccepted]);

  function alertPrize(indicatedSegment: any) {
    setIndicatedSegment(indicatedSegment.text);
  }

  function startSpin(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault(); 
    if (theWheel && isPolicyAccepted) {
      theWheel.startAnimation();
    } 
  }

  if (loading) {
    return <div className="text-center">Завантаження...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="w-full">
      <div className="flex items-center relative min-h-screen w-full overflow-hidden bg-[#262635] max-w-[1000px] mx-auto">
        {/* Контейнер для колеса */}
        <div className="wheel-container relative w-fit w-[500px] max-w-[500px] -translate-x-1/2">
          <canvas ref={canvasRef} id="canvas" width="500" height="500"></canvas>
          <div className="wheel-arrow absolute top-1/2 -translate-y-1/2 right-6"></div>
        </div>

        {!indicatedSegment ? (
        <div className="w-full flex flex-col items-start max-w-[400px]">
          {/* Форма */}
          {settings.title && (
            <h2 className="text-2xl font-bold">{settings.title}</h2>
          )}
          {settings.subtitle && (
            <p className="text-lg text-md mt-4">{settings.subtitle}</p>
          )}
          <form className="mt-6 w-full">
            <div className="mb-4">
              <input
                type="email"
                className="w-full max-w-full border border-white/10 pl-0 outline-0 bg-transparent text-white h-[60px] rounded-[10px] pl-[60px]"
                placeholder="Enter your email"
              />
            </div>

            <div className="flex items-start text-left" >
              <div className="flex items-center mt-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPolicyAccepted}
                    onChange={() => setIsPolicyAccepted(!isPolicyAccepted)}
                    className="sr-only peer"
                  />
                  <div className={`w-[26px] h-[26px] min-w-[26px] rounded-sm mr-2 border border-gray-300 ${isPolicyAccepted ? 'checkbox-checked bg-[#4A61DA]' : ''}`}></div>
                </label>
              </div>
						  <div className="text-xs">
                Я даю своё 
                <a href="#" className="px-1" target="_blank">Cогласие</a>
                на обработку персональных данных и подтверждаю ознакомление с 
                <a href={settings.privacyUrl} className="px-1" target="_blank">Политикой</a>
                обработки персональных данных
              </div>
					  </div>

            {/* Кнопка Spin */}
            <button
              id="spin_button"
              onClick={startSpin}
              style={{ backgroundColor: settings.color }}
              className={`mt-4 rounded-md hover:bg-purple-700 text-white font-bold py-4 px-8`}
            >
              {settings.buttonText}
            </button>
          </form>
        </div>
        ) : (
          <div className="w-full flex flex-col items-start max-w-[400px]">
            <div className="text-5xl leading-20 pb-4 text-white font-bold">{indicatedSegment}</div>
            <div className="text-lg text-white">
              {settings.successMessage}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}