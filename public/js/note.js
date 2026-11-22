async function loadNote(noteId) {
    try {
        const response = await fetch(`/api/notes/${noteId}`);

        if (!response.ok) {
            throw new Error(`Could not retrieve note: ${response.status}`);
        }

        const note = await response.json();

        document.querySelector("#note-title").textContent = note.title;
        document.querySelector("#note-text").textContent = note.text;

    } catch (error) {
        console.error(error);
    }
}