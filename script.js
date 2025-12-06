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
const clearBtn = document.getElementById('clearBtn');
const darkModeToggle = document.getElementById('darkModeToggle');
const resultContainer = document.getElementById('resultContainer');
const resultTitle = document.getElementById('resultTitle');
const resultDescription = document.getElementById('resultDescription');
const resultIcon = document.getElementById('resultIcon');
const examplesList = document.getElementById('examplesList');
const categories = document.querySelectorAll('.category');

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

function performSearch() {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
        alert('Please enter a waste item to sort');
        return;
    }

    // Find match in database
    let found = false;
    for (const item in wasteDatabase) {
        if (item.includes(query) || query.includes(item)) {
            displayResult(wasteDatabase[item], query);
            found = true;
            break;
        }
    }

    if (!found) {
        // Show generic result if not found
        displayResult({
            category: "unknown",
            description: "We couldn't identify this item in our database",
            examples: ["Please check local guidelines", "When in doubt, treat as dry waste", "Contact your waste management service"]
        }, query);
    }

    // Scroll to results
    resultContainer.scrollIntoView({ behavior: 'smooth' });
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
