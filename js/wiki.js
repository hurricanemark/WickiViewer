const form = document.querySelector('.tiki');

form.addEventListener('_search', handleSubmit);


async function handleSubmit(event) {
    event.preventDefault();
    const inputValue = document.querySelector('_search').value;
    const searchQuery = inputValue.trim();
    alert(searchQuery);
    try {
        const results = await searchWikipedia(searchQuery);
        console.log(results);
    } catch (err) {
        console.log(err);
        alert('Failed to search wikipedia');
    }
}


async function searchWikipedia(queryStr) {
    const inputValue = document.querySelector('_search').value;
    console.log(inputValue);
    const searchQuery = queryStr.trim();
    console.log(searchQuery);
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&origin=*&srsearch=${queryStr}&format=json`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }   
    const json = await response.json();

    displayWikitikiResults(json.query.search);
}  


function displayWikitikiResults(results) {
    const resultsList = document.querySelector('#_search_article');
    resultsList.innerHTML = '';
    results.forEach(result => {
        const articleTitle = result.title;
        const articleUrl = `https://en.wikipedia.org/wiki/${articleTitle}`;
        const articleSnippet = result.snippet;
        const articleSnippetHtml = `<a href="${articleUrl}">${articleSnippet}</a>`;
        const articleSnippetElement = document.createElement('li');
        articleSnippetElement.innerHTML = articleSnippetHtml;
        resultsList.appendChild(articleSnippetElement);
    });
}