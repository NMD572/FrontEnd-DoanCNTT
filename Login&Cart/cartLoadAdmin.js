
var subtotal =0;
const listCart = [];
const listcartcheckOut = [];
var checkall = 9999;
function removeTour(control){
    console.log(control.dataset.index);
    console.log(listCart[control.dataset.index-1]);
   // window.location.assign("./FEDoan/HomePage/FrontEnd-DoanCNTT/HTML/index.html");

    console.log(control);
}
$(document).ready(function() {
 
    $('#checkall').click(function(event) { 
        if(this.checked) { 
            $('.iCheckbox').each(function() { 
                this.checked = true;   
               
            });
            console.log("All");
            
        }else{
            $('.iCheckbox').each(function() { 
                this.checked = false;                    
            
            });      
            
        }
    });

});

var theTotal = parseFloat(0);
function calc(control)
    {
        var flag = true;
        console.log(control);
    if (control.checked == true) {
        
    console.log(control.dataset.index);
    console.log(listCart[control.dataset.index-1]);
    if(listcartcheckOut.length ==0){
        listcartcheckOut.push(listCart[control.dataset.index-1]);
        console.log(listcartcheckOut);
    }
    else {
    for(let i=0;i<listcartcheckOut.length;i++){
        if(listCart[control.dataset.index-1]==listcartcheckOut[i])
        {
        flag = false;
        break;
        }
    }
    if(flag ==true) {
    listcartcheckOut.push(listCart[control.dataset.index-1]);
    console.log(listcartcheckOut);
    }

}
    
    theTotal += parseFloat(control.value);
    } else {
        
        for(let i=0;i<listcartcheckOut.length;i++){
            if(listCart[control.dataset.index-1]==listcartcheckOut[i])
            {
                listcartcheckOut.splice(i,1);
                console.log(listcartcheckOut);
                break;
            }

        }
    theTotal-=parseFloat(control.value);
    console.log(control.dataset.index);
    console.log(listCart[control.dataset.index-1]);
    }
    document.getElementById("total").innerHTML = theTotal;
}
function removeTour(control){
    console.log(control.dataset.index);
    var id =listCart[control.dataset.index-1];

    $.ajax({
        url: 'http://localhost:8080/api/tours/' +id,
        type: 'DELETE',
        contentType: 'application/json',
        dataType: 'JSON',
        success:
        function (response) 
        {
           console.log(response);
        
           alert("Xóa chuyến đi thành công!!");
           window.location.assign("");
           
   
   
        }
        ,
        error: function (jqXHR) {
            // log the error to the console
           // console.log("The following error occured: " + textStatus, errorThrown);
           console.log("Xóa thất bại");
   
        },
        complete: function () {
           console.log("Venue Patch Ran");
            
      
          
        }
    })
    

}


function sumall()
{
    theTotal=0;
    var input = document.getElementsByClassName("iCheckbox");
    for (var i =0 ;i<input.length;i++)
    {
        if (input[i].checked)
        {
            theTotal+=parseFloat(input[i].value);
        }
        else theTotal=0;
    }
    document.getElementById("total").innerHTML = theTotal;
    //add all
    //1. remove all
    let temop =listcartcheckOut.length;
    console.log(temop);
    for(var j=0;j<temop;j++)
        {
            listcartcheckOut.pop();
                console.log("da xoa "+j);
               
        }

    console.log(listcartcheckOut);
    
    //2.add all
        if(checkall % 2==1 ){
        let tempaddall = listCart.length;
       
        for(var i=0;i<tempaddall;i++)
        {
        listcartcheckOut[i]=listCart[i];   
        }
        console.log(listCart);
    }       
    checkall=checkall -1;
}
function update() {
    console.log(listcartcheckOut);
    
}

    
    function loadCart(status){
    
            $.ajax({
                url: 'http://localhost:8080/api/cart/view-cart/'+status,
                type: 'GET',
                contentType: 'application/json',
                dataType: 'JSON',
                success:
                function (response) 
                {
                    console.log("Venue Successfully Patched!");
                   console.log(response);
                   
                createCart(response);
                }
                ,
                error: function (jqXHR) {
                    // log the error to the console
                    console.log("The following error: " );
                },
                complete: function () {
                    console.log("Venue Patch Ran");
                }
            })
    
        }
        function loadTour(){
    
            $.ajax({
                url: 'http://localhost:8080/api/tours/view-all',
                type: 'GET',
                contentType: 'application/json',
                dataType: 'JSON',
                success:
                function (response) 
                {
                    console.log("Venue Successfully Patched!");
                   console.log(response);
                   
                createTour(response);
                }
                ,
                error: function (jqXHR) {
                    // log the error to the console
                    console.log("The following error: " );
                },
                complete: function () {
                    console.log("Venue Patch Ran");
                }
            })
    
        }
        

function createCart(response){
    
    const itemContainer=document.getElementById("divCart");
    let contentTour=response;
    console.log(contentTour.length);
    let size=0;
    size=contentTour.length;
    for(let i = 0; i < size; ++i)
    {
        
        //Tạo gridItem
        let grid=document.createElement("div");
        grid.classList.add("grid");
        grid.classList.add("cart-item");
        grid.classList.add("d-md-flex");
        grid.classList.add("justify-content-between");
        

       //Tạo remove
       let removeCart=document.createElement("div");
       removeCart.classList.add("removeCart");
       let divRemove=document.createElement("div");
       divRemove.classList.add("divRemove");
       divRemove.classList.add("remove-item");
       divRemove.classList.add("fa");
       divRemove.classList.add("fa-times");
       divRemove.setAttribute('data-index',i+1);
       divRemove.setAttribute('onclick','remove(this)');
       let divDataIdRemove=document.createElement("div");
       divDataIdRemove.classList.add("dataIdRemove");
       divDataIdRemove.append(contentTour[i].id);

       removeCart.appendChild(divRemove);
       removeCart.appendChild(divDataIdRemove);
        
        

        //Tạo checkbox
        // let checkBoxCart=document.createElement("div");
        // checkBoxCart.classList.add("checkBoxCart");
        // let divCheckbox=document.createElement("div");
        // divCheckbox.classList.add("divCheckbox");

        // let iCheckbox = document.createElement("input");
        // iCheckbox.classList.add("iCheckbox");
        // iCheckbox.setAttribute('type', 'checkbox');
        // iCheckbox.setAttribute('data-index',i+1);

        // divCheckbox.appendChild(iCheckbox);

        // let divDataIdCart=document.createElement("div");
        // divDataIdCart.classList.add("dataIdCart");
        // divDataIdCart.append(contentTour[i].id);
        
        // checkBoxCart.appendChild(divCheckbox);
        // checkBoxCart.appendChild(divDataIdCart);
         //Tạo checkbox
         let checkBoxCart=document.createElement("div");
         checkBoxCart.classList.add("checkBoxCart");
         let divCheckbox=document.createElement("div");
         divCheckbox.classList.add("divCheckbox");
 
         let iCheckbox = document.createElement("input");
         iCheckbox.classList.add("iCheckbox");
         iCheckbox.setAttribute('type', 'checkbox');
         iCheckbox.setAttribute('data-index',i+1);
         iCheckbox.setAttribute('onchange','calc(this)'); 
       
         iCheckbox.setAttribute('value', contentTour[i].tourincart.price); // chỗ này là giá tiền á ông, ông thêm chỗ này cho giống giá tiền dưới luôn nha

         divCheckbox.appendChild(iCheckbox);
 
         let divDataIdCart=document.createElement("div");
         divDataIdCart.classList.add("dataIdCart");
         divDataIdCart.append(contentTour[i].id);
         
         checkBoxCart.appendChild(divCheckbox);
         checkBoxCart.appendChild(divDataIdCart);
        

        let infoGrid=document.createElement("div");//còn add
        infoGrid.classList.add("infoGrid");
        infoGrid.classList.add("px-3");
        infoGrid.classList.add("my-3");

        let cartProduce=document.createElement("div");
        cartProduce.classList.add("cartProduce");
        cartProduce.classList.add("cart-item-product");
        
        let gridImgContainer= document.createElement("div");
        gridImgContainer.classList.add("gridImgContainer");
        gridImgContainer.classList.add("cart-item-product-thumb");
        let gridImg=document.createElement("img");
        gridImg.classList.add("gridImg");
        gridImg.setAttribute('src', contentTour[i].tourincart.image);
        gridImg.setAttribute('alt', 'tourImg');
        gridImgContainer.appendChild(gridImg);

        //gridCartContainer
        let gridCartContainer=document.createElement("div");
        gridCartContainer.classList.add("gridCartContainer");
        gridCartContainer.classList.add("cart-item-product-info");//chưa add 
        
        //add phàn tử vô gridCartContainer
        let divName=document.createElement("div");
        divName.classList.add("divName");
        let nameCart = document.createElement("h4");
        nameCart.classList.add("nameCart");
        nameCart.classList.add("cart-item-product-title");
        nameCart.append(contentTour[i].tourincart.name);
        divName.appendChild(nameCart);

        let divBrief=document.createElement("div");
        divBrief.classList.add("divBrief");
        let spanBrief=document.createElement("span");
        let strongBrief=document.createElement("strong");
        strongBrief.append("Brief: ");
        spanBrief.appendChild(strongBrief);
        divBrief.append(spanBrief, contentTour[i].tourincart.brief);

        let divCountry=document.createElement("div");
        divCountry.classList.add("divCountry");
        let spanCountry=document.createElement("span");
        let strongCountry=document.createElement("strong");
        strongCountry.append("Country: ");
        spanCountry.appendChild(strongCountry);
        divCountry.append(spanCountry, contentTour[i].tourincart.country);

        let divQuality=document.createElement("div");
        divQuality.classList.add("divQuality");
        let spanQuality=document.createElement("span");
        let strongQuality=document.createElement("strong");
        strongQuality.append("Quality: ");
        divQuality.appendChild(strongQuality);
        divQuality.append(spanQuality, handleQualityTourValText(contentTour[i].tourincart.quality));

        //ad vô gridCartContainer
        gridCartContainer.appendChild(divName);
        gridCartContainer.appendChild(divBrief);
        gridCartContainer.appendChild(divCountry);
        gridCartContainer.appendChild(divQuality);

        //add vô cartproduce
        cartProduce.appendChild(gridImgContainer);
        cartProduce.appendChild(gridCartContainer);

        //add vào infoGrid
        infoGrid.appendChild(cartProduce);

        //divGuide
        let divGuide=document.createElement("div");
        divGuide.classList.add("divGuide");
        divGuide.classList.add("px-3");
        divGuide.classList.add("my-3");
        divGuide.classList.add("text-center");
        let divGuideItem=document.createElement("div");
        divGuideItem.classList.add("cart-item-label");
        divGuideItem.append("User Id");
        let divGuideText=document.createElement("div");
        divGuideText.classList.add("text-xl");
        divGuideText.classList.add("font-weight-medium");
        let spanGuide=document.createElement("span");
        spanGuide.append(contentTour[i].userincart.id);
        divGuideText.appendChild(spanGuide);
        divGuide.appendChild(divGuideItem);
        divGuide.appendChild(divGuideText);

        //divMember
        let divMember=document.createElement("div");
        divMember.classList.add("divPrice");
        divMember.classList.add("px-3");
        divMember.classList.add("my-3");
        divMember.classList.add("text-center");
        let divMemberItem=document.createElement("div");
        divMemberItem.classList.add("cart-item-label");
        divMemberItem.append("Max member");
        let divMemberText=document.createElement("div");
        divMemberText.classList.add("text-xl");
        divMemberText.classList.add("font-weight-medium");
        let spanMember=document.createElement("span");
        spanMember.append(contentTour[i].tourincart.maxmember);
        divMemberText.appendChild(spanMember);
        divMember.appendChild(divMemberItem);
        divMember.appendChild(divMemberText);

        //divPrice
        let divPrice=document.createElement("div");
        divGuide.classList.add("divPrice");
        divPrice.classList.add("px-3");
        divPrice.classList.add("my-3");
        divPrice.classList.add("text-center");
        let divPriceItem=document.createElement("div");
        divPriceItem.classList.add("cart-item-label");
        divPriceItem.append("Price");
        let divPriceText=document.createElement("div");
        divPriceText.classList.add("text-xl");
        divPriceText.classList.add("font-weight-medium");
        let spanPrice=document.createElement("span");
        spanPrice.append(contentTour[i].tourincart.price+"$");
        divPriceText.appendChild(spanPrice);
        divPrice.appendChild(divPriceItem);
        divPrice.appendChild(divPriceText);
        console.log(contentTour[i].id);
        listCart.push(contentTour[i].id);
        
        //divTime
        let divTime=document.createElement("div");
        divGuide.classList.add("divTime");
        divTime.classList.add("px-3");
        divTime.classList.add("my-3");
        divTime.classList.add("text-center");
        let divTimeItem=document.createElement("div");
        divTimeItem.classList.add("cart-item-label");
        divTimeItem.append("Status");
        let divTimeText=document.createElement("div");
        divTimeText.classList.add("text-xl");
        divTimeText.classList.add("font-weight-medium");
        let spanTime=document.createElement("span");
        spanTime.append(contentTour[i].status);
        divTimeText.appendChild(spanTime);
        divTime.appendChild(divTimeItem);
        divTime.appendChild(divTimeText);

        //add tất cả
        
        
        cartProduce.appendChild(gridImgContainer);
        cartProduce.appendChild(gridCartContainer);
        infoGrid.appendChild(cartProduce);
        grid.appendChild(removeCart);
        grid.appendChild(checkBoxCart);
        grid.appendChild(infoGrid);
        grid.appendChild(divGuide);
        grid.appendChild(divMember);
        grid.appendChild(divPrice);
        grid.appendChild(divTime);

        itemContainer.appendChild(grid);
    }
    console.log(contentTour);
    
}
function createTour(response){
    
    const itemContainer=document.getElementById("divCart");
    let contentTour=response;
    console.log(contentTour.length);
    let size=0;
    size=contentTour.length;
    for(let i = 0; i < size; ++i)
    {
        
        //Tạo gridItem
        let grid=document.createElement("div");
        grid.classList.add("grid");
        grid.classList.add("cart-item");
        grid.classList.add("d-md-flex");
        grid.classList.add("justify-content-between");
        

       //Tạo remove
       let removeCart=document.createElement("div");
       removeCart.classList.add("removeCart");
       let divRemove=document.createElement("div");
       divRemove.classList.add("divRemove");
       divRemove.classList.add("remove-item");
       divRemove.classList.add("fa");
       divRemove.classList.add("fa-times");
       divRemove.setAttribute('data-index',i+1);
       divRemove.setAttribute('onclick','removeTour(this)');
       let divDataIdRemove=document.createElement("div");
       divDataIdRemove.classList.add("dataIdRemove");
       divDataIdRemove.append(contentTour[i].id);

       removeCart.appendChild(divRemove);
       removeCart.appendChild(divDataIdRemove);
        
        

        //Tạo checkbox
        // let checkBoxCart=document.createElement("div");
        // checkBoxCart.classList.add("checkBoxCart");
        // let divCheckbox=document.createElement("div");
        // divCheckbox.classList.add("divCheckbox");

        // let iCheckbox = document.createElement("input");
        // iCheckbox.classList.add("iCheckbox");
        // iCheckbox.setAttribute('type', 'checkbox');
        // iCheckbox.setAttribute('data-index',i+1);

        // divCheckbox.appendChild(iCheckbox);

        // let divDataIdCart=document.createElement("div");
        // divDataIdCart.classList.add("dataIdCart");
        // divDataIdCart.append(contentTour[i].id);
        
        // checkBoxCart.appendChild(divCheckbox);
        // checkBoxCart.appendChild(divDataIdCart);
         //Tạo checkbox
         let checkBoxCart=document.createElement("div");
         checkBoxCart.classList.add("checkBoxCart");
         let divCheckbox=document.createElement("div");
         divCheckbox.classList.add("divCheckbox");
 
         let iCheckbox = document.createElement("input");
         iCheckbox.classList.add("iCheckbox");
         iCheckbox.setAttribute('type', 'checkbox');
         iCheckbox.setAttribute('data-index',i+1);
         iCheckbox.setAttribute('onchange','calc(this)'); 
       
         iCheckbox.setAttribute('value', contentTour[i].price); // chỗ này là giá tiền á ông, ông thêm chỗ này cho giống giá tiền dưới luôn nha

         divCheckbox.appendChild(iCheckbox);
 
         let divDataIdCart=document.createElement("div");
         divDataIdCart.classList.add("dataIdCart");
         divDataIdCart.append(contentTour[i].id);
         
         checkBoxCart.appendChild(divCheckbox);
         checkBoxCart.appendChild(divDataIdCart);
        

        let infoGrid=document.createElement("div");//còn add
        infoGrid.classList.add("infoGrid");
        infoGrid.classList.add("px-3");
        infoGrid.classList.add("my-3");

        let cartProduce=document.createElement("div");
        cartProduce.classList.add("cartProduce");
        cartProduce.classList.add("cart-item-product");
        
        let gridImgContainer= document.createElement("div");
        gridImgContainer.classList.add("gridImgContainer");
        gridImgContainer.classList.add("cart-item-product-thumb");
        let gridImg=document.createElement("img");
        gridImg.classList.add("gridImg");
        gridImg.setAttribute('src', contentTour[i].image);
        gridImg.setAttribute('alt', 'tourImg');
        gridImgContainer.appendChild(gridImg);

        //gridCartContainer
        let gridCartContainer=document.createElement("div");
        gridCartContainer.classList.add("gridCartContainer");
        gridCartContainer.classList.add("cart-item-product-info");//chưa add 
        
        //add phàn tử vô gridCartContainer
        let divName=document.createElement("div");
        divName.classList.add("divName");
        let nameCart = document.createElement("h4");
        nameCart.classList.add("nameCart");
        nameCart.classList.add("cart-item-product-title");
        nameCart.append(contentTour[i].name);
        divName.appendChild(nameCart);

        let divBrief=document.createElement("div");
        divBrief.classList.add("divBrief");
        let spanBrief=document.createElement("span");
        let strongBrief=document.createElement("strong");
        strongBrief.append("Brief: ");
        spanBrief.appendChild(strongBrief);
        divBrief.append(spanBrief, contentTour[i].brief);

        let divCountry=document.createElement("div");
        divCountry.classList.add("divCountry");
        let spanCountry=document.createElement("span");
        let strongCountry=document.createElement("strong");
        strongCountry.append("Country: ");
        spanCountry.appendChild(strongCountry);
        divCountry.append(spanCountry, contentTour[i].country);

        let divQuality=document.createElement("div");
        divQuality.classList.add("divQuality");
        let spanQuality=document.createElement("span");
        let strongQuality=document.createElement("strong");
        strongQuality.append("Quality: ");
        divQuality.appendChild(strongQuality);
        divQuality.append(spanQuality, handleQualityTourValText(contentTour[i].quality));

        //ad vô gridCartContainer
        gridCartContainer.appendChild(divName);
        gridCartContainer.appendChild(divBrief);
        gridCartContainer.appendChild(divCountry);
        gridCartContainer.appendChild(divQuality);

        //add vô cartproduce
        cartProduce.appendChild(gridImgContainer);
        cartProduce.appendChild(gridCartContainer);

        //add vào infoGrid
        infoGrid.appendChild(cartProduce);

        //divGuide
        let divGuide=document.createElement("div");
        divGuide.classList.add("divGuide");
        divGuide.classList.add("px-3");
        divGuide.classList.add("my-3");
        divGuide.classList.add("text-center");
        let divGuideItem=document.createElement("div");
        divGuideItem.classList.add("cart-item-label");
        divGuideItem.append("Tourguide Id");
        let divGuideText=document.createElement("div");
        divGuideText.classList.add("text-xl");
        divGuideText.classList.add("font-weight-medium");
        let spanGuide=document.createElement("span");
        spanGuide.append(contentTour[i].tourguide.id);
        divGuideText.appendChild(spanGuide);
        divGuide.appendChild(divGuideItem);
        divGuide.appendChild(divGuideText);

        //divMember
        let divMember=document.createElement("div");
        divMember.classList.add("divPrice");
        divMember.classList.add("px-3");
        divMember.classList.add("my-3");
        divMember.classList.add("text-center");
        let divMemberItem=document.createElement("div");
        divMemberItem.classList.add("cart-item-label");
        divMemberItem.append("Max member");
        let divMemberText=document.createElement("div");
        divMemberText.classList.add("text-xl");
        divMemberText.classList.add("font-weight-medium");
        let spanMember=document.createElement("span");
        spanMember.append(contentTour[i].maxmember);
        divMemberText.appendChild(spanMember);
        divMember.appendChild(divMemberItem);
        divMember.appendChild(divMemberText);

        //divPrice
        let divPrice=document.createElement("div");
        divGuide.classList.add("divPrice");
        divPrice.classList.add("px-3");
        divPrice.classList.add("my-3");
        divPrice.classList.add("text-center");
        let divPriceItem=document.createElement("div");
        divPriceItem.classList.add("cart-item-label");
        divPriceItem.append("Price");
        let divPriceText=document.createElement("div");
        divPriceText.classList.add("text-xl");
        divPriceText.classList.add("font-weight-medium");
        let spanPrice=document.createElement("span");
        spanPrice.append(contentTour[i].price+"$");
        divPriceText.appendChild(spanPrice);
        divPrice.appendChild(divPriceItem);
        divPrice.appendChild(divPriceText);
        console.log(contentTour[i].id);
        listCart.push(contentTour[i].id);
        
        //divTime
        let divTime=document.createElement("div");
        divGuide.classList.add("divTime");
        divTime.classList.add("px-3");
        divTime.classList.add("my-3");
        divTime.classList.add("text-center");
        let divTimeItem=document.createElement("div");
        divTimeItem.classList.add("cart-item-label");
        divTimeItem.append("Time");
        let divTimeText=document.createElement("div");
        divTimeText.classList.add("text-xl");
        divTimeText.classList.add("font-weight-medium");
        let spanTime=document.createElement("span");
        spanTime.append(contentTour[i].time +"D");
        divTimeText.appendChild(spanTime);
        divTime.appendChild(divTimeItem);
        divTime.appendChild(divTimeText);

        //add tất cả
        
        
        cartProduce.appendChild(gridImgContainer);
        cartProduce.appendChild(gridCartContainer);
        infoGrid.appendChild(cartProduce);
        grid.appendChild(removeCart);
        grid.appendChild(checkBoxCart);
        grid.appendChild(infoGrid);
        grid.appendChild(divGuide);
        grid.appendChild(divMember);
        grid.appendChild(divPrice);
        grid.appendChild(divTime);

        itemContainer.appendChild(grid);
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
