
var subtotal =0;
const listCart = [];
const listcartcheckOut = [];
var checkall = 9999;

$('#divCart').ready(function(){
    const cars = ["Saab", "Volvo","ss"];
    let id = sessionStorage.getItem("idUser");
    let userincart={id};
            var formData = {userincart };
            $.ajax({
                url: 'http://localhost:8080/api/cart/view-cart-user',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(formData),
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
                    console.log("The following error: " + textStatus, errorThrown);
                },
                complete: function () {
                    console.log("Venue Patch Ran");
                }
            })
    
})

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
        divGuideItem.append("Guide ID");
        let divGuideText=document.createElement("div");
        divGuideText.classList.add("text-xl");
        divGuideText.classList.add("font-weight-medium");
        let spanGuide=document.createElement("span");
        spanGuide.append(contentTour[i].tourincart.tourguide.id);
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
        divTimeItem.append("Time");
        let divTimeText=document.createElement("div");
        divTimeText.classList.add("text-xl");
        divTimeText.classList.add("font-weight-medium");
        let spanTime=document.createElement("span");
        spanTime.append(contentTour[i].tourincart.time);
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
