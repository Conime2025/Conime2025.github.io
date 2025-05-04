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