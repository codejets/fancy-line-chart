var line = new LineChart;

var margin = { top: 20, right: 20, bottom: 30, left: 50 },
    width = 940 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom,
    x = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    offsetColors = [
            { offset: "0%", color: "#326E65" },
            { offset: "60%", color: "#326E65" },
            { offset: "75%", color: "#E0BA4E" },
            { offset: "90%", color: "#E0BA4E" },
            { offset: "100%", color: "#EC3160" }],
    options = {
        margin: margin,
        width: width,
        height: height,
        x: x,
        y: y,
        offsetColors: offsetColors,
        valueline: d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y(d.close) })
            .curve(d3.curveBasis)};

function getData(n) {
    var data = [];
    for (var i = 0; i < n; i++) {
        data.push({
            date: new Date(Date.now() - (i * 360000)),
            close: Math.max(10, Math.random() * 200 | 0)
        });
    }
    data.forEach(function(d) {
        d.date = d.date;
        d.close = +d.close;
    });
    return data;
}

line.create(document.getElementById("chart"), getData(20), options);

var update = document.getElementById('update');

update.addEventListener('click', function() {
    line.update(getData(), options);
});


