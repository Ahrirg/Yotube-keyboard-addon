console.log("LukoCode MainSite");

var VideoSuggestions = document.querySelectorAll("ytd-rich-grid-media");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
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

function ChangeBoder(NewIndex, IndexOld) {
    VideoSuggestions[NewIndex].style.backgroundColor = "#2586fc";
    VideoSuggestions[NewIndex].style.borderRadius = "13px";
    VideoSuggestions[IndexOld].style.backgroundColor = "";

    window.scroll(0, findPosition(VideoSuggestions[NewIndex]) - 175);
    console.log(`Dabartinis yra = ${NewIndex} VSugg = ${VideoSuggestions.length}`)
}

function StartPage(i, event) {
    console.log(VideoSuggestions[i]);
    var href = VideoSuggestions[i].getElementsByTagName("a")[0].getAttribute("href");
    console.log(href);

    url = "https://www.youtube.com" + href;

    if (event.ctrlKey) {
        window.open(url, "_blank");
    } else {
        window.open(url, "_self");   
    }
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

    ChangeBoder(GlobalIndex + i, GlobalIndex, VideoSuggestions);
    GlobalIndex = GlobalIndex + i;
}



GetInfo();
console.log(VideoSuggestions);
var GlobalIndex = -1

document.onkeydown = function(event){
    if(event["key"] === "ArrowRight"){
        Calculator(1);
    }
    if(event["key"] === "ArrowLeft"){
        Calculator(-1);
    }
    if(event["key"] === "ArrowUp"){
        Calculator(-5);
    }
    if(event["key"] === "ArrowDown"){
        Calculator(5);
    }
    if(event["key"] === "Enter"){
        console.log("EnterWasPressed");
        StartPage(GlobalIndex, event);
    }
}