const sidebar = document.querySelector("#sidebar");
const sidebarButton = document.querySelector("#sidebar-button");

sidebarButton.addEventListener("click", () => {
    const sidebarIcon = document.querySelector("#sidebar-icon");
    sidebar.classList.toggle("collapsed");
    mainContent.classList.toggle("expanded");

    if (sidebar.classList.contains("collapsed")) {
        sidebarIcon.setAttribute("data-lucide", "panel-left-open");
    } else {
        sidebarIcon.setAttribute("data-lucide", "panel-left-close");
    }
    
    lucide.createIcons();
});
