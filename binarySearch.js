/* eslint-disable eqeqeq */
class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }
  insert(key, value) {
    if (this.key == null) {
      this.key = key;
      this.value = value;
    }

    /* If the tree already exists, then start at the root, 
           and compare it to the key you want to insert.
           If the new key is less than the node's key 
           then the new node needs to live in the left-hand branch */
    else if (key < this.key) {
      /* If the existing node does not have a left child, 
               meaning that if the `left` pointer is empty, 
               then we can just instantiate and insert the new node 
               as the left child of that node, passing `this` as the parent */
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      }
      /* If the node has an existing left child, 
               then we recursively call the `insert` method 
               so the node is added further down the tree */
      else {
        this.left.insert(key, value);
      }
    }
    // Similarly, if the new key is greater than the node's key 
    //then you do the same thing, but on the right-hand side 
    else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      }
      else {
        this.right.insert(key, value);
      }
    }
  }
  find(key) {
    // If the item is found at the root then return that value
    if (this.key == key) {
      return this.value;
    }
    /* If the item you are looking for is less than the root 
           then follow the left child.
           If there is an existing left child, 
           then recursively check its left and/or right child
           until you find the item */
    else if (key < this.key && this.left) {
      return this.left.find(key);
    }
    /* If the item you are looking for is greater than the root 
           then follow the right child.
           If there is an existing right child, 
           then recursively check its left and/or right child
           until you find the item */
    else if (key > this.key && this.right) {
      return this.right.find(key);
    }
    // You have searched the tree and the item is not in the tree
    else {
      throw new Error('Key Error');
    }
  }
  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      /* If the node only has a left child, 
               then you replace the node with its left child */
      else if (this.left) {
        this._replaceWith(this.left);
      }
      /* And similarly if the node only has a right child 
               then you replace it with its right child */
      else if (this.right) {
        this._replaceWith(this.right);
      }
      /* If the node has no children then
               simply remove it and any references to it 
               by calling "this._replaceWith(null)" */
      else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key Error');
    }
  }
  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      }
      else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

  _findMax() {
    if(!this.right) {
      return this;
    }
    return this.right._findMax();
  }
}


//Exercise 4 tree function:
//Best guess, adds up all the values in the tree
//guess output with BST tree, 37
function tree(t){
  if(!t){
    return 0;
  }
  return tree(t.left) + t.value + tree(t.right);
}

//Exercise 5: Height of Tree
//input is entire tree
//output is num indicating layers
//easyquestion would be 6 layers

//find the longest branch and count it
//Math.max

function height2(bst) {
  return Math.max(bst.left && height2(bst.left), bst.right && height2(bst.right)) + 1; //+1 for parent
}

function height1(bst) {
  //both left and right must be there
  if(bst.left && bst.right) { 
    return Math.max(height1(bst.left), height1(bst.right)) + 1; //+1 for parent
  }
  if(bst.left) {
    return height1(bst.left) + 1; //+1 for parent
  }
  if(bst.right) {
    return height1(bst.right) + 1; //+1 for parent
  }
  //if none are true, just 1 level deep. Counts root level. 
  return 1; 
}



//Exercise 6: is it a BST, assuming the tree does not contain dupes?

//output is true or false

//left should be lower
//right should be higher

function isBST(tree, min, max) {
  
  if(min !== undefined && tree.key < min) {
    return false;
  } 
  if(max !== undefined && tree.key > max) {
    return false;
  }

  if(tree.left && !isBST(tree.left, min, tree.key)) {
    return false;
  }
  if(tree.right && !isBST(tree.right, tree.key, max)) {
    return false;
  }

  return true;
}

//take in a full tree
//return 3rd largest key => somewhere close to result of _findMax()
//{nth: 3, result: null}
function nthLargest(tree, state) { //state obj with two properties
    if(tree.right) {
        nthLargest(tree.right, state)
        if(state.result) {
            return;
        }
    }
    if(!--state.nth) {
        state.result = tree.key
        return; 
    }
    if(tree.left) {
        nthLargest(tree.left, state)
    }
}

function findThirdLargest(tree) {
    if(!tree.key){
        return null
    }
    let state = {nth: 3, result: null}
    nthLargest(tree, state)
    return state.result
}

//our attempt
// function isBalanced(tree) {
//     if(tree.key == null) {
//         return true;
//     }
//     const max = tree._findMax();
//     const min = tree._findMin();
//     if(max - min < 1) {
//         return true;
//     }
//     else {
//         return false;
//     }
// }

//solution
function isBalanced (tree) {
    if (!tree.left) {
        return !(tree.right && (tree.right.left || tree.right.right));
    }
    if (!tree.right) {
        return !(tree.left && (tree.left.left || tree.left.right));
    }
    return isBalanced(tree.left) && isBalanced(tree.right);
}

const arr1 = [3, 5, 4, 6, 1, 0, 2]
const arr2 = [3, 1, 5, 2, 4, 6, 0]

//if arrays arent the same length => false
//doesn't start with the same number => false
//if they don't have the same set of numbers => false




function main () {
  let BST = new BinarySearchTree();
  let BST2 = new BinarySearchTree();
  let BST3 = new BinarySearchTree();

  BST.insert(3, 3);
  BST.insert(1, 1);
  BST.insert(4, 4);
  BST.insert(6, 6);
  BST.insert(9, 9);
  BST.insert(2, 2);
  BST.insert(5, 5);
  BST.insert(7, 7);

  BST2.insert('e'); //a e e i n o q s t u y
  BST2.insert('a');
  BST2.insert('s');
  BST2.insert('y');
  BST2.insert('q');
  BST2.insert('u');
  BST2.insert('e');
  BST2.insert('s');
  BST2.insert('t');
  BST2.insert('i');
  BST2.insert('o');
  BST2.insert('n');

    BST3.insert(2);
    BST3.insert(3);
    BST3.insert(1);
//   BST3.insert(4);
//   BST3.insert(5);

  //tree(BST)

  //  return console.log(tree(BST));
  return console.log(isBalanced(BST3));
}
main();

