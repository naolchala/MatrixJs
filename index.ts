type MatrixSize = [row: number, column: number];

class Matrix {
	matrix: number[][];
	constructor(array: number[][]) {
		this.matrix = array;
	}

	det(matrix: number[][] = this.matrix): number {
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
		} else {
			return 0;
		}
	}

	inverse(replaceOriginal = false, matrix = this.matrix) {
		let inverted: number[][] = [];
		let adjoint = this.adjoint(matrix);
		let D = this.det(matrix);
		for (let i = 0; i < adjoint.length; i++) {
			inverted.push([]);
			for (let j = 0; j < adjoint[0].length; j++) {
				inverted[i].push(adjoint[i][j] / D);
			}
		}

		if (replaceOriginal) {
			this.matrix = inverted;
		}

		return inverted;
	}

	minorArray(matrix = this.matrix, row: number, col: number) {
		let minorArray: number[][] = [];
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

	minor(row: number, col: number, matrix = this.matrix) {
		let MinorArray = this.minorArray(matrix, row, col);
		let minor = this.det(MinorArray);
		return minor;
	}

	cofactor(row: number, col: number, matrix = this.matrix) {
		let minor = this.minor(row, col, matrix);
		let sign = Math.pow(-1, row + col);

		return minor * sign;
	}

	size(matrix = this.matrix): MatrixSize {
		let row = matrix.length,
			col = matrix[0].length;

		return [row, col];
	}

	transponse(replaceOriginal = false, matrix = this.matrix) {
		let transponsed: number[][] = [];
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
		let adjoint: number[][] = [];

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

export default Matrix;
