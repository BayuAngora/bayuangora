let urlToPreload;
let mouseoverTimer;
let lastTouchTimestamp;
const prefetcher=document.createElement("link");
const isSupported=prefetcher.relList&&prefetcher.relList.supports&&prefetcher.relList.supports("prefetch");
const isDataSaverEnabled=navigator.connection&&navigator.connection.saveData;
const allowQueryString="instantAllowQueryString" in document.body.dataset;
const allowExternalLinks="instantAllowExternalLinks" in document.body.dataset;
const useWhitelist="instantWhitelist" in document.body.dataset;
let delayOnHover=60;
let useMousedown=!1;
let useMousedownOnly=!1;
if("instantIntensity" in document.body.dataset){if(document.body.dataset.instantIntensity.substr(0,"mousedown".length)==="mousedown"){useMousedown=!0;
if(document.body.dataset.instantIntensity==="mousedown-only"){useMousedownOnly=!0;}}
else{const milliseconds=parseInt(document.body.dataset.instantIntensity);
if(milliseconds!==isNaN){delayOnHover=milliseconds;}}}
if(isSupported&&!isDataSaverEnabled){prefetcher.rel="prefetch";
document.head.appendChild(prefetcher);
const eventListenersOptions={capture:!0,passive:!0,};
if(!useMousedownOnly){document.addEventListener("touchstart",touchstartListener,eventListenersOptions);}
if(!useMousedown){document.addEventListener("mouseover",mouseoverListener,eventListenersOptions);}
else{document.addEventListener("mousedown",mousedownListener,eventListenersOptions);}}
function touchstartListener(event){lastTouchTimestamp=performance.now();
const linkElement=event.target.closest("a");
if(!isPreloadable(linkElement)){return;}
linkElement.addEventListener("touchcancel",touchendAndTouchcancelListener,{passive:!0});
linkElement.addEventListener("touchend",touchendAndTouchcancelListener,{passive:!0});
urlToPreload=linkElement.href;
preload(linkElement.href);}
function touchendAndTouchcancelListener(){urlToPreload=undefined;
stopPreloading();}
function mouseoverListener(event){if(performance.now()-lastTouchTimestamp<1100){return;}
const linkElement=event.target.closest("a");
if(!isPreloadable(linkElement)){return;}
linkElement.addEventListener("mouseout",mouseoutListener,{passive:!0});
urlToPreload=linkElement.href;
mouseoverTimer=setTimeout(() => {preload(linkElement.href);
mouseoverTimer=undefined;},delayOnHover);}
function mousedownListener(event){const linkElement=event.target.closest("a");
if(!isPreloadable(linkElement)){return;}
linkElement.addEventListener("mouseout",mouseoutListener,{passive:!0});
urlToPreload=linkElement.href;
preload(linkElement.href);}
function mouseoutListener(event){if(event.relatedTarget&&event.target.closest("a")===event.relatedTarget.closest("a")){return;}
if(mouseoverTimer){clearTimeout(mouseoverTimer);
mouseoverTimer=undefined;}
urlToPreload=undefined;
stopPreloading();}
function isPreloadable(linkElement){if(!linkElement||!linkElement.href){return;}
if(urlToPreload===linkElement.href){return;}
if(useWhitelist&&!("instant" in linkElement.dataset)){return;}
if(!allowExternalLinks&&linkElement.origin!==location.origin&&!("instant" in linkElement.dataset)){return;}
if(!["http:","https:"].includes(linkElement.protocol)){return;}
if(linkElement.protocol==="http:"&&location.protocol==="https:"){return;}
if(!allowQueryString&&linkElement.search&&!("instant" in linkElement.dataset)){return;}
if(linkElement.hash&&linkElement.pathname+linkElement.search===location.pathname+location.search){return;}
if("noInstant" in linkElement.dataset){return;}
return!0;}
function preload(url){prefetcher.href=url;}
function stopPreloading(){prefetcher.removeAttribute("href");}
