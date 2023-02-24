# MatrixJs

MatrixJs is a small Javascript Library use to compute matrix

# Usage

MatrixJs can do basic computing of matrix. such as - Finding Determinant, Transponse, Minor, Adjoint and more - Inversing

## Tutorials

1. First We Import `Matrix` from MatrixJs

```js
import Matrix from "NMatrixJS";
```

2. To Create a Matrix we initate a Matrix class with 2 Dimenstional Array

```js
let MyMatrix = new Matrix([
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
]);
```

3. To access the matrix use

```js
console.log(MyMatrix.matrix);
```

### Size of Matrix

returns an array of [row, column]

```js
let size = MyMatrix.size();
let [row, column] = MyMatrix.size();

console.log(size); // [3, 3]
```

### Determinant

```js
let determinant = MyMatrix.det();
```

or without creating a variable for the matrix

```js
let determinant = new Matrix([
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
]).det();
```

### Inverse

```js
let inverse = MyMatrix.inverse();
```

or you can just change the matrix by passing `true` as a parameter

```js
MyMatrix.inverse(true);
```

### Transponse

```js
let transposed = MyArray.transponse();
```

or to change the Matrix itself pass `true` parameter

```js
MyMatrix.transponse(true);
console.log(MyMatrix.matrix);

/*
[
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9]
]
*/
```

### Cofactor, Minor

Cofactor and Minor take two arguments `row` and `column`

```js
let cofactor = MyMatrix.cofactor(0, 1); // 6
let minor = MyMatrix.minor(0, 0); // -6
```
