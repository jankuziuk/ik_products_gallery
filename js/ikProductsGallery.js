/**
 * IK products gallery
 * @description Product gallery points on image
 * @version 1.0.2
 * @author Ivan Kuziuk
 * @authoremail kuzyuk@gmail.com
 * @lastmadificated 18.01.2018
 */

var ikProductsImageGalleryDefault = {
    editMode: true,
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
    pointItemSelector: '.ikPGallery-point',
    pointItemPinSelector: '.ikPGallery-point-pin',
    pointItemInfoAttr: 'data-point',
    pointItemRemoveElement: ".btn-remove-point",

    addNewPoint: function (gallery, image, data, galleryId) {},
    onPointRemoved: function (gallery, image, data, galleryId) {}
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
    this._initImages();
    this._onResize();
};

/**
 * Each and create images object
 * @private
 */
_ikProductsImageGallery.prototype._initImages = function () {
    var _self = this;

    /** If has images */
    if (_self.imagesElements.length > 0) {
        for (var i = 0; i < _self.imagesElements.length; i++) {
            var image = _self.imagesElements[i],
                imageId = image.getAttribute(_self.settings.imageIdAttribute);

            _self.images[imageId] = {
                id: imageId,
                points: _self._initPoints(image)
            };

            image.addEventListener('click', function (e) {
                e.preventDefault();
                var openPoints = this.parentNode.querySelectorAll('.ikPGallery-point.is-touched');
                if (openPoints.length !== 0) {
                    for (var i = 0; i < openPoints.length; i++) {
                        _self._removeClass(openPoints[i], 'is-touched');
                    }
                }
            });
        }
    }
};

/**
 * Init points
 * @param image
 * @private
 */
_ikProductsImageGallery.prototype._initPoints = function (image) {
    var _self = this;
    var points = image.parentNode.querySelectorAll(_self.settings.pointItemSelector);
    if (points.length > 0){
        var pointsArray = [];
        for (var i = 0; i < points.length; i++){
            var point = points[i],
                data = JSON.parse(point.getAttribute(_self.settings.pointItemInfoAttr));

            pointsArray.push(data);
            _self._checkPopupPosition(image, point, data.position);
            if (_self.settings.editMode){
                _self._draggable(image, point);
                _self._removePoint(image, point);
            }
        }
        return pointsArray;
    } else {
        return [];
    }
};

/**
 * On window resize functions
 * @private
 */
_ikProductsImageGallery.prototype._onResize = function () {
    var _self = this;

    window.addEventListener('resize', function () {

        for (var imageIndex = 0; imageIndex < _self.imagesElements.length; imageIndex++){
            var image = _self.imagesElements[imageIndex],
                points = image.parentNode.querySelectorAll('.ikPGallery-point');

            for (var pointIndex = 0; pointIndex < points.length; pointIndex++){
                var pointElement = points[pointIndex],
                    position = {
                        x: parseFloat(pointElement.style.left),
                        y: parseFloat(pointElement.style.top)
                    };
                _self._checkPopupPosition(image, pointElement, position);
            }
        }
    });
};

/**
 * Check point position and set popup position
 * @param parent
 * @param point
 * @param position
 * @private
 */
_ikProductsImageGallery.prototype._checkPopupPosition = function (parent, point, position) {
    var _self = this,
    imageSize = {
        width: parseFloat(parent.clientWidth),
        height: parseFloat(parent.clientHeight)
    },
    pointPosition = {
        x: imageSize.width * parseFloat(position.x) / 100,
        y: imageSize.height * parseFloat(position.y) / 100
    };

    _self._removeClass(point, 'popup-y-top');
    _self._removeClass(point, 'popup-y-bottom');
    _self._removeClass(point, 'popup-x-left');
    _self._removeClass(point, 'popup-x-center');
    _self._removeClass(point, 'popup-x-right');

    if (pointPosition.y < _self.settings.popupIndent.top){
        _self._addClass(point, 'popup-y-bottom');
    } else {
        _self._addClass(point, 'popup-y-top');
    }

    if (pointPosition.x < _self.settings.popupIndent.left){
        _self._addClass(point, 'popup-x-right');
    } else if (pointPosition.x > imageSize.width - _self.settings.popupIndent.right){
        _self._addClass(point, 'popup-x-left');
    } else {
        _self._addClass(point, 'popup-x-center');
    }
};

/**
 * Add draggable event to point
 * @param image
 * @param point
 * @private
 */
_ikProductsImageGallery.prototype._draggable = function (image, point) {
    var _self = this,
        pin = point.querySelectorAll(_self.settings.pointItemPinSelector)[0],
        index = _self._getIndex(point),
        imageId = image.getAttribute(_self.settings.imageIdAttribute),
        position;


    pin.onmousedown = function(e) {
        position = _self.images[imageId].points[index].position;
        _self._addClass(point, 'dragged');
        _self._addClass(image, 'dragged');

        image.onmousemove = function (e) {
            var coordinates = _self._getImageXY(e);
            position = coordinates;
            point.style.top = coordinates.y;
            point.style.left = coordinates.x;
            _self._checkPopupPosition(image, point, position);
        };

        document.onmouseup = function (e) {
            image.onmousemove = null;
            _self.images[imageId].points[index].position = position;
            _self._checkPopupPosition(image, point, position);
            _self._removeClass(point, 'dragged');
            _self._removeClass(image, 'dragged');
        };
    };

    pin.addEventListener('touchstart', function (e) {
        position = _self.images[imageId].points[index].position;
        if (!_self._hasClass(point, 'is-touched')) {
            var openPoints = image.parentNode.querySelectorAll('.ikPGallery-point.is-touched');
            if (openPoints.length > 0){
                for (var i = 0; i < openPoints.length; i++){
                    _self._removeClass(openPoints[i], 'is-touched');
                }
            }
            _self._addClass(point, 'is-touched');
        } else {
            _self._removeClass(point, 'is-touched');
        }
    });

    pin.addEventListener('touchmove', function (event) {
        event.preventDefault();
        event.stopPropagation();
        var coordinates = _self._getTouchXY(event, image);
        position = coordinates;
        point.style.top = coordinates.y;
        point.style.left = coordinates.x;
        _self._addClass(point, 'dragged');
        _self._removeClass(point, 'is-touched');
        _self._addClass(image, 'dragged');
    });

    pin.addEventListener('touchend', function (e) {
        _self.images[imageId].points[index].position = position;
        _self._checkPopupPosition(image, point, position);
        _self._removeClass(point, 'dragged');
        _self._removeClass(image, 'dragged');
    });

    image.ondragstart = function() {
        return false;
    };
};

_ikProductsImageGallery.prototype._removePoint = function (image, point) {
    var _self = this;

    point.querySelectorAll(_self.settings.pointItemRemoveElement)[0].addEventListener('click', function () {
        var index = _self._getIndex(point),
            imageId = image.getAttribute(_self.settings.imageIdAttribute);

        point.remove();
        _self.images[imageId].points.splice(index, 1);
        _self.settings.onPointRemoved(_self.element, image, _self.images, _self.galleryId);
    });
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
    var _self = this;
    if (element.classList) {
        element.classList.add(className);
    } else if (!_self._hasClass(element, className)) {
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
    var _self = this;
    if (element.classList) {
        element.classList.remove(className);
    } else if (_self._hasClass(element, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        element.className=element.className.replace(reg, ' ')
    }
};

/** Get element index of nodeList */
_ikProductsImageGallery.prototype._getIndex = function (elem) {
    var elements = elem.parentNode.children;
    for(var i = 0; i < elements.length; i++) {
        if (elements[i]===elem) {
            return i;
        }
    }
    return -1;
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

var ikProductsImageGallery = function (selector, options) {
    try {
        var sections = document.querySelectorAll(selector),
            objects;

        if (sections.length === 1) {
            objects = new _ikProductsImageGallery(sections[0], ikExtend(ikProductsImageGalleryDefault, options));
        } else if (sections.length > 1) {
            objects = {};
            for (var i = 0; i < sections.length; i++) {
                objects[i] = new _ikProductsImageGallery(sections[i], ikExtend(ikProductsImageGalleryDefault, options));
            }
        }
        return objects;
    } catch (e) {
        throw(e);
    }
};