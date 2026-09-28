
const f=document.getElementById('f'),err=document.getElementById('err'),mode=f.dataset.mode;
const NOSRV='ติดต่อเซิร์ฟเวอร์ไม่ได้ (เซิร์ฟเวอร์อาจกำลังตื่น รอสักครู่ประมาณ 1 นาทีแล้วลองใหม่)';
f.addEventListener('submit',async e=>{
  e.preventDefault();err.textContent='';
  const v=Object.fromEntries(new FormData(f));
  if(mode==='signup'&&v.password!==v.confirmpassword){err.textContent='รหัสผ่านไม่ตรงกัน';return}
  const url={signup:'/api/auth/signup',admin:'/api/auth/admin-login'}[mode]||'/api/auth/login';
  try{
    const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:v.username,password:v.password})});
    if(!(r.headers.get('content-type')||'').includes('json')){err.textContent=NOSRV;return}
    const d=await r.json().catch(()=>({}));
    if(!r.ok){err.textContent=d.error||'เกิดข้อผิดพลาด ลองใหม่อีกครั้ง';return}
    try{if(d.token)localStorage.setItem('token',d.token)}catch(_){}
    location.href=mode==='admin'?'admin.html':'home.html';
  }catch(_){err.textContent=NOSRV}
});