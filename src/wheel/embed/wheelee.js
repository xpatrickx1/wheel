import createWheel from "../core/createWheel";

(function () {
  async function init() {
    // const slug = window.wheeleeSlug;
    // if (!slug) {
    //   console.warn("Wheelee: wheeleeSlug not found");
    //   return;
    // }

    // const containerId = "wheelee-" + slug;
    // let container = document.getElementById(containerId);

    // if (!container) {
    //   container = document.createElement("div");
    //   container.id = containerId;
    //   document.body.appendChild(container);
    // }

    let widgetId;
    const API_BASE = "https://ptulighepuqttsocdovp.supabase.co";

    if (window.wheeleeSlug) {
      const response = await fetch(`${API_BASE}/functions/v1/get-widget-id/${window.wheeleeSlug}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      const data = await response.json();
      if (!data.id) throw new Error("Widget ID not found");
      widgetId = data.id;
    } else {
      console.error("wheeleeKey or wheeleeSlug required");
      return;
    }
    fetch(`${API_BASE}/functions/v1/get-widget/${widgetId}`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}: ${r.statusText}`);
        console.log('get-widget-id r', r)
        return r.json();
      })
      .then((widget) => {
        if (!widget || widget.error) throw new Error(widget.error || "Widget not found");
        createWheel({ ...widget.settings });
      })
      .catch((err) => console.error("Widget load error:", err));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
