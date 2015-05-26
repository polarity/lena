ig.module('game.entities.dead').requires('impact.entity').defines(function(){

    EntityDead = ig.Entity.extend({
        collides: ig.Entity.COLLIDES.PASSIVE,
        checkAgainst: ig.Entity.TYPE.A,
        type: ig.Entity.TYPE.NONE, // is enemy
        size: {x: 16, y: 16},
        _wmScalable: true,
        _wmDrawBox: true,
        _wmBoxColor: 'rgba(196, 255, 0, 0.7)',

        init: function( x, y, settings ) {
            // Call the parent constructor
            this.parent( x, y, settings );
        },

        check: function(other, axis) {
            // kill the player on collide
            other.kill();
        }
    });

});