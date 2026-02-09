import createWheel from "../core/createWheel";

(function () {
  async function init() {
    let widgetId;
    const API_BASE = "https://ptulighepuqttsocdovp.supabase.co";

    if (window.wheeleeSlug) {
      const response = await fetch(`${API_BASE}/functions/v1/get-widget-id/${window.wheeleeSlug}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      const data = await response.json();
      if (!data.id) throw new Error("Widget ID not found");
      widgetId = data.id;
      console.log('widgetId in embed file wheelee', widgetId)
    } else {
      console.error("wheeleeKey or wheeleeSlug required");
      return;
    }
    fetch(`${API_BASE}/functions/v1/get-widget/${widgetId}`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}: ${r.statusText}`);
        return r.json();
      })
      .then((widget) => {
        if (!widget || widget.error) throw new Error(widget.error || "Widget not found");
        createWheel({ ...widget.settings }, widgetId);
      })
      .catch((err) => console.error("Widget load error:", err));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
