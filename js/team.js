document.getElementById("y").textContent = new Date().getFullYear();



/* =========================================================
   DRAWER
========================================================= */
function lockScroll(){ document.body.style.overflow = 'hidden'; }
function unlockScroll(){ document.body.style.overflow = ''; }

var drawer = document.getElementById('mobileDrawer');
var menuBtn = document.getElementById('menuBtn');
var drawerClose = document.getElementById('drawerClose');

if (drawer && menuBtn) {

  function openDrawer(){
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden','false');
    menuBtn.setAttribute('aria-expanded','true');
    lockScroll();
  }

  function closeDrawer(){
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden','true');
    menuBtn.setAttribute('aria-expanded','false');
    unlockScroll();
  }

  menuBtn.addEventListener('click', function(){
    drawer.classList.contains('is-open') ? closeDrawer() : openDrawer();
  });

  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);

  drawer.addEventListener('click', function(e){
    if (e.target && e.target.getAttribute('data-close') === 'true') closeDrawer();
    var a = e.target && e.target.closest ? e.target.closest('[data-link="true"]') : null;
    if (a) closeDrawer();
  });

  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeDrawer();
  });
}
