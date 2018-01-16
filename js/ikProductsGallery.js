var ikProductsImageGalleryDefault = {
    galleyWrapperIdAttribute: 'data-gallery-id',
    imageQuerySelector: 'img',
    imageWrapperClass: 'ikPGallery-image-wr',
    imageIdAttribute: 'data-id',
    addProductPopup: '.add-product-popup',
    addProductForm: '.add-product-form',
    closePopupBtn: '.ikProductsGallery-close-btn',
    savePointsButton: '.save-all-points',
    pointTemplate: '.point-element',
    getPointsUrl: 'getPoints.php',
    savePointsUrl: 'savePoints.php',
    selectTypeIcon: '[name="point_icon"]',
    typeIconDefault: 'pin_red,svg',
    imagesUrl: 'images/',
    addProductFormOnSubmit: function (form, service, image, point) {}
};

if (typeof ikExtend === 'undefined' || typeof ikExtend !== 'function') {
    var ikExtend = function (defaults, options) {
        var extended = {};
        var prop;
        for (prop in defaults) {
            if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
                extended[prop] = defaults[prop];
            }
        }
        for (prop in options) {
            if (Object.prototype.hasOwnProperty.call(options, prop)) {
                extended[prop] = options[prop];
            }
        }
        return extended;
    };
}

var _ikProductsImageGallery = function (element, settings) {
    this.element = element;
    this.settings = settings;
    this.galleryId = element.getAttribute(this.settings.galleyWrapperIdAttribute);
    this.images = {};

    this._init();
};

/**
 * Init plugin methods
 * @private
 */
_ikProductsImageGallery.prototype._init = function () {
    this._initPoints();
    this._savePoints();
};

/**
 * GET and init points
 * @private
 */
_ikProductsImageGallery.prototype._initPoints = function () {
    var service = this,
        images = service.element.querySelectorAll(service.settings.imageQuerySelector),
        imagesIds = [];

    try {
        if (images.length > 0) {
            for (var i = 0; i < images.length; i++) {
                var image = images[i],
                    imageId = image.getAttribute(service.settings.imageIdAttribute);

                service._wrap(image, 'div', {
                    'class': service.settings.imageWrapperClass,
                    'data-image-id': imageId
                });

                service.images[imageId] = {
                    id: imageId,
                    points: []
                };

                image.addEventListener('click', function (e) {
                    e.preventDefault();
                    service._addPopup(this, service._getImageXY(e));
                });
                imagesIds.push(imageId);
            }
        } else {
            console.log('Not found images selector: ' + this.settings.imageQuerySelector);
        }

        service._http("POST", service.settings.getPointsUrl + '?id='+service.galleryId, { images: imagesIds }, function () {
            try {
                if (this.response){
                    service._setPoints(JSON.parse(this.response));
                }
            } catch (e){
                throw (e);
            }
        });
    } catch (e){
        throw (e);
    }
};

/**
 * Add points from API
 * @param images
 * @private
 */
_ikProductsImageGallery.prototype._setPoints = function (images) {
    var service = this;
    if (service.images) {
        for (var image in images) {
            if (image in service.images){
                service.images[image].points = images[image].points;
                for (var point in service.images[image].points) {
                    service._addPoint(image, service.images[image].points[point]);
                }
            }
        }
    }
};

/**
 * Add point on image
 * @param imageId
 * @param point
 * @private
 */
_ikProductsImageGallery.prototype._addPoint = function (imageId, point) {
    var service = this,
        pointElement = document.createElement('div');

    pointElement.setAttribute('class', 'ikPGallery-point');
    pointElement.style.top = point.position.y;
    pointElement.style.left = point.position.x;
    pointElement.innerHTML = '<div class="ikPGallery-point-pin">' +
                                '<img src="' + service.settings.imagesUrl + point.point_icon + '" alt="">' +
                            '</div>' +
                            '<div class="ikPGallery-point-popup">' + document.querySelectorAll(service.settings.pointTemplate)[0].innerHTML + '</div>';

    for (var key in point){
        var element = pointElement.querySelectorAll('[data-bind-value="' + key + '"]');
        if (element.length > 0){
            for (var i = 0; i < element.length; i++){
                element[i].innerHTML = point[key];
            }
        }
    }
    service.element.querySelectorAll(service.settings.imageQuerySelector + '[' + service.settings.imageIdAttribute + '="' + imageId + '"]')[0].parentNode.appendChild(pointElement);
};

/**
 * Add popup to set point
 * @param image
 * @param pointXY
 * @private
 */
_ikProductsImageGallery.prototype._addPopup = function (image, pointXY) {
    var service = this,
        overlay = document.createElement('div'),
        popup = document.createElement('div');

    overlay.setAttribute('class', 'ikPGallery-image-overlay');

    popup.setAttribute('class', 'ikPGallery-image-popup');
    popup.innerHTML = document.querySelectorAll(service.settings.addProductPopup)[0].innerHTML;

    image.parentNode.appendChild(overlay);
    image.parentNode.appendChild(popup);

    var form = popup.querySelectorAll(service.settings.addProductForm)[0],
        buttonClose = popup.querySelectorAll(service.settings.closePopupBtn)[0];

    form.onsubmit = function (e) {
        e.preventDefault();
        var point = service._serialize(form),
            imageId = image.getAttribute(service.settings.imageIdAttribute),
            pointsTypes = service.element.querySelectorAll(service.settings.selectTypeIcon);

        for (var i = 0; i < pointsTypes.length; i++) {
            if (pointsTypes[i].checked == true) {
                point.point_icon = pointsTypes[i].value;
                break;
            } else {
                point.point_icon = service.settings.typeIconDefault;
            }
        }
        point.position = pointXY;
        service.images[imageId].points.push(point);
        service._removePopup(overlay, popup);
        service._addPoint(imageId, point);
        service.settings.addProductFormOnSubmit(form, service, image, point);
    };

    overlay.addEventListener('click', function () {
        service._removePopup(overlay, popup);
    });
    buttonClose.addEventListener('click', function () {
        service._removePopup(overlay, popup);
    });
};

/**
 * Remove popup
 * @param overlay
 * @param popup
 * @private
 */
_ikProductsImageGallery.prototype._removePopup = function (overlay, popup) {
    overlay.parentNode.removeChild(overlay);
    popup.parentNode.removeChild(popup);
};

/**
 * Save points comfigurations
 * @private
 */
_ikProductsImageGallery.prototype._savePoints = function () {
    var service = this,
        buttons = service.element.querySelectorAll(service.settings.savePointsButton);

    for (var i = 0; i < buttons.length; i++){
        buttons[i].addEventListener('click', function (e) {
            e.preventDefault();
            service._http('POST', service.settings.savePointsUrl + '?id='+service.galleryId, service.images, function () {
                console.log("Zapisano!!!");
            });
        })
    }
};

/**
 * Helper function to xht requests
 * @param method
 * @param url
 * @param data
 * @param callback
 * @private
 */
_ikProductsImageGallery.prototype._http = function (method, url, data, callback) {
    var httpRequest = new XMLHttpRequest(),
        callback = callback || function (response) {};

    httpRequest.open(method, url, false);
    httpRequest.setRequestHeader("Content-type", "application/json");
    httpRequest.onreadystatechange = callback;
    httpRequest.send(JSON.stringify(data));
};

/**
 * Add Wrapper to element
 * @param el
 * @param htmlElement
 * @param attributes
 * @private
 */
_ikProductsImageGallery.prototype._wrap = function(el, htmlElement, attributes) {
    var wrapper = document.createElement(htmlElement);

    for (var i in attributes){
        wrapper.setAttribute(i, attributes[i]);
    }

    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
};

/**
 * Get (X,Y) of point
 * @param image
 * @returns {{x: string, y: string}}
 * @private
 */
_ikProductsImageGallery.prototype._getImageXY = function (event) {
    return {
        x: parseFloat(((event.pageX - event.target.x) * 100) / event.target.clientWidth).toFixed(2) + '%',
        y: parseFloat(((event.pageY - event.target.y) * 100) / event.target.clientHeight).toFixed(2) + '%'
    };
};

/**
 * Serialize form
 * @param formel
 * @returns {{}}
 * @private
 */
_ikProductsImageGallery.prototype._serialize = function (formel) {
    var inputs = formel.querySelectorAll("input, select, textarea"),
        obj = {}, key;
    for (key in inputs) {
        if (inputs[key].tagName) {
            if (inputs[key].type === "checkbox") {
                obj[inputs[key].name] = inputs[key].checked === true ? inputs[key].value : false;
            } else {
                obj[inputs[key].name] = inputs[key].value;
            }
        }
    }
    return obj;
};

var ikProductsImageGallery = function (selector, options) {
    try{
        var galeries = document.querySelectorAll(selector);

        if (galeries.length > 0){
            for (var i = 0; i < galeries.length; i++){
                new _ikProductsImageGallery(galeries[i], ikExtend(ikProductsImageGalleryDefault, options));
            }
        }

    } catch (e){
        throw(e);
    }
};


new ikProductsImageGallery('.ikProductsGallery', {
    imageQuerySelector: 'img.ikPGallery-image',
    addProductFormId: 'add_product_popup'
});