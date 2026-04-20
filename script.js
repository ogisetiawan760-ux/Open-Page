// Mobile navigation toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Portfolio filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // update active button
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterValue = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Testimonial slider
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
        card.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    currentIndex = index;
}

dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => showTestimonial(idx));
});

// Auto slide testimonials every 5 seconds
let autoSlide = setInterval(() => {
    let next = (currentIndex + 1) % testimonialCards.length;
    showTestimonial(next);
}, 5000);

// Pause auto slide on hover (optional)
const sliderContainer = document.querySelector('.testimonial-slider');
if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlide));
    sliderContainer.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            let next = (currentIndex + 1) % testimonialCards.length;
            showTestimonial(next);
        }, 5000);
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Form validation and submission simulation
const form = document.getElementById('inquiryForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !message) {
        formMessage.style.color = '#F87171';
        formMessage.innerText = '❌ Harap isi nama, email, dan pesan.';
        return;
    }
    if (!email.includes('@') || !email.includes('.')) {
        formMessage.style.color = '#F87171';
        formMessage.innerText = '❌ Email tidak valid.';
        return;
    }
    
    // Simulate success
    formMessage.style.color = '#4ADE80';
    formMessage.innerText = '✅ Terima kasih! Tim kami akan segera menghubungi Anda.';
    form.reset();
    
    // Optional: clear message after 5 seconds
    setTimeout(() => {
        formMessage.innerText = '';
    }, 5000);
});

// Add counter animation for hero stats (simple)
const statNumbers = document.querySelectorAll('.stat h3');
function animateNumbers() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.innerText);
        if (isNaN(target)) return;
        let current = 0;
        const increment = target / 50;
        const updateNumber = () => {
            current += increment;
            if (current < target) {
                stat.innerText = Math.floor(current) + '+';
                requestAnimationFrame(updateNumber);
            } else {
                stat.innerText = target + '+';
            }
        };
        updateNumber();
    });
}
// Trigger animation when hero in view
const heroSection = document.querySelector('.hero');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            observer.disconnect();
        }
    });
}, { threshold: 0.5 });
observer.observe(heroSection);

// Add hover effect on floating cards
const floatingCards = document.querySelectorAll('.floating-card');
floatingCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
        card.style.transition = '0.2s';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
    });
});

console.log('LandingCraft interactive website ready!');