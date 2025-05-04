// DarkMode
const html = document.documentElement;
const toggleBtn = document.getElementById("theme-toggle");

if (html.classList.contains("dark")) {
    toggleBtn.innerText = "light_mode";
} else {
    toggleBtn.innerText = "dark_mode";
}

toggleBtn.addEventListener("click", function () {
    if (html.classList.contains("dark")) {
        html.classList.remove("dark");
        toggleBtn.innerText = "dark_mode";
        localStorage.removeItem("darkmode");
    } else {
        html.classList.add("dark");
        toggleBtn.innerText = "light_mode";
        localStorage.setItem("darkmode", "true");
    }
});