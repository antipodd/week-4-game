$(document).ready(function() {
	var gameData = {
		r2D2: {
			name: "R2D2",
			health: 80,
			attack: 20,
			counterAttack: 40,
			image: "image goes here",
			sound: "maybe sound will go here"
		},
		lukeSkywalker: {
			name: "Luke Skywalker",
			health: 80,
			attack: 40,
			counterAttack: 30,
			image: "image goes here",
			sound: "maybe sound will go here"
		},
		darthVader: {
			name: "Darth Vader",
			health: 120,
			attack: 75,
			counterAttack: 40,
			image: "image goes here",
			sound: "maybe sound will go here"
		},
		jarJarBinks: {
			name: "Jar Jar Binks",
			health: 200,
			attack: 40,
			counterAttack: 20,
			image: "image goes here",
			sound: "maybe sound will go here"
		},
	} 
	var characterHealth;
	var characterAttack;
	var yourCharacter;
	var activeDefender;
	var defenderHealth;
	var defenderAttack;
	var attackCounter = 0;
		
	
		/*console.log("hello");*/
		//character selection
	$(".available-characters").on("click", ".character", function() {
		//yourCharacter = $(this);	//need to set global variable if you want to use this		
		$(this).appendTo(".your-character");
		setCharacterAttackAndHealth($(this));
		$(".available-characters").children().appendTo(".enemy-characters");	
	});
	//defender selection
	$('.enemy-characters').on('click', '.character', function() {
		if ($('.active-defender').children('.character').length === 0) {
			$(this).appendTo(".active-defender");
			setDefenderAttackAndHealth($(this));
			activeDefender = $(this);
		}
	});
	//check for repeated additions to active-defender after removal of existing active defender
	$(".active-defender").on("click", ".character", function() {
		$(this).remove(); //need to comment out
		
	});

	function setCharacterAttackAndHealth (selectedCharacter) {
		if ((selectedCharacter).hasClass("r2d2")) {
			characterHealth = gameData.r2D2.health;
     		characterAttack = gameData.r2D2.attack;
		} else if ((selectedCharacter).hasClass("luke")) {
			characterHealth = gameData.lukeSkywalker.health;
     		characterAttack = gameData.lukeSkywalker.attack;
		} else if ((selectedCharacter).hasClass("vader")) {
     	   	characterHealth = gameData.darthVader.health;
     		characterAttack = gameData.darthVader.attack;
		} else if ((selectedCharacter).hasClass("idiot")) {
			characterHealth = gameData.jarJarBinks.health;
     		characterAttack = gameData.jarJarBinks.attack;
		}
	}

	function setDefenderAttackAndHealth (selectedCharacter) {
		if ((selectedCharacter).hasClass("r2d2")) {
			defenderHealth = gameData.r2D2.health;
     		defenderAttack = gameData.r2D2.counterAttack;
		} else if ((selectedCharacter).hasClass("luke")) {
			defenderHealth = gameData.lukeSkywalker.health;
     		defenderAttack = gameData.lukeSkywalker.counterAttack;
		} else if ((selectedCharacter).hasClass("vader")) {
     	   	defenderHealth = gameData.darthVader.health;
     		defenderAttack = gameData.darthVader.counterAttack;
		} else if ((selectedCharacter).hasClass("idiot")) {
			defenderHealth = gameData.jarJarBinks.health;
     		defenderAttack = gameData.jarJarBinks.counterAttack;
		}
	}

	$(".attack").on("click", function() {
		if (characterHealth > 0 && $('.active-defender').children('.character').length > 0) {
			attackCounter++;
		
			console.log(defenderHealth);
			defenderHealth = defenderHealth - characterAttack*attackCounter;
			console.log(characterAttack*attackCounter)
			console.log(defenderHealth);
			characterHealth = characterHealth - defenderAttack;
			console.log(characterHealth);
			if (defenderHealth <= 0 && characterHealth > 0) {
				$(".active-defender").empty();
				//write text to add another defender
			}
			if (characterHealth <= 0) {
			//lose game, put up reset button;
			}
			if (characterHealth > 0 && $('.enemy-characters').children('.character').length === 0 && $('.active-defender').children('.character').length === 0) {
			console.log($('.active-defender').children('.character').length)
			//win the game, put up reset button;
			}
		}

	});



});