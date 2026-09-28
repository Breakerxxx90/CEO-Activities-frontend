
const f=document.getElementById('f'),err=document.getElementById('err'),mode=f.dataset.mode;
const NOSRV='ติดต่อเซิร์ฟเวอร์หลังบ้านไม่ได้ — ต้องเปิดหน้านี้ผ่าน http://127.0.0.1:3000 (รัน npm start ในโฟลเดอร์ backend ก่อน) ไม่ใช่ Live Server หรือเปิดไฟล์ตรงๆ';
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
    location.href=mode==='admin'?'admin.html':'home.html';
  }catch(_){err.textContent=NOSRV}
});