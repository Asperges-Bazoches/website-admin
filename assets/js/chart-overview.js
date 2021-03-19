am4core.useTheme(am4themes_animated);

// Create chart instance
var chart = am4core.create("chartdiv", am4charts.XYChart);

// Get daily aggregated data from API
let data = '';
try {data = JSON.parse(document.getElementById("daily_agg").contentWindow.document.body.innerText.replace(',];', ']')) } catch (e) {/* pass */}
if (data == '') {data = [{"date": "2021-03-19", "aspb": 2, "aspv": 1, "fraise": 0},{"date": "2021-03-20", "aspb": 3, "aspv": 0, "fraise": 1}];}
chart.data = data;

// Create axes
var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.grid.template.location = 0;
dateAxis.renderer.minGridDistance = 30;

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

// Create series
function createSeries(field, name, color, unit) {
  var series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.valueY = field;
  series.dataFields.dateX = "date";
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

createSeries("aspb", "Asp. Blanches", "#000", " kg");
createSeries("aspv", "Asp. Vertes", "#50ff50", " kg");
createSeries("fraise", "Fraises", "#ff0000", " x 250g");

chart.legend = new am4charts.Legend();
chart.cursor = new am4charts.XYCursor();
chart.cursor.maxTooltipDistance = 0;

const xmin = new Date()
xmin.setDate(xmin.getDate() - 1)
const xmax = new Date(xmin)
xmax.setDate(xmax.getDate() + 15)

chart.events.on("ready", function () {dateAxis.zoomToDates(xmin,xmax);});
