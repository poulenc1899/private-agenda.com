$(document).ready(function() {
    var playlist = [];
    var currentlyPlaying = 0;
    var playlistLength;
    var audio = new Audio(playlist[0]);

    $(".track-url").each(function(index) {
        var trackUrl = $(this).attr("src");
        playlistLength = playlist.push(trackUrl);
    });

    $('#play-pause-button a').on("click", function() {

        if (audio.paused) {
            audio.play();
            console.log('playing' + audio.currentSrc);
        } else if (audio.duration <= 0) {
            audio.play();
            console.log('playing');
        } else {
            audio.pause();
            console.log('pausing');
        }
    });

    audio.onended = function() {
        currentlyPlaying = (currentlyPlaying + 1) % playlistLength;
        this.src = playlist[currentlyPlaying];
        this.play();
    };
});



isSongPlaying
currentsongNumber
totalNumberSongs
currentSongDuration
currentSongPlayPosition

if song x clicked
    if not playing
        play song x
    else
        stop current song
        play song x

if currentSongPlayPosition = currentSongDuration
    play next song

playSong
    play(song)
    identify(song)