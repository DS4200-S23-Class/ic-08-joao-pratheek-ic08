const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right; 

const FRAME1 = d3.select("#vis1")
                    .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 

function build_interative_bar_graph() {

d3.csv("data/data.csv").then((data) => {

  // find max Y
  const MAX_Y = d3.max(data, (d) => { return parseInt(d.Value); });
  
  const X_SCALE = d3.scaleBand() 
                    .domain(["A", "B", "C", "D", "E"])
                    .range([0, VIS_WIDTH])
                    .padding(0.2);

  const Y_SCALE = d3.scaleLinear() 
                    .domain([MAX_Y, 0]) 
                    .range([0, VIS_HEIGHT]); 

  FRAME1.selectAll("rect")  
      .data(data)
      .enter()       
      .append("rect")  
        .attr("x", (d) => { return (X_SCALE(d.Category) + MARGINS.left); }) 
        .attr("y", (d) => { return (Y_SCALE(d.Value) + MARGINS.top); }) 
        .attr("width", X_SCALE.bandwidth())
        .attr("height", (d) => VIS_HEIGHT - Y_SCALE(parseInt(d.Value)))
        .attr("fill", "dodgerblue");

  FRAME1.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
              "," + (VIS_HEIGHT + MARGINS.top) + ")") 
        .call(d3.axisBottom(X_SCALE)) 
          .attr("font-size", '10px');
 
  FRAME1.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
              "," + MARGINS.top + ")") 
        .call(d3.axisLeft(Y_SCALE)) 
          .attr("font-size", '10px'); 
  });
}

build_interative_bar_graph();