
$(document ).ready(function() {
    let btnElement = document.getElementById('_btn');

    btnElement.addEventListener("click", function() {
        var ourRequest = new XMLHttpRequest();
        ourRequest.open('GET', './animals.json');
        ourRequest.onload = function() {
            var data = JSON.parse(ourRequest.responseText);
            renderHTML(data);
        };
        ourRequest.send();
    });
});


/* construct an HTML page */
function renderHTML(data){
    let animals = document.getElementById('animal-info');
    let htmlSegment = '';
    for(var i in data){
        htmlSegment += '<ul>My ' + data[i].species + 
                       ' <strong>' + data[i].name + 
                       '</strong> likes to eat ';  

                       for (var j in data[i].foods.likes){
                           htmlSegment += data[i].foods.likes[j] + ' ';
                       } 
                       htmlSegment += 'but hates ';
                       for (var k in data[i].foods.dislikes){
                           htmlSegment += data[i].foods.dislikes[k] + ' ';  
                       }
                       htmlSegment += '.</ul>'; 
    }
    animals.innerHTML = htmlSegment;
}

// function getWick(){
//     $(document ).ready(function() {
//         let btnElement = document.getElementById('_wikibtn');
    
//         btnElement.addEventListener("click", function() {
//             var ourRequest = new XMLHttpRequest();
//             ourRequest.open('GET', 'https://en.wikipedia.org/w/api.php?action=query&list=search&origin=*&srsearch=California&format=json');
//             ourRequest.onload = function() {
//                 var data = JSON.parse(ourRequest.responseText);
//                 renderWickiHTML(JSON.parse(data));
//             };
//             ourRequest.send();
//         });
//     });
    
//     function renderWickiHTML(data) {
//         const results = data.query.search;
//         const resultsList = document.getElementById('searchdata');
//         for (let i = 0; results.length; i++) {
//             let div = document.createElement("div");
//             let segmentHTML = "";
//             const articleUrl = `<a href="https://en.wikipedia.org/wiki/${results[i].title}">${results[i].title}</a>`;
//             const articleSnippetHtml = `<p>${results[i].snippet}</p><hr>`;
//             segmentHTML = articleUrl + articleSnippetHtml;
//             div.innerHTML = segmentHTML;
//             resultsList.appendChild(div);
//         }
//     }
// }