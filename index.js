// Array of texts for typing practice
const texts = [
    "The early morning sun cast long shadows across the quiet park as joggers made their way along the winding paths. Birds chirped cheerfully in the trees above.",
    "Technology continues to advance at an unprecedented rate, transforming the way we live and work. Innovation drives progress in every sector of modern society.",
    "Deep in the ancient forest, towering trees stretched their branches toward the sky, creating a natural cathedral of filtered sunlight and gentle breezes.",
    "The bustling city streets came alive as people hurried to their destinations. Street vendors called out their morning specials as the city awakened.",
    "Inside the cozy library, students pored over their textbooks, preparing for upcoming exams. The smell of old books filled the peaceful atmosphere."
];

class TypingTest {
    constructor() {
        // DOM Elements
        this.textDisplay = document.getElementById('text');
        this.inputField = document.getElementById('user-input');
        this.timer = document.getElementById('timer');
        this.wpmDisplay = document.getElementById('wpm');
        this.accuracyDisplay = document.getElementById('accuracy');
        this.resultModal = document.getElementById('result');

        // Test State
        this.timeLeft = 60;
        this.timeElapsed = 0;
        this.currentIndex = 0;
        this.isRunning = false;
        this.intervalId = null;
        this.startTime = null;
        this.totalTyped = 0;
        this.correctTyped = 0;

        // Initialize
        this.initializeEventListeners();
        this.loadNewText();
    }

    initializeEventListeners() {
        // Input event for typing
        this.inputField.addEventListener('input', () => this.handleTyping());

        // Button click events
        document.getElementById('Generate-btn').addEventListener('click', () => this.loadNewText());
        document.getElementById('Redo-btn').addEventListener('click', () => this.restartTest());
    }

    handleTyping() {
        if (!this.isRunning) {
            this.startTest();
        }

        const inputText = this.inputField.value;
        const originalText = this.textDisplay.textContent;

        // Calculate accuracy
        this.totalTyped++;
        if (inputText[inputText.length - 1] === originalText[inputText.length - 1]) {
            this.correctTyped++;
        }

        // Update stats
        this.updateStats();

        // Check for word completion (space or punctuation)
        if (inputText.endsWith(' ') || /[.,!?]$/.test(inputText)) {
            const words = inputText.trim().split(/\s+/);
            const targetWords = originalText.split(/\s+/);
            
            // If word is complete, clear input
            if (words[words.length - 1] === targetWords[words.length - 1]) {
                this.inputField.value = '';
                
                // If all words are complete, load new text
                if (words.length === targetWords.length) {
                    this.loadNewText();
                }
            }
        }
    }

    startTest() {
        this.isRunning = true;
        this.startTime = new Date();
        this.startTimer();
    }

    startTimer() {
        this.intervalId = setInterval(() => {
            this.timeLeft--;
            this.timeElapsed++;
            this.timer.textContent = this.timeLeft;

            if (this.timeLeft <= 0) {
                this.finishTest();
            }
        }, 1000);
    }

    updateStats() {
        // Calculate WPM: (characters typed / 5) / time in minutes
        const minutes = (new Date() - this.startTime) / 60000;
        const wpm = Math.round((this.totalTyped / 5) / minutes) || 0;
        
        // Calculate accuracy
        const accuracy = Math.round((this.correctTyped / this.totalTyped) * 100) || 100;

        // Update displays
        this.wpmDisplay.textContent = wpm;
        this.accuracyDisplay.textContent = accuracy + '%';
    }

    loadNewText() {
        // Reset if test is running
        if (this.isRunning) {
            this.resetTest();
        }

        // Load new text and increment index
        this.textDisplay.textContent = texts[this.currentIndex];
        this.currentIndex = (this.currentIndex + 1) % texts.length;
        this.inputField.value = '';
    }

    resetTest() {
        // Clear timer
        clearInterval(this.intervalId);
        
        // Reset state
        this.timeLeft = 60;
        this.timeElapsed = 0;
        this.isRunning = false;
        this.totalTyped = 0;
        this.correctTyped = 0;
        this.startTime = null;
        
        // Reset displays
        this.timer.textContent = '60';
        this.wpmDisplay.textContent = '0';
        this.accuracyDisplay.textContent = '100%';
        this.inputField.value = '';
    }

    restartTest() {
        this.resetTest();
        this.textDisplay.textContent = texts[this.currentIndex];
    }

    finishTest() {
        // Stop the test
        clearInterval(this.intervalId);
        this.isRunning = false;
        this.inputField.disabled = true;

        // Show results
        this.showResults();
    }

    showResults() {
        const wpm = this.wpmDisplay.textContent;
        const accuracy = this.accuracyDisplay.textContent;

        this.resultModal.innerHTML = `
            <h2>Test Complete!</h2>
            <p>WPM: ${wpm}</p>
            <p>Accuracy: ${accuracy}</p>
            <p>Time: ${this.timeElapsed} seconds</p>
        `;
        this.resultModal.style.display = 'block';
    }
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new TypingTest();
});
