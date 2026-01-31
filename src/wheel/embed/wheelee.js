import createWheel from "../core/createWheel";

(function () {
  function init() {
    const slug = window.wheeleeSlug;
    if (!slug) {
      console.warn("Wheelee: wheeleeSlug not found");
      return;
    }

    const containerId = "wheelee-" + slug;
    let container = document.getElementById(containerId);

    if (!container) {
      container = document.createElement("div");
      container.id = containerId;
      document.body.appendChild(container);
    }

    createWheel(container, { slug });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
