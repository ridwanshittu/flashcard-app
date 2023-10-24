document.addEventListener("DOMContentLoaded", function () {
    const flashcard = document.getElementById("flashcard");
    const germanContent = document.getElementById("germanContent");
    const englishContent = document.getElementById("englishContent");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");

    let flashcardsData = [];
    let currentIndex = 0;

    // Load flashcard data from CSV
    fetch("flashcards.csv")
        .then(response => response.text())
        .then(data => {
            flashcardsData = parseCSV(data);
            updateCard();
        })
        .catch(error => console.error("Error loading CSV file: " + error));

    function parseCSV(csv) {
        const lines = csv.split("\n");
        const flashcardsData = [];
        for (let i = 1; i < lines.length; i++) {
            const [german, english] = lines[i].split(",");
            flashcardsData.push({ german, english });
        }
        return flashcardsData;
    }

    function updateCard() {
        const currentFlashcard = flashcardsData[currentIndex];
        germanContent.textContent = currentFlashcard.german;
        englishContent.textContent = currentFlashcard.english;
        englishContent.style.opacity = 0;
    }

    function showNextCard() {
        if (currentIndex < flashcardsData.length - 1) {
            currentIndex++;
            updateCard();
            flashcard.classList.remove("flipped");
        }
    }

    function showPrevCard() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCard();
            flashcard.classList.remove("flipped");
        }
    }

    nextButton.addEventListener("click", showNextCard);
    prevButton.addEventListener("click", showPrevCard);

    flashcard.addEventListener("click", function () {
        flashcard.classList.toggle("flipped");
        if (flashcard.classList.contains("flipped")) {
            englishContent.style.opacity = 1;
        } else {
            englishContent.style.opacity = 0;
        }
    });

    // Swipe left and right functionality (you can add touch event listeners for mobile)
    window.addEventListener("keydown", function (event) {
        if (event.key === "ArrowRight") {
            showNextCard();
        } else if (event.key === "ArrowLeft") {
            showPrevCard();
        }
    });
});
