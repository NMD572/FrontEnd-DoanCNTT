$('#tourContainer').ready(function(){
    let id=getTourId();
    $.ajax({
        url: 'http://localhost:8080/api/tours/'+id,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: 
        function (response) 
        {
            console.log("Get Tour By TourID Successfully!");
            console.log(response);
            $("#tourInfo").remove(); 
            $("#tourguideInfo").remove();
            showTour(response);
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
function getTourId()
{
    let url=new URL(location.href);
    let tourId=url.searchParams.get("tourId");         //Xử lý tourid\
    return tourId;
}
function showTour(response)
{
    let tourguideInfo=response.tourguide;
    let tourContainer=$('#tourContainer');

    let tourInfoTemp=Handlebars.compile( $("#tourInfo-template").html());
    let tourguideTemp=Handlebars.compile( $("#tourguideInfo-template").html());

    let tourData={
        imgTourLink:response.image,
        Title:response.name,
        qualityNumber:response.quality,
        qualityStar:'',
        countUsed:2,
        price:response.price,
        maxmember:response.maxmember,
        time:response.time,
        action:response.action,
        Brief:response.brief
    }
    let tourguideData={
        tourguideImageLink:tourguideInfo.image,
        TourguideName:tourguideInfo.name,
        qualityStarTourguide:'',
        facebookLink:tourguideInfo.fbLink,
        instagramLink:tourguideInfo.instagramLink,
        tourguideDescription:tourguideInfo.brief
    }
    
    tourContainer.append(tourInfoTemp(tourData));
    tourContainer.append(tourguideTemp(tourguideData));
    let tourQualityStarContainer=document.getElementById("qualityStar");
    let tourguideQualityStarContainer=document.getElementById("tourguideQuality");
    handleQualityStar(response.quality,tourQualityStarContainer,1);
    handleQualityStar(tourguideInfo.quality,tourguideQualityStarContainer,2);
}
function handleQualityStar(reviewQualityNumber, startContainer,stt)
{
    let percentage=calcQualityPercentage(reviewQualityNumber,5);
    addScore(percentage, startContainer,stt);
}
function calcQualityPercentage(reviewQualityNumber, maxQualityNumber)
{
    let val=Math.round((reviewQualityNumber/maxQualityNumber)*100);
    console.log(val);
    return val;
}
function addScore(score, $domElement,stt) {
    var starWidth = "<style>.stars-container"+stt.toString()+":after { width: " + score + "%} </style>";
    $("<span class='stars-container "+ "stars-container"+stt.toString()+"'"+">")
      .text("★★★★★")
      .append($(starWidth))
      .appendTo($domElement);
  }
