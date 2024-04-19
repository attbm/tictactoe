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
      return addOTurnForMaxOCount(gameState);
  } //end computerPlay

  /**
   * Hàm cho O đi thêm một nước sao cho số lượng trên hàng dọc là lớn nhất
   * @param {*} gameState 
   * @returns 
   */
  function addOTurnForMaxHorizontalO(gameState) {
    let maxRow = -1;
    let maxOCount = -1;
  
    // Tính số lượng O trên mỗi hàng ngang và chỉ tính nếu không có X
    for (let i = 0; i < gameState.length; i++) {
      let oCount = 0;
      for (let j = 0; j < gameState[i].length; j++) {
        if (gameState[i][j] === 'O') {
          oCount++;
        } else if (gameState[i][j] === 'X') {
          oCount = -1; // Nếu có X, không tính hàng này
          break;
        }
      }
      if (oCount > maxOCount) {
        maxOCount = oCount;
        maxRow = i;
      }
    }
  
    // Thêm O vào hàng ngang có số O lớn nhất và không có X
    if (maxRow !== -1) {
      for (let j = 0; j < gameState[maxRow].length; j++) {
        if (gameState[maxRow][j] === '') {
          gameState[maxRow][j] = 'O';
          break;
        }
      }
    }
  
    return gameState;
  }

  function addOTurnForMaxVerticalO(gameState) {
    let maxCol = -1;
    let maxOCount = -1;
  
    // Tạo mảng để lưu trữ số lượng O trên mỗi cột và kiểm tra không có X
    const oCounts = Array.from({ length: gameState[0].length }, () => 0);
    for (let j = 0; j < gameState[0].length; j++) {
      for (let i = 0; i < gameState.length; i++) {
        if (gameState[i][j] === 'O') {
          oCounts[j]++;
        } else if (gameState[i][j] === 'X') {
          oCounts[j] = -1; // Nếu có X, không tính cột này
          break;
        }
      }
    }
  
    // Tìm cột có số O lớn nhất và không có X
    for (let j = 0; j < oCounts.length; j++) {
      if (oCounts[j] > maxOCount) {
        maxOCount = oCounts[j];
        maxCol = j;
      }
    }
  
    // Thêm O vào cột có số O lớn nhất và không có X
    if (maxCol !== -1) {
      for (let i = 0; i < gameState.length; i++) {
        if (gameState[i][maxCol] === '') {
          gameState[i][maxCol] = 'O';
          break;
        }
      }
    }
  
    return gameState;
  }

  function addOTurnForMaxOCount(gameState) {
    // Sao chép mảng trạng thái để tránh thay đổi mảng ban đầu
    const horizontalGameState = copyGameState(gameState);
    const verticalGameState = copyGameState(gameState);
  
    // Thêm O vào hàng ngang và hàng dọc
    const horizontalResult = addOTurnForMaxHorizontalO(horizontalGameState);
    const verticalResult = addOTurnForMaxVerticalO(verticalGameState);
  
    // Đếm số O trên bàn cờ sau khi thêm vào hàng ngang và hàng dọc
    let horizontalOCount = countO(horizontalResult);
    let verticalOCount = countO(verticalResult);
  
    // Chọn kết quả tốt nhất và trả về
    if (horizontalOCount > verticalOCount) {
      return horizontalResult;
    } else {
      return verticalResult;
    }
  }
  
  // Hàm để sao chép mảng trạng thái
  function copyGameState(gameState) {
    return gameState.map(row => [...row]);
  }
  
  // Hàm đếm số lượng 'O' trên bàn cờ
  function countO(gameState) {
    let oCount = 0;
    for (let i = 0; i < gameState.length; i++) {
      for (let j = 0; j < gameState[i].length; j++) {
        if (gameState[i][j] === 'O') {
          oCount++;
        }
      }
    }
    return oCount;
  }
  