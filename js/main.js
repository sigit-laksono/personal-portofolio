// Initialize Lucide Icons
lucide.createIcons();

// Mobile Sidebar Logic
const menuToggle = document.getElementById('menuToggle');
const closeSidebar = document.getElementById('closeSidebar');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

const openMenu = () => {
    sidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
};

const closeMenu = () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
};

menuToggle.addEventListener('click', openMenu);
closeSidebar.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

// Close sidebar when clicking nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Skills Filter Logic
const skillsSection = document.getElementById('skills');
if (skillsSection) {
    const skillFilterButtons = skillsSection.querySelectorAll('.filter-btn');
    const skillItems = skillsSection.querySelectorAll('.skill-item');

    skillFilterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            skillFilterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

// Projects Filter Logic
const projectsSection = document.getElementById('projects');
if (projectsSection) {
    const projectFilterButtons = projectsSection.querySelectorAll('.filter-btn');
    const projectItems = projectsSection.querySelectorAll('.project-item');

    projectFilterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            projectFilterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

// Active Navigation on Scroll
window.addEventListener('scroll', () => {
    let current = "";
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
