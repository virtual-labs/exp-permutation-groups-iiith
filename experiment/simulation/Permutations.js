class TilesPuzzle {
    constructor() {
        this.board = [];
        this.size = 4; // 4x4 grid
        this.emptyPos = { row: 0, col: 0 };
        this.moves = 0;
        this.timerInterval = null;
        this.startTime = null;
        this.solved = false;
        this.moveHistory = [];
        this.boardHistory = []; // For undo functionality
        this.presetPuzzles = {
            easy: [
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 15], // Empty near the end
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 0, 14, 15], // Easy swap at the end
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 13, 14, 15, 12], // Easy swap middle-bottom
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 10, 14, 15], // Small disruption in middle
                [1, 2, 3, 4, 0, 6, 7, 8, 5, 9, 11, 12, 13, 10, 14, 15], // Simple disruption with empty in top half
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0, 12, 13, 14, 15, 11]  // Just the last row shuffled
            ],
            medium: [
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0, 12, 13, 14, 11, 15], // Middle section disrupted
                [1, 2, 3, 4, 5, 6, 7, 8, 0, 10, 11, 12, 9, 13, 14, 15], // Empty in middle with disruption
                [1, 2, 3, 4, 5, 6, 0, 8, 9, 10, 7, 11, 13, 14, 15, 12], // Multiple disruptions
                [1, 2, 3, 0, 5, 6, 7, 4, 9, 10, 11, 8, 13, 14, 15, 12], // Multiple disruptions with empty in top
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0, 15, 13, 14, 11, 12], // Last row scrambled with empty in middle
                [1, 0, 3, 4, 5, 2, 7, 8, 9, 6, 11, 12, 13, 10, 14, 15]  // Multiple errors throughout
            ],
            hard: [
                [1, 6, 2, 4, 5, 0, 3, 8, 9, 10, 7, 11, 13, 14, 15, 12], // Complex pattern disruption
                [5, 1, 3, 4, 9, 2, 7, 8, 13, 6, 11, 12, 0, 10, 14, 15], // Significant disruption
                [0, 2, 3, 4, 1, 6, 7, 8, 5, 10, 11, 12, 9, 13, 14, 15], // Empty at start with multiple disruptions
                [5, 1, 3, 4, 9, 2, 7, 8, 0, 6, 10, 12, 13, 14, 11, 15], // Very scrambled pattern
                [0, 6, 2, 4, 5, 10, 3, 8, 9, 14, 7, 11, 13, 1, 15, 12], // Highly scrambled
                [5, 9, 2, 4, 1, 6, 3, 8, 0, 10, 7, 12, 13, 14, 11, 15]  // Maximum difficulty
            ]
        };
        
        // Solution state management
        this.solutionPath = [];
        this.solutionStep = 0;
        this.solutionMode = false;
        this.originalGameState = null;
        this.initialPuzzleState = null;
        
        // Initialize the board and UI
        this.initializeBoard();
        this.initializeUI();
    }
    
    initializeBoard() {
        // Create solved board (1-15, 0 for empty)
        this.board = [];
        for (let i = 0; i < this.size * this.size; i++) {
            if (i === this.size * this.size - 1) {
                this.board.push(0); // Empty tile
            } else {
                this.board.push(i + 1);
            }
        }
        
        // Set empty position at bottom right
        this.emptyPos = { 
            row: this.size - 1, 
            col: this.size - 1 
        };
    }
    
    initializeUI() {
        // Set up event listeners for main buttons
        document.getElementById('newGameBtn').addEventListener('click', () => this.newGame());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetGame());
        document.getElementById('undoBtn').addEventListener('click', () => this.undoMove());
        document.getElementById('hintBtn').addEventListener('click', () => this.showHint());
        document.getElementById('solveBtn').addEventListener('click', () => this.showSolution());

        // Set up solution control listeners
        document.getElementById('prevStepBtn').addEventListener('click', () => this.previousSolutionStep());
        document.getElementById('nextStepBtn').addEventListener('click', () => this.nextSolutionStep());
        document.getElementById('stopSolvingBtn').addEventListener('click', () => this.stopSolving());

        // Initialize board display
        this.renderBoard();

        // Set up info panel
        const infoButton = document.getElementById('infoButton');
        const infoPanel = document.getElementById('infoPanel');
        const infoPanelClose = document.getElementById('infoPanelClose');

        infoButton.addEventListener('click', () => {
            infoPanel.classList.toggle('active');
        });

        infoPanelClose.addEventListener('click', () => {
            infoPanel.classList.remove('active');
        });

        document.addEventListener('click', (event) => {
            if (!infoPanel.contains(event.target) &&
                !infoButton.contains(event.target) &&
                infoPanel.classList.contains('active')) {
                infoPanel.classList.remove('active');
            }
        });
    }

    
    calculateManhattanDistance() {
        let totalDistance = 0;
        
        for (let i = 0; i < this.size * this.size; i++) {
            const value = this.board[i];
            if (value === 0) continue; // Skip empty tile
            
            // Current position
            const currentRow = Math.floor(i / this.size);
            const currentCol = i % this.size;
            
            // Target position (value - 1 because tiles are numbered 1-15)
            const targetRow = Math.floor((value - 1) / this.size);
            const targetCol = (value - 1) % this.size;
            
            // Manhattan distance for this tile
            totalDistance += Math.abs(currentRow - targetRow) + Math.abs(currentCol - targetCol);
        }
        
        return totalDistance;
    }
    
    saveGameState() {
        this.boardHistory.push({
            board: [...this.board],
            emptyPos: { ...this.emptyPos },
            moves: this.moves,
            moveHistory: [...this.moveHistory]
        });
    }
    
    renderBoard() {
        const puzzleBoard = document.getElementById('puzzleBoard');
        puzzleBoard.innerHTML = '';
        
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                const index = row * this.size + col;
                const value = this.board[index];
                
                const tile = document.createElement('div');
                tile.className = value === 0 ? 'tile empty' : 'tile';
                tile.dataset.row = row;
                tile.dataset.col = col;
                
                if (value !== 0) {
                    tile.textContent = value;
                    
                    // Check if tile is in correct position
                    if (value === index + 1) {
                        tile.classList.add('correct');
                    }
                    
                    // Add click handler
                    tile.addEventListener('click', () => this.moveTile(row, col));
                }
                
                // Highlight movable tiles
                if (this.isAdjacent(row, col, this.emptyPos.row, this.emptyPos.col)) {
                    tile.classList.add('movable');
                }
                
                puzzleBoard.appendChild(tile);
            }
        }
        
        // Update UI stats
        document.getElementById('moveCount').textContent = this.moves;
        document.getElementById('parity').textContent = this.calculateParity() ? "Odd" : "Even";
        document.getElementById('manhattanDistance').textContent = this.calculateManhattanDistance();
        
        // Update additional statistics
        const inversions = this.countInversions();
        document.getElementById('totalInversions').textContent = inversions;
        document.getElementById('estimatedMoves').textContent = Math.max(inversions, this.calculateManhattanDistance());
        
        // Update undo button state
        document.getElementById('undoBtn').disabled = this.boardHistory.length === 0 || this.solutionMode;
    }
    
    moveTile(row, col, silent = false, fromSolution = false) {
        // Don't allow user moves during solution mode (but allow programmatic solution moves)
        if (this.solutionMode && !fromSolution) {
            return;
        }
        
        // Check if the clicked tile is adjacent to the empty space
        if (!this.isAdjacent(row, col, this.emptyPos.row, this.emptyPos.col)) {
            return;
        }
        
        // Save current state for undo functionality (before making the move)
        if (!silent && !this.solutionMode) {
            this.saveGameState();
        }
        
        // Start timer on first move
        if (this.moves === 0 && !this.timerInterval) {
            this.startTimer();
        }
        
        // Get the value of the clicked tile
        const clickedIndex = row * this.size + col;
        const clickedValue = this.board[clickedIndex];
        
        // Swap with empty tile
        const emptyIndex = this.emptyPos.row * this.size + this.emptyPos.col;
        this.board[emptyIndex] = clickedValue;
        this.board[clickedIndex] = 0;
        
        // Update empty position
        this.emptyPos = { row, col };
        
        if (!silent) {
            // Increment move counter
            this.moves++;
            
            // Calculate Manhattan distance improvement
            const manhattanDistance = this.calculateManhattanDistance();
            
            // Add move to history with additional information
            this.moveHistory.push({
                number: this.moves,
                value: clickedValue,
                time: new Date(),
                manhattanDistance: manhattanDistance,
                inversions: this.countInversions(),
                isSolutionMove: fromSolution
            });
            this.updateMoveLog();
        }
        
        // Re-render the board
        this.renderBoard();
        
        if (!silent && this.isSolved()) {
            this.onPuzzleSolved();
        }
    }
    
    isAdjacent(row1, col1, row2, col2) {
        // Check if two positions are adjacent (horizontally or vertically)
        const rowDiff = Math.abs(row1 - row2);
        const colDiff = Math.abs(col1 - col2);
        
        return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
    }
    
    isSolved() {
        for (let i = 0; i < this.size * this.size - 1; i++) {
            if (this.board[i] !== i + 1) {
                return false;
            }
        }
        return this.board[this.size * this.size - 1] === 0;
    }
    
    onPuzzleSolved() {
        this.solved = true;
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        
        // Show success message
        const hintElement = document.getElementById('hint');
        hintElement.classList.remove('hidden', 'bg-blue-50', 'text-blue-800');
        hintElement.classList.add('bg-green-50', 'text-green-800');
        hintElement.textContent = `Puzzle solved in ${this.moves} moves and ${document.getElementById('timer').textContent}!`;
        hintElement.classList.add('success-effect');
        
        // Add puzzle board success effect
        const puzzleBoard = document.getElementById('puzzleBoard');
        puzzleBoard.classList.add('success-effect');
        
        setTimeout(() => {
            puzzleBoard.classList.remove('success-effect');
        }, 2000);
    }
    
    newGame() {
        // Reset all game state
        this.resetGameState();
        
        // Get difficulty level
        const difficulty = document.getElementById('difficultySelect').value;
        
        // Choose a random preset puzzle based on difficulty
        const presets = this.presetPuzzles[difficulty];
        const randomPreset = presets[Math.floor(Math.random() * presets.length)];
        
        // Set board to the chosen preset
        this.board = [...randomPreset];
        
        // Find the empty position
        const emptyIndex = this.board.indexOf(0);
        this.emptyPos = {
            row: Math.floor(emptyIndex / this.size),
            col: emptyIndex % this.size
        };
        
        // Save the initial puzzle state for reset and solution purposes
        this.initialPuzzleState = {
            board: [...this.board],
            emptyPos: { ...this.emptyPos }
        };
        
        // Hide any hints or success messages
        const hintElement = document.getElementById('hint');
        hintElement.classList.add('hidden');
        
        // Update the move log
        this.updateMoveLog();
        
        // Render the new board
        this.renderBoard();
    }
    
    resetGame() {
        // Reset to the initial puzzle state if we have one
        if (this.initialPuzzleState) {
            this.board = [...this.initialPuzzleState.board];
            this.emptyPos = { ...this.initialPuzzleState.emptyPos };
            this.resetGameState();
            this.renderBoard();
            this.updateMoveLog();
        } else {
            // If no initial state, start a new game
            this.newGame();
        }
    }
    
    resetGameState() {
        this.moves = 0;
        this.moveHistory = [];
        this.boardHistory = [];
        this.solved = false;
        this.solutionMode = false;
        
        // Clear timer
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        document.getElementById('timer').textContent = '00:00';
        
        // Hide solution controls
        document.getElementById('solutionControls').classList.add('hidden');
        
        // Reset solution state
        this.solutionPath = [];
        this.solutionStep = 0;
        this.originalGameState = null;
        // Don't reset initialPuzzleState here as we need it for reset functionality
    }
    
    undoMove() {
        if (this.boardHistory.length === 0 || this.solutionMode) {
            return;
        }
        
        // Get the last saved state
        const lastState = this.boardHistory.pop();
        
        // Restore the state
        this.board = [...lastState.board];
        this.emptyPos = { ...lastState.emptyPos };
        this.moves = lastState.moves;
        this.moveHistory = [...lastState.moveHistory];
        
        // Re-render and update logs
        this.renderBoard();
        this.updateMoveLog();
    }
    
    shuffleBoard(moves = 100) {
        // Reset to solved state
        this.initializeBoard();
        
        // Make random legal moves
        for (let i = 0; i < moves; i++) {
            const possibleMoves = this.getPossibleMoves();
            const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            
            // Swap with empty tile
            const emptyIndex = this.emptyPos.row * this.size + this.emptyPos.col;
            const tileIndex = randomMove.row * this.size + randomMove.col;
            
            this.board[emptyIndex] = this.board[tileIndex];
            this.board[tileIndex] = 0;
            
            this.emptyPos = { row: randomMove.row, col: randomMove.col };
        }
        
        // Reset game state
        this.moves = 0;
        this.moveHistory = [];
        
        // If the puzzle is already solved after shuffling, try again
        if (this.isSolved()) {
            this.shuffleBoard(moves);
            return;
        }
        
        // Ensure the puzzle is solvable
        if (!this.isSolvable()) {
            // If not solvable, swap any two non-empty tiles to change parity
            this.makePositionSolvable();
        }
    }
    
    getPossibleMoves() {
        const { row, col } = this.emptyPos;
        const possibleMoves = [];
        
        // Check all adjacent positions
        if (row > 0) possibleMoves.push({ row: row - 1, col });
        if (row < this.size - 1) possibleMoves.push({ row: row + 1, col });
        if (col > 0) possibleMoves.push({ row, col: col - 1 });
        if (col < this.size - 1) possibleMoves.push({ row, col: col + 1 });
        
        return possibleMoves;
    }
    
    isSolvable() {
        // For 15-puzzle with blank at position (i,j) from top left:
        // Solvable if and only if:
        // (inversion count + i) is even when counting inversions for non-zero tiles

        // Calculate inversion count
        let inversions = this.countInversions();
        
        // Add row of empty tile (0-indexed)
        inversions += this.emptyPos.row + 1;
        
        // Puzzle is solvable if number of inversions is even
        return inversions % 2 === 0;
    }
    
    countInversions() {
        let inversions = 0;
        
        // Count inversions in the flattened board
        for (let i = 0; i < this.size * this.size; i++) {
            // Skip the empty tile
            if (this.board[i] === 0) continue;
            
            for (let j = i + 1; j < this.size * this.size; j++) {
                // Skip the empty tile
                if (this.board[j] === 0) continue;
                
                // Count inversion if a larger number comes before a smaller number
                if (this.board[i] > this.board[j]) {
                    inversions++;
                }
            }
        }
        
        return inversions;
    }
    
    calculateParity() {
        // Return true for odd parity, false for even parity
        return this.countInversions() % 2 === 1;
    }
    
    makePositionSolvable() {
        // Find two non-empty and non-correct tiles to swap
        let firstIndex = -1;
        let secondIndex = -1;
        
        for (let i = 0; i < this.size * this.size; i++) {
            if (this.board[i] !== 0 && this.board[i] !== i + 1) {
                if (firstIndex === -1) {
                    firstIndex = i;
                } else {
                    secondIndex = i;
                    break;
                }
            }
        }
        
        // If we found two tiles to swap, swap them
        if (firstIndex !== -1 && secondIndex !== -1) {
            const temp = this.board[firstIndex];
            this.board[firstIndex] = this.board[secondIndex];
            this.board[secondIndex] = temp;
        } else {
            // In the extreme case where all tiles except empty one are correct,
            // but the empty tile is in wrong position, swap the last two tiles
            const last = this.size * this.size - 1;
            const secondLast = last - 1;
            
            if (this.board[last] !== 0) {
                const temp = this.board[secondLast];
                this.board[secondLast] = this.board[last];
                this.board[last] = temp;
            }
        }
    }
    
    startTimer() {
        this.startTime = new Date();
        this.timerInterval = setInterval(() => {
            const now = new Date();
            const elapsed = Math.floor((now - this.startTime) / 1000);
            const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
            const seconds = (elapsed % 60).toString().padStart(2, '0');
            document.getElementById('timer').textContent = `${minutes}:${seconds}`;
        }, 1000);
    }
    
    updateMoveLog() {
        const logElement = document.getElementById('moveLog');
        
        if (this.moveHistory.length === 0) {
            logElement.innerHTML = '<p class="text-gray-600">No moves yet</p>';
            return;
        }
        
        // Show the most recent moves (up to 15)
        const recentMoves = this.moveHistory.slice(-15);
        
        logElement.innerHTML = recentMoves.map(move => {
            const time = move.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            const distance = move.manhattanDistance || 0;
            const inversions = move.inversions || 0;
            const isSolution = move.isSolutionMove || false;
            
            const moveItemClass = isSolution ? 'move-item solution-move' : 'move-item';
            const movePrefix = isSolution ? '🔍 ' : '';
            const moveLabel = isSolution ? 'Solution' : 'Manual';
            
            return `
                <div class="${moveItemClass}">
                    <div class="flex justify-between items-center">
                        <span class="move-number">${move.number}</span>
                        <span class="move-description">${movePrefix}Moved ${move.value}</span>
                        <span class="move-time">${time}</span>
                    </div>
                    <div class="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Distance: ${distance}</span>
                        <span>Inversions: ${inversions}</span>
                        <span class="move-type">${moveLabel}</span>
                    </div>
                </div>
            `;
        }).join('');
        
        // Scroll to bottom
        logElement.scrollTop = logElement.scrollHeight;
    }
    
    showHint() {
        // Find a good move to make (one that moves a tile closer to its correct position)
        const possibleMoves = this.getPossibleMoves();
        let bestMove = possibleMoves[0];
        let bestScore = -Infinity;
        
        for (const move of possibleMoves) {
            const tileIndex = move.row * this.size + move.col;
            const tileValue = this.board[tileIndex];
            
            // Correct position for this tile (0-indexed)
            const correctRow = Math.floor((tileValue - 1) / this.size);
            const correctCol = (tileValue - 1) % this.size;
            
            // Current position
            const currentRow = move.row;
            const currentCol = move.col;
            
            // Manhattan distance from current to correct position
            const currentDistance = Math.abs(currentRow - correctRow) + Math.abs(currentCol - correctCol);
            
            // Position after move (which would be the empty position)
            const newRow = this.emptyPos.row;
            const newCol = this.emptyPos.col;
            
            // Manhattan distance after move
            const newDistance = Math.abs(newRow - correctRow) + Math.abs(newCol - correctCol);
            
            // Score is improvement in distance (how much closer we get)
            const score = currentDistance - newDistance;
            
            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
        }
        
        // If no good move, just pick a random one
        if (bestScore <= 0) {
            bestMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        }
        
        // Highlight the suggested tile
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach(tile => {
            const row = parseInt(tile.dataset.row);
            const col = parseInt(tile.dataset.col);
            
            if (row === bestMove.row && col === bestMove.col) {
                tile.classList.add('hint');
                
                // Remove hint class after 3 seconds
                setTimeout(() => {
                    tile.classList.remove('hint');
                }, 3000);
            }
        });
        
        // Show hint text
        const tileIndex = bestMove.row * this.size + bestMove.col;
        const tileValue = this.board[tileIndex];
        
        const hintElement = document.getElementById('hint');
        hintElement.classList.remove('hidden', 'bg-green-50', 'text-green-800');
        hintElement.classList.add('bg-blue-50', 'text-blue-800');
        hintElement.textContent = `Hint: Move tile ${tileValue}`;
        
        setTimeout(() => {
            if (!this.solved) {
                hintElement.classList.add('hidden');
            }
        }, 3000);
    }
    
    showSolution() {
        if (this.solved) return;

        // Save the current game state (before any reset)
        this.originalGameState = {
            board: [...this.board],
            emptyPos: { ...this.emptyPos },
            moves: this.moves,
            moveHistory: [...this.moveHistory],
            boardHistory: [...this.boardHistory]
        };
        
        // Reset the board to the initial puzzle state
        this.resetToInitialPuzzleState();
        
        // Find solution path from the reset board state
        this.solutionPath = this.solvePuzzleBFS();
        if (!this.solutionPath || this.solutionPath.length === 0) {
            this.showHintMessage("No solution found (should not happen for valid puzzles).");
            return;
        }

        // Enter solution mode
        this.solutionMode = true;
        this.solutionStep = 0;
        
        // Show solution controls
        document.getElementById('solutionControls').classList.remove('hidden');
        this.updateSolutionProgress();
        
        // Start timer for solution tracking
        if (!this.timerInterval) {
            this.startTimer();
        }
    }
    
    nextSolutionStep() {
        if (!this.solutionMode || this.solutionStep >= this.solutionPath.length) {
            return;
        }

        // Move the tile for this step and log it
        const move = this.solutionPath[this.solutionStep];
        this.moveTile(move.row, move.col, false, true); // false = not silent, true = from solution
        this.solutionStep++;
        
        this.updateSolutionProgress();
        
        // Check if solved
        if (this.isSolved()) {
            this.onPuzzleSolved();
            this.solutionMode = false;
            document.getElementById('solutionControls').classList.add('hidden');
        }
    }
    
    previousSolutionStep() {
        if (!this.solutionMode || this.solutionStep <= 0) {
            return;
        }
        
        // Can't go back in solution mode with logged moves
        // Instead, we need to reset and replay up to the previous step
        this.solutionStep--;
        
        // Reset to initial state
        this.resetToInitialPuzzleState();
        
        // Replay moves up to current step
        for (let i = 0; i < this.solutionStep; i++) {
            const move = this.solutionPath[i];
            this.moveTile(move.row, move.col, false, true); // Log each move, from solution
        }
        
        this.updateSolutionProgress();
    }
    
    resetToInitialPuzzleState() {
        if (!this.initialPuzzleState) return;
        
        // Reset board to initial state
        this.board = [...this.initialPuzzleState.board];
        this.emptyPos = { ...this.initialPuzzleState.emptyPos };
        
        // Reset game state but keep solution mode
        this.moves = 0;
        this.moveHistory = [];
        this.boardHistory = [];
        
        // Clear timer but don't restart it
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        document.getElementById('timer').textContent = '00:00';
        
        this.renderBoard();
        this.updateMoveLog();
    }
    
    stopSolving() {
        if (!this.solutionMode) return;
        
        // Restore original game state
        if (this.originalGameState) {
            this.board = [...this.originalGameState.board];
            this.emptyPos = { ...this.originalGameState.emptyPos };
            this.moves = this.originalGameState.moves;
            this.moveHistory = [...this.originalGameState.moveHistory];
            this.boardHistory = [...this.originalGameState.boardHistory];
        }
        
        // Exit solution mode
        this.solutionMode = false;
        document.getElementById('solutionControls').classList.add('hidden');
        
        // Reset solution state
        this.solutionPath = [];
        this.solutionStep = 0;
        this.originalGameState = null;
        
        // Re-render and update logs
        this.renderBoard();
        this.updateMoveLog();
    }
    
    updateSolutionProgress() {
        const progressElement = document.getElementById('solutionProgress');
        progressElement.textContent = `Step ${this.solutionStep} of ${this.solutionPath.length}`;
        
        // Update button states
        document.getElementById('prevStepBtn').disabled = this.solutionStep <= 0;
        document.getElementById('nextStepBtn').disabled = this.solutionStep >= this.solutionPath.length;
    }

    solvePuzzleBFS() {
        // BFS to find the shortest solution path
        const start = this.board.slice();
        const queue = [];
        const visited = new Set();
        const parent = new Map();
        const moveFrom = new Map();

        const serialize = (board) => board.join(',');
        const emptyIndex = start.indexOf(0);
        queue.push({ board: start, empty: emptyIndex });
        visited.add(serialize(start));
        parent.set(serialize(start), null);

        const dirs = [
            { dr: -1, dc: 0 }, // up
            { dr: 1, dc: 0 },  // down
            { dr: 0, dc: -1 }, // left
            { dr: 0, dc: 1 }   // right
        ];

        const size = this.size;
        const goal = [];
        for (let i = 1; i < size * size; i++) goal.push(i);
        goal.push(0);
        const goalStr = serialize(goal);

        while (queue.length > 0) {
            const { board, empty } = queue.shift();
            if (serialize(board) === goalStr) {
                // Reconstruct path
                let path = [];
                let cur = goalStr;
                while (parent.get(cur)) {
                    path.push(moveFrom.get(cur));
                    cur = parent.get(cur);
                }
                path.reverse();
                return path;
            }
            const row = Math.floor(empty / size);
            const col = empty % size;
            for (const { dr, dc } of dirs) {
                const nr = row + dr, nc = col + dc;
                if (nr < 0 || nr >= size || nc < 0 || nc >= size) continue;
                const nidx = nr * size + nc;
                const newBoard = board.slice();
                // Swap empty and neighbor
                [newBoard[empty], newBoard[nidx]] = [newBoard[nidx], newBoard[empty]];
                const key = serialize(newBoard);
                if (!visited.has(key)) {
                    visited.add(key);
                    parent.set(key, serialize(board));
                    moveFrom.set(key, { row: nr, col: nc });
                    queue.push({ board: newBoard, empty: nidx });
                }
            }
        }
        return null; // No solution
    }

    showHintMessage(msg) {
        const hintElement = document.getElementById('hint');
        hintElement.classList.remove('hidden', 'bg-green-50', 'text-green-800');
        hintElement.classList.add('bg-blue-50', 'text-blue-800');
        hintElement.textContent = msg;
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const game = new TilesPuzzle();
    game.newGame(); // Start a new game immediately
});