jQuery(document).ready(function($) {
                    var $mousein = false;
                    var CollManag = (function() {
                    var $ctCollContainer = $('#masonry_blog');
                    $ctCollContainer.masonry('reload');
                    var init = function() {
                        changeColCnt();
                        initEvents();
                        initPlugins();
                        //evetfunc();
                    },
                    changeColCnt = function() {

                        var w_w = ($(window).width())*0.6;
                        if( w_w <= 600 ){ 
                            n = 1;
                        }
                        else if( w_w <= 768 ) {
                            n = 2;
                        }
                        else if( w_w <= 1080 ) {
                            n = 3;
                        }
                        else if( w_w <= 1280 ) {
                            n = 4;
                        }
                        else
                        {
                            n = 5;
                        } 
                        
                        //$("img.dyimg").width( $ctCollContainer.width()/n-3);
                        $("img.dyimg").width($('#masonry_blog').width()/n-6);
                    },
                    initEvents = function() {
                        $(window).on( 'smartresize.CollManag', function( event ) {
                            changeColCnt();
                        });
                    },
                    initPlugins = function(){
                        $ctCollContainer.hide(); 
                        $ctCollContainer.imagesLoaded( function(){
                            $ctCollContainer.fadeIn(); 
                            $ctCollContainer.masonry({
                                itemSelector : '.item',
                                columnWidth : function( containerWidth ) {
                                    return containerWidth / n ;

                                },
                                isAnimated : true,
                                animationOptions: {
                                    duration: 400
                                }

                            });
                        });

                        
                        $ctCollContainer.infinitescroll('destroy'); 
                        $ctCollContainer.infinitescroll('bind');

                        $ctCollContainer.infinitescroll({
                            navSelector  : '#page-nav',    // selector for the paged navigation 
                            nextSelector : '#page-nav a',  // selector for the NEXT link (to page 2)
                            itemSelector : '.item',     // selector for all items you'll retrieve  
                            
                            loading: {
                                finishedMsg: "<font color='white'><em>No more Images to load...</em></font>",
                                //img: "http://i.imgur.com/qkKy8.gif",
                                img: wnm_custom.template_url + "/js/img/loading.gif",
                                msgText: "<font color='white'><em>Loading Images...</em></font>",
                                selector: '#messagediv',
                                speed: 'slow'
                            }

                        },
                        // trigger Masonry as a callback
                        function( newElements ) {
                            
                            // hide new items while they are loading
                            //var $newElems = $( newElements ).css({ opacity: 0 });

                            var $newElems = jQuery( newElements ).hide(); 
                            // ensure that images load before adding to masonry layout
                            $newElems.imagesLoaded(function(){
                            //$newElems.imagesLoaded().done( function( instance ){
                            
                                // show elems now they're ready
                                // $newElems.animate({ opacity: 1 });
                                $newElems.fadeIn(); // fade in when ready
                                $ctCollContainer.append( $newElems ).masonry( 'appended', $newElems, true );

                                    $("img.dyimg").each(function(){
                                        var $ishover = false;

                                        try
                                        {
                                            if($(this).is(':hover')){

                                                $ishover = true;

                                                //console.log("find hover" + $(this).attr("src"));
                                                
                                            }else{
                                                $ishover = false;

                                                //$(this).width($ctCollContainer.width()/n-3);
                                                //$(this).width($('#masonry_blog').width()/n-5);
                                                //console.log("no event find" + $(this).attr("src"));
                                            }
                                            /*
                                            if($("html").hasClass('ie8')){
                                                //$(this).width($ctCollContainer.width()/n-3);
                                                $(this).width($('#masonry_blog').width()/n-5);
                                                //console.log("no event find" + $(this).attr("src"));
                                            }*/
                                            if($ishover == false){
                                                $(this).width($('#masonry_blog').width()/n-6);
                                            }

                                        }
                                        catch(err)
                                        {
                                            $(this).width($('#masonry_blog').width()/n-6);
                                        }
                                        
                                    });     

                                
                                
                            });

                        });
                    };

                    
                    
                    return { init: init };
                    })();

                    CollManag.init();


                    // mouse hover function

                        $("#masonry_blog").on("mouseenter", ".item", function(e){
                            e.preventDefault();
                            $mousein = true;
                            var $img = $(this).find('img.dyimg');

                            if($img){

                                $img.width($('#masonry_blog').width()/n-26);
                                $img.css({
                                    'padding-bottom': '0px',
                                    'border-width': '10px',
                                    'border-color': '#000', 
                                    'border-style': 'solid',
                                    
                                    '-ms-transition': 'all 0.1s linear',
                                    '-webkit-transition': 'all 0.1s linear',
                                    '-moz-transition': 'all 0.1s linear',
                                    '-o-transition': 'all 0.1s linear',
                                    'transition': 'all 0.1s linear'
                                });

                                $("#magnify").remove();

                                $(this).append("<div id='divmagnify'><a href='" + $(this).find('.dyimglink').attr('href') + "'  rel='lightbox' title='" + $(this).find('.dyimglink').attr('title') + "'> <img id='magnify' class='clsmagnify' src='" + wnm_custom.template_url + "/js/img/magnify.png'></a></div>");
                                var $top = $img.width()/2;
                                var $left =  $img.height()/2;
                                
                                $("#magnify").css({
                                    'padding-bottom': '10px',
                                    'position': 'absolute',
                                    'top': '40%',
                                    'left': '40%',
                                    '-ms-transition': 'all 0.1s linear',
                                    '-webkit-transition': 'all 0.1s linear',
                                    '-moz-transition': 'all 0.1s linear',
                                    '-o-transition': 'all 0.1s linear',
                                    'transition': 'all 0.1s linear',
                                    'border':'none',
                                    'opacity':'0.5'
                                });
                                
                            }
                            
                           
                        });
                        
                        $("#masonry_blog").on("mouseleave", ".item", function(e){
                            
                            e.preventDefault();
                            $mousein = false;
                            var $img = $(this).find('img.dyimg');
                            if($img){
                                
                                $img.width($('#masonry_blog').width()/n-6);

                                $img.css({
                                    'border-width': '1px',
                                    'border-color': '#2c2c2c', 
                                    'border-style': 'solid',
                                    '-ms-transition': 'all 0.1s linear',
                                    '-webkit-transition': 'all 0.1s linear',
                                    '-moz-transition': 'all 0.1s linear',
                                    '-o-transition': 'all 0.1s linear',
                                    'transition': 'all 0.1s linear'
                                });

                                $("#magnify").remove();
                                $("#divmagnify").remove();
                            }   
                        });
                
                });