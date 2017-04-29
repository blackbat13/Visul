/**
 * Created by blackbat on 24.11.2016.
 */
class Brushy {
    constructor(canvasId, width, height) {
        this.canvasId = canvasId;
        this.$canvas = $('#' + canvasId);
        this.width = width;
        this.height = height;
    }

    init() {
        this.canvas = document.getElementById(this.canvasId);
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext("2d");
        this.backgroundColor = "#fff";
        this.drawingColor = "#000";
    };

    static checkColor(color) {
        //TODO implement
        return true;
    }

    static checkXCoordinate(x) {
        return !(x < 0 || x > width);
    }

    static checkYCoordinate(y) {
        return !(y < 0 || y > height);
    }

    static checkCoordinates(x, y) {
        return !(y < 0 || y > height || x < 0 || x > width);
    }

    static rgbToColor(r, g, b) {
        return `rgb(${r}, ${g}, ${b})`;
    }

    static rgbaToColor(r, g, b, a) {
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    static colorToRgb(color) {
        let r, g, b;

        let colorArray = color.split("rgb(,)");

        r = parseInt(colorArray[0]);
        g = parseInt(colorArray[1]);
        b = parseInt(colorArray[2]);

        return {r: r, g: g, b: b};
    }

    static colorToRgba(color) {
        let r, g, b, a;

        let colorArray = color.split("rgba(,)");

        r = parseInt(colorArray[0]);
        g = parseInt(colorArray[1]);
        b = parseInt(colorArray[2]);
        a = parseFloat(colorArray[3]);

        return {r: r, g: g, b: b, a: a};
    }

    static checkColorValue(value) {
        return !(value < 0 || value > 255);
    }

    static checkOpacityValue(opacity) {
        return !(opacity < 0 || opacity > 1);
    }

    static checkRgb(r, g, b) {
        return Brushy.checkColorValue(r) && Brushy.checkColorValue(g) && Brushy.checkColorValue(b);
    }

    static checkRgba(r, g, b, a) {
        return Brushy.checkColorValue(r) && Brushy.checkColorValue(g) && Brushy.checkColorValue(b) && Brushy.checkOpacityValue(a);
    }

    static randomColorValue() {
        return Math.round(Math.random() * 255);
    }

    static randomColor() {
        return Brushy.rgbToColor(Brushy.randomColorValue(), Brushy.randomColorValue(), Brushy.randomColorValue());
    }

    static randomColorWithOpacity(opacity) {
        if(!Brushy.checkOpacityValue(opacity)) {
            return false;
        }

        return Brushy.rgbaToColor(Brushy.randomColorValue(), Brushy.randomColorValue(), Brushy.randomColorValue(), opacity);
    }

    setDrawingColor(color) {
        if (!Brushy.checkColor(color)) {
            return false;
        }

        this.drawingColor = color;
        return true;
    }

    setBackgroundColor(color) {
        if (!Brushy.checkColor(color)) {
            return false;
        }

        this.backgroundColor = color;
        return true;
    };

    clean() {
        this.ctx.fillStyle = backgroundColor;
        this.ctx.fillRect(0, 0, width, height);
        return true;
    };

    cleanWithColor(color) {
        if (!Brushy.checkColor(color)) {
            return false;
        }

        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, width, height);
        return true;
    };

    setPixel(x, y) {
        if (!Brushy.checkCoordinates(x, y)) {
            return false;
        }

        this.ctx.fillStyle = this.drawingColor;
        this.ctx.fillRect(x, y, 1, 1);
        return true;
    };

    setPixelWithColor(x, y, color) {
        if (!Brushy.checkCoordinates(x, y)) {
            return false;
        }

        if (!Brushy.checkColor(color)) {
            return false;
        }

        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, 1, 1);
        return true;
    };

    setPixelWithRgb(x, y, r, g, b) {
        if (!Brushy.checkCoordinates(x, y)) {
            return false;
        }

        if (!Brushy.checkRgb(r, g, b)) {
            return false;
        }

        this.ctx.fillStyle = Brushy.rgbToColor(r, g, b);
        this.ctx.fillRect(x, y, 1, 1);
        return true;
    };

    setPixelWithRgba(x, y, r, g, b, a) {
        if (!Brushy.checkCoordinates(x, y)) {
            return false;
        }

        if (!Brushy.checkRgba(r, g, b, a)) {
            return false;
        }

        this.ctx.fillStyle = Brushy.rgbaToColor(r, g, b, a);
        this.ctx.fillRect(x, y, 1, 1);
        return true;
    };

    setPixelWithRandomColor(x, y) {
        if (!Brushy.checkCoordinates(x, y)) {
            return false;
        }

        this.ctx.fillStyle = Brushy.randomColor();
        this.ctx.fillRect(x, y, 1, 1);
        return true;
    };

    getPixelColor(x, y) {
        let imageData = this.ctx.getImageData(x, y, 1, 1);
        return Brushy.rgbaToColor(imageData[0], imageData[1], imageData[2], imageData[3]);
    };

    getPixelRgb(x, y) {
        let imageData = this.ctx.getImageData(x, y, 1, 1);
        return {r: imageData[0], g: imageData[1], b: imageData[2]};
    }

    getPixelRgba(x, y) {
        let imageData = this.ctx.getImageData(x, y, 1, 1);
        return {r: imageData[0], g: imageData[1], b: imageData[2], a: imageData[3]};
    }

    static getRandomColor() {
        return Brushy.randomColor();
    }

    static getRandomColorWithOpacity(opacity) {
        return Brushy.randomColorWithOpacity(opacity);
    }

    drawVerticalStripe(x, stripeWidth) {
        if (!Brushy.checkXCoordinate(x)) {
            return false;
        }

        this.ctx.fillStyle = this.drawingColor;
        this.ctx.fillRect(x, 0, stripeWidth, height);
        return true;
    }

    drawVerticalStripeWithColor(x, stripeWidth, color) {
        if (!Brushy.checkXCoordinate(x)) {
            return false;
        }

        if (!Brushy.checkColor(color)) {
            return false;
        }

        this. ctx.fillStyle = color;
        this.ctx.fillRect(x, 0, stripeWidth, height);
        return true;
    }

    drawVerticalStripeWithRgb(x, stripeWidth, r, g, b) {
        if (!Brushy.checkXCoordinate(x)) {
            return false;
        }

        if (!Brushy.checkRgb(r, g, b)) {
            return false;
        }

        this.ctx.fillStyle = Brushy.rgbToColor(r, g, b);
        this.ctx.fillRect(x, 0, stripeWidth, height);
        return true;
    }

    drawVerticalStripeWithRgba(x, stripeWidth, r, g, b, a) {
        if (!Brushy.checkXCoordinate(x)) {
            return false;
        }

        if (!Brushy.checkRgba(r, g, b, a)) {
            return false;
        }

        this.ctx.fillStyle = Brushy.rgbaToColor(r, g, b, a);
        this.ctx.fillRect(x, 0, stripeWidth, height);
        return true;
    }
}