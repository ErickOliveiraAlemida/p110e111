var previsao1 = ""
var previsao2 = ""
var camera = ""

Webcam.set({
    width: 350,
    height: 300,
    imageFormat: "png",
    pngQuality: 90
})
camera = document.getElementById("camera")
Webcam.attach("#camera")

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="imagem" src="'+data_uri+'">'
    })
}
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/BdkuhNMma/model.json", modelLoaded)

function modelLoaded(){
    console.log("modelo carregado")
}

function speak(){
    var synth = window.speechSynthesis;
    speakData1 = "A primeira posição é" + previsao1
    speakData2 = "A segunda posição é" + previsao2
    var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
    synth.speak(utterThis);
}

function check(){
    var img = document.getElementById("imagem")
    classifier.classify(img, gotResults)
}

function gotResults(error, results){
    if (error) {
        console.log(error)
    }else {
        console.log(results)
        document.getElementById("resultEmotionName").innerHTML = results[0].label
        document.getElementById("resultEmotionName2").innerHTML = results[1].label
        previsao1 = results[0].label
        previsao2 = results[1].label
        speak()
        if (results[0].label == "Tranquilo") {
            document.getElementById("updateEmoji").innerHTML = "&#x1F91F;"
        }
        if (results[0].label == "Vitória") {
            document.getElementById("updateEmoji").innerHTML = "&#x270C;"
    }
    if (results[0].label == "Legal") {
        document.getElementById("updateEmoji").innerHTML = "&#x1F44D;"
}
if (results[1].label == "Tranquilo") {
    document.getElementById("updateEmoji2").innerHTML = "&#x1F91F;"
}
if (results[1].label == "Vitória") {
    document.getElementById("updateEmoji2").innerHTML = "&#x270C;"
}
if (results[1].label == "Legal") {
document.getElementById("updateEmoji2").innerHTML = "&#x1F44D;"
}
}
}