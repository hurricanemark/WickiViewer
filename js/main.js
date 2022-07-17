
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