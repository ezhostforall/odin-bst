const { Tree } = require('./bst');

function generateRandomArray(size = 15) {
  const arr = new Set();
  while (arr.size < size) {
    arr.add(Math.floor(Math.random() * 100));
  }
  return Array.from(arr);
}

console.log("=== Binary Search Tree Driver Script ===\n");

const randomArray = generateRandomArray();
console.log("Generated Array:", randomArray);

const tree = new Tree(randomArray);
console.log("\nConstructed Balanced BST:");
tree.prettyPrint();

