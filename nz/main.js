/* Neuseelandreise Skript */


let zoom = 11;
let coords = [
    ETAPPEN[9].lat,
    ETAPPEN[9].lng
];



let map = L.map('map').setView(coords, zoom);

let startlayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

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
    let navClass = "etappenLink"
    let mrk = L.marker([etappe.lat, etappe.lng]).addTo(map).bindPopup(popup);
    if (etappe.nr == 9){
        mrk.openPopup();
        navClass="etappenLink etappeAktuell"
    }
    // Etappennavigation erweitern
    let link = `<a href="https://${etappe.github}.github.io/nz/" class="${navClass}" title="${etappe.titel}">${etappe.nr}</a>`;
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

    let statusColor
    if (hut.open == true){
        statusColor = "green"
    } else {
        statusColor = "red"
    }
    L.circleMarker([hut.lat, hut.lng], {
        color: statusColor
    }).addTo(map).bindPopup(popup);
}

// Metrischen Maßstab hinzufügen
L.control.scale({
    imperial: false
}).addTo(map);

// Layer Control mit verschiedenen Layern 
let layerControl = L.control.layers({
    "Open Street Map" : startLayer,
    "Basemap Standard" : L.tileLayer.provider("BasemapAT.grau"),
    "Basemap Terrain" : L.tileLayer.provider("BasemapAT.terrain"),
    "Basemap Surface" : L.tileLayer.provider("BasemapAT.surface"),
    "Basemap Beschriftung" : L.tileLayer.provider("BasemapAT.overlay"),
    "Basemap Orthofoto" : L.tileLayer.provider("BasemapAT.orthofoto"),
    "Basemap Orthofoto mit Beschriftung" : L.layerGroup([L.tileLayer.provider("BasemapAT.orthofoto"),
    L.tileLayer.provider("BasemapAT.overlay")])
}).addTo(map)