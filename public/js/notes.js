async function loadNotes(url) {
    try {
        const response = await fetch(`${url}`);

        if (!response.ok) {
            throw new Error("Could not retrieve notes")
        }

        const notes = await response.json();

        const notesTemplate = document.querySelector("#note-template");
        const notesContainer = document.querySelector("#notes-container");

        if (notes.length === 0) {
            notesContainer.textContent = "You don't have any notes yet.";
            return;
        }

        notes.reverse().forEach(note => {
            const clone = notesTemplate.content.cloneNode(true);

            const div = clone.querySelector(".note-card");

            clone.querySelector(".note-title-text").textContent = note.title;

            div.addEventListener("click", () => {
                loadPage(`/notes/show/${note.id}`, note.id);
            });

            notesContainer.appendChild(clone);
        });

        lucide.createIcons();

    } catch (error) {
        console.error(error);
    }
}