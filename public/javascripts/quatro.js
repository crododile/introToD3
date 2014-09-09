d3.tsv('final/bo', function(dataset){
	var w = 900;
	var h = 3300;
	var root = d3.select('#container');
	var svg = root.append('svg')
	.attr('w', w)
	.attr('h', h);
	
	var bars = svg.selectAll('rect').data(dataset);
	var newbars = bars.enter().append('rect')
	.attr('x', function(d,i){ return 0 })
	.attr('y', function(d,i){ return i * 10})
	.attr('height', function(d,i){ return 8 })
	.attr('width', function(d,i){ return d["ADJUSTED GROSS"]})
})