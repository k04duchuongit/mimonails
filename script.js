// Đợi cho DOM load xong
document.addEventListener('DOMContentLoaded', function() {
    // Lấy tất cả các link điều hướng
    const navLinks = document.querySelectorAll('.nav-link');
    // Lấy tất cả các trang
    const pages = document.querySelectorAll('.page');

    // Hàm để hiển thị trang được chọn
    function showPage(pageId) {
        // Ẩn tất cả các trang
        pages.forEach(page => {
            page.style.display = 'none';
            page.classList.remove('active');
        });

        // Hiển thị trang được chọn
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.style.display = 'block';
            targetPage.classList.add('active');
        }
    }

    // Xử lý sự kiện click cho các link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Cập nhật trạng thái active cho các link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Lấy và hiển thị trang tương ứng
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
        });
    });

    // Hiển thị trang home khi mới load
    showPage('home');
}); 