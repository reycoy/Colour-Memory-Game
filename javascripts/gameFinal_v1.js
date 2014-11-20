var GameFinal = (function () {
	
	var isTheEndOfTheGame = function() {
		return $('.flipper:visible').length === 0;
	};
	
	var setAndDisplayFormSubmitScore = function() {
		if (isTheEndOfTheGame()) { $('#frmEndGame').show('slow'); }
		$("#frmEndGame form input[name='finalPoints']").val(GameControl.points);
		$('#frmEndGame form h3 span').text(GameControl.points + ' POINTS');
	};

    return {
        setAndDisplayFormSubmitScore: setAndDisplayFormSubmitScore,
    };
		
})();