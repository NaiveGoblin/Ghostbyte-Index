import { renderCards } from "./Card-Render.js";
import { tools } from "./Array.js";

document.addEventListener("DOMContentLoaded", () => {
    // Render the first page of all tools
    renderCards();

    // Update the total tools counter
    SoftwareCount();

    // Set up category filters
    const buttons = document.querySelectorAll(".filter-btn");
    const directoryPath = document.getElementById("directoryPath");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const type = button.dataset.filter;

            // Reset to page 1 for the selected category
            renderCards(type === "All" ? "" : type, 1);

            // Update active filter button
            buttons.forEach(btn => {
                const active = btn === button;

                btn.classList.toggle("active", active);
                btn.setAttribute("aria-pressed", String(active));
            });

            // Update the directory label
            directoryPath.textContent =
                type === "All"
                    ? "/software/all"
                    : `/software/${type.toLowerCase()}`;
        });
    });
});

function SoftwareCount() {
    document.getElementById("Tools_Count").textContent =
        tools.length.toLocaleString();
}


// Random program button
const randomButton = document.getElementById("randomProgramBtn");

 randomButton.addEventListener("click", event => {
    event.preventDefault();

    // Display one randomly selected tool
    renderCards("", 1, true);

    // Clear the active category filter
    buttons.forEach(button => {
        button.classList.remove("active");
        button.setAttribute("aria-pressed", "false");
    });

    // Update the directory label
    directoryPath.textContent = "/software/random";

    // Scroll to the selected tool
    document.getElementById("repository").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});
