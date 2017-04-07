/**
 * Created by blackbat on 06.04.2017.
 */
class Attractor {

    constructor(canvasId, valuesNames) {
        this.$canvas = $('#' + canvasId);
        this.canvasId = canvasId;
        this.valuesNames = valuesNames;
    }

    init() {
        this.prepareVariables();
        this.setSliders();
        this.prepareEvents();
        this.clearPixelsArray();
        requestAnimationFrame(this.draw.bind(this));
    }

    prepareVariables() {
        this.examples = [];
        this.sizeX = this.$canvas.width();
        this.sizeX -= $("form").width();
        this.$canvas.width(this.sizeX);
        this.sizeY = this.$canvas.height();
        this.centerX = this.sizeX / 2;
        this.centerY = this.sizeY / 2;
        this.x = 0;
        this.y = 0;
        this.speed = 1000;
        this.color = 0xff0000;
        this.backgroundColor = "#000000";
        this.stop = false;
        this.pixels = [];
        this.percent = 5 / 100;
        this.values = [];
        this.examples = [];
        this.opacity = 0.05;
        this.setScale();
        this.setBeginningValues();
        this.prepareExamples();
        this.prepareCanvas();
    }

    setScale() {
        console.log("Not implemented");
    }

    setBeginningValues() {
        console.log("Not implemented");
    }

    setSliders() {
        this.setSlidersValues();
        this.setSlidersLabelsValues();
        this.setFormulaVariables();
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

        for (let i = 0; i < this.valuesNames.length; ++i) {
            let valueName = this.valuesNames[i];
            $("#" + valueName + "Input").bind('input', $.proxy(function () {
                this.values[i] = $("#" + valueName + "Input").val();
                $("#" + valueName + "Value").html(this.values[i]);
                $("." + valueName + "Var").html(this.values[i]);
                this.x = 0;
                this.y = 0;
            }, this));
        }

        $("#opacityInput").bind('input', $.proxy(function () {
            this.opacity = $("#opacityInput").val();
            $("#opacityValue").html(this.opacity);
        }, this));

        $("#clearButton").click($.proxy(function () {
            this.clearPixelsArray();
            this.clearCanvas();
            this.x = 0;
            this.y = 0;
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

        $("#examples").change($.proxy(function () {
            let selectedIndex = $('select[name=examples]').val();
            if (selectedIndex === -1) {
                return;
            }

            let selectedExample = this.examples[selectedIndex];
            this.values = selectedExample.values;
            this.opacity = selectedExample.opacity;

            this.setSlidersValues();
            this.setSlidersLabelsValues();
            this.setFormulaVariables();
        }, this));
    }

    setFormulaVariables() {
        for (let i = 0; i < this.valuesNames.length; ++i) {
            $("." + this.valuesNames[i] + "Var").html(this.values[i]);
        }
    }

    setSlidersLabelsValues() {
        for (let i = 0; i < this.valuesNames.length; ++i) {
            $("#" + this.valuesNames[i] + "Value").html(this.values[i]);
        }
        $("#opacityValue").html(this.opacity);
    }

    setSlidersValues() {
        for (let i = 0; i < this.valuesNames.length; ++i) {
            $("#" + this.valuesNames[i] + "Input").val(this.values[i]);
        }
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

    prepareCanvas() {
        this.canvas = document.getElementById(this.canvasId);
        this.canvas.width = this.sizeX;
        this.canvas.height = this.sizeY;
        this.ctx = this.canvas.getContext("2d");
        // // Assuming your canvas element is ctx
        // this.ctx.shadowColor = 'yellow'; // string
        // //Color of the shadow;  RGB, RGBA, HSL, HEX, and other inputs are valid.
        // this.ctx.shadowOffsetX = 5; // integer
        // //Horizontal distance of the shadow, in relation to the text.
        // this.ctx.shadowOffsetY = 5; // integer
        // //Vertical distance of the shadow, in relation to the text.
        // this.ctx.shadowBlur = 10; // integer
        // //Blurring effect to the shadow, the larger the value, the greater the blur.

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

    sgn(a) {
        if(a < 0) {
            return -1;
        } else if(a > 0) {
            return 1;
        } else {
            return 0;
        }
    }

    prepareExamples() {
        console.log('Not implemented');
    }
}