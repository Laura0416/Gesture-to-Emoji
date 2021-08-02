Webcam.set({
    width: 350,
    height: 250,
    image_format: "png",
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot(){
    
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id = 'captured-image' src = '" + data_uri + "'/>";
    });
}

console.log("hello");

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Y7Vszntr0/model.json", modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_1 = "The first prediction is " + prediction_1;
    speak_2 = "The second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_1 + speak_2);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById("captured-image");
    classifier.classify(img, getResult);
}

function getResult(error, result){
    if (error){
        console.error(error);
    }
    else{
        console.log(result);
        document.getElementById("gesture_name").innerHTML = result[0].label;
        document.getElementById("gesture_name2").innerHTML = result[1].label;
        prediction_1 = result[0].label;
        prediction_2 = result[1].label;
        speak();
        
        if(result[0].label == "Ok"){
            console.log("ok")
            document.getElementById("gesture_emoji").innerHTML = "&#128076;";
        }
        if(result[0].label == "Peace Sign"){
            document.getElementById("gesture_emoji").innerHTML = "&#9996;";
        }
        if(result[0].label == "Thumbs up"){
            document.getElementById("gesture_emoji").innerHTML = "&#128077;";
        }

        if(result[1].label == "Ok"){
            console.log("Ok")
            document.getElementById("gesture_emoji2").innerHTML = "&#128076;";
        }
        if(result[1].label == "Peace Sign"){
            document.getElementById("gesture_emoji2").innerHTML = "&#9996;";
        }
        if(result[1].label == "Thumbs up"){
            document.getElementById("gesture_emoji2").innerHTML = "&#128077;";
        }
    }
}