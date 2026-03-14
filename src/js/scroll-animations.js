// Scroll Animations using Intersection Observer

export function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        if (entry.target.classList.contains('counter-section')) {
          animateCounters(entry.target);
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  return observer;
}

function animateCounters(element) {
  const counters = element.querySelectorAll('.counter-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  });
}

export const scrollAnimationStyles = `
  .animate-on-scroll {
    position: relative;
    z-index: 1;
  }

  .animate-on-scroll {
    opacity: 0;
    transition: opacity 0.6s ease-out;
  }

  .animate-on-scroll.animate-in {
    opacity: 1;
  }

  .animate-on-scroll.fade-up {
    transform: translateY(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }

  .animate-on-scroll.fade-up.animate-in {
    transform: translateY(0);
  }

  .animate-on-scroll.fade-down {
    transform: translateY(-30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }

  .animate-on-scroll.fade-down.animate-in {
    transform: translateY(0);
  }

  .animate-on-scroll.fade-left {
    transform: translateX(-30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }

  .animate-on-scroll.fade-left.animate-in {
    transform: translateX(0);
  }

  .animate-on-scroll.fade-right {
    transform: translateX(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }

  .animate-on-scroll.fade-right.animate-in {
    transform: translateX(0);
  }

  .animate-on-scroll.fade-in {
    transform: scale(0.95);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }

  .animate-on-scroll.fade-in.animate-in {
    transform: scale(1);
  }

  .animate-on-scroll.stagger-children > * {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  }

  .animate-on-scroll.stagger-children.animate-in > *:nth-child(1) { transition-delay: 0.1s; opacity: 1; transform: translateY(0); }
  .animate-on-scroll.stagger-children.animate-in > *:nth-child(2) { transition-delay: 0.2s; opacity: 1; transform: translateY(0); }
  .animate-on-scroll.stagger-children.animate-in > *:nth-child(3) { transition-delay: 0.3s; opacity: 1; transform: translateY(0); }
  .animate-on-scroll.stagger-children.animate-in > *:nth-child(4) { transition-delay: 0.4s; opacity: 1; transform: translateY(0); }
  .animate-on-scroll.stagger-children.animate-in > *:nth-child(5) { transition-delay: 0.5s; opacity: 1; transform: translateY(0); }
  .animate-on-scroll.stagger-children.animate-in > *:nth-child(6) { transition-delay: 0.6s; opacity: 1; transform: translateY(0); }

  .animate-on-scroll.scale-in {
    transform: scale(0.9);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }

  .animate-on-scroll.scale-in.animate-in {
    transform: scale(1);
  }
`;
