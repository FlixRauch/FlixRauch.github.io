/* Neuseelandreise Skript */

let lat = -43.443767;
let lng = 170.173520;
let zoom = 11;
let coords = [-39.13, 175.65];

let popup = `
    <h3>${ETAPPEN[0].titel} (Etappe ${ETAPPEN[0].nr})</h3>
    <ul>
        <li>geogr. Länge: ${ETAPPEN[0].lng}</li>
        <li>geogr. Breite: ${ETAPPEN[0].lat}</li>
        <li><a href="${ETAPPEN[0].wikipedia}">Link zur Wikipediaseite</a></li>
        <li><a href="${ETAPPEN[0].github}">Link zur Etappenseite</a></li>
    </ul>
`;
let map = L.map('map').setView(coords, zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([lat, lng]).addTo(map)
    .bindPopup(popup)
    .openPopup();

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
}

// DOC Hütten anzeigen
for (let hut of HUTS) {
    L.circleMarker([hut.lat, hut.lng]).addTo(map);
}