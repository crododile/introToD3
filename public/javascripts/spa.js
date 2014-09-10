d3.json('paths',function(dataset){
	d3.select('#navHolder').selectAll('input.nav')
	.data(dataset)
	.enter()
	.append('label').text(function(d){return d.path})
	.append('input')
	.attr({ type:'radio', name: 'navigation'})
	.classed('nav', true)
	.on('click', function(d, i){
		d3.html( d.path, function(htmel){
			var fillerup = d3.select('#fillerup');
			fillerup.html('');
			fillerup[0][0].appendChild(htmel)
		})
	})
})