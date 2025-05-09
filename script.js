// Đợi cho DOM tải xong
document.addEventListener('DOMContentLoaded', function() {
    // Cập nhật năm hiện tại cho copyright
    const copyrightElement = document.querySelector('[data-translate="copyright"]');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2025', currentYear);
    }

    // Lấy tất cả các link điều hướng
    const navLinks = document.querySelectorAll('.nav-link');
    // Lấy tất cả các section nội dung
    const sections = document.querySelectorAll('.content-section');
    // Lấy phần header
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    let scrollTimeout;

    // Chức năng chuyển đổi ngôn ngữ
    const languageSwitcher = document.getElementById('languageSwitcher');
    const currentLangSpan = languageSwitcher.querySelector('.current-lang');
    let currentLang = 'en';

    // Hàm cập nhật nội dung theo ngôn ngữ
    function updateLanguage(lang) {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang][key]) {
                if (element.tagName === 'INPUT' && element.type === 'placeholder') {
                    element.placeholder = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });
        currentLangSpan.textContent = lang.toUpperCase();
        document.documentElement.lang = lang;
    }

    // Chuyển đổi ngôn ngữ khi click
    languageSwitcher.addEventListener('click', function() {
        currentLang = currentLang === 'en' ? 'de' : 'en';
        updateLanguage(currentLang);
    });

    // Xử lý cuộn mượt khi click vào link có href bắt đầu bằng #
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Tính toán vị trí scroll, trừ đi chiều cao của header
                const headerHeight = 240; // Chiều cao của header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hàm để đánh dấu menu item đang active
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

        // Cập nhật trạng thái active cho menu item
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === currentSection) {
                link.classList.add('active');
            }
        });
    }

    // Hàm xử lý ẩn/hiện header khi cuộn
    function handleScroll() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const isMobile = window.innerWidth <= 768;
        const scrollThreshold = 50; // Ngưỡng cuộn để ẩn/hiện header

        if (isMobile) {
            // Nếu cuộn xuống và đã vượt quá ngưỡng
            if (currentScrollTop > lastScrollTop && currentScrollTop > scrollThreshold) {
                header.style.transform = 'translateY(-100%)';
            } 
            // Nếu cuộn lên
            else if (currentScrollTop < lastScrollTop) {
                header.style.transform = 'translateY(0)';
            }
        } else {
            // Reset header về vị trí mặc định trên desktop
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = currentScrollTop;
    }

    // Thêm sự kiện scroll với debounce để tối ưu hiệu suất
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                handleScroll();
                setActiveLink();
                scrollTimeout = null;
            }, 10);
        }
    });

    // Thêm sự kiện khi thay đổi kích thước màn hình
    window.addEventListener('resize', function() {
        setActiveLink();
        // Reset lại vị trí header khi thay đổi kích thước
        header.style.transform = 'translateY(0)';
    });
    
    // Đặt trạng thái active ban đầu cho menu item
    setActiveLink();

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    // Mở/tắt menu khi click vào nút mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Đóng menu khi click vào một link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Đóng menu khi click ra ngoài
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            navMenu.classList.remove('active');
        }
    });

    // Dropdown danh mục dịch vụ
    const serviceCategories = document.querySelectorAll('.service-category');
    
    serviceCategories.forEach(category => {
        const header = category.querySelector('.service-header');
        
        header.addEventListener('click', () => {
            // Bật/tắt trạng thái active khi click vào danh mục
            category.classList.toggle('active');
            
            // Đóng các danh mục khác nếu có
            serviceCategories.forEach(otherCategory => {
                if (otherCategory !== category) {
                    otherCategory.classList.remove('active');
                }
            });
        });
    });

    // Gallery Slideshow
    const galleryGrid = document.querySelector('.gallery-grid');
    if (window.innerWidth <= 768) {
        const slides = document.querySelectorAll('.gallery-item');
        const dots = document.querySelectorAll('.slide-dot');
        const prevBtn = document.querySelector('.slideshow-control.prev');
        const nextBtn = document.querySelector('.slideshow-control.next');
        let currentSlide = 0;
        let slideInterval;

        // Hàm hiển thị slide
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            currentSlide = index;
        }

        // Hàm chuyển đến slide tiếp theo
        function nextSlide() {
            let nextIndex = currentSlide + 1;
            if (nextIndex >= slides.length) {
                nextIndex = 0;
            }
            showSlide(nextIndex);
        }

        // Hàm chuyển đến slide trước đó
        function prevSlide() {
            let prevIndex = currentSlide - 1;
            if (prevIndex < 0) {
                prevIndex = slides.length - 1;
            }
            showSlide(prevIndex);
        }

        // Tự động chuyển slide mỗi 3 giây
        function startSlideshow() {
            slideInterval = setInterval(nextSlide, 3000);
        }

        // Dừng slideshow
        function stopSlideshow() {
            clearInterval(slideInterval);
        }

        // Xử lý sự kiện click cho nút điều khiển
        nextBtn.addEventListener('click', () => {
            stopSlideshow();
            nextSlide();
            startSlideshow();
        });

        prevBtn.addEventListener('click', () => {
            stopSlideshow();
            prevSlide();
            startSlideshow();
        });

        // Xử lý sự kiện click cho dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopSlideshow();
                showSlide(index);
                startSlideshow();
            });
        });

        // Dừng slideshow khi hover
        galleryGrid.addEventListener('mouseenter', stopSlideshow);
        galleryGrid.addEventListener('mouseleave', startSlideshow);

        // Bắt đầu slideshow
        startSlideshow();
    }
});
