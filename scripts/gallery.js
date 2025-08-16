// gallery.js - Complete Image Gallery Functionality
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const mainImage = document.getElementById('mainImage');
  const thumbnails = document.querySelectorAll('.thumbnail');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImage');
  const closeLightbox = document.querySelector('.close-lightbox');

  // Debugging
  console.log('Gallery Initialized');
  console.log('Main Image:', mainImage);
  console.log('Thumbnails Found:', thumbnails.length);

  // Image Switching with Error Handling
  function switchImage(newSrc) {
    if (!newSrc || !mainImage) {
      console.error('Missing image source or main image element');
      return;
    }

    console.log('Attempting to load:', newSrc);

    // Preload image before switching
    const imgLoader = new Image();
    imgLoader.onload = function() {
      // Apply new image with fade effect
      mainImage.style.opacity = 0;
      lightboxImg.style.opacity = 0;
      
      setTimeout(() => {
        mainImage.src = newSrc;
        lightboxImg.src = newSrc;
        
        // Update active thumbnail
        thumbnails.forEach(thumb => {
          thumb.classList.remove('active');
          if (thumb.querySelector('img').src.includes(newSrc.split('/').pop())) {
            thumb.classList.add('active');
          }
        });

        // Fade in new image
        mainImage.style.opacity = 1;
        lightboxImg.style.opacity = 1;
        
        console.log('Image switched successfully');
      }, 200);
    };

    imgLoader.onerror = function() {
      console.error('Failed to load image:', newSrc);
      mainImage.src = 'images/fallback.jpg';
      lightboxImg.src = 'images/fallback.jpg';
    };

    imgLoader.src = newSrc;
  }

  // Lightbox Controls
  if (mainImage) {
    mainImage.addEventListener('click', function() {
      if (!lightbox) return;
      lightbox.style.display = 'flex';
      lightboxImg.src = this.src;
    });
  }

  if (closeLightbox) {
    closeLightbox.addEventListener('click', function() {
      lightbox.style.display = 'none';
    });
  }

  // Close lightbox when clicking outside
  if (lightbox) {
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
      }
    });
  }

  // Initialize thumbnail click handlers
  thumbnails.forEach(thumbnail => {
    const img = thumbnail.querySelector('img');
    if (!img) return;

    thumbnail.addEventListener('click', function(e) {
      e.preventDefault();
      const newSrc = this.getAttribute('onclick')?.match(/'([^']+)'/)?.[1] || img.src;
      switchImage(newSrc);
    });
  });

  // Set first thumbnail as active by default
  if (thumbnails.length > 0) {
    thumbnails[0].classList.add('active');
  }
});