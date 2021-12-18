var urlSearchByTourguideName='http://localhost:8080/api/tours/searchByTourguide/';
var urlSearchByTourName='http://localhost:8080/api/tours/searchByTour/';
var urlSearchAll='http://localhost:8080/api/tours/searchAll/';
var index;
window.addEventListener("load", async function(){
    var $radios = $('input:radio[name=searchOption]');
    if($radios.is(':checked') === false) {
        $radios.filter('[value=all]').prop('checked', true);
    }
    //Search toan bo content, va lay trang dau tien
    index=1;
    await search(index-1,'',urlSearchAll);
    let btnSearch=document.getElementById("btn-search");
    let btnPrevious=document.getElementById("previousPage");
    let btnNext=document.getElementById("nextPage");
    if(btnSearch)                                       //btnSearch != null
    {
        btnSearch.addEventListener("click", searchBtnFunction,false);
    }
    if(btnPrevious)
    {
        btnPrevious.addEventListener("click",gotoPreviousPage,false);
    }
    if(btnNext)
    {
        btnNext.addEventListener("click",gotoNextPage,false);
    }
})
async function searchBtnFunction()
{
    let url=getURL();
    let mySearchString=document.getElementById("search").value;
    index=1;
    await search(index-1,mySearchString,url);
    showPageNumber();       
}
async function gotoPreviousPage()
{
    //trang 2 tro di
    if(index>1)
    {
        let url=getURL();
        let mySearchString=document.querySelector("#search").value;
        await search(index-2,mySearchString,url);
        index--;
        showPageNumber();    
    }
    else
    {
        alert('You are in the first page');
    }
}
function gotoNextPage()
{
    let url=getURL();
    let mySearchString=document.querySelector("#search").value;
    search(index,mySearchString,url);
    index++;
    showPageNumber();   
}
function showPageNumber()
{
    document.querySelector("#pageNumber").innerHTML=index;
}
function getURL()
{
    let getSelectedValue = document.querySelector( 'input[name="searchOption"]:checked');   
    let optionVal=getSelectedValue.value;
    if(optionVal==='all')
        return urlSearchAll;
        else
            if(optionVal==='tour')
                return urlSearchByTourName;
                else
                    if(optionVal==='tourguide')
                        return urlSearchByTourguideName;
}
async function search(page, searchString,urlSearch) {
    let formData={searchString};
    $("#divGrid .gridItem").remove(); 
    $.ajax({
        url: urlSearch+page,
        type: 'POST',
        contentType: 'application/json',
        data:JSON.stringify(formData),
        dataType: 'json',
        success: 
        function (response) 
        {
            console.log("Get Tour Successfully!");
            console.log(response);
            showTour(response);
        }
        ,
        error: function (jqXHR) {
            // log the error to the console
            console.log("Error");
        },
        complete: function () {
            console.log("Venue Patch Ran");
        }
    })
}
function showTour(response)
{
    let listTour=response.content;
    orderTour(listTour);
    let size=listTour.length;
    if(size>25)
    {
        size=25;
    }
    let tourItemContainer=$('#divGrid');
    for(let i=0;i<size;i++)
    {
        let template = Handlebars.compile( $("#tour-item-template").html());
        let contentVAL={
            urlViewTour:"/ViewTour/HTML/ViewTour.html?tourId="+listTour[i].id,
            image:listTour[i].image,
            time:listTour[i].time,
            maxmember:listTour[i].maxmember,
            action:listTour[i].action,
            name:listTour[i].name,
            brief:listTour[i].brief,
            price:listTour[i].price,
            qualityNumber:listTour[i].quality,
            qualityString:handleQualityTourValText(listTour[i].quality)
        }
        tourItemContainer.append(template(contentVAL));
    }
}
function orderTour(contentTour)
{
    let listOrderOption = document.getElementById("orderOptions");
    let orderSelection = listOrderOption.options[listOrderOption.selectedIndex].value;
    //alert(orderSelection);
    switch(orderSelection) {
        case 'Rating':
            return contentTour.sort(orderByRating);
        case 'MemberLTH':
            return contentTour.sort(orderByMemberLTH);
        case 'MemberHTL':
            return contentTour.sort(orderByMemberHTL);
        case 'PriceLTH':
            return contentTour.sort(orderByPriceLTH);
        case 'PriceHTL':
            return contentTour.sort(orderByPriceHTL);
        default:
            return contentTour;
    }
}
function orderByRating(tour1,tour2)
{
    return tour2.quality-tour1.quality;
}
function orderByMemberLTH(tour1,tour2)
{
    return tour1.maxmember-tour2.maxmember;
}
function orderByMemberHTL(tour1,tour2)
{
    return tour2.maxmember-tour1.maxmember;
}
function orderByPriceLTH(tour1,tour2)
{
    return tour1.price-tour2.price;
}
function orderByPriceHTL(tour1,tour2)
{
    return tour2.price-tour1.price;
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