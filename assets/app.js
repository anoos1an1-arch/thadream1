const $=s=>document.querySelector(s);
async function getLinks(){
  const r=await fetch("links.json?ts="+Date.now(),{cache:"no-store"});
  if(!r.ok) throw new Error("تعذر تحميل الروابط");
  return r.json();
}
function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));}
function render(items){
  const grid=$("#linkGrid");
  if(!items.length){grid.innerHTML='<div class="empty">لا توجد روابط منشورة حالياً.</div>';return;}
  grid.innerHTML=items.map(x=>`<a class="link-card glass" href="${esc(x.url)}" target="_blank" rel="noopener noreferrer" data-search="${esc((x.title+" "+(x.description||"")).toLowerCase())}">
    <div class="icon-box"><i data-lucide="${esc(x.icon||"link")}"></i></div>
    <div class="link-text"><h3>${esc(x.title)}</h3><p>${esc(x.description||"اضغط لفتح المحتوى")}</p></div>
    <i class="card-arrow" data-lucide="arrow-up-left"></i>
  </a>`).join("");
  lucide.createIcons();
}
(async()=>{
  lucide.createIcons();
  $("#year").textContent=new Date().getFullYear();
  try{render(await getLinks())}
  catch(e){$("#linkGrid").innerHTML='<div class="empty">تعذر تحميل الروابط. تأكد من وجود links.json.</div>'}
})();
$("#search").addEventListener("input",e=>{
  const q=e.target.value.toLowerCase();
  document.querySelectorAll(".link-card").forEach(c=>c.style.display=c.dataset.search.includes(q)?"flex":"none");
});