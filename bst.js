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

  insert(value) {
    this.root = this._insertHelper(this.root, value);
  }

  _insertHelper(node, value) {
    if (node === null) return new Node(value);

    if (value < node.data) {
      node.left = this._insertHelper(node.left, value);
    } else {
      node.right = this._insertHelper(node.right, value);
    }
    return node;
  }

  deleteItem(value) {
    this.root = this._deleteHelper(this.root, value);
  }

  _deleteHelper(node, value) {
    if (node === null) return node;

    if (value < node.data) {
      node.left = this._deleteHelper(node.left, value);
    } else if (value > node.data) {
      node.right = this._deleteHelper(node.right, value);
    } else {
      if (node.left === null && node.right === null) {
        return null;
      }

      if (node.left === null) {
        return node.right;
      }

      if (node.right === null) {
        return node.left;
      }

      const successor = this._findMin(node.right);
      node.data = successor.data;
      node.right = this._deleteHelper(node.right, successor.data);
    }
    return node;
  }

  _findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

}