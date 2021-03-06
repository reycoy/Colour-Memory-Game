document.onkeydown = function(evt) {
    evt = evt || window.event;
    switch (evt.keyCode) {
        case 37:
            GameControl.leftArrowPressed();
            break;
        case 39:
            GameControl.rightArrowPressed();
            break;
        case 38:
            GameControl.upArrowPressed();
            break;
        case 40:
            GameControl.downArrowPressed();
            break;
        case 13:
            GameControl.introPressed();
        	break;
    }
};

var GameControl = (function () {
 
        var selectedCard = 0,
            flippedCard  = 0,
            movements = 0,
            points = 100,
            indexVisible = 1;
            cardDOM = $('.card');
		var elementsToCompare = [];
            
        var init = function() {
        	movements = 0;
        	GameControl.points = 100;
        	selectedCard = 0;
        	
        	$('.selected').removeClass('selected');
        	$('.flip').removeClass('flip');
        	$('.flipper:hidden').show();
        	$('#frmEndGame').hide();
        	$('#ranking').hide();
        	
        	displayGameInfo();
        	setCardSelected();
        };
        
        var setCardSelected = function() {
        	var firstCard = cardDOM.eq(selectedCard);
        	firstCard.addClass('selected');
        };
        
        var firstCard = 0,
        	lastCard = 15,
        	verticalMovement = 4,
        	verticalJump = 11, // difference between index top item and index bottom item
        	horizontalMovement = 1,
        	finalColumn = [12, 13, 14, 15],
        	startColumn = [0, 1, 2 ,3];
        	
        
        var isFinalColumn = function() {
        	if (jQuery.inArray(selectedCard, finalColumn) !== -1) {
        		return true;
        	};        	
        };
        
        var isStartColumn = function() {
        	if (jQuery.inArray(selectedCard, startColumn) !== -1) {
        		return true;
        	};        	
        };
        
        var isLastCard = function() {
        	if (selectedCard == lastCard) {
        		return true;
        	};
        };
        
        var isFirstCard = function() {
        	if (selectedCard == firstCard) {
        		return true;
        	};
        };
        
        var moveToNextVisible = function() {
        	if (isLastCard()) { selectedCard = firstCard; }
        	else { selectedCard++; };
        	
        	if (cardDOM.eq(selectedCard).children().children().is(':visible')) {
        		cardDOM.eq(selectedCard).addClass('selected');
        	} else {
        		rightArrowPressed();
        	}
        };
        
        var moveToPreviousVisible = function() {
        	if (isFirstCard()) { selectedCard = lastCard; }
        	else { selectedCard--; };
        	
        	if (cardDOM.eq(selectedCard).children().children().is(':visible')) {
        		cardDOM.eq(selectedCard).addClass('selected');
        	} else {
        		leftArrowPressed();
        	}
        };
        
        var moveToLowerVisible = function() {
        	if (isLastCard()) { selectedCard = firstCard; }
        	else if (isFinalColumn()) { selectedCard = selectedCard - verticalJump; }
        	else { selectedCard = selectedCard + verticalMovement; }
        	
        	if (cardDOM.eq(selectedCard).children().children().is(':visible')) {
        		cardDOM.eq(selectedCard).addClass('selected');
        	} else {
        		downArrowPressed();
        	}
        };
        
        var moveToUpperVisible = function() {
        	if (isFirstCard()) { selectedCard = lastCard; }
        	else if (isStartColumn()) { selectedCard = selectedCard + verticalJump; }
        	else { selectedCard = selectedCard - verticalMovement; };
        	
        	if (cardDOM.eq(selectedCard).children().children().is(':visible')) {
        		cardDOM.eq(selectedCard).addClass('selected');
        	} else {
        		upArrowPressed();
        	}
        };
 
		var leftArrowPressed = function() {
		   cardDOM.eq(selectedCard).removeClass('selected');
		   moveToPreviousVisible();
		};
		
		var rightArrowPressed = function() {
		   cardDOM.eq(selectedCard).removeClass('selected');
		   moveToNextVisible();
		};
		
		var downArrowPressed = function() {
		   cardDOM.eq(selectedCard).removeClass('selected');
		   moveToLowerVisible();
		};
		
		var upArrowPressed = function() {
		   cardDOM.eq(selectedCard).removeClass('selected');
		   moveToUpperVisible();
		};
		
		var introPressed = function() {
			childrenSelectedCard = cardDOM.eq(selectedCard).children();
			flipTwoCardsAndUpdateGameInfo();
			compareCards();
		};
		
		var flipTwoCardsAndUpdateGameInfo = function() {
			if (flippedCard == 0 || flippedCard == 1) {
				childrenSelectedCard.addClass('flip');
				flippedCard++;		
			} else {
				movements++;
				displayGameInfo();
				cardDOM.find('.flip').removeClass('flip');
				flippedCard = 0;
				flipTwoCardsAndUpdateGameInfo();
			}	
		};

		
		var displayGameInfo = function() {
			$('#gameInfo ul li.moves span').text(movements);
			$('#gameInfo ul li.points span').text(GameControl.points);
		};
		
		var getCardId = function() {
			return cardDOM.eq(selectedCard).children().find('[data-id]').attr('data-id');
		};
		
		var getCardColour = function() {
			return cardDOM.eq(selectedCard).children().find('[data-color-type]').attr('data-color-type');
		};
		
		var compareCards = function() {
			if (elementsToCompare.length < 2) {
				elementsToCompare.push( {"id": getCardId(), "color": getCardColour()} );
				if (elementsToCompare.length == 2) {
					// let's compare
					if ( (elementsToCompare[0].id !== elementsToCompare[1].id) && (elementsToCompare[0].color === elementsToCompare[1].color) ) {
						GameControl.points++;
						displayGameInfo();
						$("[data-color-type='" + elementsToCompare[0].color +"']").hide();
						GameFinal.setAndDisplayFormSubmitScore();
					} else {
						GameControl.points--;
						displayGameInfo();
						elementsToCompare = [];
					}
				}
			} else {
				elementsToCompare = [];
				compareCards();
			}
			
		};
		
 
        return {
        	points: points,
            leftArrowPressed: leftArrowPressed,
            rightArrowPressed: rightArrowPressed,
            upArrowPressed: upArrowPressed,
            downArrowPressed: downArrowPressed,
            introPressed: introPressed,
            init: init,
            setCardSelected: setCardSelected,
        };
 
})();
    
GameControl.init();
