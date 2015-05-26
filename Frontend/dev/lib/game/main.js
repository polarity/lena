ig.module('game.main').requires(
	'impact.game',
	'impact.font',
	'game.camera',
	'game.entities.lena',
	'game.entities.enemy1',
	'game.entities.star',
	'game.entities.goal',
	'game.entities.dead',
	'game.levels.start',
	'game.levels.world1',
	'game.levels.world2',
	'game.levels.world3'
).defines(function(){

	/*
	 * defined Lena Game
	 */
	LenaGame = ig.Game.extend({
		lives: 3,
		stars: 0,
		level: 1,
		levels: 3,
		MusicLevel1:  new ig.Sound( 'media/music/Lena1.mp3', false ),
		MusicLevel2:  new ig.Sound( 'media/music/Lena2.mp3', false ),
		MusicLevel3:  new ig.Sound( 'media/music/Lena3.mp3', false ),

		init: function() {

			// create new camera
			this.camera = new Camera( ig.system.width/4, ig.system.height/3, 5 );
			this.camera.trap.size.x = ig.system.width/10;
			this.camera.trap.size.y = ig.system.height/3;
			this.camera.lookAhead.x = ig.ua.mobile ? ig.system.width/6 : 0;

			// Initialize your game here; bind keys etc.
			ig.input.bind( ig.KEY.UP_ARROW, 'jump' );
			ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
			ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );

			ig.music.add(this.MusicLevel1, "Level1");
			ig.music.add(this.MusicLevel2, "Level2");
			ig.music.add(this.MusicLevel3, "Level3");

			// load font
			this.font = new ig.Font( 'media/font.png' );

			this.loadLevel( LevelWorld1 );

			this.gravity = 100;
		},

		// start the current level again
		startAgain: function(){
			this.loadLevel( window["LevelWorld"+this.level] );
		},

		// load the next level if available
		nextLevel: function(){
			// update the current level
			this.level = this.level + 1;
			// check if a new level there
			if(this.level > this.levels){
				// show startscreen again
				this.level = 1;
				ig.music.stop();
				ig.system.stopRunLoop();
				ig.system.clear('#fefefe');

				// start game
				ig.system.setGame(LenaStartScreen);
			} else {
				// load the new level
				this.loadLevel(window["LevelWorld"+this.level]);
			}
		},

		loadLevel: function(level){
			// call Parent method
			this.parent(level);
			// Load Music
			ig.music.play("Level"+this.level);

			// get the actul player
			this.player = this.getEntitiesByType( EntityLena )[0];

			// Set camera max and reposition trap
			this.camera.max.x = this.collisionMap.width * this.collisionMap.tilesize - ig.system.width;
			this.camera.max.y = this.collisionMap.height * this.collisionMap.tilesize - ig.system.height;
			this.camera.set( this.player );
		},
		update: function() {
			this.camera.follow( this.player );

			// Update all entities and backgroundMaps
			this.parent();

			if(this.lives === 0){
				this.lives = 3;
				this.stars = 0;
				ig.system.setGame(LenaStartScreen);
			}

			// Control Music
			if(ig.input.pressed('musicStartStop')){
				if(ig.music.volume == 1){
					ig.music.volume = 0.5
				} else if(ig.music.volume == 0.5){
					ig.music.volume = 0
				} else if(ig.music.volume == 0){
					ig.music.volume = 1
				}
			}
		},

		draw: function() {

			// Draw all entities and backgroundMaps
			this.parent();

			// Add your own drawing code here
			var x = ig.system.width/2,
				y = ig.system.height/2;

			// draw some text
			this.font.draw("LENA WANTS HOME", 10, 10);
			this.font.draw("Lives: "+this.lives, 10, 20);
			this.font.draw("Stars: "+this.stars, 10, 30);
		}
	});

	/*
	 * Splash Screen to start Lena :)
	 */
	LenaStartScreen = ig.Game.extend({

		font: new ig.Font( 'media/font.png' ),
		lenaPosition: {
			x: 0,
			y:210
		},
		bgmusic1:  new ig.Sound( 'media/music/Lena2.mp3', false ),

		init: function(){
			// create new camera
			this.camera = new Camera( ig.system.width/4, ig.system.height/3, 5 );
			this.camera.trap.size.x = ig.system.width/10;
			this.camera.trap.size.y = ig.system.height/3;
			this.camera.lookAhead.x = ig.ua.mobile ? ig.system.width/6 : 0;

			// subscribe event space bar
			ig.input.bind( ig.KEY.SPACE, "start");
			ig.input.bind( ig.KEY.M, "musicStartStop");

			// Music Control
			ig.music.loop = true;
			ig.music.add(this.bgmusic1, "Level0");
			ig.music.play("Level0");

			this.gravity = 100;
			this.loadLevel( LevelStart );
			this.player.vel.x = 100;
		},

		update: function(){
			this.camera.follow( this.player );
		
			// Update all entities and backgroundMaps
			this.parent();
			// watch for pressed space bar
			if(ig.input.pressed("start")){
				ig.music.stop();
				// start game
				ig.system.setGame(LenaGame);
			}

			// Control Music
			if(ig.input.pressed('musicStartStop')){
				if(ig.music.volume == 1){
					ig.music.volume = 0.5
				} else if(ig.music.volume == 0.5){
					ig.music.volume = 0
				} else if(ig.music.volume == 0){
					ig.music.volume = 1
				}
			}
		},

		draw: function(){
			this.parent();

			// draw some text
			this.font.draw("LENA WANTS HOME\nPress Space to Start!\n\n use your arrow keys to play", 160, 20, ig.Font.ALIGN.CENTER);
		},

		loadLevel: function(level) {
			// call Parent method
			this.parent(level);

			// get the actul player
			this.player = this.getEntitiesByType( EntityLena )[0];

			// Set camera max and reposition trap
			this.camera.max.x = this.collisionMap.width * this.collisionMap.tilesize - ig.system.width;
			this.camera.max.y = this.collisionMap.height * this.collisionMap.tilesize - ig.system.height;
			this.camera.set( this.player );
		}
	});

	ig.Sound.channels = 10;
	// Start the Game with 60fps, a resolution of 320x240, scaled
	// up by a factor of 2
	ig.main( '#canvas', LenaStartScreen, 60, 320, 240, 2 );

});
