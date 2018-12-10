package NyaGames.Just_Run;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/animations")
public class AnimationsController {
	Animations animaciones;
	//creamos las animaciones, siendo la estandar los idles de ambos personajes
	@CrossOrigin
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Animations createAnimations() {
		animaciones = new Animations();
		
		animaciones.ChaserIdle = true;
		animaciones.EscapistIdle = true;
		animaciones.ChaserJump = false;
		animaciones.ChaserRunL = false;
		animaciones.ChaserRunR = false;
		animaciones.EscapistJump = false;
		animaciones.EscapistRunL = false;
		animaciones.EscapistRunR = false;
		
		return animaciones;
	}	
	
	//GET de las animaciones, que las devuelve en caso de estar creadas
	@CrossOrigin
	@GetMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Animations> getAnimations(){
		Animations savedanimaciones = animaciones;
		
		if(savedanimaciones != null) {
			return new ResponseEntity<>(savedanimaciones, HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	//actualizamos las animaciones con un JSON que recibe del cliente
	@CrossOrigin
	@PutMapping
	public ResponseEntity<Animations> updateAnimaciones(@RequestBody Animations GameTraps){
		Animations savedtrampas = animaciones;
		if(savedtrampas != null) {
			animaciones.ChaserIdle = GameTraps.ChaserIdle;
			animaciones.EscapistIdle = GameTraps.EscapistIdle;
			animaciones.ChaserJump = GameTraps.ChaserJump;
			animaciones.ChaserRunL = GameTraps.ChaserRunL;
			animaciones.ChaserRunR = GameTraps.ChaserRunR;
			animaciones.EscapistJump = GameTraps.EscapistJump;
			animaciones.EscapistRunL = GameTraps.EscapistRunL;
			animaciones.EscapistRunR = GameTraps.EscapistRunR;
			return new ResponseEntity<>(animaciones, HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
