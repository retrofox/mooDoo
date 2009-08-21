 
var mooDooSLS = new Class({
  Implements: [Events, Options],
    
  options: {
    transitionTime: 3000,
    autoplay:true,
    repeat:true,
    random: false,
    indexFirstImg: 0,
    framesNode: 'moodoo-sls'
  },
    
  // Constructor
  initialize: function(id_nodo, options){
    // Seteamos elementos de la clase.
    this.setOptions(options);
    // Configuracion Inicial de Clase
    this.configuracionInicial();

    if (this.options.autoplay) {
      (function() {
        this.play()
      }).delay (1000, this);
    }
  },
	
  configuracionInicial: function () {
    this.nodeContainer = $(this.options.framesNode);

    this.images=this.nodeContainer.getChildren();
    this.imageN = this.images[0];
    this.imageN1 = this.images[1];
    this.images.setStyles({
      opacity: 0
    });
		
    this.images[0].setStyles({
      opacity: 1
    });

    this.fxN = new Fx.Morph(this.imageN, {
      duration: this.options.transitionTime,
      onComplete:function(el){
        this.fxN.index= (this.fxN.index+1 > this.images.length-1) ? (this.fxN.index+1-this.images.length) : (this.fxN.index+1);
        this.fxN.element=this.images[this.fxN.index];
        this.fxN.subject=this.images[this.fxN.index];

        (function(){
          this.fxN.start({
            opacity: [1, 0]
          });
          this.fxN.element.setStyles({
            'z-index': 0
          })
        }).delay (2000, this);

      }.bind(this)
    });
    this.fxN.index=0;
		
    this.fxN1 = new Fx.Morph(this.imageN1,{
      duration:this.options.transitionTime,
      onComplete:function(el){
        this.fxN1.index = (this.fxN1.index+1 > this.images.length-1) ? (this.fxN1.index+1-this.images.length) : (this.fxN1.index+1);
        this.fxN1.element=this.images[this.fxN1.index];
        this.fxN1.subject=this.images[this.fxN1.index];

        (function(){
          this.fxN1.start({
            opacity: [0, 1]
          });
          this.fxN1.element.setStyles({
            'z-index': 1000
          })
        }).delay (2000, this);

				
      }.bind(this)
    });
    this.fxN1.index=1;
  },
	
  play:function(){

    this.fxN.start({
      opacity: [1, 0]
    });

    this.fxN1.start({
      opacity: [0, 1]
    });
  },

  stop:function(){
		
  },
  endFxAnimation:function(){
    this.play();
  },
  pause: function () {
    this.fxN.pause();
    this.fxN1.pause();
  }
});
