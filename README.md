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

		1.5. Jugabilidad

Cada pantalla de Just Run ofrece una localización diferente en la que saltar y brincar. El perseguidor tiene que alcanzar al escapista en un tiempo limitado, premiando la velocidad. Para ello nos valdremos de los siguientes elementos:

		1.6. Estilo visual
		
_Just Run_ tiene un estilo visual sencillo, colores planos y brillantes para los personajes con formas simples y un estilo _Pixel Art_ de colores menos saturados para el fondo. Esta elección de colores ayuda a que los jugadores sepan donde se encuentran en todo momento.
	
		1.7. Alcance
		
_Just Run_ será facilmente ampliable con nuevo contenido tras lanzar un paquete básico con todas las mecanicas básicas incluidas y probadas.

# 2. Mecanicas
		2.1 Jugabilidad
		
		2.2 Flujo de juego
		
		2.3 Sistema de puntuación
	
En la primera ronda, los jugadores pasarán por cinco niveles diferentes, cada uno con una temática diferentes, a su vez, con diferentes trampas y peligros. Cada nivel durará 60 segundos, que es el tiempo que tendrá el perseguidor para capturar al escapista. Cuanto más rápido lo capture, mayor puntuación obtendrá. Al principio de cada nivel de juego, el escapista comenzará con una puntuación de 6000 puntos que se irá restando poco a poco a medida que pasan los segundos hasta que llegue a 0 que será pasado los 60 segundos.  Después de los cinco niveles, comenzará la segunda ronda, en la cuál el escapista se convertirá en perseguidor y viceversa. Se jugarán los 5  niveles de nuevo y este segundo conseguirá su propia puntuación. Se realizará la suma de la puntuaciones de los cinco niveles y se obtendrá una puntuación total que se comparará con la suma total de su rival y el jugador que obtenga mayor puntuación obtendrá un punto de victoria; se resetearán las puntuaciones y se volverán a jugar las dos rondas. El primer jugador en obtener dos puntos de victoria, ganará la partida.
		
		2.3 Trampas
		
		2.4 Movimiento y físicas
		
		2.5 Controles
		
# 3. Interfaz
		3.1 Diagrama de flujo
		
		3.2 Menú principal
		
En el menú principal de "Just Run" nos encontraremos varios elementos, entre ellos el título del videojuegos, que estará acompañado por varios botones; el primero de ellos será el botón para Jugar y por otra parte tenemos el botón para salir del juego y volver
al escritorio. No obstante, en la esquina inferior derecha de la pantalla encontraremos un engranaje que nos llevará al apartado de opciones. Todos estos elementos estarán situados sobre un fondo en el se encontrarán diferentes islas que se corresponden con los diferentes niveles del videojuegos.
		
		3.3 Créditos
		
		3.4 Niveles y rondas
		
# 4. Arte
		4.1 Arte 2D
		
		4.2 Audio

Integrantes:
        - Diego Sánchez Ramírez                 d.sanchezr.2016@alumnos.urjc.es
        - Jaime Rodríguez Aguado                j.rodriguezag.2016@alumnos.urjc.es
        
https://trello.com/b/rwEZNWxG/just-run
