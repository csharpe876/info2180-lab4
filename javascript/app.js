// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const resultDiv = document.getElementById('result');
    
    // Function to perform AJAX search
    function performSearch() {
        const query = searchInput.value.trim();
        
        // Create XMLHttpRequest object
        const xhr = new XMLHttpRequest();
        
        // Prepare the URL with query parameter
        const url = `superheroes.php?query=${encodeURIComponent(query)}`;
        
        // Configure the request
        xhr.open('GET', url, true);
        
        // Set up the response handler
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    try {
                        const superheroes = JSON.parse(xhr.responseText);
                        displayResults(superheroes, query);
                    } catch (error) {
                        console.error('Error parsing JSON:', error);
                        displayError('Error processing search results.');
                    }
                } else {
                    console.error('HTTP Error:', xhr.status);
                    displayError('Error connecting to server.');
                }
            }
        };
        
        // Send the request
        xhr.send();
    }
    
    // Function to display search results
    function displayResults(superheroes, query) {
        // Clear previous results
        resultDiv.innerHTML = '';
        
        if (superheroes.length === 0) {
            resultDiv.innerHTML = '<div class="message">Superhero not found</div>';
            return;
        }
        
        // If query is empty, show all superheroes as a simple list
        if (!query) {
            const ul = document.createElement('ul');
            superheroes.forEach(superhero => {
                const li = document.createElement('li');
                li.textContent = superhero.alias;
                ul.appendChild(li);
            });
            resultDiv.appendChild(ul);
        } else {
            // Show detailed results for specific searches
            superheroes.forEach(superhero => {
                const card = document.createElement('div');
                card.className = 'superhero-card';
                
                card.innerHTML = `
                    <h3>${superhero.alias}</h3>
                    <div class="alias">A.K.A ${superhero.name}</div>
                    <div class="biography">${superhero.biography}</div>
                `;
                
                resultDiv.appendChild(card);
            });
        }
    }
    
    // Function to display error messages
    function displayError(message) {
        resultDiv.innerHTML = `<div class="error">${message}</div>`;
    }
    
    // Event listeners
    searchBtn.addEventListener('click', performSearch);
    
    // Allow search on Enter key press
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
    
    // Initial load - show all superheroes
    performSearch();
});
