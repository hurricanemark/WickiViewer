function jsredir() {
    /* redirects to the random article */
    window.location.href = "https://en.wikipedia.org/wiki/Special:Random";
}
function displayRandom() {
    var rframe = document.getElementById("_random_article");
    /* toggles the display of the random article */
    if (rframe.style.display === "none") {
        rframe.style.display = "block";
    } else {
        rframe.style.display = "none";
        /* reload the random article */
        location.reload(); 
    }
}