if ("serviceWorker" in navigator){
navigator.serviceWorker.register("/service.js");}
navigator.serviceWorker.ready.then(function(registration){
registration.sync.register("sync").then(function(){},
function(){});});

const share = document.getElementById("share");
share.addEventListener("click", event => {
if (navigator.share) { navigator.share({
title: "Bayu Angora", url: "" }).then(() => {
console.log("Thanks");}) .catch(console.error);}});

if (localStorage.getItem("preferredTheme")==="dark")
{setMode(true);}
function setMode(isDark) {
var dark=document.getElementById("dark");
var light=document.getElementById("light");
if (isDark){light.style.display="block";
dark.style.display="none";
localStorage.setItem("preferredTheme","dark");
} else {
dark.style.display="block";
light.style.display="none";
localStorage.removeItem("preferredTheme");}
document.body.classList.toggle("mode");}
document.getElementById("dark").addEventListener("click", 
function() {setMode(true);});
document.getElementById("light").addEventListener("click", 
function() {setMode(false);});

function flyingPages(){const e=new Set,t=new Set,n=document.createElement("link"),o=n.relList&&n.relList.supports&&n.relList.supports("prefetch")&&window.IntersectionObserver&&"isIntersecting"in IntersectionObserverEntry.prototype;if(navigator.connection&&(navigator.connection.saveData||(navigator.connection.effectiveType||"").includes("2g"))||!o)return;const r=e=>{const t=setTimeout((()=>f()),1e3);(e=>new Promise(((t,n)=>{const o=document.createElement("link");o.rel="prefetch",o.href=e,o.onload=t,o.onerror=n,document.head.appendChild(o)})))(e).catch((()=>f())).finally((()=>clearTimeout(t)))},i=(n,o=!1)=>{if(t.has(n)||e.has(n))return;const i=window.location.origin;if(n.substring(0,i.length)===i&&window.location.href!==n){for(let e=0;e<window.FPConfig.ignoreKeywords.length;e++)if(n.includes(window.FPConfig.ignoreKeywords[e]))return;o?(r(n),t.add(n)):e.add(n)}},s=new IntersectionObserver((e=>{e.forEach((e=>{if(e.isIntersecting){const t=e.target.href;i(t,!window.FPConfig.maxRPS)}}))}));let a=null;const c=e=>{const n=e.target.closest("a");n&&n.href&&!t.has(n.href)&&(a=setTimeout((()=>{i(n.href,!0)}),window.FPConfig.hoverDelay))},d=e=>{const n=e.target.closest("a");n&&n.href&&!t.has(n.href)&&i(n.href,!0)},l=e=>{const n=e.target.closest("a");n&&n.href&&!t.has(n.href)&&clearTimeout(a)},u=window.requestIdleCallback||function(e){const t=Date.now();return setTimeout((function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-t))}})}),1)},f=()=>{document.querySelectorAll("a").forEach((e=>s.unobserve(e))),e.clear(),document.removeEventListener("mouseover",c,!0),document.removeEventListener("mouseout",l,!0),document.removeEventListener("touchstart",d,!0)};window.FPConfig=Object.assign({delay:0,hoverDelay:0,maxRPS:20,ignoreKeywords:[]},window.FPConfig),setInterval((()=>{Array.from(e).slice(0,window.FPConfig.maxRPS).forEach((n=>{r(n),t.add(n),e.delete(n)}))}),1e3),u((()=>setTimeout((()=>document.querySelectorAll("a").forEach((e=>s.observe(e)))),1e3*window.FPConfig.delay)));const m={capture:!0,passive:!0};document.addEventListener("mouseover",c,m),document.addEventListener("mouseout",l,m),document.addEventListener("touchstart",d,m)}
flyingPages();
