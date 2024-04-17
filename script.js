//Khởi tạo các biến toàn cục
var currentPlayer = 'X';
var gameState = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

$(document).ready(function () {
    renderBoard(gameState);
    // Khi người đánh
    $('#board').on('click','.cell',function (e) { 
        console.log('cell clicked');
        $(this).text(currentPlayer);
        currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
        gameState = extractGameStateFromUI(); //lấy dữ liệu từ UI xuống
        if(checkWin(gameState)){
            alert("Win!"); return;
        }
        if(checkDraw(gameState)){
            alert("Draw!"); return;
        }

        //Máy đánh
        gameState = computerPlay(gameState); //đánh
        renderBoard(gameState); //cập nhật đánh lên UI
        currentPlayer = 'X';//chuyển về người đánh
        if(checkWin(gameState)){
            alert("Lose!"); return;
        }
        if(checkDraw(gameState)){
            alert("Draw!"); return;
        }
    });
});

  