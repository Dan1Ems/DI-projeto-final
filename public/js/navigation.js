const mainContent = document.querySelector("#main-content");
const sidebarButtons = document.querySelectorAll(".sidebar-btn");

async function loadPage(url, noteId = null) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Could not load page: ${response.status}`);
        }

        const html = await response.text();
        mainContent.innerHTML = html;

        if (noteId !== null) {
            await loadNote(noteId);
        } else if (url === "/home") {
            await loadNotes("/api/notes/others");
        } else if (url === "/notes") {
            initializeCreateForm();
            initializeEditForm();
            await loadNotes("/api/notes/mynotes");
        } else if (url === "/profile") {
            await loadNotes("/api/notes/mynotes");
            await loadProfile();
        } else if (url === "/requirements") {
            showImages();
        }

    } catch (error) {
        console.error(error);
        mainContent.innerHTML = "<p>Failed to load page.</p>";
    }
}

loadPage("/home");

sidebarButtons.forEach(button => {
    button.addEventListener("click", () => {
        loadPage(button.dataset.page);
    });
});