$(document).ready(function (){


    let startTime = 0

    let clicked = false;

    let start = 0
    let end = 0
    let diff = 0
    let timerID = 0
    //window.onload = chronoStart;
    let chronoTime = $("#chronotime");

    /* Variables pour test témoin */
    let alarmTest = $("#alarmTest");
    let timerAlarm = 0;
    let nbAlert = 0;


    let firstPage = $("#firstPage");
    let choiceTestPage = $("#choiceTestPage");
    let refTest = $("#refTest");
    let tetrisTest = $("#tetrisTest");

    function changePage(fadeOutPage, fadeInPage){
        return new Promise((resolve) => {
            fadeOutPage.fadeOut(1000,function (){
                fadeInPage.fadeIn(1500, function (){
                    resolve();
                });
            })
        })
    }

    $("#backButton").on('click', function (){
        changePage(refTest,choiceTestPage);
        clearInterval(timerAlarm);
    })

    $("#backButton2").on('click', function (){
        scoreboard.reset();
        scoreboard.setGameOver();
        draw();
        changePage(tetrisTest,choiceTestPage);
        clearInterval(timerAlarm);
    })

    $("#validateButton").on("click", function (){

        console.log("Nom du participant : " + $("#userInfo").val());
        changePage(firstPage,choiceTestPage).then(()=>{

        })
    })

    /* ------------ Clique sur le bouton du premier test ------------ */

    $("#test1Button").on("click", function (){

        changePage(choiceTestPage, refTest).then(()=>{
            clearEvent();

            $("#startRefTest").on("click", function (){
                timerAlarm = setInterval(function(){ randomAlert("#alarmTest", 3, "normal", 2000, 7000)}, getRandom(2000,7000));
            })
            $("#clickableZone").on("click", function () {
                chronoStop();
                alarmTest.text("");
                if(nbAlert >=3){
                    console.log("Fin test témoin");
                    alarmTest.css('font-size',40);
                    alarmTest.text("Fin !");
                    $("#startRefTest").fadeOut();
                    $("#backButton").fadeIn();
                }
            })
        })

    })

    /* ------------------------------------------------------------ */

    /* ------------ Clique sur le bouton entrainement ------------ */

    $("#training").on("click", function (){
        changePage(choiceTestPage, tetrisTest).then(()=>{
            clearEvent();

            $("#backButton2").fadeIn();

            $("#playTetrisButton").on('click', function (){
                console.log("Play !")
                startNewGame(0);
                //timerAlarm = setInterval(function(){ randomAlert("#alarm", 10, "random", 6000, 15000)}, getRandom(6000,15000));
            })
        })
    })

    /* ------------------------------------------------------------ */

    /* ------------ Clique sur le bouton du 2e test ------------ */

    $("#test2Button").on("click", function (){

        changePage(choiceTestPage, tetrisTest).then(()=>{

            clearEvent();

            $("#displayAlarmArea").fadeIn()

            $("#playTetrisButton").on('click', function (){
                nbAlert = 0;
                startNewGame(0);
                timerAlarm = setInterval(function(){ randomAlert("#alarm", 10, "random", 8000, 15000)}, getRandom(8000,15000));
            })

            $(document).on('click', function (){
                chronoStop();
                $("#alarm").text("");
                $("#alarm").css('font-size',40);

                if(nbAlert >=10){
                    clearInterval(timerAlarm);
                    clearInterval(timerID);
                    console.log("Fin test");
                    alarmTest.text("Fin !");
                    $(document).off('click');
                    scoreboard.reset();
                    scoreboard.setGameOver();
                    draw()

                    $("#canvas").fadeOut();
                    $("#playTetrisButton").fadeOut();
                    $("#backButton2").fadeIn();
                }
            })
        })

    })

    /* ------------------------------------------------------------ */

    /* ------------ Clique sur le bouton du 3e test ------------ */

    $("#test3Button").on("click", function (){

        changePage(choiceTestPage, tetrisTest).then(()=>{

            clearEvent();

            $("#canvas").fadeIn();
            /*scoreboard.reset();
            draw();*/
            $("#playTetrisButton").fadeIn();
            $("#displayAlarmArea").fadeIn()


            $("#playTetrisButton").on('click', function (){
                nbAlert = 0;
                startNewGame(4);
                timerAlarm = setInterval(function(){ randomAlert("#alarm", 10, "random", 8000, 15000)}, getRandom(8000,15000));
            })

            $(document).on('click', function (){
                chronoStop();
                $("#alarm").text("");
                $("#alarm").css('font-size',40);

                if(nbAlert >=10){
                    clearInterval(timerAlarm);
                    clearInterval(timerID);
                    console.log("Fin test");
                    alarmTest.text("Fin !");
                    $(document).off('click');
                    //scoreboard.reset();
                    scoreboard.setGameOver();
                    draw()

                    $("#canvas").fadeOut();
                    $("#playTetrisButton").fadeOut();
                    $("#backButton2").fadeIn();
                }
            })
        })

    })

    /* ------------------------------------------------------------ */

    function randomAlert(id, n, mode, min, max){


        if (nbAlert < n){
            let fontSize = 0;
            if (mode === "normal"){
                fontSize = 40;
            }
            else
                fontSize = getRandom(2,30);

            $(id).css('font-size',fontSize);
            $(id).text("Alarme");

            chronoStart();
            nbAlert++;
            console.log("Alerte : " + nbAlert + "/" + n);
            console.log("Font Size : " + fontSize);

            clearInterval(timerAlarm);
            timerAlarm = setInterval(function(){ randomAlert(id, n, mode, min, max)}, getRandom(min,max));
        }


    }

    function getRandom(min,max){
        return Math.round(Math.random() * (max - min) + min);
    }


    /* ----------------------------------------------------------------------------------------------- */

    function chrono(){
        end = new Date()
        diff = end - start
        diff = new Date(diff)

        //document.getElementById("chronotime").value = getReactionTime()
        timerID = setTimeout(chrono, 10)
    }

    function chronoStart(){
        /*document.chronoForm.startstop.value = "stop!"
        document.chronoForm.startstop.onclick = chronoStop
        document.chronoForm.reset.onclick = chronoReset*/
        start = new Date()
        chrono()
    }

    /*
    function chronoContinue(){
        /!*document.chronoForm.startstop.value = "stop!"
        document.chronoForm.startstop.onclick = chronoStop
        document.chronoForm.reset.onclick = chronoReset*!/
        start = new Date()-diff
        start = new Date(start)
        chrono()
    }
    function chronoReset(){
        chronoTime.text = "0:00:00:000"
        start = new Date()
    }
    function chronoStopReset(){
        chronoTime.text = "0:00:00:000"
        //document.chronoForm.startstop.onclick = chronoStart
    }*/

    function getReactionTime(){
        let time = 0;

        if(diff !== 0){
            var msec = diff.getMilliseconds()
            var sec = diff.getSeconds()
            var min = diff.getMinutes()
            var hr = diff.getHours()-1
            if (min < 10){
                min = "0" + min
            }
            if (sec < 10){
                sec = "0" + sec
            }
            if(msec < 10){
                msec = "00" +msec
            }
            else if(msec < 100){
                msec = "0" +msec
            }

            time = hr + ":" + min + ":" + sec + ":" + msec;
            return time;
        }
        else
            return -1;


    }

    function chronoStop(){
        /*document.chronoForm.startstop.value = "start!"
        document.chronoForm.startstop.onclick = chronoContinue
        document.chronoForm.reset.onclick = chronoStopReset*/

        //clicked = true;
        console.log(getReactionTime());
        console.log(" ------------ ");
        clearTimeout(timerID)
    }

    function clearEvent(){
        $("#playTetrisButton").off("click");
    }
})
