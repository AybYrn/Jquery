$(function () {

    const rand = [];
    var scr = 10;
    if (localStorage.getItem("hi_score") === null) {
        localStorage.setItem("hi_score", 0);
    }
    $("#hi_score").text(localStorage.getItem("hi_score"));

    function addRandCell() {

        while (true) {
            var r = Math.floor(Math.random() * 16) + 1;
            if ($("#c" + r).css("background-color") === 'rgb(255, 255, 255)') {
                $("#c" + r).css("background-color", "black")
                    .click(function () {
                        addRandCell();
                        $(this).animate({ backgroundColor: 'green' }, 100)
                            .animate({ backgroundColor: 'white' }, 1000)
                            .html(`<p>+${scr}</p>`).children("p").fadeOut();
                        console.log($("#score").text());
                        $("#score").text(parseInt($("#score").text()) + scr);
                        scr = 10;
                        $("#counterBar").css({ width: `100%` });
                        $(this).unbind();
                    });
                break;
            }
        }

    }
    addRandCell();
    addRandCell();
    addRandCell();

    var t;
    var scrInterval;
    var timer = setInterval(function () {
        var counter = parseInt($("#counter").text());
        counter--;
        $("#counter").html(`<p>${counter}</p>`);
        if (parseInt($("#counter").text()) <= 0) {
            clearInterval(timer);
            $("#counter").fadeOut(1000);
            setTimeout(function () {
                t = setInterval(gameTimer, 1000);
                scrInterval = setInterval(intervalScr, 100);
            }, 100);
        }
    }, 1000);

    function gameTimer() {
        var time = parseInt($("p#time").text());
        time--;
        $("p#time").text(time);
        if (parseInt($("p#time").text()) <= 5) {
            $("p#time").css("color", "red");

        }
        if (parseInt($("p#time").text()) <= 0) {
            clearInterval(t);
            clearInterval(scrInterval)
            $(".box").unbind();
            if (parseInt(localStorage.getItem("hi_score")) < parseInt($("#score").text())) {
                localStorage.setItem("hi_score", $("#score").text());
                $("#TIU").css({ display: "block" });
                $("#TIU p").text("NEW HIGH SCORE");
                $.confetti.start();
                setTimeout(() => {
                    $.confetti.stop();
                }, 2000);
                $("#hi_score").text(localStorage.getItem("hi_score"));
                $(this).remove();
            }
            else {
                $("#TIU").css({ display: "block" });
                $("#TIU p").text("TIME IS UP");
            }
            setInterval(function () {
                $("#F5").text("F5 TO PLAY AGAIN").animate({ fontSize: "60px" },200).animate({ fontSize: "50px" },200)
            }, 400);
        }
    }

    function intervalScr() {
        if (scr > 0) {
            scr--;
        }
        $("#counterBar").animate({ width: `${scr * 10}%` }, 100);
    }


});