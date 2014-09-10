d3.json('paths',function(dataset){
	d3.select('nav').selectAll('a.nav')
	.data(dataset)
	.enter()
	.append('a')
	.classed('nav', true)
	.attr('href',	function(d){return d.path})
	.text(function(d){return d.path + "  "} )
})