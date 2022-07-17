
/* using the vanila js */
export function getWikiMatch(inputStr) {
alert(inputStr);
    var usrStr = `https://en.wikipedia.org/w/api.php?action=query&list=search&origin=*&srsearch=${inputStr}&format=json`; 
    const xhttp = new XMLHttpRequest(),
        method = "GET",
        url = usrStr;
    xhttp.open(method, url, false);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            processData(data);
        }
    };
    function processData(data) {
        var results = data.query.search;
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
    xhttp.open("GET", usrStr, true);
    xhttp.send();
}
//getWikiMatch('Canada');

//export default getWikiMatch;
