$('#infoTourguide').ready(function() {
    $.ajax({
        url: 'http://localhost:8080/api/infomyshop/view-homepage',
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: 
        function (response) 
        {
            console.log("Venue Successfully Patched!");
            console.log(response);
            handleValOfMyShop(response);
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
function handleValOfMyShop(response){
    const infoDatas = document.querySelectorAll(".infoData");
    let duration=3000;
    animateNumber(response.numberoftour, duration, 0, function (number) {                     //tăng dần trong vòng 3s
      const formattedNumber = number.toLocaleString()
      infoDatas[0].innerText = formattedNumber
    })
    
    animateNumber(response.totaltime, duration, 0, function (number) {
      const formattedNumber = number.toLocaleString()
      infoDatas[1].innerText = formattedNumber
    })
    
    animateNumber(response.minprice, duration, 0, function (number) {
      const formattedNumber = number.toLocaleString()
      infoDatas[2].innerText = formattedNumber;
    })
    animateNumber(response.averagequality, duration, 0, function (number) {
        const formattedNumber = number.toLocaleString()
        infoDatas[3].innerText = formattedNumber
      })
}
function animateNumber(finalNumber, duration = 5000, startNumber = 0, callback) {
    console.log(1);
      let currentNumber = startNumber
      const interval = window.setInterval(updateNumber, 17)   // 17/1000 s thì thực hiện updateNumber 1 lần
      function updateNumber() {
        if (currentNumber >= finalNumber) {
          clearInterval(interval)
        } else {
          let inc = Math.ceil((finalNumber / (duration / 17))*10)/10    //làm tròn lấy 1 số thập phân sau dấu ,
          if (currentNumber + inc > finalNumber) {
            currentNumber = finalNumber
            clearInterval(interval)
          } else {
            currentNumber += inc
          }
          callback(currentNumber)
        }
      } }