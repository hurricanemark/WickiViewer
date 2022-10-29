function displaySearch() {
    let rframe = document.getElementById("_random_article");
    let sframe = document.getElementById("_search_article");
    /* toggles the display of the random article */
    rframe.style.display = "none";
    sframe.style.display = "block";
    window.location.reload(); 
}


/* using the vanila js */
function getWikiMatch(inputStr) {

    // alert(inputStr);
    let usrStr = `https://en.wikipedia.org/w/api.php?action=query&list=search&origin=*&srsearch=${inputStr}&format=json`; 

    const xhttp = new XMLHttpRequest(),
        method = "GET",
        url = usrStr;
    xhttp.open(method, url, true);
    xhttp.onreadystatechange = function() {
        // alert(this.readyState + "  " + this.status);
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            console.log(JSON.parse(this.responseText));
            processAndDisplayData(data);
        }
    };
    function processAndDisplayData(data) {
        let results = data.query.search;
        console.log(results);
        const resultsList = document.getElementById('_search_article');
        for (let i = 0; results.length; i++) {
            let div = document.createElement("div");
            let segmentHTML = "";
            const articleUrl = `<a href="https://en.wikipedia.org/wiki/${results[i].title}">${results[i].title}</a>`;
            const articleSnippetHtml = `<p>${results[i].snippet}</p><hr>`;
            segmentHTML = articleUrl + articleSnippetHtml;
            div.innerHTML = segmentHTML;
            resultsList.appendChild(div);
        }
        /* toggles the display of the random article */
        // resultsList.style.display = "block";

    }
    
    xhttp.open("GET", usrStr, true);
    xhttp.send();
}
export { getWikiMatch };
// displaySearch();
getWikiMatch('California');

// export default getWikiMatch;
