const textArray = [
    "The early morning sun cast long shadows across the quiet park as joggers made their way along the winding paths. Birds chirped cheerfully in the trees above, welcoming the new day with their melodious songs. A gentle breeze carried the sweet scent of blooming flowers through the air.",
    "Technology continues to advance at an unprecedented rate, transforming the way we live, work, and communicate with one another. From artificial intelligence to renewable energy solutions, innovation drives progress in every sector of modern society. The future holds endless possibilities for human advancement.",
    "Deep in the ancient forest, towering trees stretched their branches toward the sky, creating a natural cathedral of green leaves and filtered sunlight. The forest floor was carpeted with soft moss and delicate ferns, while the sound of a distant stream provided nature's perfect soundtrack.",
    "The bustling city streets came alive as people hurried to their destinations, briefcases and coffee cups in hand. Street vendors called out their morning specials, while taxis honked their horns in the growing traffic. The energy of urban life was palpable in every corner.",
    "Inside the cozy library, students pored over their textbooks, preparing for upcoming exams. The smell of old books and the soft whisper of turning pages created a peaceful atmosphere conducive to learning and concentration. Knowledge seekers found their sanctuary among the endless rows of books.",
    "Professional chefs worked with precision in the restaurant kitchen, creating culinary masterpieces from fresh ingredients. The sizzle of pans and the aroma of herbs filled the air as they prepared elegant dishes for eager diners. Every detail was carefully considered and executed.",
    "The scientific research team made an extraordinary breakthrough in their latest experiment, potentially revolutionizing their field of study. Months of dedicated work and careful analysis had finally paid off, opening new possibilities for future investigations and applications in the real world.",
    "Waves crashed rhythmically against the sandy shore as seabirds soared overhead, searching for their morning meal. Beachcombers walked along the water's edge, collecting interesting shells and enjoying the peaceful atmosphere of the early morning seaside landscape.",
    "The artist's studio was filled with half-finished canvases and the rich smell of oil paints. Natural light streamed through large windows, illuminating works in progress and inspiring new creative directions. Every corner held potential for artistic expression and discovery.",
    "Musicians gathered for rehearsal in the concert hall, their instruments creating a symphony of sound as they warmed up. The conductor arrived with fresh sheet music, ready to guide the orchestra through another challenging piece. The acoustics carried every note perfectly."
];

let currentIndex = 0;

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const textElement = document.getElementById('text');
    const generateButton = document.getElementById('Generate-btn');
    const redoButton = document.getElementById('Redo-btn');
    const userInput = document.getElementById('user-input');

    // Function to get next text
    function getNextText() {
        const text = textArray[currentIndex];
        currentIndex = (currentIndex + 1) % textArray.length;
        textElement.textContent = text;
        userInput.value = '';
    }

    // Function to redo current text
    function redoText() {
        currentIndex = (currentIndex - 1 + textArray.length) % textArray.length;
        const text = textArray[currentIndex];
        textElement.textContent = text;
        userInput.value = '';
    }

    // Add event listeners
    generateButton.addEventListener('click', getNextText);
    redoButton.addEventListener('click', redoText);

    // Set initial text
    getNextText();
});
