/* Neuseelandreise Skript */

var map = L.map('map').setView([-43.443767, 170.173520], 11);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([-43.443767, 170.173520]).addTo(map)
    .bindPopup('<h3>Franz-Josef-Gletscher</h3>')
    .openPopup();