 
// Helper
const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

// Dark Mode Toggle
const html = document.documentElement;
const toggleBtn = $("#theme-toggle");
toggleBtn?.addEventListener("click", () => {
  const isDark = html.classList.toggle("dark");
  localStorage.setItem("darkmode", isDark);
});

// Bersihkan %20 dari link
$$('a[href*="%20"]').forEach(link => {
  link.href = link.href.replace(/%20/g, '');
});
 

// Auto Scroll
const scrollContainer = $("#autoScroll");
let scrollDirection = 1;
const autoScroll = () => {
  const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
  scrollContainer.scrollLeft += scrollDirection * 0.5;
  if (scrollContainer.scrollLeft >= maxScroll || scrollContainer.scrollLeft <= 0) scrollDirection *= -1;
  requestAnimationFrame(autoScroll);
};
scrollContainer && requestAnimationFrame(autoScroll);

// Share Modal
const toggleShareModal = () => $("#shareModal")?.classList.toggle("hidden");
$("#closeModal")?.addEventListener("click", () => $("#shareModal")?.classList.add("hidden"));
document.addEventListener("click", e => {
  const modal = $("#shareModal");
  if (!modal?.classList.contains("hidden") &&
      !modal.contains(e.target) &&
      !e.target.closest('button[onclick="toggleShareModal()"]')) {
    modal.classList.add("hidden");
  }
});

// Search Modal
const btnSearch = $("#searchBtn");
const searchModal = $("#searchModal");
btnSearch?.classList.add("tombol");
btnSearch?.addEventListener("click", () => searchModal?.classList.remove("hidden"));
document.addEventListener("click", e => {
  if (!searchModal?.contains(e.target) && !btnSearch?.contains(e.target)) {
    searchModal?.classList.add("hidden");
  }
});

// Copy Link
const copyShareLink = () => {
  const linkInput = $("#shareLink");
  const popup = $("#popup-copy");
  linkInput?.select();
  linkInput?.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(linkInput?.value || "").then(() => {
    setTimeout(() => {
      popup?.classList.remove("hidden");
      popup?.classList.add("flex");
    }, 1000);
    setTimeout(() => {
      popup?.classList.remove("flex");
      popup?.classList.add("hidden");
    }, 3000);
  });
};

// Loading Screen
const MIN_LOADING_TIME = 3000;
const loading = $("#loading-screen1");
const header = $("header");
const footer = $("footer");
const menuBawah = $("#menu-bawah");
const menuKiri = $("#menu-kiri");
const main = $("main");

const showMainContent = () => {
  loading?.classList.add("hidden");
  [header, footer, menuBawah].forEach(el => {
    el?.classList.remove("hidden");
    el?.classList.add("flex");
  });
  main?.classList.remove("hidden");
  menuKiri?.classList.remove("sm:hidden");
  menuKiri?.classList.add("sm:flex");
};

if (sessionStorage.getItem("loadingShown") === "true") {
  showMainContent();
} else {
  const startTime = Date.now();
  document.addEventListener("DOMContentLoaded", () => {
    const elapsed = Date.now() - startTime;
    setTimeout(() => {
      sessionStorage.setItem("loadingShown", "true");
      showMainContent();
    }, Math.max(0, MIN_LOADING_TIME - elapsed));
  });
}

// Last Viewed
window.addEventListener("DOMContentLoaded", () => {
  const maxItems = 5;
  const currentUrl = location.pathname;
  const isValid = /^\/posts\/(anime|comic|movie|game)\/.+$/.test(currentUrl);
  if (isValid) {
    const titleEl = $(".post-title");
    const imgEl = $$("img.post-img")[0];
    if (titleEl) {
      const currentPage = {
        url: location.href,
        title: titleEl.innerText.trim(),
        image: imgEl?.src || "/images/default-thumbnail.jpg"
      };
      let last = JSON.parse(localStorage.getItem("lastViewed")) || [];
      last = last.filter(item => item.url !== currentPage.url);
      last.unshift(currentPage);
      localStorage.setItem("lastViewed", JSON.stringify(last.slice(0, maxItems)));
    }
  }

  const listEl = $("#last-viewed-list");
  if (listEl) {
    const last = JSON.parse(localStorage.getItem("lastViewed")) || [];
    listEl.innerHTML = "";
    last.forEach(item => {
      const li = document.createElement("li");
      li.className = "relative flex flex-row justify-start items-center group gap-x-0 w-full h-32 lg:h-20 bg-cover overflow-hidden rounded-md bg-gradient-to-br from-white dark:from-zinc-900 from-0% via-zinc-50 dark:via-zinc-950 via-70% to-zinc-300 dark:to-zinc-950 to-100%";
      li.innerHTML = \`<img src="\${item.image}" alt="gambar-\${item.title}" class="w-full group-hover:opacity-0 opacity-30 lg:opacity-100 transition duration-500 ease-in-out h-full object-cover"/>
        <h2 class="w-full h-full flex justify-center items-center inset-0 opacity-100 lg:opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out absolute px-4 text-2xl">
          <a href="\${item.url}" class="hover:underline break-words line-clamp-2 h-fit text-xl font-light dark:font-extralight">
            \${item.title}
          </a>
        </h2>
      \`;
      listEl.appendChild(li);
    });
  }
});
