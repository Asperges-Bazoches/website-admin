// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

var time_chart = am4core.create('time_rep', am4charts.XYChart)
time_chart.colors.step = 2;

time_chart.legend = new am4charts.Legend()
time_chart.legend.position = 'top'
time_chart.legend.paddingBottom = 20
time_chart.legend.labels.template.maxWidth = 95

var xAxis = time_chart.xAxes.push(new am4charts.CategoryAxis())
xAxis.dataFields.category = 'DAY'
xAxis.renderer.cellStartLocation = 0.1
xAxis.renderer.cellEndLocation = 0.9
xAxis.renderer.grid.template.location = 0;

var yAxis = time_chart.yAxes.push(new am4charts.ValueAxis());
yAxis.min = 0;

function createSeries(value, name) {
    var series = time_chart.series.push(new am4charts.ColumnSeries())
    series.dataFields.valueY = value
    series.dataFields.categoryX = 'DAY'
    series.name = name

    series.events.on("hidden", arrangeColumns);
    series.events.on("shown", arrangeColumns);

    var bullet = series.bullets.push(new am4charts.LabelBullet())
    bullet.interactionsEnabled = false
    bullet.dy = 30;
    bullet.label.text = '{valueY}'
    bullet.label.fill = am4core.color('#ffffff')

    return series;
}

function arrangeColumns() {

    var series = chart.series.getIndex(0);

    var w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
    if (series.dataItems.length > 1) {
        var x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
        var x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
        var delta = ((x1 - x0) / chart.series.length) * w;
        if (am4core.isNumber(delta)) {
            var middle = chart.series.length / 2;

            var newIndex = 0;
            chart.series.each(function(series) {
                if (!series.isHidden && !series.isHiding) {
                    series.dummyData = newIndex;
                    newIndex++;
                }
                else {
                    series.dummyData = chart.series.indexOf(series);
                }
            })
            var visibleCount = newIndex;
            var newMiddle = visibleCount / 2;

            chart.series.each(function(series) {
                var trueIndex = chart.series.indexOf(series);
                var newIndex = series.dummyData;

                var dx = (newIndex - trueIndex + middle - newMiddle) * delta

                series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
            })
        }
    }
}


time_chart.data = [
    {
        DAY: 'Tomorrow',
        '11h30-13h': 55,
        '14h-16h': 60
    },
    {
        DAY: 'Day #2',
        '10h-11h30': 30,
        '11h30-13h': 78,
        '14h-16h': 69
    },
    {
        DAY: 'Day #3',
        '10h-11h30': 27,
        '11h30-13h': 40,
        '14h-16h': 45
    },
    {
        DAY: 'Day #4',
        '10h-11h30': 50,
        '11h30-13h': 33,
        '14h-16h': 22
    },
    {
        DAY: 'Day #5',
        '10h-11h30': 50,
        '11h30-13h': 33,
        '14h-16h': 22
    },
    {
        DAY: 'Day #6',
        '10h-11h30': 50,
        '11h30-13h': 33,
        '14h-16h': 22
    },
    {
        DAY: 'Day #7',
        '10h-11h30': 50,
        '11h30-13h': 33,
        '14h-16h': 22
    }
]


createSeries('10h-11h30', '10h-11h30');
createSeries('11h30-13h', '11h30-13h');
createSeries('14h-16h', '14h-16h');
