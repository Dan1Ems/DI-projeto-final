const themeButton = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-icon");
const themeText = document.querySelector("#theme-text");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
}

function updateThemeButton() {
    const isDark = document.documentElement.classList.contains("dark");

    themeIcon.setAttribute("data-lucide", isDark ? "sun" : "moon");
    themeText.textContent = isDark ? "Light Mode" : "Dark Mode";

    lucide.createIcons();
}

updateThemeButton();

themeButton.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");

    localStorage.setItem("theme", isDark ? "dark" : "light");

    updateThemeButton();
});