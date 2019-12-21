var assert = require('assert');
var {Matrix, local2Global, global2Local} = require('../libs/matrix');

describe('matrix', function(){
    describe('vector', function(){
        beforeEach(function(){

        })
        const mat1 = new Matrix([
            [1],
            [2],
            [3]
        ],1 ,3);
        const mat2 = new Matrix([
            [1],
            [2],
            [3]
        ],1 ,3);
        const mat = mat1.add(mat2)
        it('test add', function(){
            assert.equal(mat.col, 1)
            assert.equal(mat.row, 3)
            assert.deepEqual(mat.mat, [[2], [4], [6]])
        })
    });
    describe('2x2 matrix', function(){
        describe('case 1', function(){
            const mat1 = new Matrix([
                [1, 2],
                [3, 4],
            ],2 ,2);
            const mat2 = new Matrix([
                [5, 6],
                [7, 8],
            ],2 ,2);
//            const mat = mat1.add(mat2)
            it('test add', function(){
                const mat = mat1.add(mat2)
                assert.equal(mat.col, 2)
                assert.equal(mat.row, 2)
                assert.deepEqual(mat.mat, [[6, 8],[10, 12]]);
            });

            it('dot', function(){
                const mat = mat1.dot(mat2)
                assert.equal(mat.col, 2)
                assert.equal(mat.row, 2)
                assert.deepEqual(mat.mat, [[19, 22],[43, 50]]);
            })

            it('det', function(){
                const det = mat1.det();
                assert.equal(det, -2);
            });

            it('inverse', function(){
                const mat = mat1.inverse();
                assert.equal(mat.col, 2)
                assert.equal(mat.row, 2)
                assert.deepEqual(mat.mat, [[-2 ,1], [1.5, -0.5]])
            });
        })
    });

    describe('3x3 matrix', function(){
        describe('case 1', function(){
            const mat1 = new Matrix([
                [2, 3, 5],
                [1, 4, 7],
                [2, 1, 6],
            ],3 ,3);
            const mat2 = new Matrix([
                [3, 1, 2],
                [2, 4, 2],
                [9, 8, 6],
            ],3 ,3);
            it('test add', function(){
                const mat = mat1.add(mat2)
                assert.equal(mat.col, 3)
                assert.equal(mat.row, 3)
                assert.deepEqual(mat.mat, [[5, 4, 7],[3, 8, 9], [11, 9, 12]]);
            });

            it('dot', function(){
                const mat = mat1.dot(mat2)
                assert.equal(mat.col, 3)
                assert.equal(mat.row, 3)
                assert.deepEqual(mat.mat, [[57, 54, 40],[74, 73, 52], [62, 54, 42]]);
            })

            it('det mat1', function(){
                const det = mat1.det();
                assert.equal(det, 23);
            });

            it('det mat2', function(){
                const det = mat2.det();
                assert.equal(det, -10);
            });
        })
        describe('case 2', function(){
            const mat1 = new Matrix([
                [3, 1, 1],
                [5, 1, 3],
                [2, 0, 1],
            ],3 ,3);
            it('inverse', function(){
                const mat = mat1.inverse();
                assert.deepEqual(mat.mat, [
                    [0.5, -0.5, 1],
                    [0.5, 0.5, -2],
                    [-1, 1, -1],
                ]);
            });
        });
    });
    describe('local to global', function(){
        it('case 1', function(){
            const euler = {
                pitch: 30 * (Math.PI/180), //pitch
                yaw: 0,
                roll: 0
            }
            displacement = new Matrix([
                [2], 
                [0],
                [0],
            ], 1, 3);

            global = local2Global(euler, displacement).round();
            assert.deepEqual(global.mat, [[1.73], [0], [1]]);
        })
    })
    describe('global to local', function(){
        it('case 1', function(){
            const euler = {
                pitch: 30 * (Math.PI/180), //pitch
                yaw: 0,
                roll: 0
            }
            const pos = new Matrix([
                [Math.sqrt(3)], 
                [0],
                [1],
            ], 1, 3);
            local = global2Local(euler, pos).round();
            assert.deepEqual(local.mat, [[2], [0], [0]])
        });
    })
});
