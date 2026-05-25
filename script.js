async function loadSection(id, file) {
  try {
    console.log("Loading:", file);

    const element = document.getElementById(id);

    if (!element) {
      console.error(`Element #${id} not found`);
      return;
    }

    const response = await fetch(file);

    if (!response.ok) {
      throw new Error(`Cannot load ${file}`);
    }

    const html = await response.text();

    console.log(`${file} loaded successfully`);

    element.innerHTML = html;
  } catch (err) {
    console.error("ERROR:", err);
  }
}

async function loadSections() {
  await loadSection("hero", "hero.html");
  await loadSection("services", "services.html");
  await loadSection("projects", "projects.html");
  await loadSection("why", "why.html");
  await loadSection("testimonials", "testimonials.html");
  await loadSection("contact", "contact.html");
  await loadSection("footer", "footer.html");
}

loadSections();

const projects = {
  fitzone: {
    category: "Gym & Fitness",
    title: "FitZone Gym",
    live: "https://iron-forge-gym-vert-xi.vercel.app/",
    github: "https://github.com/Amrutha9010/IronForgeGym",
    sub: "A bold, conversion-focused website for a modern gym in Gachibowli. The goal was to make it easy for potential members to explore plans, book a free trial, and feel motivated to join — all from their phone.",
    image: "images/gym.png",
    features: [
      "Membership plan cards with pricing",
      "Free trial booking form",
      "Class schedule & timetable",
      "Trainer profile section",
      "Before/after transformation gallery",
      "WhatsApp floating button",
      "Google Maps embed",
    ],
    goals: [
      "Increased trial bookings by giving an easy online form",
      "Reduced phone enquiries with a clear FAQ section",
      "Built trust with trainer profiles and member testimonials",
      "Mobile-first design since 80% of gym leads come from phones",
    ],
    stack: [
      "Responsive Design",
      "WhatsApp API",
      "Google Maps",
    ],
  },
  spice: {
    category: "Restaurant",
    title: "Spice Garden Restaurant",
    live: "https://restraunt-website-chi.vercel.app/",
    github: "https://github.com/Amrutha9010/Restraunt_Website",
    sub: "A warm, appetising website for a South Indian restaurant in Banjara Hills. Designed to make customers hungry before they even walk in — with a visual menu, table booking, and easy directions.",
    image: "images/restaurant.png",
    features: [
      "Visual menu with categories & prices",
      "Online table reservation form",
      "Chef's special highlights section",
      "Photo gallery of dishes & ambience",
      "Google Maps & opening hours",
      "Instagram feed integration",
      "WhatsApp order/enquiry button",
    ],
    goals: [
      "Online reservations reduced no-shows with confirmation emails",
      "Visual menu meant customers arrived knowing what they wanted",
      "Instagram integration kept the site fresh without manual updates",
      'Clear contact section reduced "where are you located" calls',
    ],
    stack: [
      "Reservation Form",
      "Google Maps",
      "Instagram API",
    ],
  },
  "beauty salon": {
    category: "Beauty Salon",

    title: "Beauty Salon",
    sub: "A modern, inviting beauty salon website with service listings, staff profiles, appointment booking, and customer testimonials.",
    live: "https://saloon-website-flame-psi.vercel.app/",
    github: "https://github.com/Amrutha9010/Saloon_Website",
    image: "images/salon.png",
    features: [
      "Staff profiles with photos & bios",
      "Services list with descriptions",
      "Online appointment request form",
      "Customer testimonials section",
      "Before/after gallery",
      "Google Maps & opening hours",
      "Contact information prominently displayed",
    ],
    goals: [
      "Appointment form reduced phone call volume significantly",
      "Staff profiles built immediate trust with new patients",
      "Clear services page set expectations before the first visit",
      'Mobile-optimised for patients searching "beauty salon near me"',
    ],
    stack: [
      "Appointment Form",
      "Schema Markup",
      "SEO-Optimised",
    ],
  },
};

function openModal(key) {
  const p = projects[key];

  document.getElementById("modalCategory").textContent = p.category;
  document.getElementById("modalTitle").textContent = p.title;
  document.getElementById("modalSub").textContent = p.sub;
  document.getElementById("liveDemoBtn").href = p.live;
  // document.getElementById("githubBtn").href = p.github;

  // IMAGE SET
  document.getElementById("modalThumb").innerHTML = `
    <img src="${p.image}" alt="${p.title}">
  `;

  const feat = document.getElementById("modalFeatures");
  feat.innerHTML = p.features.map((f) => `<li>${f}</li>`).join("");

  const goals = document.getElementById("modalGoals");
  goals.innerHTML = p.goals.map((g) => `<li>${g}</li>`).join("");

  const stack = document.getElementById("modalStack");
  stack.innerHTML = p.stack
    .map((s) => `<span class="stack-badge">${s}</span>`)
    .join("");

  document.getElementById("modalOverlay").classList.add("open");

  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

function closeModalOutside(e) {
  if (e.target === document.getElementById("modalOverlay")) closeModal();
}

function toggleMenu() {
  document.getElementById("mobileMenu").classList.toggle("open");
}

// Scroll reveal
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
revealEls.forEach((el) => io.observe(el));

// Nav scroll
window.addEventListener("scroll", () => {
  document
    .getElementById("nav")
    .classList.toggle("scrolled", window.scrollY > 30);
});

// ESC close modal
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// Form submit
setTimeout(() => {
  const formButton = document.querySelector(".form-submit");

  if (formButton) {
    formButton.addEventListener("click", function () {
      this.textContent = "✅ Message sent! I'll reply within 24 hours.";
      this.style.background = "var(--accent)";
      this.disabled = true;
    });
  }
}, 500);
