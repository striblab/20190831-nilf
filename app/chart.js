import * as d3 from 'd3';
import * as c3 from 'c3';

class Chart {

    constructor(target) {
        this.target = target;
        this.chartCounts = null;
    }

    render() {
        var self = this;

        var padding = {
            top: 20,
            right: 40,
            bottom: 20,
            left: 40,
        };

        self.chartCounts = c3.generate({
            bindto: self.target,
            padding: padding,
            data: {
                x: 'x',
                columns: [
                    ['x',2010,2011,2012,2013,2014,2015,2016,2017,2018],
                    ['US',0.658,0.659,0.666,0.672,0.68,0.687,0.694,0.701,null],
                    ['MN',0.743,0.746,0.76,0.766,0.773,0.783,0.783,0.786,null]
                ],
                type: 'spline',
                labels: {
                    format: {
                        // 'Source': d3.format('.0%')
                    }
                },
                line: {
                    connectNull: true
                }
            },
            legend: {
                show: false
            },
            line: {
                connectNull: true
            },
            point: {
                show: true,
                r: function(d) {
                    if (d.x == 2017) {
                        return 6;
                    } else {
                        return 2;
                    }
                }
            },
            color: {
                pattern: ['#865f67','#333333']
            },
            axis: {
                // rotated: true,
                y: {
                    max: 1,
                    min: 0, 
                    padding: {
                        bottom: 0,
                        top: 0
                    },
                    tick: {
                        count: 4,
                        values: [0, 0.25, 0.50, 0.75, 1],
                        format: d3.format('.0%')
                    }
                },
                x: {
                    padding: {
                        right: 0,
                        left: 0
                    },
                    // type: 'category',
                    // categories: ['Shooting','Shooting Report Only','ShotSpotter Activation','Sound of Shots Fired'],
                    tick: {
                        values: [2010,2011,2012,2013,2014,2015,2016,2017,2018],
                        multiline: false
                    }
                }
            },
            grid: {
                focus: {
                    show: false
                },
                y: {
                    lines: [{
                        value: 0.5,
                        text: '',
                        position: 'start',
                        class: 'powerline'
                    }]

                }
            },
            tooltip: {
                contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
                    return '<div class="chart-tooltip gray3"><span class="tooltip-label">' + d[0].x + ':</span></div>' + 
                    '<div class="chart-tooltip gray5"><span class="tooltip-label">MN:</span>' +
                    '<span class="tooltip-value">' + defaultValueFormat(d[1].value) + '</span></div>'                     + 
                    '<div class="chart-tooltip blue4"><span class="tooltip-label">US:</span>' +
                        '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span></div>'
                }
            }
        });

    }
}

export {
    Chart as
    default
}