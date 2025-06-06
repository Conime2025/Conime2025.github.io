// Darkmode toggle script

const html = document.documentElement;
const toggleBtn = document.getElementById("theme-toggle");

toggleBtn.addEventListener("click", function () {
    const isDark = html.classList.toggle("dark");
    if (isDark) {
        localStorage.setItem("darkmode", "true");
    } else {
        localStorage.setItem("darkmode", "false");
    }
});


document.querySelectorAll('a[href*="%20"]').forEach(link => {
    link.href = link.href.replace(/%20/g, '');
});

 


const scrollContainer = document.getElementById('autoScroll');
let scrollDirection = 1; // 1: ke kanan, -1: ke kiri

function autoScroll() {
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

    scrollContainer.scrollLeft += scrollDirection * 0.5; // Kecepatan scroll (semakin kecil semakin lambat)

    // Balik arah saat mencapai ujung
    if (scrollContainer.scrollLeft >= maxScroll || scrollContainer.scrollLeft <= 0) {
        scrollDirection *= -1;
    }

    requestAnimationFrame(autoScroll); // Scroll halus terus-menerus
}

requestAnimationFrame(autoScroll);




function toggleShareModal() {
    const modal = document.getElementById('shareModal');
    modal.classList.toggle('hidden');
}

// Tutup modal saat tombol close diklik
document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('shareModal').classList.add('hidden');
});

// Tutup modal jika klik di luar modal
document.addEventListener('click', function (event) {
    const modal = document.getElementById('shareModal');

    // Cek jika modal sedang terbuka dan klik terjadi di luar modal serta bukan tombol pembuka
    if (!modal.classList.contains('hidden') &&
        !modal.contains(event.target) &&
        !event.target.closest('button[onclick="toggleShareModal()"]')) {
        modal.classList.add('hidden');
    }
});




// Cari elemen dengan ID 'btnSearch' (meskipun ada lebih dari satu, ID sebaiknya unik, tapi ini handle-nya)
const btnSearchElements = document.querySelectorAll('#searchBtn');
const searchModal = document.getElementById('searchModal');

// Tambahkan class 'tombol' ke semua elemen dengan ID 'btnSearch'
btnSearchElements.forEach((el) => {
    el.classList.add('tombol');

    // Tambahkan event listener untuk membuka modal
    el.addEventListener('click', () => {
        searchModal.classList.remove('hidden');
    });
});

// Tutup modal jika klik di luar area modal dan tombol
document.addEventListener('click', (e) => {
    const isClickInside =
        searchModal.contains(e.target) ||
        Array.from(btnSearchElements).some(btn => btn.contains(e.target));

    if (!isClickInside) {
        searchModal.classList.add('hidden');
    }
});





window.addEventListener("DOMContentLoaded", function () {
    const maxItems = 5;
    const currentUrl = window.location.pathname;

    // Hanya simpan jika halaman post
    const isValidSinglePage = /^\/posts\/(anime|comic|movie|game)\/.+$/.test(currentUrl);
    if (isValidSinglePage) {
        const contentTitleElement = document.querySelector(".post-title");

        // Ambil semua img.post-img lalu ambil yang pertama
        const contentImageElements = document.querySelectorAll("img.post-img");
        const contentImage = contentImageElements.length > 0
            ? contentImageElements[0].getAttribute("src")
            : "";

        if (contentTitleElement) {
            const contentTitle = contentTitleElement.innerText.trim();

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
    }

    // Tampilkan di semua halaman
    const listEl = document.getElementById("last-viewed-list");
    if (listEl) {
        const lastViewed = JSON.parse(localStorage.getItem("lastViewed")) || [];
        listEl.innerHTML = "";
        
        console.log("Menampilkan last viewed:");
console.log(lastViewed);

        lastViewed.forEach(item => {
            const li = document.createElement("li");
            li.className = "relative flex flex-1  justify-start items-center group gap-x-0 w-full h-full bg-cover  overflow-hidden rounded-md bg-gradient-to-br from-white dark:from-zinc-900 from-0% via-zinc-50 dark:via-zinc-950 via-70% to-zinc-300 dark:to-zinc-950 to-100%";

            const imageSrc = item.image ? item.image : "/images/default-thumbnail.jpg"; // fallback

            li.innerHTML = `
          <img src="${imageSrc}" alt="gambar-${item.title}" class="w-full h-full  group-hover:opacity-0 opacity-30 lg:opacity-100 transition duration-500 ease-in-out object-cover"/>
          <div class="absolute inset-0 w-full h-full flex justify-center items-center opacity-100 lg:opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out px-4 text-2xl">
           <h2> <a href="${item.url}" class="hover:underline break-words line-clamp-2  text-xl font-light dark:font-extralight">
              ${item.title}
            </a></h2>
          </div>
        `;
            listEl.appendChild(li);
        });
    }
});





function copyShareLink() {
    const linkInput = document.getElementById("shareLink");
    linkInput.select();
    linkInput.setSelectionRange(0, 99999); // for mobile

    navigator.clipboard.writeText(linkInput.value).then(() => {
        const popup = document.getElementById("popup-copy");

        // Tampilkan popup

        setTimeout(() => {
            popup.classList.remove("hidden");
            popup.classList.add("flex");
        }, 1000);


        // Sembunyikan kembali setelah 3 detik
        setTimeout(() => {
            popup.classList.remove("flex");
            popup.classList.add("hidden");
        }, 3000); // 3000ms = 3 detik
    });
}





  const MIN_LOADING_TIME = 3000;
  const loading = document.getElementById('loading-screen1');
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');
  const menuBawah = document.getElementById('menu-bawah');
  const menuKiri = document.getElementById('menu-kiri');
  const main = document.querySelector('main');

  const showMainContent = () => {
    loading?.classList.add('hidden');

    header?.classList.remove('hidden');
    header?.classList.add('flex');

    footer?.classList.remove('hidden');
    footer?.classList.add('flex');

    menuBawah?.classList.remove('hidden');
    menuBawah?.classList.add('flex');

    main?.classList.remove('hidden');

    // menu-kiri khusus
    menuKiri?.classList.remove('sm:hidden');
    menuKiri?.classList.add('sm:flex');
    // tetap hidden di mobile
  };

  const alreadyShown = sessionStorage.getItem('loadingShown');

  if (alreadyShown === 'true') {
    // Skip loading
    showMainContent();
  } else {
    // Show loading minimal 3 detik
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

