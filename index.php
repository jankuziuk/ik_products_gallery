<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>IK Products Gallery</title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zug+QiDoJOrZ5t4lssLdxGhVrurbmBWopoEl+M6BdEfwnCJZtKxi1KgxUyJq13dy" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>


<div class="ikProductsGallery" data-gallery-id="1">
    <div class="ikPGallery-items">
        <img data-id="1111" class="ikPGallery-image" src="http://www.cutehdwallpapers.com/uploads/large/4k-ultra-hd-wallpapers/4k-ultra-hd-nature-background-cars.jpg" style="max-width: 100%;" alt="" />
        <img data-id="2222" class="ikPGallery-image" src="http://www.cutehdwallpapers.com/uploads/large/4k-ultra-hd-wallpapers/4k-ultra-hd-nature-background-cars.jpg" style="max-width: 100%;" alt="" />
        <img data-id="3333" class="ikPGallery-image" src="http://www.cutehdwallpapers.com/uploads/large/4k-ultra-hd-wallpapers/4k-ultra-hd-nature-background-cars.jpg" style="max-width: 100%;" alt="" />
        <img data-id="4444" class="ikPGallery-image" src="http://www.cutehdwallpapers.com/uploads/large/4k-ultra-hd-wallpapers/4k-ultra-hd-nature-background-cars.jpg" style="max-width: 100%;" alt="" />
        <img data-id="5555" class="ikPGallery-image" src="http://www.cutehdwallpapers.com/uploads/large/4k-ultra-hd-wallpapers/4k-ultra-hd-nature-background-cars.jpg" style="max-width: 100%;" alt="" />
    </div>
    <button type="button" class="btn btn-primary save-all-points">Zapisz zmiany!!!</button>
</div>

<div class="ikProductsGallery" data-gallery-id="2"></div>

<div class="ikProductsGallery" data-gallery-id="3"></div>

<div class="add_product_popup" style="display: none;">
    <div class="ikProductsGallery-addProduct">
        <div class="ikProductsGallery-close">
            <span class="ikProductsGallery-close-btn"><i class="ikPGallery-icon-close"></i></span>
        </div>
        <form class="add_product_form">
            <input type="hidden" name="inspiration_id" value="1" />
            <div class="form-item form-group">
                <label>Tytuł:</label>
                <input type="text" name="title" class="form-control" />
            </div>
            <div class="form-item form-group">
                <label>ID produktu:</label>
                <input type="text" name="product_id" class="form-control" />
            </div>
            <div class="form-item form-group">
                <label>Opis:</label>
                <textarea name="description" class="form-control" rows="3"></textarea>
            </div>
            <div class="form-item">
                <button type="submit" class="btn btn-primary btn-block">Dodaj product</button>
            </div>
        </form>
    </div>
</div>

<script type="text/javascript" src="js/ikProductsGallery.js"></script>
</body>
</html>