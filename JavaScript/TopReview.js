window.addEventListener("load",function(){
const top_review_dots=document.querySelectorAll(".top-review-slider-dot-item");
top_review_dots.forEach((item) => item.addEventListener("click",function(e){
    let top_review_index=0, top_review_positionX=0;
    const top_review_sliderMain = document.querySelector(".top-review-slider-main");
    let top_review_width=top_review_sliderMain.offsetWidth;
    const slideIndex = parseInt(e.target.dataset.index);
    top_review_index = slideIndex;
    top_review_positionX=-top_review_width*top_review_index;
    //Xử lý animation
    top_review_dots.forEach(dot => dot.classList.remove("active-in-top-review"));
    e.target.classList.add("active-in-top-review");
    top_review_sliderMain.classList.remove("active-in-top-review");
    top_review_sliderMain.classList.add("active-in-top-review");
    top_review_sliderMain.style=`transform: translateX(${top_review_positionX}px)`;
    //console.log(index);
}));
})
