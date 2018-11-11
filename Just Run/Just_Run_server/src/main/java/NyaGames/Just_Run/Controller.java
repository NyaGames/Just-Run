package NyaGames.Just_Run;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
public class Controller{
	private int puntuacionEscapist = 0;
	private int puntuacionChaser = 0;
	
	@RequestMapping(value = "/puntuacionescapist", method = RequestMethod.POST)
	public void setPuntuacionEscapist() {
		puntuacionEscapist++;
	}
	@RequestMapping(value = "/puntuacionescapist", method = RequestMethod.GET)
	public ResponseEntity<Integer> getPuntacionEscapist() {
		return new ResponseEntity<Integer>(puntuacionEscapist, HttpStatus.CREATED);
	}
	@RequestMapping(value = "/puntuacioneschaser", method = RequestMethod.POST)
	public void setPuntuacionChaser() {
		puntuacionChaser++;
	}
	@RequestMapping(value = "/puntuacionchaser", method = RequestMethod.GET)
	public ResponseEntity<Integer> getPuntuacionChaser() {
		return new ResponseEntity<Integer>(puntuacionChaser, HttpStatus.CREATED);
	}
	
}