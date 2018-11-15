package NyaGames.Just_Run;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;


@RestController
@RequestMapping("/chaser")
public class ChaserController {
	Chaser chaser;
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Chaser createChaser() {
		chaser = new Chaser();
		
		chaser.setPosicionX(60);
		chaser.setPosicionY(300);
		chaser.setPuntuacion(0);
		
		return chaser;
	}	

	@GetMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Chaser> getChaser(){
		Chaser savedChaser = chaser;
		
		if(savedChaser != null) {
			return new ResponseEntity<>(savedChaser, HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping
	public ResponseEntity<Chaser> updateChaser(@RequestBody Chaser GameChaser){
		Chaser savedChaser = chaser;
		if(savedChaser != null) {
			chaser.setPosicionX(GameChaser.getPosicionX());
			chaser.setPosicionY(GameChaser.getPosicionY());
			chaser.setPuntuacion(GameChaser.getPuntuacion());
			return new ResponseEntity<>(chaser, HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping
	public ResponseEntity<Chaser> deleteChaser(){
		Chaser savedchaser = chaser;
		if(savedchaser != null) {
			chaser = null;
			return new ResponseEntity<>(chaser, HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
}
