### Theory

## permutation groups

# Product of permutations

For two permutations f and g of the set X (where [X]=n), (f.g) would be (g(f(1)) g(f(2)) g(f(3)).............g(f(n))).
Lets take an example of X={1,2,3,4}, f=1432 and g=4213. In theis case (f.g) will be (g(f(1)) g(f(2)) g(f(3)) g(f(4))) which is (g(1)    g(4) g(3) g(2)) when f(i) is substituted. Then (f.g) can finally be written as 4312 after g(i) is substituted.

# Cycles in permutations

Let there be a permutation f=426531. In f, f(2) is called a fixed point for the virtue of being f(i)=i. Take any element that isn't a fixed point, i=1 for example has f(1)=4, f(f(1))=5, f^3(1)=3, f^4(1)=6 and f^5(1)=1. Here 45361 is a 5 length cycle in f. For f^k(i)=i, f^1(i) f^2(i) ............. f^k(i) form a cycle of length k. 
All permutations can be represented as a union of cycles, the example of f=426531 has two cycles as c1=2 and c2=45361.

# 15 puzzle

15 puzzle is a puzzle game that has 16 spaces in the form of a 4x4 grid for 15 numbered tiles which can be moved around using the one remaining empty space in the puzzle grid. without getting into the specifics of solving the puzzle, we will go into the theory behind it. Though every instance of a 15 puzzle is a permuatation of the first 15 natural numbers, not all permutations of the first 15 natural numbers produce a solvable instance of the puzzle.
A solvable instance of the puzzle starts with a space at the bottom right corner of the grid, and an even parity of the permuatation instance. the parity of the permuatation can calculated by by taking the sum of length of all its cycles after they have each been reduced by one. if the resulting sum is even, the parity of the permutation is even and the generated instance of the 15 puzzle using it, is solvable.