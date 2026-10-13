export function createCharacterCard(characterData)
{
  const card = document.createElement("li");

  card.classList.add("card");

  const status_color = characterData.status === 'Alive' ? '#97ce4c' : characterData.status === 'Dead' ? '#ff4d4d' : '#888888';

  card.innerHTML = `
    <div class="card__image-container">
      <img
        class="card__image"
        src="${characterData.image}"
        alt="${characterData.name}"
      />
      <div class="card__image-gradient"></div>
    </div>
    <div class="card__content">
      <h2 class="card__title">${characterData.name}</h2>
      <dl class="card__info">
        <dt class="card__info-title">Status</dt>
        <!-- HIER IST DER PUNKT EINGEBAUT: -->
        <dd class="card__info-description">
          <span class="card__status-dot" style="background-color: ${status_color}"></span>
          ${characterData.status}
        </dd>
        <dt class="card__info-title">Type</dt>
        <dd class="card__info-description">${characterData.type || "Unknown"}</dd>
        <dt class="card__info-title">Occurrences</dt>
        <dd class="card__info-description">${characterData.episode.length}</dd>
      </dl>
    </div>
  `;

  return card;
} 