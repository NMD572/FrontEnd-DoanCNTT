$('#infoTourguide').ready(function() {
    $.ajax({
        url: 'http://localhost:8080/api/tourguide/view-homepage',
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: 
        function (response) 
        {
            console.log("Venue Successfully Patched!");
            console.log(response);
            showTopTourguide(response);
        }
        ,
        error: function (jqXHR) {
            // log the error to the console
            console.log("The following error: " + textStatus, errorThrown);
        },
        complete: function () {
            console.log("Venue Patch Ran");
        }
    })
})
function showTopTourguide(response)
{
    let contentTopTourguide=response.content;
    let size=0;
    if(contentTopTourguide.length>4)
    {
        size=4;
    }
    else
    {
        size=contentTopTourguide.length;
    }
    const tourguideImgs = document.querySelectorAll(".infoGridItem>img");
    const tourguideNames = document.querySelectorAll(".tourguideName>b");
    const tourguideQualityStarContainers = document.querySelectorAll(".qualityTourguide");
    const tourguideBriefs = document.querySelectorAll(".tourguideBrief");
    const tourguideLinkFaces = document.querySelectorAll(".tourguideLinkFace");
    const tourguideLinkInsta = document.querySelectorAll(".tourguideLinkInsta");
    for(let i = 0; i <size; ++i)
    {
        tourguideImgs[i].setAttribute('src', contentTopTourguide[i].image);
        tourguideImgs[i].setAttribute('alt', 'tourguideImg');
        tourguideNames[i].innerHTML=contentTopTourguide[i].name;
        tourguideBriefs[i].innerHTML=contentTopTourguide[i].brief;
        tourguideLinkFaces[i].setAttribute('href',contentTopTourguide[i].fbLink);
        tourguideLinkInsta[i].setAttribute('href',contentTopTourguide[i].instagramLink);
        let tourguideQualityNumber=contentTopTourguide[i].quality;
        handleTourguideQualityStar(tourguideQualityNumber,tourguideQualityStarContainers[i],i);
    }
}
function handleTourguideQualityStar(reviewQualityNumber, startContainer,stt)
{
    let percentage=calcQualityPercentage(reviewQualityNumber,5);
    addScoreForTourguide(percentage, startContainer,stt);
}
function calcQualityPercentage(reviewQualityNumber, maxQualityNumber)
{
    let val=Math.round((reviewQualityNumber/maxQualityNumber)*100);
    console.log(val);
    return val;
}
function addScoreForTourguide(score, $domElement,stt) {
    var starWidth = "<style>.stars-container-tourguide"+stt.toString()+":after { width: " + score + "%} </style>";
    $("<span class='stars-tourguide-container "+ "stars-container-tourguide"+stt.toString()+"'"+">")
      .text("★★★★★")
      .append($(starWidth))
      .appendTo($domElement);
  }