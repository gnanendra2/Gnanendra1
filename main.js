// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-progress');
const circularProgress = document.querySelectorAll('.progress-fill');

function animateSkills() {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });

    circularProgress.forEach(circle => {
        const offset = circle.style.strokeDashoffset;
        circle.style.strokeDashoffset = '440';
        setTimeout(() => {
            circle.style.strokeDashoffset = offset;
        }, 100);
    });
}

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            if (entry.target.classList.contains('skills-container')) {
                animateSkills();
            }
        }
    });
}, {
    threshold: 0.1
});

// Observe elements for animations
document.querySelectorAll('.home-content, .about-content, .skills-container, .projects-container, .contact-container').forEach(el => {
    observer.observe(el);
});

// Dynamic project filtering
const projectBoxes = document.querySelectorAll('.project-box');
const projectTags = new Set();

// Collect all unique tags
projectBoxes.forEach(box => {
    const tags = box.querySelectorAll('.project-tags span');
    tags.forEach(tag => projectTags.add(tag.textContent));
});

// Create filter buttons
const filterContainer = document.createElement('div');
filterContainer.className = 'project-filters';
filterContainer.innerHTML = `
    <button class="filter-btn active" data-filter="all">All</button>
    ${Array.from(projectTags).map(tag => `
        <button class="filter-btn" data-filter="${tag.toLowerCase()}">${tag}</button>
    `).join('')}
`;

document.querySelector('.projects-heading').after(filterContainer);

// Filter functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        projectBoxes.forEach(box => {
            if (filter === 'all') {
                box.style.display = 'block';
            } else {
                const tags = Array.from(box.querySelectorAll('.project-tags span')).map(tag => tag.textContent.toLowerCase());
                box.style.display = tags.includes(filter) ? 'block' : 'none';
            }
        });
    });
});

// Dynamic typing effect for the home section
const textElement = document.querySelector('.home-content h3:last-of-type');
const text = textElement.textContent;
textElement.textContent = '';

let i = 0;
function typeWriter() {
    if (i < text.length) {
        textElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect when home section is visible
const homeObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        typeWriter();
        homeObserver.disconnect();
    }
});

homeObserver.observe(document.querySelector('.home-content'));

// Add scroll-to-top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
