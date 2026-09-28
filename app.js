const $=s=>document.querySelector(s);
const store={get:k=>{try{return localStorage.getItem(k)}catch(_){return null}},set:(k,v)=>{try{localStorage.setItem(k,v)}catch(_){}}};
const DEFAULT_LANG='en';                       // เปลี่ยนเป็น 'th' ถ้าอยากให้เริ่มต้นเป็นภาษาไทย
const LANG=store.get('lang')==='th'?'th':store.get('lang')==='en'?'en':DEFAULT_LANG;
const DICT={ // [English, ไทย]
 search:['Search','ค้นหา'],hello:['Hello,','สวัสดี,'],
 welcome:['Welcome to our home. You can view our activities here.','ยินดีต้อนรับ ดูกิจกรรมของเราได้ที่นี่'],
 watch:['Watch now','ดูเลย'],choose:['Choose your activity','เลือกกิจกรรมของคุณ'],yours:['Your activities:','กิจกรรมของคุณ:'],
 newact:['New activity','กิจกรรมใหม่'],class:['Class','ระดับชั้น'],myprofile:['My Profile','โปรไฟล์ของฉัน'],
 setting:['Setting','ตั้งค่า'],noti:['Notification','การแจ้งเตือน'],logout:['Logout','ออกจากระบบ'],
 theme:['Theme','ธีม'],light:['Light','สว่าง'],dark:['Dark','มืด'],language:['Language','ภาษา'],
 name:['Name','ชื่อ'],uni:['University','มหาวิทยาลัย'],save:['Save Change','บันทึก'],saved:['Saved','บันทึกแล้ว'],
 allow:['Allow','อนุญาต'],block:['Block','ปิด'],
 notiDenied:['Notifications are blocked in your browser settings. Allow them there first.','เบราว์เซอร์บล็อกการแจ้งเตือนไว้ กรุณาอนุญาตในการตั้งค่าเบราว์เซอร์ก่อน'],
 viewers:['Viewers','ผู้เข้าชม'],people:['people','คน'],gets:['Earns activity hours','ได้รับกิจกรรมชั่วโมง'],
 nogets:['No activity hours','ไม่ได้รับกิจกรรมชั่วโมง'],hoursOf:['Activity hours','ได้รับกิจกรรมชั่วโมง'],hrs:['hrs','ชม.'],
 none:['No activities yet','ยังไม่มีกิจกรรม'],nomatch:['No matching activities','ไม่พบกิจกรรมที่ค้นหา'],
 recEmpty:['You haven’t joined any activity yet.<br>Pick one and press “Join activity”.','ยังไม่ได้เข้าร่วมกิจกรรมใด<br>เลือกกิจกรรมแล้วกด “เข้าร่วมกิจกรรม” ได้เลย'],
 join:['Join activity','เข้าร่วมกิจกรรม'],joined:['Joined (click to cancel)','เข้าร่วมกิจกรรมแล้ว (กดเพื่อยกเลิก)'],
 detail:['Activity details:','รายละเอียดกิจกรรม :'],nodesc:['No description yet','ยังไม่มีรายละเอียด'],
 loading:['Loading...','กำลังโหลด...'],notfound:['Activity not found.','ไม่พบกิจกรรมนี้'],back:['Back to activities','กลับไปหน้ากิจกรรม'],
 nosrvShort:['Cannot reach the server','ติดต่อเซิร์ฟเวอร์ไม่ได้'],error:['Something went wrong','เกิดข้อผิดพลาด'],
 avatar:['Profile picture','รูปโปรไฟล์'],avDevice:['Choose from device','เลือกรูปจากเครื่อง'],avRemove:['Remove','ลบรูป'],
 avUse:['Use link','ใช้ลิงก์นี้'],avUrlPh:['Paste an image link (https://…)','วางลิงก์รูป (https://…)'],
 avSaving:['Saving…','กำลังบันทึก…'],avDone:['Profile picture updated','เปลี่ยนรูปโปรไฟล์แล้ว'],avGone:['Profile picture removed','ลบรูปโปรไฟล์แล้ว'],
 avType:['Please choose an image file','กรุณาเลือกไฟล์รูปภาพ'],avBig:['Image must be 5MB or smaller','ไฟล์รูปต้องไม่เกิน 5MB'],
 avLink:['The link must start with http:// or https://','ลิงก์ต้องขึ้นต้นด้วย http:// หรือ https://'],
 avLoad:['Can’t load an image from this link. Use a direct link to the image file.','โหลดรูปจากลิงก์นี้ไม่ได้ ใช้ลิงก์ตรงของไฟล์รูป']
};
const t=k=>DICT[k]?DICT[k][LANG==='th'?1:0]:k;
const applyTheme=()=>{document.documentElement.dataset.theme=store.get('theme')==='dark'?'dark':'light'};
applyTheme();document.documentElement.lang=LANG;
const applyI18n=()=>{
 document.querySelectorAll('[data-t]').forEach(e=>e.textContent=t(e.dataset.t));
 document.querySelectorAll('[data-tp]').forEach(e=>e.placeholder=t(e.dataset.tp))};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const S=(p,x='')=>`<svg viewBox="0 0 24 24" aria-hidden="true" ${x}>${p}</svg>`;
const L='fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
const ICON={
 home:S('<path d="M12 3 2 12h3v9h5v-6h4v6h5v-9h3z" fill="currentColor"/>'),
 grid:S('<path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z" fill="currentColor"/>'),
 bell:S('<path d="M12 22a2.5 2.5 0 0 0 2.5-2.5h-5A2.5 2.5 0 0 0 12 22zm7-6v-5a7 7 0 0 0-5.5-6.8V3.5a1.5 1.5 0 0 0-3 0v.700A7 7 0 0 0 5 11v5l-2 2v1h18v-1z" fill="currentColor"/>'),
 user:S('<circle cx="12" cy="7.5" r="4.5" fill="currentColor"/><path d="M3 21c0-4.5 4-7 9-7s9 2.5 9 7z" fill="currentColor"/>'),
 userline:S(`<circle cx="12" cy="8" r="4" ${L}/><path d="M4 21c0-4 3.5-6 8-6s8 2 8 6z" ${L}/>`),
 logout:S(`<path d="M10 3H4v18h6M9 12h12m-4-4 4 4-4 4" ${L}/>`),
 gear:S(`<circle cx="12" cy="12" r="3.2" ${L}/><path d="M12 2.5l1.6 2.4 2.8-.7.9 2.7 2.7.9-.7 2.8 2.2 1.6-2.2 1.6.7 2.8-2.7.9-.9 2.7-2.8-.7L12 21.5l-1.6-2.4-2.8.7-.9-2.7-2.7-.9.7-2.8L2.5 12l2.2-1.6-.7-2.8 2.7-.9.9-2.7 2.8.7z" ${L}/>`),
 search:S(`<circle cx="10" cy="10" r="6.5" ${L}/><path d="m15 15 6 6" ${L}/>`),
 play:S('<path d="M6 4l14 8-14 8z" fill="currentColor"/>'),
 avatar:S('<circle cx="12" cy="12" r="12"/><circle cx="12" cy="9.5" r="3.6" fill="#fff"/><path d="M5.5 19.5c.8-3.5 3.4-5 6.5-5s5.7 1.5 6.5 5a10 10 0 0 1-13 0z" fill="#fff"/>')
};
const setAvatar=u=>document.querySelectorAll('[data-i="avatar"]').forEach(e=>{
 e.innerHTML=u?`<img class="pfp" src="${esc(assetUrl(u))}" alt="" referrerpolicy="no-referrer" onerror="this.parentNode.innerHTML=ICON.avatar">`:ICON.avatar});
const PAGE=document.body.dataset.page;
const NAV=[['home','home','home.html'],['activities','grid','activities.html'],['notifications','bell','notifications.html'],['profile','user','profile.html']];
$('#nav').innerHTML=NAV.map(([p,i,h])=>`<a href="${h}" class="${p===PAGE?'on':''}" aria-label="${p}">${ICON[i]}</a>`).join('')+`<a class="out" href="login.html" aria-label="Logout">${ICON.logout}</a>`;
document.querySelectorAll('[data-i]').forEach(e=>e.innerHTML=ICON[e.dataset.i]);
applyI18n();

const NOSRV='ติดต่อเซิร์ฟเวอร์ไม่ได้ (เซิร์ฟเวอร์อาจกำลังตื่น รอสักครู่ประมาณ 1 นาทีแล้วลองใหม่)';
const warn=m=>document.body.insertAdjacentHTML('afterbegin',`<div class="warn" role="alert">${m}</div>`);
const nosrv=()=>Object.assign(new Error('nosrv'),{nosrv:1});
const jget=async u=>{let r;try{r=await fetch(u)}catch(_){throw nosrv()}
 if(r.status===401){location.href='login.html';throw new Error('unauth')}
 if(!(r.headers.get('content-type')||'').includes('json'))throw nosrv();
 const d=await r.json();if(!r.ok)throw new Error(d.error||'HTTP '+r.status);return d};
const img=a=>a.image?`<img src="${esc(assetUrl(a.image))}" alt="" referrerpolicy="no-referrer" loading="lazy" onerror="this.remove()">`:'';
const card=a=>`<a class="card" href="activity.html?id=${a.id}"><div class="img">${img(a)}</div><p>${esc(a.name)}</p><p>${t('viewers')}: <b>${a.viewers} ${t('people')}</b></p><p>${a.hours>0?t('gets'):t('nogets')}</p></a>`;
const groups=(acts,cats)=>cats.map(c=>[c.name,acts.filter(a=>a.category===c.name)]).filter(g=>g[1].length);
const rows=(gs,n=99,msg=t('none'))=>gs.map(([c,l])=>`<h3 class="row">${esc(c)} <i>${ICON.play}</i></h3><div class="cards">${l.slice(0,n).map(card).join('')}</div>`).join('')||`<p class="empty">${msg}</p>`;

(async()=>{
 const [me,cats,acts,joins]=await Promise.all([jget('/api/me'),jget('/api/categories'),jget('/api/activities'),$('#rec')?jget('/api/me/joins'):[]]);
 document.body.insertAdjacentHTML('afterbegin',`<header class="top"><a class="me" href="profile.html"><i class="av" data-i="avatar">${ICON.avatar}</i><span id="topName"></span></a><a class="gear" href="profile.html#setting" aria-label="Setting">${ICON.gear}</a></header>`);
 $('#topName').textContent=me.name;
 setAvatar(me.avatar);
 document.querySelectorAll('[data-u]').forEach(e=>{const v=me[e.dataset.u];'value'in e?e.value=v:e.textContent=v});
 const paint=(list,q)=>{
  const gs=groups(list,cats),none=q?t('nomatch'):t('none');
  if($('#homeRows'))$('#homeRows').innerHTML=rows(gs,4,none);
  if($('#all'))$('#all').innerHTML=rows(gs,99,none);
  if($('#cols'))$('#cols').innerHTML=cats.map(c=>{const l=list.filter(a=>a.category===c.name).slice(0,3);
   return l.length?`<section><h3>${esc(c.name)}</h3><div class="col">${l.map(a=>`<a class="n" href="activity.html?id=${a.id}">${img(a)||'<i class="ph"></i>'}<p>${esc(a.name)}</p></a>`).join('')}</div></section>`:''}).join('')||`<p class="empty">${none}</p>`;
 };
 paint(acts,'');
 if($('#rec')){const mine=new Set(joins);
  $('#rec').innerHTML=acts.filter(x=>mine.has(x.id)).map(x=>`<a class="rc" href="activity.html?id=${x.id}">${img(x)}<span>${esc(x.name)}</span></a>`).join('')
   ||`<p class="empty">${t('recEmpty')}</p>`}
 const si=$('.search input');
 if(si)si.oninput=()=>{const t=si.value.trim().toLowerCase();
  paint(t?acts.filter(a=>a.name.toLowerCase().includes(t)||a.category.toLowerCase().includes(t)):acts,t)};
})().catch(e=>{if(e.message==='unauth')return;warn(e.nosrv?NOSRV:'เกิดข้อผิดพลาด: '+esc(e.message))});

const stg=$('#setting'),stb=$('#settingBtn'),pfb=$('#profileBtn');
const mark=el=>{document.querySelectorAll('.menu .mi.on').forEach(x=>x.classList.remove('on'));if(el)el.classList.add('on')};
const openSetting=v=>{if(!stg)return;stg.hidden=!v;if(stb)stb.setAttribute('aria-expanded',v);mark(v?stb:pfb);if(v)stg.scrollIntoView({behavior:'smooth',block:'nearest'})};
if(stg){openSetting(location.hash==='#setting');
 if(pfb)pfb.onclick=e=>{e.preventDefault();openSetting(false)};
 if(stb)stb.onclick=e=>{e.preventDefault();openSetting(stg.hidden)};
 addEventListener('hashchange',()=>{if(location.hash==='#setting')openSetting(true)})}
document.addEventListener('click',async e=>{
 if(stg&&e.target.closest('a.gear')){e.preventDefault();openSetting(true);return}
 if(e.target.closest('a[href="login.html"]')){e.preventDefault();try{await fetch('/api/auth/logout',{method:'POST'})}catch(_){}location.href='login.html';return}
});
const nt=$('#notiToggle');
if(nt){const s=nt.querySelector('small'),show=()=>{s.textContent=t(store.get('noti')==='block'?'block':'allow')};show();
 nt.onclick=async()=>{
  mark(nt);
  if(store.get('noti')==='block'){
   let ok=true;
   if('Notification' in window){
    if(Notification.permission==='default'){try{ok=(await Notification.requestPermission())==='granted'}catch(_){}}
    else if(Notification.permission==='denied')ok=false}
   if(!ok)alert(t('notiDenied'));
   store.set('noti',ok?'allow':'block')}
  else store.set('noti','block');
  show()}}
const themeSel=$('#themeSel'),langSel=$('#langSel');
if(themeSel){themeSel.value=store.get('theme')==='dark'?'dark':'light';
 themeSel.onchange=()=>{store.set('theme',themeSel.value);applyTheme()}}
if(langSel){langSel.value=LANG;
 langSel.onchange=()=>{store.set('lang',langSel.value);location.reload()}}
const sv=$('#save');
if(sv)sv.onclick=async()=>{
 const body={};document.querySelectorAll('input[data-u]').forEach(i=>body[i.dataset.u]=i.value.trim());
 try{const r=await fetch('/api/me',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});const d=await r.json();
  if(!r.ok)throw new Error(d.error);
  document.querySelectorAll('[data-u]:not(input)').forEach(e=>{if(d[e.dataset.u]!=null)e.textContent=d[e.dataset.u]});
  $('#topName').textContent=d.name;sv.textContent=t('saved')}catch(err){sv.textContent=err.message||'Error'}
 setTimeout(()=>sv.textContent=t('save'),1800)};

/* ---------- เปลี่ยนรูปโปรไฟล์ (หน้า Profile > Setting) ---------- */
if($('#avPick')){
 const msg=(m,bad)=>{const e=$('#avMsg');e.textContent=m||'';e.dataset.bad=bad?'1':''};
 const send=async(method,fd,okKey)=>{
  msg(t('avSaving'));
  try{const r=await fetch('/api/me/avatar',{method,body:fd});
   if(r.status===401){location.href='login.html';return}
   const d=await r.json().catch(()=>({}));
   if(!r.ok)throw new Error(d.error||'HTTP '+r.status);
   setAvatar(d.avatar);msg(t(okKey))}
  catch(e){msg(e instanceof TypeError?t('nosrvShort'):e.message,1)}};
 $('#avPick').onclick=()=>$('#avFile').click();
 $('#avFile').onchange=e=>{const f=e.target.files[0];e.target.value='';if(!f)return;
  if(!f.type.startsWith('image/'))return msg(t('avType'),1);
  if(f.size>5*1024*1024)return msg(t('avBig'),1);
  const fd=new FormData();fd.append('image',f);send('PUT',fd,'avDone')};
 const useLink=()=>{const u=$('#avUrl').value.trim();
  if(!/^https?:\/\//i.test(u))return msg(t('avLink'),1);
  msg(t('avSaving'));
  const im=new Image();im.referrerPolicy='no-referrer';
  im.onload=()=>{const fd=new FormData();fd.append('image_url',u);send('PUT',fd,'avDone').then(()=>{$('#avUrl').value=''})};
  im.onerror=()=>msg(t('avLoad'),1);
  im.src=u};
 $('#avGo').onclick=useLink;
 $('#avUrl').onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();useLink()}};
 $('#avDel').onclick=()=>send('DELETE',undefined,'avGone');
}
addEventListener('pageshow',e=>{if(e.persisted)location.reload()});