import { createCharacterCard } from "./components/CharacterCard/CharacterCard.js";
const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

async function fetchCharacters() {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const data = await response.json();

  cardContainer.innerHTML = "";
  
  data.results.forEach(characterData => {
    const card = createCharacterCard(characterData);
    cardContainer.append(card);
  });
  // get max page infos from api and update display
  maxPage = data.info.pages;
  pagination.textContent = `${page} / ${maxPage}`;

  updateButtonStates();

  console.log(data);
}

nextButton.addEventListener("click", () => {
  if (page < maxPage)
  {
    page++;
    fetchCharacters();
  }
});

prevButton.addEventListener("click", () => {
  if (page > 1)
  {
    page--;
    fetchCharacters();
  }
});


// checks if the buttons has to be disabled at begin and end of page
function updateButtonStates()
{
  if (page <= 1)
  {
    prevButton.disabled = true;
  }
  else
  {
    prevButton.disabled = false;
  }

  if (page >= maxPage)
  {
    nextButton.disabled = true;
  }
  else
  {
    nextButton.disabled = false;
  }
}

fetchCharacters();
