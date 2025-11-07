document.addEventListener("DOMContentLoaded", function() {
  // =============================================
  // Core Initialization
  // =============================================

  // Check for mobile device
  const isMobile = window.innerWidth <= 767 || ('ontouchstart' in window);

  // =============================================
  // Projects Data
  // =============================================
  const projectsData = [
    {
      id: 1,
      title: "Verantixai Platform",
      description: "A modern AI annotation platform with intuitive interface.",
      image: "websit.jpg",
      category: "web",
      categoryName: "Web Devolepment",
      tags: ["HTML5", "CSS3"],
      link: "https://verantixai.com/"
    },
    {
      id: 2,
      title: "Logo Design Collection",
      description: "Custom logos designed for various clients with unique brand identities.",
      image: "Grachice1.jpg",
      category: "mobile",
      categoryName: "Graphic Design",
      tags: ["Illustrator", "Branding"],
      link: "https://www.behance.net/gallery/90217163/logoi-can-make-your-logo-i-work-until-you-are-fully"
    },
    {
      id: 3,
      title: "Dashboard UI Kit",
      description: "Comprehensive UI components for healthcare dashboard application.",
      image: "Uiux.jpg",
      category: "ui",
      categoryName: "UI/UX",
      tags: ["Figma", "UI/UX"],
      link: "https://www.behance.net/gallery/224418017/E-care-hub"
    },
    {
      id: 4,
      title: "Corporate Branding",
      description: "Complete branding solutions for corporate identity and marketing materials.",
      image: "bandging.jpg",
      category: "branding",
      categoryName: "Branding",
      tags: ["Branding", "Identity"],
      link: "https://www.behance.net/gallery/224417591/Onekkisu-bd-brand-level"
    },
    {
      id: 5,
      title: "Web App Design - HisabWala",
      description: "HisabWala – Smart Accounting Web App Design with user-friendly interface.",
      image: "HisabWala web.png",
      category: "ui",
      categoryName: "UI/UX",
      tags: ["Figma", "UI/UX"],
      link: "https://www.behance.net/gallery/238118061/HisabWala-Smart-Accounting-Web-App-Design"
    },
    {
      id: 6,
      title: "Modern e-commerce website",
      description: "A clean, modern e-commerce website design — built for both customers and sellers",
      image: "Techno.png",
      category: "ui",
      categoryName: "UI/UX",
      tags: ["Figma", "UI/UX"],
      link: "https://www.behance.net/gallery/237648767/Modern-E-Commerce-Website-for-Buyers-Sellers"
    },
    {
      id: 7,
      title: "HisabWala – Mobile App UI Design",
      description: "HisabWala is a smart accounting mobile app built for small business owners",
      image: "HisabWala mobile.png",
      category: "ui",
      categoryName: "UI/UX",
      tags: ["Figma", "UI/UX"],
      link: "https://www.behance.net/gallery/238118337/HisabWala-Mobile-App-UI-Design"
    },
    {
      id: 8,
      title: "Pet Food App – Mobile UI Design",
      description: "Pet Food App is a modern and friendly mobile UI concept created for pet owners to easily",
      image: "pet mobile.png",
      category: "ui",
      categoryName: "UI/UX",
      tags: ["Figma", "UI/UX"],
      link: "https://www.behance.net/gallery/238118595/Pet-Food-App-Mobile-UI-Design"
    },
    {
      id: 9,
      title: "Admin Dashboard – Web UI Design",
      description: "This is a clean and minimal Admin Dashboard concept designed for managing products.",
      image: "Dash bord.png",
      category: "ui",
      categoryName: "UI/UX",
      tags: ["Figma", "UI/UX"],
      link: "https://www.behance.net/gallery/238119171/Admin-Dashboard-Web-UI-Design"
    },
    {
      id: 10,
      title: "TechRiv – Website UI/UX Design",
      description: "TechRiv is a creative tech company website concept designed to communicate",
      image: "TechRiv.png",
      category: "ui",
      categoryName: "UI/UX",
      tags: ["Figma", "UI/UX"],
      link: "https://www.behance.net/gallery/238118931/TechRiv-Website-UI-Design"
    },
    {
      id: 6,
      title: "Coming Soon",
      description: "New website project in development with modern features and responsive layout.",
      image: "websit 2.jpg",
      category: "web",
      categoryName: "Web Web Devolepment",
      tags: ["HTML5", "JavaScript"],
      link: "#"
    },
    {
      id: 7,
      title: "Brochure Design",
      description: "Professional brochure designs with attention to typography and visual hierarchy.",
      image: "graphice 2.jpg",
      category: "mobile",
      categoryName: "Graphic Design",
      tags: ["InDesign", "Print"],
      link: "https://www.behance.net/gallery/88859919/Broshoer"
    },
      
  ];

  // =============================================
  // Project Rendering and Management
  // =============================================
  let currentFilter = 'all';
  let showAllProjects = false;
  const projectsPerPage = 6;

  function renderProjects(filter = 'all', showAll = false) {
    const projectGrid = document.querySelector('.project-grid');
    if (!projectGrid) return;

    let filteredProjects = filter === 'all' ? projectsData : projectsData.filter(project => project.category === filter);
    const projectsToShow = showAll ? filteredProjects : filteredProjects.slice(0, projectsPerPage);
    const hasMoreProjects = filteredProjects.length > projectsPerPage;

    projectGrid.innerHTML = '';

    projectsToShow.forEach((project, index) => {
      const projectHTML = `
        <div class="col-lg-4 col-md-6 project-item ${project.category}" data-aos="fade-up" data-aos-delay="${(index % 6 + 1) * 100}">
          <div class="project-card">
            <div class="project-image">
              <img src="${project.image}" alt="${project.title}" class="img-fluid">
              <span class="project-category">${project.categoryName}</span>
              <div class="project-overlay"></div>
            </div>
            <div class="project-content">
              <h3 class="project-title">${project.title}</h3>
              <p class="project-description">${project.description}</p>
              <div class="project-meta">
                <div class="project-tags">
                  ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <a href="${project.link}" class="project-link" ${project.link !== '#' ? 'target="_blank"' : ''}><i class="fas fa-external-link-alt"></i></a>
              </div>
            </div>
          </div>
        </div>
      `;
      projectGrid.insertAdjacentHTML('beforeend', projectHTML);
    });

    // Update "See More" button
    updateSeeMoreButton(hasMoreProjects, showAll);
  }

  function updateSeeMoreButton(hasMore, isExpanded) {
    const viewAllBtn = document.querySelector('.view-all-projects');
    if (!viewAllBtn) return;

    const buttonContainer = viewAllBtn.closest('.row');

    if (hasMore) {
      viewAllBtn.style.display = 'inline-block';
      viewAllBtn.innerHTML = isExpanded ? 'See Less <i class="fas fa-arrow-up ms-2"></i>' : 'See More <i class="fas fa-arrow-down ms-2"></i>';
    } else {
      viewAllBtn.style.display = 'none';
    }
  }

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
// Project Filtering & View All Functionality
// =============================================
const filters = document.querySelectorAll(".filter");
const viewAllBtn = document.querySelector(".view-all-projects");

// Initialize projects on page load
renderProjects();

// Project Filtering
if (filters.length > 0) {
  filters.forEach((filter) => {
    filter.addEventListener("click", function() {
      filters.forEach((f) => f.classList.remove("active"));
      this.classList.add("active");

      currentFilter = this.getAttribute("data-filter");
      renderProjects(currentFilter, showAllProjects);
    });
  });
}

// View All Projects Button
if (viewAllBtn) {
  viewAllBtn.addEventListener("click", function(e) {
    e.preventDefault();

    showAllProjects = !showAllProjects;
    renderProjects(currentFilter, showAllProjects);

    if (showAllProjects) {
      // Scroll to show new projects
      setTimeout(() => {
        this.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }, 100);
    } else {
      // Scroll back to projects section
      setTimeout(() => {
        document.querySelector("#projects").scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 100);
    }
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
    // Desktop setup with Slick if available (defensive checks)
    else if (window.jQuery && window.jQuery.fn && window.jQuery.fn.slick && carousel.querySelectorAll('.testimonial-card').length > 0) {
      try {
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
      } catch (err) {
        // If slick throws for some reason, log and continue gracefully
        // (Slick's minified errors can appear as cryptic 'add' errors when DOM is unexpected)
        console.warn('Slick initialization failed for testimonial carousel:', err);
      }
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
