

  const mainPopup = document.querySelector(".main-popup");
  const close = document.querySelector(".close");

  

  window.addEventListener("load",function(){
 
   showPopup();
   // setTimeout(function(){
   //   mainPopup.classList.add("show");
   // },5000)

  })

  function showPopup(){
        const timeLimit = 1 // seconds;
        let i=0;
        const timer = setInterval(function(){
         i++;
         if(i == timeLimit){
          clearInterval(timer);
          mainPopup.classList.add("show");
         } 
         console.log(i)
        
        },1000);
  }


  close.addEventListener("click",function(){
    mainPopup.classList.remove("show");
  })
  

