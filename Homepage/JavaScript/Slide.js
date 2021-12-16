window.addEventListener("load",function(){
    console.log("hello 4");
    const sliderMain = document.querySelector(".slider-main");
    const sliderItems = document.querySelectorAll(".slider-item");
    const nextBtn = document.querySelector(".slider-next");
    const prevBtn = document.querySelector(".slider-previous");
    const dotItems = document.querySelectorAll(".slider-dot-item");
    //Lấy độ rộng của 1 hình ảnh
    const sliderItemWidth = sliderItems[0].offsetWidth;
    //Lấy độ rộng của tất cả các ảnh
    
    //sliderMain.style.width=`${slidesLength*sliderItemWidth}px`;
    //console.log("width",`${slidesLength*sliderItemWidth}px`);
    
    //Thuộc tính để dịch trái, phải
    const indexMax = sliderItems.length-1;
    const indexMin = 0;
    let positionX = 0;
    let index=0;
    //Mặc định vừa vào dot 0 sẽ active
    dotItems[0].classList.add("active");
    //Tự động chuyển slide(ổn)
    loadNextSlide();
    prevBtn.addEventListener("click",function(){
        handleChangeSlide("prev");
    })
    nextBtn.addEventListener("click",function(){
        handleChangeSlide("next");
    })
    dotItems.forEach((item) => item.addEventListener("click",function(e){
        dotItems.forEach(dot => dot.classList.remove("active"));
        e.target.classList.add("active");
        const slideIndex = parseInt(e.target.dataset.index);
        index = slideIndex;
        positionX=-sliderItemWidth*index;
        sliderMain.style=`transform: translateX(${positionX}px)`;
        sliderItems.forEach(it => it.classList.remove("active"));
        sliderItems[index].classList.add("active");
        //console.log(index);
    }));
    function handleChangeSlide(direction){
        if(direction=="prev")
        {
            //console.log("prev slide");
            if(index>indexMin)
            {
                //positionX += sliderItemWidth;
                //sliderMain.style=`transform: translateX(${positionX}px)`;
                index--;
                dotItems[index].click();
            }
            else
                return ;
        }
        else
        {
            //console.log("next slide");
            if(index<indexMax)
            {
                //positionX -= sliderItemWidth;
                //sliderMain.style=`transform: translateX(${positionX}px)`;
                index++;
                dotItems[index].click();
            }
            else
                return ;
        }
        console.log("Vi tri: ",index);
    }
    function loadNextSlide(){
        const timeLimit=5;  //đơn vị: second
        let i=0;
        const timer=setInterval(function(){
            i++;
            if(i==timeLimit)
            {
                if(index<indexMax)
                {
                    index++;
                    //positionX=-sliderItemWidth*index;
                    //sliderMain.style=`transform: translateX(${positionX}px)`;
                }
                else
                {
                    index=0;
                    //positionX=0;
                    //sliderMain.style=`transform: translateX(${positionX}px)`;
                }
                i=0;
                dotItems[index].click();
                console.log("Vi tri: ",index);
            }
        },1000);
    }
})
