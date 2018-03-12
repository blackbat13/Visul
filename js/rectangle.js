class Rectangle {
    constructor(x, y, width, height) {
        this._minX = x;
        this._minY = y;
        this._width = width;
        this._height = height;
        this._maxX = x + width;
        this._maxY = y + height;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get minX() {
        return this._minX;
    }

    get minY() {
        return this._minY;
    }

    get maxX() {
        return this._maxX;
    }

    get maxY() {
        return this._maxY;
    }
}