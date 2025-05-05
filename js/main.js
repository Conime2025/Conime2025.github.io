// Darkmode toggle script
/*
const html = document.documentElement;
const toggleBtn = document.getElementById("theme-toggle");

toggleBtn.addEventListener("click", function () {
    const isDark = html.classList.toggle("dark");
    if (isDark) {
        localStorage.setItem("darkmode", "true");
    } else {
        localStorage.removeItem("darkmode");
    }
}); */

document.addEventListener("DOMContentLoaded", () => {
    const html = document.documentElement;
    const darkBtn = document.getElementById("darkmode");
    const lightBtn = document.getElementById("lightmode");

    // Fungsi untuk aktifkan dark mode
    const enableDarkMode = () => {
        html.classList.add("dark");
        localStorage.setItem("darkmode", "true");
        darkBtn?.classList.add("hidden");
        lightBtn?.classList.remove("hidden");
    };

    // Fungsi untuk nonaktifkan dark mode
    const disableDarkMode = () => {
        html.classList.remove("dark");
        localStorage.setItem("darkmode", "false");
        lightBtn?.classList.add("hidden");
        darkBtn?.classList.remove("hidden");
    };

    // Cek localStorage saat pertama kali load
    const savedMode = localStorage.getItem("darkmode");
    if (savedMode === "true") {
        enableDarkMode();
    } else {
        disableDarkMode();
    }

    // Event listener
    darkBtn?.addEventListener("click", enableDarkMode);
    lightBtn?.addEventListener("click", disableDarkMode);
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
    }

    // Event listener tombol
    document.getElementById('btn-next').addEventListener('click', () => {
        rotate('next');
    });

    document.getElementById('btn-prev').addEventListener('click', () => {
        rotate('prev');
    });
});