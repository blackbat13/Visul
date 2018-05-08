/**
 * Created by black on 29.04.2017.
 */

class Labirynth {
    constructor(canvasId) {
        this.canvasId = canvasId;
        this.$canvas = $('#' + canvasId);

    }

    init() {
        this.prepareVariables();
        this.setSliders();
        this.prepareEvents();
        this.clearPixelsArray();
        requestAnimationFrame(this.draw.bind(this));
    }

    prepareVariables() {
        this.sizeX = this.$canvas.width();
        this.sizeX -= $("form").width();
        this.$canvas.width(this.sizeX);
        this.sizeY = this.$canvas.height();
        this.centerX = this.sizeX / 2;
        this.centerY = this.sizeY / 2;
        this.speed = 1000;
        this.stop = false;
        this.pixels = [];
        this.percent = 5 / 100;
        this.opacity = 0.05;
        this.moveLength = 15;
        this.graph = [];
        this.visited = [];
        this.prepareCoordinates();
        this.prepareColors();
        this.prepareGraph();
        this.prepareCanvas();
    }

    prepareCoordinates() {
        this.x = 0;
        this.y = 0;
    }

    prepareColors() {
        this.color = 0xff0000;
        this.backgroundColor = "#000000";
    }

    setSliders() {
        this.setSlidersValues();
        this.setSlidersLabelsValues();
    }

    prepareEvents() {
        $("#speedInput").change($.proxy(function () {
            this.speed = $("#speedInput").val();
        }, this));

        $("#colorInput").change($.proxy(function () {
            let tmp = $("#colorInput").val();
            tmp = tmp.replace("#", "");
            tmp = parseInt(tmp, 16);
            this.color = tmp;
        }, this));

        $("#backgroundColorInput").change($.proxy(function () {
            this.backgroundColor = $("#backgroundColorInput").val();
            this.clearPixelsArray();
            this.ctx.fillStyle = this.backgroundColor;
            this.ctx.fillRect(0, 0, this.sizeX, this.sizeY);
        }, this));

        $("#opacityInput").bind('input', $.proxy(function () {
            this.opacity = $("#opacityInput").val();
            $("#opacityValue").html(this.opacity);
        }, this));

        $("#lengthInput").change(function () {
           this. moveLength = parseInt($("#lengthInput").val());
        });

        $("#clearButton").click($.proxy(function () {
            this.clearPixelsArray();
            this.clearCanvas();
            this.setBeginningCoordinates();
            return false;
        }, this));

        $("#stopButton").click($.proxy(function () {
            this.stop = !this.stop;

            if (this.stop) {
                $("#stopButton").html("Start");
            } else {
                $("#stopButton").html("Stop");
            }

            return false;
        }, this));
    }

    setBeginningCoordinates() {
        this.x = 0;
        this.y = 0;
    }

    setSlidersLabelsValues() {
        $("#opacityValue").html(this.opacity);
    }

    setSlidersValues() {
        $("#opacityInput").val(this.opacity);
    }

    clearPixelsArray() {
        for (let i = 0; i <= this.sizeX; ++i) {
            this.pixels[i] = [];
            for (let j = 0; j <= this.sizeY; ++j) {
                this.pixels[i][j] = 0;
            }
        }
    }

    prepareGraph() {

    }

    prepareCanvas() {
        this.canvas = document.getElementById(this.canvasId);
        this.canvas.width = this.sizeX;
        this.canvas.height = this.sizeY;
        this.ctx = this.canvas.getContext("2d");
        this.clearCanvas();
    }

    clearCanvas() {
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.sizeX, this.sizeY);
    }

    draw() {
        requestAnimationFrame(this.draw);
    }

    hex2rgb(hex) {
        let rgb = [];
        rgb[0] = (hex >> 16 & 255) / 255;
        rgb[1] = (hex >> 8 & 255) / 255;
        rgb[2] = (255 & hex) / 255;
        return rgb;
    }
}