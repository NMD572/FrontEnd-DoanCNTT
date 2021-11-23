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
    }
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    const infoDatas = document.querySelectorAll(".infoData");
    let duration=3000;
    animateNumber(200, duration, 0, function (number) {                     //tăng dần trong vòng 3s
      const formattedNumber = number.toLocaleString()
      infoDatas[0].innerText = formattedNumber
    })
    
    animateNumber(50, duration, 0, function (number) {
      const formattedNumber = number.toLocaleString()
      infoDatas[1].innerText = formattedNumber
    })
    
    animateNumber(200, duration, 0, function (number) {
      const formattedNumber = number.toLocaleString()
      infoDatas[2].innerText = formattedNumber;
    })
    animateNumber(4.5, duration, 0, function (number) {
        const formattedNumber = number.toLocaleString()
        infoDatas[3].innerText = formattedNumber
      })
  })