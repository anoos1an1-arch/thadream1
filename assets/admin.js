const $=s=>document.querySelector(s);
const ready=window.SUPABASE_URL && !window.SUPABASE_URL.startsWith("YOUR_") && window.SUPABASE_ANON_KEY && !window.SUPABASE_ANON_KEY.startsWith("YOUR_");
let token=null, links=[];

function msg(el,t,error=false){el.textContent=t;el.className="form-msg "+(error?"error":"ok")}
function headers(){return {apikey:window.SUPABASE_ANON_KEY,Authorization:`Bearer ${token}`, "Content-Type":"application/json"}}
async function api(path,opts={}){const r=await fetch(`${window.SUPABASE_URL}/rest/v1/${path}`,{...opts,headers:{...headers(),...(opts.headers||{})}});if(!r.ok)throw new Error(await r.text());return r.status===204?null:r.json()}
async function load(){
  links=await api("links?select=*&order=created_at.desc"); render();
}
function render(){
  $("#adminList").innerHTML=links.map(x=>`<div class="admin-row glass">
    <div class="icon-box"><i data-lucide="${esc(x.icon||"link")}"></i></div>
    <div class="row-info"><strong>${esc(x.title)}</strong><span>${esc(x.description||x.url)}</span></div>
    <span class="status ${x.is_published?"published":"draft"}">${x.is_published?"منشور":"مسودة"}</span>
    <button class="icon-btn" onclick="editLink('${x.id}')"><i data-lucide="pencil"></i></button>
    <button class="icon-btn danger" onclick="deleteLink('${x.id}')"><i data-lucide="trash-2"></i></button>
  </div>`).join("") || '<div class="empty">لا توجد روابط.</div>';
  lucide.createIcons();
}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));}
window.editLink=id=>{const x=links.find(v=>v.id===id);$("#editId").value=x.id;$("#title").value=x.title;$("#url").value=x.url;$("#icon").value=x.icon||"link";$("#description").value=x.description||"";$("#formTitle").textContent="تعديل الرابط";$("#cancelEdit").classList.remove("hidden");scrollTo({top:0,behavior:"smooth"})}
window.deleteLink=async id=>{if(!confirm("هل تريد حذف هذا الرابط نهائياً؟"))return;try{await api(`links?id=eq.${encodeURIComponent(id)}`,{method:"DELETE"});await load()}catch(e){alert("تعذر الحذف")}};
$("#loginForm").addEventListener("submit",async e=>{e.preventDefault();if(!ready){msg($("#loginMsg"),"أكمل إعداد Supabase أولاً من assets/config.js",true);return}
try{const r=await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`,{method:"POST",headers:{apikey:SUPABASE_ANON_KEY,"Content-Type":"application/json"},body:JSON.stringify({email:$("#email").value,password:$("#password").value})});const d=await r.json();if(!r.ok)throw new Error(d.error_description||"فشل تسجيل الدخول");token=d.access_token;$("#loginView").classList.add("hidden");$("#dashboard").classList.remove("hidden");await load()}catch(e){msg($("#loginMsg"),e.message,true)}});
$("#linkForm").addEventListener("submit",async e=>{e.preventDefault();try{const body={title:$("#title").value.trim(),url:$("#url").value.trim(),icon:$("#icon").value,description:$("#description").value.trim(),is_published:true};const id=$("#editId").value;if(id) await api(`links?id=eq.${encodeURIComponent(id)}`,{method:"PATCH",body:JSON.stringify(body)});else await api("links",{method:"POST",body:JSON.stringify(body)});e.target.reset();$("#editId").value="";$("#formTitle").textContent="إضافة رابط جديد";$("#cancelEdit").classList.add("hidden");msg($("#formMsg"),"تم الحفظ بنجاح");await load()}catch(e){msg($("#formMsg"),"تعذر حفظ الرابط. تحقق من إعدادات قاعدة البيانات.",true)}});
$("#cancelEdit").onclick=()=>{ $("#linkForm").reset();$("#editId").value="";$("#formTitle").textContent="إضافة رابط جديد";$("#cancelEdit").classList.add("hidden") };
$("#logout").onclick=()=>{token=null;$("#dashboard").classList.add("hidden");$("#loginView").classList.remove("hidden")};
lucide.createIcons();