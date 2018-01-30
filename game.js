Game(guess_letter);

function Game(param){

	if(param == 'guess letter'){
		inquirer.prompt({letter to guess})
		.then(function(data){

			var result = WORDlogic(data.letter);
			if(result === win || result === loose){
				Game("new game");
			}
			esle if (result === continue){
				Game("guess_letter");
			}
		});
	else if(param == 'new game'){
		inquirer.prompt({want to play again})
		.then(){
		 if(yes){
		 	Game('guess letter');
		 }
		 esle {
		 	console.log(bye);
		 	return;
		}
	}
}

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}