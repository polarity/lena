ig.module('game.entities.goal').requires('impact.entity').defines(function(){

    EntityGoal = ig.Entity.extend({
        checkAgainst: ig.Entity.TYPE.A,
        size: {x: 16, y: 16},

        _wmScalable: true,
        _wmDrawBox: true,
        _wmBoxColor: 'rgba(196, 255, 0, 0.7)',

        init: function( x, y, settings ) {
            // Call the parent constructor
            this.parent( x, y, settings );
        },
        check: function( other, axis ){
            // next Level
            ig.game.nextLevel();
        }
    });

});