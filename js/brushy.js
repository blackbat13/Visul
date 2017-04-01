/**
 * Created by blackbat on 24.11.2016.
 */
var Brushy = function (canvasId, width, height) {
    var canvas;
    var ctx;
    var backgroundColor;
    var drawingColor;

    var init = function () {
        canvas = document.getElementById(canvasId);
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext("2d");
        backgroundColor = "#fff";
        drawingColor = "#000";
    };

    init();

    var checkColor = function (color) {
        //TODO implement
        return true;
    };

    var checkXCoordinate = function (x) {
        return !(x < 0 || x > width);
    };

    var checkYCoordinate = function (y) {
        return !(y < 0 || y > height);
    };

    var checkCoordinates = function (x, y) {
        return !(y < 0 || y > height || x < 0 || x > width);
    };

    var rgbToColor = function (r, g, b) {
        return `rgb(${r}, ${g}, ${b})`;
    };

    var rgbaToColor = function (r, g, b, a) {
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    };

    var colorToRgb = function (color) {
        let r, g, b;

        var colorArray = color.split("rgb(,)");

        r = parseInt(colorArray[0]);
        g = parseInt(colorArray[1]);
        b = parseInt(colorArray[2]);

        return {r: r, g: g, b: b};
    };

    var colorToRgba = function (color) {
        let r, g, b, a;

        var colorArray = color.split("rgba(,)");

        r = parseInt(colorArray[0]);
        g = parseInt(colorArray[1]);
        b = parseInt(colorArray[2]);
        a = parseFloat(colorArray[3]);

        return {r: r, g: g, b: b, a: a};
    };

    var checkColorValue = function (value) {
        return !(value < 0 || value > 255);
    };

    var checkOpacityValue = function (opacity) {
        return !(opacity < 0 || opacity > 1);
    };

    var checkRgb = function (r, g, b) {
        return checkColorValue(r) && checkColorValue(g) && checkColorValue(b);
    };

    var checkRgba = function (r, g, b, a) {
        return checkColorValue(r) && checkColorValue(g) && checkColorValue(b) && checkOpacityValue(a);
    };

    var randomColorValue = function () {
        return Math.round(Math.random() * 255);
    };

    var randomColor = function () {
        return rgbToColor(randomColorValue(), randomColorValue(), randomColorValue());
    };

    var randomColorWithOpacity = function (opacity) {
        if(!checkOpacityValue(opacity)) {
            return false;
        }

        return rgbaToColor(randomColorValue(), randomColorValue(), randomColorValue(), opacity);
    };


    // Public methods

    this.setDrawingColor = function (color) {
        if (!checkColor(color)) {
            return false;
        }

        drawingColor = color;
        return true;
    };

    this.setBackgroundColor = function (color) {
        if (!checkColor(color)) {
            return false;
        }

        backgroundColor = color;
        return true;
    };

    this.clean = function () {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);
        return true;
    };

    this.cleanWithColor = function (color) {
        if (!checkColor(color)) {
            return false;
        }

        ctx.fillStyle = color;
        ctx.fillRect(0, 0, width, height);
        return true;
    };

    this.setPixel = function (x, y) {
        if (!checkCoordinates(x, y)) {
            return false;
        }

        ctx.fillStyle = drawingColor;
        ctx.fillRect(x, y, 1, 1);
        return true;
    };

    this.setPixelWithColor = function (x, y, color) {
        if (!checkCoordinates(x, y)) {
            return false;
        }

        if (!checkColor(color)) {
            return false;
        }

        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
        return true;
    };

    this.setPixelWithRgb = function (x, y, r, g, b) {
        if (!checkCoordinates(x, y)) {
            return false;
        }

        if (!checkRgb(r, g, b)) {
            return false;
        }

        ctx.fillStyle = rgbToColor(r, g, b);
        ctx.fillRect(x, y, 1, 1);
        return true;
    };

    this.setPixelWithRgba = function (x, y, r, g, b, a) {
        if (!checkCoordinates(x, y)) {
            return false;
        }

        if (!checkRgba(r, g, b, a)) {
            return false;
        }

        ctx.fillStyle = rgbaToColor(r, g, b, a);
        ctx.fillRect(x, y, 1, 1);
        return true;
    };

    this.setPixelWithRandomColor = function (x, y) {
        if (!checkCoordinates(x, y)) {
            return false;
        }

        ctx.fillStyle = randomColor();
        ctx.fillRect(x, y, 1, 1);
        return true;
    };

    this.getPixelColor = function (x, y) {
        let imageData = ctx.getImageData(x, y, 1, 1);
        return rgbaToColor(imageData[0], imageData[1], imageData[2], imageData[3]);
    };

    this.getPixelRgb = function (x, y) {
        let imageData = ctx.getImageData(x, y, 1, 1);
        return {r: imageData[0], g: imageData[1], b: imageData[2]};
    };

    this.getPixelRgba = function (x, y) {
        let imageData = ctx.getImageData(x, y, 1, 1);
        return {r: imageData[0], g: imageData[1], b: imageData[2], a: imageData[3]};
    };

    this.getRandomColor = function () {
        return randomColor();
    };

    this.getRandomColorWithOpacity = function (opacity) {
        return randomColorWithOpacity(opacity);
    };

    this.drawVerticalStripe = function (x, stripeWidth) {
        if (!checkXCoordinate(x)) {
            return false;
        }

        ctx.fillStyle = drawingColor;
        ctx.fillRect(x, 0, stripeWidth, height);
        return true;
    };

    this.drawVerticalStripeWithColor = function (x, stripeWidth, color) {
        if (!checkXCoordinate(x)) {
            return false;
        }

        if (!checkColor(color)) {
            return false;
        }

        ctx.fillStyle = color;
        ctx.fillRect(x, 0, stripeWidth, height);
        return true;
    };

    this.drawVerticalStripeWithRgb = function (x, stripeWidth, r, g, b) {
        if (!checkXCoordinate(x)) {
            return false;
        }

        if (!checkRgb(r, g, b)) {
            return false;
        }

        ctx.fillStyle = rgbToColor(r, g, b);
        ctx.fillRect(x, 0, stripeWidth, height);
        return true;
    };

    this.drawVerticalStripeWithRgba = function (x, stripeWidth, r, g, b, a) {
        if (!checkXCoordinate(x)) {
            return false;
        }

        if (!checkRgba(r, g, b, a)) {
            return false;
        }

        ctx.fillStyle = rgbaToColor(r, g, b, a);
        ctx.fillRect(x, 0, stripeWidth, height);
        return true;
    };
};