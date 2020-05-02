const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    // Sounds
    const sounds = document.querySelectorAll('.sound-select button');

    // Time display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');

    // Get the length of the outline 
    const outlineLength = outline.getTotalLength();

    // Pick different sounds
    sounds.forEach(sound => {
        sound.addEventListener('click', function() {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        })
    })

    // Duration
    let duration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    // Play sound
    play.addEventListener('click', () => {
        checkPlaying(song);
    })

    // Select time
    timeSelect.forEach(option => {
        option.addEventListener('click', function() {
            duration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(duration / 60)}:0${Math.floor(duration % 60)}`;
        })
    });

    // A function to check if the song is playing
    const checkPlaying = song => {
        if(song.paused) {
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        } else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg'
        }
    }

    // Animate the circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = duration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        // Animation
        let progress = outlineLength - (currentTime / duration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        // Animate the text
        if (seconds < 10) {
            timeDisplay.textContent = `${minutes}:0${seconds}`;
        } else {
            timeDisplay.textContent = `${minutes}:${seconds}`;
        }

        if (currentTime >= duration) {
            song.currentTime = 0;
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        } 
    }
}

app();