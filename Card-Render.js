
import { tools } from "./Array.js";

export function renderCards(type = "") {
    const grid = document.getElementById("softwareGrid");

    // Clear existing cards
    grid.innerHTML = "";

    // Filter tools if a type was provided
    const filteredTools = type
        ? tools.filter(tool => tool.type === type)
        : tools;

    for (const tool of filteredTools) {
        const card = document.createElement("article");
        card.className = "software-card";
        card.dataset.type = tool.type;

        card.innerHTML = `
            <div class="software-top">
                <div class="software-icon pink"
                     style="color: ${tool.icon_accent}; background: #191e2d;">
                    <img src="${tool.icon}" alt="${tool.name} icon" loading="lazy" decoding="async">
                </div>
                <!--<span class="software-badge">OPEN SOURCE</span>-->
            </div>

            <h3>${tool.name}</h3>
            <div class="software-author">by ${tool.creator}</div>
            <p class="software-description">${tool.description}</p>

            <div class="software-tags">
                ${tool.tags.map(tag =>
                    `<span class="tag">${tag.toUpperCase()}</span>`
                ).join("")}
            </div>

            <div class="software-meta">
                <span class="meta-label">TYPE</span>
                <span>${tool.type.toUpperCase()}</span>
                <span class="meta-label">LICENSE</span>
                <span>${tool.license}</span>
            </div>

            <div class="software-bottom">
                <a href="${tool.website}" class="download-link"
                   target="_blank" rel="noopener noreferrer">WEBSITE ↗</a>

                <a href="${tool.sourceUrl}" class="download-link source-link"
                   target="_blank" rel="noopener noreferrer">SOURCE CODE ↗</a>
            </div>
        `;

        grid.appendChild(card);
    }
}
