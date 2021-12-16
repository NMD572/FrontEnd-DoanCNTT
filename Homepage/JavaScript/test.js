window.addEventListener("load",function(){
    const btnAddToCarts= document.querySelectorAll(".btn-Add-To-Cart");
    const idTourArray=document.querySelectorAll(".dataIdTour");
    btnAddToCarts.forEach((item) => item.addEventListener("click",function(e){
    const btnIndex = parseInt(e.target.dataset.index);
    console.log(btnIndex);
    console.log("id: "+idTourArray[btnIndex].innerHTML);
    }))
})
