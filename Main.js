
import { renderCards } from "./Card-Render.js";
import { tools } from "./Array.js";

document.addEventListener("DOMContentLoaded", () => {
    // Render all tools on startup
    renderCards();

    // Update tools counter
    SoftwareCount();

    // Set up category filters
    const buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const type = button.dataset.filter;

            renderCards(type === "All" ? "" : type);

            // Update active button
            buttons.forEach(btn => {
                const active = btn === button;

                btn.classList.toggle("active", active);
                btn.setAttribute("aria-pressed", String(active));
            });
        });
    });
});

function SoftwareCount() {
    document.getElementById("Tools_Count").textContent =
        tools.length.toLocaleString();
}
