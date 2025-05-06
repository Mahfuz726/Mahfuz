document.addEventListener("DOMContentLoaded", () => {
    // Preloader
    const preloader = document.querySelector(".preloader")
    window.addEventListener("load", () => {
      preloader.classList.add("fade-out")
      setTimeout(() => {
        preloader.style.display = "none"
      }, 500)
    })
  
    // Cursor Follower
    const cursorFollower = document.querySelector(".cursor-follower")
    document.addEventListener("mousemove", (e) => {
      cursorFollower.style.left = e.clientX + "px"
      cursorFollower.style.top = e.clientY + "px"
    })
  
    // Add cursor effect to interactive elements
    const interactiveElements = document.querySelectorAll("a, button, .project-card, .service-card, .nav-link, .filter")
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorFollower.style.transform = "translate(-50%, -50%) scale(2)"
        cursorFollower.style.backgroundColor = "rgba(108, 99, 255, 0.1)"
        cursorFollower.style.border = "1px solid var(--primary-color)"
      })
      el.addEventListener("mouseleave", () => {
        cursorFollower.style.transform = "translate(-50%, -50%) scale(1)"
        cursorFollower.style.backgroundColor = "rgba(108, 99, 255, 0.3)"
        cursorFollower.style.border = "none"
      })
    })
  
    // Navbar scroll effect
    const navbar = document.querySelector(".navbar")
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }
    })
  
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)
  
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: "smooth",
          })
  
          // Close mobile menu when clicking a link
          const navbarCollapse = document.querySelector(".navbar-collapse")
          if (navbarCollapse.classList.contains("show")) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse)
            bsCollapse.hide()
          }
        }
      })
    })
  
    // Typed.js initialization
    const typed = new Typed(".typed-text", {
      strings: ["Web Developer", "UI/UX Designer", "Graphic Designer", "Freelancer"],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
      showCursor: true,
      cursorChar: "|",
      smartBackspace: true,
    })
  
    // Back to top button
    const backToTopButton = document.querySelector(".back-to-top")
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add("active")
      } else {
        backToTopButton.classList.remove("active")
      }
    })
    backToTopButton.addEventListener("click", (e) => {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  
    // Active nav link on scroll
    const sections = document.querySelectorAll("section")
    window.addEventListener("scroll", () => {
      let current = ""
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
  
        if (pageYOffset >= sectionTop - 200) {
          current = section.getAttribute("id")
        }
      })
  
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active")
        }
      })
    })
  
    // Fix for About tabs functionality
    const skillsTabBtn = document.getElementById("skills-tab-btn")
    const educationTabBtn = document.getElementById("education-tab-btn")
    const skillsTab = document.getElementById("skills-tab")
    const educationTab = document.getElementById("education-tab")
  
    if (skillsTabBtn && educationTabBtn) {
      // Ensure tabs work properly with manual implementation
      skillsTabBtn.addEventListener("click", () => {
        // Show skills tab, hide education tab
        skillsTab.classList.add("show", "active")
        educationTab.classList.remove("show", "active")
  
        // Update active state on buttons
        skillsTabBtn.classList.add("active")
        skillsTabBtn.setAttribute("aria-selected", "true")
        educationTabBtn.classList.remove("active")
        educationTabBtn.setAttribute("aria-selected", "false")
      })
  
      educationTabBtn.addEventListener("click", () => {
        // Show education tab, hide skills tab
        educationTab.classList.add("show", "active")
        skillsTab.classList.remove("show", "active")
  
        // Update active state on buttons
        educationTabBtn.classList.add("active")
        educationTabBtn.setAttribute("aria-selected", "true")
        skillsTabBtn.classList.remove("active")
        skillsTabBtn.setAttribute("aria-selected", "false")
      })
    }
  
    // Initialize AOS Animation
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: true,
        mirror: false,
      })
    }
  
    // Initialize particles.js
    if (document.getElementById("particles-js") && typeof particlesJS !== "undefined") {
      particlesJS("particles-js", {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#6c63ff",
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000",
            },
            polygon: {
              nb_sides: 5,
            },
          },
          opacity: {
            value: 0.3,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#6c63ff",
            opacity: 0.2,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab",
            },
            onclick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 1,
              },
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
            push: {
              particles_nb: 4,
            },
            remove: {
              particles_nb: 2,
            },
          },
        },
        retina_detect: true,
      })
    }
  
    // Project filtering
    const filters = document.querySelectorAll(".filter")
    const projectItems = document.querySelectorAll(".project-item")
  
    filters.forEach((filter) => {
      filter.addEventListener("click", function () {
        // Remove active class from all filters
        filters.forEach((f) => f.classList.remove("active"))
        // Add active class to clicked filter
        this.classList.add("active")
  
        const filterValue = this.getAttribute("data-filter")
  
        projectItems.forEach((item) => {
          if (filterValue === "all" || item.classList.contains(filterValue)) {
            item.style.display = "block"
            setTimeout(() => {
              item.style.opacity = "1"
              item.style.transform = "translateY(0)"
            }, 50)
          } else {
            item.style.opacity = "0"
            item.style.transform = "translateY(20px)"
            setTimeout(() => {
              item.style.display = "none"
            }, 300)
          }
        })
      })
    })
  
    // Initialize testimonial carousel with jQuery if available
    if (typeof $.fn.slick !== "undefined" && typeof $ !== "undefined") {
      $(".testimonial-carousel").slick({
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
            },
          },
        ],
      })
    }
  
    // Form submission
    const contactForm = document.querySelector(".contact-form")
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        // Form submission is handled by Formspree
        const feedbackDiv = document.querySelector(".form-feedback")
  
        // Show loading message
        feedbackDiv.style.display = "block"
        feedbackDiv.innerHTML = '<div class="alert alert-info">Sending your message...</div>'
  
        // Formspree will handle the actual submission
      })
    }
  
    // Work alert animation
    document.querySelector(".work-alert").addEventListener("mouseenter", () => {
      document.querySelector(".alert-track").style.animationPlayState = "paused"
    })
  
    document.querySelector(".work-alert").addEventListener("mouseleave", () => {
      document.querySelector(".alert-track").style.animationPlayState = "running"
    })
  })
  