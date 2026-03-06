const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const sectionLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const revealTargets = document.querySelectorAll(".reveal");
const projectToggles = document.querySelectorAll(".project-toggle");
const yearEl = document.querySelector("#year");

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

sectionLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks) {
      navLinks.classList.remove("open");
    }
  });
});

projectToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const details = toggle.nextElementSibling;
    if (!details) {
      return;
    }

    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.textContent = isOpen ? "View details" : "Hide details";
    details.hidden = isOpen;
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, io) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -20px 0px"
    }
  );

  revealTargets.forEach((target) => observer.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

// Lightbox functionality for project images
const projectImages = document.querySelectorAll(".project-image");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxBackdrop = document.querySelector(".lightbox-backdrop");

projectImages.forEach((img) => {
  img.addEventListener("click", () => {
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  });
});

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

lightboxClose.addEventListener("click", closeLightbox);
lightboxBackdrop.addEventListener("click", closeLightbox);

// Close lightbox on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !lightbox.hidden) {
    closeLightbox();
  }
});
