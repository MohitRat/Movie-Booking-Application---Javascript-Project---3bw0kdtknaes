const moviesData = [];
const genre = [
  { id: 1, name: "All" },
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NWI5ZThiMjVhNDNhNjBjM2Q5MTJkNmVkZjRhNWNjNSIsInN1YiI6IjY0ZTBlZjRiZTE5ZGU5MDBjNjhiYzNiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6JMJX7P0NFtGy7OOFsJhMXbf3NTu8TUfv9G2QJ0eNIk'
  }
};
let currentMovie = [];

function createMovieCard(movie) {
  const movieCard = document.createElement("div");
  const price = (Math.floor(Math.random() * 51) + 250);
  movieCard.classList.add("movie-card");
  movieCard.innerHTML = `
      
      <p><b>Genre:</b> ${movie.genre}</p>
      <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" />
      <h2>${movie.title}</h2>
      <h3>Price:${price}</h3>
      <button class="show-description-btn">Show Description</button>
      <a href="./checkout.html?data1=${movie.title}&data2=${price}"><button class="book-now-btn">Book Now</button></a>
      
    `;
    
  const showDescriptionBtn = movieCard.querySelector(".show-description-btn");
  showDescriptionBtn.addEventListener("click", () => {
    showMovieDescription(movie);
  });
  
  // const bookNowBtn = movieCard.querySelector(".book-now-btn"); // Use a class selector instead of id
  // bookNowBtn.addEventListener('click', () => {
  //   checkout(movie.title,price);
  // });

  return movieCard;
}



function showMovieDescription(movie) {
  const modal = document.getElementById("movieModal");
  modal.innerHTML = `
     <div id="close" class="close">
      <h2>${movie.title}</h2>
      <p>Description: ${movie.overview}</p>   
      <button id="closeBtn">Close &#9587;</button>
      </div>
    `;
  modal.style.display = "block";

  const closeButton = document.querySelector("#closeBtn");
  closeButton.addEventListener("click", () => {
    const modal = document.getElementById("movieModal");
    modal.style.display = "none";
  });
}
// function checkout(movieTitle,price){
//   const bookNow=document.querySelector('.form');
//   bookNow.innerHTML=`
//   <form id="format">
//   <label>Movie: ${movieTitle}</lable>
//   <label>Customer Name:</label><br>
//   <input type="text" placeholder="Enter your name"><br>
//   <label>No of Tickets</label><br>
//   <input type="number" placeholder="Number of Tickets" id="no-of-tickets"><br>
//   <label>Price</label><br>
//   <input type="number" value="${price}" disabled style="color:red;" id="final-price"><br>
//   <input type="submit" onClick='fun(e)' id="submit">
//   </form>
//   `
//   bookNow.style.display='block';
//    const closeButton = document.querySelector("#submit");
//   closeButton.addEventListener("click", (e) => {
//     e.preventDefault();
//     const modal = document.querySelector(".form");
//     bookNow.style.display = "none";
//   });
//    document.querySelector('#no-of-tickets').addEventListener('input',(event)=>{
//      let tickets = event.target.value;
//      let totalPrice = price*tickets;
//      document.querySelector('#final-price').value = totalPrice;
//    })
  
  
// }
function fun(e){
  e.preventDefault();
}
function filterMoviesByGenre(genre) {
  if (genre == "All") {
    currentMovie = [...moviesData];
  } else currentMovie = moviesData.filter((p) => p.genre.includes(genre));
  //console.log(currentMovie);
  const moviesSection = document.querySelector(".listMovie");
  //console.log(genre);
  moviesData.forEach((movie) => {
    //console.log(movie);
    const movieCard = createMovieCard(movie);
    while (moviesSection.firstChild) {
      moviesSection.removeChild(moviesSection.firstChild);
    }
    currentMovie.forEach((movie) => {
      //console.log(movie);
      const movieCard = createMovieCard(movie);
      moviesSection.appendChild(movieCard);
    });
  });
}

function performSearch(searchTerm) {
  currentMovie = moviesData.filter((p) => p.title.includes(searchTerm));
  const moviesSection = document.querySelector(".listMovie");
  //console.log(genre);
  moviesData.forEach((movie) => {
    //console.log(movie);
    const movieCard = createMovieCard(movie);
    while (moviesSection.firstChild) {
      moviesSection.removeChild(moviesSection.firstChild);
    }
    currentMovie.forEach((movie) => {
      //console.log(movie);
      const movieCard = createMovieCard(movie);
      moviesSection.appendChild(movieCard);
    });
  });
}

async function fetchMoviesFromAPI() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movies from API:", error);
    return [];
  }
}
async function addGenresList() {
  const modal = document.querySelector(".filter");
  genre.forEach((gen) => {
    const optionElement = document.createElement("option");
    optionElement.value = gen.name;
    optionElement.textContent = gen.name;
    modal.appendChild(optionElement);
  });
  modal.style.display = "block";
  //modal.addEventListener("change", filterMoviesByGenre(modal.value));
}
async function initApp() {
  addGenresList();
  const moviesSection = document.querySelector(".listMovie");

  const moviesFromAPI = await fetchMoviesFromAPI();
  //   const generes = await fetchGenres();
  //console.log(moviesFromAPI);
  const resutlData = moviesFromAPI.results.forEach((a) => {
    let str = "";
    a.genre_ids.forEach((p) => {
      str = str + " " + genre.find((q) => q.id == p).name;
    });
    a["genre"] = str;
    moviesData.push(a);
  });
  //moviesData.push(...moviesFromAPI);

  //console.log(moviesData);
  currentMovie = [...moviesData];
  currentMovie.forEach((movie) => {
    //console.log(movie);
    const movieCard = createMovieCard(movie);
    moviesSection.appendChild(movieCard);
  });
  const genreFilter = document.getElementById("genreFilter");
  genreFilter.addEventListener("change", () => {
    filterMoviesByGenre(genreFilter.value);
  });
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", () => {
    performSearch(searchInput.value);
  });
}

document.addEventListener("DOMContentLoaded", initApp);