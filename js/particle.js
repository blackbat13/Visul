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
        this._fillColor = "#fff";
        this._shouldBounce = false;
        this._name = "Particle";
        this._friction = 0;
        this._maxSpeed = 5;
    }

    get location() {
        return this._location;
    }

    get radius() {
        return this._radius;
    }

    get mass() {
        return this._mass;
    }

    set mass(val) {
        this._mass = val;
    }

    get charge() {
        return this._charge;
    }

    set charge(val) {
        this._charge = val;
    }

    get force() {
        return this._force;
    }

    get speed() {
        return this._speed;
    }

    set location(val) {
        this._location = val;
    }

    set radius(val) {
        this._radius = val;
    }

    set speed(val) {
        this._speed = val;
    }

    get fillColor() {
        return this._fillColor;
    }

    set fillColor(val) {
        this._fillColor = val;
    }

    get shouldBounce() {
        return this._shouldBounce;
    }

    set shouldBounce(val) {
        this._shouldBounce = val;
    }

    get name() {
        return this._name;
    }

    get friction() {
        return this._friction;
    }

    set friction(val) {
        this._friction = val;
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

    limitSpeed() {
        this._speed.x = Math.min(this._speed.x, this._maxSpeed);
        this._speed.y = Math.min(this._speed.y, this._maxSpeed);
    }

    move() {
        this._location.x += this._speed.x;
        this._location.y += this._speed.y;
    }

    update() {
        this.applyForce();
        this.limitSpeed();
        this.applyFriction();
        this.move();
    }

    applyFriction() {
        let sign = Math.sign(this._speed.x);

        if(this._friction > this._speed.x * sign) {
            this._speed.x = 0;
        } else {
            this._speed.x -= this._friction * sign;
        }

        sign = Math.sign(this._speed.y);
        if(this._friction > this._speed.y * sign) {
            this._speed.y = 0;
        } else {
            this._speed.y -= this._friction * sign;
        }
    }

    bounce(rect) {
        let offset = 5;

        if(this._location.x < rect.minX) {
            this._location.x = rect.minX + offset;
            this._speed.x = Math.abs(this._speed.x);
        }

        if(this._location.y < rect.minY) {
            this._location.y = rect.minY + offset;
            this._speed.y = Math.abs(this._speed.y);
        }

        if(this._location.x > rect.maxX) {
            this._location.x = rect.maxX - offset;
            this._speed.x = Math.abs(this._speed.x) * -1;
        }

        if(this._location.y > rect.maxY) {
            this._location.y = rect.maxY - offset;
            this._speed.y = Math.abs(this._speed.y) * -1;
        }
    }

    draw(ctx) {
        ctx.fillStyle = this._fillColor;
        ctx.beginPath();
        ctx.arc(this.location.intX, this.location.intY, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}