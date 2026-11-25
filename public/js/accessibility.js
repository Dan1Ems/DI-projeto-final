const dropdownContent = document.querySelector("#accessibilityDropdownContent");
const accessibilityButton = document.querySelector("#accessibilityButton");

accessibilityButton.addEventListener("click", () => {
    event.stopPropagation();
    dropdownContent.classList.toggle("show");
});

window.onclick = (event) => {
    if(!event.target.closest("#accessibilityButton") && !dropdownContent.contains(event.target)) {
        dropdownContent.classList.remove("show");
    }
}

const textAdjustButton = document.querySelector("#textAdjustButton");
const body = document.querySelector("body");
const accessibilitySpan = accessibilityButton.querySelector("span");

textAdjustButton.addEventListener("click", () => {
    event.stopPropagation();

    accessibilitySpan.textContent = "Accessibility";
    if (body.classList.contains("textLarge")) {
        body.classList.remove("textLarge");

        return;
    }

    if (body.classList.contains("textMedium")) {
        body.classList.remove("textMedium");
        body.classList.add("textLarge")

        accessibilitySpan.textContent = "A11Y";
        return;
    }
    body.classList.add("textMedium");
});