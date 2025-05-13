document.addEventListener("DOMContentLoaded", function() {
  // =============================================
  // Core Initialization
  // =============================================
  
  // Check for mobile device
  const isMobile = window.innerWidth <= 767 || ('ontouchstart' in window);
  
  // =============================================
  // Preloader
  // =============================================
  const preloader = document.querySelector(".preloader");
  if (preloader) {
    window.addEventListener("load", function() {
      preloader.classList.add("fade-out");
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    });
  }

  // =============================================
  // Cursor Follower (Desktop only)
  // =============================================
  if (!isMobile) {
    const cursorFollower = document.querySelector(".cursor-follower");
    if (cursorFollower) {
      document.addEventListener("mousemove", (e) => {
        cursorFollower.style.left = e.clientX + "px";
        cursorFollower.style.top = e.clientY + "px";
      });

      const interactiveElements = document.querySelectorAll("a, button, .project-card, .service-card, .nav-link, .filter");
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          cursorFollower.style.transform = "translate(-50%, -50%) scale(2)";
          cursorFollower.style.backgroundColor = "rgba(108, 99, 255, 0.1)";
          cursorFollower.style.border = "1px solid var(--primary-color)";
        });
        el.addEventListener("mouseleave", () => {
          cursorFollower.style.transform = "translate(-50%, -50%) scale(1)";
          cursorFollower.style.backgroundColor = "rgba(108, 99, 255, 0.3)";
          cursorFollower.style.border = "none";
        });
      });
    }
  }

  // =============================================
  // Navbar Scroll Effect
  // =============================================
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", function() {
      if (window.scrollY > 100) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  // =============================================
  // Smooth Scrolling
  // =============================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        });

        // Close mobile menu when clicking a link
        const navbarCollapse = document.querySelector(".navbar-collapse");
        if (navbarCollapse && navbarCollapse.classList.contains("show")) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse);
          bsCollapse.hide();
        }
      }
    });
  });

  // =============================================
  // Typed.js Initialization
  // =============================================
  if (document.querySelector(".typed-text") && typeof Typed !== 'undefined') {
    const typed = new Typed(".typed-text", {
      strings: ["Web Developer", "UI/UX Designer", "Graphic Designer", "Freelancer"],
      typeSpeed: isMobile ? 70 : 50,
      backSpeed: isMobile ? 50 : 30,
      loop: true,
      showCursor: true,
      cursorChar: "|",
      smartBackspace: true,
    });
  }

  // =============================================
  // Back to Top Button
  // =============================================
  const backToTopButton = document.querySelector(".back-to-top");
  if (backToTopButton) {
    window.addEventListener("scroll", function() {
      if (window.scrollY > 300) {
        backToTopButton.classList.add("active");
      } else {
        backToTopButton.classList.remove("active");
      }
    });
    
    backToTopButton.addEventListener("click", function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // =============================================
  // Active Nav Link on Scroll
  // =============================================
  const sections = document.querySelectorAll("section");
  if (sections.length > 0) {
    window.addEventListener("scroll", function() {
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
          current = section.getAttribute("id");
        }
      });

      document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });
    });
  }

  // =============================================
  // About Tabs Functionality
  // =============================================
  const skillsTabBtn = document.getElementById("skills-tab-btn");
  const educationTabBtn = document.getElementById("education-tab-btn");
  const skillsTab = document.getElementById("skills-tab");
  const educationTab = document.getElementById("education-tab");

  if (skillsTabBtn && educationTabBtn && skillsTab && educationTab) {
    skillsTabBtn.addEventListener("click", function() {
      skillsTab.classList.add("show", "active");
      educationTab.classList.remove("show", "active");
      skillsTabBtn.classList.add("active");
      skillsTabBtn.setAttribute("aria-selected", "true");
      educationTabBtn.classList.remove("active");
      educationTabBtn.setAttribute("aria-selected", "false");
    });

    educationTabBtn.addEventListener("click", function() {
      educationTab.classList.add("show", "active");
      skillsTab.classList.remove("show", "active");
      educationTabBtn.classList.add("active");
      educationTabBtn.setAttribute("aria-selected", "true");
      skillsTabBtn.classList.remove("active");
      skillsTabBtn.setAttribute("aria-selected", "false");
    });
  }

  // =============================================
  // AOS Animation Initialization
  // =============================================
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
      disable: isMobile ? true : false // Disable on mobile if needed
    });
  }

  // =============================================
  // Project Filtering
  // =============================================
  const filters = document.querySelectorAll(".filter");
  const projectItems = document.querySelectorAll(".project-item");

  if (filters.length > 0 && projectItems.length > 0) {
    filters.forEach((filter) => {
      filter.addEventListener("click", function() {
        filters.forEach((f) => f.classList.remove("active"));
        this.classList.add("active");

        const filterValue = this.getAttribute("data-filter");

        let delay = 0;
        projectItems.forEach((item) => {
          if (filterValue === "all" || item.classList.contains(filterValue)) {
            setTimeout(() => {
              item.style.display = "block";
              setTimeout(() => {
                item.style.opacity = "1";
                item.style.transform = "translateY(0)";
              }, 50);
            }, delay);
            delay += 100;
          } else {
            item.style.opacity = "0";
            item.style.transform = "translateY(20px)";
            setTimeout(() => {
              item.style.display = "none";
            }, 300);
          }
        });
      });
    });
  }

  // =============================================
  // TESTIMONIALS SECTION FIX (Mobile Optimization)
  // =============================================
  function initTestimonials() {
    const testimonialSection = document.querySelector('.testimonials-section');
    if (!testimonialSection) return;

    // Ensure section is visible
    testimonialSection.style.display = 'block';
    testimonialSection.style.visibility = 'visible';
    testimonialSection.style.opacity = '1';

    const carousel = testimonialSection.querySelector('.testimonial-carousel');
    if (!carousel) return;

    // Mobile-specific setup
    if (isMobile) {
      carousel.classList.add('mobile-carousel');
      
      const cards = carousel.querySelectorAll('.testimonial-card');
      if (cards.length > 0) {
        // Reset all cards first
        cards.forEach(card => {
          card.style.display = 'block';
          card.style.opacity = '1';
        });

        // If more than one card, setup simple carousel
        if (cards.length > 1) {
          let currentIndex = 0;
          
          // Initially show only first card
          cards.forEach((card, i) => {
            card.style.display = i === 0 ? 'block' : 'none';
          });

          // Auto-rotate
          setInterval(() => {
            cards[currentIndex].style.display = 'none';
            currentIndex = (currentIndex + 1) % cards.length;
            cards[currentIndex].style.display = 'block';
          }, 5000);
        }
      }
    } 
    // Desktop setup with Slick if available
    else if (typeof $.fn.slick !== 'undefined') {
      $(carousel).slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 1,
            }
          }
        ]
      });
    }
  }

  // Initialize testimonials
  initTestimonials();

  // =============================================
  // Form Submission
  // =============================================
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      const feedbackDiv = document.querySelector(".form-feedback");
      if (feedbackDiv) {
        feedbackDiv.style.display = "block";
        feedbackDiv.innerHTML = '<div class="alert alert-info">Sending your message...</div>';
      }
    });
  }

  // =============================================
  // Work Alert Animation
  // =============================================
  const workAlert = document.querySelector(".work-alert");
  if (workAlert) {
    workAlert.addEventListener("mouseenter", function() {
      const track = document.querySelector(".alert-track");
      if (track) track.style.animationPlayState = "paused";
    });

    workAlert.addEventListener("mouseleave", function() {
      const track = document.querySelector(".alert-track");
      if (track) track.style.animationPlayState = "running";
    });
  }

  // =============================================
  // Mobile Menu Handling
  // =============================================
  const navbarToggler = document.querySelector(".navbar-toggler");
  const mobileOverlay = document.querySelector(".mobile-overlay");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  if (navbarToggler) {
    navbarToggler.addEventListener("click", function() {
      document.body.classList.toggle("menu-open");
    });

    // Close menu when clicking on a link
    navLinks.forEach((link) => {
      link.addEventListener("click", function() {
        const navbarCollapse = document.querySelector(".navbar-collapse");
        if (navbarCollapse && navbarCollapse.classList.contains("show")) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse);
          bsCollapse.hide();
          document.body.classList.remove("menu-open");
        }
      });
    });
  }

  // =============================================
  // Touch Support for Project Cards
  // =============================================
  if (isMobile) {
    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach((card) => {
      card.addEventListener("touchstart", function() {
        this.classList.add("touch-focus");
      }, { passive: true });

      card.addEventListener("touchend", function() {
        setTimeout(() => {
          this.classList.remove("touch-focus");
        }, 300);
      }, { passive: true });
    });
  }

  // =============================================
  // Text Rendering Optimization for Mobile
  // =============================================
  function optimizeTextRendering() {
    if (isMobile) {
      const textElements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, li, .project-title, .project-description");
      textElements.forEach((el) => {
        el.style.maxWidth = "100%";
        el.style.wordWrap = "break-word";
        el.style.overflowWrap = "break-word";
        el.style.hyphens = "auto";
      });
    }
  }

  // Initial optimization
  optimizeTextRendering();
  
  // Re-optimize on resize
  window.addEventListener("resize", function() {
    optimizeTextRendering();
    initTestimonials(); // Re-init testimonials on resize
  });

  // =============================================
  // Initialize Animated Background
  // =============================================
  function initAnimatedBackground() {
    const heroSection = document.querySelector(".hero-section");
    if (!heroSection) return;

    const existingParticles = document.getElementById("particles-js");
    if (existingParticles) existingParticles.remove();

    const animatedBg = document.createElement("div");
    animatedBg.className = "animated-background";

    // Create gradient orbs
    for (let i = 0; i < (isMobile ? 2 : 4); i++) {
      const orb = document.createElement("div");
      orb.className = "gradient-orb";
      orb.style.left = `${Math.random() * 100}%`;
      orb.style.top = `${Math.random() * 100}%`;
      orb.style.animationDelay = `${Math.random() * 5}s`;
      orb.style.animationDuration = `${15 + Math.random() * 15}s`;
      animatedBg.appendChild(orb);
    }

    // Create floating shapes
    const shapes = ["circle", "square", "triangle"];
    for (let i = 0; i < (isMobile ? 8 : 15); i++) {
      const shape = document.createElement("div");
      shape.className = `floating-shape ${shapes[Math.floor(Math.random() * shapes.length)]}`;
      shape.style.left = `${Math.random() * 100}%`;
      shape.style.top = `${Math.random() * 100}%`;
      shape.style.animationDelay = `${Math.random() * 5}s`;
      shape.style.animationDuration = `${20 + Math.random() * 20}s`;
      shape.style.opacity = `${0.03 + Math.random() * 0.07}`;
      shape.style.transform = `scale(${0.5 + Math.random() * 1.5}) rotate(${Math.random() * 360}deg)`;
      animatedBg.appendChild(shape);
    }

    heroSection.insertBefore(animatedBg, heroSection.firstChild);
  }

  // Initialize background if not on mobile
  if (!isMobile) {
    initAnimatedBackground();
  }
});