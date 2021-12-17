$('#divGrid').ready(function() {
    $.ajax({
        url: 'http://localhost:8080/api/tours/view-homepage',
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: 
        function (response) 
        {
            console.log("Venue Successfully Patched!");
            console.log(response);
            $("#divGrid .gridItem").remove(); 
            createDivGridTravel(response);
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
function createDivGridTravel(response){
    const itemContainer=document.getElementById("divGrid");
    let contentTour=response.content;
    let size=0;
    if(contentTour.length>6)
    {
        size=6;
    }
    else
    {
        size=contentTour.length;
    }
    for(let i = 0; i <size; ++i)
    {
        //Tạo gridItem
        let gridItem=document.createElement("div");
        gridItem.classList.add("gridItem");
        //Tạo ra các phần tử con của gridItem
        //gridImgContainer
        let gridImgContainer=document.createElement("div");
        gridImgContainer.classList.add("gridImgContainer");
        let gridImgA=document.createElement("a");
        gridImgA.href="/ViewTour/HTML/ViewTour.html?tourId="+contentTour[i].id;
        let gridImg=document.createElement("img");
        gridImg.classList.add("gridImg");
        gridImg.setAttribute('src', contentTour[i].image);
        gridImg.setAttribute('alt', 'tourImg');
        gridImgA.appendChild(gridImg);
        gridImgContainer.appendChild(gridImgA);

         //tạo ra các phần tử con của infoTravel
        let infoTravel=document.createElement("div");
        infoTravel.classList.add("infoTravel");
        let calendar=document.createElement("div");
        let numberOfPeople=document.createElement("div");
        let actionOfTour=document.createElement("div");
        let iCalendar=document.createElement("i");
        let iNumberOfPeople=document.createElement("i");
        let iActionOfTour=document.createElement("i");

        //Xử lý calendar
        iCalendar.classList.add("far");
        iCalendar.classList.add("fa-calendar-check");
        calendar.appendChild(iCalendar);
        calendar.append(contentTour[i].time);
        //Xử lý number of people
        iNumberOfPeople.classList.add("fas");
        iNumberOfPeople.classList.add("fa-user-friends");
        numberOfPeople.appendChild(iNumberOfPeople);
        numberOfPeople.append(contentTour[i].maxmember);
        //Xử lý action of tour
        iActionOfTour.classList.add("far");
        iActionOfTour.classList.add("fa-dot-circle");
        actionOfTour.appendChild(iActionOfTour);
        actionOfTour.append(contentTour[i].action);  //Bổ sung thêm cột actionOfTour

        infoTravel.appendChild(calendar);
        infoTravel.appendChild(numberOfPeople);
        infoTravel.appendChild(actionOfTour);

        //tạo ra các phần tử con của infoTravelText
        let infoTravelText=document.createElement("div");
        infoTravelText.classList.add("infoTravelText");

        //Xử lý title
        let title=document.createElement("b");
        let h3Title=document.createElement("h3");
        h3Title.append(contentTour[i].name);
        title.appendChild(h3Title);

        //Xử lý Brief
        let infoTourBrief=document.createElement("div");
        let infoTourBriefContent=document.createElement("textarea");
        infoTourBriefContent.setAttribute('readonly',true);
        infoTourBriefContent.setAttribute('rows',2);
        infoTourBriefContent.append(contentTour[i].brief);
        infoTourBrief.appendChild(infoTourBriefContent);

        //Xử lý Price and Quality
        let priceAndQuality=document.createElement("b");
        let spanIconPriceTour=document.createElement("span");
        spanIconPriceTour.classList.add("iconDollar");
        let iPriceTour=document.createElement("i");
        let priceTourVal=document.createElement("span");
        let spanIconQualityTour=document.createElement("span");
        let iQualityTour=document.createElement("i");
        let qualityTourVal=document.createElement("span");
        let qualityTourValText=document.createElement("span");
        iPriceTour.classList.add("fas");
        iPriceTour.classList.add("fa-dollar-sign");
        iQualityTour.classList.add("fas");
        iQualityTour.classList.add("fa-star");
        priceTourVal.append(contentTour[i].price);
        qualityTourVal.append(contentTour[i].quality);
        qualityTourValText.append(handleQualityTourValText(contentTour[i].quality));
        //Price
        spanIconPriceTour.appendChild(iPriceTour);
        
        //Quality
        spanIconQualityTour.appendChild(iQualityTour);

        priceAndQuality.appendChild(spanIconPriceTour);
        priceAndQuality.appendChild(priceTourVal);
        priceAndQuality.appendChild(spanIconQualityTour);
        priceAndQuality.appendChild(qualityTourVal);
        priceAndQuality.appendChild(qualityTourValText);

        infoTravelText.appendChild(title);
        infoTravelText.appendChild(infoTourBrief);
        infoTravelText.appendChild(priceAndQuality);

        //btn-Add-To-Cart
        let divAddToCart=document.createElement("div");
        divAddToCart.classList.add("btn-Add-To-Cart");
        let iconAddToCart = document.createElement("i");
        iconAddToCart.classList.add("fas");
        iconAddToCart.classList.add("fa-cart-plus");
        iconAddToCart.classList.add("iconCartPlus");
        iconAddToCart.setAttribute('data-index',i);
        iconAddToCart.append("  Add to Cart");
        let divTourId=document.createElement("div");
        divTourId.classList.add("dataIdTour");
        divTourId.append(contentTour[i].id);
        divAddToCart.appendChild(iconAddToCart);
        divAddToCart.appendChild(divTourId);
        //append các thẻ trên vào gridItem
        gridItem.appendChild(gridImgContainer);
        gridItem.appendChild(infoTravel);
        gridItem.appendChild(infoTravelText);
        gridItem.appendChild(divAddToCart);
        itemContainer.appendChild(gridItem);
    }
    console.log(contentTour);
}
function handleQualityTourValText(qualityVal)
{
    if(qualityVal>4.5)
    {
        return 'Best';
    }
    else
        if(qualityVal>4)
        {
            return 'Excellent';
        }
        else
            if(qualityVal>3)
            {
                return 'Good';
            }
            else
                if(qualityVal>2.5)
                {
                    return 'Normal';
                }
                else
                    return 'Bad';
}