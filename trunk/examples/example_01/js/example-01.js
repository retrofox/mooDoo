window.addEvent ('domready', function (){
  $imagenes = $('moodoo-sls').getChildren();
  $imagenes.each (function ($picture, $iP) {
    $picture.setStyles ({
      left: $iP*50,
      'background-position': $iP*(-390).toString()+ 'px top'
    });
  });

    new mooDooSLS ('moodoo-sls');
});