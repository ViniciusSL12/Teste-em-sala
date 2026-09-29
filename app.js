(() => {
    const cards = Array.from(document.querySelectorAll(".topic-card"));
    const topicTools = document.querySelector("[data-topic-tools]");
    const searchInput = document.querySelector("#topic-search");
    const searchStatus = document.querySelector("[data-search-status]");
    const emptyState = document.querySelector("[data-empty-state]");
    const readingProgress = document.querySelector("[data-reading-progress]");
    const progressBar = document.querySelector("#topic-progress");
    const progressLabel = document.querySelector("[data-progress-label]");
    const progressPercent = document.querySelector("[data-progress-percent]");

    if (
        cards.length === 0 ||
        !topicTools ||
        !searchInput ||
        !searchStatus ||
        !emptyState ||
        !readingProgress ||
        !progressBar ||
        !progressLabel ||
        !progressPercent
    ) {
        return;
    }

    const storageKey = "techblog-read-topics";
    const cardIds = new Set(cards.map((card) => card.id));
    let readTopics = new Set();

    try {
        const savedTopics = JSON.parse(window.localStorage.getItem(storageKey) || "[]");
        if (Array.isArray(savedTopics)) {
            readTopics = new Set(savedTopics.filter((topicId) => cardIds.has(topicId)));
        }
    } catch {
        readTopics = new Set();
    }

    const normalize = (value) => value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase("pt-BR");

    function updateProgress() {
        const completedCount = readTopics.size;
        const percentage = Math.round((completedCount / cards.length) * 100);

        progressBar.max = cards.length;
        progressBar.value = completedCount;
        progressLabel.textContent = `${completedCount} de ${cards.length} temas lidos`;
        progressPercent.textContent = `${percentage}%`;

        cards.forEach((card) => {
            const button = card.querySelector("[data-read-toggle]");
            const isRead = readTopics.has(card.id);

            if (!button) {
                return;
            }

            button.setAttribute("aria-pressed", String(isRead));
            button.querySelector("[data-read-label]").textContent = isRead ? "Lido" : "Marcar como lido";
        });
    }

    function filterCards() {
        const query = normalize(searchInput.value.trim());
        let visibleCount = 0;

        cards.forEach((card) => {
            const matches = normalize(card.textContent).includes(query);
            card.hidden = !matches;
            visibleCount += Number(matches);
        });

        searchStatus.textContent = query
            ? `${visibleCount} ${visibleCount === 1 ? "tema encontrado" : "temas encontrados"}.`
            : `Exibindo ${visibleCount} temas.`;
        emptyState.hidden = visibleCount > 0;
    }

    topicTools.hidden = false;
    searchStatus.hidden = false;
    readingProgress.hidden = false;
    cards.forEach((card) => {
        const button = card.querySelector("[data-read-toggle]");
        if (button) {
            button.hidden = false;
        }
    });

    updateProgress();
    filterCards();

    searchInput.addEventListener("input", filterCards);

    document.querySelectorAll("[data-read-toggle]").forEach((button) => {
        button.addEventListener("click", () => {
            const card = button.closest(".topic-card");
            if (!card) {
                return;
            }

            if (readTopics.has(card.id)) {
                readTopics.delete(card.id);
            } else {
                readTopics.add(card.id);
            }

            try {
                window.localStorage.setItem(storageKey, JSON.stringify([...readTopics]));
            } catch {
                // The reading state still works for this visit when storage is unavailable.
            }

            updateProgress();
        });
    });

    document.addEventListener("click", (event) => {
        if (!(event.target instanceof Element)) {
            return;
        }

        const link = event.target.closest('a[href^="#"]');
        if (!link) {
            return;
        }

        const target = document.getElementById(link.getAttribute("href").slice(1));
        if (target?.matches(".topic-card") && target.hidden) {
            searchInput.value = "";
            filterCards();
        }
    });
})();