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
                    ['x',1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020],
                    ['US',0.042,0.04,0.047,0.058,0.06,0.055,0.051,0.046,0.046,0.058,0.093,0.096,0.089,0.081,0.074,0.062,0.053,0.049,0.044,0.039,null,null],
                    ['MN',null,0.144,null,null,null,null,null,null,null,0.142,0.179,0.189,0.181,0.173,0.162,0.165,0.151,0.145,0.147,null,null,null,null]
                ],
                type: 'line',
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
                    if (d.x == 2018) {
                        return 6;
                    } else {
                        return 2;
                    }
                }
            },
            color: {
                pattern: ['#3580A3','#333333']
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
                        values: [1999,2004,2008,2012,2016,2020],
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
                    '<div class="chart-tooltip gray5"><span class="tooltip-label">US:</span>' +
                    '<span class="tooltip-value">' + defaultValueFormat(d[1].value) + '</span></div>'                     + 
                    '<div class="chart-tooltip blue4"><span class="tooltip-label">MN:</span>' +
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