import Movie from './Movie.js';

const container = document.querySelector('.container');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = 0;

// Funktion för att uppdatera pris och antal stolar
function updateSelectedCount() {
  const selectedSeatsCount = document.querySelectorAll('.row .seat.selected').length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Lyssna på när man byter film
movieSelect.addEventListener('change', (e) => {
  ticketPrice = parseInt(e.target.value);
  updateSelectedCount();
});

// Lyssna på klick på stolarna
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

// Hämta filmer från JSONServer och bygg listan
async function initApp() {
  try {
    const response = await fetch('http://localhost:3000/movies');
    const moviesData = await response.json();
    
    movieSelect.innerHTML = ''; // Töm listan först

    moviesData.forEach(data => {
      const movie = new Movie(data.Title, data.Price); // Använd din klass
      
      const option = document.createElement('option');
      option.value = movie.price;
      option.innerText = `${movie.title} (${movie.price} kr)`;
      movieSelect.appendChild(option);
    });

    if(moviesData.length > 0) {
      ticketPrice = parseInt(movieSelect.value);
    }
  } catch (error) {
    console.error("Misslyckades att hämta API. Är json-server igång?");
  }
}

initApp();