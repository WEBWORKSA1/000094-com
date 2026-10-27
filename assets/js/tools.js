/* 000094.com — interactive tools */
(function(){
'use strict';
function $(s,c){return (c||document).querySelector(s);} function $$(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s));}
function num(v){var n=parseFloat(String(v).replace(/,/g,''));return isFinite(n)?n:0;}
function money(n,c){try{return new Intl.NumberFormat(undefined,{style:'currency',currency:c||'USD',maximumFractionDigits:2}).format(n);}catch(e){return (c||'$')+' '+n.toFixed(2);}}
/* ===== HS 94 explorer ===== */
var tb=$('#hsTable tbody');
if(tb&&window.HS94){
  var data=window.HS94,cur='all',term='';
  function render(){var t=term.toLowerCase().replace(/\./g,'');
    var rows=data.lines.filter(function(r){var okH=cur==='all'||r[2]===cur;var hay=(r[0].replace('.','')+' '+r[1]+' '+r[3]).toLowerCase();return okH&&(!t||hay.indexOf(t)>-1||r[0].toLowerCase().indexOf(term.toLowerCase())>-1);});
    tb.innerHTML=rows.map(function(r){return '<tr data-code="'+r[0]+'"><td class="code">'+r[0]+'</td><td>'+r[1]+(r[3]?'<div class="note">'+r[3]+'</div>':'')+'</td></tr>';}).join('')||'<tr><td colspan="2">No match. Try a material (wood, metal, rattan), a room (kitchen, bedroom) or a product (mattress, chandelier).</td></tr>';
    var c=$('#hsCount');if(c)c.textContent=rows.length+' of '+data.lines.length+' subheadings';}
  $('#hsSearch').addEventListener('input',function(e){term=e.target.value.trim();render();});
  $$('.chip[data-h]').forEach(function(ch){ch.addEventListener('click',function(){$$('.chip[data-h]').forEach(function(x){x.classList.remove('on');});ch.classList.add('on');cur=ch.getAttribute('data-h');render();});});
  tb.addEventListener('click',function(e){var tr=e.target.closest('tr[data-code]');if(!tr)return;var code=tr.getAttribute('data-code');var r=data.lines.filter(function(x){return x[0]===code;})[0];
    var d=$('#hsDetail');d.innerHTML='<span class="tag">Heading '+r[2].slice(0,2)+'.'+r[2].slice(2)+'</span><h3 class="mono">'+r[0]+'</h3><p>'+r[1]+'</p><p class="note">'+data.headings[r[2]]+'</p>'+(r[3]?'<div class="callout">'+r[3]+'</div>':'')+
    '<p class="note">The first six digits are harmonised worldwide. Your import country adds 2–4 more digits and sets the duty rate.</p><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-ghost" id="copyCode">Copy code</button><a class="btn btn-primary" href="sourcing.html?hs='+r[0].replace('.','')+'">Get supplier / broker quotes</a></div>';
    var cb=$('#copyCode');cb.addEventListener('click',function(){try{navigator.clipboard.writeText(r[0]);cb.textContent='Copied';}catch(err){}});
    if(window.innerWidth<900)d.scrollIntoView({behavior:'smooth'});});
  render();
}
/* ===== Landed cost ===== */
var lc=$('#lcForm');
if(lc){
  function calc(){var g=function(n){return num(lc.elements[n].value);};var cur=lc.elements.currency.value;
    var goods=g('goods'),freight=g('freight'),ins=g('insurance'),units=Math.max(1,g('units'));
    var base=lc.elements.basis.value==='cif'?goods+freight+ins:goods;
    var duty=base*g('mfn')/100,extra=base*g('extra')/100,add2=base*g('extra2')/100;
    var mpf=lc.elements.us.checked?Math.min(Math.max(goods*0.3464/100,g('mpfmin')),g('mpfmax')):0;
    var hmf=lc.elements.us.checked&&lc.elements.ocean.checked?goods*0.125/100:0;
    var vatBase=goods+freight+ins+duty+extra+add2;var vat=vatBase*g('vat')/100;
    var fees=g('broker')+g('inland')+g('other');
    var total=goods+freight+ins+duty+extra+add2+mpf+hmf+vat+fees;
    var parts=[['Goods',goods,'#1F7A6E'],['Freight + insurance',freight+ins,'#3B6EA8'],['Base duty',duty,'#E8A33D'],['Additional duties',extra+add2,'#B4412F'],['Customs fees',mpf+hmf,'#8A6FB0'],['Import VAT/GST',vat,'#6B7280'],['Broker, inland, other',fees,'#A3906A']];
    $('#lcTotal').textContent=money(total,cur);$('#lcUnit').textContent=money(total/units,cur)+' per unit';
    $('#lcRows').innerHTML=parts.map(function(p){return '<div class="kv"><span>'+p[0]+'</span><span>'+money(p[1],cur)+'</span></div>';}).join('')+
      '<div class="kv"><span>Duty base used</span><span>'+money(base,cur)+'</span></div><div class="kv"><span>Total duties &amp; taxes as % of goods</span><span>'+(goods?((duty+extra+add2+mpf+hmf+vat)/goods*100).toFixed(1):'0')+'%</span></div>';
    $('#lcBar').innerHTML=parts.map(function(p){return '<i style="width:'+(total?p[1]/total*100:0)+'%;background:'+p[2]+'"></i>';}).join('');
    $('#lcLegend').innerHTML=parts.map(function(p){return '<span><b style="background:'+p[2]+'"></b>'+p[0]+'</span>';}).join('');
    var mk=g('markup');$('#lcPrice').textContent=money(total/units*(1+mk/100),cur);
  }
  lc.addEventListener('input',calc);lc.addEventListener('change',calc);
  $$('[data-preset]',document).forEach(function(b){b.addEventListener('click',function(){var p=JSON.parse(b.getAttribute('data-preset'));Object.keys(p).forEach(function(k){var f=lc.elements[k];if(!f)return;if(f.type==='checkbox')f.checked=!!p[k];else f.value=p[k];});calc();});});
  calc();
}
/* ===== Container calculator ===== */
var cc=$('#ccForm');
if(cc){
  var BOXES=[['20\' GP',26,21700],['40\' GP',56,26500],['40\' HC',66,26300]];
  function ccalc(){var g=function(n){return num(cc.elements[n].value);};
    var unitCbm=g('l')*g('w')*g('h')/1e6*Math.max(1,g('cartons'));var qty=Math.max(0,g('qty'));var cbm=unitCbm*qty;var kg=g('kg')*qty;var rate=g('rate');
    $('#ccCbm').textContent=cbm.toFixed(2)+' m³';$('#ccUnitCbm').textContent=unitCbm.toFixed(3)+' m³ per item · '+(unitCbm*35.3147).toFixed(1)+' ft³';$('#ccKg').textContent=kg.toLocaleString()+' kg total';
    $('#ccRows').innerHTML=BOXES.map(function(b){var byV=unitCbm?Math.floor(b[1]/unitCbm):0,byW=g('kg')?Math.floor(b[2]/g('kg')):Infinity;var fit=Math.min(byV,byW);var n=fit?Math.ceil(qty/fit):0;var fill=n?Math.min(100,cbm/(n*b[1])*100):0;
      return '<div class="card" style="padding:16px"><div style="display:flex;justify-content:space-between;align-items:baseline"><strong class="mono">'+b[0]+'</strong><span class="note">~'+b[1]+' m³ usable</span></div><div class="kv"><span>Items per container</span><span>'+(isFinite(fit)?fit.toLocaleString():'–')+'</span></div><div class="kv"><span>Containers needed</span><span>'+n+'</span></div><div class="kv"><span>Average fill</span><span>'+fill.toFixed(0)+'%</span></div>'+(rate&&fit?'<div class="kv"><span>Freight per item @ rate</span><span>'+money(rate/fit)+'</span></div>':'')+'<div class="meter" style="margin-top:10px"><i style="width:'+fill+'%"></i></div>'+(byW<byV?'<p class="note" style="margin-top:8px">Weight-limited before volume.</p>':'')+'</div>';}).join('');
    var lcl=$('#ccLcl');if(lcl)lcl.textContent=cbm<15?'Under ~15 m³, compare LCL (shared container) quotes — often cheaper than a full 20\'.':'Above ~15 m³, a full 20\' container (FCL) usually beats LCL per m³.';
  }
  cc.addEventListener('input',ccalc);ccalc();
}
})();
