## Overview
The 15-puzzle is an interactive sliding puzzle that demonstrates key concepts in permutation groups. Your objective is to arrange numbered tiles (1-15) in ascending order within a 4×4 grid, leaving the bottom-right position empty.

## Getting Started

### 1. Initialize Your Puzzle
- **Generate New Puzzle**: Click the **"New Game"** button to create a randomly shuffled, solvable 15-puzzle instance
- **Choose Difficulty**: Use the dropdown menu to select your preferred difficulty level:
  - **Easy**: Minimal tile displacement, ideal for beginners
  - **Medium**: Moderate complexity with multiple disruptions
  - **Hard**: Maximum scrambling for experienced users

**Fun Fact**: Not all random arrangements of the 15-puzzle are solvable! The simulation automatically generates only solvable configurations based on permutation parity theory.

### 2. Understanding the Interface

#### Game Board
- The puzzle consists of a 4×4 grid with numbered tiles 1-15 and one empty space
- Tiles adjacent to the empty space can be moved by clicking on them
- The empty space acts as your "working area" for tile manipulation

#### Status Information Panel
The interface displays several mathematical metrics in real-time:
- **Move Count**: Total number of tile movements made
- **Timer**: Elapsed time since starting the current puzzle
- **Parity**: Mathematical property indicating whether the current permutation is even or odd
- **Manhattan Distance**: Sum of distances each tile is from its correct position
- **Total Inversions**: Number of tile pairs that are out of order
- **Estimated Moves**: Heuristic calculation of minimum moves needed

### 3. Solving the Puzzle

#### Basic Movement Rules
1. **Click to Move**: Click any tile adjacent to the empty space to slide it into the empty position
2. **Valid Moves**: Only tiles directly above, below, left, or right of the empty space can be moved
3. **Strategic Planning**: Each move creates a 2-cycle permutation, swapping the empty space with the selected tile

#### Recommended Solving Strategy
Follow this systematic approach for optimal results:

**Phase 1: Establish the First Row**
- Position tiles 1 and 2 in their correct locations (top-left corner)
- Use the empty space strategically to maneuver tiles without disrupting already placed pieces

**Phase 2: Complete the Second Row**
- Fix tiles 3 and 4 in the second row
- Maintain the integrity of the first row while working

**Phase 3: Column-by-Column Completion**
- Work systematically through remaining positions
- Use advanced techniques for the final 2×2 section

### 4. Assistance Features

#### Hint System
- **Get Hint**: Click the **"Get Hint"** button to receive strategic advice
- Hints provide directional guidance without revealing complete solutions
- Use hints sparingly to maintain the learning experience

#### Solution Demonstration
- **Show Solution**: Click **"Show Solution"** to view an automated solving sequence
- **Step Navigation**: Use **"Previous Step"** and **"Next Step"** buttons to analyze individual moves
- **Solution Controls**: Monitor progress with the step counter and stop the demonstration at any time

#### Move Management
- **Undo**: Reverse your last move if you make a mistake
- **Reset**: Return to the initial puzzle state to start over
- **Move History**: Review your complete sequence of moves in the right panel

### 5. Educational Components

#### Understanding Permutation Theory
As you solve the puzzle, observe how:
- Each move represents a permutation operation on the tile arrangement
- The parity of the permutation remains constant throughout legal moves
- Manhattan distance provides insight into the puzzle's "distance" from completion

#### Mathematical Insights
- **Cycle Notation**: Each move can be expressed as a 2-cycle: $(a,b)$ indicating tile at position $b$ moves to position $a$
- **Group Theory**: The set of all possible puzzle states forms a permutation group under the operation of legal moves
- **Solvability**: A puzzle configuration is solvable if and only if it has even parity


**Fun Fact**: The 15-puzzle has approximately 10.4 trillion possible configurations, but only half of them are solvable due to parity constraints!