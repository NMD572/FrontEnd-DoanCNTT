$('.top-review-slider-main').ready(function() {
    $.ajax({
        url: 'http://localhost:8080/api/review/view-homepage',
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: 
        function (response) 
        {
            console.log("Venue Successfully Patched!");
            console.log(response);
            //$(".top-review-slider-main .top-review-slider-item").remove(); 
            showTopReview(response);
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
function showTopReview(response)
{
    let contentTopReview=response.content;
    let size=0;
    if(contentTopReview.length>8)
    {
        size=8;
    }
    else
    {
        size=contentTopReview.length;
    }
    const authorImgs = document.querySelectorAll(".top-review-imgAuthor>img");
    const reviewQualityStar = document.querySelectorAll(".top-review-comment-star");
    const tourName = document.querySelectorAll(".top-review-tourist-attraction>b");
    const reviewDescription = document.querySelectorAll(".top-review-comment-text");
    const authorName = document.querySelectorAll(".top-review-comment-author>b");
    for(let i = 0; i <size; ++i)
    {
        authorImgs[i].setAttribute('src', contentTopReview[i].userimage);
        authorImgs[i].setAttribute('alt', 'authorImg');
        tourName[i].innerHTML=contentTopReview[i].tourname;
        reviewDescription[i].innerHTML=contentTopReview[i].reviewdescription;
        authorName[i].innerHTML=contentTopReview[i].userfullname;
        let reviewQualityNumber=contentTopReview[i].reviewquality;
        handleQualityStar(reviewQualityNumber,reviewQualityStar[i],i);
    }
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