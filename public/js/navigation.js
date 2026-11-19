document.addEventListener("DOMContentLoaded", () => {
    const mainContent = document.querySelector("#main-content");
    const sidebarButtons = document.querySelectorAll(".sidebar-btn");

    async function loadPage(page) {
        try {
            const response = await fetch(`/${page}`);

            if (!response.ok) {
                throw new Error("Could not load page");
            }

            const html = await response.text();
            mainContent.innerHTML = html;
        } catch (error) {
            console.error(error);
            mainContent.innerHTML = "<p>Failed to load page.</p>";
        }
    }

    loadPage("profile");

    sidebarButtons.forEach(button => {
        button.addEventListener("click", () => {
            loadPage(button.dataset.page);
        });
    });
});