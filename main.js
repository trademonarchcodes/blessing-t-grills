const toggle=document.querySelector('.menu-toggle');const links=document.querySelector('.links');if(toggle&&links){toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));links.classList.toggle('open',!open)});links.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{links.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));}
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
const revealItems=document.querySelectorAll('.reveal');if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}})},{threshold:.12,rootMargin:'0px 0px -35px 0px'});revealItems.forEach(item=>observer.observe(item));}else{revealItems.forEach(item=>item.classList.add('is-visible'));}
const sectionLinks=[...document.querySelectorAll('.links a')];const sections=sectionLinks.map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean);if('IntersectionObserver'in window&&sections.length){const navObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){sectionLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')==='#'+entry.target.id))}})},{rootMargin:'-35% 0px -55% 0px'});sections.forEach(section=>navObserver.observe(section));}
document.querySelectorAll('a[href^="https://wa.me/"]').forEach(link=>{link.addEventListener('click',()=>{link.classList.add('clicked');window.setTimeout(()=>link.classList.remove('clicked'),450)})});
// If a remote food photo fails, keep its frame styled and readable instead of a broken-image icon.
document.querySelectorAll('img').forEach(img=>{img.addEventListener('error',()=>{img.style.visibility='hidden';img.parentElement.style.background='linear-gradient(135deg,#49301f,#17130f 65%,#a94720)';img.parentElement.style.minHeight='160px';},{once:true});});

/* Blessing T interactive chef ambassador */
(() => {
  const mascot = document.getElementById('chefMascot');
  const trigger = document.getElementById('chefMascotTrigger');
  const image = document.getElementById('chefMascotImage');
  const message = document.getElementById('chefMessage');
  if (!mascot || !trigger || !image || !message) return;

  const walkAsset = image.dataset.walk;
  const waveAsset = image.dataset.wave;
  const copy = {
    home: 'Hello! Welcome to Blessing T. What are you craving today?',
    story: 'Good food, good company. That is what we are all about!',
    menu: 'Ready to eat? Take a look at the menu and ask us what is fresh today.',
    events: 'Planning a birthday or get-together? Let us bring the flavour.',
    gallery: 'Feast your eyes. Your next favourite bite is waiting!',
    contact: 'Need directions or want to order? I can take you straight to our team.'
  };
  const positions = { home: '3%', story: '12%', menu: '66%', events: '10%', gallery: '66%', contact: '12%' };
  let activeSection = 'home';
  let waveTimer;
  let bubbleTimer;
  let waveReset;

  const setBubble = (open) => {
    mascot.classList.toggle('is-open', open);
    trigger.setAttribute('aria-expanded', String(open));
  };
  const wave = (say, keepBubble = true) => {
    window.clearTimeout(waveReset);
    image.src = waveAsset;
    mascot.classList.add('is-waving');
    if (say) message.textContent = say;
    if (keepBubble) setBubble(true);
    waveReset = window.setTimeout(() => {
      image.src = walkAsset;
      mascot.classList.remove('is-waving');
    }, 1900);
  };
  trigger.addEventListener('click', () => {
    const open = trigger.getAttribute('aria-expanded') !== 'true';
    message.textContent = copy[activeSection] || copy.home;
    setBubble(open);
    if (open) wave(copy[activeSection] || copy.home);
  });

  mascot.querySelectorAll('.chef-mascot-actions a').forEach((link) => {
    link.addEventListener('click', () => {
      setBubble(false);
      image.src = walkAsset;
    });
  });

  const watchSections = ['home', 'story', 'menu', 'events', 'gallery', 'contact']
    .map((id) => document.getElementById(id)).filter(Boolean);
  if ('IntersectionObserver' in window && watchSections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        activeSection = entry.target.id;
        mascot.style.setProperty('--chef-x', positions[activeSection] || '3%');
        message.textContent = copy[activeSection] || copy.home;
      });
    }, { rootMargin: '-38% 0px -48% 0px', threshold: 0 });
    watchSections.forEach((section) => sectionObserver.observe(section));
  }

  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion) {
    const scheduleWave = () => {
      waveTimer = window.setTimeout(() => {
        wave(copy[activeSection] || copy.home, false);
        bubbleTimer = window.setTimeout(() => setBubble(false), 4200);
        scheduleWave();
      }, 17000);
    };
    scheduleWave();
    window.setTimeout(() => setBubble(false), 7200);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      window.clearTimeout(waveTimer);
      window.clearTimeout(bubbleTimer);
      window.clearTimeout(waveReset);
      image.src = walkAsset;
    }
  });
})();
