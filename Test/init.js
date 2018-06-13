var galleries = new ikProductsImageGallery('.ikProductsGallery', {
    imageQuerySelector: 'img.ikPGallery-image',
    onPointRemoved: function (gallery, image, data, galleryId) {
        console.log(gallery, image, data, galleryId);
    }
});

console.log(galleries);