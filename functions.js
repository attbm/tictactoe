/**
 * Hàm tạo giao diện từ một mảng
 * @param {*} gameState 
 */
function renderBoard(gameState) {
    const board = $('#board');
  
    // Xóa bàn cờ hiện tại
    board.empty();
  
    // Tạo bàn cờ mới từ mảng trạng thái
    for (let i = 0; i < gameState.length; i++) {
      for (let j = 0; j < gameState[i].length; j++) {
        const cellValue = gameState[i][j];
        const cell = $('<div class="cell"></div>');
        
        // Thêm giá trị vào ô nếu đã được đánh
        if (cellValue !== '') {
          cell.text(cellValue);
          cell.addClass(cellValue);
        }
  
        // Đặt thuộc tính data-cell để xác định vị trí của ô
        cell.attr('data-row', i);
        cell.attr('data-col', j);
  
        // Thêm ô vào bàn cờ
        board.append(cell);
      }
    }
  } //Hết hàm renderBoard

    /**
     * Hàm tạo mảng lưu trạng thái game từ giao diện
     * @returns Game 
     */
  function extractGameStateFromUI() {
    const gameState = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
  
    // Lặp qua mỗi ô trên bàn cờ và trích xuất giá trị
    $('.cell').each(function() {
      const row = parseInt($(this).attr('data-row'));
      const col = parseInt($(this).attr('data-col'));
      const value = $(this).text();
  
      // Cập nhật giá trị vào mảng gameState
      gameState[row][col] = value;
    });
  
    return gameState;
  }//hết hàm extractGameStateFromUI


  /**
   * Hàm kiểm tra thắng
   * @param {*} gameState 
   * @returns true thắng, false ko thắng
   */
  function checkWin(gameState) {
    const winPatterns = [
      [[0, 0], [0, 1], [0, 2]], // Dòng 1
      [[1, 0], [1, 1], [1, 2]], // Dòng 2
      [[2, 0], [2, 1], [2, 2]], // Dòng 3
      [[0, 0], [1, 0], [2, 0]], // Cột 1
      [[0, 1], [1, 1], [2, 1]], // Cột 2
      [[0, 2], [1, 2], [2, 2]], // Cột 3
      [[0, 0], [1, 1], [2, 2]], // Đường chéo chính
      [[0, 2], [1, 1], [2, 0]]  // Đường chéo phụ
    ];
  
    // Lặp qua mỗi mẫu chiến thắng
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      const [rowA, colA] = a;
      const [rowB, colB] = b;
      const [rowC, colC] = c;
  
      // Kiểm tra xem các ô có giống nhau và không rỗng không
      if (gameState[rowA][colA] !== '' &&
          gameState[rowA][colA] === gameState[rowB][colB] &&
          gameState[rowA][colA] === gameState[rowC][colC]) {
        return true; // Có chiến thắng
      }
    }
  
    return false; // Không có chiến thắng
  }// Hết hàm checkWin
  
  /**
   * Hàm kiểm tra hoà
   * @param {*} gameState 
   * @returns true: hoà
   */
  function checkDraw(gameState) {
    // Lặp qua tất cả các ô
    for (let row of gameState) {
      for (let cell of row) {
        // Nếu có ô nào rỗng, trò chơi chưa hoàn thành
        if (cell === '') {
          return false;
        }
      }
    }
    
    // Nếu không còn ô nào rỗng, trò chơi hoà
    return true;
  }//End hàm checkDraw

  /**
   * Hàm thực hiện cho máy tính được tự động đi nước tiếp theo
   * Bước tiếp theo là random
   * @param {*} gameState 
   * @returns gameState sau khi thay đổi
   */
  function computerPlay(gameState) {
    const availableCells = [];
    // Lặp qua mỗi ô trên bàn cờ và lưu trữ vị trí các ô trống
    for (let i = 0; i < gameState.length; i++) {
      for (let j = 0; j < gameState[i].length; j++) {
        if (gameState[i][j] === '') {
          availableCells.push({ row: i, col: j });
        }
      }
    }
  
    // Chọn một ô trống ngẫu nhiên
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const chosenCell = availableCells[randomIndex];
  
    // Điền 'O' vào ô đã chọn
    gameState[chosenCell.row][chosenCell.col] = 'O';
  
    return gameState;
  }