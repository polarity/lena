ig.module('game.entities.star').requires('impact.entity').defines(function(){

	// Create your own entity, subclassed from ig.Enitity
	EntityStar = ig.Entity.extend({

		// Set some of the properties

		// dont collide with anything moving
		collides: ig.Entity.COLLIDES.NONE,

		// the star is friendly, look at this smiley :)
		type: ig.Entity.TYPE.A,

		// check if this entity type is overlapping
		checkAgainst: ig.Entity.TYPE.A,

		gravityFactor: 0,
		size: {x: 16, y: 16},
		friction: {x: 400, y:0},
		health: 50,
		maxVel: {y: 300, x: 100},
		direction: "left",

		// load the starkill sound
		killSound: new ig.Sound( 'media/sound/star.mp3', false ),

		// Load an animation sheet
		animSheet: new ig.AnimationSheet( 'media/sprite_star.gif', 16, 16 ),

		init: function( x, y, settings ) {

			// Add animations for the animation sheet
			this.addAnim( 'shine', 0.1, [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2] );

			// Call the parent constructor
			this.parent( x, y, settings );
		},

		update: function() {
			// Call the parent update() method to move the entity
			// according to its physics
			this.parent();

			// set the current animation
			this.currentAnim = this.anims.shine;

		},

		check: function( other ){
			ig.game.stars = ig.game.stars +1;
			this.killSound.play();
			this.kill();
		}

	});

});