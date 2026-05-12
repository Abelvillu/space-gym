// =========================
// SPACE GYM MAP SYSTEM
// =========================

const map = L.map('map',{
    zoomControl:true
}).setView([40.4168,-3.7038],6);

// =========================
// MAPES
// =========================

const darkMap = L.tileLayer(
'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
{
    attribution:'© OpenStreetMap © CARTO'
});

const lightMap = L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{
    attribution:'© OpenStreetMap'
});

darkMap.addTo(map);

// =========================
// CLUSTER
// =========================

const markers = L.markerClusterGroup({

spiderfyOnMaxZoom:true,
showCoverageOnHover:false,
zoomToBoundsOnClick:true

});

// =========================
// ICONA CUSTOM
// =========================

const gymIcon = L.icon({

iconUrl:'https://cdn-icons-png.flaticon.com/512/684/684908.png',

iconSize:[42,42],
iconAnchor:[21,42],
popupAnchor:[0,-40]

});

// =========================
// GYMS
// =========================

const gyms = [

{
name:"SPACE GYM Barcelona Elite",
coords:[41.3874,2.1686],
address:"Passeig de Gràcia 92",
rating:"4.9",
phone:"+34 900 111 222",

image:"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop"
},

{
name:"SPACE GYM Madrid Luxury",
coords:[40.4168,-3.7038],
address:"Calle Serrano 55",
rating:"4.8",
phone:"+34 900 333 444",

image:"https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1200&auto=format&fit=crop"
},

{
name:"SPACE GYM València Tech",
coords:[39.4699,-0.3763],
address:"Avinguda França 21",
rating:"5.0",
phone:"+34 900 777 888",

image:"https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1200&auto=format&fit=crop"
},

{
name:"SPACE GYM Sevilla Prime",
coords:[37.3891,-5.9845],
address:"Calle Rioja 11",
rating:"4.9",
phone:"+34 900 222 555",

image:"https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop"
},

{
name:"SPACE GYM Bilbao Titanium",
coords:[43.2630,-2.9350],
address:"Gran Via 33",
rating:"5.0",
phone:"+34 900 888 999",

image:"https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop"
}

];

// =========================
// AFEGIR GIMNASOS
// =========================

gyms.forEach(gym => {

const marker = L.marker(gym.coords,{
icon:gymIcon
});

marker.bindPopup(`

<div class="popup-card">

<img src="${gym.image}"
class="popup-image">

<div class="popup-content">

<h3>${gym.name}</h3>

<p>${gym.address}</p>

<p>
<strong>Tel:</strong>
${gym.phone}
</p>

<p>
⭐ ${gym.rating}
</p>

<p>
Accés Premium 24/7
</p>

<button class="popup-btn">

Explorar Club

</button>

</div>

</div>

`);

markers.addLayer(marker);

});

map.addLayer(markers);

// =========================
// GEOLOCALITZACIÓ
// =========================

document.querySelector('.locate-btn')

.addEventListener('click',()=>{

map.locate({
setView:true,
maxZoom:12
});

});

map.on('locationfound',(e)=>{

L.circleMarker(e.latlng,{

radius:12,
color:'#00d2ff',
fillColor:'#00d2ff',
fillOpacity:1

})

.addTo(map)

.bindPopup('La teva ubicació')
.openPopup();

});

// =========================
// DARK / LIGHT MAP
// =========================

let dark = true;

document.getElementById('toggleMap')

.addEventListener('click',()=>{

if(dark){

map.removeLayer(darkMap);
lightMap.addTo(map);

}else{

map.removeLayer(lightMap);
darkMap.addTo(map);

}

dark = !dark;

});

// =========================
// FLY TO GYM
// =========================

function flyToGym(lat,lng){

map.flyTo([lat,lng],15,{
duration:3
});

}

// =========================
// SEARCH
// =========================

const searchInput = document.querySelector('.search-input');

searchInput.addEventListener('keyup',(e)=>{

const value = e.target.value.toLowerCase();

document.querySelectorAll('.club-card')

.forEach(card=>{

const text = card.innerText.toLowerCase();

if(text.includes(value)){

card.style.display='block';

}else{

card.style.display='none';

}

});

});

// =========================
// INTRO ANIMATION
// =========================

setTimeout(()=>{

map.flyTo([41.3874,2.1686],11,{
duration:4
});

},2500);
// =========================
// REVEAL ANIMATIONS
// =========================

const reveals = document.querySelectorAll(
'.feature-card,.stats-card,.plan-card,.gallery-img,.club-card'
);

window.addEventListener('scroll',()=>{

reveals.forEach((el)=>{

const windowHeight = window.innerHeight;

const revealTop = el.getBoundingClientRect().top;

const revealPoint = 120;

if(revealTop < windowHeight - revealPoint){

el.classList.add('active');
el.classList.add('reveal');

}

});

});

// =========================
// PREMIUM NAVBAR EFFECT
// =========================

window.addEventListener('scroll',()=>{

const navbar =
document.querySelector('.custom-navbar');

if(window.scrollY > 50){

navbar.classList.add('scrolled');

}else{

navbar.classList.remove('scrolled');

}

});

// =========================
// SMOOTH SCROLL
// =========================

document.querySelectorAll('a[href^="#"]')

.forEach(anchor=>{

anchor.addEventListener('click',function(e){

e.preventDefault();

document.querySelector(
this.getAttribute('href')

).scrollIntoView({

behavior:'smooth'

});

});

});

// =========================
// WOW INTRO
// =========================

window.addEventListener('load',()=>{

document.body.style.opacity='1';

});

// =========================
// PREMIUM MAP ZOOM FX
// =========================

if(typeof map !== 'undefined'){

map.on('zoomend',()=>{

const zoom = map.getZoom();

if(zoom > 12){

map.getContainer().style.filter =
'brightness(1.05) saturate(1.15)';

}else{

map.getContainer().style.filter =
'brightness(1) saturate(1)';

}

});

}