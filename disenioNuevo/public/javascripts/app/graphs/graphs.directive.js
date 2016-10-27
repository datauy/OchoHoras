angular.module('app')
    .directive(
      'graph', 
      [
      '$timeout',
      '$http',
      '$state',
      '$rootScope',
      function($timeout, $http, $state, $rootScope) {
          return {
              restrict: 'E',
              templateUrl: '/javascripts/app/graphs/graphs.html',
              link : function($scope, element, attr){
                  console.log($('#chartContainer').width())
                  console.log($('#chartContainer').height())
                  var svg = dimple.newSvg("#chartContainer", $('.graph').width(), $('.graph').height());
                  
                  function calculateRadius(data, arrayData){
                    return _.reduce(arrayData, function(sum, aData){
                      if(Math.abs(aData.SALARIO - data.SALARIO) < 100
                          && data.ID !== aData.ID){
                        return sum += 3;
                      }else if(Math.abs(aData.SALARIO - data.SALARIO) < 1000
                          && data.ID !== aData.ID){
                        return sum += 2;
                      } else if(Math.abs(aData.SALARIO - data.SALARIO) < 10000
                          && data.ID !== aData.ID){
                        return sum += 1;
                      }else{
                        return sum;
                      }
                    }, 1)
                  }


                  $http
                    .get('/ocupaciones/'+$rootScope.ocupation.CIUO+'/salarios?years[]=2015&years[]=2014&years[]=2013&years[]=2012&years[]=2011')
                    .then(
                      function(response){


                        var data = response.data;
                        var counted = _.map(data, function(yearData){
                            return _.map(yearData, function(data){
                              return _.extend(data,{
                                radius: calculateRadius(data, yearData)
                              });
                            });
                        });
                        var dataToD3 = _.flatten(counted);
                        console.log(dataToD3);

                        var myChart = new dimple.chart(svg, dataToD3);
                        var tipChart = null;
                        // The other popup shapes
                        var popup = null;
                        
                        // Position the main chart
                       // myChart.setBounds(60, 40, 500, 320);
                        
                        // Add the main chart axes
                        myChart.addCategoryAxis("x", "YEAR");
                        myChart.addMeasureAxis("y", "SALARIO");
                        myChart.addMeasureAxis("z", "radius");
                        
                        // Draw bubbles by SKU colored by brand
                        var s = myChart.addSeries(["ID", "YEAR"], dimple.plot.bubble);
                        // Handle the hover event - overriding the default behaviour
                       // s.addEventHandler("mouseover", onHover);
                        // Handle the leave event - overriding the default behaviour
                       // s.addEventHandler("mouseleave", onLeave);
                        
                        // Draw the main chart
                        myChart.draw();

                        

                        $('.dimple-custom-axis-label').contents().filter(function() {
                            return this.nodeType == 3
                        }).each(function(){
                            this.textContent = this.textContent.replace('k','000');
                        });

                        $('.dimple-axis-x').contents().filter(function() {
                            return this.nodeType == 3
                        }).each(function(){
                            this.textContent = "AÑO";
                        });
                        
                        // Event to handle mouse enter
                        function onHover(e) {
                          
                          // Get the properties of the selected shape
                          var cx = parseFloat(e.selectedShape.attr("cx")),
                              cy = parseFloat(e.selectedShape.attr("cy")),
                              r = parseFloat(e.selectedShape.attr("r")),
                              fill = e.selectedShape.attr("fill"),
                              stroke = e.selectedShape.attr("stroke");
                              
                          // Set the size and position of the popup
                          var width = 150,
                              height = 100,
                              x = (cx + r + width + 10 < svg.attr("width") ?
                                    cx + r + 10 :
                                    cx - r - width - 20);
                              y = (cy - height / 2 < 0 ?
                                    15 :
                                    cy - height / 2);
                                  
                          // Fade the popup fill mixing the shape fill with 80% white
                          var popupFillColor = d3.rgb(
                                      d3.rgb(fill).r + 0.8 * (255 - d3.rgb(fill).r),
                                      d3.rgb(fill).g + 0.8 * (255 - d3.rgb(fill).g),
                                      d3.rgb(fill).b + 0.8 * (255 - d3.rgb(fill).b)
                                  );
                          
                          // Create a group for the popup objects
                          popup = svg.append("g");
                          
                          // Add a rectangle surrounding the chart
                          popup
                            .append("rect")
                            .attr("x", x + 5)
                            .attr("y", y - 5)
                            .attr("width", width)
                            .attr("height", height)
                            .attr("rx", 5)
                            .attr("ry", 5)
                            .style("fill", popupFillColor)
                            .style("stroke", stroke)
                            .style("stroke-width", 2);
                          
                          // Add the series value text
                          console.log(e.seriesValue);
                          console.log(e.seriesValue[0]);
                          popup
                            .append("text")
                            .attr("x", x + 10)
                            .attr("y", y + 10)
                            .text(e.seriesValue[0])
                            .style("font-family", "sans-serif")
                            .style("font-size", 10)
                            .style("fill", stroke);
                          

                          // Filter the data for the selected brand and sku
                          var hoverData = dimple.filterData(data, "YEAR", e.xValue);
                          hoverData = dimple.filterData(hoverData, "SALARIO", e.seriesValue);
                          
                          // Create a new mini chart of Unit Sales over Months
                          tipChart = new dimple.chart(svg,  hoverData);
                          tipChart.setBounds(x + 10, y + 30, width - 10, height - 40);
                          tipChart.addCategoryAxis("x", "Date").hidden = true;
                          //tipChart.addMeasureAxis("y", "Unit Sales").hidden = true;
                          
                          // Add a bar series, this can be changed to a line, area or bubble
                          // by changing the plot parameter accordingly.
                          var popUpSeries = tipChart.addSeries("SelectedSeries", dimple.plot.bar);
                          
                          // Set the gap to 80% - just a style preference
                          popUpSeries.barGap = 0.8;
                          
                          // Set the color to the stroke color of the selected node
                          tipChart.assignColor("SelectedSeries", stroke, stroke);
                          
                          // Draw the mini chart
                          tipChart.draw();
                          
                        };
                        
                        // Event to handle mouse exit
                        function onLeave(e) {
                          // Remove the chart
                          if (tipChart !== null) {
                            tipChart._group.remove();
                          }
                          // Remove the popup
                          if (popup !== null) {
                            popup.remove();
                          }
                        };
                      }
                    )
              }

          }
      }
      ]
    );      
