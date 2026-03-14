// Main JavaScript file for therapy website interactions

// Initialize the therapy website functionality
document.addEventListener('DOMContentLoaded', function() {
  console.log('Sitio web de terapia iniciado');
  
  // Add smooth scrolling for navigation links (only for hash links)
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Form submission handling
  const contactForm = document.querySelector('form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      console.log('Formulario enviado:', new FormData(this));
      
      alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
      this.reset();
    });
  }
  
  // Dashboard functionality
  const dashboardButtons = document.querySelectorAll('.dashboard-card button');
  dashboardButtons.forEach(button => {
    button.addEventListener('click', function() {
      console.log('Acción del dashboard:', this.textContent);
    });
  });
  
  // Blog post interaction
  const blogItems = document.querySelectorAll('.blog-item');
  blogItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
});

// Theme switching functionality
function toggleTheme() {
  const body = document.body;
  body.classList.toggle('dark-theme');
  
  const isDark = body.classList.contains('dark-theme');
  localStorage.setItem('themePreference', isDark ? 'dark' : 'light');
}

document.addEventListener('DOMContentLoaded', function() {
  const savedTheme = localStorage.getItem('themePreference');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
  }
});

// Responsive navigation menu toggle for mobile
function toggleMobileMenu() {
  const navMenu = document.querySelector('.navigation');
  navMenu.classList.toggle('mobile-menu-open');
}