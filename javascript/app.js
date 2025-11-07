// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('searchBtn');
    const searchField = document.getElementById('searchField');
    const resultDiv = document.getElementById('result');

    // Add click event listener to search button
    searchBtn.addEventListener('click', function() {
        // Get the search query and sanitize it
        const query = sanitizeInput(searchField.value.trim());
        
        // Make AJAX request
        fetchSuperheroes(query);
    });

    // Optional: Allow Enter key to trigger search
    searchField.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });

    // Function to sanitize user input
    function sanitizeInput(input) {
        // Create a temporary div element
        const temp = document.createElement('div');
        temp.textContent = input;
        return temp.innerHTML;
    }

    // Function to fetch superheroes using AJAX
    function fetchSuperheroes(query) {
        // Create XMLHttpRequest object
        const xhr = new XMLHttpRequest();
        
        // Build URL with query parameter if query exists
        let url = 'superheroes.php';
        if (query) {
            url += '?query=' + encodeURIComponent(query);
        }
        
        // Configure the request
        xhr.open('GET', url, true);
        
        // Set up callback for when request completes
        xhr.onload = function() {
            if (xhr.status === 200) {
                // Get the response
                const response = xhr.responseText;
                
                // For Exercise 2 (uncomment to see alert):
                alert(response);
                
                // For Exercise 3: Display in result div
                resultDiv.innerHTML = response;
            } else {
                resultDiv.innerHTML = '<p class="not-found">Error loading superheroes</p>';
            }
        };
        
        // Handle errors
        xhr.onerror = function() {
            resultDiv.innerHTML = '<p class="not-found">Network error occurred</p>';
        };
        
        // Send the request
        xhr.send();
    }
});