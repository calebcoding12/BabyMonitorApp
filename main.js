status_1 = " ";
objects = [];
alarm = "";
function preload(){
    alarm = loadSound("emergency_alert.mp3");
}
function setup(){
    canvas = createCanvas(700, 550);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(700,550);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
function draw(){
    image(video,0,0, 700, 550);
    if (status_1 != " "){
        objectDetector.detect(video, gotResults);
        r = random(255);
        g = random(255);
        b = random(255);
        for (i=0; i< objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            fill(r, g , b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == "person"){
             document.getElementById("status_baby").innerHTML = "Baby Status: Baby Found";
             alarm.stop();
            } else{
                document.getElementById("status_baby").innerHTML = "Baby Status: Baby Not Found";
                alarm.play();
            }
            if (objects.length == 0){
                document.getElementById("status_baby").innerHTML = "Baby Status: Baby Not Found";
                alarm.play();
            }
        }
    }
}
function modelLoaded(){
    console.log("Model is loaded");
    status_1 = true;
}
function gotResults(error, results){
    if (error){
        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}