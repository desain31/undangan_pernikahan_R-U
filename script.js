/* ======================================================
   ELEGANT ROYAL JAVANESE WEDDING
   SCRIPT.JS
====================================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import {
getFirestore,
collection,
addDoc,
getDocs,
query,
orderBy,
serverTimestamp
}
from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyAj2l3eJaILX0MCPzHEuVGcbDy_uPnqQYM",
authDomain: "undangan-pernikahan-r-u.firebaseapp.com",
projectId: "undangan-pernikahan-r-u",
storageBucket: "undangan-pernikahan-r-u.firebasestorage.app",
messagingSenderId: "540104903970",
appId: "1:540104903970:web:fbd247f6fc3ddbf3b8297b"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


console.log("Firebase OK");
console.log(app);
console.log(db);

document.addEventListener("DOMContentLoaded", () => {

/* ======================================================
   ELEMENT
====================================================== */

const loader =
document.getElementById("loader");

const progressBar =
document.querySelector(".loading-progress");

const loadingPercent =
document.getElementById("loadingPercent");

const openingScreen =
document.getElementById("openingScreen");

const openInvitation =
document.getElementById("openInvitation");

const mainContent =
document.getElementById("mainContent");

const guestName =
document.getElementById("guestName");

const music =
document.getElementById("backgroundMusic");

const musicToggle =
document.getElementById("musicToggle");

const volumeSlider =
document.getElementById("volumeSlider");

const backToTop =
document.getElementById("backToTop");

const currentYear =
document.getElementById("currentYear");

/* ======================================================
   AUTO YEAR
====================================================== */

if(currentYear){

currentYear.textContent =
new Date().getFullYear();

}

/* ======================================================
   URL GUEST NAME
   index.html?to=Yusuf
====================================================== */

const params =
new URLSearchParams(
window.location.search
);

const guest =
params.get("to");

if(guestName){

guestName.textContent =
guest
? decodeURIComponent(guest)
: "Tamu Undangan";

}

/* ======================================================
   LOADING SCREEN
====================================================== */

let loadValue = 0;

const loadingInterval =
setInterval(() => {

loadValue++;

if(progressBar){

progressBar.style.width =
loadValue + "%";

}

if(loadingPercent){

loadingPercent.textContent =
loadValue + "%";

}

if(loadValue >= 100){

clearInterval(
loadingInterval
);

setTimeout(() => {

if(loader){

loader.style.opacity = "0";

setTimeout(() => {

loader.style.display = "none";

},800);

}

},300);

}

},20);

/* ======================================================
   OPEN INVITATION
====================================================== */

if(openInvitation){

openInvitation.addEventListener(
"click",
() => {

openingScreen.style.opacity = "0";

setTimeout(() => {

openingScreen.style.display =
"none";

},800);

if(mainContent){

mainContent.style.display =
"block";

}

if(music){

music.play();

}

window.scrollTo({

top:0,
behavior:"smooth"

});

}
);

}

/* ======================================================
   MUSIC CONTROL
====================================================== */

let musicPlaying = true;

if(musicToggle){

musicToggle.addEventListener(
"click",
() => {

if(!music) return;

if(music.paused){

music.play();

musicToggle.innerHTML = "♫";

musicPlaying = true;

}else{

music.pause();

musicToggle.innerHTML = "▶";

musicPlaying = false;

}

}
);

}

if(volumeSlider && music){

volumeSlider.addEventListener(
"input",
e => {

music.volume =
e.target.value;

}
);

}

/* ======================================================
   BACK TO TOP
====================================================== */

window.addEventListener(
"scroll",
() => {

if(window.scrollY > 500){

backToTop.style.display =
"flex";

}else{

backToTop.style.display =
"none";

}

}
);

if(backToTop){

backToTop.addEventListener(
"click",
() => {

window.scrollTo({

top:0,
behavior:"smooth"

});

}
);

}

/* ======================================================
   SCROLL PROGRESS
====================================================== */

const progress =
document.getElementById(
"scrollProgress"
);

window.addEventListener(
"scroll",
() => {

const scrollTop =
window.scrollY;

const docHeight =
document.documentElement.scrollHeight -
window.innerHeight;

const percent =
(scrollTop / docHeight) * 100;

if(progress){

progress.style.width =
percent + "%";

}

}
);

/* ======================================================
   REVEAL ANIMATION
====================================================== */

const reveals =
document.querySelectorAll(
".reveal-up,.reveal-left,.reveal-right"
);

const revealObserver =
new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add(
"reveal-active"
);

}

});

},

{
threshold:.15
}

);

reveals.forEach(item=>{

revealObserver.observe(item);

});

/* ======================================================
   ACTIVE NAV MENU
====================================================== */

const sections =
document.querySelectorAll(
"section[id]"
);

const navLinks =
document.querySelectorAll(
".nav-menu a"
);

window.addEventListener(
"scroll",
()=>{

let current = "";

sections.forEach(section=>{

const top =
section.offsetTop - 150;

const height =
section.clientHeight;

if(window.scrollY >= top){

current =
section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove(
"active"
);

if(

link.getAttribute("href")
=== "#" + current

){

link.classList.add(
"active"
);

}

});

}
);

/* ======================================================
   MOBILE MENU
====================================================== */

const mobileToggle =
document.querySelector(
".mobile-toggle"
);

const navMenu =
document.querySelector(
".nav-menu"
);

if(mobileToggle){

mobileToggle.addEventListener(
"click",
()=>{

navMenu.classList.toggle(
"active"
);

}
);

}

/* ======================================================
   CUSTOM CURSOR
====================================================== */

const cursorDot =
document.querySelector(
".cursor-dot"
);

const cursorOutline =
document.querySelector(
".cursor-outline"
);

document.addEventListener(
"mousemove",
e=>{

if(cursorDot){

cursorDot.style.left =
e.clientX + "px";

cursorDot.style.top =
e.clientY + "px";

}

if(cursorOutline){

cursorOutline.style.left =
e.clientX - 20 + "px";

cursorOutline.style.top =
e.clientY - 20 + "px";

}

}
);

/* ======================================================
   RIPPLE EFFECT
====================================================== */

document.addEventListener(
"click",
e=>{

const ripple =
document.createElement("span");

ripple.classList.add(
"ripple"
);

ripple.style.left =
e.pageX + "px";

ripple.style.top =
e.pageY + "px";

document.body.appendChild(
ripple
);

setTimeout(()=>{

ripple.remove();

},600);

}
);

/* ======================================================
   COUNTDOWN AKAD NIKAH
====================================================== */

const akadDate =
new Date("August 02, 2026 08:00:00").getTime();

function updateAkadCountdown(){

const now = new Date().getTime();

const distance =
akadDate - now;

if(distance < 0) return;

const days =
Math.floor(distance / (1000 * 60 * 60 * 24));

const hours =
Math.floor(
(distance % (1000 * 60 * 60 * 24))
/
(1000 * 60 * 60)
);

const minutes =
Math.floor(
(distance % (1000 * 60 * 60))
/
(1000 * 60)
);

const seconds =
Math.floor(
(distance % (1000 * 60))
/
1000
);

const akadDays =
document.getElementById("akadDays");

const akadHours =
document.getElementById("akadHours");

const akadMinutes =
document.getElementById("akadMinutes");

const akadSeconds =
document.getElementById("akadSeconds");

if(akadDays) akadDays.textContent = days;
if(akadHours) akadHours.textContent = hours;
if(akadMinutes) akadMinutes.textContent = minutes;
if(akadSeconds) akadSeconds.textContent = seconds;

}

setInterval(
updateAkadCountdown,
1000
);

updateAkadCountdown();

/* ======================================================
   COUNTDOWN NGUNDUH MANTU
====================================================== */

const ngunduhDate =
new Date("August 04, 2026 09:00:00").getTime();

function updateNgunduhCountdown(){

const now = new Date().getTime();

const distance =
ngunduhDate - now;

if(distance < 0) return;

const days =
Math.floor(distance / (1000*60*60*24));

const hours =
Math.floor(
(distance % (1000*60*60*24))
/
(1000*60*60)
);

const minutes =
Math.floor(
(distance % (1000*60*60))
/
(1000*60)
);

const seconds =
Math.floor(
(distance % (1000*60))
/
1000
);

const ngDays =
document.getElementById("ngDays");

const ngHours =
document.getElementById("ngHours");

const ngMinutes =
document.getElementById("ngMinutes");

const ngSeconds =
document.getElementById("ngSeconds");

if(ngDays) ngDays.textContent = days;
if(ngHours) ngHours.textContent = hours;
if(ngMinutes) ngMinutes.textContent = minutes;
if(ngSeconds) ngSeconds.textContent = seconds;

}

setInterval(
updateNgunduhCountdown,
1000
);

updateNgunduhCountdown();

/* =======================================================
   LIGHTBOX GALLERY
======================================================= */

const galleryItems =
document.querySelectorAll(".gallery-item");

const lightbox =
document.getElementById("lightbox");

const lightboxImage =
document.getElementById("lightboxImage");

const closeLightbox =
document.getElementById("closeLightbox");

galleryItems.forEach(item=>{

    item.addEventListener("click",()=>{

        const image =
        item.querySelector("img");

        lightboxImage.src =
        image.src;

        lightbox.classList.add("active");

        document.body.style.overflow =
        "hidden";

    });

});

closeLightbox.addEventListener("click",()=>{

    lightbox.classList.remove("active");

    document.body.style.overflow =
    "auto";

});

lightbox.addEventListener("click",(e)=>{

    if(e.target === lightbox){

        lightbox.classList.remove("active");

        document.body.style.overflow =
        "auto";

    }

});

/* ======================================================
   FLOATING FLOWERS
====================================================== */

const flowerContainer =
document.getElementById(
"floatingFlowers"
);

function createFlower(){

if(!flowerContainer) return;

const flower =
document.createElement("div");

flower.classList.add(
"flower-item"
);

flower.innerHTML =
'<img src="assets/image/melati.png">';

flower.style.left =
Math.random()*100 + "%";

flower.style.animationDuration =
(8 + Math.random()*10) + "s";

flower.style.opacity =
Math.random();

flowerContainer.appendChild(
flower
);

setTimeout(()=>{

flower.remove();

},18000);

}

setInterval(
createFlower,
1200
);

/* ======================================================
   FLOATING LEAVES
====================================================== */

const leafContainer =
document.getElementById(
"floatingLeaves"
);

function createLeaf(){

if(!leafContainer) return;

const leaf =
document.createElement("div");

leaf.classList.add(
"leaf-item"
);

leaf.innerHTML =
'<img src="assets/image/leaf.png">';

leaf.style.left =
Math.random()*100 + "%";

leaf.style.animationDuration =
(10 + Math.random()*10) + "s";

leafContainer.appendChild(
leaf
);

setTimeout(()=>{

leaf.remove();

},20000);

}

setInterval(
createLeaf,
2000
);

/* ======================================================
   FLOATING SPARKLES
====================================================== */

const sparkleContainer =
document.getElementById(
"floatingSparkles"
);

function createSparkle(){

if(!sparkleContainer) return;

const sparkle =
document.createElement("div");

sparkle.classList.add(
"sparkle-item"
);

sparkle.style.left =
Math.random()*100 + "%";

sparkle.style.top =
Math.random()*100 + "%";

sparkle.style.animationDuration =
(2 + Math.random()*4) + "s";

sparkleContainer.appendChild(
sparkle
);

setTimeout(()=>{

sparkle.remove();

},5000);

}

setInterval(
createSparkle,
600
);

/* ======================================================
   PETAL RAIN
====================================================== */

const petalRain =
document.getElementById(
"petalRain"
);

function createPetal(){

if(!petalRain) return;

const petal =
document.createElement("div");

petal.classList.add(
"flower-item"
);

petal.innerHTML =
'<img src="assets/image/rose-petal.png">';

petal.style.left =
Math.random()*100 + "%";

petal.style.animationDuration =
(6 + Math.random()*6) + "s";

petalRain.appendChild(
petal
);

setTimeout(()=>{

petal.remove();

},12000);

}

setInterval(
createPetal,
1500
);

/* ======================================================
   PARALLAX EFFECT
====================================================== */

const parallaxElements =
document.querySelectorAll(
".parallax-slow,.parallax-fast"
);

window.addEventListener(
"scroll",
()=>{

const scrollY =
window.pageYOffset;

parallaxElements.forEach(el=>{

const speed =
el.classList.contains(
"parallax-fast"
)
? 0.18
: 0.08;

el.style.transform =
`translateY(${scrollY * speed}px)`;

});

}
);

/* ======================================================
   FLOATING CARD EFFECT
====================================================== */

const floatingCards =
document.querySelectorAll(
".event-card,.gift-card,.timeline-card"
);

floatingCards.forEach(card=>{

card.addEventListener(
"mousemove",
e=>{

const rect =
card.getBoundingClientRect();

const x =
e.clientX - rect.left;

const y =
e.clientY - rect.top;

const rotateY =
((x / rect.width)-0.5)*10;

const rotateX =
((y / rect.height)-0.5)*-10;

card.style.transform =
`
perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-5px)
`;

}
);

card.addEventListener(
"mouseleave",
()=>{

card.style.transform =
"translateY(0)";

}
);

});

/* ======================================================
   GLOW EFFECT
====================================================== */

const glowElements =
document.querySelectorAll(
".love-circle,.count-card,.btn-premium"
);

setInterval(()=>{

glowElements.forEach(item=>{

item.style.boxShadow =
`
0 0 ${
20 + Math.random()*20
}px rgba(202,168,95,.35)
`;

});

},1500);

/* ======================================================
   COPY REKENING & GOPAY
====================================================== */

const copyButtons =
document.querySelectorAll(".copy-account");

const copyPopup =
document.getElementById("copyPopup");

copyButtons.forEach(button=>{

button.addEventListener(
"click",
()=>{

const value =
button.dataset.copy;

navigator.clipboard
.writeText(value)
.then(()=>{

showCopyPopup(
"Nomor berhasil disalin"
);

});

}
);

});

function showCopyPopup(message){

if(!copyPopup) return;

const content =
copyPopup.querySelector(
".copy-popup-content"
);

if(content){

content.textContent = message;

}

copyPopup.classList.add(
"active"
);

setTimeout(()=>{

copyPopup.classList.remove(
"active"
);

},2500);

}

/* ======================================================
RSVP + UCAPAN FIREBASE
====================================================== */

const rsvpForm =
document.getElementById(
"rsvpForm"
);

const wishContainer =
document.getElementById(
"wishContainer"
);

let wishes = [];

let showAllWishes = false;

/* ======================================================
LOAD DATA DARI FIREBASE
====================================================== */

async function loadWishes(){

    console.log("loadWishes jalan");
    console.log("db =", db);

    if(!wishContainer) return;

    wishes = [];

    try{

        const q = query(
            collection(db, "wishes"),
            orderBy("timestamp", "desc")
        );

        const snapshot = await getDocs(q);

        console.log("GET DOCS SELESAI");
        console.log("Jumlah data:", snapshot.size);

        snapshot.forEach(doc => {

            wishes.push(doc.data());

        });

        console.log("Isi wishes:", wishes);

        renderWishes();

    }catch(err){

        console.error("FIRESTORE ERROR:", err);

    }

}

/* ======================================================
RENDER UCAPAN
====================================================== */

function renderWishes(){

if(!wishContainer) return;

wishContainer.innerHTML = "";

const reversedWishes =
[...wishes].reverse();

const displayedWishes =
showAllWishes
? reversedWishes
: reversedWishes.slice(0,5);

displayedWishes.forEach(item=>{

const card =
document.createElement("div");

card.className =
"wish-card";

const avatar =
item.name
.charAt(0)
.toUpperCase();

card.innerHTML = `

<div class="wish-avatar">
${avatar}
</div>

<div class="wish-content">

<h4>
${item.name}
</h4>

<div class="wish-date">
${item.date}
</div>

<p>
${item.message}
</p>

</div>

`;

wishContainer.appendChild(
card
);

});

}

/* ======================================================
TOMBOL LIHAT SEMUA
====================================================== */

const toggleButton =
document.getElementById(
"toggleWishes"
);

if(toggleButton){

toggleButton.addEventListener(
"click",
()=>{

showAllWishes =
!showAllWishes;

toggleButton.textContent =
showAllWishes
? "Tampilkan Lebih Sedikit"
: "Lihat Semua Ucapan";

renderWishes();

}
);

}

/* ======================================================
SUBMIT RSVP
====================================================== */

if(rsvpForm){

rsvpForm.addEventListener(
"submit",
async e=>{

e.preventDefault();

const name =
document.getElementById(
"guestInput"
).value;

const attendance =
document.getElementById(
"attendanceInput"
).value;

const status =
document.getElementById(
"statusInput"
).value;

const wish =
document.getElementById(
"wishInput"
).value;

const data = {

name:name,

attendance:attendance,

status:status,

message:wish,

date:
new Date().toLocaleDateString(
"id-ID",
{
day:"numeric",
month:"long",
year:"numeric"
}
)

};

await addDoc(
collection(
db,
"wishes"
),
data
);

await loadWishes();

rsvpForm.reset();

showCopyPopup(
"Ucapan berhasil dikirim"
);

}
);

}

/* ======================================================
LOAD SAAT HALAMAN DIBUKA
====================================================== */

loadWishes();


/* ======================================================
   SHARE UNDANGAN
====================================================== */

const shareButton =
document.getElementById(
"shareButton"
);

const sharePopup =
document.getElementById(
"sharePopup"
);

if(shareButton){

shareButton.addEventListener(
"click",
async()=>{

if(navigator.share){

try{

await navigator.share({

title:
"Undangan Pernikahan",

text:
"Undangan Pernikahan Kami",

url:
window.location.href

});

}catch(err){}

}else{

showSharePopup();

}

}
);

}

function showSharePopup(){

if(!sharePopup) return;

sharePopup.classList.add(
"active"
);

setTimeout(()=>{

sharePopup.classList.remove(
"active"
);

},2500);

}

/* ======================================================
   COPY LINK
====================================================== */

const copyLinkButton =
document.getElementById(
"copyLinkButton"
);

if(copyLinkButton){

copyLinkButton.addEventListener(
"click",
()=>{

navigator.clipboard
.writeText(
window.location.href
)
.then(()=>{

showCopyPopup(
"Link undangan berhasil disalin"
);

});

}
);

}

/* ======================================================
   WHATSAPP SHARE
====================================================== */

const whatsappButton =
document.getElementById(
"whatsappButton"
);

if(whatsappButton){

whatsappButton.addEventListener(
"click",
e=>{

e.preventDefault();

const url =
encodeURIComponent(
window.location.href
);

const text =
encodeURIComponent(
"Assalamu'alaikum, kami mengundang Anda untuk hadir dalam acara pernikahan kami."
);

window.open(

`https://wa.me/?text=${text}%20${url}`,

"_blank"

);

}
);

}

/* ======================================================
   SAVE TO CALENDAR
====================================================== */

const calendarBtn =
document.getElementById(
"calendarBtn"
);

if(calendarBtn){

calendarBtn.addEventListener(
"click",
e=>{

e.preventDefault();

const start =
"20261212T080000";

const end =
"20261212T120000";

const title =
encodeURIComponent(
"Pernikahan Ahmad & Aisyah"
);

const details =
encodeURIComponent(
"Acara Pernikahan"
);

const location =
encodeURIComponent(
"Pendopo Agung Jawa"
);

const googleCalendarUrl =

`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;

window.open(
googleCalendarUrl,
"_blank"
);

}
);

}

/* ======================================================
   AUTO CLOSE MOBILE MENU
====================================================== */

const navMenuLinks =
document.querySelectorAll(
".nav-menu a"
);

navMenuLinks.forEach(link=>{

link.addEventListener(
"click",
()=>{

const navMenu =
document.querySelector(
".nav-menu"
);

if(navMenu){

navMenu.classList.remove(
"active"
);

}

}
);

});

/* ======================================================
   LAZY LOADING ENHANCEMENT
====================================================== */

const lazyImages =
document.querySelectorAll(
"img"
);

const lazyObserver =
new IntersectionObserver(

(entries,observer)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const img =
entry.target;

if(img.dataset.src){

img.src =
img.dataset.src;

}

observer.unobserve(img);

}

});

},
{
rootMargin:"100px"
}

);

lazyImages.forEach(img=>{

lazyObserver.observe(img);

});

/* ======================================================
   PERFORMANCE OPTIMIZATION
====================================================== */

window.addEventListener(
"load",
()=>{

document.body.classList.add(
"loaded"
);

});

/* ======================================================
   DISABLE RIGHT CLICK (OPTIONAL)
====================================================== */

/*
document.addEventListener(
"contextmenu",
e=>e.preventDefault()
);
*/

/* ======================================================
   PRELOAD MUSIC
====================================================== */

const bgMusic =
document.getElementById(
"backgroundMusic"
);

if(bgMusic){

bgMusic.preload =
"auto";

bgMusic.volume = .5;

}

/* ======================================================
   FINAL INIT
====================================================== */

console.log(
"Elegant Royal Javanese Wedding Loaded Successfully"
);
});