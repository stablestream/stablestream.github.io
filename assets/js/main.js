//delay
var delay = ( function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();

// UI audio
let musicStarted = false;

function hover(){
	var audio = document.getElementById("hover");
	audio.play();
}

// click audio
function select(){
	var audio = document.getElementById("select");
	audio.play();
}

// zip audio - remove music pause
function zip(){
	var audio = document.getElementById("zip");
	audio.play();
	select();
}

// back
function back(){
	var audio = document.getElementById("back");
	audio.play();
	var music = document.getElementById("bg-music");
	music.play();
}

// date
const monthNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const d = new Date();

weekday = monthNames[d.getDay()];
day = d.getDate();
month = d.getMonth() + 1;
date = weekday + " " + month + "/" + day;

// Add this variable to store the current channel URL
let selectedChannelUrl = '';

// At the start of the file, add this click handler
document.addEventListener('click', function startMusic() {
    var music = document.getElementById("bg-music");
    music.volume = 0.5;
    music.play();
    // Remove the click listener after first click
    document.removeEventListener('click', startMusic);
}, { once: true }); // 'once: true' means it only runs once

// Add this function to handle the Start button click
function openSelectedChannel() {
    if (selectedChannelUrl) {
        select(); // Play select sound
        setTimeout(() => {
            window.open(selectedChannelUrl, '_blank');
        }, 500);
    }
}

$( document ).ready(function() {
    // Channel click handler
    $("body").on("click", ".occupied .hover", function(){
        var centerX = $(this).offset().left + $(this).width() / 2;
        var centerY = $(this).offset().top + $(this).height() / 2;
        $( ".main-menu" ).css( {"transform-origin" : centerX + "px " + centerY + "px 0px"} );

        var img = $( this ).attr( "data-img" );
        $( ".splash-screen" ).css( {"background-image" : " url(" + img + ")", "transform-origin" : centerX + "px " + centerY + "px 0px"} );

        // Store the URL from data attribute
        selectedChannelUrl = $(this).attr("data-url");

        // Play the zip sound and start background music if it hasn't started yet
        var audio = document.getElementById("zip");
        audio.play();
        select();
        
        var music = document.getElementById("bg-music");
        if (!musicStarted) {
            music.volume = 0.5;
            music.play();
            musicStarted = true;
        }

        $( ".main-menu" ).addClass( "channel-splash" );
        $( "body" ).addClass( "channel-splash" );
        delay(function(){
            $( "body" ).removeClass( "splash-switch" );
        }, 900 );
    });

    // Menu button handler
    $("body").on("click", ".menu-btn", function(){
        $( ".main-menu" ).removeClass( "channel-splash" );
        $( "body" ).removeClass( "channel-splash" );
        $( "body" ).addClass( "splash-switch" );
        delay(function(){
            $( "body" ).removeClass( "splash-switch" );
        }, 900 );
    });

    // Screen message handler
    $("body").on("click", ".screen-message", function(){
        $( ".screen-message" ).addClass( "hidden" );
    });
});
