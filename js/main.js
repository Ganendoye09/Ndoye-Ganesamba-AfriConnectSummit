/* ============================================================
   AFRICONNECT SUMMIT 2027 — MAIN.JS
   JavaScript vanilla pur — aucune dépendance externe
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initNavbarScroll();
  initHamburgerMenu();
  initScrollReveal();
  initCounters();
  initCountdown();
  initProgramTabs();
  initSpeakerFilter();
  initContactForm();
  initBackToTop();
  initFooterYear();
});

/* ------------------------------------------------------------
   1. DARK / LIGHT MODE
   Le thème est stocké dans localStorage et appliqué via
   l'attribut [data-theme] sur <html>, lu par les variables CSS.
------------------------------------------------------------ */
function initThemeToggle() {
  const root = document.documentElement;
  const toggleButtons = document.querySelectorAll(".theme-toggle");
  const savedTheme = localStorage.getItem("acs-theme") || "light";

  root.setAttribute("data-theme", savedTheme);
  updateToggleIcons(savedTheme);

  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("acs-theme", next);
      updateToggleIcons(next);
    });
  });

  function updateToggleIcons(theme) {
    toggleButtons.forEach((btn) => {
      btn.innerHTML = theme === "dark"
        ? '<i class="bi bi-sun"></i>'
        : '<i class="bi bi-moon-stars"></i>';
      btn.setAttribute("aria-label", theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre");
    });
  }
}

/* ------------------------------------------------------------
   2. NAVBAR DYNAMIQUE AU DÉFILEMENT
------------------------------------------------------------ */
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  const toggleScrollClass = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 80);
  };

  toggleScrollClass();
  window.addEventListener("scroll", toggleScrollClass);
}

/* ------------------------------------------------------------
   3. MENU HAMBURGER (mobile)
------------------------------------------------------------ */
function initHamburgerMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
    });
  });
}

/* ------------------------------------------------------------
   4. ANIMATIONS AU SCROLL (IntersectionObserver)
   Ajoute .is-visible dès qu'un élément entre dans le viewport.
------------------------------------------------------------ */
function initScrollReveal() {
  const targets = document.querySelectorAll(
    ".stat-card, .why-card, .speaker-card, .theme-card, .reveal"
  );
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((el, i) => {
    el.style.animationDelay = `${(i % 4) * 0.08}s`;
    observer.observe(el);
  });
}

/* ------------------------------------------------------------
   5. COMPTEURS ANIMÉS (statistiques)
------------------------------------------------------------ */
function initCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute("data-count"), 10);
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString("fr-FR");
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString("fr-FR") + (el.dataset.suffix || "");
      }
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));
}

/* ------------------------------------------------------------
   6. COMPTE À REBOURS EN TEMPS RÉEL
------------------------------------------------------------ */
function initCountdown() {
  const countdownEl = document.querySelector("[data-countdown]");
  if (!countdownEl) return;

  const targetDate = new Date(countdownEl.getAttribute("data-countdown")).getTime();
  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minutesEl = document.getElementById("cd-minutes");
  const secondsEl = document.getElementById("cd-seconds");

  const update = () => {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      countdownEl.innerHTML = "<p>L'événement a commencé !</p>";
      clearInterval(timer);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");
  };

  update();
  const timer = setInterval(update, 1000);
}

/* ------------------------------------------------------------
   7. ONGLETS DU PROGRAMME (programme.html)
------------------------------------------------------------ */
function initProgramTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");
  if (!tabButtons.length) return;

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-tab");

      tabButtons.forEach((b) => b.classList.remove("active"));
      tabPanels.forEach((p) => p.classList.remove("active"));

      btn.classList.add("active");
      document.getElementById(targetId).classList.add("active");
    });
  });
}

/* ------------------------------------------------------------
   8. FILTRAGE DYNAMIQUE DES INTERVENANTS (intervenants.html)
------------------------------------------------------------ */
function initSpeakerFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const speakerCards = document.querySelectorAll(".speakers-grid.full .speaker-card");
  if (!filterButtons.length) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      speakerCards.forEach((card) => {
        const theme = card.getAttribute("data-theme-tag");
        const shouldShow = filter === "tous" || theme === filter;
        card.classList.toggle("hidden-card", !shouldShow);
      });
    });
  });
}

/* ------------------------------------------------------------
   9. VALIDATION DU FORMULAIRE D'INSCRIPTION (contact.html)
------------------------------------------------------------ */
function initContactForm() {
  const form = document.getElementById("registration-form");
  if (!form) return;

  const successMsg = document.getElementById("form-success");

  const rules = {
    fullname: (v) => v.trim().length >= 3,
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    phone: (v) => v.replace(/\D/g, "").length >= 8,
    participation: (v) => v.trim() !== "",
    country: (v) => v.trim() !== "",
    message: (v) => v.trim().length >= 20,
  };

  const errorMessages = {
    fullname: "Merci d'indiquer votre nom complet (3 caractères minimum).",
    email: "Merci d'indiquer une adresse email valide.",
    phone: "Le numéro doit contenir au moins 8 chiffres.",
    participation: "Merci de choisir un type de participation.",
    country: "Merci de sélectionner votre pays.",
    message: "Votre message doit contenir au moins 20 caractères.",
  };

  const fields = Object.keys(rules).map((name) => form.elements[name]);

  const validateField = (field) => {
    const name = field.name;
    const group = field.closest(".form-group");
    const errorEl = group.querySelector(".error-msg");
    const isValid = rules[name](field.value);

    group.classList.toggle("valid", isValid);
    group.classList.toggle("invalid", !isValid);
    errorEl.textContent = isValid ? "" : errorMessages[name];

    return isValid;
  };

  fields.forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.closest(".form-group").classList.contains("invalid")) {
        validateField(field);
      }
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const allValid = fields.map(validateField).every(Boolean);

    if (!allValid) {
      successMsg.classList.remove("show");
      return;
    }

    successMsg.textContent = "Merci ! Votre inscription à AfriConnect Summit 2027 a bien été enregistrée.";
    successMsg.classList.add("show");

    form.reset();
    fields.forEach((field) => {
      const group = field.closest(".form-group");
      group.classList.remove("valid", "invalid");
      group.querySelector(".error-msg").textContent = "";
    });

    setTimeout(() => successMsg.classList.remove("show"), 6000);
  });
}

/* ------------------------------------------------------------
   10. BOUTON RETOUR EN HAUT
------------------------------------------------------------ */
function initBackToTop() {
  const btn = document.querySelector(".back-to-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 300);
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ------------------------------------------------------------
   11. ANNÉE DYNAMIQUE DANS LE FOOTER
------------------------------------------------------------ */
function initFooterYear() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}
