var LineChart = function() {};

LineChart.prototype.create = function(el, data, options) {
    this.options = options;
    this.data = data;

    this.svg = d3.select(el).append('svg')
        .attr('class', 'line-chart')
        .attr("width", this.options.width)
        .attr("height", this.options.height)
        .append("g")
        .attr("transform",
            "translate(" + this.options.margin.left + "," + this.options.margin.top + ")");

    this._setup();
    this._draw();

    return this;
}

LineChart.prototype._scales = function() {
    this.options.x.domain(d3.extent(this.data, function(d) {
        return d.date; }));
    this.options.y.domain([0, d3.max(this.data, function(d) {
        return d.close; })]);
}

LineChart.prototype._setup = function() {
    this._scales();
    this._setDomains();
}

LineChart.prototype._setDomains = function() {

    var xAxisTop = d3.axisTop(this.options.x)
        .ticks(6).tickPadding(-10);
    var yAxisLeft = d3.axisLeft(this.options.y)
        .ticks(4)
        .tickSize(-this.options.width, 0);

    this.svg.append("g").call(xAxisTop).attr("class", "x-axis-ticks");
    this.svg.append("g").call(yAxisLeft).attr("class", "y-axis-ticks");

}

LineChart.prototype._draw = function() {

    this.svg.append("linearGradient")
        .attr("id", "line-gradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0).attr("y1", this.options.y(0))
        .attr("x2", 0).attr("y2", this.options.y(100))
        .selectAll("stop")
        .data(this.options.offsetColors)
        .enter().append("stop").transition()
        .duration(3500)
        .ease(d3.easeLinear)
        .attr("offset", function(d) {
            return d.offset;
        })
        .attr("stop-color", function(d) {
            return d.color;
        });

    this.svg.append("path")
        .data([this.data]).transition()
        .attr("class", "line")
        .attr("d", this.options.valueline)
        .transition();



    this.svg.selectAll(".tick")
        .attr('class', function(d, i) {
            if (i == 0 || i == 1) {
                this.remove();
            }
            if (d > 120)  {return 'red-tick';}
            else if (d < 70) { return 'green-tick';}
            else { return 'yellow-tick'; }
        });

    this.svg.select(".x-axis-ticks").attr('class','x-axis');
    this.svg.append("text")
        .attr("y", 0)
        .attr("x", 100)
        .attr('class', 'heart')
        .text("Heart");

    this.svg.append("text")
        .attr("y", 20)
        .attr("x", 100)
        .attr('class', 'bpm')
        .text("BPM");

}

LineChart.prototype.update = function(options, data) {
    this.options = options;
    this.data = data || this.data;
    
}
