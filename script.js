// ========================================
// SCROLL REVEAL ANIMATION
// ========================================

const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed")
      revealObserver.unobserve(entry.target)
    }
  })
}, observerOptions)

document.addEventListener("DOMContentLoaded", () => {
  // Observe all scroll reveal elements
  const revealElements = document.querySelectorAll("[data-scroll-reveal]")
  revealElements.forEach((el) => revealObserver.observe(el))

  // Initialize all components
  initNavigation()
  initReviewsSlider()
  initSmoothScroll()
})

// ========================================
// NAVIGATION SCROLL EFFECT
// ========================================

function initNavigation() {
  const navigation = document.querySelector(".navigation")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navigation.classList.add("scrolled")
    } else {
      navigation.classList.remove("scrolled")
    }
  })
}

// ========================================
// REVIEWS SLIDER
// ========================================

function initReviewsSlider() {
  const slides = document.querySelectorAll(".reviews__slide")
  const dots = document.querySelectorAll(".reviews__dot")
  let currentSlide = 0
  const slideInterval = 5000

  // Show initial slide
  if (slides.length > 0) {
    slides[0].classList.add("active")
  }

  function showSlide(index) {
    // Hide all slides
    slides.forEach((slide) => {
      slide.classList.remove("active")
    })

    // Remove active from all dots
    dots.forEach((dot) => {
      dot.classList.remove("reviews__dot--active")
    })

    // Show current slide
    if (slides[index]) {
      slides[index].classList.add("active")
    }

    if (dots[index]) {
      dots[index].classList.add("reviews__dot--active")
    }
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length
    showSlide(currentSlide)
  }

  // Auto advance slides
  let autoSlide = setInterval(nextSlide, slideInterval)

  // Dot click handlers
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index
      showSlide(currentSlide)
      clearInterval(autoSlide)
      autoSlide = setInterval(nextSlide, slideInterval)
    })
  })
}

// ========================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ========================================

function initSmoothScroll() {
  const links = document.querySelectorAll('.navigation__link[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
}

// ========================================
// PARALLAX EFFECT ON SCROLL
// ========================================

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".hero__bg, .reviews__bg, .final-hero__bg")

  parallaxElements.forEach((element) => {
    const speed = 0.5
    element.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// ========================================
// BOOK NOW BUTTON HANDLERS
// ========================================

const bookButtons = document.querySelectorAll(
  ".navigation__cta, .promo__cta, .feature__cta, .stats__cta, .team__cta, .reviews__cta, .final-hero__cta",
)

bookButtons.forEach((button) => {
  button.addEventListener("click", () => {
    alert(
      "Thank you for your interest! Our booking system will be available soon. Please call (555) 123-4567 to schedule your consultation.",
    )
  })
})
