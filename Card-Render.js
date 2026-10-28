import { tools } from "./Array.js";

const TOOLS_PER_PAGE = 15;

export function renderCards(type = "", page = 1, random = false) {
    const grid = document.getElementById("softwareGrid");
    const pagination = document.getElementById("pagination");
    const resultsCount = document.getElementById("resultsCount");

    // Pick one random tool, or filter normally
    const filteredTools = random
        ? [tools[Math.floor(Math.random() * tools.length)]].filter(Boolean)
        : type
            ? tools.filter(tool => tool.type === type)
            : tools;

    const totalTools = filteredTools.length;
    const totalPages = Math.ceil(totalTools / TOOLS_PER_PAGE);

    page = Math.max(1, Math.min(page, Math.max(totalPages, 1)));

    const startIndex = (page - 1) * TOOLS_PER_PAGE;
    const endIndex = Math.min(startIndex + TOOLS_PER_PAGE, totalTools);
    const pageTools = filteredTools.slice(startIndex, endIndex);

    grid.innerHTML = "";

    // Render cards
    for (const tool of pageTools) {
        const card = document.createElement("article");
        card.className = "software-card";
        card.dataset.type = tool.type;

        card.innerHTML = `
            <div class="software-icon pink"
                 style="--icon-accent: ${tool.icon_accent};">
                <img
                    src="${tool.icon}"
                    alt="${tool.name} icon"
                    loading="lazy"
                    decoding="async"
                >
            </div>

            <div class="software-content">
                <div class="software-heading">
                    <h3>${tool.name}</h3>
                    <div class="software-author">by ${tool.creator}</div>
                </div>

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
                    <a href="${tool.website}"
                       class="download-link"
                       target="_blank"
                       rel="noopener noreferrer">
                        WEBSITE ↗
                    </a>

                    <a href="${tool.sourceUrl}"
                       class="download-link source-link"
                       target="_blank"
                       rel="noopener noreferrer">
                        SOURCE CODE ↗
                    </a>
                </div>
            </div>
        `;

        grid.appendChild(card);
    }

    // Update results information
    if (random && totalTools > 0) {
        resultsCount.textContent = `RANDOM PICK: ${filteredTools[0].name}`;
    } else if (totalTools === 0) {
        resultsCount.textContent = "0 tools found";
    } else {
        resultsCount.textContent =
            `Showing ${startIndex + 1}–${endIndex} of ${totalTools} tools`;
    }

    // Render pagination (automatically hidden for one random result)
    renderPagination(pagination, totalPages, page, type);
}


function renderPagination(container, totalPages, currentPage, type) {
    container.innerHTML = "";

    // Hide pagination when there is only one page
    if (totalPages <= 1) {
        container.hidden = true;
        return;
    }

    container.hidden = false;

    // Previous button
    const previousButton = createPageButton("← PREVIOUS", currentPage - 1);
    previousButton.disabled = currentPage === 1;
    container.appendChild(previousButton);

    // Numbered page buttons
    for (let page = 1; page <= totalPages; page++) {
        const button = createPageButton(String(page), page);

        if (page === currentPage) {
            button.classList.add("active");
            button.setAttribute("aria-current", "page");
        }

        container.appendChild(button);
    }

    // Next button
    const nextButton = createPageButton("NEXT →", currentPage + 1);
    nextButton.disabled = currentPage === totalPages;
    container.appendChild(nextButton);

    function createPageButton(label, page) {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "page-btn";
        button.textContent = label;

        button.addEventListener("click", () => {
            renderCards(type, page);

            // Return to the repository when changing pages
            document.getElementById("repository").scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });

        return button;
    }
}
