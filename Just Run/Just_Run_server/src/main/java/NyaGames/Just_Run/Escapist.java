package NyaGames.Just_Run;

public class Escapist {
	private String ID;
	private int puntuacion;
	private int posicionX;
	private int posicionY;
	private boolean IPressed;
	private boolean OPressed;
	private boolean PPressed;
	
	Escapist(){
		
	}
	public String getID() {
		return ID;
	}
	public void setID() {
		ID = "Escapist";
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
	public boolean getIPressed() {
		return IPressed;
	}
	public void setIPressed(boolean iPressed) {
		IPressed = iPressed;
	}
	public void setOPressed(boolean oPressed) {
		OPressed = oPressed;
	}
	public boolean getPPressed() {
		return PPressed;
	}
	public void setPPressed(boolean pPressed) {
		PPressed = pPressed;
	}
	public boolean getOPressed() {
		return OPressed;
	}
}
