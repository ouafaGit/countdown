function startTimer(id, deadline){
    let timerInterval = setInterval(function(){
        let clock = document.getElementById(id);
        let timer = updateTimer(deadline);
        
        clock.innerHTML = `<span>${timer.days}</span>
                        <span>${timer.hours}</span>
                        <span>${timer.minutes}</span>
                        <span>${timer.seconds}</span>`;

        //animations
        var spans = clock.getElementsByTagName("span");
        //animate the seconds span
        animateClock(spans[3]);
        //animate minutes span if seconds reachs 59 
        if(timer.seconds == 59) animateClock(spans[2]);
        //animate minutes span if seconds and the minuts reachs 59
        if(timer.minutes == 59 && timer.seconds == 59) animateClock(spans[1]);
        //animate minutes span if seconds and minuts reachs 59 and hours reachs 23 
        if(timer.hours == 23 && timer.minutes == 59 && timer.seconds == 59) animateClock(spans[0]);
        
        //check for end of timer
        if(timer.total < 1){
            clearInterval(timerInterval);
            clock.innerHTML = '<span>0</span><span>0</span><span>0</span><span>0</span>';
        }
        
    }, 1000);
}

function updateTimer(deadline){
    let time = deadline - new Date();
    return {
        'days': Math.floor( time/(1000*60*60*24) ), // Seconds, minuts, hours, days 
        'hours': Math.floor( (time/(1000*60*60)) % 24 ), // seconds, minuts, hours in a day (24 hours)
        'minutes': Math.floor( (time/1000/60) % 60 ), // seconds, minuts by hour
        'seconds': Math.floor( (time/1000) % 60 ), // seconds by minut
        'total': time
    };
}

// add animation to html elements
function animateClock(span){
    span.className = "turn";
    setTimeout(function(){
      span.className = "";
    },700);
}

window.onload = function(){
    const deadline = new Date("April 25, 2020 17:15:00");
    startTimer("clock", deadline);
};