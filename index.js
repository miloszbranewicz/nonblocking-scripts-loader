(() => {
  'use strict';

  const scriptsToLoad = [
    // Example script
    {
      src: "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&loading=async&callback=initMap",
      async: true,
      defer: true,
      id: null,
    },

  ];

  function loadScript({src, async = false, defer = false, id = null, attributes = {}}) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      if (id) script.id = id;
      script.async = async;
      script.defer = defer;

      for (const [key, value] of Object.entries(attributes)) {
        script.setAttribute(key, value);
      }

      script.onload = () => resolve(src);
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(script);
    });
  }

  function init() {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        Promise.all(scriptsToLoad.map(loadScript))
          .catch(console.error);
      }, { timeout: 2000 });
    } else {
      window.addEventListener('load', () => {
        Promise.all(scriptsToLoad.map(loadScript))
          .catch(console.error);
      });
    }
  }

  if (document.readyState === "complete" || document.readyState === "interactive") {
    init();
  } else {
    document.addEventListener("DOMContentLoaded", init);
  }
})();
