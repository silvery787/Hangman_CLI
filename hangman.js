const inquirer = require('inquirer');
var colors = require('colors');

var Word = require('./word.js');

const MAX_TRIES = 3;

var WordList = ["Game of Thrones", "Walking Dead", "Friends", 
	"Stranger things", "Breaking Bad", "True Detective", 
	"Sherlock", "Black Mirror", "The Big Bang Theory", "Fargo"];

var current_word;
var tries = 0;

var tried_letters = [];

var wins = 0;
var looses = 0;

console.log(colors.green("Welcome to Hangman Game!"));
console.log(colors.green("Guess popular TV shows"));

Game(0, 'Start');

function isLetter(str){
	if(str.length === 1 && str.match(/[a-z]/i) )return true;
	else return false;
}

function getRandomWord(n){
	let len = WordList.length;
	let r_index = Math.floor(Math.random()*(len-n));
	let word = WordList[r_index];
	//move selected word to the end of array
	WordList.splice(r_index,1);
	WordList.push(word);
	return word;
}

function Game(nword, action){
	
	if(nword >= WordList.length || action === 'Finish'){

		console.log(colors.blue('----------------------------'));
		console.log(colors.bold("Thanks for playing!"));
		console.log(colors.blue('----------------------------'));
		console.log(colors.green("Wins: "+wins),colors.red(" Looses: "+looses));
		return;
	}
	else if(action === 'Start'){
		console.log(colors.green("--------------------------"));
		console.log(colors.green("New Word ("+(nword+1)+"):"));

		tries = 0;
		tried_letters = [];

		currend_word = new Word(getRandomWord(nword));
		// currend_word = new Word(WordList[nword]);
		currend_word.construct();
		currend_word.draw();

		Game(nword, 'GuessLetter');
	}
	else if(action === 'GuessLetter'){

		if(tries >=MAX_TRIES){
			looses++;
			console.log('\n'+colors.red("You loose!")+" (out of guesses)\n");
			Game(nword, 'ConfirmNext');
			return;
		}
		else {
			inquirer.prompt([
				{
					type    : 'input',
					message : 'Guess letter:',
					name    : 'letter'
				}
			]).then(function(data){

				if(data.letter && isLetter(data.letter)){

					let ltr = data.letter[0].toUpperCase();
					if(tried_letters.indexOf(ltr) < 0 ){
						//new letter
						tried_letters.push(ltr);

						let guessed = currend_word.guessLetter(ltr);
						currend_word.draw();
						
						if(guessed){
							console.log(colors.green("CORRECT!\n"));
							let win_status = currend_word.checkComplete();
							if(win_status){
								console.log(colors.green("YOU WIN!!!!\n"));
								wins++;
								Game(nword, 'ConfirmNext');// confirm next
							}
							else {
								Game(nword, 'GuessLetter');
							}
						}
						else{
							tries++;
							console.log(colors.red("INCORRECT!!!"));
							console.log(colors.blue("Guesses remaining: "+(MAX_TRIES - tries)));
							Game(nword, 'GuessLetter');
						}
					}
					else{
						console.log(colors.blue("You already tried this letter!"));
						Game(nword, 'GuessLetter');
					}
				}
				else{
					console.log(colors.red("NOT A LETTER"));
					Game(nword, 'GuessLetter');
				}
			});
		}
	}
	else if(action === 'ConfirmNext'){
		if(nword >= WordList.length-1){
			Game(0, 'Finish');
		}
		else{
			inquirer.prompt([
				{
					type : 'confirm',
					message : 'Do you want to continue?',
					default : 'yes',
					name : 'next'
				}
			]).then(function(data){
				if(data.next){
					Game(nword+1, 'Start');
				}
				else Game(0, 'Finish');
			});
		}
	}
}
