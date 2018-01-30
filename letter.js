
function Letter(l) {
	this.name = l.toUpperCase();
	this.show = false;

	this.draw = function(){
		if(this.show) return this.name;
		return "_";
	}
	this.guessed = function(){
		return this.show;
	}
	this.guess = function(ltr){
		if(ltr===this.name){
			this.show = true;
			return true;
		}
		return false;
	}

}

module.exports = Letter;