ig.module('game.entities.enemy1').requires('impact.entity').defines(function(){

	// Create your own entity, subclassed from ig.Enitity
	EntityEnemy1 = ig.Entity.extend({

		// Set some of the properties
		collides: ig.Entity.COLLIDES.PASSIVE,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		gravityFactor: 4,
		size: {x: 16, y: 16},
		friction: {x: 400, y:0},
		health: 50,
		maxVel: {y: 300, x: 100},
		direction: "left",

		// Load an animation sheet
		animSheet: new ig.AnimationSheet( 'media/sprite_enemy1.gif', 16, 16 ),

		init: function( x, y, settings ) {

			// Add animations for the animation sheet
			this.addAnim( 'run', 0.1, [0,1] );

			// Call the parent constructor
			this.parent( x, y, settings );
		},

		update: function() {
			// Call the parent update() method to move the entity
			// according to its physics
			this.parent();

			// set the current animation
			this.currentAnim = this.anims.run;

			// throw the sprite in this direction
			if(this.direction == "left"){
				this.vel.x = -30;
			} else {
				this.vel.x = 30;
			}
		},

		handleMovementTrace: function( res ) {
			// if this sprites collides on the
			// x level, then bounce it back
			if( res.collision.x ) {
				if(this.direction == "left"){
					this.direction = "right";
				} else {
					this.direction = "left";
				}
			}
			// Continue resolving the collision as normal
			this.parent(res);
		}

	});

});