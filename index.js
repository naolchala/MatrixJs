"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Matrix = /** @class */ (function () {
	function Matrix(array) {
		this.matrix = array;
	}
	Matrix.prototype.det = function (matrix) {
		if (matrix === void 0) {
			matrix = this.matrix;
		}
		var size = this.size(matrix);
		var Determinant = 0;
		if (size[0] == size[1]) {
			if (size[0] === 2) {
				var Deter =
					matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
				return Deter;
			} else {
				for (var i = 0; i < matrix[0].length; i++) {
					var current = matrix[0][i];
					var minorA = this.minorArray(matrix, 0, i);
					var sign = Math.pow(-1, i);
					var newDet = this.det(minorA);
					var Deter = sign * newDet * current;
					Determinant += Deter;
				}
				return Determinant;
			}
		} else {
			return 0;
		}
	};
	Matrix.prototype.inverse = function (replaceOriginal, matrix) {
		if (replaceOriginal === void 0) {
			replaceOriginal = false;
		}
		if (matrix === void 0) {
			matrix = this.matrix;
		}
		var inverted = [];
		var adjoint = this.adjoint(matrix);
		var D = this.det(matrix);
		for (var i = 0; i < adjoint.length; i++) {
			inverted.push([]);
			for (var j = 0; j < adjoint[0].length; j++) {
				inverted[i].push(adjoint[i][j] / D);
			}
		}
		if (replaceOriginal) {
			this.matrix = inverted;
		}
		return inverted;
	};
	Matrix.prototype.minorArray = function (matrix, row, col) {
		if (matrix === void 0) {
			matrix = this.matrix;
		}
		var minorArray = [];
		if (this.size()[0] > 2 && this.size()[1] > 2) {
			for (var i = 0; i < matrix.length; i++) {
				if (minorArray[i] === undefined && i !== row) {
					minorArray.push([]);
				}
				for (var j = 0; j < matrix[i].length; j++) {
					if (i !== row && j !== col) {
						minorArray[minorArray.length - 1].push(matrix[i][j]);
					}
				}
			}
			return minorArray;
		}
	};
	Matrix.prototype.minor = function (row, col, matrix) {
		if (matrix === void 0) {
			matrix = this.matrix;
		}
		var MinorArray = this.minorArray(matrix, row, col);
		var minor = this.det(MinorArray);
		return minor;
	};
	Matrix.prototype.cofactor = function (row, col, matrix) {
		if (matrix === void 0) {
			matrix = this.matrix;
		}
		var minor = this.minor(row, col, matrix);
		var sign = Math.pow(-1, row + col);
		return minor * sign;
	};
	Matrix.prototype.size = function (matrix) {
		if (matrix === void 0) {
			matrix = this.matrix;
		}
		var row = matrix.length,
			col = matrix[0].length;
		return [row, col];
	};
	Matrix.prototype.transponse = function (replaceOriginal, matrix) {
		if (replaceOriginal === void 0) {
			replaceOriginal = false;
		}
		if (matrix === void 0) {
			matrix = this.matrix;
		}
		var transponsed = [];
		for (var i = 0; i < matrix[0].length; i++) {
			transponsed.push([]);
			for (var j = 0; j < matrix.length; j++) {
				transponsed[i].push(matrix[j][i]);
			}
		}
		if (replaceOriginal) {
			this.matrix = transponsed;
		}
		return transponsed;
	};
	Matrix.prototype.adjoint = function (matrix) {
		if (matrix === void 0) {
			matrix = this.matrix;
		}
		var size = this.size(matrix);
		var adjoint = [];
		for (var i = 0; i < size[0]; i++) {
			adjoint.push([]);
			for (var j = 0; j < size[1]; j++) {
				var A = this.cofactor(i, j, matrix);
				adjoint[i].push(A);
			}
		}
		return this.transponse(false, adjoint);
	};
	return Matrix;
})();
exports.default = Matrix;
