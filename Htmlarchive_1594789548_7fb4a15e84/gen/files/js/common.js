$('#_biggify').on('click', function() {
  var fontSize = $('p,span,li,span.txt').css('font-size');
  var newFontSize = parseInt(fontSize)+2;

  $('p,span,li,span.txt,span.fathiha').css('font-size', newFontSize+'px')
})

$('#_smallify').on('click', function() {
  var fontSize = $('p,span,li,span.txt').css('font-size');
  var newFontSize = parseInt(fontSize)-2;

  $('p,span,li,span.txt').css('font-size', newFontSize+'px')
})

     var counter = 0;
    var a = 0;
    var add = function(valueToAdd){
        a += valueToAdd;
        document.getElementById('Value').innerHTML = a;
        }

           var reset= function(){
    a = 0;
    document.getElementById('Value').innerHTML = a;
    }



$(document).ready(function(){
  $("#hide").click(function(){
    $("#zoom").hide();
     $("#bottom-opt").show();
 });
   $("#hide-co").click(function(){
    $("#counter").hide();
     $("#bottom-opt").show();
 });

 $("#hide-au").click(function(){
    $("#audio1").hide();
     $("#bottom-opt").show();
 });
  $("#show-zo").click(function(){
    $("#zoom").show();
    $("#bottom-opt").hide();
  });

  $("#show-co").click(function(){
    $("#counter").show();
    $("#bottom-opt").hide();
  });

  $("#show-au").click(function(){
    $("#audio1").show();
    $("#bottom-opt").hide();
  });

 $("#showdivs").click(function(e){
          $('#previewBox').toggle(500);
            setTimeout(function(e){
                $("#previewBox").fadeOut();
            }, 6000);
        });

});


/*---Switch--*/
$('input.night-input').on('change', function() {
    $('body').toggleClass('light');
});


$(document).ready(function() {
    $('#closeButton').on('click', function(e) {
        $('#previewBox').remove();
    });
});
