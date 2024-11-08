console.log("Luko Codas works");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var VideoSuggestions = document.querySelectorAll("ytd-rich-grid-media");

async function GetInfo() {
    VideoSuggestions = document.querySelectorAll("ytd-rich-grid-media");
    while (VideoSuggestions.length === 0) {
        VideoSuggestions = document.querySelectorAll("ytd-rich-grid-media");
        await sleep(100);
    }
    return 1;
}

function findPosition(obj) {
    let currenttop = 0;
    if (obj.offsetParent) {
        do {
            currenttop += obj.offsetTop;
        } while ((obj = obj.offsetParent));
        return [currenttop];
    }
}

GetInfo();
console.log(VideoSuggestions);
var GlobalIndex = -1

function ChangeBoder(NewIndex, IndexOld) {
    VideoSuggestions[NewIndex].style.backgroundColor = "#2586fc";
    VideoSuggestions[NewIndex].style.borderRadius = "13px";
    VideoSuggestions[IndexOld].style.backgroundColor = "";

    window.scrollTo(0, findPosition(VideoSuggestions[NewIndex]) - 175);
    console.log(`Dabartinis yra = ${NewIndex} VSugg = ${VideoSuggestions.length}`)
}

function StartPage(i) {
    console.log(VideoSuggestions[i]);
    var href = VideoSuggestions[i].getElementsByTagName("a")[0].getAttribute("href");
    console.log(href);
    window.location.href = "https://www.youtube.com" + href;
}

function Calculator(i) {
    if (GlobalIndex < 0) {
        ChangeBoder(0, 1);
        GlobalIndex = 0;
        return 0;
    }

    if (i < 0 && GlobalIndex == 0) {
        return 0;
    }

    if (GlobalIndex + i >= VideoSuggestions.length - 1) {
        VideoSuggestions = document.querySelectorAll("ytd-rich-grid-media");
    }

    ChangeBoder(GlobalIndex + i, GlobalIndex);
    GlobalIndex = GlobalIndex + i;
}

document.onkeydown = function(e){
    if(e["key"] === "ArrowRight"){
        Calculator(1);
    }
    if(e["key"] === "ArrowLeft"){
        Calculator(-1);
    }
    if(e["key"] === "ArrowUp"){
        Calculator(-5);
    }
    if(e["key"] === "ArrowDown"){
        Calculator(5);
    }
    if(e["key"] === "Enter"){
        console.log("EnterWasPressed");
        StartPage(GlobalIndex);
    }
}