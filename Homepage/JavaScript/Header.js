function openNav(){
    var nav = document.getElementById("nav");
    var visibility = nav.style.visibility;
    if (visibility === "" || visibility === "hidden")
        nav.style.visibility = "visible";
    else
        nav.style.visibility = "hidden";
}

