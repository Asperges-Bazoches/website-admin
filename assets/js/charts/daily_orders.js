am4core.useTheme(am4themes_animated);

// Create chart instance
var chart = am4core.create("daily_orders", am4charts.XYChart);
chart.data = [{"DAY": "2021-03-19", "ASPB": 2, "ASPV": 1, "FRAISE": 0},
              {"DAY": "2021-03-20", "ASPB": 3, "ASPV": 0, "FRAISE": 1},
              {"DAY": "2021-04-05", "ASPB": 3, "ASPV": 0, "FRAISE": 6}];

// Create axes
var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.grid.template.location = 0;
dateAxis.renderer.minGridDistance = 30;
dateAxis.title.text = "Jour";

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.title.text = "Nombre de portions";

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
  series.fill = am4core.color(color);
  series.dateFormatter.monthsShort = ["Jan","Fev", "Mar","Avr", "Mai","Jun","Jul","Aou","Sep","Oct","Nov","Dec"];

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

s=createSeries("ASPB", "Asp. Blanches", "#000", " kg");
createSeries("ASPV", "Asp. Vertes", "#50ff50", " kg");
createSeries("FRAISE", "Fraises", "#ff0000", " x 250g");

chart.legend = new am4charts.Legend();
chart.cursor = new am4charts.XYCursor();
chart.cursor.maxTooltipDistance = 0;

const xmin = new Date()
xmin.setDate(xmin.getDate() - 1)
const xmax = new Date(xmin)
xmax.setDate(xmax.getDate() + 15)

chart.events.on("ready", function () {dateAxis.zoomToDates(xmin,xmax);});
