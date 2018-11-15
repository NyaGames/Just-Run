package NyaGames.Just_Run;

public class Chaser {
	private int puntuacion;
	private int posicionX;
	private int posicionY;
	
	Chaser(){
		
	}
	public int getPosicionX() {
		return posicionX;
	}
	
	public void setPosicionX(int posicion) {
		posicionX = posicion;
	}
	public int getPosicionY() {
		return posicionY;
	}
	public void setPosicionY(int posicion) {
		posicionY = posicion;
	}
	public int getPuntuacion() {
		return puntuacion;
	}
	public void setPuntuacion(int p) {
		puntuacion = p;
	}
}
