const map = L.map('map').setView([40.4168, -3.7038], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);

const clubs = [
  {
    name: "SPACE GYM Barcelona Elite",
    city: "Barcelona",
    coords: [41.3874, 2.1686],
    image: "img/barcelona.jpg",
    description: "Club premium amb zona wellness, entrenadors personals i equipament d'alt rendiment.",
    link: "clubs.html"
  },
  {
    name: "SPACE GYM Madrid Luxury",
    city: "Madrid",
    coords: [40.4168, -3.7038],
    image: "img/madrid.jpg",
    description: "Gimnàs exclusiu amb serveis personalitzats, classes dirigides i espais de recuperació.",
    link: "clubs.html"
  },
  {
    name: "SPACE GYM Tenerife Rooftop",
    city: "Tenerife",
    coords: [28.2916, -16.6291],
    image: "img/tenerife.jpg",
    description: "Club amb experiència fitness premium, entrenament funcional i espais exteriors.",
    link: "clubs.html"
  }
];

clubs.forEach(club => {
  L.marker(club.coords).addTo(map)
    .bindPopup(`
      <div class="map-popup">
        <img src="${club.image}" alt="${club.name}">
        <h5>${club.name}</h5>
        <p><strong>Ciutat:</strong> ${club.city}</p>
        <p>${club.description}</p>
        <a href="${club.link}">Veure més informació</a>
      </div>
    `);
});