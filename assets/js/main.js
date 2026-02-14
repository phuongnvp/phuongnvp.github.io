/* ==========================================================================
   Main JS (minimal)
   - sets current year
   - optional theme (light/dark/system) with accessible toggle if present
   - (future) centralized external links helper if needed
   ========================================================================== */

(function () {
  "use strict";

  // --- Utilities ---
  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  function setYear() {
    var y = new Date().getFullYear();
    var el = $("#year");
    if (el) el.textContent = String(y);
  }

  // --- Theme ---
  function systemPrefersDark() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }

  function applyTheme(mode) {
    // mode: "light" | "dark" | "system"
    var html = document.documentElement;

    if (mode === "system") {
      html.removeAttribute("data-theme");
      if (systemPrefersDark()) {
        html.setAttribute("data-theme", "dark");
      }
      return;
    }

    html.setAttribute("data-theme", mode);
  }

  function getStoredTheme() {
    try {
      var key =
        (window.SITE && window.SITE.theme && window.SITE.theme.storageKey) ||
        "site-theme";
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function storeTheme(mode) {
    try {
      var key =
        (window.SITE && window.SITE.theme && window.SITE.theme.storageKey) ||
        "site-theme";
      localStorage.setItem(key, mode);
    } catch (e) {
      // ignore
    }
  }

  function getDefaultTheme() {
    var def = window.SITE && window.SITE.theme && window.SITE.theme.defaultMode;
    if (def === "light" || def === "dark" || def === "system") return def;
    return "system";
  }

  function initTheme() {
    var cfg =
      window.SITE && window.SITE.theme
        ? window.SITE.theme
        : { enableThemeToggle: false };
    var stored = getStoredTheme();
    var mode = stored || getDefaultTheme();

    applyTheme(mode);

    // Optional: update on system changes if mode === system
    if (window.matchMedia) {
      var mq = window.matchMedia("(prefers-color-scheme: dark)");
      mq.addEventListener
        ? mq.addEventListener("change", function () {
            var current = getStoredTheme() || getDefaultTheme();
            if (current === "system") applyTheme("system");
          })
        : mq.addListener &&
          mq.addListener(function () {
            var current = getStoredTheme() || getDefaultTheme();
            if (current === "system") applyTheme("system");
          });
    }

    // Optional toggle button: add an element with id="theme-toggle"
    // and a span inside with class="theme-label" (optional).
    var toggle = $("#theme-toggle");
    if (!cfg.enableThemeToggle || !toggle) return;

    function modeLabel(m) {
      if (m === "light") return "Light";
      if (m === "dark") return "Dark";
      return "System";
    }

    function syncToggleLabel(m) {
      toggle.setAttribute("aria-pressed", m === "dark" ? "true" : "false");
      toggle.setAttribute("data-mode", m);

      var label = toggle.getAttribute("data-label");
      // If author wants a fixed label, respect it.
      // Otherwise, expose current mode via aria-label.
      if (!label) {
        toggle.setAttribute(
          "aria-label",
          "Theme: " + modeLabel(m) + " (activate to change)",
        );
      }

      var span = $(".theme-label", toggle);
      if (span) span.textContent = modeLabel(m);
    }

    // cycle: system -> light -> dark -> system
    function nextMode(m) {
      if (m === "system") return "light";
      if (m === "light") return "dark";
      return "system";
    }

    syncToggleLabel(mode);

    toggle.addEventListener("click", function () {
      mode = nextMode(mode);
      storeTheme(mode);
      applyTheme(mode);
      syncToggleLabel(mode);
    });

    // keyboard accessibility for non-button elements (if used)
    if (toggle.tagName !== "BUTTON") {
      toggle.setAttribute("role", "button");
      toggle.setAttribute("tabindex", "0");
      toggle.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle.click();
        }
      });
    }
  }

  function initCollapsibleSections() {
    var sections = document.querySelectorAll("section.is-collapsible");

    sections.forEach(function (section, idx) {
      var h2 = section.querySelector(":scope > h2");
      if (!h2) return;

      // Wrap everything after the h2 into a content div
      var content = document.createElement("div");
      content.className = "collapsible-content";

      while (h2.nextSibling) {
        content.appendChild(h2.nextSibling);
      }
      section.appendChild(content);

      // Build IDs for aria-controls
      var baseId =
        (h2.textContent || "section")
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") +
        "-" +
        idx;

      var contentId = "collapsible-" + baseId;
      content.id = contentId;

      // Create the toggle button (default expanded)
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "collapse-toggle";
      btn.setAttribute("aria-expanded", "true");
      btn.setAttribute("aria-controls", contentId);
      btn.innerHTML = '<span class="chev" aria-hidden="true">▾</span>';

      // Insert at the beginning of the heading
      h2.insertBefore(btn, h2.firstChild);

      // Toggle behavior
      function toggleSection() {
        var expanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", expanded ? "false" : "true");
        content.hidden = expanded;
      }

      // Button click
      btn.addEventListener("click", function (e) {
        e.stopPropagation(); // prevent double trigger
        toggleSection();
      });

      // Make entire heading clickable
      h2.style.cursor = "pointer";
      h2.addEventListener("click", toggleSection);

      // Keyboard accessibility (Enter + Space)
      h2.setAttribute("tabindex", "0");
      h2.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleSection();
        }
      });
    });
  }

  // --- Optional: normalize external links via config (future-proof) ---
  // If a page includes anchors with data-profile="github|scholar|orcid|linkedin",
  // we can auto-fill hrefs from window.SITE.links.
  function hydrateProfileLinks() {
    if (!window.SITE || !window.SITE.links) return;
    var map = window.SITE.links;

    var nodes = document.querySelectorAll("a[data-profile]");
    nodes.forEach(function (a) {
      var key = a.getAttribute("data-profile");
      if (key && map[key]) a.setAttribute("href", map[key]);
    });
  }

  // --- Run ---
  document.addEventListener("DOMContentLoaded", function () {
    setYear();
    initTheme();
    hydrateProfileLinks();
    initCollapsibleSections();
  });
})();
