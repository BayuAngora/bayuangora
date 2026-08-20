if ("serviceWorker" in navigator) {
navigator.serviceWorker.register("/static/service.js") .then(function () {
navigator.serviceWorker.ready.then(async function (registration) {
if ("sync" in registration) {
registration.sync.register("sync").catch(function (err) {
console.warn("Background sync is disabled.");});} try {
if ("periodicSync" in registration) {
const periodicSyncPermission = await navigator.permissions.query({
name: "periodic-background-sync",});
if (periodicSyncPermission.state === "granted") {
await registration.periodicSync.register("fetch-new-content", {
minInterval: 24 * 60 * 60 * 1000,});}}} catch (error) {
console.warn("Periodic sync is disabled.");}});}) .catch(function (error) {
console.warn("Service Worker registration was blocked or failed:", error);});}

document.addEventListener("DOMContentLoaded", function () {
const shareBtn = document.getElementById("share");
if (shareBtn) {shareBtn.addEventListener("click", function () {
if (navigator.share) {navigator.share({
title: "Bayu Angora", url: window.location.href, }) .then(() => 
console.log("Thanks")) .catch(console.error);}});}

const darkBtn = document.getElementById("dark");
const lightBtn = document.getElementById("light");
function setMode(isDark) {if (isDark) {
if (lightBtn) lightBtn.style.display = "block";
if (darkBtn) darkBtn.style.display = "none";
localStorage.setItem("preferredTheme", "dark");} else {
if (lightBtn) lightBtn.style.display = "none";
if (darkBtn) darkBtn.style.display = "block";
localStorage.removeItem("preferredTheme");}
document.body.classList.toggle("mode", isDark);}
if (localStorage.getItem("preferredTheme") === "dark") {setMode(true);}
if (darkBtn) {darkBtn.addEventListener("click", function () {setMode(true); });}
if (lightBtn) {lightBtn.addEventListener("click", function () {setMode(false);});}});

const board = document.getElementById("board");
if (board) {const emojis =
["🏜", "🏞", "🌃", "🌄", "🌇", "🌉", "🌌", "🎑"];
const $ = id => document.getElementById(id);
let firstCard, lockBoard, moves, matches; const updateStats = () => {
$("moves").textContent = moves; $("matches").textContent = matches;};
const initGame = () => {firstCard = lockBoard = null;
moves = matches = 0; updateStats();
board.innerHTML = [...emojis, ...emojis] .sort(() => Math.random() - 0.5) .map(e => `
<div class="card" data-e="${e}">
<div class="card-face card-front">${e}</div>
<div class="card-face card-back"></div></div> `)
.join("");}; $("restart") .addEventListener("click", initGame);
board.addEventListener("click", e => {const card = e.target.closest(".card");
if (!card || lockBoard || card === firstCard || card.classList.contains("flip")) 
return; card.classList.add("flip");
if (!firstCard) return (firstCard = card); moves++;
if (firstCard.dataset.e === card.dataset.e) {firstCard = null;
if (++matches === 8) setTimeout(() => 
alert(`✨ Score 8 / ${moves} Moves ✨`), 1000); } else {
lockBoard = true; setTimeout(() => {
firstCard.classList.remove("flip"); card.classList.remove("flip");
firstCard = lockBoard = null; }, 1000);} updateStats();});
initGame();}
