var mooDooSLS = new Class({
  Implements: [Events, Options],

  options: {
    frameTime: 1000,
    transitionTime: 500,
    transitionDelay: 200,

    autoplay:true,
    delayAutoplay: 1000,

    repeat:true,
    random: false,
    indexFirstImg: 0,
    framesParentNode: 'moodoo-sls'
  },

  // Constructor
  initialize: function($node_id, options){
    // Seteamos elementos de la clase.
    this.setOptions(options);

    // Configuracion Inicial de Clase
    this.nodeContainer = $node_id ? $($node_id) : $(this.options.framesParentNode);
    this.configuracionInicial();

    if (this.options.autoplay) {
      (function() {
        this.play()
      }).delay (this.options.delayAutoplay, this);
    }
  },

  configuracionInicial: function () {
    // Referencia de nodos
    this.childrenNodes=this.nodeContainer.getChildren();

    this.nodeN0 = this.childrenNodes[0];
    this.nodeN1 = this.childrenNodes[1];

    this.childrenNodes.setStyles({
      opacity: 0
    });

    this.childrenNodes[0].setStyles({
      opacity: 1
    });

    this.fxN0 = new Fx.Morph(this.nodeN0, {
      duration: this.options.transitionTime,
      onComplete:function(el){
        this.fxN0.index= (this.fxN0.index+1 > this.childrenNodes.length-1) ? (this.fxN0.index+1-this.childrenNodes.length) : (this.fxN0.index+1);
        this.fxN0.element=this.childrenNodes[this.fxN0.index];
        this.fxN0.subject=this.childrenNodes[this.fxN0.index];

        (function(){
          this.fxN0.start({
            opacity: [1, 0]
          });
          this.fxN0.element.setStyles({
            'z-index': 0
          })
        }).delay (this.options.frameTime, this);

      }.bind(this)
    });
    this.fxN0.index=0;


    this.fxN1 = new Fx.Morph(this.nodeN1,{
      duration:this.options.transitionTime,
      onComplete:function(el){
        this.fxN1.index = (this.fxN1.index+1 > this.childrenNodes.length-1) ? (this.fxN1.index+1-this.childrenNodes.length) : (this.fxN1.index+1);
        this.fxN1.element=this.childrenNodes[this.fxN1.index];
        this.fxN1.subject=this.childrenNodes[this.fxN1.index];

        // Disparamos el segundo efecto con un delay
        (function(){
          this.fxN1.start({
            opacity: [0, 1]
          });
          this.fxN1.element.setStyles({
            'z-index': 1000
          })
        }).delay (this.options.frameTime, this);

				
      }.bind(this)
    });
    this.fxN1.index=1;
  },

  play:function() {

    (function(){
      this.fxN0.start({
        opacity: [1, 0]
      });
    }).delay (this.options.transitionDelay, this);

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
    this.fxN0.pause();
    this.fxN1.pause();
  }
});