package NyaGames.Just_Run;
public class Chaser {
	//parametros propios del Chaser con sus setters y getters
	private String ID;
	private int puntuacion;
	private int posicionX;
	private int posicionY;
	
	Chaser(){
		
	}
	public String getID() {
		return ID;
	}
	public void setID() {
		ID = "Chaser";
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
