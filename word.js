var Letter = require('./letter.js');

function Word(str) {
	this.string = str;
	this.words = str.split(' ');;
	this.lettersArr = [];

	this.construct = function(str){
		for(let i=0; i<this.words.length; i++){
			for(let l=0; l<this.words[i].length; l++){
				this.lettersArr.push(new Letter(this.words[i][l]));
			}
		}
	};

	this.draw = function(){
		let str = "";
		let index = 0;
		for(let i=0; i<this.words.length; i++){
			let w = this.words[i];
			for(let j=0; j<w.length; j++){
				let letter = this.lettersArr[index];
				index++;
				str+=letter.draw();
				if(j!=w.length-1) str+=' ';
			}
			if(i!=this.words.length-1) str+= '   ';
		}
		console.log('\n'+str+'\n');
	};

	this.guessLetter = function(ltr){
		let flag = 0;
		for(let i=0; i<this.lettersArr.length; i++){
			let g = this.lettersArr[i].guess(ltr);
			if(g) flag++;
		}
		return flag;
	};

	this.checkComplete = function(){
		let counter = 0;
		for(let i=0; i<this.lettersArr.length; i++){
			if(this.lettersArr[i].guessed()) counter++;
		}
		if(counter === this.lettersArr.length) return true;
		return false;
	};

}

module.exports = Word;
