
var sortColumn = function(planets,col,accessor)
{
    d3.select(col)
        .on("click",function()
    {
        planets.sort(function(a,b) 
        { 
            return (accessor(a)-accessor(b));
        })
        makeTable(planets,"ALL");
    })
}

var makeTableHeader = function(planets)
{
    d3.select("#name")
        .on("click",function()
    {
        makeTable(planets.sort(function(a,b)
        {
            if(a.name ==b.name ) { return 0; }
            if(a.name < b.name ) { return -1; }
            if(a.name > b.name ) { return 1; }
        }),"ALL")    
    })
    
    sortColumn(planets,"#moons",function(p){return p.moons});
    sortColumn(planets,"#distance",function(p){return p.distance});
    sortColumn(planets,"#img",function(p){return p.distance});
    sortColumn(planets,"#radius",function(p){return p.radius});
    sortColumn(planets,"#density",function(p){return p.density});
}

var setButtons = function(planets)
{
    
    d3.select("#all").on("click",function()
                        {
        makeTable(planets,"ALL")
    });
    
    d3.select("#rocky").on("click",function()
                        {
        makeTable(planets,"ROCKY")
    });
    
    d3.select("#gassy").on("click",function()
                        {
        makeTable(planets,"GASSY")
    });
    
    
    
    
}

var filterPlanets = function(planets,mode)
{
    if(mode=="ALL")
    {
        return planets;       
    }
    else if (mode == "ROCKY")
    {
        return planets.filter(function(planet)
        {
            return planet.density>2;                      
        })
    }
    else if (mode == "GASSY")
    {
        return planets.filter(function(planet)
        {
            return planet.density<=2;                      
        })
    }
    else
    {
        console.error("UNKNOWN fitler Type",mode);    
        return undefined;
    }
}

var addCol = function(rows,fcn)
{
    rows.append("td").text(fcn);
}

var makeTable = function(planets,mode)
{
    d3.selectAll("tbody *").remove();
  
    var rows = d3.select("tbody")
    .selectAll("tr")
    .data(filterPlanets(planets,mode))
    .enter()
    .append("tr");
    
    
    addCol(rows,function(planet){return planet.name})
    
    rows.append("td")
        .append("img")
        .attr("src",function(planet)
        {
            return planet.img;
        })
        .attr("alt",function(planet)
        {
            return "Picture of "+planet.name;
        })
           
    addCol(rows,function(planet){return planet.moons})
    addCol(rows,function(planet){return planet.distance})
    addCol(rows,function(planet){return planet.radius})
    //addCol(rows,function(planet){return planet.density})
    rows.append("td")
        .text(function(planet){return planet.density})
        .attr("class",function(planet)
        {
                if(planet.density<2) { return "GASSY"; }
                else                 { return "ROCKY"; }
        })
}




var setBanner = function(message)
{
    d3.select("#banner").text(message);
}


var planetPromise = d3.json("planets.json")

planetPromise.then(
function(planets)
{
    setBanner("Here are my Planets");
    makeTableHeader(planets);
    setButtons(planets);
    makeTable(planets,"ALL");
},
function(err)
{
    setBanner("No planets today, try again");
});


