function getData() {

	var movie = document.getElementById("movie-name").value;
	var url1 = `https://api.themoviedb.org/3/search/multi?api_key=66d76f2eb4fea298fa553e7ba3f3baa1&language=en-US&query=`;
	var url2 = `&page=1&include_adult=false`;
	var url = url1 + movie + url2;
	var favouriteMovieList = [];
	
	fetch(url)
		.then((res) => { 
			res.json().then(data => {
				console.log(data);
				divElement = document.getElementById("content");
				data.results.forEach(element => {
					
					const markup = `
					<div class="col-3 d-flex" style="flex-direction: column; padding-bottom: 45px;align-items: flex-start;">
						  <img class="card-image" style="width: 209px; height: 100%;" src="https://image.tmdb.org/t/p/w200${element.poster_path}" alt="Card image cap">
						  <div class="card-body d-flex" style="flex-direction: column; padding-left: 0; padding-bottom: 60px;">
						    <p class="card-text">${element.title}</p>
						    <p class="">${element.release_date}</p>
						  </div>
						  <button id="add-button" class="btn btn-primary" type="submit">ADD</button>
					</div>
					`;
	           
		            divElement.insertAdjacentHTML('afterbegin', markup);
		            const addButton = document.getElementById('add-button');
					const movieCollectionList = document.getElementById('movie-collection-list');

					addButton.addEventListener("click", function(e) {
						var node = document.createElement("LI");
						movieName = e.target.parentNode.querySelector('.card-body .card-text').innerHTML;
						SaveToLocalStorage();
					});

					function SaveToLocalStorage(){
						console.log(movieName);
						favouriteMovieList.push(movieName);
						localStorage.setItem("movieList", JSON.stringify(favouriteMovieList));
				        RetrieveFromLocalStorage();
			    	}

				    function RetrieveFromLocalStorage() {
				        retrivedValue = JSON.parse(localStorage.getItem("movieList"));
				        
				        console.log(retrivedValue);
				    }

					
			    	})
			})
			.catch(e => {
				console.log(e);
			})
		});
}
function displayMovieList() {
	let displayList = document.getElementById('movie-collection-list');
	displayList.addEventListener('click', function() {
		let showMovieList = document.getElementById('display-movies');
		showMovieList.innerHTML = retrivedValue;
	})
}


