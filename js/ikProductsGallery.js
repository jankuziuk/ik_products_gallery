/**
 * IK products gallery
 * @description Product gallery points on image
 * @version 1.0.2
 * @author Ivan Kuziuk
 * @authoremail kuzyuk@gmail.com
 * @lastmadificated 18.01.2018
 */

var ikProductsImageGalleryDefault = {
    draggable: true,
    popupIndent: {
        top: 220,
        left: 160,
        right: 160,
        bottom: 0
    },
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
    typeIconDefault: 'pin_red.svg',
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
    this.imagesElements = this.element.querySelectorAll(this.settings.imageQuerySelector);
    this.images = {};

    this._init();
};

/**
 * Init plugin methods
 * @private
 */
_ikProductsImageGallery.prototype._init = function () {
    this._addClass(this.element, this._is_touch_device() ? 'is-touch-device' : 'is-not-touch-device');
    this._initPoints();
    this._savePoints();
    this._onResize();
};

/**
 * GET and init points
 * @private
 */
_ikProductsImageGallery.prototype._initPoints = function () {
    var service = this,
        imagesIds = [];

    try {
        if (service.imagesElements.length > 0) {
            for (var i = 0; i < service.imagesElements.length; i++) {
                var image = service.imagesElements[i],
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
                    var openPoints = this.parentNode.querySelectorAll('.ikPGallery-point.is-touched');
                    if (openPoints.length === 0) {
                        service._addPopup(this, service._getImageXY(e));
                    } else {
                        for (var i = 0; i < openPoints.length; i++){
                            service._removeClass(openPoints[i], 'is-touched');
                        }
                    }
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
        pointElement = document.createElement('div'),
        parent = service.element.querySelectorAll(service.settings.imageQuerySelector + '[' + service.settings.imageIdAttribute + '="' + imageId + '"]')[0].parentNode;

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
    parent.appendChild(pointElement);

    if (service.settings.draggable){
        service._draggable(point, parent, pointElement);
    }

    service._checkPopupPosition(parent, pointElement, point.position);
    pointElement.addEventListener('mouseover', function () {
        service._checkPopupPosition(parent, pointElement, point.position);
    });
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
 * On window resize functions
 * @private
 */
_ikProductsImageGallery.prototype._onResize = function () {
    var service = this;

    window.addEventListener('resize', function () {
        for (var imageIndex = 0; imageIndex < service.imagesElements.length; imageIndex++){
            var image = service.imagesElements[imageIndex],
                points = image.parentNode.querySelectorAll('.ikPGallery-point');

            for (var pointIndex = 0; pointIndex < points.length; pointIndex++){
                var pointElement = points[pointIndex],
                    position = {
                        x: parseFloat(pointElement.style.left),
                        y: parseFloat(pointElement.style.top)
                    };
                service._checkPopupPosition(image, pointElement, position);
            }
        }
    });
};

/**
 * Check point position and set popup position
 * @param parent
 * @param pointElement
 * @param position
 * @private
 */
_ikProductsImageGallery.prototype._checkPopupPosition = function (parent, pointElement, position) {
    var service = this,
    imageSize = {
        width: parent.clientWidth,
        height: parent.clientHeight
    },
    pointPosition = {
        x: parseFloat(imageSize.width * parseFloat(position.x) / 100),
        y: parseFloat(imageSize.height * parseFloat(position.y) / 100)
    };

    service._removeClass(pointElement, 'popup-y-top');
    service._removeClass(pointElement, 'popup-y-bottom');
    service._removeClass(pointElement, 'popup-x-left');
    service._removeClass(pointElement, 'popup-x-center');
    service._removeClass(pointElement, 'popup-x-right');

    if (pointPosition.y < service.settings.popupIndent.top){
        service._addClass(pointElement, 'popup-y-bottom');
    } else {
        service._addClass(pointElement, 'popup-y-top');
    }

    if (pointPosition.x < service.settings.popupIndent.left){
        service._addClass(pointElement, 'popup-x-right');
    } else if (pointPosition.x > imageSize.width - service.settings.popupIndent.right){
        service._addClass(pointElement, 'popup-x-left');
    } else {
        service._addClass(pointElement, 'popup-x-center');
    }
};

/**
 * Add draggable event to point
 * @param point
 * @param parent
 * @param pointElement
 * @private
 */
_ikProductsImageGallery.prototype._draggable = function (point, parent, pointElement) {
    var service = this,
        position = point.position,
        image = parent.querySelectorAll(service.settings.imageQuerySelector)[0];

    pointElement.querySelectorAll('.ikPGallery-point-pin')[0].onmousedown = function(e) {
        position = point.position;
        service._addClass(pointElement, 'dragged');
        service._addClass(image, 'dragged');

        image.onmousemove = function (e) {
            var coordinates = service._getImageXY(e);
            position = coordinates;
            pointElement.style.top = coordinates.y;
            pointElement.style.left = coordinates.x;
            service._checkPopupPosition(image, pointElement, position);
        };

        document.onmouseup = function (e) {
            image.onmousemove = null;
            point.position = position;
            service._checkPopupPosition(image, pointElement, position);
            service._removeClass(pointElement, 'dragged');
            service._removeClass(image, 'dragged');
        };
    };

    pointElement.querySelectorAll('.ikPGallery-point-pin')[0].addEventListener('touchstart', function (e) {
        position = point.position;
        if (!service._hasClass(pointElement, 'is-touched')) {
            var openPoints = image.parentNode.querySelectorAll('.ikPGallery-point.is-touched');
            if (openPoints.length > 0){
                for (var i = 0; i < openPoints.length; i++){
                    service._removeClass(openPoints[i], 'is-touched');
                }
            }
            service._addClass(pointElement, 'is-touched');
        } else {
            service._removeClass(pointElement, 'is-touched');
        }
    });

    pointElement.querySelectorAll('.ikPGallery-point-pin')[0].addEventListener('touchmove', function (event) {
        event.preventDefault();
        event.stopPropagation();
        var coordinates = service._getTouchXY(event, image);
        position = coordinates;
        pointElement.style.top = coordinates.y;
        pointElement.style.left = coordinates.x;
        service._addClass(pointElement, 'dragged');
        service._removeClass(pointElement, 'is-touched');
        service._addClass(image, 'dragged');
    });

    pointElement.querySelectorAll('.ikPGallery-point-pin')[0].addEventListener('touchend', function (e) {
        point.position = position;
        service._checkPopupPosition(image, pointElement, position);
        service._removeClass(pointElement, 'dragged');
        service._removeClass(image, 'dragged');
    });

    image.ondragstart = function() {
        return false;
    };
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
 * Add Wrapper to element helper
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

_ikProductsImageGallery.prototype._is_touch_device = function () {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
};

/**
 * Check class exist of element
 * @param element
 * @param className
 * @returns {boolean}
 * @private
 */
_ikProductsImageGallery.prototype._hasClass = function(element, className) {
    if (element.classList)
        return element.classList.contains(className);
    else
        return !!element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
};

/**
 * Add class to element helper
 * @param element
 * @param className
 * @private
 */
_ikProductsImageGallery.prototype._addClass = function(element, className) {
    var service = this;
    if (element.classList) {
        element.classList.add(className);
    } else if (!service._hasClass(element, className)) {
        element.className += " " + className
    }
};

/**
 * Remove class from element helper
 * @param element
 * @param className
 * @private
 */
_ikProductsImageGallery.prototype._removeClass = function(element, className) {
    var service = this;
    if (element.classList) {
        element.classList.remove(className);
    } else if (service._hasClass(element, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        element.className=element.className.replace(reg, ' ')
    }
};

/**
 * Get (X,Y) of point
 * @param image
 * @returns {{x: string, y: string}}
 * @private
 */
_ikProductsImageGallery.prototype._getImageXY = function (event, type) {
    var position = {
        x: event.pageX - event.target.x,
        y: event.pageY - event.target.y
    };
    switch (type){
        case 'number':
            return position;
        case 'percent':
        default:
            return {
                x: parseFloat((position.x * 100) / event.target.clientWidth).toFixed(2) + '%',
                y: parseFloat((position.y * 100) / event.target.clientHeight).toFixed(2) + '%'
            };
    }
};

/**
 * Get (X,Y) of point on touch
 * @param event
 * @param image
 * @returns {{x: string, y: string}}
 * @private
 */
_ikProductsImageGallery.prototype._getTouchXY = function (event, image, type) {
    var imageOffset = this._getOffset(image),
        position = {
            x: event.changedTouches[0].pageX - imageOffset.left,
            y: event.changedTouches[0].pageY - imageOffset.top
        };
    switch (type){
        case 'number':
            return position;
        case 'percent':
        default:
            var x = parseFloat((position.x * 100) / image.clientWidth).toFixed(2),
                y = parseFloat((position.y * 100) / image.clientHeight).toFixed(2);

            if (x < 0){
                x = 0;
            } else if(x > 100) {
                x = 100;
            }

            if (y < 0){
                y = 0;
            } else if(y > 100) {
                y = 100;
            }

            return {
                x: x + '%',
                y: y + '%'
            };
    }
};

/**
 * Get element offset helper
 * @param element
 * @returns {{top: number, left: number}}
 * @private
 */
_ikProductsImageGallery.prototype._getOffset = function (element) {
    var top = 0, left = 0;
    do {
        top += element.offsetTop  || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while(element);

    return {
        top: top,
        left: left
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