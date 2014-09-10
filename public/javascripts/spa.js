d3.json('paths',function(dataset){
	d3.select('#navHolder').selectAll('button.nav')
	.data(dataset)
	.enter()
	.append('button')
	.classed('nav', true)
	.text(function(d){return d.path})
	.on('click', function(d, i){
		d3.html( d.path, function(htmel){
			var fillerup = d3.select('#fillerup');
			fillerup.html('');
			fillerup[0][0].appendChild(htmel)
		})
	})

})