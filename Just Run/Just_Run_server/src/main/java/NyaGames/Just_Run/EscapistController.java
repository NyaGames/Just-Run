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
		escapist.setIPressed(false);
		escapist.setOPressed(false);
		escapist.setPPressed(false);
		
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
			escapist.setPosicionX(GameEscapist.getPosicionX());
			escapist.setPosicionY(GameEscapist.getPosicionY());
			escapist.setPuntuacion(GameEscapist.getPuntuacion());
			escapist.setIPressed(GameEscapist.getIPressed());
			escapist.setOPressed(GameEscapist.getOPressed());
			escapist.setPPressed(GameEscapist.getPPressed());			
			return new ResponseEntity<>(escapist, HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping
	public ResponseEntity<Escapist> deleteEscapist(){
		Escapist savedescapist = escapist;
		if(savedescapist != null) {
			escapist = null;
			return new ResponseEntity<>(escapist, HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
}