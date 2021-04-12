class Matrix {
	constructor(array) {
		this.matrix = array;
	}

	det(matrix = this.matrix) {
		let size = this.size(matrix);
		let Determinant = 0;
		if (size[0] == size[1]) {
			if (size[0] === 2) {
				let Deter =
					matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

				return Deter;
			} else {
				for (let i = 0; i < matrix[0].length; i++) {
					let current = matrix[0][i];
					let minorA = this.minorArray(matrix, 0, i);
					let sign = Math.pow(-1, i);
					let newDet = this.det(minorA);
					let Deter = sign * newDet * current;
					Determinant += Deter;
				}
				return Determinant;
			}
		}
	}

	inverse(matrix = this.matrix) {
		let inverted = [];
		let adjoint = this.adjoint(matrix);
		let D = this.det(matrix);
		for (let i = 0; i < adjoint.length; i++) {
			inverted.push([]);
			for (let j = 0; j < adjoint[0].length; j++) {
				inverted[i].push(adjoint[i][j] / D);
			}
		}

		return inverted;
	}

	minorArray(matrix = this.matrix, row, col) {
		let minorArray = [];
		if (this.size()[0] > 2 && this.size()[1] > 2) {
			for (let i = 0; i < matrix.length; i++) {
				if (minorArray[i] === undefined && i !== row) {
					minorArray.push([]);
				}
				for (let j = 0; j < matrix[i].length; j++) {
					if (i !== row && j !== col) {
						minorArray[minorArray.length - 1].push(matrix[i][j]);
					}
				}
			}
			return minorArray;
		}
	}

	minor(row, col, matrix = this.matrix) {
		let MinorArray = this.minorArray(matrix, row, col);
		let minor = this.det(MinorArray);
		return minor;
	}

	cofactor(row, col, matrix = this.matrix) {
		let minor = this.minor(row, col);
		let sign = Math.pow(-1, row + col);

		return minor * sign;
	}

	size(matrix = this.matrix) {
		for (let i = 0; i < matrix.length; i++) {}
		let row = matrix.length,
			col = matrix[0].length;

		return [row, col];
	}

	transponse(replaceOriginal = false, matrix = this.matrix) {
		let transponsed = [];
		for (let i = 0; i < matrix[0].length; i++) {
			transponsed.push([]);
			for (let j = 0; j < matrix.length; j++) {
				transponsed[i].push(matrix[j][i]);
			}
		}

		if (replaceOriginal) {
			this.matrix = transponsed;
		}

		return transponsed;
	}

	adjoint(matrix = this.matrix) {
		let size = this.size(matrix);
		let adjoint = [];

		for (let i = 0; i < size[0]; i++) {
			adjoint.push([]);
			for (let j = 0; j < size[1]; j++) {
				let A = this.cofactor(i, j, matrix);
				adjoint[i].push(A);
			}
		}

		return this.transponse(false, adjoint);
	}
}

function add(matrix1, matrix2) {
	let matrix = [];
	if (matrix1.size() === matrix2.size()) {
      console.log(matrix1.size());
      console.log(matrix2.size());
		for (let i = 0; i < matrix2.size()[0]; i++) {
			matrix.push([]);
			for (let j = 0; j < matrix2.size()[1]; i++) {
				matrix[i].push(matrix1[i][j] + matrix2[i][j]);
			}
		}
		return matrix;
	}
}

let a = add(
	new Matrix([
		[1, 2, 3],
		[4, 5, 6],
	]),
	new Matrix([
		[4, 5, 6],
		[7, 8, 9],
	])
);

console.log(a);
