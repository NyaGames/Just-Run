package NyaGames.Just_Run;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;


@RestController
@RequestMapping("/escapist")
public class EscapistController {
	Escapist escapist;
	@CrossOrigin
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Escapist createEscapist() {
		escapist = new Escapist();
		
		escapist.setID();
		escapist.setPosicionX(1000);
		escapist.setPosicionY(300);
		escapist.setPuntuacion(0);
		escapist.setCazado(false);
		return escapist;
	}	
	@CrossOrigin
	@GetMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Escapist> getEscapist(){
		Escapist savedescapist = escapist;
		
		if(savedescapist != null) {
			return new ResponseEntity<>(savedescapist, HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	@CrossOrigin
	@PutMapping
	public ResponseEntity<Escapist> updateEscapist(@RequestBody Escapist GameEscapist){
		Escapist savedescapist = escapist;
		if(savedescapist != null) {
			savedescapist.setPosicionX(GameEscapist.getPosicionX());
			savedescapist.setPosicionY(GameEscapist.getPosicionY());
			savedescapist.setPuntuacion(GameEscapist.getPuntuacion());
			savedescapist.setCazado(GameEscapist.getCazado());
			return new ResponseEntity<>(savedescapist, HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping
	public void deleteEscapist(@RequestBody int GameChaser){
		Escapist savedchaser = escapist;
		if(savedchaser != null) {
			escapist.setPosicionX(1000);
			escapist.setPosicionY(300);
			escapist.setPuntuacion(GameChaser);
			System.out.println(escapist.getPuntuacion());
	}
	}
	
}