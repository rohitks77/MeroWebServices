// ===== Mobile Menu Toggle =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show-menu');
    navToggle.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        navToggle.classList.remove('active');
    });
});

// ===== Sticky Header =====
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY >= 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== Active Link on Scroll =====
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__link[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__link[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}

window.addEventListener('scroll', scrollActive);

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Contact Form Submission =====
const contactForm = document.getElementById('contact-form');
const contactSuccess = document.getElementById('contact-success');
const contactFormFields = document.getElementById('contact-form-fields');
const contactResetBtn = document.getElementById('contact-reset-btn');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        // Hide form fields and show success message
        contactFormFields.style.display = 'none';
        contactSuccess.style.display = 'block';
        
        // Scroll to success message
        contactSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Reset form (but keep it hidden)
        contactForm.reset();
        
        // In a real application, you would send this data to your backend:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ name, email, phone, message })
        // })
        // .then(response => response.json())
        // .then(data => {
        //     contactFormFields.style.display = 'none';
        //     contactSuccess.style.display = 'block';
        //     contactForm.reset();
        // })
        // .catch(error => {
        //     alert('Error sending message. Please try again.');
        // });
    });
    
    // Reset button functionality
    if (contactResetBtn) {
        contactResetBtn.addEventListener('click', () => {
            contactSuccess.style.display = 'none';
            contactFormFields.style.display = 'block';
            contactForm.reset();
            // Scroll to form
            contactFormFields.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
}

// ===== Intersection Observer for Fade-in Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.service__card, .package__card, .why-choose__card');
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Initialize package toggles after cards are set up
    initPackageToggles();
});

// ===== Package Card Hover Effect Enhancement =====
const packageCards = document.querySelectorAll('.package__card');

packageCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== Package Features Expand/Collapse =====
let packageTogglesInitialized = false;

function initPackageToggles() {
    // Prevent multiple initializations
    if (packageTogglesInitialized) return;
    packageTogglesInitialized = true;
    
    // Use event delegation instead of individual listeners
    document.addEventListener('click', function(e) {
        // Check if the clicked element or its parent is a package toggle button
        let button = e.target;
        
        // If clicked on SVG or span, find the button parent
        if (!button.classList.contains('package__toggle')) {
            button = e.target.closest('.package__toggle');
        }
        
        if (!button || !button.classList.contains('package__toggle')) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        // Get the specific card that contains this button - use querySelector from document to ensure we get the right one
        const card = button.closest('.package__card');
        if (!card) return;
        
        // Get the features list within this specific card only
        const featuresList = card.querySelector('.package__features');
        if (!featuresList) return;
        
        // Get the span within this specific button
        const span = button.querySelector('span');
        if (!span) return;
        
        // Check if this specific card is expanded
        const isExpanded = card.classList.contains('expanded');
        
        // Toggle only this specific card - be very explicit
        if (isExpanded) {
            // Remove expanded class only from this card
            card.classList.remove('expanded');
            span.textContent = 'See More';
        } else {
            // Add expanded class only to this card
            card.classList.add('expanded');
            span.textContent = 'See Less';
        }
    });
    
    // Hide toggle buttons that don't have hidden features
    const toggleButtons = document.querySelectorAll('.package__toggle');
    toggleButtons.forEach((button) => {
        const card = button.closest('.package__card');
        if (!card) return;
        
        const featuresList = card.querySelector('.package__features');
        if (!featuresList) return;
        
        const hiddenFeatures = featuresList.querySelectorAll('.feature-hidden');
        
        if (hiddenFeatures.length === 0) {
            button.style.display = 'none';
        }
    });
}

// ===== WhatsApp Order Button with Package Details =====
document.addEventListener('DOMContentLoaded', function() {
    const orderButtons = document.querySelectorAll('.btn--package');
    
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the card containing this button
            const card = this.closest('.package__card');
            if (!card) return;
            
            // Get package name
            const packageName = card.querySelector('.package__name')?.textContent || 'Package';
            
            // Get price
            const currency = card.querySelector('.package__currency')?.textContent || 'NPR';
            const amount = card.querySelector('.package__amount')?.textContent || '';
            const price = `${currency} ${amount}`;
            
            // Get all features (including hidden ones)
            const allFeatures = card.querySelectorAll('.package__features li');
            const featuresList = Array.from(allFeatures).map(li => {
                return `• ${li.textContent.trim()}`;
            }).join('\n');
            
            // Build WhatsApp message
            const message = `Hello! I'm interested in ordering:

*${packageName}*
Price: ${price}

*Features:*
${featuresList}

Please let me know the next steps.`;

            // Encode message for URL
            const encodedMessage = encodeURIComponent(message);
            
            // Open WhatsApp
            const whatsappUrl = `https://wa.me/9779746686607?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
        });
    });
});

// ===== Update WhatsApp and Call Numbers =====
// Replace XXXXXXXXX with actual phone numbers
// Example: const whatsappNumber = '9779841234567';
// Then update the href: `https://wa.me/${whatsappNumber}`
