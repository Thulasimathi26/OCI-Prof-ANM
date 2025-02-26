function fetchJoke() {
    fetch('https://v2.jokeapi.dev/joke/Any?type=single')
        .then(response => response.json())
        .then(data => {
            document.getElementById('joke').innerText = data.joke;
        })
        .catch(error => console.error('Error:', error));
}

fetchJoke(); // Load a joke on page load
