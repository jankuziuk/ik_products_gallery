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

<div class="add-product-popup" style="display: none;">
    <div class="ikProductsGallery-addProduct">
        <div class="ikProductsGallery-close">
            <span class="ikProductsGallery-close-btn"><i class="ikPGallery-icon-close"></i></span>
        </div>
        <form class="add-product-form">
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

<div class="point-element" style="display: none;">
    <div class="ikPGallery-point-pin"><img src="images/pin.svg" alt=""></div>
    <div class="ikPGallery-point-popup">
        <div class="ikPGallery-pp-title" data-bind-value="title"></div>
        <div class="ikPGallery-pp-description" data-bind-value="description"></div>
        <div class="ikPGallery-pp-product">
            <div class="pp-product-top">
                <div class="pp-product-left"><img src="https://images.morele.net/i256/1329100_0_i256.jpg" alt="" /></div>
                <div class="pp-product-right">
                    <a href="https://www.morele.net/monitor-lg-34um69g-b-1329100/" target="_blank">Monitor LG 34UM69G-B</a>
                    <div class="pp-product-price">1999,00 zł</div>
                </div>
            </div>
            <div class="pp-product-btn">
                <a href="https://www.morele.net/monitor-lg-34um69g-b-1329100/" class="btn btn-primary btn-block" target="_blank">Sprawdź</a>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="js/ikProductsGallery.js"></script>
</body>
</html>