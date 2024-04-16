var currentPlayer = 'X';
$(document).ready(function () {
    //Hàm ready đảm bảo những mã trong này được chạy khi
    //mọi thành phần của DOM đã được load xong
    $('.cell').click(function (e) { 
        console.log('cell clicked');
        $(this).text(currentPlayer);
        currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
    });

});
  