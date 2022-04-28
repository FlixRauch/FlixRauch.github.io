/* Neuseelandreise Skript */


let zoom = 11;
let coords = [
    ETAPPEN[9].lat,
    ETAPPEN[9].lng
];



let map = L.map('map').setView(coords, zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



for (let etappe of ETAPPEN) {
    //console.log(etappe);
    let popup = `
      <h3>${etappe.titel} (Etappe ${etappe.nr})</h3>
      <ul>
      <li>geogr. Länge: ${etappe.lng}</li>
      <li>geogr. Breite: ${etappe.lat}</li>
      <li><a href="${etappe.wikipedia}">Link zur Wikipediaseite</a></li>
      <li><a href="https://${etappe.github}.github.io/nz/">Link zur Etappenseite</a></li>
  </ul>
  `;
    L.marker([etappe.lat, etappe.lng]).addTo(map).bindPopup(popup);
    // Etappennavigation erweitern
    let link = `<a href="https://${etappe.github}.github.io/nz/" class="etappenLink" title="${etappe.titel}">${etappe.nr}</a>`;
    document.querySelector("#navigation").innerHTML += link;
}

// DOC Hütten anzeigen
for (let hut of HUTS) {
    let popup = `
      <h3>${hut.name}</h3>
      <h4>${hut.region}</h3>
      <hr>
      <p>${hut.info}</p>
      <img src="${hut.image}" alt="Vorschaubild">
      <hr>
      <a href="${hut.link}" target="Neuseeland">Link zur Hütte</a>
  `;
    L.circleMarker([hut.lat, hut.lng]).addTo(map).bindPopup(popup);
}