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

console.log("\nIs tree balanced?", tree.isBalanced());

console.log("\n=== Traversal Methods ===");

console.log("\nLevel order:");
const levelOrder = [];
tree.levelOrderForEach(node => levelOrder.push(node.data));
console.log(levelOrder.join(', '));

console.log("\nPre order:");
const preOrder = [];
tree.preOrderForEach(node => preOrder.push(node.data));
console.log(preOrder.join(', '));

console.log("\nPost order:");
const postOrder = [];
tree.postOrderForEach(node => postOrder.push(node.data));
console.log(postOrder.join(', '));

console.log("\nIn order:");
const inOrder = [];
tree.inOrderForEach(node => inOrder.push(node.data));
console.log(inOrder.join(', '));