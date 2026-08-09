if ("serviceWorker" in navigator) {
navigator.serviceWorker.register("/service.js");
navigator.serviceWorker.ready.then(async function (registration) {
if ("sync" in registration) {
registration.sync.register("sync").catch(function (err) {
console.warn("Background Sync is disabled in this environment.");
});
} try {
if ("periodicSync" in registration) {
const periodicSyncPermission = await navigator.permissions.query({
name: "periodic-background-sync",
});
if (periodicSyncPermission.state === "granted") {
await registration.periodicSync.register("fetch-new-content", {
minInterval: 24 * 60 * 60 * 1000,
});}}
} catch (error) {
console.warn("Periodic Sync is disabled in this environment.");
}});}

document.addEventListener("DOMContentLoaded", function () {
const shareBtn = document.getElementById("share");
if (shareBtn) { 
shareBtn.addEventListener("click", function () {
if (navigator.share) {
navigator.share({
title: "Bayu Angora",
url: window.location.href,
})
.then(() => console.log("Thanks"))
.catch(console.error);
}});}
  
const darkBtn = document.getElementById("dark");
const lightBtn = document.getElementById("light");
function setMode(isDark) {
if (isDark) {
if (lightBtn) lightBtn.style.display = "block";
if (darkBtn) darkBtn.style.display = "none";
localStorage.setItem("preferredTheme", "dark");
} else {
if (lightBtn) lightBtn.style.display = "none";
if (darkBtn) darkBtn.style.display = "block";
localStorage.removeItem("preferredTheme");}
document.body.classList.toggle("mode", isDark);}
if (localStorage.getItem("preferredTheme") === "dark") {
setMode(true);}
if (darkBtn) {
darkBtn.addEventListener("click", function () {
setMode(true);
});}
if (lightBtn) {
lightBtn.addEventListener("click", function () {
setMode(false);
});}});

const emojis = ["🐅", "🐎", "🐂", "🐘", "🐊", "🐍", "🐢", "🐧"];
let hasFlippedCard = false, lockBoard = false;
let firstCard = null, secondCard = null;
let moves = 0, matches = 0;
const board = document.getElementById("board");
const movesEl = document.getElementById("moves");
const matchesEl = document.getElementById("matches");
board.addEventListener("click", (e) => {
const clickedCard = e.target.closest(".card");
if (!clickedCard || lockBoard || clickedCard === 
firstCard || clickedCard.classList.contains("flip"))
  return;
flipCard(clickedCard);});
function initGame() {
[hasFlippedCard, lockBoard] = [false, false];
[firstCard, secondCard] = [null, null];
moves = 0;
matches = 0;
updateStats();
board.innerHTML = "";
let cards = [...emojis, ...emojis];
for (let i = cards.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
[cards[i], cards[j]] = [cards[j], cards[i]];}
const fragment = document.createDocumentFragment();
cards.forEach(emoji => {
const cardElement = document.createElement("div");
cardElement.className = "card";
cardElement.dataset.emoji = emoji;
cardElement.innerHTML = `
<div class="card-face card-front">${emoji}</div>
<div class="card-face card-back"></div>`;
fragment.appendChild(cardElement);});
board.appendChild(fragment);}
function flipCard(card) {
card.classList.add("flip");
if (!hasFlippedCard) {
hasFlippedCard = true;
firstCard = card;
return;}
secondCard = card;
moves++;
updateStats();
checkForMatch();}
function checkForMatch() {
const isMatch = 
firstCard.dataset.emoji === 
secondCard.dataset.emoji;
if (isMatch) {
matches++;
updateStats();
resetBoard();
if (matches === 8) {
setTimeout(() => alert(`Won in ${moves} Moves!`), 500);}
} else {
lockBoard = true;
setTimeout(() => {
firstCard.classList.remove("flip");
secondCard.classList.remove("flip");
resetBoard();
}, 1000);}}
function resetBoard() {
[hasFlippedCard, lockBoard] = [false, false];
[firstCard, secondCard] = [null, null];}
function updateStats() {
movesEl.textContent = moves;
matchesEl.textContent = matches;}
initGame();
