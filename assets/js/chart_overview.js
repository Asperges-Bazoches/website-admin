am4core.useTheme(am4themes_animated);

// Create chart instance
var chart = am4core.create("chartdiv", am4charts.XYChart);
chart.data = [{"DAY": "2021-03-19", "sum(ASPB)": 2, "sum(ASPV)": 1, "sum(FRAISE)": 0},
              {"DAY": "2021-03-20", "sum(ASPB)": 3, "sum(ASPV)": 0, "sum(FRAISE)": 1}];

// Create axes
var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.grid.template.location = 0;
dateAxis.renderer.minGridDistance = 30;

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

// Create series
function createSeries(field, name, color, unit) {
  var series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.valueY = field;
  series.dataFields.dateX = "DAY";
  series.name = name;
  series.unit = unit;
  series.tooltipText = "{dateX}: [b]{valueY}[/]";
  series.strokeWidth = 2;
  series.stroke = am4core.color(color);

  // Set up tooltip
  series.adapter.add("tooltipText", function(ev) {
    var text = "[bold]{dateX}[/]\n"
    chart.series.each(function(item) {
      text += "[" + item.stroke.hex + "]●[/] " + item.name + ": {" + item.dataFields.valueY + "}" + item.unit + "\n";
    });
    return text;
  });

  series.tooltip.getFillFromObject = false;
  series.tooltip.background.fill = am4core.color("#fff");
  series.tooltip.label.fill = am4core.color("#00");

  // Prevent cross-fading of tooltips
  series.tooltip.defaultState.transitionDuration = 0;
  series.tooltip.hiddenState.transitionDuration = 0;

  var bullet = series.bullets.push(new am4charts.CircleBullet());
  bullet.circle.stroke = am4core.color(color);
  bullet.circle.strokeWidth = 2;

  return series;
}

createSeries("sum(ASPB)", "Asp. Blanches", "#000", " kg");
createSeries("sum(ASPV)", "Asp. Vertes", "#50ff50", " kg");
createSeries("sum(FRAISE)", "Fraises", "#ff0000", " x 250g");

chart.legend = new am4charts.Legend();
chart.cursor = new am4charts.XYCursor();
chart.cursor.maxTooltipDistance = 0;

const xmin = new Date()
xmin.setDate(xmin.getDate() - 1)
const xmax = new Date(xmin)
xmax.setDate(xmax.getDate() + 15)

chart.events.on("ready", function () {dateAxis.zoomToDates(xmin,xmax);});
