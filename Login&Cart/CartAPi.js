// window.addEventListener("load",function(){
//     const checkBoxCarts= document.querySelectorAll(".checkBoxCart");
//     const idCartArray=document.querySelectorAll(".dataIdCart");
//     checkBoxCarts.forEach((item) => item.addEventListener("click",function(e){
//     const btnIndex = parseInt(e.target.dataset.index);
//     console.log(idCartArray[btnIndex-1]);
//     let id = parseInt(idCartArray[btnIndex-1].innerHTML);     //tourid
//     console.log(id);
//     sessionStorage.setItem("idcart",id.toString());
//     console.log(sessionStorage.getItem("idcart"));
//     }))
// })

// window.addEventListener("load",function(){
//     const checkBoxCarts= document.querySelectorAll(".checkBoxCart");
//     const idCartArray=document.querySelectorAll(".dataIdCart");
//     checkBoxCarts.forEach((item) => item.addEventListener("click",function(e){
//     const btnIndex = parseInt(e.target.dataset.index);
//     console.log(idCartArray[btnIndex-1]);
//      let id = parseInt(idCartArray[btnIndex-1].innerHTML);     //tourid
//     console.log(id);
//     }))
// })

// window.addEventListener("load",function(){
//     const checkBoxCarts= document.querySelectorAll(".removeCart");
//     const idCartArray=document.querySelectorAll(".dataIdRemove");
//     checkBoxCarts.forEach((item) => item.addEventListener("click",function(e){
//     const btnIndex = parseInt(e.target.dataset.index);
//     let id = parseInt(idCartArray[btnIndex-1].innerHTML);     //tourid
//     console.log(id);
//     }))
// })





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
function remove(control){
    console.log(control.dataset.index);
    var id =listCart[control.dataset.index-1];

    $.ajax({
        url: 'http://localhost:8080/api/cart/' +id,
        type: 'DELETE',
        contentType: 'application/json',
        dataType: 'JSON',
        success:
        function (response) 
        {
           console.log(response);
        
           alert("Xóa chuyến đi trong giỏ hàng thành công!!");
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