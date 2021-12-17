window.addEventListener("load",function(){
    // let btnAdd=document.getElementById("btn-Add-To-Cart");
    // if(btnAdd)                                       //btnSearch != null
    // {
    //     btnAdd.addEventListener("click", checkAndAddToCart,false);
    // }
})
async function checkAndAddToCart()
{
    let id=getTourId();
    let tourincart = {id};
    let userincart = getUserInCart();
    let status = "cart";
    let check=await checkTourAvailable(tourincart,userincart);
    if(check==false)
    {
        callAPIAddToCart(status,userincart,tourincart);
    }
}
function getTourId()
{
    let url=new URL(location.href);
    let tourId=url.searchParams.get("tourId");         //Xử lý tourid\
    return tourId;
}
function getUserInCart()
{
    let id = sessionStorage.getItem("idUser");    //thay bằng bước xử lý userid
    if(id===null)
        id=-1;
    let userincart={id};
    return userincart;
}
async function checkTourAvailable(tourincart,userincart)
{
    var formData = {userincart, tourincart};
    let tourstatus;
    $.ajax({
        async: false,
        url: 'http://localhost:8080/api/cart/check-exit',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        dataType: 'json',
        success: function (response) {
            console.log(response);
            console.log("Successfully Checked!");
            if(response.status==true)
            {
                alert(response.alert);
            }
            tourstatus= response.status;
        },
        error: function (jqXHR) {
            console.log("The following error occured: " + textStatus, errorThrown);
            alert("Error! Please try again!!!");
        },
        complete: function () {
            console.log("complete");
        }
    })
    if(tourstatus==true)
        return true;
    return false;
}
function callAPIAddToCart(status, userincart, tourincart)
{
    var formData = {status,userincart, tourincart};
    $.ajax({
        url: 'http://localhost:8080/api/cart',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        dataType: 'json',
        success: function (response) {
            console.log(response);
            console.log("Successfully Added!");
            //alert(response.status);
            if(response.status==true)
            {
                alert("Add tour to cart successfully!!!");
            }
            else
            {
                alert("Error! Please try again!!!");
            }         
        },
        error: function (jqXHR) {
            console.log("The following error occured: " + textStatus, errorThrown);
            alert("Error! Please try again!!!");
        },
        complete: function () {
            console.log("complete");
        }
    })
}
