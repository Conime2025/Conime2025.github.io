// Darkmode toggle script

const html = document.documentElement;
const toggleBtn = document.getElementById("theme-toggle");

toggleBtn.addEventListener("click", function () {
    const isDark = html.classList.toggle("dark");
    if (isDark) {
        localStorage.setItem("darkmode", "true");
    } else {
        localStorage.removeItem("darkmode");
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



