async function loadProfile() {
    try {
        const response = await fetch("/api/profile");

        if (!response.ok) {
            throw new Error(`Could not retrieve profile: ${response.status}`);
        }

        const profile = await response.json();

        const usernameElement = document.querySelector("#profileUsername");

        usernameElement.textContent = profile.username;

    } catch (error) {
        console.error("Profile loading failed:", error);
    }
}