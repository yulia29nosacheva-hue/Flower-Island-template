
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("mobileMenuToggle");
  const mobileNav = document.getElementById("mobileNav");
  const closeBtn = document.getElementById("mobileNavClose");
  const overlay = document.getElementById("mobileNavOverlay");
  const mobileSearchInput = document.querySelector(".mobile-search-input");
  const mobileSearchBtn = document.querySelector(".mobile-search-btn");
  
  // Десктопный поиск
  const desktopSearchInput = document.querySelector(".desktop-search-input");
  const desktopSearchBtn = document.querySelector(".desktop-search-btn");

  // Открытие/закрытие меню по клику на гамбургер
  burger.addEventListener("click", () => {
    mobileNav.classList.toggle("open");
    overlay?.classList.toggle("open");
    
    // Блокируем скролл body когда меню открыто
    if (mobileNav.classList.contains("open")) {
      document.body.style.overflow = "hidden";
      // Фокус на поле поиска при открытии меню
      setTimeout(() => {
        mobileSearchInput?.focus();
      }, 300);
    } else {
      document.body.style.overflow = "";
    }
  });

  // Закрытие меню по клику на кнопку закрытия
  closeBtn.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    overlay?.classList.remove("open");
    document.body.style.overflow = "";
  });

  // Закрытие меню по клику на overlay
  overlay?.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    overlay?.classList.remove("open");
    document.body.style.overflow = "";
  });

  // Закрытие меню по клику на пункт меню
  mobileNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      overlay?.classList.remove("open");
      document.body.style.overflow = "";
    });
  });

  // Закрытие меню по нажатию ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileNav.classList.contains("open")) {
      mobileNav.classList.remove("open");
      overlay?.classList.remove("open");
      document.body.style.overflow = "";
    }
  });

  // Функциональность мобильного поиска
  const performMobileSearch = () => {
    const searchTerm = mobileSearchInput?.value.trim();
    if (searchTerm) {
      console.log("Mobile search for:", searchTerm);
      alert(`Поиск: ${searchTerm}`);
      
      // Закрываем меню после поиска
      mobileNav.classList.remove("open");
      overlay?.classList.remove("open");
      document.body.style.overflow = "";
      mobileSearchInput.value = "";
    }
  };

  // Функциональность десктопного поиска
  const performDesktopSearch = () => {
    const searchTerm = desktopSearchInput?.value.trim();
    if (searchTerm) {
      console.log("Desktop search for:", searchTerm);
      alert(`Поиск: ${searchTerm}`);
      
      // Очищаем поле после поиска
      desktopSearchInput.value = "";
    }
  };

  // Мобильный поиск
  mobileSearchBtn?.addEventListener("click", performMobileSearch);
  mobileSearchInput?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performMobileSearch();
    }
  });

  // Десктопный поиск
  desktopSearchBtn?.addEventListener("click", performDesktopSearch);
  desktopSearchInput?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performDesktopSearch();
    }
  });
});
