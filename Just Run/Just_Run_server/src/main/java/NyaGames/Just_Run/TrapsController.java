package NyaGames.Just_Run;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/traps")
public class TrapsController {
	Traps trampas;
	@CrossOrigin
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Traps createTraps() {
		trampas = new Traps();
		
		trampas.setI(false);
		trampas.setO(false);
		trampas.setP(false);
		
		return trampas;
	}	
	@CrossOrigin
	@GetMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Traps> getTraps(){
		Traps savedtrampas = trampas;
		
		if(savedtrampas != null) {
			return new ResponseEntity<>(savedtrampas, HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	@CrossOrigin
	@PutMapping
	public ResponseEntity<Traps> updateTraps(@RequestBody Traps GameTraps){
		Traps savedtrampas = trampas;
		if(savedtrampas != null) {
			savedtrampas.setI(GameTraps.getI());
			savedtrampas.setO(GameTraps.getO());
			savedtrampas.setP(GameTraps.getP());
			return new ResponseEntity<>(savedtrampas, HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping
	public ResponseEntity<Traps> deleteTraps(){
		Traps savedtrampas = trampas;
		if(savedtrampas != null) {
			trampas = null;
			return new ResponseEntity<>(trampas, HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
}
