const cardScene = document.getElementById('cardScene');
const cardCover = document.getElementById('cardCover');
const paginationControls = document.getElementById('paginationControls');
const closeBtn = document.getElementById('closeBtn');

const textPages = [
  document.getElementById('textPage1'),
  document.getElementById('textPage2'),
  document.getElementById('textPage3')
];

const photoPages = [
  document.getElementById('photoPage1'),
  document.getElementById('photoPage2'),
  document.getElementById('photoPage3')
];

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageIndicator = document.getElementById('pageIndicator');

let currentPage = 0;
let isOpen = false;

// Ефект поцілуйчиків
function createKissEffect() {
  const count = 24;

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const particle = document.createElement('div');
      particle.className = 'kiss-particle';
      
      const isText = Math.random() < 0.25;
      if (isText) {
        particle.innerText = 'З днем народження, дорога Діано! 💋';
        particle.style.fontSize = (0.85 + Math.random() * 0.4) + 'rem';
        particle.style.fontWeight = '600';
        particle.style.color = '#fb7185';
        particle.style.whiteSpace = 'nowrap';
        particle.style.textShadow = '0 0 10px rgba(244, 63, 94, 0.6)';
      } else {
        const emojis = ['💋', '😘', '❤️', '💖', '✨'];
        particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.fontSize = (1.5 + Math.random() * 1.5) + 'rem';
      }

      const startX = window.innerWidth / 2;
      const startY = window.innerHeight / 2 + 50;

      particle.style.left = startX + 'px';
      particle.style.top = startY + 'px';

      const dx = (Math.random() - 0.5) * 550 + 'px';
      const dy = -(Math.random() * 420 + 150) + 'px';
      const rot = (Math.random() - 0.5) * 60 + 'deg';

      particle.style.setProperty('--dx', dx);
      particle.style.setProperty('--dy', dy);
      particle.style.setProperty('--rot', rot);

      document.body.appendChild(particle);

      setTimeout(() => particle.remove(), 2500);
    }, i * 80);
  }
}

// ФУНКЦІЯ ЗАКРИТТЯ ЛИСТІВКИ
function closeCard() {
  if (isOpen) {
    isOpen = false;
    cardScene.classList.remove('open');
    paginationControls.style.display = 'none';
    
    // Скидаємо на 1-шу сторінку після завершення анімації
    setTimeout(() => {
      currentPage = 0;
      updatePages();
    }, 400);
  }
}

// КЛІК/ТАП ПО ОБКЛАДИНЦІ (Відкриває якщо закрита, закриває якщо відкрита)
cardCover.addEventListener('click', () => {
  if (!isOpen) {
    isOpen = true;
    cardScene.classList.add('open');
    paginationControls.style.display = 'flex';
    createKissEffect();
  } else {
    closeCard();
  }
});

// КЛІК ПО КНОПЦІ "ЗАКРИТИ"
closeBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // Щоб не дублювався клік обкладинки
  closeCard();
});

// ОНОВЛЕННЯ СТОРІНОК
function updatePages() {
  textPages.forEach((page, idx) => {
    page.classList.toggle('active', idx === currentPage);
  });

  photoPages.forEach((photo, idx) => {
    photo.classList.toggle('active', idx === currentPage);
  });
  
  pageIndicator.innerText = `${currentPage + 1} / ${textPages.length}`;
  prevBtn.disabled = currentPage === 0;
  nextBtn.disabled = currentPage === textPages.length - 1;
}

prevBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  if (currentPage > 0) {
    currentPage--;
    updatePages();
  }
});

nextBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  if (currentPage < textPages.length - 1) {
    currentPage++;
    updatePages();
  }
});