// ตั้งค่าที่อยู่ backend (Render) — เปลี่ยนที่นี่ที่เดียว
(function () {
  var API = 'https://ceo-activities-backend.onrender.com';
  window.API_BASE = API;
  // รูปที่อัปโหลดเก็บเป็น /uploads/... ต้องชี้ไปที่ backend
  window.assetUrl = function (u) { return u && String(u).indexOf('/uploads/') === 0 ? API + u : u; };
  var tok = function () { try { return localStorage.getItem('token'); } catch (_) { return null; } };
  var nativeFetch = window.fetch.bind(window);
  window.fetch = function (input, init) {
    if (typeof input === 'string' && input.indexOf('/api/') === 0) {
      init = Object.assign({}, init);
      var h = new Headers(init.headers || {}), t = tok();
      if (t) h.set('Authorization', 'Bearer ' + t);
      init.headers = h;
      var p = nativeFetch(API + input, init);
      if (input === '/api/auth/logout') {
        var clear = function () { try { localStorage.removeItem('token'); } catch (_) {} };
        p.then(clear, clear);
      }
      return p;
    }
    return nativeFetch(input, init);
  };
})();
