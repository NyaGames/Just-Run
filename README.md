# Just-Run   

Este es el documento de diseño de _Just Run_, un videojuego de PC desarrollado para la asignatura de Juegos en Red con objetivo de crear un producto original y de calidad con lo aprendido en dicha asignatura.

# 1. Introducción

		1.1. Concepto de juego

Just Run es un videojuego PvP de 1v1 en 2D, de vista lateral; en el cuál cada jugador controla cada uno de los corredores, 
uno de ellos actúa como perseguidor y el otro tiene el papel de escapista. 

Durante las diversas rondas, el perseguidor tiene el deber de alcanzar al escapista, y este último 
de evitarlo haciendo uso de todos los medios a su alcance.

El juego estará dividido en varias rondas, cada una tendrá una temática diferente, sin embargo, el objetivo no cambia y hay
que alcanzar al escapista. El perseguidor dispondrá de 60 segundos por ronda para alcanzar al escapista, pero no será tarea fácil,
ya que el escapista tendrá a su disposición diferentes medios y trampas para lograr huir.  
Al finalizar la ronda, ya sea pasados los 60 segundos o capturado el escapista, se le otorgará al perseguidor una puntuación en 
función de la velocidad que haya tardado en capturarlo. Al finalizar las rondas, se lo sumará toda la puntuación y se intercambiarán
los roles, el perseguidor se convertirá en escapista y viceversa.  
Al finalizar estas últimas rondas, el jugador con más puntuación obtendrá un punto de victoria. El jugador que obtenga dos puntos
de victoria ganará la partida.

		1.2. Características principales

El juego se basa en los siguientes pilares:

 - **Velocidad:** el planteamiento principal del juego se centra en que se desarrolle a una velocidad alta, es decir, pantallas cortas con personajes que se mueven rápido, de tal forma que se cree una tensión explosiva y en cierta medida un subidón de adrenalina.

 - **Variedad:** el uso de varias pantallas fomenta la inclusión de mecánicas nuevas que mantienen la experiencia de juego fresca y evita el tedio.
 
 - **Ampliación:** _Just Run_ es ampliable con la inclusión de nuevos mapas y nuevas trampas, e incluso con diversos personajes con 
 diferentes estadísticas.

		1.3. Género
	
_Just Run_ no embarca en un único género, sino que reúne conceptos de varios, a destacar:

- **Plataformas:** la habilidad de escalar, saltar y rodar es principal en _Just Run_, actuando como núcleo de su experiencia jugable.

- **Acción:** la tensión y el sentimiento de urgencia por lograr tu objetivo son las principales sensaciones que se buscan recrear. A parte de lógicamente el conflicto creado por el juego del “Gato y el Ratón”.

		1.4. Propósito y publico objetivo
	
El objetivo de _Just Run_ es ofrecer un entorno de posibilidades dinámico y divertido donde disfrutar de enfrentamientos frenéticos con amigos, familiares, incluso con personas de otros paises. Teniendo en cuenta esto, _Just Run_ se encuentra dirigido a un amplio espectro de jugadores, ya que no es necesario tener muchos conocimientos sobre la industria para disfrutar de él y tampoco poseerá contenidos sensibles.

		1.5. Estilo visual
		
_Just Run_ tiene un estilo visual sencillo, colores planos y brillantes para los personajes con formas simples y un estilo _Pixel Art_ de colores menos saturados para el fondo. Esta elección de colores ayuda a que los jugadores sepan donde se encuentran en todo momento.
	
		1.6. Alcance
		
_Just Run_ será facilmente ampliable con nuevo contenido tras lanzar un paquete básico con todas las mecanicas básicas incluidas y probadas.

# 2. Mecánicas

		2.1 Jugabilidad
		
Cada pantalla de Just Run ofrece una localización diferente en la que saltar y brincar. El perseguidor tiene que alcanzar al escapista en un tiempo limitado, premiando la velocidad. Para ello nos valdremos de los siguientes elementos:

Para mejorar la jugabilidad en el escenario, encontraremos diversos elementos repartidos por los diferentes niveles,
que variarán en función del nivel en el que nos encontremos.  
Los niveles estarán formados por varios pisos de plataformas en los cuales ambos jugadores pueden saltar, también 
encontraremos otros elementos donde los jugadores tendrás que pasar rodando por debajo, además para facilitar el trabajo
del escapista, habrá bloques y lugares en el escenario que el perseguidor no podrá atravesar.  
Hay elementos que ayudan a la fluidez del movimiento por el escenario, haciendo el juego mas dinámico y 
frenético; algunos de esos elementos son ráfagas de aire o un flujo de burbujas que lanzarán a los jugadores al aire
permitiendolos alcanzar las plataformas más altas para facilitar tanto el escape como la captura al escapista.
		
		2.2 Flujo de juego
		
Al iniciar el juego se abre una pantalla principal donde se pueden acceder a los diversos modos de juego, en este caso local y online, a los créditos de los desarrolladores, las opciones del juego y salir al escritorio.
		
Al iniciar una partida, ya sea en multijugador local como online, uno de los dos jugadores será el escapista mientras que el otro será el perseguidor. Cada partida durá hasta que el primer jugador obtenga dos puntos de victoria; para obtener un punto de victoria, se jugarán 2 rondas y cada ronda estará formada de 5 niveles con temáticas y estilos diferentes. Los diferentes niveles vienen dados por las siguiente temáticas:

- **Nieve**: Los jugadores se encontrarán en un lugar donde predomina el frio y las bajas temperaturas, lo que permite el hábitat de fauna típica de este clima como los pingüinos. Esté nivel permitirá el uso de trampas como el lanzamiento de bolas de nieve o utilizar las aguas heladas para realentizar al enemigo. ¡Cuidado con las avalanchas!

<p align="center">
  <img src="https://github.com/NyaGames/Just-Run/blob/master/images/dise%C3%B1o_nevado.png">
</p>

- **Castillo**: Los jugadores en este nivel se encontrarán en el interior de un castillo, lo que facilitará el uso de trampas punzantes y afiladas, pero no todo son trampas si no que también se celebran justas medievales.¡Aguanta el portón!

- **Mar**: Los jugadores se encuentrán bajo el agua y pelearán conjuntamente con diferentes tipos de peces, en este hábitat donde viven los corales encontraremos numerosos peligros y trampas.¡No mordais el anzuelo!

- **Desierto**: Nos encontramos en el desierto del lejado oeste, donde el paisaje es árido y las únicas vistas de las que dispondremos serán arena, puntiagudos cactus y plantas rodantes.¡A lo mejor os encontrais con algún vaquero famoso!

- **Volcán:** En este entorno en el que se encuentran los jugadores, el cielo estará cubierto de ceniza y polvo,¡el volcán va a erupcionar!, los jugadores deberán tener cuidado con las rocas que caen del cielo pero sin olvidar donde pisan.
		
		2.3 Sistema de puntuación
	
En la primera ronda, los jugadores pasarán por cinco niveles diferentes, cada uno con una temática diferentes, a su vez, con diferentes trampas y peligros. Cada nivel durará 60 segundos, que es el tiempo que tendrá el perseguidor para capturar al escapista. Cuanto más rápido lo capture, mayor puntuación obtendrá. Al principio de cada nivel de juego, el escapista comenzará con una puntuación de 6000 puntos que se irá restando poco a poco a medida que pasan los segundos hasta que llegue a 0 que será pasado los 60 segundos.  

Después de los cinco niveles, comenzará la segunda ronda, en la cuál el escapista se convertirá en perseguidor y viceversa. Se jugarán los 5  niveles de nuevo y este segundo conseguirá su propia puntuación. Se realizará la suma de la puntuaciones de los cinco niveles y se obtendrá una puntuación total que se comparará con la suma total de su rival y el jugador que obtenga mayor puntuación obtendrá un punto de victoria; se resetearán las puntuaciones y se volverán a jugar las dos rondas. El primer jugador en obtener dos puntos de victoria, ganará la partida.
		
		2.4 Trampas
		
En los diversos niveles de juego se introducen diversas trampas que el escapista podrá activar a su gusto con el objetivo de dificultar el trabajo de su perseguidor. 

- **Trampas rodantes:** El escapista podrá activar un objeto o personaje que recorrerá el nivel de punta a punta en horizontal a ras de suelo, de tal forma que el perseguidor tenga que saltar por encima de la trampa. Ejemplo: un bola de nieve o un caballero que carga.

- **Proyectiles laterales:** Al activarla objetos pequeños apareceran a varias alturas en momentos alternativos de tal forma que el perseguidor tenga que esquivarlos. Ejemplo: balas de un vaquero o flechas.

- **Objetos en caida vertical:** Diversos objetos caen de la parte superior del mapa entorpeciendo el movimiento del perseguidor. Ejemplo: meteoritos que caen o anclas que lanza un barco.

- **Trampas colgantes:** Objetos que atrapan al perseguidor impidiendo su movimiento durante un tiempo limitado. Ejemplo: Remolino de agua.

- **Terreno abrupto:** En algunos mapas, el suelo se abre o aparece algo que impide el normal movimiento, de tal forma que el perseguidor tiene que saltarlo o esquivarlo. Ejemplo: Arenas modevizas o ruptura en el suelo.

		2.5 Movimiento y físicas
		
Al ser un juego de scroll lateral, toda la acción del juego se produce en un solo plano donde tanto objetos como personajes se mueven libremente. En el propio escenario habrá objetos que no se puedan atravesar, otros que se puedan atravesar libremente y otros que producen una variación en el movimiento de los jugadores.

Toda la física del juego se aleja de la realista al no respetar fundamentos básicos como el momento lineal. Sin embargo, si que se producen colisiones entre escenario, personaje y objetos.
		
		2.6 Controles

Para moverme por los menús, tanto en el menú principal como en el menú de pausa, se utilizará el ratón y se utilizará el click izquierdo del ratón para seleccionar los botones entre las diferentes posibilidades.  
  
Dentro de la partida los controles serán:
1. Jugador 1:  
- *A y D*, para moverse a la **izquierda** y **derecha** respectivamente.
- *W/Barra Espaciadora*, para **saltar**.
- *S/Shift*, para **rodar**.
  
2. Jugador 2:  
- *Flecha izquierda/derecha*, para moverse a la **izquierda** y **derecha**.
- *Flecha hacia arriba*, para **saltar**.
- *Flecha hacia abajo/Ctrl Derecho*, para **rodar**.
  
# 3. Interfaz
		3.1 Diagrama de flujo
				
		
<p align="center">
  <img src="https://github.com/NyaGames/Just-Run/blob/master/images/Diagrama%20de%20Flujo.jpg">
</p>	
		
_Diagrama de Flujo del Menú Principal_

El juego se divide en una serie de escenas, empeznado por la pantalla principal, donde seleccionar en el menú que quiere hacer a continuación, procediendo a una pantalla de escena para la siguiente escena, y así sucesivamente.
  
  <p align="center">
  <img src="https://github.com/NyaGames/Just-Run/blob/master/images/Diagrama%20de%20Flujo2.jpg">
</p>	
		
_Diagrama de Flujo del Menú de Pausa_
  

		3.2 Menú principal
		
En el menú principal de "Just Run" nos encontraremos varios elementos, entre ellos el título del videojuegos, que estará acompañado por varios botones; los cuales nos permiten acceder a los distintos submenús, y a los diversos modos de juego.

- **Jugar**: El botón jugar nos permite acceder a un submenú, él cual nos permite acceder a dos modos de juego distintos. "Con Amigos" nos permite crear una partida con nombre y contraseña, a la cual se podrá unir cualquier persona que conozca esta última."Online" nos permitirá empezar una partida con una persona desconocida de habilidad similar de cara a que el encuentro sea lo más interesante y excitante posible. Esto se consigue con un sistema de _Matchmaking_ que juntara a los jugadores por parejas en función de un valor numérico que estima su habilidad en el juego. Este valor numérico se verá modificado en función de las partidas ganadas y perdidas.

<p align="center">
  <img src="https://github.com/NyaGames/Just-Run/blob/master/images/pantalla%20de%20carga.jpeg">
</p>

_Pantalla de carga de búsqueda de partida_

- **Opciones**: Nos permite acceder a las opciones de video y audio del juego para modificar volumenes y demás parámetros.

- **Créditos**: Abre un submenú donde aparecen los responsables de los distintos elementos del juego, gráficos, sonido, diseño etc.

- **Salir**: Cierra la pestaña del navegador.

Todos los submenús tienen un botón que nos permite acceder de nuevo al menú principal.
		
<p align="center">
  <img src="https://github.com/NyaGames/Just-Run/blob/master/images/interfaz%20prueba.jpg">
</p>
	
_Interfaz Menú Principal_
  
En cualquier momento de la partida, se podrá pulsar el botón "escape" del teclado con el que se abrirá el menú de pausa en el que encontraremos tres botones:
- **Reanudar**: Se vuelve a la partida con normalidad.

- **Opciones**: Nos permite acceder a las opciones de video y audio del juego para modificar volumenes y demás parámetros.

- **Salir**: Volvemos al menú principal, abandonando la partida actual.
  
<p align="center">
  <img src="https://github.com/NyaGames/Just-Run/blob/master/images/PausaAmpliado.jpg">
</p>
_Interfaz del Menú de Pausa_
  

		3.3 Créditos
		
Tras pulsar en el botón de creditos del menú principal, se llevará a una pantalla nueva donde aparecen los nombres de los desarrolladores y un botón para volver al menú principal.
		
		3.4 Niveles y rondas

Dentro de los niveles la interfaz es minima, simplemente habrá representación gráfica para el contador de puntuación. Además de esto, para la pantalla del perseguidor habrá un contador de enfriamiento de la diversas trampas.
		
# 4. Arte

_Just Run_ debe tener un arte que fomenté la tensión y la velocidad, además de ayudar al jugador a identificar las cosas que puede utilizar de las que no. Para ello se parte de una paleta de colores brillantes y saturados para los personajes y lo que va a estar en primer plano, y se usa otra paleta más apagada para lo que va a estar al fondo o no va a ser interactuable. Esto tambien ayuda a dar la sensación de profundidad.

		4.1 Arte 2D
		
Como ya se ha indicado anteriormente, _Just Run_ es un juego en scroll lateral 2D, lo que significa que todo el apartado visual se encuentra en dos dimensiones. Con este objetivo se utilizaran dos estilos artísticos principalmente el _Pixel Art_ y el estilo vectorial.

El _Pixel Art_ se utilizara principalmente para los fondos y los objetos del escenario con el objetivo de conseguir una mayor cantidad de detalle y de sentar una importante diferencia de estilo con los personajes. Esto ayuda a que los jugadores sepan en todo momento donde estan sus avatares.
		
<p align="center">
  <img src="https://github.com/NyaGames/Just-Run/blob/master/images/fondo%201.png">
</p>	

A parte de esta diferencia de estilo, se usarán dos paletas distintas para personajes y escenarios, una más brillante para los personajes y otra más apagada para los escenarios.

		4.2 Audio

Se usará una música estilo _Chiptune_ para aderezar la experiencia jugable. Toda la música del juego se introducirá en formato _.mp3_ o en _.ogg_, al igual que los efectos de sonido necesarios. Entre estos elementos de audio destacan las músicas de cada pantalla, o los efectos de sonido de caida, de corte, etc.

https://soundcloud.com/jusi-production/pantalla-inicio/s-gVslQ

Integrantes:  
        - Diego Sánchez Ramírez                 d.sanchezr.2016@alumnos.urjc.es  
        - Jaime Rodríguez Aguado                j.rodriguezag.2016@alumnos.urjc.es
        
https://trello.com/b/rwEZNWxG/just-run
