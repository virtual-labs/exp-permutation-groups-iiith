### Theory

## permutation groups

## permutations 

The permuatation of any set $S$ is a function $f:A\rightarrow A$ which is both one-to-one and onto. A permutation can be seen as an arrangement of the elements of a set in a specific order. An example of a permutation of some set $S=\{1,2,3,4\}$ and its permutation $(1,3,2,4)$.

## Product of permutations

For two permutations $f$ and $g$ of the set $X$ (where $[X]=n$), the product $(f\circ g)$ would be $(g(f(1)),g(f(2)),g(f(3)),\dots,g(f(n)))$.
Lets take an example of $X={1,2,3,4}$, $f=(1,4,3,2)$ and $g=(4,2,1,3)$. In this case $(f\circ g)$ will be $(g(f(1)),g(f(2)),g(f(3)),g(f(4)))$ which is $(g(1),g(4),g(3),g(2))$ when $f(i)$ is substituted. Then $(f\circ g)$ can finally be written as $(4,3,1,2)$ after $g(i)$ is substituted.

# Identity Permutation

Identity permutation denoted by $\epsilon$ is a permutation which when multiplied to any other permutation, returns the original permutation itself. So, for any permutation $a$, $a\epsilon=a$.

# Order of a permutation

Order of any permutation $a$ would $a^n=\epsilon$ where $a^n$ is the product of the permuation $a$, $n$ times.

## Cycles in permutations

Let there be a permutation $f=(4,2,6,5,3,1)$. In $f$, $f(2)$ is called a fixed point or 1-cycle for the virtue of being $f(i)=i$. Take any element that isn't a fixed point, $i=1$ for example has $f(1)=4,f(f(1))=5,f^3(1)=3,f^4(1)=6$ and $f^5(1)=1$. Here $(4,5,3,6,1)$ is a $5$ length cycle in $f$. For any $f^k(i)=i$, $(f^1(i),f^2(i),\dots,f^k(i))$ form a cycle of length $k$. 
All permutations can be represented as a union of cycles, the example of $f=(4,2,6,5,3,1)$ has two cycles as $c_1=(2)$ and $c_2=(4,5,3,6,1)$.

# 2-cycles

Any cycle with length greater than two can be decomposed into 2-cycles which are cycles of length two. Let's see example of cycle $c=(4,5,3,6,2,1)$ can be written as $(1,6)(2,5)(3,3)(4,1)(5,2)(6,4)$ by using 2-cycles.

# Parity of a permutation

Any permutation can have even or odd parity depending on the number of two cyles it is composed of. in our previous example where $c=(4,5,3,6,2,1)$ was written as $(1,6)(2,5)(3,3)(4,1)(5,2)(6,4)$, we find that it has $6$ 2-cycles which is even. Thus the parity of this permutation is even.

## 15 puzzle

15 puzzle is a puzzle game that has 16 spaces in the form of a 4x4 grid for 15 numbered tiles which can be moved around using the one remaining empty space in the puzzle grid. without getting into the specifics of solving the puzzle, we will go into the theory behind it. Though every instance of a 15 puzzle is a permuatation of the first 15 natural numbers, not all permutations of the first 15 natural numbers produce a solvable instance of the puzzle.

# Solvability

A solvable instance of the puzzle is a permutation if we can bring the empty space to the bottom right of the grid and get an even parity permutation. The instances where the permutation is odd while the empty space is at the bottom can not be solved.

# Example

Let's take an example of 15-puzzle and solve it. We proceed going from top left to right and moving to the next row under the current one after clearing a row. our starting permutation is (14,6,4,7,10,2,9,11,15,13,3,5,1,12,8). We use the sequence of moves
\graphicspath{ {./images/}}
\includegraphics{clean.png}
 $(16,15)\rightarrow(15,14)\rightarrow(14,10)\rightarrow(10,9)\rightarrow(9,13)\rightarrow(13,14)\rightarrow(14,10)\rightarrow(10,6)\rightarrow(6,5)\rightarrow(5,9)\rightarrow(9,10)\rightarrow(10,6)\rightarrow(6,2)\rightarrow(2,1)\rightarrow(1,5)\rightarrow$.
 \includegraphics{1.png}
Now that we have fixed 1, we move on to fixing 2 using the sequence of moves $(5,6)\rightarrow(6,7)\rightarrow(7,11)\rightarrow(11,15)\rightarrow(15,14)\rightarrow(14,10)\rightarrow(10,11)\rightarrow(11,7)\rightarrow(7,6)\rightarrow(6,10)\rightarrow(10,11)\rightarrow(11,7)\rightarrow(7,3)\rightarrow(3,2)\rightarrow(2,5)$.
\includegraphics{2.png}
Now that we have fixed 2, we move on to fixing 3,4 using the sequence of moves
$(6,7)\rightarrow(7,8)\rightarrow(8,12)\rightarrow(12,16)\rightarrow(16,15)\rightarrow(15,11)\rightarrow(11,7)\rightarrow(7,8)\rightarrow(8,12)\rightarrow(12,11)\rightarrow(11,7)\rightarrow(7,3)\rightarrow(3,4)\rightarrow(4,8)$.
\includegraphics{3,4.png}
Now that we have fixed 3,4, we move on to fixing 5,6 using the sequence of moves
$(8,7)\rightarrow(7,11)\rightarrow(11,15)\rightarrow(15,14)\rightarrow(14,10)\rightarrow(10,11)\rightarrow(11,7)\rightarrow(7,6)\rightarrow(6,10)\rightarrow(10,9)\rightarrow(9,5)\rightarrow(5,6)\rightarrow(6,10)\rightarrow(10,14)\rightarrow(14,15)\rightarrow(15,11)\rightarrow(11,7)\rightarrow(7,6)\rightarrow(6,10)$.
\includegraphics{5,6.png}
Now that we have fixed 5,6, we move on to fixing 7,8 using the sequence of moves
$(10,11)\rightarrow(11,12)\rightarrow(12,8)\rightarrow(8,7)\rightarrow(7,11)\rightarrow(11,10)\rightarrow(10,14)\rightarrow(14,15)\rightarrow(15,16)\rightarrow(16,12)\rightarrow(12,8)\rightarrow(8,7)\rightarrow(7,11)$.
\includegraphics{7,8.png}
Now that we have fixed 7,8, we move on to fixing 9,13 using the sequence of moves
$(11,12)\rightarrow(12,16)\rightarrow(16,15)\rightarrow(15,14)\rightarrow(14,10)\rightarrow(10,11)\rightarrow(11,12)\rightarrow(12,16)\rightarrow(16,15)\rightarrow(15,14)\rightarrow(14,10)\rightarrow(10,11)\rightarrow(11,15)\rightarrow(15,14)\rightarrow(14,13)\rightarrow(13,9)\rightarrow(9,10)$.
\includegraphics{9,13.png}
Now that we have fixed 9,13, we move on to fixing 10,14 using the sequence of moves
$(10,11)\rightarrow(11,12)\rightarrow(12,16)\rightarrow(16,15)\rightarrow(15,14)\rightarrow(14,10)\rightarrow(10,11)\rightarrow(11,12)\rightarrow(12,16)\rightarrow(16,15)\rightarrow(15,14)\rightarrow(14,10)\rightarrow(10,11)\rightarrow(11,15)\rightarrow(15,14)\rightarrow(14,10)\rightarrow(10,11)$.
\includegraphics{10,14.png}
Now that we have fixed 10,14, we move on to fixing 11 using the move.
$(11,15)$.
\includegraphics{11.png}
Then we end by fixing 15 using the move
$(15,16)$.
\includegraphics{done.png}