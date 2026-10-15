document.documentElement.classList.add('js');
if(document.getElementById('menue')){
/* Menü: öffnen per Klick, schließen per Escape, Klick außerhalb, Schließen-Knopf */
const m=document.getElementById('menue'),burger=m.querySelector('.burger'),lis=[...m.querySelectorAll('.punkte>li')].filter(l=>l.querySelector('.tafel'));
function zu(ausser){lis.forEach(l=>{if(l!==ausser){l.classList.remove('offen');l.querySelector('button').setAttribute('aria-expanded','false')}})}
lis.forEach(l=>{const b=l.querySelector('button');
 b.addEventListener('click',e=>{e.stopPropagation();const o=!l.classList.contains('offen');zu(l);l.classList.toggle('offen',o);b.setAttribute('aria-expanded',o)});
 l.querySelector('.schliessen').addEventListener('click',()=>{zu();b.focus()})});
document.addEventListener('click',e=>{if(!m.contains(e.target))zu()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const o=lis.find(l=>l.classList.contains('offen'));zu();if(o)o.querySelector('button').focus()}});
burger.addEventListener('click',()=>{const o=m.classList.toggle('mobil');burger.setAttribute('aria-expanded',o);burger.textContent=o?'Schließen':'Menü';if(!o)zu()});
m.querySelectorAll('.punkte a').forEach(a=>a.addEventListener('click',()=>{zu();m.classList.remove('mobil');burger.setAttribute('aria-expanded','false');burger.textContent='Menü'}));

}

/* Kopf-Video: nur breit, ohne Bewegungs-/Datensparwunsch, erst nach dem Laden, mit Pause-Knopf */
const v=document.getElementById('film'),pz=document.getElementById('pause');
const darf=matchMedia('(min-width:1024px)').matches&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&!(navigator.connection&&navigator.connection.saveData);
if(v&&pz&&darf){
 addEventListener('load',()=>{v.innerHTML='<source src="v/hero-loop-interview.mp4" type="video/mp4">';v.load();
  v.addEventListener('playing',()=>{v.classList.add('laeuft');pz.hidden=false},{once:true});v.play().catch(()=>{})});
 pz.addEventListener('click',()=>{if(v.paused){v.play();pz.textContent='❚❚';pz.setAttribute('aria-label','Video anhalten')}else{v.pause();pz.textContent='▶';pz.setAttribute('aria-label','Video abspielen')}});
 new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)v.pause();else if(pz.textContent==='❚❚')v.play().catch(()=>{})})).observe(v);
}

/* Einblenden und einmaliger Glanz auf den Glaskacheln */
const ruhig=matchMedia('(prefers-reduced-motion: reduce)').matches;
const els=document.querySelectorAll('.auf,.glas');
if('IntersectionObserver' in window&&!ruhig){
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('da');if(e.target.classList.contains('glas'))e.target.classList.add('gezeigt');io.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px'});
 els.forEach(e=>io.observe(e));
}else els.forEach(e=>e.classList.add('da'));

/* Situationsslider: Knöpfe, Pfeiltasten, Wischen (nativ), Positionsangabe, keine Schleife */
(function(){
 const spur=document.getElementById('sit-spur');if(!spur)return;
 const karten=[...spur.children],pos=document.getElementById('sit-pos'),zur=document.getElementById('sit-zurueck'),vor=document.getElementById('sit-vor');
 let akt=0,gezeigt=false;
 const schritt=()=>karten[1].offsetLeft-karten[0].offsetLeft;
 function lage(){
  const i=Math.round(spur.scrollLeft/schritt());akt=Math.max(0,Math.min(karten.length-1,i));
  const sichtbar=Math.max(1,Math.floor((spur.clientWidth+24)/schritt()));
  const ende=spur.scrollLeft+spur.clientWidth>=spur.scrollWidth-4;
  if(ende)akt=Math.max(akt,karten.length-sichtbar);
  const bis=Math.min(akt+sichtbar,karten.length);pos.textContent=(sichtbar>1?(akt+1)+'–'+bis:(akt+1))+' / '+karten.length;
  zur.disabled=spur.scrollLeft<=4;vor.disabled=ende;
  karten.forEach((k,j)=>{k.classList.toggle('aktiv',j===akt);if(j!==akt)k.classList.remove('reflex')});
  if(gezeigt&&!karten[akt].dataset.glanz&&!ruhig){karten[akt].dataset.glanz='1';karten[akt].classList.add('reflex')}
 }
 function geh(d){spur.scrollTo({left:Math.max(0,(akt+d))*schritt(),behavior:ruhig?'auto':'smooth'})}
 zur.addEventListener('click',()=>geh(-1));vor.addEventListener('click',()=>geh(1));
 spur.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();geh(1)}else if(e.key==='ArrowLeft'){e.preventDefault();geh(-1)}else if(e.key==='Home'){e.preventDefault();spur.scrollTo({left:0})}else if(e.key==='End'){e.preventDefault();spur.scrollTo({left:spur.scrollWidth})}});
 let t;spur.addEventListener('scroll',()=>{clearTimeout(t);t=setTimeout(lage,60)},{passive:true});
 addEventListener('resize',lage);
 /* Lichtreflex nur einmal beim ersten Sichtbarwerden */
 if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){gezeigt=true;lage();io.disconnect()}},{threshold:.4});io.observe(spur)}
 lage();
})();

/* Manuelle Kartenreihen [data-reihe]: Knöpfe, Pfeiltasten, Wischen, Positionsangabe, keine Schleife, kein Autoplay */
document.querySelectorAll('[data-reihe]').forEach(spur=>{
 const sek=spur.closest('section'),karten=[...spur.children],pos=sek.querySelector('[data-pos]'),zur=sek.querySelector('[data-zurueck]'),vor=sek.querySelector('[data-vor]');
 if(karten.length<2)return;let akt=0;
 const schritt=()=>karten[1].offsetLeft-karten[0].offsetLeft;
 function lage(){
  akt=Math.max(0,Math.min(karten.length-1,Math.round(spur.scrollLeft/schritt())));
  const sichtbar=Math.max(1,Math.floor((spur.clientWidth+24)/schritt()));
  const ende=spur.scrollLeft+spur.clientWidth>=spur.scrollWidth-4;if(ende)akt=Math.max(akt,karten.length-sichtbar);
  const bis=Math.min(akt+sichtbar,karten.length);
  pos.textContent=(sichtbar>1?(akt+1)+'–'+bis:(akt+1))+' / '+karten.length;
  zur.disabled=spur.scrollLeft<=4;vor.disabled=ende;
 }
 const geh=d=>spur.scrollTo({left:Math.max(0,akt+d)*schritt(),behavior:ruhig?'auto':'smooth'});
 zur.addEventListener('click',()=>geh(-1));vor.addEventListener('click',()=>geh(1));
 spur.addEventListener('keydown',e=>{if(e.target!==spur)return;if(e.key==='ArrowRight'){e.preventDefault();geh(1)}else if(e.key==='ArrowLeft'){e.preventDefault();geh(-1)}});
 let t;spur.addEventListener('scroll',()=>{clearTimeout(t);t=setTimeout(lage,60)},{passive:true});addEventListener('resize',lage);lage();
});
/* Videostimmen in Karten: erst auf Klick laden (mit Ton, weil bewusst gestartet) */
document.querySelectorAll('.stimmen-start .kst .play[data-video]').forEach(a=>a.addEventListener('click',e=>{
 e.preventDefault();document.querySelectorAll('.kst video').forEach(x=>x.pause());
 const box=a.parentElement,bild=box.querySelector('img'),vid=document.createElement('video');
 vid.src=a.dataset.video;vid.poster=bild.getAttribute('src');vid.controls=true;vid.playsInline=true;vid.preload='none';
 vid.setAttribute('aria-label',a.getAttribute('aria-label').replace(' abspielen',''));
 bild.replaceWith(vid);a.remove();vid.play().catch(()=>{});
}));
