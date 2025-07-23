// === FINAL FIXED APP.JS === //
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing...');
  setCurrentYear();
  initMobileNav();
  initCounterAnimation();
  initFAQAccordion();
  initSmoothScrolling();
});

function setCurrentYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/****************** MOBILE NAV ************************/ 
function initMobileNav() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('primaryNav');
  if (!navToggle || !navMenu) return;

  navToggle.addEventListener('click', function() {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('open');
  });

  // Close nav after clicking a link
  navMenu.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.classList.remove('open');
    });
  });
}

/****************** COUNTER ANIMATION *****************/
function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  
  counters.forEach(function(counter) {
    observer.observe(counter);
  });

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-count'));
    const duration = 2000;
    const start = performance.now();
    
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const value = target * progress;
      el.textContent = target % 1 === 0 ? Math.floor(value) : value.toFixed(1);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }
}

/****************** FAQ ACCORDION *********************/
function initFAQAccordion() {
  console.log('Initializing FAQ accordion...');
  const faqItems = document.querySelectorAll('.faq-item');
  console.log('Found FAQ items:', faqItems.length);
  
  faqItems.forEach(function(item, index) {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    console.log('FAQ item', index, '- question:', !!question, 'answer:', !!answer);
    
    if (!question || !answer) return;
    
    // Remove hidden attribute and set up initial state
    answer.removeAttribute('hidden');
    answer.style.maxHeight = '0px';
    answer.style.overflow = 'hidden';
    answer.style.opacity = '0';
    answer.style.transition = 'max-height 0.4s ease, opacity 0.4s ease';
    answer.style.paddingTop = '0px';
    answer.style.paddingBottom = '0px';
    
    question.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('FAQ question clicked:', index);
      
      const isExpanded = question.getAttribute('aria-expanded') === 'true';
      console.log('Is expanded:', isExpanded);
      
      // Close all other items
      faqItems.forEach(function(otherItem) {
        if (otherItem !== item) {
          const otherQuestion = otherItem.querySelector('.faq-question');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          
          if (otherQuestion && otherAnswer) {
            otherQuestion.setAttribute('aria-expanded', 'false');
            otherAnswer.style.maxHeight = '0px';
            otherAnswer.style.opacity = '0';
            otherAnswer.style.paddingTop = '0px';
            otherAnswer.style.paddingBottom = '0px';
          }
        }
      });
      
      // Toggle current item
      if (isExpanded) {
        // Close
        question.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = '0px';
        answer.style.opacity = '0';
        answer.style.paddingTop = '0px';
        answer.style.paddingBottom = '0px';
      } else {
        // Open
        question.setAttribute('aria-expanded', 'true');
        answer.style.paddingTop = '0px';
        answer.style.paddingBottom = '20px';
        answer.style.opacity = '1';
        answer.style.maxHeight = (answer.scrollHeight + 40) + 'px';
      }
    });
  });
}

/****************** SMOOTH SCROLLING ******************/
function initSmoothScrolling() {
  console.log('Initializing smooth scrolling...');
  const header = document.querySelector('.site-header');
  const headerHeight = header ? header.offsetHeight : 80;
  
  // Handle all anchor links
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    
    const targetEl = document.querySelector(href);
    if (!targetEl) return;
    
    e.preventDefault();
    console.log('Smooth scrolling to:', href);
    
    const targetTop = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
    
    window.scrollTo({
      top: targetTop,
      behavior: 'smooth'
    });
  });
}

/****************** CONTACT FORM UX *******************/
const form = document.querySelector('.cta__form');
if (form) {
  form.addEventListener('submit', function(e) {
    const btn = form.querySelector('button[type="submit"]');
    if (!btn) return;
    
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;
    
    setTimeout(function() {
      btn.textContent = originalText;
      btn.disabled = false;
    }, 4000);
  });
}