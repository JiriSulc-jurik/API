// Odkazy na prvky v HTML
const factElement = document.getElementById('fact');
const newFactBtn = document.getElementById('newFactBtn');
const errorElement = document.getElementById('error');

// Proměnná pro uložení načtených faktů
let fishFacts = [];

// Funkce pro stažení dat z API
async function fetchFishFacts() {
    const apiUrl = 'https://api.jsongpt.com/json?prompt=Generate 50 fish facts &facts=array of fish facts';
    
    try {
        errorElement.textContent = ""; // Reset chybové hlášky
        const response = await fetch(apiUrl);
        
        if (!response.ok) throw new Error('Nepodařilo se připojit k API');
        
        const data = await response.json();
        
        // Uložíme pole faktů (předpokládáme, že API vrací { facts: [...] })
        fishFacts = data.facts;
        
        // Aktivujeme tlačítko, jakmile jsou data připravená
        newFactBtn.disabled = false;
        
    } catch (err) {
        console.error(err);
        errorElement.textContent = "Ups! Něco se pokazilo při lovu faktů.";
        factElement.textContent = "Zkuste to prosím později.";
    }
}

// Funkce pro zobrazení jednoho náhodného faktu
function showRandomFact() {
    if (fishFacts.length > 0) {
        const randomIndex = Math.floor(Math.random() * fishFacts.length);
        factElement.textContent = fishFacts[randomIndex];
    } else {
        factElement.textContent = "Ještě nahazujeme udici (stahuji data)...";
    }
}

// Event listener na tlačítko
newFactBtn.addEventListener('click', showRandomFact);

// Spuštění stahování hned po načtení skriptu
fetchFishFacts();