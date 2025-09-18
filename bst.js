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

  find(value) {
    return this._findHelper(this.root, value);
  }

  _findHelper(node, value) {
    if (node === null || node.data === value) return node;

    if (value < node.data) {
      return this._findHelper(node.left, value);
    } else {
      return this._findHelper(node.right, value);
    }
  }

  levelOrderForEach(callback) {
    if (!callback) throw new Error('Callback function is required');

    if (this.root === null) return;

    const queue = [this.root];

    while (queue.length > 0) {
      const currentNode = queue.shift();
      callback(currentNode);

      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }
  }

  inOrderForEach(callback) {
    if (!callback) throw new Error('Callback function is required');
    this._inOrderHelper(this.root, callback);
  }

  _inOrderHelper(node, callback) {
    if (node !== null) {
      this._inOrderHelper(node.left, callback);
      callback(node);
      this._inOrderHelper(node.right, callback);
    }
  }

  preOrderForEach(callback) {
    if (!callback) throw new Error('Callback function is required');
    this._preOrderHelper(this.root, callback);
  }

  _preOrderHelper(node, callback) {
    if (node !== null) {
      callback(node);
      this._preOrderHelper(node.left, callback);
      this._preOrderHelper(node.right, callback);
    }
  }

  postOrderForEach(callback) {
    if (!callback) throw new Error('Callback function is required');
    this._postOrderHelper(this.root, callback);
  }

  _postOrderHelper(node, callback) {
    if (node !== null) {
      this._postOrderHelper(node.left, callback);
      this._postOrderHelper(node.right, callback);
      callback(node);
    }
  }

  height(value) {
    const node = this.find(value);
    if (node === null) return -1;
    return this._heightHelper(node);
  }

  _heightHelper(node) {
    if (node === null) return -1;
    const leftHeight = this._heightHelper(node.left);
    const rightHeight = this._heightHelper(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }
}