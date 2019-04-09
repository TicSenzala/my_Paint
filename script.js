$(document).ready(function(){
    var line = $('#Canvas')[0].getContext("2d");
    // Partie pour le crayon ----------------------------------------------------------------------------

    $('.pencil').click(function(){
        $('.pencil').addClass('active');
        $('.eraser').removeClass('active');
        $('.rectangle').removeClass('active');
        $('.circle').removeClass('active');
        $('.line').removeClass('active');
        $('.rectV').removeClass('active');
        $('.rectP').removeClass('active');
        $('.triangle').removeClass('active');
        $('.diff-circle').slideUp();
        $('.diff-rectangle').slideUp();
        $('#Canvas').mousedown(function(event){
            if($('.pencil').hasClass('active'))
            {
                var x = event.pageX;
                var y = event.pageY;

                paint = true;
                addClick(x, y);
                redraw();
            }
        });

        $('#Canvas').mousemove(function(event){
            if($('.pencil').hasClass('active'))
            {
                if(paint)
                {
                    addClick(event.pageX, event.pageY, true);
                    redraw();
                }
            }
        });

        $('#Canvas').mouseup(function(event){
            if($('.pencil').hasClass('active'))
            {
                paint = false;
            }
        });

        $('#Canvas').mouseleave(function(event){
            if($('.pencil').hasClass('active'))
            {
                paint = false;
                }
            });
            if($('.pencil').hasClass('active'))
            {
                var curColor = [];
                var curWeight = [];
                var Xclick = new Array();
                var Yclick = new Array();
                var Moveclick = new Array();
                var paint;

                function addClick(x, y, dragging){
                    Xclick.push(x);
                    Yclick.push(y);
                    Moveclick.push(dragging);
                    curColor.push($('.inputColor').val());
                    curWeight.push($('#weight option:selected').text());
                }

                function redraw(){
                    for(var i=0; i < Xclick.length; i++){
                        line.beginPath();
                        if(Moveclick[i]){
                            line.moveTo(Xclick[i-1], Yclick[i-1]);
                        }
                        line.lineWidth = curWeight[i];
                        line.strokeStyle = curColor[i];
                        line.lineTo(Xclick[i], Yclick[i]);
                        line.closePath();
                        line.stroke();
                    }
                }
            }
    });

    // partie sur le trait ---------------------------------------------------------------------------------------------


    $('.line').click(function(){
        var arr = [];
        $('.pencil').removeClass('active');
        $('.eraser').removeClass('active');
        $('.rectangle').removeClass('active');
        $('.circle').removeClass('active');
        $('.line').addClass('active');
        $('.rectV').removeClass('active');
        $('.rectP').removeClass('active');
        $('.triangle').removeClass('active');
        $('.diff-circle').slideUp();
        $('.diff-rectangle').slideUp();
        $('#Canvas').click(function(event){
            if($('.line').hasClass('active'))
            {
                var x = event.pageX;
                var y = event.pageY;
                arr.push(x, y);
                line.beginPath();
                line.lineWidth = $('#weight option:selected').text();
                line.strokeStyle = $('.inputColor').val();
                line.moveTo(arr[0], arr[1]);
                line.lineTo(arr[2], arr[3]);
                line.closePath();
                line.stroke();
                if(arr.length > 3)
                {
                    arr = [];
                }
            }
        });
    });




    // Partie Eraser -----------------------------------------------------------------------------------------------

    $('.eraser').click(function(){
        $('.pencil').removeClass('active');
        $('.eraser').addClass('active');
        $('.rectangle').removeClass('active');
        $('.circle').removeClass('active');
        $('.line').removeClass('active');
        $('.triangle').removeClass('active');
        $('.circleP').removeClass('active');
        $('.circleV').removeClass('active');
        $('.diff-rectangle').slideUp();
        $('.diff-circle').slideUp();
        $('#Canvas').mousedown(function(event){
            if($('.eraser').hasClass('active'))
            {
                var x = event.pageX;
                var y = event.pageY;
                paint = true;
                herClick(x, y);
                draw();
            }
        });

        $('#Canvas').mousemove(function(event){
            if($('.eraser').hasClass('active'))
            {
                if(paint)
                {
                    herClick(event.pageX, event.pageY, true);
                    draw();
                }
            }
        });

        $('#Canvas').mouseup(function(event){
            if($('.eraser').hasClass('active'))
            {
                paint = false;
            }
        });

        $('#Canvas').mouseleave(function(event){
            if($('.eraser').hasClass('active'))
            {
                paint = false;
            }
        });
        if($('.eraser').hasClass('active'))
        {
            var Xclick = new Array();
            var Yclick = new Array();
            var Moveclick = new Array();
            var paint;
            var tabColor = [];
            var tabeWeight = [];

            function herClick(x, y, dragging){
                Xclick.push(x);
                Yclick.push(y);
                Moveclick.push(dragging);
                tabeWeight.push($('#weight option:selected').text());
            }

            function draw(){
                for(var i=0; i < Xclick.length; i++){
                    line.beginPath();
                    if(Moveclick[i]){
                        line.moveTo(Xclick[i-1], Yclick[i-1]);
                    }
                    line.lineWidth = tabeWeight[i];
                    line.lineTo(Xclick[i], Yclick[i])
                    line.strokeStyle = ('#fff');
                    line.closePath();
                    line.stroke();
                }
            }
        }
    });

    // Partie Rectangle ---------------------------------------------------------------------------------------


    $('.rectangle').click(function(){
        var arr1 = [];
        $('.pencil').removeClass('active');
        $('.eraser').removeClass('active');
        $('.rectangle').addClass('active');
        $('.rectV').addClass('active');
        $('.circle').removeClass('active');
        $('.line').removeClass('active');
        $('.circleP').removeClass('active');
        $('.circleV').removeClass('active');
        $('.triangle').removeClass('active');

        $('.rectP').click(function(){
            if($('.rectV').hasClass('active'))
            {
                $('.rectV').removeClass('active');
            }
            $('.rectP').addClass('active');
            $('.rectV').click(function(){
                $('.rectP').removeClass('active');
                $('.rectV').addClass('active');
        });
    });
    $('#Canvas').click(function(event){
        if($('.rectangle').hasClass('active'))
        {
            var x = event.pageX;
            var y = event.pageY;
            arr1.push(x, y);
            console.log(arr1);
            line.beginPath();
            line.lineWidth = $('#weight option:selected').text();
            line.strokeStyle = $('.inputColor').val();
            line.moveTo(arr1[0], arr1[1]);
            line.lineTo(arr1[2], arr1[1]);
            line.lineTo(arr1[2], arr1[3]);
                line.lineTo(arr1[0], arr1[3]);
                $('#Canvas').click(function(event){
                    if($('.rectP').hasClass('active'))
                    {
                        line.fillStyle = $('.inputColor').val();
                        line.fill();
                    }
                });

                line.closePath();
                line.stroke();
                if(arr1.length > 3)
                {
                    arr1 = [];
                }
            }
        });
    });


    // Partie pour le cercle --------------------------------------------------------------------------------------


    $('.circle').click(function(){
        var arr2 = [];
        $('.pencil').removeClass('active');
        $('.eraser').removeClass('active');
        $('.rectangle').removeClass('active');
        $('.circle').addClass('active');
        $('.line').removeClass('active');
        $('.rectV').removeClass('active');
        $('.rectP').removeClass('active');
        $('.triangle').removeClass('active');
        $('.circleP').click(function(){
            if($('.circleV').hasClass('active'))
            {
                $('.circleV').removeClass('active');
            }
            $('.circleP').addClass('active');
            $('.circleV').click(function(){
                $('.circleP').removeClass('active');
                $('.circleV').addClass('active');
            });
        });
        $('#Canvas').click(function(event){
            if($('.circle').hasClass('active'))
            {
                var x = event.pageX;
                var y = event.pageY;
                arr2.push(x,y);
                test1 = arr2[2]-arr2[0];
                test2 = arr2[0]-arr2[2];
                moveY1 = arr2[3] - arr2[1];
                radius = Math.sqrt(((test1) * (test1)) + ((arr2[3] - arr2[1]) * (arr2[3] - arr2[1])));
                line.lineWidth = $('#weight option:selected').text();
                line.strokeStyle = $('.inputColor').val();
                line.beginPath();
                    line.arc(x-test1, y-moveY1, radius, 0, 2*Math.PI);
                $('#Canvas').click(function(event){
                    if($('.circleP').hasClass('active'))
                    {
                        line.fillStyle = $('.inputColor').val();
                        line.fill();
                    }
                });
                line.stroke();
                if(arr2.length > 3)
                {
                    arr2 = [];
                }
            }
        });
    });

    // // Partie Triangle --------------------------------------------------------------------------------------------

    $('.triangle').click(function(){
        arr3 =[];
        $('.triangle').addClass('active');
        $('.pencil').removeClass('active');
        $('.eraser').removeClass('active');
        $('.rectangle').removeClass('active');
        $('.circle').removeClass('active');
        $('.line').removeClass('active');
        $('.rectV').removeClass('active');
        $('.rectP').removeClass('active');
        $('.circleP').removeClass('active');
        $('.circleV').removeClass('active');
        $('.diff-rectangle').slideUp();
        $('.diff-circle').slideUp();
        $('#Canvas').click(function(event){
            if($('.triangle').hasClass('active'))
            {
                var x = event.pageX;
                var y = event.pageY;
                arr3.push(x, y);
                line.strokeStyle = $('.inputColor').val();
                line.lineWidth = $('#weight option:selected').text();
                line.beginPath();
                line.moveTo(arr3[0], arr3[1]);
                line.lineTo(arr3[2], arr3[3]);
                line.lineTo(arr3[4], arr3[5]);
                line.lineTo(arr3[0], arr3[1]);
                line.stroke();
                line.closePath();
                if(arr3.length > 4)
                {
                    arr3 = [];
                }
            }
        });
    });

    $('.diff-rectangle').hide();
    $('.rectangle').click(function(){
        $('.diff-rectangle').slideToggle();
        $('.diff-circle').slideUp();
    });

    $('.diff-circle').hide();
    $('.circle').click(function(){
        $('.diff-circle').slideToggle();
        $('.diff-rectangle').slideUp();
    });

    var canvas = document.getElementById('Canvas');
    download_img = function(el) {
        var image = canvas.toDataURL("image/png");
        el.href = image;
    };

    // $('#open').click(function(){
    //     console.log($('#open').val());
    //     $('.imgOpen').removeAttr('hidden');
    //     $('.imgOpen').attr('src', $('#open').val());
    // });
});