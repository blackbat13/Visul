/**
 * Represents two-dimensional point
 */
class Point {

    /**
     *
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    set x(val) {
        this._x = val;
    }

    set y(val) {
        this._y = val;
    }

    get intX() {
        return Math.round(this._x);
    }

    get intY() {
        return Math.round(this._y);
    }

    /**
     * Add point to current one
     * @param {Point} p Point to add
     */
    add(p) {
        this._x += p.x;
        this._y += p.y;
    }

    /**
     * Substract point from current one
     * @param {Point} p Point to substract
     */
    substract(p) {
        this._x -= p.x;
        this._y -= p.y;
    }

    /**
     * Computes difference between two points
     * @param {Point} p1 First point
     * @param {Point} p2 Second point
     * @returns {Point} Difference between two given points
     */
    static difference(p1, p2) {
        return new Point(p1.x - p2.x, p1.y - p2.y);
    }

    /**
     * Computes euclidean distance between two given points
     * @param {Point} p1 First point
     * @param {Point} p2 Second point
     * @returns {number} Euclidean distance between two given points
     */
    static distance(p1, p2) {
        let dif = this.difference(p1, p2);
        return Math.sqrt(dif.x * dif.x + dif.y * dif.y);
    }
}