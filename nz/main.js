/* Neuseelandreise Skript */


let zoom = 11;
let coords = [
    ETAPPEN[9].lat,
    ETAPPEN[9].lng
];



let map = L.map('map').setView(coords, zoom);

//Startlayer
let startlayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

//Layercontrol
let layerControl = L.control.layers({
    "Openstreetmap": startlayer,
    "Topographie": L.tileLayer.provider("OpenTopoMap"),
    "Satellite images": L.tileLayer.provider("USGS.USImagery")

}).addTo(map);

//Minimap
let miniMap = new L.Control.MiniMap(
    L.tileLayer.provider("OpenStreetMap.Mapnik")

).addTo(map);



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
    if (etappe.nr == 9) {
        mrk.openPopup();
        navClass = "etappenLink etappeAktuell"
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
    if (hut.open == true) {
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

//Fullscreen
L.control.fullscreen().addTo(map);

layerControl.expand();