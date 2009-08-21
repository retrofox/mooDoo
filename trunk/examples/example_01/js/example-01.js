window.addEvent ('domready', function (){
  $imagenes = $('moodoo-sls').getChildren();
  $imagenes.each (function ($picture, $iP) {
    $picture.setStyles ({
      'background-position': $iP*(-390).toString()+ 'px top'
    });
  });

  window.addEvent ('load', function (){
    new mooDooSLS ('moodoo-sls');
  });
});