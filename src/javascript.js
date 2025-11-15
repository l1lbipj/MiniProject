// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active')) {
                if (!mobileMenu.contains(e.target) && !navMenu.contains(e.target)) {
                    mobileMenu.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });

        // Prevent body scroll when menu is open
        const originalOverflow = document.body.style.overflow;
        mobileMenu.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = originalOverflow || '';
            }
        });

        // Reset body overflow when menu closes via link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                document.body.style.overflow = originalOverflow || '';
            });
        });
    }
});

