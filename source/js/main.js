// // source/js/main.js
// /*eslint-disable no-console*/

import { elevationData } from './elevationData.js';
import Chart from 'chart.js';

// var ctx = $("#graph_1");
let ctx = document.getElementById('myChart');

// var dataArray = [{ x: 1, y: 1 }, { x: 2, y: 3 }, { x: 3, y: 5 }, { x: 4, y: 8 }, { x: 5, y: 7 }, { x: 6, y: 4 }, { x: 7, y: 2 }, { x: 8, y: 1 }];
// var something;


var myChart = new Chart(ctx, {
    // type: 'LineWithLine',
    type: 'scatter',
    data: {
        datasets: [{
            data: elevationData,
            backgroundColor: ['rgba(255, 179, 74, 1)'],
            borderColor: ['rgba(255, 179, 74, 0.4)'],
            borderWidth: 1,
            showLine: true,
            pointRadius: 0
        }]
    },
    options: {
        tooltips: {
            enabled: false,
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
                    callback: function(value, index, values) {
                        if (value != 0) {
                            return value + ' m';
                        } else {
                            return value;
                        }
                    }
                }
            }],
            xAxes: [{
                ticks: {
                    beginAtZero: true,
                    max: maxDistance(elevationData),
                    min: 0,
                    // stepSize: 10,
                    maxTicksLimit: 12,
                    callback: function(value, index, values) {
                        if (value != 0) {
                            return value + ' km';
                        } else {
                            return value;
                        }
                    }
                }
            }]
        }
    }
});




function myScript(evt) {

    //console.log(evt.offsetX + "," + evt.offsetY);
    var ytop = myChart.chartArea.top;
    var ybottom = myChart.chartArea.bottom;
    var ymin = myChart.scales['y-axis-1'].min;
    var ymax = myChart.scales['y-axis-1'].max;
    var newy = '';
    var showstuff = 0;
    if (evt.offsetY <= ybottom && evt.offsetY >= ytop) {
        newy = Math.abs((evt.offsetY - ytop) / (ybottom - ytop));
        newy = (newy - 1) * -1;
        newy = newy * (Math.abs(ymax - ymin)) + ymin;
        showstuff = 1;
    }
    var xtop = myChart.chartArea.left;
    var xbottom = myChart.chartArea.right;
    var xmin = myChart.scales['x-axis-1'].min;
    var xmax = myChart.scales['x-axis-1'].max;
    var newx = '';
    if (evt.offsetX <= xbottom && evt.offsetX >= xtop && showstuff == 1) {
        newx = Math.abs((evt.offsetX - xtop) / (xbottom - xtop));
        newx = newx * (Math.abs(xmax - xmin)) + xmin;
    }
    if (newy != '' && newx != '') {
        document.getElementById('graph_coords').textContent = newx + ',' + newy;   
    }

}

ctx.addEventListener('mousemove', myScript);
// window.onload = function() {
//     something = ;
    
// };
// ctx.onmousemove(function(evt) {
//    
// });

// const ctx = document.getElementById('myChart').getContext('2d');
// var myChart = new Chart(ctx, {
//     // type: 'LineWithLine',
//     type: 'scatter',
//     data: {
//         datasets: [{
//             data: elevationData,
//             backgroundColor: ['rgba(255, 179, 74, 1)'],
//             borderColor: ['rgba(255, 179, 74, 0.4)'],
//             borderWidth: 1,
//             showLine: true,
//             pointRadius: 0
//         }]
//     },
//     options: {
//         legend: {
//             display: false
//         },
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true,
//                     max: undefined,
//                     min: 0,
//                     stepSize: 50,
//                     callback: function(value, index, values) {
//                         if (value != 0) {
//                             return value + ' m';
//                         } else {
//                             return value;
//                         }
//                     }
//                 }
//             }],
//             xAxes: [{
//                 ticks: {
//                     beginAtZero: true,
//                     max: maxDistance(elevationData),
//                     min: 0,
//                     // stepSize: 10,
//                     maxTicksLimit: 12,
//                     callback: function(value, index, values) {
//                         if (value != 0) {
//                             return value + ' km';
//                         } else {
//                             return value;
//                         }
//                     }
//                 }
//             }],
//             tooltip: {
//                 intersect: false
//             }
//         }
//     }
// });

// ctx.mousemove(function(evt) {
//     //console.log(evt.offsetX + "," + evt.offsetY);
//     var ytop = myChart.chartArea.top;
//     var ybottom = myChart.chartArea.bottom;
//     var ymin = myChart.scales['y-axis-1'].min;
//     var ymax = myChart.scales['y-axis-1'].max;
//     var newy = '';
//     var showstuff = 0;
//     if (evt.offsetY <= ybottom && evt.offsetY >= ytop) {
//         newy = Math.abs((evt.offsetY - ytop) / (ybottom - ytop));
//         newy = (newy - 1) * -1;
//         newy = newy * (Math.abs(ymax - ymin)) + ymin;
//         showstuff = 1;
//     }
//     var xtop = myChart.chartArea.left;
//     var xbottom = myChart.chartArea.right;
//     var xmin = myChart.scales['x-axis-1'].min;
//     var xmax = myChart.scales['x-axis-1'].max;
//     var newx = '';
//     if (evt.offsetX <= xbottom && evt.offsetX >= xtop && showstuff == 1) {
//         newx = Math.abs((evt.offsetX - xtop) / (xbottom - xtop));
//         newx = newx * (Math.abs(xmax - xmin)) + xmin;
//     }
//     if (newy != '' && newx != '') {
//         //console.log(newx + ',' + newy);
//         document.getElementById('graph_coords').html('Mouse Coordinates: ' + newx.toFixed(2) + ',' + newy.toFixed(2));
//     }
// });

function maxDistance(chartData) {
    // max distance is the last point in the distance/elevation array
    let maxDistance = chartData[chartData.length - 1]['x'];
    maxDistance = Math.round(maxDistance * 100) / 100; // Round to 2 decimal places
    return maxDistance;
}

// // var chart = new Chart(ctx, {
// //     type: 'LineWithLine',
// //     data: {
// //         labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
// //         datasets: [{
// //             label: 'Statistics',
// //             data: [3, 1, 2, 5, 4, 7, 6],
// //             backgroundColor: 'rgba(0, 119, 204, 0.8)',
// //             borderColor: 'rgba(0, 119, 204, 0.3)',
// //             fill: false
// //         }]
// //     },
// //     options: {
// //         responsive: false,
// //         tooltips: {
// //             intersect: false
// //         },
// //         scales: {
// //             yAxes: [{
// //                 ticks: {
// //                     beginAtZero: true
// //                 }
// //             }]
// //         }
// //     }
// // });

// // function addLineToolTip(){
// //     Chart.defaults.LineWithLine = Chart.defaults.scatter;
// //     Chart.controllers.LineWithLine = Chart.controllers.scatter.extend({
// //         draw: function(ease) {
// //             Chart.controllers.line.prototype.draw.call(this, ease);
// //             // console.log(this.chart.tooltip._eventPosition);
// //             if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
// //                 var activePoint = this.chart.tooltip._active[0],
// //                     ctx = this.chart.ctx,
// //                     x = activePoint.tooltipPosition().x,
// //                     topY = this.chart.scales['y-axis-1'].top,
// //                     bottomY = this.chart.scales['y-axis-1'].bottom;

// //                 // draw line
// //                 ctx.save();
// //                 ctx.beginPath();
// //                 ctx.moveTo(x, topY);
// //                 ctx.lineTo(x, bottomY);
// //                 ctx.lineWidth = 2;
// //                 ctx.strokeStyle = '#07C';
// //                 ctx.stroke();
// //                 ctx.restore();
// //             }
// //         }
// //     });

// // }

// // $(document).ready(function() {
// //   var ctx = $("#graph_1");
// //   var dataArray =  [ {x:1,y:1},{x:2,y:3},{x:3,y:5},{x:4,y:8},{x:5,y:7},{x:6,y:4},{x:7,y:2},{x:8,y:1} ];

// //   var myChart = new Chart(ctx, {
// //     type: 'scatter',
// //     data: {
// //       datasets: [{
// //         label: "test",
// //         fill: false,
// //         data: dataArray
// //       }]
// //     },
// //     options: {
// //       title: {
// //         display: true,
// //         text: 'Test Graph'
// //       },
// //       animation: {
// //         duration: 0,
// //       }, // general animation time
// //       hover: {
// //         animationDuration: 0,
// //       }, // duration of animations when hovering an item
// //       responsiveAnimationDuration: 0, // animation duration after a resize
// //       scales: {
// //         xAxes: [{
// //           display: true,
// //           scaleLabel: {
// //             display: true,
// //             labelString: 'x axis label'
// //           }
// //         }],
// //         yAxes: [{
// //           display: true,
// //           scaleLabel: {
// //             display: true,
// //             labelString: 'y axis label'
// //           }
// //         }]
// //       },
// //       tooltips: {
// //         mode: 'index',
// //         intersect: false,
// //         callbacks: {
// //           // Use the footer callback to display the sum of the items showing in the tooltip
// //           footer: function(tooltipItems, data) {
// //             //return 'x:' + this._eventPosition.x + ' y:' + this._eventPosition.y;
// //           },
// //         },
// //         footerFontStyle: 'normal'
// //       },
// //     }

// //   });

// //   ctx.mousemove(function(evt) {
// //     //console.log(evt.offsetX + "," + evt.offsetY);
// //     var ytop = myChart.chartArea.top;
// //     var ybottom = myChart.chartArea.bottom;
// //     var ymin = myChart.scales['y-axis-1'].min;
// //     var ymax = myChart.scales['y-axis-1'].max;
// //     var newy = '';
// //     var showstuff = 0;
// //     if (evt.offsetY <= ybottom && evt.offsetY >= ytop) {
// //       newy = Math.abs((evt.offsetY - ytop) / (ybottom - ytop));
// //       newy = (newy - 1) * -1;
// //       newy = newy * (Math.abs(ymax - ymin)) + ymin;
// //       showstuff = 1;
// //     }
// //     var xtop = myChart.chartArea.left;
// //     var xbottom = myChart.chartArea.right;
// //     var xmin = myChart.scales['x-axis-1'].min;
// //     var xmax = myChart.scales['x-axis-1'].max;
// //     var newx = '';
// //     if (evt.offsetX <= xbottom && evt.offsetX >= xtop && showstuff == 1) {
// //       newx = Math.abs((evt.offsetX - xtop) / (xbottom - xtop));
// //       newx = newx * (Math.abs(xmax - xmin)) + xmin;
// //     }
// //     if (newy != '' && newx != '') {
// //       //console.log(newx + ',' + newy);
// //       $("#graph_coords").html('Mouse Coordinates: ' + newx.toFixed(2) + ',' + newy.toFixed(2));
// //     }
// //   });
// // });