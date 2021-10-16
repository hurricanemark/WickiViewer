/* using the vanila js */
function getWikiMatch(inputStr) {

    var usrStr = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=5&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + inputStr;
    const xhttp = new XMLHttpRequest(),
        method = "GET",
        url = usrStr;
    xhttp.open(method, url, true);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            processData(data);
        }
    };
    function processData(data) {
        var page = data.query.pages;
        let segment = '<div class="cards">';

        for (var key in page) {
            if (page.hasOwnProperty(key)) {
                console.log('Title#' + page[key].index + ' ' + page[key].title + "\n"
                + 'Page ID: ' + page[key].pageid + "\n"
                // + 'PageImage: ' + page[key].pageimage + "\n"
                + 'Extract: ' + page[key].extract + "\n\n");
                
                /* write into vertical cards */
                segment += '<div class="card shadow-1">' + '<h3>' + page[key].title + '</h3>' + '<p>' + page[key].extract + '</p>' + '</div>';
            }
            segment += '</div>';
        }
        if (segment !== "") {
            var wiki_data = document.querySelector('._search_article');
            wiki_data.innerHTML = segment;
            wiki_data.style.display = "none";
            document.getElementById('_random_article').style.display = "block";

            document.getElementById('_search_article').innerHTML = result;
            document.getElementById('_search_article').style.display = "none";
            document.getElementById('_search_article').appendChild(div);
        }
    }
    xhttp.open("GET", usrStr, true);
    xhttp.send();
}
getWikiMatch('Canada');

/* using the jQuery methods */
$(document).ready(function() {
    $('#_search_article').hide();
    $('#_random_article').hide();
    $('#_search_btn').click(function() {
        var inputStr = $('#_search_input').val();
        $.ajax({
            url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=5&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + inputStr,
            type: 'GET',
            success: function(data) {
                console.log(data);
                processData(data);
            },
            error: function(error) {
                console.log(`Error ${error}`);
            }   
        })

    });
});

/*import fetch from "node-fetch";*/
function getWikiPage(inputStr) {
    var apiStr = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=5&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';

    fetch(apiStr + inputStr)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        processData(data);
        //console.log(data);
    })
    .catch(function(err) {
        console.log(err);
    });
    function processData(data) {
        var page = data.query.pages;
        let segment = '<div class="cards">';

        for (var key in page) {
            if (page.hasOwnProperty(key)) {
                console.log('Title#' + page[key].index + ' ' + page[key].title + "\n"
                + 'Page ID: ' + page[key].pageid + "\n"
                // + 'PageImage: ' + page[key].pageimage + "\n"
                + 'Extract: ' + page[key].extract + "\n\n");
                
                /* write into vertical cards */
                segment += '<div class="card shadow-1">' + '<h3>' + page[key].title + '</h3>' + '<p>' + page[key].extract + '</p>' + '</div>';
            }
            segment += '</div>';
        }
        if (segment !== "") {
            document.getElementById('_random_article').style.display = "block";
            document.querySelector('._search_article').innerHTML = segment;            
            document.getElementById('_search_article').style.display = "none";
            document.getElementById('_search_article').appendChild(div);
        }
    }
}

/*getWikiPage('COVID-19 vaccines');*/

