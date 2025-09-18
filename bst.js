class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    if (!array.length) return null;

    const dedupedSortedArray = [...new Set(array)].sort((a, b) => a - b);
    return this._buildTreeHelper(dedupedSortedArray);
  }

  _buildTreeHelper(array) {
    if (!array.length) return null;

    const midIndex = Math.floor(array.length / 2);
    const node = new Node(array[midIndex]);

    node.left = this._buildTreeHelper(array.slice(0, midIndex));
    node.right = this._buildTreeHelper(array.slice(midIndex + 1));

    return node;
  }

  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  

}