JustRun.matchmakingState = function(game){

	JustRun.userID = -1;
}
var cambio = false;
JustRun.matchmakingState.prototype = {
		preload: function(){		
			//carga de lo qu se usara en el menú principal
			game.load.image('buscando','assets/fondos/Buscando.png')
		},

		create: function(){
			$.ajax({
	    		method: "POST",
	    		url: "/matchmaking",
	    		processData: false,
	    		headers: {
	    			"Content-Type": "application/json"
	    		}
	    	}).done(function(data){
	    		if(data){
	    			JustRun.userID = 1;
	    		}else{
	    			JustRun.userID = 2;
	    		}
	    	})
			
			var buscando = game.add.sprite(0,0,'buscando');

			//animacion pantalla carga
		    var pantallacarga = game.add.sprite(660, 238, 'carga');
		    pantallacarga.scale.setTo(0.2,0.2);
			var loading = pantallacarga.animations.add('load');
			pantallacarga.animations.play('load', 26, true);
		},
		update: function(){
			$.get("/matchmaking", function(data){
				console.log(data);
				if(data){
					cambio = true;
				}
			})		
			if(cambio){
				game.state.start('tutorial');
			}
		}	
}