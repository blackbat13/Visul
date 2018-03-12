// import {Point} from "./point";
// import {Rectangle} from "./rectangle";

class Particle {
    constructor(rect) {
        this._location = new Point(0, 0);
        this.getRandomLocation(rect);
        this._speed = new Point(0, 0);
        this._force = new Point(0, 0);
        this._radius = 15;
        this._mass = 1;
        this._charge = 10;
    }

    get location() {
        return this._location;
    }

    get radius() {
        return this._radius;
    }

    get charge() {
        return this._charge;
    }

    get force() {
        return this._force;
    }

    getRandomLocation(rect) {
        this._location.x = Math.random() * rect.width + rect.minX;
        this._location.y = Math.random() * rect.height + rect.minY;
    }

    resetForce() {
        this._force.x = 0;
        this._force.y = 0;
    }

    applyForce() {
        this._speed.x += this._force.x / this._mass;
        this._speed.y += this._force.y / this._mass;
    }

    move() {
        this._location.x += this._speed.x;
        this._location.y += this._speed.y;
    }

    bounce(rect) {
        if(this._location.x < rect.minX) {
            this._location.x = rect.minX + 1;
            this._speed.x = Math.abs(this._speed.x);
        }

        if(this._location.y < rect.minY) {
            this._location.y = rect.minY + 1;
            this._speed.y = Math.abs(this._speed.y);
        }

        if(this._location.x > rect.maxX) {
            this._location.x = rect.maxX - 1;
            this._speed.x = Math.abs(this._speed.x) * -1;
        }

        if(this._location.y > rect.maxY) {
            this._location.y = rect.maxY - 1;
            this._speed.y = Math.abs(this._speed.y) * -1;
        }
    }

    draw(ctx) {
        ctx.fillStyle = "#f00";
        ctx.beginPath();
        ctx.arc(this.location.intX, this.location.intY, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}