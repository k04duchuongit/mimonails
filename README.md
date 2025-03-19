# Glossify Studio Website

Đây là mã nguồn cho website của Glossify Studio - một tiệm nail chuyên nghiệp.

## Cấu trúc thư mục

```
.
├── assets/
│   └── images/
│       ├── gallery/     # Ảnh cho trang gallery
│       ├── logo/        # Logo và brand assets
│       └── backgrounds/ # Ảnh nền và decorative images
├── index.html          # File HTML chính
├── styles.css         # File CSS
└── script.js         # File JavaScript
```

## Hướng dẫn thêm ảnh

1. Gallery Images
   - Đặt ảnh trong thư mục `assets/images/gallery/`
   - Đặt tên theo format: `nail-{number}.jpg`
   - Kích thước đề xuất: 500x500px

2. Logo Images
   - Đặt logo trong thư mục `assets/images/logo/`
   - Format: PNG hoặc SVG với nền trong suốt

3. Background Images
   - Đặt ảnh nền trong thư mục `assets/images/backgrounds/`
   - Tối ưu kích thước trước khi sử dụng

## Lưu ý

- Tất cả ảnh nên được tối ưu hóa để giảm dung lượng
- Sử dụng thuộc tính `loading="lazy"` cho ảnh trong gallery
- Đặt alt text có ý nghĩa cho tất cả ảnh 