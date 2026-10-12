export function initSearchbar(searchBarElement, onSubmit) {

searchBarElement.addEventListener("submit", (event) => {
  event.preventDefault();

  const input = event.target.elements.query;
  const value = input ? input.value : "";

  //page = 1;
  //fetchCharacters();
  onSubmit(value);
});
}