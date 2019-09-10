const redditTemplate = Handlebars.compile(
	document.getElementById('reddit-loader').innerHTML
	);

Handlebars.registerHelper('number-comma', function(number) {
 return number.toLocaleString();
});

$('#searchform').submit(function(event){
	event.preventDefault();

	document.querySelector(".loader").style.display = 'block';
	

	let searchterm = document.querySelector("#inputterm").value;
	console.log(searchterm);

	$.ajax({
		type: "GET",
		url: "https://www.reddit.com/r/" + searchterm + ".json"
	}).then((reddits) => {
		let sanitizedHtml = redditTemplate({ 
			reddits : reddits.data.children
		});
		document.querySelector(".loader").style.display = 'none';
		$('#results').html(sanitizedHtml);
	});
});