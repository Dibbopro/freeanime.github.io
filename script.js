const animeList = document.getElementById('anime-list');

// Fetch anime data from API
fetch('/api/anime')
  .then(response => response.json())
  .then(data => {
    const animeHtml = data.map(anime => {
      return `
        <li>
          <h2>${anime.title}</h2>
          <p>${anime.description}</p>
          <button>Watch</button>
        </li>
      `;
    }).join('');
    animeList.innerHTML = animeHtml;
  })
  .catch(error => console.error(error));
