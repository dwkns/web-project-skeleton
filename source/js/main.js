// source/js/main.js
/*eslint-disable no-console*/

import { elevationData } from './elevationData.js';
import Chart from 'chart.js';

let ctx = document.getElementById('myChart');

const brandOrange = ['rgba(255, 179, 74, 1)'];

new Chart(ctx, {

    plugins: verticalLineAtMouse,
    type: 'line',
    data: {
        datasets: [{
            data: elevationData,
            backgroundColor: brandOrange,
            borderColor: brandOrange,
            borderWidth: 0,
            pointHoverRadius: 0,
            pointRadius: 0
        }]
    },
    options: {
        customLine: {
            color: 'black'
        },
        tooltips: {
            enabled: false,
            animationDuration: 0,
            mode: 'index',
            custom: customTooltips,
            position: 'custom',
            intersect: false
        },
        legend: {
            display: false
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    max: undefined,
                    min: 0,
                    stepSize: 50,
                    callback: function(value) {
                        if (value != 0) {
                            return value + ' m';
                        } else {
                            return value;
                        }
                    }
                }
            }],
            xAxes: [{
                type: 'linear',
                position: 'bottom',
                ticks: {
                    beginAtZero: true,
                    max: maxDistance(elevationData),
                    min: 0,
                    stepSize: 10,
                    maxTicksLimit: 12,
                    callback: function(value, index, values) {
                        if (value === 0) {
                            return value; // No 'km' on zero
                        } else {
                            if (index === values.length - 1) return ''; // No last value
                            return value + ' km'; // Everything else has a km attached.
                        }

                    }
                }
            }]
        }
    }
});

var verticalLineAtMouse = {

    defaultOptions: {
        strokeStyle: 'black',
        lineWidth: 0.5
    },
    beforeEvent: function(chart, event) {
        chart.options.customLine.visible = false;
        if (event.type === 'mousemove') {
            let mouseXPos = event.x;
            let mouseYPos = event.y;
            let chartArea = event.chart.chartArea;

            if ((mouseXPos >= chartArea.left) &&
                (mouseXPos <= chartArea.right) &&
                (mouseYPos <= chartArea.bottom) &&
                (mouseYPos >= chartArea.top)) {
                chart.options.customLine.xPosition = mouseXPos;
                chart.options.customLine.visible = true;
            }
        }

    },
    afterDraw: function(chart) {
        if (chart.options.customLine.visible) {
            var ctx = chart.chart.ctx;
            var chartArea = chart.chartArea;
            var xPosition = chart.options.customLine.xPosition;

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(xPosition, chartArea.bottom);
            ctx.lineTo(xPosition, chartArea.top);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.restore();
        }

    }
};
Chart.pluginService.register(verticalLineAtMouse);

function customTooltips(tooltip) {

    // Tooltip Element
    var tooltipElment = document.getElementById('chartjs-tooltip');

    if (!tooltipElment) {
        tooltipElment = document.createElement('div');
        tooltipElment.id = 'chartjs-tooltip';
        tooltipElment.innerHTML = '<div></div>';
        this._chart.canvas.parentNode.appendChild(tooltipElment);
    }

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
        tooltipElment.style.opacity = 0;
        return;
    }

    // Set caret Position
    tooltipElment.classList.remove('above', 'below', 'no-transform');

    // console.log(tooltip);
    if (tooltip.yAlign) {
        tooltipElment.classList.add(tooltip.yAlign);
    } else {
        tooltipElment.classList.add('no-transform');
    }

    tooltip.xAlign = 'left';

    function getBody(bodyItem) {
        return bodyItem.lines;
    }

    var positionY = this._chart.canvas.offsetTop;
    var positionX = this._chart.canvas.offsetLeft;

    let size = 120;
    let offset = 0;
    let something = determineAlignment(this._chart.tooltip, size);
    if (something.xAlign === 'left') {
        offset = size + positionX + 4;
    }

    // Set Text
    if (tooltip.body) {

        var mouseXrelativeToChartData = this._chart.tooltip._eventPosition.x - this._chart.chartArea.left;

        let distance = tooltip.title[0] || [];
        let elevation = tooltip.body.map(getBody)[0][0];

        let distanceRounded = parseFloat(Math.round(distance * 100) / 100).toFixed(1);
        let elevationRounded = parseFloat(Math.round(elevation * 100) / 100).toFixed();

        var innerHtml = `dist: ${distanceRounded}km</br>
        elevation: ${elevationRounded}m</br>
        Align  ${something.xAlign} </br>`;

        var contentDiv = tooltipElment.querySelector('div');
        contentDiv.innerHTML = innerHtml;
    }

    // window.lager = this._chart;
    // console.log(this._chart);

    // Display, position, and set styles for font
    tooltipElment.style.opacity = 1;

    tooltipElment.style.left = mouseXrelativeToChartData - positionX + offset + 'px';

    tooltipElment.style.top = positionY + 'px';
    tooltipElment.style.fontFamily = tooltip._bodyFontFamily;
    tooltipElment.style.fontSize = tooltip.bodyFontSize + 'px';
    tooltipElment.style.fontStyle = tooltip._bodyFontStyle;
    tooltipElment.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';

}

function determineAlignment(tooltip, size) {
    var model = tooltip._model;
    var chart = tooltip._chart;
    var chartArea = tooltip._chart.chartArea;
    var xAlign = 'center';
    var yAlign = 'center';

    if (model.y < size.height) {
        yAlign = 'top';
    } else if (model.y > (chart.height - size.height)) {
        yAlign = 'bottom';
    }

    var lf, rf; // functions to determine left, right alignment
    var olf, orf; // functions to determine if left/right alignment causes tooltip to go outside chart
    var yf; // function to get the y alignment if the tooltip goes outside of the left or right edges
    var midX = (chartArea.left + chartArea.right) / 2;
    var midY = (chartArea.top + chartArea.bottom) / 2;

    if (yAlign === 'center') {
        lf = function(x) {
            return x <= midX;
        };
        rf = function(x) {
            return x > midX;
        };
    } else {
        lf = function(x) {
            return x <= (size.width / 2);
        };
        rf = function(x) {
            return x >= (chart.width - (size.width / 2));
        };
    }

    olf = function(x) {
        return x + size.width + model.caretSize + model.caretPadding > chart.width;
    };
    orf = function(x) {
        return x - size.width - model.caretSize - model.caretPadding < 0;
    };
    yf = function(y) {
        return y <= midY ? 'top' : 'bottom';
    };

    if (lf(model.x)) {
        xAlign = 'left';

        // Is tooltip too wide and goes over the right side of the chart.?
        if (olf(model.x)) {
            xAlign = 'center';
            yAlign = yf(model.y);
        }
    } else if (rf(model.x)) {
        xAlign = 'right';

        // Is tooltip too wide and goes outside left edge of canvas?
        if (orf(model.x)) {
            xAlign = 'center';
            yAlign = yf(model.y);
        }
    }

    var opts = tooltip._options;
    return {
        xAlign: opts.xAlign ? opts.xAlign : xAlign,
        yAlign: opts.yAlign ? opts.yAlign : yAlign
    };
}

Chart.Tooltip.positioners.custom = function(elements, mousePosition) {
    //check to see if mouse is within the chart not the canvas. 

    if (!elements.length) {
        return false;
    }
    return {
        x: mousePosition.x,
        y: 10
    };
};

/* *********************** utils *********************** */

function maxDistance(chartData) {
    // max distance is the last point in the distance/elevation array
    let maxDistance = chartData[chartData.length - 1]['x'];
    maxDistance = Math.round(maxDistance * 100) / 100; // Round to 2 decimal places
    return maxDistance;
}