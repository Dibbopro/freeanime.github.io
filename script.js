const animeList = document.getElementById("animeList");

// GraphQL query for popular anime
const query = `
query {
  Page(perPage: 12) {
    media(type: ANIME, sort: POPULARITY_DESC) {
      id
      title {
        romaji
        english
      }
      coverImage {
        large
      }
    }
  }
}
`;

fetch("https://graphql.anilist.co", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  body: JSON.stringify({ query: query }),
})
  .then((res) => res.json())
  .then((data) => {
    animeList.innerHTML = ""; // clear loading
    data.data.Page.media.forEach((anime) => {
      const title = anime.title.english || anime.title.romaji;
      const card = `
        <div class="anime-card">
          <img src="${anime.coverImage.large}" alt="${title}" />
          <div class="anime-title">${title}</div>
        </div>
      `;
      animeList.innerHTML += card;
    });
  })
  .catch((err) => {
    animeList.innerHTML = "Failed to load anime. Check API or internet.";
    console.error("AniList API error:", err);
  });
