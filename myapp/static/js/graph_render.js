var w = document.querySelector(".svg-container").clientWidth
var h = document.querySelector(".svg-container").clientHeight

var linkDistance=200;
var class_color = '#87CEFA'
var instance_color = '#8FBC8F'
var dataset = JSON.parse(document.getElementById("data_source").innerHTML);

var svg = d3.select(".svg-container").append("svg")
            .attr("viewBox", "0 0 " + w + " " + h )
            .attr("preserveAspectRatio", "xMidYMid meet")
            .call(d3.behavior.zoom().on("zoom", function () {
                svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
            }))
            .append("g").classed("chartLayer", true);

var force = d3.layout.force()
    .nodes(dataset.nodes)
    .links(dataset.edges)
    .size([w,h])
    .linkDistance([linkDistance])
    .charge([-500])
    .theta(0.1)
    .gravity(0.05)
    .start();

var edges = svg.selectAll("line")
  .data(dataset.edges)
  .enter()
  .append("line")
  .attr("id",function(d,i) {return 'edge'+i})
  .attr('marker-end','url(#arrowhead)')
  .style("stroke","#ccc")
  .style("pointer-events", "none");

var nodes = svg.selectAll("circle")
  .data(dataset.nodes)
  .enter()
  .append("circle")
  .attr({"r":15})
  .style("fill",function(d,i){
    node_color = class_color
    if (d.type == 'Instance') {
      node_color = instance_color
    }
    return node_color;
  })
  .call(force.drag);

var nodelabels = svg.selectAll(".nodelabel")
   .data(dataset.nodes)
   .enter()
   .append("text")
   .attr({"x":function(d){return d.x;},
          "y":function(d){return d.y;},
          "class":"nodelabel",
          "stroke":"black"})
   .text(function(d){return d.name;});

var edgepaths = svg.selectAll(".edgepath")
    .data(dataset.edges)
    .enter()
    .append('path')
    .attr({'d': function(d) {return 'M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y},
           'class':'edgepath',
           'fill-opacity':0,
           'stroke-opacity':0,
           'fill':'blue',
           'stroke':'red',
           'id':function(d,i) {return 'edgepath'+i}})
    .style("pointer-events", "none");

var edgelabels = svg.selectAll(".edgelabel")
    .data(dataset.edges)
    .enter()
    .append('text')
    .style("pointer-events", "none")
    .attr({'class':'edgelabel',
           'id':function(d,i){return 'edgelabel'+i},
           'dx':80,
           'dy':0,
           'font-size':10,
           'fill':'#aaa'});

edgelabels.append('textPath')
    .attr('xlink:href',function(d,i) {return '#edgepath'+i})
    .style("pointer-events", "none")
    .text(function(d,i){return d.type});//'label '+i});


svg.append('defs').append('marker')
    .attr({'id':'arrowhead',
           'viewBox':'-0 -5 10 10',
           'refX':25,
           'refY':0,
           'orient':'auto',
           'markerWidth':10,
           'markerHeight':10,
           'xoverflow':'visible'})
    .append('svg:path')
        .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
        .attr('fill', '#ccc')
        .attr('stroke','#ccc');


force.on("tick", function(){

    edges.attr({"x1": function(d){return d.source.x;},
                "y1": function(d){return d.source.y;},
                "x2": function(d){return d.target.x;},
                "y2": function(d){return d.target.y;}
    });

    nodes.attr({"cx":function(d){return d.x;},
                "cy":function(d){return d.y;}
    });

    nodelabels.attr("x", function(d) { return d.x; })
              .attr("y", function(d) { return d.y; });

    edgepaths.attr('d', function(d) { var path='M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y;
                                       //console.log(d)
                                       return path});

    edgelabels.attr('transform',function(d,i){
        if (d.target.x<d.source.x){
            bbox = this.getBBox();
            rx = bbox.x+bbox.width/2;
            ry = bbox.y+bbox.height/2;
            return 'rotate(180 '+rx+' '+ry+')';
            }
        else {
            return 'rotate(0)';
            }
    });
});

//<script type="text/javascript">
//    var w = document.querySelector(".svg-container").clientWidth
//    var h = document.querySelector(".svg-container").clientHeight
//<!--    var margin = {top:0, left:0, bottom:0, right:0 }-->
//<!--    var gw = w - (margin.left + margin.right)-->
//<!--    var gh = h - (margin.top + margin.bottom)-->
//
//    var linkDistance=200;
//<!--    var colors = d3.scale.category10();-->
//    var class_color = '#87CEFA'
//    var instance_color = '#8FBC8F'
//
//<!--    Class Instance-->
//    var dataset = JSON.parse(document.getElementById("data_source").innerHTML);
//
//<!--    var svg = d3.select(".svg-container").append("svg");-->
//<!--    var chartLayer = svg.append("g").classed("chartLayer", true)-->
//
//<!--    svg.attr("width", w).attr("height", h);-->
//
//    var svg = d3.select(".svg-container").append("svg")
//<!--                .attr({"width":gw,"height":gh})-->
//                //better to keep the viewBox dimensions with variables
//                .attr("viewBox", "0 0 " + w + " " + h )
//                .attr("preserveAspectRatio", "xMidYMid meet")
//                .call(d3.behavior.zoom().on("zoom", function () {
//                    svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
//                }))
//                .append("g").classed("chartLayer", true);
//
//    var force = d3.layout.force()
//        .nodes(dataset.nodes)
//        .links(dataset.edges)
//        .size([w,h])
//        .linkDistance([linkDistance])
//        .charge([-500])
//        .theta(0.1)
//        .gravity(0.05)
//        .start();
//
//    var edges = svg.selectAll("line")
//      .data(dataset.edges)
//      .enter()
//      .append("line")
//      .attr("id",function(d,i) {return 'edge'+i})
//      .attr('marker-end','url(#arrowhead)')
//      .style("stroke","#ccc")
//      .style("pointer-events", "none");
//
//    var nodes = svg.selectAll("circle")
//      .data(dataset.nodes)
//      .enter()
//      .append("circle")
//      .attr({"r":15})
//      .style("fill",function(d,i){
//        node_color = class_color
//        if (d.type == 'Instance') {
//          node_color = instance_color
//        }
//        return node_color;
//      })//colors(i);})
//      .call(force.drag);
//
//    var nodelabels = svg.selectAll(".nodelabel")
//       .data(dataset.nodes)
//       .enter()
//       .append("text")
//       .attr({"x":function(d){return d.x;},
//              "y":function(d){return d.y;},
//              "class":"nodelabel",
//              "stroke":"black"})
//       .text(function(d){return d.name;});
//
//    var edgepaths = svg.selectAll(".edgepath")
//        .data(dataset.edges)
//        .enter()
//        .append('path')
//        .attr({'d': function(d) {return 'M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y},
//               'class':'edgepath',
//               'fill-opacity':0,
//               'stroke-opacity':0,
//               'fill':'blue',
//               'stroke':'red',
//               'id':function(d,i) {return 'edgepath'+i}})
//        .style("pointer-events", "none");
//
//    var edgelabels = svg.selectAll(".edgelabel")
//        .data(dataset.edges)
//        .enter()
//        .append('text')
//        .style("pointer-events", "none")
//        .attr({'class':'edgelabel',
//               'id':function(d,i){return 'edgelabel'+i},
//               'dx':80,
//               'dy':0,
//               'font-size':10,
//               'fill':'#aaa'});
//
//    edgelabels.append('textPath')
//        .attr('xlink:href',function(d,i) {return '#edgepath'+i})
//        .style("pointer-events", "none")
//        .text(function(d,i){return d.type});//'label '+i});
//
//
//    svg.append('defs').append('marker')
//        .attr({'id':'arrowhead',
//               'viewBox':'-0 -5 10 10',
//               'refX':25,
//               'refY':0,
//               //'markerUnits':'strokeWidth',
//               'orient':'auto',
//               'markerWidth':10,
//               'markerHeight':10,
//               'xoverflow':'visible'})
//        .append('svg:path')
//            .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
//            .attr('fill', '#ccc')
//            .attr('stroke','#ccc');
//
//
//    force.on("tick", function(){
//
//        edges.attr({"x1": function(d){return d.source.x;},
//                    "y1": function(d){return d.source.y;},
//                    "x2": function(d){return d.target.x;},
//                    "y2": function(d){return d.target.y;}
//        });
//
//        nodes.attr({"cx":function(d){return d.x;},
//                    "cy":function(d){return d.y;}
//        });
//
//        nodelabels.attr("x", function(d) { return d.x; })
//                  .attr("y", function(d) { return d.y; });
//
//        edgepaths.attr('d', function(d) { var path='M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y;
//                                           //console.log(d)
//                                           return path});
//
//        edgelabels.attr('transform',function(d,i){
//            if (d.target.x<d.source.x){
//                bbox = this.getBBox();
//                rx = bbox.x+bbox.width/2;
//                ry = bbox.y+bbox.height/2;
//                return 'rotate(180 '+rx+' '+ry+')';
//                }
//            else {
//                return 'rotate(0)';
//                }
//        });
//    });
//
//</script>