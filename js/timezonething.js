var d;

var SpaxTime;
var PentaTime;
var SplitTime;
var UTCTime ;

var updateInterval;

window.onload = () => {
    updateInterval = setInterval(run, 16.67);
};

function run () {
    upDate();
    toTimezone(SpaxTime);
    toTimezone(PentaTime);
    toTimezone(SplitTime);
    updateText();
}

function upDate(){
    d = new Date();
    
    SpaxTime = [d.getUTCHours()-6,d.getUTCMinutes(),d.getUTCHours()+":"+d.getUTCMinutes()];
    PentaTime = [d.getUTCHours()+7,d.getUTCMinutes(),d.getUTCHours()+":"+d.getUTCMinutes()];
    SplitTime = [d.getUTCHours()-4,d.getUTCMinutes(),d.getUTCHours()+":"+d.getUTCMinutes()];
    UTCTime = [d.getUTCHours(),d.getUTCMinutes(),d.getUTCHours()+":"+d.getUTCMinutes()];
}

function toTimezone(person){
    if (person[1]=="0"||person[1]=="1"||person[1]=="2"||person[1]=="3"||person[1]=="4"||person[1]=="5"||person[1]=="6"||person[1]=="7"||person[1]=="8"||person[1]=="9"){
        person[1]="0"+person[1]
    }
    if (person[0]<1) {
        person[0]=24+person[0];
    } else if (person[0]>24) {
        person[0]=24-person[0];
    }
    if (person[0]==12) {
        person[2]=person[0]+":"+person[1]+" PM";
    } else if (person[0]==24) {
        person[2]=(person[0]-12)+":"+person[1]+" AM";
    } else {
        if ((person[0])>12) {
            person[2]=(person[0]-12)+":"+person[1]+" PM";
        } else {
            person[2]=person[0]+":"+person[1]+" AM";
        }
    }
}

function updateText () {
    document.getElementById("date1").innerHTML = "Spax's current time is "+SpaxTime[2]+"! They're in MST.";
    document.getElementById("date2").innerHTML = "Pentaxel's current time is "+PentaTime[2]+"! He's in GMT+7.";
    document.getElementById("date3").innerHTML = "Splittikin's current time is "+SplitTime[2]+"! She's in EST.";
    //document.getElementById("date4").innerHTML = "UTC time is currently "+UTCTime[2]+".";
}
