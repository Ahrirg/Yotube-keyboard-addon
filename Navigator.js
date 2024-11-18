
browser.storage.local.get(["enableFeature", "bgColor"]).then(result => {
    const enableFeature = result.enableFeature || false;
    const bgColor = result.bgColor || "#ffffff";
})

function Print(i) {
    console.log(`Nav ${i}`);
}

function Suggestions()
{
    var test;
    if (window.location.href.includes("results?")) {
        test = "ytd-video-renderer";
    } else if (window.location.href.includes("watch?")) {
        test = "ytd-compact-video-renderer";
    } else {
        test = "ytd-rich-grid-media";
    }
    return document.querySelectorAll(test);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
var VideoSuggestions = Suggestions();
async function GetInfo() {
    VideoSuggestions = Suggestions()
    while (VideoSuggestions.length === 0) {
        VideoSuggestions = Suggestions();
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

function ChangeBoder(NewIndex, IndexOld, List) {
    List[NewIndex].style.backgroundColor = "#2586fc";
    List[NewIndex].style.borderRadius = "13px";
    List[IndexOld].style.backgroundColor = "";

    window.scroll(0, findPosition(List[NewIndex]) - 175);
    console.log(`Dabartinis yra = ${NewIndex} VSugg = ${VideoSuggestions.length}`)
}

function StartPage(i, event) {
    var href = VideoSuggestions[i].getElementsByTagName("a")[0].getAttribute("href");
    console.log(href);

    url = "https://www.youtube.com" + href;

    if (event.ctrlKey) {
        window.open(url, "_blank");
    } else {
        window.open(url, "_self");   
    }
}

function Calculator(i, GlobalIndex) {
    if (i == 0) {
        return 0;
    }

    if (GlobalIndex < 0) {
        ChangeBoder(0, 1, VideoSuggestions);
        GlobalIndex = 0;
        return 0;
    }

    if (i < 0 && GlobalIndex == 0) {
        return 0;
        
    }


    if (GlobalIndex + i >= VideoSuggestions.length - 1) {
        VideoSuggestions = Suggestions();
    }

    ChangeBoder(GlobalIndex + i, GlobalIndex, VideoSuggestions);
    return GlobalIndex + i;
}

function GoToCreator() 
{
    var href = document.querySelectorAll("ytd-video-owner-renderer")[0].getElementsByTagName("a")[0].getAttribute("href");
    if (href != null) {
        window.location.href = href + "/videos";
    }
}