// Waste database
const wasteDatabase = {
    // Wet waste
    "banana peel": { category: "wet", description: "Biodegradable organic waste", examples: ["Fruit peels", "Vegetable scraps", "Coffee grounds", "Eggshells"] },
    "apple core": { category: "wet", description: "Biodegradable organic waste", examples: ["Food scraps", "Bread", "Leftovers", "Tea leaves"] },
    "vegetable scraps": { category: "wet", description: "Biodegradable organic waste", examples: ["Fruit peels", "Coffee grounds", "Flowers", "Plant trimmings"] },
    "tea bag": { category: "wet", description: "Biodegradable organic waste", examples: ["Coffee grounds", "Food scraps", "Eggshells", "Bread"] },
    "coffee grounds": { category: "wet", description: "Biodegradable organic waste", examples: ["Tea leaves", "Fruit peels", "Vegetable scraps", "Flowers"] },

    // Dry waste
    "wood": { category: "dry", description: "Non-biodegradable but non-recyclable", examples: ["Cotton cloth", "Sawdust", "Coconut shells", "Diapers"] },
    "cotton cloth": { category: "dry", description: "Non-biodegradable but non-recyclable", examples: ["Wood", "Sawdust", "Diapers", "Sanitary napkins"] },
    "sawdust": { category: "dry", description: "Non-biodegradable but non-recyclable", examples: ["Wood", "Cotton cloth", "Coconut shells", "Diapers"] },
    "diaper": { category: "dry", description: "Non-biodegradable but non-recyclable", examples: ["Sanitary napkins", "Cotton cloth", "Sawdust", "Wood"] },

    // Recyclable
    "plastic bottle": { category: "recyclable", description: "Can be processed and reused", examples: ["Glass bottles", "Aluminum cans", "Cardboard", "Paper"] },
    "glass bottle": { category: "recyclable", description: "Can be processed and reused", examples: ["Plastic bottles", "Aluminum cans", "Cardboard", "Metal containers"] },
    "aluminum can": { category: "recyclable", description: "Can be processed and reused", examples: ["Plastic bottles", "Glass bottles", "Cardboard", "Tin cans"] },
    "newspaper": { category: "recyclable", description: "Can be processed and reused", examples: ["Magazines", "Cardboard", "Office paper", "Paper bags"] },
    "cardboard": { category: "recyclable", description: "Can be processed and reused", examples: ["Paper", "Newspaper", "Magazines", "Boxes"] },

    // Hazardous
    "battery": { category: "hazardous", description: "Contains toxic chemicals requiring special disposal", examples: ["E-waste", "Paint", "Chemicals", "Medical waste"] },
    "paint": { category: "hazardous", description: "Contains toxic chemicals requiring special disposal", examples: ["Batteries", "E-waste", "Chemicals", "Pesticides"] },
    "chemical": { category: "hazardous", description: "Contains toxic chemicals requiring special disposal", examples: ["Batteries", "Paint", "Pesticides", "Medical waste"] },
    "e-waste": { category: "hazardous", description: "Electronic waste with toxic components", examples: ["Batteries", "Old phones", "Computers", "Medical devices"] },
    "medicine": { category: "hazardous", description: "Pharmaceutical waste requiring special disposal", examples: ["Chemicals", "Medical waste", "Batteries", "E-waste"] },

    // Additional items for expanded database
    "milk carton": { category: "recyclable", description: "Can be processed and reused", examples: ["Plastic bottles", "Glass bottles", "Cardboard", "Paper"] },
    "tin can": { category: "recyclable", description: "Can be processed and reused", examples: ["Aluminum cans", "Plastic bottles", "Glass bottles", "Cardboard"] },
    "pizza box": { category: "dry", description: "Non-biodegradable but non-recyclable if contaminated", examples: ["Wood", "Cotton cloth", "Sawdust", "Diapers"] },
    "styrofoam": { category: "hazardous", description: "Difficult to recycle and potentially harmful", examples: ["Batteries", "E-waste", "Paint", "Chemicals"] },
    "light bulb": { category: "hazardous", description: "Contains mercury and requires special disposal", examples: ["Batteries", "E-waste", "Paint", "Chemicals"] },
    "old clothes": { category: "dry", description: "Non-biodegradable but non-recyclable", examples: ["Wood", "Cotton cloth", "Sawdust", "Diapers"] },
    "cigarette butt": { category: "hazardous", description: "Toxic and non-biodegradable", examples: ["Batteries", "E-waste", "Paint", "Chemicals"] },
    "ceramic plate": { category: "dry", description: "Non-biodegradable but non-recyclable", examples: ["Wood", "Cotton cloth", "Sawdust", "Diapers"] },
    "leather shoes": { category: "dry", description: "Non-biodegradable but non-recyclable", examples: ["Wood", "Cotton cloth", "Sawdust", "Diapers"] },
    "plastic bag": { category: "recyclable", description: "Can be processed and reused if clean", examples: ["Plastic bottles", "Glass bottles", "Cardboard", "Paper"] }
};

// DOM elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const voiceBtn = document.getElementById('voiceBtn');
const clearBtn = document.getElementById('clearBtn');
const darkModeToggle = document.getElementById('darkModeToggle');
const resultContainer = document.getElementById('resultContainer');
const resultTitle = document.getElementById('resultTitle');
const resultDescription = document.getElementById('resultDescription');
const resultIcon = document.getElementById('resultIcon');
const examplesList = document.getElementById('examplesList');
const categories = document.querySelectorAll('.category');

// New feature elements
const tabBtns = document.querySelectorAll('.tab-btn');
const quizTab = document.getElementById('quizTab');
const statsTab = document.getElementById('statsTab');
const historyTab = document.getElementById('historyTab');
const quizQuestion = document.getElementById('quizQuestion');
const quizOptions = document.getElementById('quizOptions');
const nextQuestionBtn = document.getElementById('nextQuestionBtn');
const quizResult = document.getElementById('quizResult');
const wetCount = document.getElementById('wetCount');
const dryCount = document.getElementById('dryCount');
const recyclableCount = document.getElementById('recyclableCount');
const hazardousCount = document.getElementById('hazardousCount');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

// Dark mode functionality
let isDarkMode = false;

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('darkMode', isDarkMode);
    darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// Load dark mode preference
window.addEventListener('load', () => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        isDarkMode = true;
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    searchInput.value = "banana peel";
    performSearch();

    // Initialize tabs
    tabBtns[0].classList.add('active'); // Set first tab as active
    quizTab.style.display = 'block';
    statsTab.style.display = 'none';
    historyTab.style.display = 'none';

    // Load initial data
    loadStats();
    loadHistory();
});

// Handle search button click
searchBtn.addEventListener('click', performSearch);

// Handle clear button click
clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    resultContainer.style.display = 'none';
});

// Handle dark mode toggle
darkModeToggle.addEventListener('click', toggleDarkMode);

// Handle Enter key in search input
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Handle category clicks
categories.forEach(category => {
    category.addEventListener('click', () => {
        const categoryType = category.dataset.category;
        showCategoryInfo(categoryType);
    });
});

// Handle voice button click
voiceBtn.addEventListener('click', () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            voiceBtn.innerHTML = '<i class="fas fa-microphone-slash"></i>';
            voiceBtn.style.color = '#f44336';
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            searchInput.value = transcript;
            performSearch();
        };

        recognition.onerror = (event) => {
            alert('Voice recognition error: ' + event.error);
        };

        recognition.onend = () => {
            voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
            voiceBtn.style.color = '';
        };

        recognition.start();
    } else {
        alert('Voice search is not supported in this browser. Please use Chrome or Edge.');
    }
});

// Handle tab clicks
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const tabName = btn.dataset.tab;
        quizTab.style.display = tabName === 'quiz' ? 'block' : 'none';
        statsTab.style.display = tabName === 'stats' ? 'block' : 'none';
        historyTab.style.display = tabName === 'history' ? 'block' : 'none';

        if (tabName === 'quiz') startQuiz();
        if (tabName === 'stats') loadStats();
        if (tabName === 'history') loadHistory();
    });
});

// Handle next question button
nextQuestionBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
        nextQuestionBtn.style.display = 'none';
    } else {
        showQuizResult();
    }
});

// Handle clear history button
clearHistoryBtn.addEventListener('click', () => {
    localStorage.removeItem('searchHistory');
    loadHistory();
});

function performSearch() {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
        alert('Please enter a waste item to sort');
        return;
    }

    // Find match in database
    let found = false;
    let foundData = null;
    for (const item in wasteDatabase) {
        if (item.includes(query) || query.includes(item)) {
            foundData = wasteDatabase[item];
            displayResult(foundData, query);
            found = true;
            break;
        }
    }

    if (!found) {
        // Show generic result if not found
        foundData = {
            category: "unknown",
            description: "We couldn't identify this item in our database",
            examples: ["Please check local guidelines", "When in doubt, treat as dry waste", "Contact your waste management service"]
        };
        displayResult(foundData, query);
    }

    // Scroll to results
    resultContainer.scrollIntoView({ behavior: 'smooth' });

    // Update statistics and history
    if (foundData && foundData.category !== "unknown") {
        updateStats(foundData.category);
        addToHistory(query);
    }
}

function displayResult(data, query) {
    resultContainer.style.display = 'block';
    resultContainer.className = `result-container ${data.category}`;

    // Set category title with query
    if (data.category === "unknown") {
        resultTitle.textContent = "Not Found";
        resultDescription.textContent = data.description;
    } else {
        resultTitle.textContent = `${data.description}`;
        resultDescription.textContent = `"${query}" belongs to ${data.category.charAt(0).toUpperCase() + data.category.slice(1)} Waste`;
    }

    // Set icon based on category
    let iconClass = "fa-question";
    if (data.category === "wet") iconClass = "fa-apple-alt";
    else if (data.category === "dry") iconClass = "fa-leaf";
    else if (data.category === "recyclable") iconClass = "fa-bottle";
    else if (data.category === "hazardous") iconClass = "fa-skull";

    resultIcon.innerHTML = `<i class="fas ${iconClass}"></i>`;

    // Populate examples
    examplesList.innerHTML = '';
    data.examples.forEach(example => {
        const li = document.createElement('li');
        li.textContent = example;
        examplesList.appendChild(li);
    });
}

function showCategoryInfo(category) {
    const categoryData = {
        wet: {
            title: "Wet Waste",
            description: "Biodegradable organic waste that decomposes quickly",
            examples: ["Food scraps", "Fruit peels", "Vegetable waste", "Garden waste", "Coffee grounds"]
        },
        dry: {
            title: "Dry Waste",
            description: "Non-biodegradable items that are not recyclable",
            examples: ["Wood", "Cotton cloth", "Sawdust", "Diapers", "Sanitary products"]
        },
        recyclable: {
            title: "Recyclable Waste",
            description: "Items that can be processed and reused",
            examples: ["Plastic bottles", "Glass containers", "Aluminum cans", "Paper", "Cardboard"]
        },
        hazardous: {
            title: "Hazardous Waste",
            description: "Items containing toxic substances requiring special handling",
            examples: ["Batteries", "Paint", "Chemicals", "E-waste", "Medical waste"]
        }
    };

    const data = categoryData[category];
    displayResult(data, category);

    // Scroll to results
    resultContainer.scrollIntoView({ behavior: 'smooth' });
}
