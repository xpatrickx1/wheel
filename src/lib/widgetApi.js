// lib/widgetApi.js
const SUPABASE_URL = "https://ptulighepuqttsocdovp.supabase.co";
const SUPABASE_KEY = "your-anon-key"; // Замініть на ваш ключ

export async function fetchWidgetSettings(slug = 'default') {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/widget_settings?slug=eq.${slug}`,
      {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.length === 0) {
      return getDefaultSettings();
    }

    return {
      ...data[0].settings,
      widgetId: data[0].id
    };
  } catch (error) {
    console.error('Error fetching widget settings:', error);
    return getDefaultSettings();
  }
}

export function getDefaultSettings() {
  return {
    title: "Колесо фортуни",
    subtitle: "Виграйте приз!",
    buttonText: "Крутити",
    color: "#eb112a",
    autoOpenDelay: 3,
    collectData: "email",
    privacyUrl: "/privacy-policy",
    successMessage: "Дякуємо! Ваш приз вже на шляху.",
    bonuses: [
      { value: "Знижка 10%", is_participating: true },
      { value: "Безкоштовна доставка", is_participating: true },
      { value: "Подарунок", is_participating: true },
      { value: "Спробуйте ще", is_participating: true },
      { value: "Бонус 100 грн", is_participating: true },
      { value: "Спеціальна пропозиція", is_participating: true }
    ]
  };
}

export async function saveWidgetResult(widgetId, contact, prize) {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/widget_results`,
      {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          widget_id: widgetId,
          contact: contact,
          prize: prize,
          created_at: new Date().toISOString()
        })
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Error saving result:', error);
    return false;
  }
}