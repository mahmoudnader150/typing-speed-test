const textArray = [
    "The early morning sun cast long shadows across the quiet park as joggers made their way along the winding paths. Birds chirped cheerfully in the trees above, welcoming the new day with their melodious songs. A gentle breeze carried the sweet scent of blooming flowers through the air.",
    "Technology continues to advance at an unprecedented rate, transforming the way we live, work, and communicate with one another. From artificial intelligence to renewable energy solutions, innovation drives progress in every sector of modern society.",
    "Deep in the ancient forest, towering trees stretched their branches toward the sky, creating a natural cathedral of green leaves and filtered sunlight. The forest floor was carpeted with soft moss and delicate ferns, while the sound of a distant stream provided nature's perfect soundtrack.",
    "The bustling city streets came alive as people hurried to their destinations, briefcases and coffee cups in hand. Street vendors called out their morning specials, while taxis honked their horns in the growing traffic. The energy of urban life was palpable in every corner.",
    "Inside the cozy library, students pored over their textbooks, preparing for upcoming exams. The smell of old books and the soft whisper of turning pages created a peaceful atmosphere conducive to learning and concentration. Knowledge seekers found their sanctuary among the endless rows of books.",
    "Professional chefs worked with precision in the restaurant kitchen, creating culinary masterpieces from fresh ingredients. The sizzle of pans and the aroma of herbs filled the air as they prepared elegant dishes for eager diners. Every detail was carefully considered and executed.",
    "The scientific research team made an extraordinary breakthrough in their latest experiment, potentially revolutionizing their field of study. Months of dedicated work and careful analysis had finally paid off, opening new possibilities for future investigations.",
    "Waves crashed rhythmically against the sandy shore as seabirds soared overhead, searching for their morning meal. Beachcombers walked along the water's edge, collecting interesting shells and enjoying the peaceful atmosphere of the early morning seaside landscape.",
    "The artist's studio was filled with half-finished canvases and the rich smell of oil paints. Natural light streamed through large windows, illuminating works in progress and inspiring new creative directions. Every corner held potential for artistic expression and discovery.",
    "Musicians gathered for rehearsal in the concert hall, their instruments creating a symphony of sound as they warmed up. The conductor arrived with fresh sheet music, ready to guide the orchestra through another challenging piece. The acoustics carried every note perfectly."
];

document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const textElement = document.getElementById('text');
    const generateButton = document.getElementById('Generate-btn');
    const redoButton = document.getElementById('Redo-btn');
    const userInput = document.getElementById('user-input');
    const statsDiv = document.querySelector('.stats');
    const [wpmText, accuracyText] = statsDiv.querySelectorAll('p');

    let currentIndex = 0;
    let startTime = null;
    let wordCount = 0;
    let currentWordIndex = 0;
    let mistakes = 0;
    let totalCharacters = 0;

    // Function to get next text
    function getNextText() {
        const text = textArray[currentIndex];
        currentIndex = (currentIndex + 1) % textArray.length;
        textElement.textContent = text;
        userInput.value = '';
        resetStats();
        return text;
    }

    // Function to redo current text
    function redoText() {
        currentIndex = (currentIndex - 1 + textArray.length) % textArray.length;
        const text = textArray[currentIndex];
        textElement.textContent = text;
        userInput.value = '';
        resetStats();
    }

    // Reset statistics
    function resetStats() {
        startTime = null;
        currentWordIndex = 0;
        totalWordsTyped = 0;
        totalCorrectChars = 0;
        totalCharsTyped = 0;
        updateStats(0, 100);
    }

    // Update WPM and accuracy displays
    function updateStats(wpm, accuracy) {
        wpmText.textContent = `WPM: ${Math.round(wpm)}`;
        accuracyText.textContent = `Accuracy: ${Math.round(accuracy)}%`;
    }

    // Calculate WPM and accuracy
    function calculateStats(userInput, targetText) {
        if (!startTime && userInput.length > 0) {
            startTime = Date.now();
        }

        if (!userInput.length) {
            updateStats(0, 100);
            return;
        }

        const elapsedTime = (Date.now() - startTime) / 60000; // Convert to minutes
        const wordsTyped = userInput.trim().split(/\s+/).length;
        const wpm = elapsedTime > 0 ? wordsTyped / elapsedTime : 0;

        totalCharacters = userInput.length;
        mistakes = 0;
        for (let i = 0; i < userInput.length; i++) {
            if (userInput[i] !== targetText[i]) {
                mistakes++;
            }
        }

        const accuracy = totalCharacters > 0 ? ((totalCharacters - mistakes) / totalCharacters) * 100 : 100;
        updateStats(wpm, accuracy);
    }

    let totalWordsTyped = 0;
    let totalCorrectChars = 0;
    let totalCharsTyped = 0;

    // Handle input events
    userInput.addEventListener('input', (e) => {
        const targetText = textElement.textContent;
        const currentInput = e.target.value;
        
        // Initialize timer on first character
        if (!startTime && currentInput.length === 1) {
            startTime = Date.now();
        }

        // Check for space key and process completed word
        if (currentInput.endsWith(' ') || currentInput.endsWith('\n')
             || currentInput.endsWith('\t') || currentInput.endsWith('\r') || 
            currentInput.endsWith(',' ) || currentInput.endsWith('.') || 
            currentInput.endsWith('?') || currentInput.endsWith('!')) {
            const words = currentInput.trim().split(/\s+/);
            const targetWords = targetText.split(/\s+/);
            const currentWord = words[words.length - 1];
            const targetWord = targetWords[currentWordIndex];

            // Update stats for the completed word
            totalWordsTyped++;
            totalCharsTyped += currentInput.length;
            
            // Count correct characters in the current word
            let correctChars = 0;
            for (let i = 0; i < currentWord.length && i < targetWord.length; i++) {
                if (currentWord[i] === targetWord[i]) {
                    correctChars++;
                    totalCorrectChars++;
                }
            }

            // Calculate and update stats
            const elapsedTime = (Date.now() - startTime) / 60000; // Convert to minutes
            const wpm = elapsedTime > 0 ? totalWordsTyped / elapsedTime : 0;
            const accuracy = totalCharsTyped > 0 ? (totalCorrectChars / totalCharsTyped) * 100 : 100;
            
            updateStats(wpm, accuracy);
            
            // Clear input for next word
            userInput.value = '';
            currentWordIndex++;

            // Check if we've completed all words
            if (currentWordIndex >= targetWords.length) {
                setTimeout(() => {
                    getNextText();
                    totalWordsTyped = 0;
                    totalCorrectChars = 0;
                    totalCharsTyped = 0;
                    startTime = null;
                }, 500);
            }
        } else {
            // Update stats in real-time for the current word
            totalCharsTyped = totalWordsTyped * 5 + currentInput.length; // Assuming average word length of 5
            const elapsedTime = (Date.now() - startTime) / 60000;
            const currentCorrectChars = Array.from(currentInput).reduce((count, char, i) => {
                return count + (char === targetText[i] ? 1 : 0);
            }, totalCorrectChars);
            
            const wpm = elapsedTime > 0 ? (totalWordsTyped + (currentInput.length / 5)) / elapsedTime : 0;
            const accuracy = totalCharsTyped > 0 ? (currentCorrectChars / totalCharsTyped) * 100 : 100;
            
            updateStats(wpm, accuracy);
        }
    });

    // Add event listeners for buttons
    generateButton.addEventListener('click', getNextText);
    redoButton.addEventListener('click', redoText);

    // Set initial text
    getNextText();
});
