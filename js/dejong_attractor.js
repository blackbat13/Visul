/**
 * Created by blackbat on 06.04.2017.
 */
class DejongAttractor extends Attractor {
    constructor(canvasId) {
        super(canvasId, ["a", "b", "c", "d"]);
    }

    prepareBeginningValues() {
        this.values = [-1.85, 1.48, -1.55, -1.87];
    }

    prepareScale() {
        this.scale = this.sizeX / 6;
    }

    draw() {
        requestAnimationFrame(this.draw.bind(this));
        if (this.stop) {
            return;
        }

        let xn, yn;
        for (let i = 0; i < this.speed; ++i) {
            xn = Math.sin(this.values[0] * this.y) - Math.cos(this.values[1] * this.x);
            yn = Math.sin(this.values[2] * this.x) - Math.cos(this.values[3] * this.y);
            this.x = xn;
            this.y = yn;
            let cx = Math.round(this.centerX + this.x * this.scale),
                cy = Math.round(this.centerY + this.y * this.scale);
            if (cx < 0 || cy < 0 || cx > this.sizeX || cy > this.sizeY) {
                continue;
            }

            let val = this.pixels[cx][cy];
            let rgb = this.hex2rgb(this.color);
            rgb[0] -= rgb[0] * val * this.percent > 0 ? rgb[0] * val * this.percent : 0;
            rgb[1] -= rgb[1] * val * this.percent > 0 ? rgb[1] * val * this.percent : 0;
            rgb[2] -= rgb[2] * val * this.percent > 0 ? rgb[2] * val * this.percent : 0;

            this.ctx.fillStyle = "rgba(" + rgb[0] * 255 + "," + rgb[1] * 255 + "," + rgb[2] * 255 + "," + this.opacity + ")";
            this.ctx.fillRect(cx, cy, 1, 1);

            this.pixels[cx][cy] = this.pixels[cx][cy] < 20 ? this.pixels[cx][cy] + 1 : 0;
        }
    }

    prepareExamples() {
        this.examples[0] = {
            name: "1",
            values: [-1.85, 1.48, -1.55, -1.87],
            opacity: 0.05
        };
        this.examples[1] = {
            name: "2",
            values: [1.4, -2.3, 2.4, -2.1],
            opacity: 0.05
        };
        this.examples[2] = {
            name: "3",
            values: [2.01, -2.53, 1.61, -0.33],
            opacity: 0.05
        };
        this.examples[3] = {
            name: "4",
            values: [-2.0, -2.0, -1.2, 2.0],
            opacity: 0.05
        };


        for (let i = 0; i < this.examples.length; ++i) {
            $("#examples").append("<option value='" + i + "'>" + this.examples[i].name + "</option>");
        }
    }
}