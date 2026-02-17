const factElement = document.getElementById('fact');
const newFactBtn = document.getElementById('newFactBtn');
const errorElement = document.getElementById('error');


let fishFacts = [];


async function fetchFishFacts() {
    const apiUrl = 'https://api.jsongpt.com/json?prompt=Generate 50 fish facts &facts=array of fish facts';
    
    try {
        errorElement.textContent = ""; 
        const response = await fetch(apiUrl);
        
        if (!response.ok) throw new Error('Nepodařilo se připojit k API');
        
        const data = await response.json();
        
        
        fishFacts = data.facts;
        
      
        newFactBtn.disabled = false;
        
    } catch (err) {
        console.error(err);
        errorElement.textContent = "Ups! Něco se pokazilo při lovu faktů.";
        factElement.textContent = "Zkuste to prosím později.";
    }
}


function showRandomFact() {
    if (fishFacts.length > 0) {
        const randomIndex = Math.floor(Math.random() * fishFacts.length);
        factElement.textContent = fishFacts[randomIndex];
    } else {
        factElement.textContent = "Ještě nahazujeme udici (stahuji data)...";
    }
}


newFactBtn.addEventListener('click', showRandomFact);


fetchFishFacts();