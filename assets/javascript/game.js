$(document).ready(function() {

	var gameData = {
		r2D2: {
			name: "R2-D2",
			health: 90,
			attack: 8,
			counterAttack: 10,
			image: "assets/images/r2d2-2.jpg",
			sound: function() {
				var audio = new Audio("./assets/sounds/R2D2a.wav");
				audio.play();
				},
			allegiance: "rebel"
		},
		lukeSkywalker: {
			name: "Luke Skywalker",
			health: 80,
			attack: 10,
			counterAttack: 8,
			image: "assets/images/luke.jpg",
			sound: function() {
				var audio = new Audio("./assets/sounds/CONVERTS.WAV");
				audio.play();
				},
			allegiance: "rebel"
		},
		darthVader: {
			name: "Darth Vader",
			health: 120,
			attack: 20,
			counterAttack: 10,
			image: "assets/images/vader.jpg",
			sound: function() {
				var audio = new Audio("./assets/sounds/ThyBidding.wav");
				audio.play();
				},
			allegiance: "empire"
		},
		jarJarBinks: {
			name: "Jar Jar Binks",
			health: 150,
			attack: 10,
			counterAttack: 20,
			image: "assets/images/jarjar.jpg",
			sound: function() {
				var audio = new Audio("./assets/sounds/jarjar.mp3");
				audio.play();
				},
			allegiance: "republic"
		},
		attack: {
			sound: function() {
				var audio = new Audio("./assets/sounds/LAZER.WAV");
				if (audio.paused) {
        			audio.play();
  				}else{ // allows attack to replay from beginning if time between clicks is shorter than length of audio
    				audio.pause();
    				audio.currentTime = 0;
    				setTimeout(function () { //Need to add this timeout function to prevent Promise Error     
      					audio.play();
   					}, 50);     
  				}
			}
		}
	} 

	var characterHealth;
	var characterAttack;
	var yourCharacter;
	var activeDefender;
	var defenderHealth;
	var defenderAttack;
	var attackCounter;
	var activeDefenderName;

	var health;
	var health2;
	var health3;
	var health4;

	function reset() {
		loadDOM(); 
		selectCharacter();
		selectDefender();
		onAttack();
	}

	reset();



		//add stuff to DOM, restart game

	function loadDOM () {
		$("body").empty();
		var container = $("<div></div>");
		container.addClass("container");
		$("body").append(container);
		var title = $("<div></div>");
		title.addClass("title")
		$(".container").append(title);
		$(".title").html("<h1>star</h1>" + "<p>ROLE PLAYING GAME</p>" + "<h1>wars</h1>")
		var top = $("<div></div>");
		top.addClass("top");
		$(".container").append(top);
		var availableCharacters = $("<div></div>");
		availableCharacters.addClass("available-characters");
		$(".top").append(availableCharacters);
		
		var charR2D2 = $("<div></div>");
		charR2D2.addClass("character r2d2");
		$(".available-characters").append(charR2D2);
		$(".r2d2").html("<h6>" + gameData.r2D2.name + "</h6>");
		var image = $("<div></div>");
		image.addClass("image image1");
		$(".r2d2").append(image);
		$(".image1").append("<img src=" + gameData.r2D2.image + " alt=" + gameData.r2D2.name + ">");
		health = $("<div></div>");
		health.addClass("health health1");
		$(".r2d2").append(health);
		$(".health").append("Health: " + gameData.r2D2.health);

		var charluke = $("<div></div>");
		charluke.addClass("character luke");
		$(".available-characters").append(charluke);
		$(".luke").html("<h6>" + gameData.lukeSkywalker.name + "</h6>");
		var image2 = $("<div></div>");
		image2.addClass("image image2");
		$(".luke").append(image2);
		$(".image2").append("<img src=" + gameData.lukeSkywalker.image + " alt=" + gameData.lukeSkywalker.name + ">");
		health2 = $("<div></div>");
		health2.addClass("health health2");
		$(".luke").append(health2);
		$(".health2").append("Health: " + gameData.lukeSkywalker.health);

		var charvader = $("<div></div>");
		charvader.addClass("character vader");
		$(".available-characters").append(charvader);
		$(".vader").html("<h6>" + gameData.darthVader.name + "</h6>");
		var image3 = $("<div></div>");
		image3.addClass("image image3");
		$(".vader").append(image3);
		$(".image3").append("<img src=" + gameData.darthVader.image + " alt=" + gameData.darthVader.name + ">");
		health3 = $("<div></div>");
		health3.addClass("health health3");
		$(".vader").append(health3);
		$(".health3").append("Health: " + gameData.darthVader.health);

		var charjar = $("<div></div>");
		charjar.addClass("character idiot");
		$(".available-characters").append(charjar);
		$(".idiot").html("<h6>" + gameData.jarJarBinks.name + "</h6>");
		var image4 = $("<div></div>");
		image4.addClass("image image4");
		$(".idiot").append(image4);
		$(".image4").append("<img src=" + gameData.jarJarBinks.image + " alt=" + gameData.jarJarBinks.name + ">");
		health4 = $("<div></div>");
		health4.addClass("health health4");
		$(".idiot").append(health4);
		$(".health4").append("Health: " + gameData.jarJarBinks.health);

		var yourCharacter = $("<div></div>");
		yourCharacter.addClass("your-character")
		$(".container").append(yourCharacter);
		$(".your-character").html("<h3>Your Character</h3>");

		var enemies = $("<div></div>");
		enemies.addClass("enemies");
		$(".container").append(enemies);
		$(".enemies").html("<h3>Enemies Available to Attack</h3>");
		var enemyCharacters = $("<div></div>");
		enemyCharacters.addClass("enemy-characters");
		$(".enemies").append(enemyCharacters);

		var fight = $("<div></div>");
		fight.addClass("fight");
		$(".container").append(fight);
		$(".fight").html("<h3>Fight Section</h3>");
		var attack = $("<button><p>Attack!</p></button>");
		attack.addClass("attack");
		$(".fight").append(attack);

		var defender = $("<div></div>");
		defender.addClass("defender");
		$(".container").append(defender);
		$(".defender").html("<h3>Defender</h3>");
		var actDefender = $("<div></div>");
		actDefender.addClass("active-defender");
		$(".defender").append(actDefender);

		var messageArea = $("<div></div>");
		messageArea.addClass("message-area");
		$(".container").append(messageArea);

		attackCounter = 0;
	}
	
		/*console.log("hello");*/
	function selectCharacter() {	//character selection
	$(".available-characters").on("click", ".character", function() {
		//yourCharacter = $(this);	//need to set global variable if you want to use this		
		if ($(this).hasClass("r2d2")) {
			gameData.r2D2.sound();
			
			$(".attack").prepend("<div class='icon'><img src=./assets/images/rebel.png alt=" + gameData.r2D2.allegiance + "></div>");
		} else if ($(this).hasClass("luke")) {
			gameData.lukeSkywalker.sound();
			$(".attack").prepend("<div class='icon'><img src=./assets/images/rebel.png alt=" + gameData.lukeSkywalker.allegiance + "></div>");
		} else if ($(this).hasClass("vader")) {
			gameData.darthVader.sound();
			$(".attack").prepend("<div class='icon'><img src=./assets/images/empire.png alt=" + gameData.darthVader.allegiance + "></div>");
		} else if ($(this).hasClass("idiot")) {
			gameData.jarJarBinks.sound();
			$(".attack").prepend("<div class='icon'><img src=./assets/images/jarjar2.jpg alt=" + gameData.jarJarBinks.allegiance + "></div>");
		}
		$(this).animateAppendTo(".your-character", 1000); //if this is active then bugs occur, display:none if enemy selected during animation
		$(this).css({"background-color": "green"});
		
		//$(this).appendTo(".your-character");
		setCharacterAttackAndHealth($(this));
		//$(".available-characters").children().not($(this)).animateAppendTo(".enemy-characters", 1000); //this animates but then the selected character goes to display:none and I can't override it
		$(".available-characters").children().appendTo(".enemy-characters"); //could create div of remaining characters and then animate that div
		$("body").css( {"pointer-events": "none"} );
		setTimeout(function() {
			$("body").css( {"pointer-events": "auto"} );
			$(".top").animate({
    	    	height: "30px"
  			}, 1000, function() {
    // Animation complete.
  				});
			}, 1000);

		
		/*setTimeout(function() {
			$(".top").remove();
		}, 1000);*/
		//add attack button/div that is styled to correspond to selected characters allegiance	
	});
	}
	//defender selection
	function selectDefender() {
	$('.enemy-characters').on('click', '.character', function() {
		if ($('.active-defender').children('.character').length === 0) {
			activeDefender = $(this);
			//setTimeout(function() {
				$(this).animateAppendTo(".active-defender", 1000);
				$("body").css( {"pointer-events": "none"} );
				setTimeout(function() {
					$("body").css( {"pointer-events": "auto"} );
				}, 1000);
			//}, 1000);
			//$(this).appendTo(".active-defender");
			$(".message-area").empty();
			setDefenderAttackAndHealth($(this));
			//console.log(activeDefenderName)
			activeDefender = $(this);
			$(this).css({"background-color": "black", "color": "yellow"});
			if ($(this).hasClass("r2d2")) {
				gameData.r2D2.sound();
				//health.addClass("defender-health");
			} else if ($(this).hasClass("luke")) {
				gameData.lukeSkywalker.sound();
				//health2.addClass("defender-health");
			} else if ($(this).hasClass("vader")) {
				gameData.darthVader.sound();
				//health3.addClass("defender-health");
			} else if ($(this).hasClass("idiot")) {
				gameData.jarJarBinks.sound();
				//health4.addClass("defender-health");
		    }
		}
	});
	}
	//check for repeated additions to active-defender after removal of existing active defender
	//$(".active-defender").on("click", ".character", function() {
		//$(this).remove(); //need to comment out
		
	//});

	function setCharacterAttackAndHealth (selectedCharacter) {
		if ((selectedCharacter).hasClass("r2d2")) {
			characterHealth = gameData.r2D2.health;
     		characterAttack = gameData.r2D2.attack;
     		$(".health1").addClass("character-health").removeClass("health health1");
		} else if ((selectedCharacter).hasClass("luke")) {
			characterHealth = gameData.lukeSkywalker.health;
     		characterAttack = gameData.lukeSkywalker.attack;
     		$(".health2").addClass("character-health").removeClass("health health2");
		} else if ((selectedCharacter).hasClass("vader")) {
     	   	characterHealth = gameData.darthVader.health;
     		characterAttack = gameData.darthVader.attack;
     		$(".health3").addClass("character-health").removeClass("health health3");
		} else if ((selectedCharacter).hasClass("idiot")) {
			characterHealth = gameData.jarJarBinks.health;
     		characterAttack = gameData.jarJarBinks.attack;
     		$(".health4").addClass("character-health").removeClass("health health4");
		}
	}

	function setDefenderAttackAndHealth (selectedCharacter) {
		if ((selectedCharacter).hasClass("r2d2")) {
			defenderHealth = gameData.r2D2.health;
     		defenderAttack = gameData.r2D2.counterAttack;
     		activeDefenderName = gameData.r2D2.name;
     		$(".health1").addClass("defender-health").removeClass("health health1");
		} else if ((selectedCharacter).hasClass("luke")) {
			defenderHealth = gameData.lukeSkywalker.health;
     		defenderAttack = gameData.lukeSkywalker.counterAttack;
     		activeDefenderName = gameData.lukeSkywalker.name;
     		$(".health2").addClass("defender-health").removeClass("health health2");
		} else if ((selectedCharacter).hasClass("vader")) {
     	   	defenderHealth = gameData.darthVader.health;
     		defenderAttack = gameData.darthVader.counterAttack;
     		activeDefenderName = gameData.darthVader.name;
     		$(".health3").addClass("defender-health").removeClass("health health3");
		} else if ((selectedCharacter).hasClass("idiot")) {
			defenderHealth = gameData.jarJarBinks.health;
     		defenderAttack = gameData.jarJarBinks.counterAttack;
     		activeDefenderName = gameData.jarJarBinks.name;
     		$(".health4").addClass("defender-health").removeClass("health health4");
		}
	}

	//trying to create a jquery plugin to animate movement
	$.fn.animateAppendTo = function(sel, speed, queue) {
		var $this = this;
		//console.log('this is', this)
		newEle = $this.clone(true).appendTo(sel);
		newPos = newEle.position();
		newEle.hide();
		$this.css({"position": "absolute", "display": "block !important"}).animate(newPos, speed, queue, function() {
			newEle.show();
			$this.remove();
		});
		return newEle;
	};
	
	function onAttack() {
	$(".attack").on("click", function() {
		if (characterHealth > 0 && $(".active-defender").children(".character").length > 0) {
			attackCounter++;
			gameData.attack.sound();
			defenderHealth = defenderHealth - characterAttack*attackCounter;
			$(".message-area").html("<p>You attacked " + activeDefenderName + "for " + characterAttack*attackCounter + " damage!</p>")
			$(".defender-health").html("<p>Health: " + defenderHealth + "</p>");
			
			//console.log(characterAttack*attackCounter)
			//console.log(defenderHealth);
			if (defenderHealth > 0) { //only counter attack if defender is still alive
				characterHealth = characterHealth - defenderAttack;
				//console.log(characterHealth);
				$(".message-area").append("<p>" + activeDefenderName + " attacked you for " + defenderAttack + " damage!</p>");
				$(".character-health").html("<p>Health: " + characterHealth + "</p>");
			}
			if (defenderHealth <= 0 && characterHealth > 0) {
				$(".active-defender").empty();
			}

			if (characterHealth > 0 && $(".enemy-characters").children(".character").length > 0 && $(".active-defender").children(".character").length === 0) {
				//write text to add another defender
				$(".message-area").html("<p>You have defeated " + activeDefenderName + "! Choose another enemy to fight.</p>")
			}

			if (characterHealth <= 0) {
				$(".message-area").html("<p>You have been defeated....GAME OVER!</p>");
				$(".message-area").append("<button class='restart'>Restart</button>");
				$(".restart").on("click", function() {
					//console.log("restart works");
					reset();
					//location.reload();
				});
			}
			if (characterHealth > 0 && $(".enemy-characters").children(".character").length === 0 && $(".active-defender").children(".character").length === 0) {
			//console.log($(".active-defender").children(".character").length)
			//win the game, put up reset button;
			$(".message-area").html("<p>You have defeated all enemies!</p>");
				$(".message-area").append("<button class='restart'>Restart</button>");
				$(".restart").on("click", function() {
					//console.log("restart works");
					reset();
					//location.reload();
				});
			}
		} else if (characterHealth > 0 && $(".active-defender").children(".character").length === 0 && $(".enemy-characters").children(".character").length > 0) {
			$(".message-area").html("<p>No defender selected</p>")
		}
	});
	
	}

});