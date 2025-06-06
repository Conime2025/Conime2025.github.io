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


// Rolling img headlines
// Ambil semua elemen per bagian
document.addEventListener('DOMContentLoaded', () => {
    const links = [
        document.querySelector('.link1'),
        document.querySelector('.link2'),
        document.querySelector('.link3'),
        document.querySelector('.link4'),
    ];

    const links2 = [
        document.querySelector('.link1-2'),
        document.querySelector('.link2-2'),
        document.querySelector('.link3-2'),
        document.querySelector('.link4-2'),
    ];

    const imgs = [
        document.querySelector('.img1'),
        document.querySelector('.img2'),
        document.querySelector('.img3'),
        document.querySelector('.img4'),
    ];

    const dates = [
        document.querySelector('.date1'),
        document.querySelector('.date2'),
        document.querySelector('.date3'),
        document.querySelector('.date4'),
    ];

    let currentIndex = 0;

    function rotate(direction = 'next') {
        const total = links.length;

        // Simpan semua nilai sekarang
        const temp = [];

        for (let i = 0; i < total; i++) {
            temp.push({
                href: links[i].getAttribute('href'),
                alt: links[i].getAttribute('alt'),

                href2: links2[i].getAttribute('href'),
                text2: links2[i].innerText,

                src: imgs[i].getAttribute('src'),
                altImg: imgs[i].getAttribute('alt'),

                dateText: dates[i].innerText,
            });
        }

        // Tambahkan efek fade-out
        links.forEach((el, i) => el.classList.add('fade-out'));
        links2.forEach((el) => el.classList.add('fade-out'));
        imgs.forEach((el) => el.classList.add('fade-out'));
        dates.forEach((el) => el.classList.add('fade-out'));

        setTimeout(() => {

            // Geser index sesuai arah
            let offset = direction === 'next' ? 1 : -1;

            for (let i = 0; i < total; i++) {
                const fromIndex = (i + offset + total) % total;

                links[i].setAttribute('href', temp[fromIndex].href);
                links[i].setAttribute('alt', temp[fromIndex].alt);

                links2[i].setAttribute('href', temp[fromIndex].href2);
                links2[i].innerText = temp[fromIndex].text2;

                imgs[i].setAttribute('src', temp[fromIndex].src);
                imgs[i].setAttribute('alt', temp[fromIndex].altImg);

                dates[i].innerText = temp[fromIndex].dateText;
            }
            // Hapus fade-out, balik ke fade in
            links.forEach((el) => el.classList.remove('fade-out'));
            links2.forEach((el) => el.classList.remove('fade-out'));
            imgs.forEach((el) => el.classList.remove('fade-out'));
            dates.forEach((el) => el.classList.remove('fade-out'));
        }, 500); // waktu fade-out = waktu di CSS
    }

    // Event listener tombol
    document.getElementById('btn-next').addEventListener('click', () => {
        rotate('next');
    });

    document.getElementById('btn-prev').addEventListener('click', () => {
        rotate('prev');
    });
    setInterval(() => {
        rotate('next');
    }, 5000); // 5000ms = 5 detik

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
        lastViewed.forEach(item => {
            const li = document.createElement("li");
            li.className = "relative flex flex-row justify-start items-center group gap-x-0 w-full h-32 lg:h-20 bg-cover  overflow-hidden rounded-md bg-gradient-to-br from-white dark:from-zinc-900 from-0% via-zinc-50 dark:via-zinc-950 via-70% to-zinc-300 dark:to-zinc-950 to-100%";

            const imageSrc = item.image ? item.image : "/images/default-thumbnail.jpg"; // fallback

            li.innerHTML = `
          <img src="${imageSrc}" alt="gambar-${item.title}" class="w-auto h-32 lg:h-20 group-hover:opacity-0 opacity-30 lg:opacity-100 transition duration-500 ease-in-out object-cover"/>
          <h2 class="w-full h-full flex justify-center items-center inset-0 opacity-100 lg:opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out  absolute px-4 text-2xl">
            <a href="${item.url}" class="hover:underline break-words line-clamp-2 h-fit text-xl font-light dark:font-extralight">
              ${item.title}
            </a>
          </h2>
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

