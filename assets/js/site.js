/* 000094.com — site runtime: chrome, theme, consent, forms, widgets */
(function(){
'use strict';
/* ===== EDITABLE CONFIG ===== */
window.SITE_CONFIG = {
  // Paste payment links to turn on instant checkout buttons. Empty = buttons open the pledge form instead.
  donate: { paypal: '', stripe: '', buymeacoffee: '' },
  // Paste YouTube video IDs (the part after v=) to show embedded players on videos.html and the home page.
  videos: [ /* { id: 'XXXXXXXXXXX', title: 'Video title', topic: 'Classification' } */ ]
};
/* =========================== */
var root = document.body.getAttribute('data-root') || '';
var page = document.body.getAttribute('data-page') || '';
var NAV = [
  ['hs-94.html','HS 94 Explorer','hs'],['landed-cost.html','Landed Cost','landed'],['container-calculator.html','Container Calc','container'],
  ['tariff-tracker.html','Tariff Tracker','tariffs'],['guides.html','Guides','guides'],['videos.html','Videos','videos'],['support.html','Support','support']
];
function el(html){var t=document.createElement('template');t.innerHTML=html.trim();return t.content.firstChild;}
var head=document.getElementById('site-header');
if(head){
  var links=NAV.map(function(n){return '<a href="'+root+n[0]+'"'+(page===n[2]?' aria-current="page"':'')+'>'+n[1]+'</a>';}).join('');
  head.outerHTML='<header class="site-head"><div class="wrap head-in"><a class="brand" href="'+root+'index.html" aria-label="000094 home"><span class="brand-mark">0000<b>94</b></span><span class="brand-name">Chapter 94 Trade Desk</span></a>'+
  '<button class="icon-btn menu-btn" id="menuBtn" aria-label="Open menu" aria-expanded="false"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button>'+
  '<nav class="nav" id="nav" aria-label="Main">'+links+'<a class="cta-mini" href="'+root+'sourcing.html">Get Quotes</a>'+
  '<button class="icon-btn" id="themeBtn" aria-label="Toggle dark mode"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg></button></nav></div></header>';
}
var foot=document.getElementById('site-footer');
if(foot){
  var y=new Date().getFullYear();
  foot.outerHTML='<footer class="site-foot"><div class="wrap"><div class="foot-grid">'+
  '<div><a class="brand" href="'+root+'index.html" style="color:#fff"><span class="brand-mark">0000<b>94</b></span></a><p style="margin-top:14px">Free, independent trade intelligence for furniture, bedding, lighting and prefabricated buildings &mdash; the goods of HS Chapter 94.</p><p><a href="https://web.works/contact" rel="noopener">Interested in this website, domain, sponsorship or partnership? Contact &rarr;</a></p></div>'+
  '<div><h4>Tools</h4><ul><li><a href="'+root+'hs-94.html">HS 94 Explorer</a></li><li><a href="'+root+'landed-cost.html">Landed Cost Calculator</a></li><li><a href="'+root+'container-calculator.html">Container Calculator</a></li><li><a href="'+root+'tariff-tracker.html">Tariff Tracker</a></li></ul></div>'+
  '<div><h4>Learn</h4><ul><li><a href="'+root+'guides.html">All Guides</a></li><li><a href="'+root+'guides/classify-furniture-hs-94.html">Classifying Furniture</a></li><li><a href="'+root+'guides/landed-cost-furniture-imports.html">Landed Cost</a></li><li><a href="'+root+'videos.html">Video Library</a></li></ul></div>'+
  '<div><h4>Community</h4><ul><li><a href="'+root+'sourcing.html">Request Quotes</a></li><li><a href="'+root+'support.html">Support &amp; Sponsor</a></li><li><a href="'+root+'contests.html">Contests &amp; Prizes</a></li><li><a href="'+root+'careers.html">Careers &amp; Talent</a></li></ul></div>'+
  '<div><h4>Company</h4><ul><li><a href="'+root+'about.html">About</a></li><li><a href="'+root+'contact.html">Contact</a></li><li><a href="'+root+'privacy.html">Privacy Policy</a></li><li><a href="'+root+'terms.html">Terms of Use</a></li><li><a href="'+root+'disclaimer.html">Disclaimer &amp; Trademarks</a></li></ul></div>'+
  '</div><div class="foot-legal">&copy; '+y+' 000094.com. Independent publication. Not affiliated with the World Customs Organization, U.S. Customs and Border Protection, or any government or customs authority. Information is educational and not legal, customs or financial advice. "000094" is used solely as a descriptive numeric domain name; all third-party names and marks belong to their owners. <a href="'+root+'disclaimer.html">Full disclosure</a>.</div></div></footer>';
}
/* menu */
var mb=document.getElementById('menuBtn'),nav=document.getElementById('nav');
if(mb&&nav){mb.addEventListener('click',function(){var o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o);});
 nav.addEventListener('click',function(e){if(e.target.tagName==='A')nav.classList.remove('open');});}
/* theme */
function store(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v);}catch(e){return null;}}
var saved=store('theme'); if(saved)document.documentElement.setAttribute('data-theme',saved);
var tb=document.getElementById('themeBtn');
if(tb)tb.addEventListener('click',function(){var cur=document.documentElement.getAttribute('data-theme');
  if(!cur)cur=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
  var nx=cur==='dark'?'light':'dark';document.documentElement.setAttribute('data-theme',nx);store('theme',nx);});
/* cookie notice */
if(!store('consent')){
  var c=el('<div class="cookie" role="dialog" aria-label="Cookie notice"><p><strong>Cookies.</strong> We use cookies for essential features and, with Google AdSense, to serve and measure ads. See our <a href="'+root+'privacy.html">Privacy Policy</a>.</p><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-primary" data-c="all">Accept</button><button class="btn btn-ghost" data-c="essential">Essential only</button></div></div>');
  document.body.appendChild(c);setTimeout(function(){c.classList.add('show');},600);
  c.addEventListener('click',function(e){var v=e.target.getAttribute('data-c');if(!v)return;store('consent',v);
    if(v==='essential'){(window.adsbygoogle=window.adsbygoogle||[]).requestNonPersonalizedAds=1;}c.remove();});
} else if(store('consent')==='essential'){(window.adsbygoogle=window.adsbygoogle||[]).requestNonPersonalizedAds=1;}
/* hidden destination — assembled at runtime, never rendered */
function dst(){var a=[119,101,98,119,111,114,107,115,97,49],b=[103,109,97,105,108];return String.fromCharCode.apply(null,a)+String.fromCharCode(64)+String.fromCharCode.apply(null,b)+'.com';}
document.addEventListener('click',function(e){var a=e.target.closest('[data-mail]');if(!a)return;e.preventDefault();
  var s=a.getAttribute('data-mail')||'Inquiry from 000094.com';window.location.href='mai'+'lto:'+dst()+'?subject='+encodeURIComponent(s);});
/* forms */
function serialize(f){var o={};new FormData(f).forEach(function(v,k){if(o[k]){o[k]+=', '+v;}else{o[k]=v;}});return o;}
function validStep(s){var ok=true;s.querySelectorAll('input,select,textarea').forEach(function(i){if(!i.checkValidity()){ok=false;}});
  if(!ok){var bad=s.querySelector(':invalid');if(bad){bad.reportValidity&&bad.reportValidity();}}return ok;}
document.querySelectorAll('form[data-form]').forEach(function(f){
  var steps=f.querySelectorAll('.step'),bar=f.querySelector('.steps-bar i'),i=0;
  function show(n){steps.forEach(function(s,k){s.classList.toggle('active',k===n);});if(bar)bar.style.width=((n+1)/steps.length*100)+'%';i=n;}
  if(steps.length){show(0);
    f.addEventListener('click',function(e){if(e.target.matches('[data-next]')){e.preventDefault();if(validStep(steps[i]))show(Math.min(i+1,steps.length-1));}
      if(e.target.matches('[data-back]')){e.preventDefault();show(Math.max(i-1,0));}});}
  f.addEventListener('submit',function(e){e.preventDefault();var msg=f.querySelector('.form-msg');
    if(f.querySelector('.hp input')&&f.querySelector('.hp input').value)return;
    if(!f.checkValidity()){f.reportValidity();return;}
    var data=serialize(f);delete data._gotcha;data._subject='[000094.com] '+(f.getAttribute('data-form')||'Form')+' submission';data._template='table';data._captcha='false';data.page=location.href;
    var btn=f.querySelector('[type=submit]');if(btn){btn.disabled=true;btn.dataset.t=btn.textContent;btn.textContent='Sending…';}
    fetch('https://formsubmit.co/ajax/'+dst(),{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)})
    .then(function(r){return r.json();}).then(function(){if(msg){msg.className='form-msg ok';msg.textContent=f.getAttribute('data-ok')||'Thank you — your submission was received. We reply within 1–2 business days.';}f.reset();if(steps.length)show(0);})
    .catch(function(){if(msg){msg.className='form-msg err';msg.textContent='Network error. Please try again in a minute.';}})
    .finally(function(){if(btn){btn.disabled=false;btn.textContent=btn.dataset.t;}});
  });
});
/* countdown */
document.querySelectorAll('[data-countdown]').forEach(function(box){var t=new Date(box.getAttribute('data-countdown')).getTime();
  function tick(){var d=Math.max(0,t-Date.now());var p=[Math.floor(d/864e5),Math.floor(d/36e5)%24,Math.floor(d/6e4)%60,Math.floor(d/1e3)%60];
    box.innerHTML=['Days','Hours','Min','Sec'].map(function(l,k){return '<div class="cd-cell"><div class="n">'+String(p[k]).padStart(2,'0')+'</div><div class="l">'+l+'</div></div>';}).join('');}
  tick();setInterval(tick,1000);});
/* videos */
function lite(v){return '<div><div class="video" data-yt="'+v.id+'" role="button" tabindex="0" aria-label="Play: '+v.title+'"><img loading="lazy" alt="" src="https://i.ytimg.com/vi/'+v.id+'/hqdefault.jpg"><div class="play"><span><svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg></span></div></div><h3 style="margin-top:10px;font-size:1.05rem">'+v.title+'</h3></div>';}
var vg=document.getElementById('video-grid');
if(vg){var vs=window.SITE_CONFIG.videos.filter(function(v){return v.id;});var lim=parseInt(vg.getAttribute('data-limit')||'99',10);
  if(vs.length){vg.innerHTML=vs.slice(0,lim).map(lite).join('');}else{var fb=document.getElementById('video-fallback');if(fb)fb.classList.remove('hide');vg.classList.add('hide');}}
document.addEventListener('click',function(e){var v=e.target.closest('.video[data-yt]');if(!v)return;
  v.innerHTML='<iframe src="https://www.youtube-nocookie.com/embed/'+v.getAttribute('data-yt')+'?autoplay=1&rel=0" title="YouTube video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';});
/* donate buttons */
document.querySelectorAll('[data-pay]').forEach(function(b){var k=b.getAttribute('data-pay'),u=window.SITE_CONFIG.donate[k];
  if(u){b.href=u;b.target='_blank';b.rel='noopener';}else{b.href='#pledge';}});
/* reveal */
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}});},{threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(n){io.observe(n);});}else{document.querySelectorAll('.reveal').forEach(function(n){n.classList.add('in');});}
/* prefill heading from query (?hs=9403) */
var q=new URLSearchParams(location.search).get('hs');if(q){var sel=document.querySelector('[name=hs_heading]');if(sel){Array.prototype.forEach.call(sel.options,function(o){if(o.value.indexOf(q.slice(0,4))===0)sel.value=o.value;});}}
})();
