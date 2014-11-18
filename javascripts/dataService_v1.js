var DataService = (function () {
	
	var cardsInfo = [{
		    "id": 1, "picture": "colour1.gif", "color": "red"
		}, {
		    "id": 2, "picture": "colour2.gif", "color": "yellow"
		}, {
		    "id": 3, "picture": "colour3.gif", "color": "green"
		}, {
		    "id": 4,"picture": "colour4.gif", "color": "notsure"
		}, {
		    "id": 5,"picture": "colour5.gif", "color": "blue"
		}, {
		    "id": 6, "picture": "colour6.gif", "color": "purple"
		}, {
		    "id": 7, "picture": "colour7.gif", "color": "pink"
		}, {
		    "id": 8, "picture": "colour8.gif", "color": "orange"
		}, {
		    "id": 9, "picture": "colour1.gif", "color": "red"
		}, {
		    "id": 10, "picture": "colour2.gif", "color": "yellow"
		}, {
		    "id": 11, "picture": "colour3.gif", "color": "green"
		}, {
		    "id": 12, "picture": "colour4.gif", "color": "notsure"
		}, {
		    "id": 13, "picture": "colour5.gif", "color": "blue"
		}, {
		    "id": 14, "picture": "colour6.gif", "color": "purple"
		}, {
		    "id": 15, "picture": "colour7.gif", "color": "pink"
		}, {
		    "id": 16, "picture": "colour8.gif", "color": "orange"
	}];
	var userEmail = null;
	
	randomOperation = function() {
		return 0.5 - Math.random();
	};
	
	shuffleCards = function() {
		cardsInfo.sort(randomOperation);
	};
	
	displayCards = function() {
		shuffleCards();
		for ( var i = 0; i < cardsInfo.length; i++ ) { 
			var card = cardsInfo[i];
			$('#cards').append("" +
						"<div class='card'>" +
							"<div class='flip-container'>" +
								"<div class='flipper' data-id='" + card.id + "' data-color-type='" + card.color + "'>" +
									"<div class='face front'></div>" +
									"<div class='face back'><img src='images/" + card.picture + "' /></div>" +
								"</div>" +
							"</div>" +
						"</div>");
		}

	};
	
	sendScore = function() {		
        $("#frmEndGame form").validate({
            rules: {
                "email": {
                    required: true,
                    email: true
                },  
                "name": {
                    required: true,
                    minlength: 5
                } 
            },
            //perform an AJAX post to insert_score.php
            submitHandler: function() {
		        $.ajax({
		            type:"post",
		            url:"php/insert_score.php",
		            data:$("#frmEndGame form").serialize(),
		            success:function(response){
		                $('#frmEndGame').hide('slow');
		                $('#ranking').show('slow');
		                keepUserInfo();
		                getResults();
		            },
		            error: function(response){
		            	console.log('error');
		            }
		        });
            }
        });
	};
	
	keepUserInfo = function() {
		userEmail = $("#frmEndGame form input[name='email']").val();
	};
	
	isThisYourPosition = function(item) {
		if ( (userEmail == item.email) && (GameControl.points == item.points) ) {
			return true;
		}
	};
	
	getResults = function() {
	    $.ajax({
	        url: 'php/endpoint_ranking.php',
	        dataType: 'json',
	        success: function(data, status){
	            $.each(data.ranking, function(i,item){
	            	var positionSelected = '';
	            	if (isThisYourPosition(item)) {
	                	$('#ranking h3 span').text(i+1);
	                	positionSelected = 'myPosition';
	               } 
	            	
	                var results = '<li class="' + positionSelected + '"><span>' + (i+1) + ': </span>' + item.name + ' - '
	                + item.email + ' -> ' + item.points + '</li>';
	
	                $('#ranking div ul').append(results);
	                

	            });
	        },
	        error: function(){
	            $('#ranking div ul').text('There was an error loading the data.');
	        }
	    });		
	};
	
	return {
		displayCards:displayCards,
		sendScore: sendScore
	};
	
})();

displayCards();
sendScore();
