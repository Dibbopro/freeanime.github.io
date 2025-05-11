const animeList = document.getElementById("animeList");

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
  body: JSON.stringify({ query })
})
.then(response => response.json())
.then(data => {
  animeList.innerHTML = "";

  const animes = data.data.Page.media;

  animes.forEach(anime => {
    const title = anime.title.english || anime.title.romaji || "Untitled";
    const img = anime.coverImage.large;

    const card = document.createElement("div");
    card.className = "anime-card";

    const imageEl = document.createElement("img");
    imageEl.src = img;
    imageEl.alt = title;

    const titleEl = document.createElement("div");
    titleEl.className = "anime-title";
    titleEl.textContent = title;

    card.appendChild(imageEl);
    card.appendChild(titleEl);

    animeList.appendChild(card);
  });
})
.catch(error => {
  animeList.innerHTML = "<p style='color:red;'>Failed to load anime. Console has details.</p>";
  console.error("❌ AniList API Error:", error);
});
