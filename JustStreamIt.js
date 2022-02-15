const nb_movies = 7;
const scroll_step = 130;


function getbestmovies(){
	axios.get('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score')
	  .then(function (response) {
		// handle success
		var i = 1;
		for (movie of response.data.results){
			if (i ===1){
				
				getbestmoviedetails(movie.url)
			}
			else {
				displaymovies(movie, i-1,"div_best_mov")
			}
			i=i+1;
		}
		getnextmovies(response.data.next, i, displaymovies,"div_best_mov")
		
	  })
	  .catch(function (error) {
		// handle error
		console.log(error);
	  })
	  .then(function () {
		// always executed
	  });
}

function getbestmoviedetails(url){
	axios.get(url)
	  .then(function (response) {
		// handle success
		displaybestmovie(response.data)
	  })
	  .catch(function (error) {
		// handle error
		console.log(error);
	  })
	  .then(function () {
		// always executed
	  });
}

function getmovies_by_genre(genre,id){
	axios.get('http://localhost:8000/api/v1/titles/?genre='+genre+'&sort_by=-imdb_score')
	  .then(function (response) {
		// handle success
		var i = 2;
		for (movie of response.data.results){
			displaymovies(movie, i-1,id)
			i=i+1;
		}
		getnextmovies(response.data.next, i, displaymovies,id)
		
	  })
	  .catch(function (error) {
		// handle error
		console.log(error);
	  })
	  .then(function () {
		// always executed
	  });
}

function getmoviedetails(idmovie){
	axios.get('http://localhost:8000/api/v1/titles/'+idmovie)
	  .then(function (response) {
		// handle success
		displaymodal(response.data)
	  })
	  .catch(function (error) {
		// handle error
		console.log(error);
	  })
	  .then(function () {
		// always executed
	  });
}

function displaymodal(movie){
	var img = document.getElementById("img_modal");
	img.src = movie.image_url;
	var divtitle = document.getElementById("title_modal");
	divtitle.innerHTML = movie.title;
	var	divcontent = document.getElementById("movie_modal");
	var box_results = " unknown";
	console.log(movie.worldwide_gross_income)
	if (movie.worldwide_gross_income !=null){
		box_results = movie.worldwide_gross_income;
	}
	divcontent.innerHTML = movie.long_description + " <br />"
						 + "Genre :" + movie.genres + " <br />"
						 + "Launched:" + movie.date_published + " <br />"
						 + "Rated:" + movie.rated + " <br />"
						 + "Imdb score:" + movie.imdb_score + " <br />"
						 + "Director:" + movie.directors + " <br />"
						 + "Actors:" + movie.actors + " <br />"
						 + "Duration:" + movie.duration + " <br />"
						 + "Countries:" + movie.countries + " <br />"
						 + "Box office results:" + box_results + " <br />"
}


function getnextmovies(url, i, callback,id){
	axios.get(url)
	  .then(function (response) {
		// handle success
		for (movie of response.data.results){
			if (i <= nb_movies+1){
			callback(movie, i-1,id)
			}
			i=i+1;
		}
	  })
	  .catch(function (error) {
		// handle error
		console.log(error);
	  })
	  .then(function () {
		// always executed
	  });
}

function displaybestmovie(movie){
	console.log(movie)
	console.log(movie.image_url)
	var div = document.getElementById("TitleBestMovie");
	div.innerHTML = movie.title;
	var img = document.getElementById("ImgBestMovie");
	img.src = movie.image_url;
	var description = document.getElementById("Description_bm");
	description.innerHTML = movie.description + description.innerHTML;
	var btn = document.getElementById("play");
	
	btn.addEventListener("click", function(event) {
			event.preventDefault();
			openmodal(movie.id);
		});
}

function displaymovies(movie,i,id){
	var div = document.getElementById(id);
	div.innerHTML = div.innerHTML+"<div class=\"internal\" id=\"div_"+ movie.id +"\">";
	div.innerHTML = div.innerHTML+"<img id=\"img_"+movie.id+"\" onclick=\"openmodal("+movie.id+")\"alt=\"Image_de_Film_"+i+"\" src=\""+movie.image_url+"\">";
	div.innerHTML = div.innerHTML+"</div>";
	var btn = document.getElementById("img_"+ movie.id);
	console.log(btn)
}


document.onreadystatechange = function () {
    if (document.readyState === "interactive") {
		const rightBtn_horror = document.querySelector('#right_button_horror');
		const leftBtn_horror = document.querySelector('#left_button_horror');

		rightBtn_horror.addEventListener("click", function(event) {
			event.preventDefault();
			var content = document.querySelector('#div_horror_mov');
			content.scrollLeft += scroll_step;
		});

		leftBtn_horror.addEventListener("click", function(event) {
			event.preventDefault();
			var content = document.querySelector('#div_horror_mov');
			content.scrollLeft -= scroll_step;  
		});
		const rightBtn_comedy = document.querySelector('#right_button_comedy');
		const leftBtn_comedy = document.querySelector('#left_button_comedy');

		rightBtn_comedy.addEventListener("click", function(event) {
			event.preventDefault();
			var content = document.querySelector('#div_comedy_mov');
			content.scrollLeft += scroll_step;
		});

		leftBtn_comedy.addEventListener("click", function(event) {
			event.preventDefault();
			var content = document.querySelector('#div_comedy_mov');
			content.scrollLeft -= scroll_step;  
		});
		const rightBtn_adventure = document.querySelector('#right_button_adventure');
		const leftBtn_adventure = document.querySelector('#left_button_adventure');

		rightBtn_adventure.addEventListener("click", function(event) {
			event.preventDefault();
			var content = document.querySelector('#div_adventure_mov');
			content.scrollLeft += scroll_step;
		});

		leftBtn_adventure.addEventListener("click", function(event) {
			event.preventDefault();
			var content = document.querySelector('#div_adventure_mov');
			content.scrollLeft -= scroll_step;  
		});
		const rightBtn_best = document.querySelector('#right_button_best');
		const leftBtn_best = document.querySelector('#left_button_best');

		rightBtn_best.addEventListener("click", function(event) {
			event.preventDefault();
			var content = document.querySelector('#div_best_mov');
			content.scrollLeft += scroll_step;
		});

		leftBtn_best.addEventListener("click", function(event) {
			event.preventDefault();
			var content = document.querySelector('#div_best_mov');
			content.scrollLeft -= scroll_step;  
		});
    }
	
	
		// Get the modal
	var modal = document.getElementById("myModal");

	// Get the button that opens the modal
	var btn = document.getElementById("play");
	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks on the button, open the modal
	btn.onclick = function() {
	  modal.style.display = "block";
	}

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	  modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	  if (event.target == modal) {
		modal.style.display = "none";
	  }
	}
		
	
}


function openmodal(id){
	getmoviedetails(id)
	var modal = document.getElementById("myModal");
	modal.style.display = "block";
}