class VehiclePopulation {

    constructor(el) {
        this.el = d3.select(el);
    }

    draw() {
        const margin = {top: 20, right: 20, bottom: 30, left: 50},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;
        this.x = d3.scaleTime().range([0, width]);
        this.y = d3.scaleLinear().range([height, 0]);
        var parseYear = d3.timeParse("%Y");


        const svg = this.el
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        this.twoWheelersLine = d3.line()
            .x((data) => {
                return this.x(data['Year']);
            })
            .y((data) => this.y(parseInt(data['Two Wheelers'])));

        this.carsLine = d3.line()
            .x((data) => this.x(data['Year']))
            .y((data) => this.y(parseInt(data['Cars, Jeeps & Taxis'])));

        this.busesLine = d3.line()
            .x((data) => this.x(data['Year']))
            .y((data) => this.y(parseInt(data['Buses'])));

        this.goodsVehicleLine = d3.line()
            .x((data) => this.x(data['Year']))
            .y((data) => this.y(parseInt(data['Goods Vehicle'])));

        this.otherVehiclesLine = d3.line()
            .x((data) => this.x(data['Year']))
            .y((data) => this.y(parseInt(data['Other Vehicles'])));

        d3.csv("data/vehiclePopulation1951-2015.csv",
            function (d) {
                d['Year'] = parseYear(d['Year']);
                return d;
            }, (error, data) => {
                if (error) throw error;

                // Scale the range of the data
                this.x.domain(d3.extent(data, function (d) {
                    return d['Year'];
                }));
                this.y.domain([0, d3.max(data, function (d) {
                    return parseInt(d['Two Wheelers']);
                })]);

                // Add the twoWheelersLine path.
                svg.append("path")
                    .data([data])
                    .attr("class", "twoWheelers")
                    .attr("d", this.twoWheelersLine);

                svg.append("path")
                    .data([data])
                    .attr("class", "cars")
                    .attr("d", this.carsLine);

                svg.append("path")
                    .data([data])
                    .attr("class", "buses")
                    .attr("d", this.busesLine);

                svg.append("path")
                    .data([data])
                    .attr("class", "goods")
                    .attr("d", this.goodsVehicleLine);

                svg.append("path")
                    .data([data])
                    .attr("class", "others")
                    .attr("d", this.otherVehiclesLine);

                // Add the X Axis
                svg.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(this.x))

                // Add the Y Axis
                svg.append("g")
                    .call(d3.axisLeft(this.y))
                    .append("text")
                    .text("% of total vehicle population")
                    .attr('y', 20)
                    .attr('x', 0)
                    .attr("font-size", "12px")
                    .attr("transform", "rotate(-90)")
                    .attr("fill", "red");
            });
    }

}