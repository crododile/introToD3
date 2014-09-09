d3.tsv("final/bo", function(dataSet){
	var root = d3.select("#graph-container");
	var w = 900;
	var h = 3300;
	
	var svg = root.append('svg')
	.attr('width', w)
	.attr('height', h)
	
	var curr2Int = function (cash) {
		return parseInt( cash.replace(/\$|,/g, ''))
	}
	
	var reorderButton = function(field){
		return d3.select('div.movie').append('button')
		.on('click', function() {
			dataSet.sort(function(a, b) { 
				return (curr2Int(b[field]) - curr2Int(a[field])); 
			});
			reorder()
		});
	}
	
	var reorder = function(){
		var bars = svg.selectAll('rect')
		.data(dataSet, function(d){ return d["#"]});
		
		bars.transition()
		.duration(400)
		.attr('y', function(d,i){
			return i * 10 
		})
	}
	
	reorderButton("GROSS").text("Sort by Gross Income");
	reorderButton("ADJUSTED GROSS").text("Sort by Gross Adjusted Income");
	reorderButton("RELEASE YEAR").text("Sort by Year");

	var xScale = d3.scale.linear()
	.domain([0, 2000000000 ])
	.range([0, 890 ]);
	
	var setWidthField = function(field){
		var bars = svg.selectAll('rect').data(dataSet, function(d){ return d["#"]});
		bars.transition()
		.duration(400)
		.attr('width', function(d,i){
			return xScale( curr2Int( d[field]))
		})
	}
	
	var changeWidthButton = function(field){
		return d3.select('div.movie').insert('button', ':first-child')
		.on('click', function(){
			setWidthField(field);
		})		
	}
	
	changeWidthButton("GROSS").text("SHOW GROSS");
	changeWidthButton("ADJUSTED GROSS").text("SHOW ADJUSTED GROSS");

	var drawChart = function(){
		var bars = svg.selectAll('rect').data(dataSet);

		var newBars = bars.enter().append('rect')
		.attr('x', function(d,i){ return 0 })
		.style('fill', 'green')
		.style('stroke', 'black')
		.on('mouseover', function(d){
			d3.select("div.movie").select('p')
			.html(
				d["MOVIE (DISTRIBUTOR)"] +"<br>" +
				"GROSS:  " + d["GROSS"] +"<br>" +
				"ADJUSTED GROSS:  " + d["ADJUSTED GROSS"] +"<br>" +
				"YEAR:  " + d["RELEASE YEAR"]
		 )
		})

		bars.attr('y', function(d,i){ return i * 10 })
		.attr('height', function(d,i){ return 8 })
		.attr('width', function(d,i){
			return 0;
		})
	}
	
	drawChart();
	setWidthField('ADJUSTED GROSS');

});