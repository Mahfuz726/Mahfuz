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

  // Initialize animated background
  initAnimatedBackground()

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

      // Apply staggered animation
      let delay = 0
      projectItems.forEach((item) => {
        if (filterValue === "all" || item.classList.contains(filterValue)) {
          setTimeout(() => {
            item.style.display = "block"
            setTimeout(() => {
              item.style.opacity = "1"
              item.style.transform = "translateY(0)"
            }, 50)
          }, delay)
          delay += 100 // Stagger effect
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

  // Better mobile menu handling
  const navbarToggler = document.querySelector(".navbar-toggler")
  const mobileOverlay = document.querySelector(".mobile-overlay")
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link")

  if (navbarToggler && mobileOverlay) {
    navbarToggler.addEventListener("click", () => {
      document.body.classList.toggle("menu-open")
    })

    // Close menu when clicking on a link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const navbarCollapse = document.querySelector(".navbar-collapse")
        if (navbarCollapse.classList.contains("show")) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse)
          bsCollapse.hide()
          document.body.classList.remove("menu-open")
        }
      })
    })
  }

  // Improve scroll performance on mobile
  let scrollTimeout
  window.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout)
    if (!document.body.classList.contains("is-scrolling")) {
      document.body.classList.add("is-scrolling")
    }

    scrollTimeout = setTimeout(() => {
      document.body.classList.remove("is-scrolling")
    }, 200)
  })

  // Add touch support for project cards
  const projectCards = document.querySelectorAll(".project-card")
  projectCards.forEach((card) => {
    card.addEventListener(
      "touchstart",
      () => {
        card.classList.add("touch-focus")
      },
      { passive: true },
    )

    card.addEventListener(
      "touchend",
      () => {
        setTimeout(() => {
          card.classList.remove("touch-focus")
        }, 300)
      },
      { passive: true },
    )
  })

  // Fix for tab navigation on mobile
  const tabButtons = document.querySelectorAll('[data-bs-toggle="tab"]')
  tabButtons.forEach((button) => {
    button.addEventListener(
      "touchend",
      () => {
        // Force redraw to fix potential rendering issues on mobile
        setTimeout(() => {
          const targetTab = document.querySelector(button.getAttribute("data-bs-target"))
          if (targetTab) {
            targetTab.style.display = "none"
            setTimeout(() => {
              targetTab.style.display = ""
            }, 5)
          }
        }, 50)
      },
      { passive: true },
    )
  })

  // Fix for text rendering on mobile
  function fixTextRendering() {
    if (window.innerWidth <= 767) {
      const textElements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, .project-title, .project-description")
      textElements.forEach((el) => {
        el.style.maxWidth = "100%"
        el.style.wordWrap = "break-word"
        el.style.overflowWrap = "break-word"
      })
    }
  }

  // Call the function on load and resize
  fixTextRendering()
  window.addEventListener("resize", fixTextRendering)

  // Enhanced Testimonial Carousel
  function initTestimonialCarousel() {
    const testimonialCards = document.querySelectorAll(".testimonial-card")
    const prevButton = document.querySelector(".prev-testimonial")
    const nextButton = document.querySelector(".next-testimonial")
    const dots = document.querySelectorAll(".testimonial-dot")

    if (!testimonialCards.length || !prevButton || !nextButton) return

    let currentIndex = 0
    const totalSlides = testimonialCards.length

    // Initialize for mobile view
    function updateCarouselForMobile() {
      if (window.innerWidth <= 991) {
        testimonialCards.forEach((card, index) => {
          if (index === currentIndex) {
            card.style.display = "block"
            card.style.opacity = "1"
            card.style.transform = "translateY(0)"
          } else {
            card.style.display = "none"
            card.style.opacity = "0"
            card.style.transform = "translateY(20px)"
          }
        })

        // Update dots
        dots.forEach((dot, index) => {
          if (index === currentIndex) {
            dot.classList.add("active")
          } else {
            dot.classList.remove("active")
          }
        })
      } else {
        // Reset for desktop view
        testimonialCards.forEach((card) => {
          card.style.display = "block"
          card.style.opacity = "1"
          card.style.transform = "translateY(0)"
        })
      }
    }

    // Initial setup
    updateCarouselForMobile()

    // Previous slide
    prevButton.addEventListener("click", () => {
      if (window.innerWidth <= 991) {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides
        updateCarouselForMobile()
      }
    })

    // Next slide
    nextButton.addEventListener("click", () => {
      if (window.innerWidth <= 991) {
        currentIndex = (currentIndex + 1) % totalSlides
        updateCarouselForMobile()
      }
    })

    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        if (window.innerWidth <= 991) {
          currentIndex = index
          updateCarouselForMobile()
        }
      })
    })

    // Update on resize
    window.addEventListener("resize", updateCarouselForMobile)

    // Auto-advance slides on mobile
    let autoplayInterval

    function startAutoplay() {
      if (window.innerWidth <= 991) {
        autoplayInterval = setInterval(() => {
          currentIndex = (currentIndex + 1) % totalSlides
          updateCarouselForMobile()
        }, 5000)
      }
    }

    function stopAutoplay() {
      clearInterval(autoplayInterval)
    }

    // Start autoplay
    startAutoplay()

    // Pause autoplay on hover
    const testimonialCarousel = document.getElementById("testimonialCarousel")
    if (testimonialCarousel) {
      testimonialCarousel.addEventListener("mouseenter", stopAutoplay)
      testimonialCarousel.addEventListener("mouseleave", startAutoplay)
    }

    // Touch events for mobile swiping
    let touchStartX = 0
    let touchEndX = 0

    testimonialCarousel.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX
      },
      { passive: true },
    )

    testimonialCarousel.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX
        handleSwipe()
      },
      { passive: true },
    )

    function handleSwipe() {
      if (touchEndX < touchStartX - 50) {
        // Swipe left, go to next
        nextButton.click()
      } else if (touchEndX > touchStartX + 50) {
        // Swipe right, go to previous
        prevButton.click()
      }
    }
  }

  // Initialize the enhanced testimonial carousel
  initTestimonialCarousel()
})

// Function to initialize the animated background
function initAnimatedBackground() {
  const heroSection = document.querySelector(".hero-section")
  if (!heroSection) return

  // Remove existing particles container if it exists
  const existingParticles = document.getElementById("particles-js")
  if (existingParticles) {
    existingParticles.remove()
  }

  // Create animated background elements
  const animatedBg = document.createElement("div")
  animatedBg.className = "animated-background"

  // Create gradient orbs
  for (let i = 0; i < 4; i++) {
    const orb = document.createElement("div")
    orb.className = "gradient-orb"
    orb.style.left = `${Math.random() * 100}%`
    orb.style.top = `${Math.random() * 100}%`
    orb.style.animationDelay = `${Math.random() * 5}s`
    orb.style.animationDuration = `${15 + Math.random() * 15}s`
    animatedBg.appendChild(orb)
  }

  // Create floating shapes
  const shapes = ["circle", "square", "triangle"]
  for (let i = 0; i < 15; i++) {
    const shape = document.createElement("div")
    shape.className = `floating-shape ${shapes[Math.floor(Math.random() * shapes.length)]}`
    shape.style.left = `${Math.random() * 100}%`
    shape.style.top = `${Math.random() * 100}%`
    shape.style.animationDelay = `${Math.random() * 5}s`
    shape.style.animationDuration = `${20 + Math.random() * 20}s`
    shape.style.opacity = `${0.03 + Math.random() * 0.07}`
    shape.style.transform = `scale(${0.5 + Math.random() * 1.5}) rotate(${Math.random() * 360}deg)`
    animatedBg.appendChild(shape)
  }

  // Insert the animated background at the beginning of the hero section
  heroSection.insertBefore(animatedBg, heroSection.firstChild)
}
