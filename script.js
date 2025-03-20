// Đợi cho DOM load xong
document.addEventListener('DOMContentLoaded', function() {
    // Lấy tất cả các link điều hướng
    const navLinks = document.querySelectorAll('.nav-link');
    // Lấy tất cả các sections
    const sections = document.querySelectorAll('.content-section');
    // Lấy header
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    let isScrolling;
    let scrollTimeout;

    // Xử lý smooth scrolling cho tất cả các link có href bắt đầu bằng #
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Tính toán vị trí scroll, trừ đi chiều cao của header
                const headerHeight = 220; // Chiều cao của header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hàm để highlight menu item đang active
    function setActiveLink() {
        let currentSection = '';
        const headerHeight = 120; // Chiều cao của header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight;
            const sectionHeight = section.clientHeight;
            const scrollPosition = window.pageYOffset;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        // Cập nhật active state cho menu items
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === currentSection) {
                link.classList.add('active');
            }
        });
    }

    // Hàm xử lý ẩn/hiện header khi scroll
    function handleScroll() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const isMobile = window.innerWidth <= 768;
        const scrollThreshold = 50; // Ngưỡng scroll để ẩn/hiện header

        if (isMobile) {
            // Nếu đang scroll xuống và đã scroll quá ngưỡng
            if (currentScrollTop > lastScrollTop && currentScrollTop > scrollThreshold) {
                header.style.transform = 'translateY(-100%)';
            } 
            // Nếu đang scroll lên
            else if (currentScrollTop < lastScrollTop) {
                header.style.transform = 'translateY(0)';
            }
        } else {
            // Reset transform cho desktop
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = currentScrollTop;
    }

    // Thêm event listener cho scroll với debounce
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                handleScroll();
                setActiveLink();
                scrollTimeout = null;
            }, 10);
        }
    });

    // Thêm event listener cho resize
    window.addEventListener('resize', function() {
        setActiveLink();
        // Reset header position khi resize
        header.style.transform = 'translateY(0)';
    });
    
    // Set initial active state
    setActiveLink();

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    // Toggle menu
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            navMenu.classList.remove('active');
        }
    });
}); 