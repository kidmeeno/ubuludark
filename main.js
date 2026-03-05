document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu logic
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeMenuBtn = document.getElementById("close-menu-btn");

  function toggleMenu() {
    mobileMenu.classList.toggle("open");
    document.body.classList.toggle("overflow-hidden");
  }

  if (mobileMenuBtn && mobileMenu && closeMenuBtn) {
    mobileMenuBtn.addEventListener("click", toggleMenu);
    closeMenuBtn.addEventListener("click", toggleMenu);
  }

  // Scroll reveal logic
  function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    reveals.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", reveal);
  reveal(); // Trigger on load

  // Sticky header logic
  const header = document.getElementById("main-header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("shadow-md", "bg-opacity-95", "backdrop-blur-sm");
        header.classList.remove("bg-opacity-100");
      } else {
        header.classList.remove(
          "shadow-md",
          "bg-opacity-95",
          "backdrop-blur-sm",
        );
        header.classList.add("bg-opacity-100");
      }
    });
  }

  // Numbers animation logic (Impact Stats)
  const stats = document.querySelectorAll(".stat-number");
  let hasAnimated = false;

  function animateNumbers() {
    if (hasAnimated) return;

    let inView = false;
    stats.forEach((stat) => {
      const rect = stat.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        inView = true;
      }
    });

    if (inView) {
      hasAnimated = true;
      stats.forEach((stat) => {
        const target = parseInt(stat.getAttribute("data-target"));
        const duration = 2000; // ms
        const increment = target / (duration / 16); // 60fps

        let current = 0;
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            stat.innerText = Math.ceil(current) + "+";
            requestAnimationFrame(updateCounter);
          } else {
            stat.innerText = target + "+";
          }
        };
        updateCounter();
      });
    }
  }

  if (stats.length > 0) {
    window.addEventListener("scroll", animateNumbers);
    animateNumbers(); // Trigger on load if in view
  }
});
