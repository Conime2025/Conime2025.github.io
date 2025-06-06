// Helper function
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// ====== DARK MODE TOGGLE ======
const html = document.documentElement;
const toggleBtn = $("#theme-toggle");

toggleBtn?.addEventListener("click", () => {
  const isDark = html.classList.toggle("dark");
  localStorage.setItem("darkmode", isDark.toString());
});

// ====== BERSIHKAN %20 PADA LINK ======
$$('a[href*="%20"]').forEach(link => {
  link.href = link.href.replace(/%20/g, '');
});

// ====== AUTO SCROLL ======
const scrollContainer = $("#autoScroll");
if (scrollContainer) {
  let scrollDirection = 1;
  function autoScroll() {
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    scrollContainer.scrollLeft += scrollDirection * 0.5;
    if (scrollContainer.scrollLeft >= maxScroll || scrollContainer.scrollLeft <= 0) {
      scrollDirection *= -1;
    }
    requestAnimationFrame(autoScroll);
  }
  requestAnimationFrame(autoScroll);
}

// ====== MODAL SHARE ======
function toggleShareModal() {
  const modal = $("#shareModal");
  modal?.classList.toggle("hidden");
}

$("#closeModal")?.addEventListener("click", () => {
  $("#shareModal")?.classList.add("hidden");
});

document.addEventListener("click", (event) => {
  const modal = $("#shareModal");
  if (
    modal &&
    !modal.classList.contains("hidden") &&
    !modal.contains(event.target) &&
    !event.target.closest('button[onclick="toggleShareModal()"]')
  ) {
    modal.classList.add("hidden");
  }
});

// ====== MODAL SEARCH ======
const btnSearchElements = $$('#searchBtn');
const searchModal = $('#searchModal');

btnSearchElements.forEach(el => {
  el.classList.add('tombol');
  el.addEventListener('click', () => {
    searchModal?.classList.remove('hidden');
  });
});

document.addEventListener('click', (e) => {
  if (
    searchModal &&
    !searchModal.contains(e.target) &&
    ![...btnSearchElements].some(btn => btn.contains(e.target))
  ) {
    searchModal.classList.add('hidden');
  }
});

// ====== LAST VIEWED STORAGE ======
window.addEventListener("DOMContentLoaded", () => {
  const maxItems = 5;
  const currentUrl = window.location.pathname;
  const isValidSinglePage = /^\/posts\/(anime|comic|movie|game)\/.+$/.test(currentUrl);

  if (isValidSinglePage) {
    const contentTitle = $(".post-title")?.innerText.trim();
    const contentImage = $("img.post-img")?.getAttribute("src") || "";

    if (contentTitle) {
      const currentPage = {
        url: window.location.href,
        title: contentTitle,
        image: contentImage
      };

      let lastViewed = JSON.parse(localStorage.getItem("lastViewed")) || [];
      lastViewed = lastViewed.filter(item => item.url !== currentPage.url);
      lastViewed.unshift(currentPage);
      lastViewed = lastViewed.slice(0, maxItems);
      localStorage.setItem("lastViewed", JSON.stringify(lastViewed));
    }
  }

  const listEl = $("#last-viewed-list");
  if (listEl) {
    const lastViewed = JSON.parse(localStorage.getItem("lastViewed")) || [];
    listEl.innerHTML = "";

    lastViewed.forEach(item => {
      const li = document.createElement("li");
      li.className = "relative flex flex-1 justify-start items-center group gap-x-0 w-full h-full bg-cover overflow-hidden rounded-md bg-gradient-to-br from-white dark:from-zinc-900 from-0% via-zinc-50 dark:via-zinc-950 via-70% to-zinc-300 dark:to-zinc-950 to-100%";
      const imageSrc = item.image || "/images/default-thumbnail.jpg";

      li.innerHTML = `
        <img src="${imageSrc}" alt="gambar-${item.title}" class="w-full h-full group-hover:opacity-0 opacity-30 lg:opacity-100 transition duration-500 ease-in-out object-cover"/>
        <div class="absolute inset-0 w-full h-full flex justify-center items-center opacity-100 lg:opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out px-4 text-2xl">
          <h2><a href="${item.url}" class="hover:underline break-words line-clamp-2 text-xl font-light dark:font-extralight">${item.title}</a></h2>
        </div>
      `;
      listEl.appendChild(li);
    });
  }
});

// ====== COPY SHARE LINK ======
function copyShareLink() {
  const linkInput = $("#shareLink");
  const popup = $("#popup-copy");

  if (!linkInput || !popup) return;

  linkInput.select();
  linkInput.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(linkInput.value).then(() => {
    setTimeout(() => {
      popup.classList.remove("hidden");
      popup.classList.add("flex");
    }, 1000);

    setTimeout(() => {
      popup.classList.remove("flex");
      popup.classList.add("hidden");
    }, 3000);
  });
}

// ====== LOADING SCREEN ======
const MIN_LOADING_TIME = 9000;
const loading = $('#loading-screen1');
const header = $('header');
const footer = $('footer'); 
const menuKiri = $('#menu-kiri');
const main = $('main');

const showMainContent = () => {
 if (loading) {
  loading.classList.remove('opacity-100');
  loading.classList.add('opacity-0');

  // Setelah transisi selesai (1 detik), baru hidden agar tidak mengganggu klik
  setTimeout(() => {
    loading.classList.add('hidden');
  }, 1000); // durasi fade-out
}

  header?.classList.remove('hidden'); header?.classList.add('flex');
  footer?.classList.remove('hidden'); footer?.classList.add('flex'); 
  main?.classList.remove('hidden');
  menuKiri?.classList.remove('hidden'); menuKiri?.classList.add('flex');
};

const alreadyShown = sessionStorage.getItem('loadingShown');
if (alreadyShown === 'true') {
  showMainContent();
} else {
  const startTime = Date.now();
  document.addEventListener('DOMContentLoaded', () => {
    const elapsed = Date.now() - startTime;
    const waitTime = Math.max(0, MIN_LOADING_TIME - elapsed);
    setTimeout(() => {
      sessionStorage.setItem('loadingShown', 'true');
      showMainContent();
    }, waitTime);
  });
}
