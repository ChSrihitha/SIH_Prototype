// navbar.js — include on every page
document.addEventListener('DOMContentLoaded', () => {
  const navInner = document.querySelector('.nav-inner');
  const navCenter = document.getElementById('nav-center');
  const logo = document.querySelector('.logo');
  const btnBack = document.getElementById('btn-back');
  const toggle = document.getElementById('menu-toggle');

  function updateNavCenterMaxWidth() {
    // available width inside .nav-inner
    const innerWidth = navInner.clientWidth;
    const leftWidth = logo ? logo.offsetWidth : 0;
    const rightWidth = btnBack ? btnBack.offsetWidth : 0;
    const safetyGap = 48; // buffer so links don't touch edges
    const maxWidth = Math.max(100, innerWidth - leftWidth - rightWidth - safetyGap);
    // apply as max-width so the absolute centered element won't overflow into logo/button
    navCenter.style.maxWidth = maxWidth + 'px';
    // allow horizontal scroll when content is larger than available space
    navCenter.style.overflowX = 'auto';
  }

  // initial calc
  updateNavCenterMaxWidth();

  // recalc on resize / font load / orientation
  window.addEventListener('resize', updateNavCenterMaxWidth);
  window.addEventListener('orientationchange', updateNavCenterMaxWidth);

  // mobile toggle
  if (toggle) {
    toggle.addEventListener('click', () => {
      navCenter.classList.toggle('nav-center--open');
    });
  }

  // if user clicks a center link on mobile, close the menu
  navCenter.addEventListener('click', (e) => {
    if (window.innerWidth <= 820 && e.target.tagName === 'A') {
      navCenter.classList.remove('nav-center--open');
    }
  });
});
