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

// flag to track loading state and prevent 429 (yoo many requests) errors from rapid clicking
let is_loading = false; 

async function fetchCharacters()
{
  if (is_loading) return;
  is_loading = true;

  // immediately disable pagination buttons to prevent user interaction during fetch
  prevButton.disabled = true;
  nextButton.disabled = true;
  
  try
  {
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
    
    if (!response.ok)
    {
      if (response.status === 429)
      {
        throw new Error("Too many clicks. Please wait a moment");
      }
      throw new Error("Error loading data");
    }
  
    const data = await response.json();

    // get max page infos from api and update display
    maxPage = data.info.pages;
    pagination.textContent = `${page} / ${maxPage}`;
    
    cardContainer.innerHTML = "";
    
    data.results.forEach(characterData => {
      const card = createCharacterCard(characterData);
      cardContainer.append(card);
    });
    
    updateButtonStates();
    
  }
  catch (error)
  {
    console.warn("Warning:", error.message);
    updateButtonStates();
  }
  finally
  {
    is_loading = false;
  }
}

nextButton.addEventListener("click", () => {
  if (page < maxPage && !is_loading)
  {
    page++;
    fetchCharacters();
  }
});

prevButton.addEventListener("click", () => {
  if (page > 1 && !is_loading)
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
