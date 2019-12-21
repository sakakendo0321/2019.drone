function Matrix(mat, col, row){    
  this.mat = mat;    
  this.col = col;    
  this.row = row;    
    
  this.init = function(x,y){
  	let mat = [];
    for(let i=0; i<y; i++) mat[i] = Array(x);
    return mat;
  }

  this.add = function add(target){
    if(this.col === target.col && this.row === target.row){
      let mat=[];
      for(let i=0; i<this.row; i++) mat[i] = Array(this.col);
      for(let i=0;i<this.row; i++){
    		for(let j=0; j<this.col; j++){
          mat[i][j] = target.mat[i][j] + this.mat[i][j];
        }
      }
      return new Matrix(mat, this.col, this.row);
    }else{
      console.error(this, target);
      throw('error at add', this.mat, target.mat);
    }
  }

  this.dot = function dot(target){
    let mat=[];
    for(let i=0; i<this.row; i++) mat[i] = Array(target.col);

    if(this.col === target.row){
    	for(let i=0;i<this.row; i++){
    		for(let j=0; j<target.col; j++){
        	let tmp=0;
        	for(let k=0; k<this.col; k++){
          	tmp += this.mat[i][k] * target.mat[k][j];  
          }
      		mat[i][j]=tmp
        }
      }
      return new Matrix(mat, target.col, this.row);
    }else{
      console.error('this',this);
      console.error('target', target)
      throw('error at dot mat: ', this.mat, 'target: ', target.mat);    
    } 
    return this;
  }

 
  this.det = function determinant(){
    if(this.col == 2 && this.col == 2){
      return this.mat[0][0]*this.mat[1][1] - this.mat[0][1]*this.mat[1][0];
    }else if(this.col === 3 &&  this.row === 3 ){
      let sum=0;
      for(let i=0; i<this.col; i++){
        let tmp=1;
        for(let j=0; j<this.col; j++){
          let k = i+j < this.col ? i+j  : i+j-this.col
          tmp*=this.mat[k][j];
        }
        sum+=tmp;
      }
      for(let i=0; i<this.col; i++){
        let tmp=1;
        for(let j=0; j<this.col; j++){
          let k = i-j >=0 ? i-j  : i-j+this.col
          tmp*=this.mat[k][j];
        }
        sum-=tmp;
      }
      return sum;
    }else{
      throw('this type of matrix is not supported');
    }
  }

  this.getCofactorDet = function cofactor(_i,_j){
    let mat = [];
    let det=0;
    for(let i=0; i<this.row; i++){
    	let col=[];
      for(let j=0; j<this.col; j++){
      	if(j !== _i) col.push(this.mat[i][j])
      }
      if(i !== _j) mat.push(col);
    }
    det=new Matrix(mat, 2, 2).det();
    return det;
  } 

 	this.inverse = function inverse(){
    let mat=[];
    for(let i=0; i<this.col; i++) mat[i] = Array(this.row);
    if(this.col ===2 && this.row === 2){
      const denominator = this.mat[0][0]*this.mat[1][1] - this.mat[0][1]*this.mat[1][0];
      mat[0][0] = this.mat[1][1] / denominator;
      mat[0][1] = -this.mat[0][1] / denominator;
      mat[1][0] = -this.mat[1][0] / denominator;
      mat[1][1] = this.mat[0][0] / denominator;
      return new Matrix(mat, 2, 2);
    }else if(this.col === 3 && this.row ===3){
      const det = this.det();
      for(let i=0; i<this.col; i++){
        for(let j=0; j<this.row; j++){
          mat[i][j] = this.getCofactorDet(i,j) / det * Math.pow(-1, i+j);
        }
      }
      return new Matrix(mat, this.col, this.row);
    }else{
      throw('this type of matrix is not supported');
    }
  }

  this.round = function round(){
    // not recommended
    // implemented for mocha
    let mat=[]
    for(let i=0; i<this.row; i++){
      let tmp=[];
      for(let j=0; j<this.col; j++){
        tmp.push(Math.round(this.mat[i][j]*100)/100);
      }
      mat.push(tmp);
    }
    return new Matrix(mat, this.col, this.row);
  }
} 

function local2Global(euler, displacement){
  const {roll, pitch, yaw} = euler;
  const Rx = new Matrix([
  	[1, 0, 0],
    [0, Math.cos(roll), -Math.sin(roll)],
    [0, Math.sin(roll), Math.cos(roll)],
  ], 3, 3),
  Ry=new Matrix([
		[Math.cos(pitch), 0, Math.sin(pitch)],
    [0, 1, 0],
    [-Math.sin(pitch), 0, Math.cos(pitch)],
  ], 3, 3),
  Rz=new Matrix([
		[Math.cos(yaw), -Math.sin(yaw), 0],
    [Math.sin(yaw), Math.cos(yaw), 0],
    [0, 0, 1]
  ], 3, 3);
  let global=Rx.inverse().dot(Ry.inverse().dot(Rz.inverse())).dot(displacement)
  return global

}

function global2Local(euler, pos){
  const {roll, pitch, yaw} = euler;
  const Rx = new Matrix([
  	[1, 0, 0],
    [0, Math.cos(roll), -Math.sin(roll)],
    [0, Math.sin(roll), Math.cos(roll)],
  ], 3, 3),
  Ry=new Matrix([
		[Math.cos(pitch), 0, Math.sin(pitch)],
    [0, 1, 0],
    [-Math.sin(pitch), 0, Math.cos(pitch)],
  ], 3, 3),
  Rz=new Matrix([
		[Math.cos(yaw), -Math.sin(yaw), 0],
    [Math.sin(yaw), Math.cos(yaw), 0],
    [0, 0, 1]
  ], 3, 3);
  return Rz.dot(Ry.dot(Rx.dot(pos)))
}

module.exports = {
  local2Global,
  global2Local,
  Matrix
}
