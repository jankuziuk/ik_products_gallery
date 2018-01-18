<!DOCTYPE html>
<html lang="en">
<?php $date = new DateTime(); ?>
<head>
    <meta charset="UTF-8">
    <title>IK Products Gallery</title>
    <meta name="viewport" content="width=device-width,user-scalable=no">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zug+QiDoJOrZ5t4lssLdxGhVrurbmBWopoEl+M6BdEfwnCJZtKxi1KgxUyJq13dy" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="css/style.css?v=<?php echo $date->getTimestamp(); ?>">
</head>
<body>


<div class="ikProductsGallery" style="margin: 10px;" data-gallery-id="1">
    <div class="ikPGallery-items">
        <img data-id="5555" class="ikPGallery-image" src="images/preview.jpg" style="max-width: 100%;" alt="" />
    </div>
    <div style="margin: 20px; text-align: center;">
        <button type="button" class="btn btn-primary btn-block save-all-points">Zapisz zmiany!!!</button>
    </div>
</div>

<div class="add-product-popup" style="display: none;">
    <div class="ikProductsGallery-addProduct">
        <div class="ikProductsGallery-head">
            <h2>Dodaj produkt</h2>
            <span class="ikProductsGallery-close-btn"><i class="ikPGallery-icon-close"></i></span>
        </div>
        <form class="add-product-form">
            <div class="form-group">
                <label>Wybież ikonę:</label>
                <div class="ikProductsGallery-points-type">
                    <div class="ikProductsGallery-point">
                        <label>
                            <input type="radio" name="point_icon" value="pin_blue.svg" />
                            <span class="point-icon">
                            <img src="images/pin_blue.svg" alt="" />
                        </span>
                        </label>
                    </div>
                    <div class="ikProductsGallery-point">
                        <label>
                            <input type="radio" name="point_icon" value="pin_green.svg" />
                            <span class="point-icon">
                            <img src="images/pin_green.svg" alt="" />
                        </span>
                        </label>
                    </div>
                    <div class="ikProductsGallery-point">
                        <label>
                            <input type="radio" name="point_icon" value="pin_red.svg" />
                            <span class="point-icon">
                            <img src="images/pin_red.svg" alt="" />
                        </span>
                        </label>
                    </div>
                    <div class="ikProductsGallery-point">
                        <label>
                            <input type="radio" name="point_icon" value="pin_yellow.svg" />
                            <span class="point-icon">
                            <img src="images/pin_yellow.svg" alt="" />
                        </span>
                        </label>
                    </div>
                    <div class="ikProductsGallery-point">
                        <label>
                            <input type="radio" name="point_icon" value="pin_orange.svg" />
                            <span class="point-icon">
                            <img src="images/pin_orange.svg" alt="" />
                        </span>
                        </label>
                    </div>
                    <div class="ikProductsGallery-point">
                        <label>
                            <input type="radio" name="point_icon" value="pin_grey.svg" />
                            <span class="point-icon">
                            <img src="images/pin_grey.svg" alt="" />
                        </span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label>Wybież produkt z listy:</label>
                <div class="products-list">
                    <div class="product-item">
                        <label>
                            <input type="radio" name="product_id" value="1329100" />
                            <div class="pp-product-top">
                                <div class="pp-product-left"><img src="https://images.morele.net/i256/1329100_0_i256.jpg" alt="" /></div>
                                <div class="pp-product-right">
                                    <a href="https://www.morele.net/monitor-lg-34um69g-b-1329100/" target="_blank">Monitor LG 34UM69G-B</a>
                                    <div class="pp-product-price">1999,00 zł</div>
                                </div>
                            </div>
                        </label>
                    </div>
                    <div class="product-item">
                        <label>
                            <input type="radio" name="product_id" value="1329100" />
                            <div class="pp-product-top">
                                <div class="pp-product-left"><img src="https://images.morele.net/i256/1329100_0_i256.jpg" alt="" /></div>
                                <div class="pp-product-right">
                                    <a href="https://www.morele.net/monitor-lg-34um69g-b-1329100/" target="_blank">Monitor LG 34UM69G-B</a>
                                    <div class="pp-product-price">1999,00 zł</div>
                                </div>
                            </div>
                        </label>
                    </div>
                    <div class="product-item">
                        <label>
                            <input type="radio" name="product_id" value="1329100" />
                            <div class="pp-product-top">
                                <div class="pp-product-left"><img src="https://images.morele.net/i256/1329100_0_i256.jpg" alt="" /></div>
                                <div class="pp-product-right">
                                    <a href="https://www.morele.net/monitor-lg-34um69g-b-1329100/" target="_blank">Monitor LG 34UM69G-B</a>
                                    <div class="pp-product-price">1999,00 zł</div>
                                </div>
                            </div>
                        </label>
                    </div>
                    <div class="product-item">
                        <label>
                            <input type="radio" name="product_id" value="1329100" />
                            <div class="pp-product-top">
                                <div class="pp-product-left"><img src="https://images.morele.net/i256/1329100_0_i256.jpg" alt="" /></div>
                                <div class="pp-product-right">
                                    <a href="https://www.morele.net/monitor-lg-34um69g-b-1329100/" target="_blank">Monitor LG 34UM69G-B</a>
                                    <div class="pp-product-price">1999,00 zł</div>
                                </div>
                            </div>
                        </label>
                    </div>
                    <div class="product-item">
                        <label>
                            <input type="radio" name="product_id" value="1329100" />
                            <div class="pp-product-top">
                                <div class="pp-product-left"><img src="https://images.morele.net/i256/1329100_0_i256.jpg" alt="" /></div>
                                <div class="pp-product-right">
                                    <a href="https://www.morele.net/monitor-lg-34um69g-b-1329100/" target="_blank">Monitor LG 34UM69G-B</a>
                                    <div class="pp-product-price">1999,00 zł</div>
                                </div>
                            </div>
                        </label>
                    </div>
                    <div class="product-item">
                        <label>
                            <input type="radio" name="product_id" value="1329100" />
                            <div class="pp-product-top">
                                <div class="pp-product-left"><img src="https://images.morele.net/i256/1329100_0_i256.jpg" alt="" /></div>
                                <div class="pp-product-right">
                                    <a href="https://www.morele.net/monitor-lg-34um69g-b-1329100/" target="_blank">Monitor LG 34UM69G-B</a>
                                    <div class="pp-product-price">1999,00 zł</div>
                                </div>
                            </div>
                        </label>
                    </div>
                    <div class="product-item">
                        <label>
                            <input type="radio" name="product_id" value="1329100" />
                            <div class="pp-product-top">
                                <div class="pp-product-left"><img src="https://images.morele.net/i256/1329100_0_i256.jpg" alt="" /></div>
                                <div class="pp-product-right">
                                    <a href="https://www.morele.net/monitor-lg-34um69g-b-1329100/" target="_blank">Monitor LG 34UM69G-B</a>
                                    <div class="pp-product-price">1999,00 zł</div>
                                </div>
                            </div>
                        </label>
                    </div>
                    <div class="product-item">
                        <label>
                            <input type="radio" name="product_id" value="1329100" />
                            <div class="pp-product-top">
                                <div class="pp-product-left"><img src="https://images.morele.net/i256/1329100_0_i256.jpg" alt="" /></div>
                                <div class="pp-product-right">
                                    <a href="https://www.morele.net/monitor-lg-34um69g-b-1329100/" target="_blank">Monitor LG 34UM69G-B</a>
                                    <div class="pp-product-price">1999,00 zł</div>
                                </div>
                            </div>
                        </label>
                    </div>
                    <div class="product-item">
                        <label>
                            <input type="radio" name="product_id" value="1329100" />
                            <div class="pp-product-top">
                                <div class="pp-product-left"><img src="https://images.morele.net/i256/1329100_0_i256.jpg" alt="" /></div>
                                <div class="pp-product-right">
                                    <a href="https://www.morele.net/monitor-lg-34um69g-b-1329100/" target="_blank">Monitor LG 34UM69G-B</a>
                                    <div class="pp-product-price">1999,00 zł</div>
                                </div>
                            </div>
                        </label>
                    </div>
                    <div class="product-item">
                        <label>
                            <input type="radio" name="product_id" value="1329100" />
                            <div class="pp-product-top">
                                <div class="pp-product-left"><img src="https://images.morele.net/i256/1329100_0_i256.jpg" alt="" /></div>
                                <div class="pp-product-right">
                                    <a href="https://www.morele.net/monitor-lg-34um69g-b-1329100/" target="_blank">Monitor LG 34UM69G-B</a>
                                    <div class="pp-product-price">1999,00 zł</div>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Dodaj</button>
        </form>
    </div>
</div>

<div class="point-element" style="display: none;">
    <div class="ikPGallery-pp-product">
        <div class="pp-product-top">
            <div class="pp-product-left"><img src="https://images.morele.net/i256/1329100_0_i256.jpg" alt="" /></div>
            <div class="pp-product-right">
                <a href="https://www.morele.net/monitor-lg-34um69g-b-1329100/" target="_blank">Monitor LG 34UM69G-B</a>
                <div class="pp-product-price">1999,00 zł</div>
            </div>
        </div>
        <div class="pp-product-btn" style="margin-bottom: 5px;">
            <a href="https://www.morele.net/monitor-lg-34um69g-b-1329100/" class="btn btn-primary btn-block" target="_blank">Zobać</a>
        </div>
        <div class="pp-product-btn">
            <button type="button" class="btn btn-danger btn-block">Usuń</button>
        </div>
    </div>
</div>
<script type="text/javascript" src="js/ikProductsGallery.js?v=<?php echo $date->getTimestamp(); ?>"></script>
</body>
</html>