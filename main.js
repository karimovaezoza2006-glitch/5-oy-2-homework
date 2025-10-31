document.addEventListener('DOMContentLoaded', function () {
      if (window.feather) { feather.replace(); }
      if (window.AOS) { AOS.init({ duration: 450, easing: 'ease-out-cubic', once: true }); }

      // Elements
      const btnCart = document.getElementById('btnCart');
      const btnFav = document.getElementById('btnFav');
      const cartCountEl = document.getElementById('cartCount');
      const favCountEl = document.getElementById('favCount');
      const btnLang = document.getElementById('btnLang');
      const langLabel = document.getElementById('langLabel');
      const searchInput = document.getElementById('searchInput');
      const searchLabel = document.getElementById('searchLabel');
      const catLabel = document.getElementById('catLabel');
      const mobileSearchToggle = document.getElementById('mobileSearchToggle');
      const mobileSearchBar = document.getElementById('mobileSearchBar');
      const mobileSearchBtn = document.getElementById('mobileSearchBtn');
      const mobileSearchInput = document.getElementById('mobileSearchInput');

      // state from localStorage
      const storage = window.localStorage || {};
      let cartCount = parseInt(storage.getItem('demo_cart') || '0', 10);
      let favCount = parseInt(storage.getItem('demo_fav') || '0', 10);
      let lang = storage.getItem('demo_lang') || 'ru'; // 'ru' or 'uz'

      function updateCountsUI() {
        if (cartCount > 0) { cartCountEl.textContent = cartCount; cartCountEl.classList.remove('hidden'); }
        else cartCountEl.classList.add('hidden');

        if (favCount > 0) { favCountEl.textContent = favCount; favCountEl.classList.remove('hidden'); }
        else favCountEl.classList.add('hidden');
      }

      function applyLanguage() {
        // simple translations
        const dict = {
          ru: {
            cat: 'Категории', search: 'Искать', compare: 'Сравнение', pay: 'Оплатить', track: 'Отследить',
            cart: 'Корзина', fav: 'Избранное', login: 'Войти', langToggle: "O'zbekcha"
          },
          uz: {
            cat: 'Kategoriyalar', search: 'Qidirish', compare: 'Taqqoslash', pay: "To'lov", track: 'Kuzatish',
            cart: 'Savat', fav: 'Sevimlilar', login: 'Kirish', langToggle: 'Русский'
          }
        };
        const t = dict[lang];

        // apply text changes (elements exist above)
        if (catLabel) catLabel.textContent = t.cat;
        if (searchLabel) searchLabel.textContent = t.search;
        // labels under icons: they are multiple elements - update by matching
        document.querySelectorAll('[data-key]').forEach(btn => {
          const k = btn.getAttribute('data-key');
          if (k === 'compare') btn.querySelector('span').textContent = t.compare;
          if (k === 'pay') btn.querySelector('span').textContent = t.pay;
          if (k === 'track') btn.querySelector('span').textContent = t.track;
        });
        // cart & fav / login and lang text
        document.querySelectorAll('#btnCart span, #btnFav span').forEach(el => {
          // the second child is the label text for these buttons
          const parent = el.parentElement;
          if (parent.id === 'btnCart') el.textContent = t.cart;
          if (parent.id === 'btnFav') el.textContent = t.fav;
        });
        document.querySelectorAll('button').forEach(b => {
          // find login button via its icon/user presence
          if (b.querySelector('[data-feather="user"]')) {
            const s = b.querySelector('span');
            if (s) s.textContent = t.login;
          }
        });
        if (langLabel) langLabel.textContent = t.langToggle;
      }

      // initial apply
      updateCountsUI();
      applyLanguage();
      // store initial preferences
      storage.setItem('demo_cart', cartCount);
      storage.setItem('demo_fav', favCount);
      storage.setItem('demo_lang', lang);

      // Cart click increments count & subtle animation
      btnCart.addEventListener('click', function () {
        cartCount = (cartCount || 0) + 1;
        storage.setItem('demo_cart', cartCount);
        updateCountsUI();
        // little pulse
        btnCart.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.12)' }, { transform: 'scale(1)' }], { duration: 220 });
      });

      // Fav click increments & heart fill animation
      btnFav.addEventListener('click', function () {
        favCount = (favCount || 0) + 1;
        storage.setItem('demo_fav', favCount);
        updateCountsUI();
        // quick heart bounce + color toggle
        btnFav.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-6px)' }, { transform: 'translateY(0)' }], { duration: 220 });
        // add temporary tint
        const icon = btnFav.querySelector('i');
        icon && icon.style.setProperty('color', '#ec4899');
        setTimeout(() => { icon && icon.style.removeProperty('color'); }, 700);
      });

      // Language toggle
      btnLang.addEventListener('click', function () {
        lang = (lang === 'ru') ? 'uz' : 'ru';
        storage.setItem('demo_lang', lang);
        applyLanguage();
        // small rotate animation
        btnLang.animate([{ transform: 'rotate(0deg)' }, { transform: 'rotate(15deg)' }, { transform: 'rotate(0deg)' }], { duration: 240 });
      });

      // Mobile search toggle
      mobileSearchToggle && mobileSearchToggle.addEventListener('click', function () {
        mobileSearchBar.classList.toggle('hidden');
        if (!mobileSearchBar.classList.contains('hidden')) {
          mobileSearchInput.focus();
        }
      });

      // mobile search button demo
      mobileSearchBtn && mobileSearchBtn.addEventListener('click', function () {
        const q = mobileSearchInput.value.trim();
        if (q) alert((lang === 'ru' ? 'Ищем: ' : 'Qidirish: ') + q);
        else alert(lang === 'ru' ? 'Введите запрос' : 'Soʻrov kiriting');
      });

      // desktop search (demo)
      document.getElementById('btnSearch') && document.getElementById('btnSearch').addEventListener('click', function () {
        const q = searchInput.value.trim();
        if (q) alert((lang === 'ru' ? 'Ищем: ' : 'Qidirish: ') + q);
        else alert(lang === 'ru' ? 'Введите запрос' : 'Soʻrov kiriting');
      });

      // Accessibility: Enter key on search input
      searchInput && searchInput.addEventListener('keydown', function(e){
        if (e.key === 'Enter') document.getElementById('btnSearch').click();
      });

      // Re-run feather for any dynamic icons (not needed typically)
      if (window.feather) feather.replace();
    });
        const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const cards = track.children;
    const cardWidth = 290; // har bir kartaning eni (padding bilan)
    let index = 0;

    function moveCarousel() {
      track.style.transform = `translateX(-${index * cardWidth}px)`;
    }

    nextBtn.addEventListener('click', () => {
      if (index < cards.length - 1) index++;
      else index = 0;
      moveCarousel();
    });

    prevBtn.addEventListener('click', () => {
      if (index > 0) index--;
      else index = cards.length - 1;
      moveCarousel();
    });

    // Avtomatik slayd (har 3 sekundda)
    setInterval(() => nextBtn.click(), 3000);