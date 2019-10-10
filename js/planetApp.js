var setBanner = function(message)
{
    d3.select("#banner").text(message);
}


var drawImages = function(planets)
{
    d3.select("#planet_pics")
      .selectAll("img")
      .data(planets)
      .enter()
      .append("img")
      .attr("src",function(d) {return d.img})
      .on("mouseover",function(d)
         {
           drawDetails(d);
         })
}


var drawDetails = function(planet)
{
    d3.selectAll("#planet_info *").remove();
    
    
    var box = d3.select("#planet_info");
    box.append("img")
       .attr("src",planet.img)
       .attr("class","description");
    
    box.append("div").attr("class","title").text(planet.name)
    var info  = box.append("div").attr("class","info")

    info.append("div").text("Moons:   "+planet.moons);
    info.append("div").text("Distance: "+planet.distance+" AUs");
    info.append("div").text("Radius:  "+planet.radius+" of Earth");
    info.append("div").text("Density:  "+planet.density+"g per cubic cm");
        
    
}


var planetPromise = d3.json("planets.json")

planetPromise.then(
function(planets)
{
    setBanner("Select a Planet");
    drawImages(planets);
},
function(err)
{
    setBanner("No planets today, try again");
});


