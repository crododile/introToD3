d3.tsv("bostudio", function(dataSet){
	var root = d3.select("#graph-container");
	var w = 3300;
	var h = 1000;
	
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
	
	var reorderStudios = function(field){
		return d3.select('div.movie').append('button')
		.on('click', function() {
			dataSet.sort(function(a, b) { 
				return (b[field].localeCompare(a[field])); 
			});
			reorder()
		});
	}
	
	var reorder = function(){
		var bars = svg.selectAll('rect')
		.data(dataSet, function(d){ return d["#"]});
		
		bars.transition()
		.duration(400)
		.attr('x', function(d,i){
			return i * 10 
		})
	}
	
	reorderButton("GROSS").text("Sort by Gross Income");
	reorderButton("ADJUSTED GROSS").text("Sort by Gross Adjusted Income");
	reorderButton("RELEASE YEAR").text("Sort by Year");
	reorderStudios("DISTRIBUTOR").text("Sort by Studio");

	var topScale = d3.scale.linear()
	.domain([0, d3.max(dataSet, function(d) { return curr2Int( d["ADJUSTED GROSS"]) })])
	.range([h, 0]);
	
	var hScale = d3.scale.linear()
	.domain([0, d3.max(dataSet, function(d) { return curr2Int( d["ADJUSTED GROSS"]) })])
	.range([0, h]);
	
	var setWidthField = function(field){
		var bars = svg.selectAll('rect').data(dataSet, function(d){ return d["#"]});
		bars.transition()
		.duration(400)
		.attr('y', function(d,i){
			return topScale( curr2Int( d[field]))
		})
		.attr('height', function(d,i){
			return hScale( curr2Int( d[field]))
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
		.attr('y', function(d,i){ return 0 })
		.on('mouseover', function(d){
			d3.select("div.movie").select('p')
			.html(
				d["MOVIE"] +"<br>" +
				"STUDIO:" + d["DISTRIBUTOR"] + "<br>" +
				"GROSS:  " + d["GROSS"] +"<br>" +
				"ADJUSTED GROSS:  " + d["ADJUSTED GROSS"] +"<br>" +
				"YEAR:  " + d["RELEASE YEAR"]
		 )
		})

		bars.attr('x', function(d,i){ return i * 10 })
		.attr('width', function(d,i){ return 8 })
		.attr('height', function(d,i){return 0});
	}
	
	drawChart();
	setWidthField('ADJUSTED GROSS');

});