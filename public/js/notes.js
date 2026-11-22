async function loadNotes(url) {
    try {
        const response = await fetch(`${url}`);

        if (!response.ok) {
            throw new Error("Could not retrieve notes")
        }

        const notes = await response.json();

        const notesTemplate = document.querySelector("#note-template");
        const notesContainer = document.querySelector("#notes-container");

        notesContainer.innerHTML = "";

        if (notes.length === 0) {
            notesContainer.textContent = "You don't have any notes yet.";
            return;
        }

        notes.reverse().forEach(note => {
            const clone = notesTemplate.content.cloneNode(true);

            const div = clone.querySelector(".note-card");
            const updateButton = clone.querySelector(".note-btn-update");
            const deleteButton = clone.querySelector(".note-btn-delete");

            clone.querySelector(".note-title-text").textContent = note.title;

            if (updateButton) {
                updateButton.addEventListener("click", (event) => {
                    event.stopPropagation();
                    openEditForm(note);
                });
            }

            if (deleteButton) {
                deleteButton.addEventListener("click", async (event) => {
                    event.stopPropagation();

                    const confirmation = confirm(`Are you sure you want to delete "${note.title}"?`);

                    if (!confirmation) {
                        return;
                    }

                    try {
                        const response = await fetch(`/api/notes/${note.id}`, {
                            method: "DELETE"
                        });

                        if (!response.ok) {
                            throw new Error("Could not delete note");
                        }

                        await loadNotes(url);

                    } catch (error) {
                        console.error(error);
                    }
                });

            }

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

function openEditForm(note) {
    document.querySelector("#edit-note-id").value = note.id;
    document.querySelector("#edit-note-title").value = note.title;
    document.querySelector("#edit-note-text").value = note.text;

    document.querySelector("#edit-note-modal").classList.remove("hidden");
}

function initializeEditForm() {
    const editForm = document.querySelector("#edit-note-form");
    const cancelButton = document.querySelector("#cancel-edit");

    editForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const noteId = document.querySelector("#edit-note-id").value;
        const title = document.querySelector("#edit-note-title").value;
        const text = document.querySelector("#edit-note-text").value;

        try {
            const response = await fetch(`/api/notes/${noteId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, text })
            });

            if (!response.ok) {
                throw new Error("Could not update note");
            }

            document.querySelector("#edit-note-modal").classList.add("hidden");

            await loadNotes("/api/notes/mynotes");

        } catch (error) {
            console.error(error);
        }
    });

    cancelButton.addEventListener("click", () => {
        document.querySelector("#edit-note-modal").classList.add("hidden");
    });
}

function deleteNote() {

}