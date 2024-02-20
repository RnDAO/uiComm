const WEEK_DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const HOURE_DAYS = Array.from({ length: 24 }, (_, i) => i).map(String);

const defaultHeatmapChartOptions = {
  chart: {
    type: 'heatmap',
    plotBorderWidth: 0,
  },
  title: {
    text: null,
  },
  legend: {
    enabled: false,
  },
  xAxis: {
    categories: HOURE_DAYS,
    tickInterval: 1,
    labels: {
      step: 1,
      style: {
        fontSize: '14px',
        fontFamily: 'Inter',
      },
    },
    opposite: true,
    gridLineWidth: 0,
    lineWidth: 0,
    lineColor: 'rgba(0,0,0,0.75)',
    tickWidth: 0,
    tickLength: 0,
    tickColor: 'rgba(0,0,0,0.75)',
    title: {
      text: 'Hour',
      style: {
        fontSize: '14px',
        fontFamily: 'Inter',
      },
      align: 'low',
    },
  },
  yAxis: {
    categories: WEEK_DAYS,
    lineWidth: 0,
    gridLineWidth: 0,
    title: 'Weekdays',
    reversed: true,
    labels: {
      style: {
        fontSize: '14px',
        fontFamily: 'Inter',
      },
    },
  },
  tooltip: {
    enabled: false,
  },
  colorAxis: {
    min: 0,
    minColor: '#F3F3F3',
    maxColor: '#45367B',
    max: 100,
    stops: [
      [0, '#F3F3F3'],
      [10 / 100, '#F3F3F3'],
      [10 / 100, '#E3E9FF'],
      [20 / 100, '#E3E9FF'],
      [20 / 100, '#C5D2FF'],
      [30 / 100, '#C5D2FF'],
      [30 / 100, '#9971E7'],
      [50 / 100, '#9971E7'],
      [50 / 100, '#673FB5'],
      [70 / 100, '#673FB5'],
      [70 / 100, '#35205E'],
      [1, '#35205E'],
    ].map(([position, color]) => [position, color] as [number, string]),
  },
  series: [
    {
      name: 'Revenue',
      borderWidth: 0.5,
      borderColor: 'white',
      states: {
        hover: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '14px',
          fontFamily: 'Inter',
          textOutline: 'none',
          fontWeight: 'normal',
        },
      },
      pointPadding: 1.5,
      data: Array.from({ length: 24 * 7 }, (_, i) => [
        i % 24,
        Math.floor(i / 24),
        0,
      ]),
      colsize: 0.9,
      rowsize: 0.8,
    },
  ],
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 600,
        },
        chartOptions: {
          chart: {
            scrollablePlotArea: {
              minWidth: 1080,
            },
          },
          legend: {
            title: {
              text: 'Number of interactions',
              style: {
                fontStyle: 'bold',
                fontSize: '10px',
                fontFamily: 'Inter',
              },
            },
            align: 'left',
            layout: 'horizental',
            margin: 0,
            verticalAlign: 'bottom',
            y: 0,
            x: 25,
            symbolHeight: 20,
          },
          xAxis: {
            width: 1000,
            labels: {
              step: 1,
              style: {
                fontSize: '10px',
                fontFamily: 'Inter',
              },
            },
          },
          yAxis: {
            labels: {
              style: {
                fontSize: '10px',
                fontFamily: 'Inter',
              },
            },
          },
          series: [
            {
              name: 'Revenue',
              borderWidth: 0.5,
              borderColor: 'white',
              dataLabels: {
                enabled: true,
                style: {
                  fontSize: '10px',
                  fontFamily: 'Inter',
                },
              },
              pointPadding: 0.8,
              data: Array.from({ length: 24 * 7 }, (_, i) => [
                i % 24,
                Math.floor(i / 24),
                0,
              ]),
              colsize: 0.9,
              rowsize: 0.9,
            },
          ],
        },
      },
    ],
  },
};

export { defaultHeatmapChartOptions, HOURE_DAYS, WEEK_DAYS };
