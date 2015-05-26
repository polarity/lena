ig.module('game.entities.lena').requires('impact.entity').defines(function(){

	// Create your own entity, subclassed from ig.Enitity
	EntityLena = ig.Entity.extend({

		// Set some of the properties
		collides: ig.Entity.COLLIDES.ACTIVE,
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.B,
		gravityFactor: 4,
		size: {x: 16, y: 16},
		friction: {x: 400, y:0},
		health: 50,
		maxVel: {y: 300, x: 100},
		animSheet: new ig.AnimationSheet( 'media/sprite_lena.gif', 20, 20 ),
		sound: {
			jump:  new ig.Sound( 'media/sound/jump.mp3' ),
			kill:  new ig.Sound( 'media/sound/kill.mp3' ),
			kaputt:  new ig.Sound( 'media/sound/kaputt.mp3' )
		},

		init: function( x, y, settings ) {

			// Add animations for the animation sheet
			this.addAnim( 'idle', 0.1, [0] );
			this.addAnim( 'jump', 0.5, [2,1] );
			this.addAnim( 'run', 0.1, [0,1,2,1] );

			// Call the parent constructor
			this.parent( x, y, settings );
		},

		update: function() {
			// This method is called for every frame on each entity.
			// React to input, or compute the entity's AI here.
			if(this.standing){
				this.currentAnim = this.anims.idle;
			}

			// in the air
			if(!this.standing){
				this.currentAnim = this.anims.jump;
			}

			// jump when player is on the ground
			if( ig.input.pressed('jump') && this.standing) {
				this.sound.jump.play();
				this.vel.y = -210;
			}

			if( ig.input.state('right') ) {
				this.accel.x = 600;
				this.flipX = 0;
				// "run" animation only when not jumping
				if(this.standing){
					this.currentAnim = this.anims.run;
				}
			}
			else if( ig.input.state('left') ) {
				this.accel.x = -600;
				this.flipX = 1;
				// "run" animation only when not jumping
				if(this.standing){
					this.currentAnim = this.anims.run;
				}
			}
			else {
				this.accel.x = 0;
			}

			this.currentAnim.flip.x = this.flipX;

			// Call the parent update() method to move the entity
			// according to its physics
			this.parent();
		},

		// Collision with other sprites
		collideWith: function(object, axis){
			// kill the player when collide with enemy
			if((object.type == 2 && axis == "x")){
				this.kill();
			}

			// kill the enemy
			if(object.type == 2 && axis == "y"){
				object.kill();
				this.sound.kaputt.play();
			}
		},

		kill: function(){
			ig.game.lives = ig.game.lives-1;
			this.sound.kill.play();
			this.parent();
			ig.game.startAgain();
		}

	});

});