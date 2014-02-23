window.onload = function() {
    var socket = io.connect('http:/localhost:8000');

    var team = document.getElementById("team");
    var shooterName = document.getElementById("shooterName");
    var eType = document.getElementById("eType");
    var shotType = document.getElementById("shotType");
    var xCoord = document.getElementById("xCoord");
    var yCoord = document.getElementById("yCoord");
    var percentage = document.getElementById("percentage");
    var content = document.getElementById("content");
    var calculate = document.getElementById("calculate");
    var day = document.getElementById("day");
    var month = document.getElementById("month");
    var year = document.getElementById("year");

    

    calculate.onClick = function() {
        var params = [team.value,player.value,eType.value,shotType.value,xCoord.value,yCoord.value,day.value,month.value,year.value]
        socket.emit('change', { message: team });
    };
}