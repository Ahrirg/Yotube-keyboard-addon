
var BgColor;

browser.storage.local.get(["DeleteShorts", "bgColor"]).then(result => {
    BgColor = result.bgColor || "#2586fc";
});

function DELETEShorts(){
    console.log(`WATFDSA ${ShouldDeleteShorts}`)
    if (ShouldDeleteShorts) {
        var shorts = document.querySelectorAll("ytd-reel-shelf-renderer");
        shorts.forEach(el => {
            console.log(el);
            el.remove();
        });
        shorts = document.querySelectorAll("ytd-rich-section-renderer");
        shorts.forEach(el => {
            console.log(el);
            el.remove();
        });
    }
}

function Print(i) {
    // console.log(`Nav ${i}`);
}
function LikeDislike(event)
{
    if (window.location.href.includes("watch?")) {
        document.getElementsByTagName("like-button-view-model")[0].getElementsByTagName("button")[0].click();
    }
}

function Suggestions()
{
    console.log("updated");
    var adds = document.getElementsByTagName("ytd-ad-slot-renderer");
    for (var x = 0; x < adds.length; x++) {   
        adds[x].parentElement.parentElement.remove();
        console.log("ISTRYNEM" + `${x}`);
    }

    var test;
    if (window.location.href.includes("results?")) {
        test = "ytd-video-renderer";
    } else if (window.location.href.includes("watch?")) {
        test = "ytd-compact-video-renderer";
    } else {
        test = "ytd-rich-item-renderer";
    }
    var List = document.getElementsByTagName(test);

    // console.log(typeof List)
    // for (var x = 0; x < List.length; x++) {
    //     console.log(`${List[x].getElementsByTagName("ytd-ad-slot-renderer")[0] } = GAY`);
    //     if (List[x].getElementsByTagName("ytd-ad-slot-renderer")[0] != undefined) {
    //         delete List[x]
    //         console.log(List[x])
    //         console.log("praejom suda");
    //     }
    // }

    return List;
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

function EmptyOut(){
    VideoSuggestions.forEach(elemets => {
        elemets.style.backgroundColor="";
    })    
}

function ChangeBoder(NewIndex, IndexOld, List) {
    if (NewIndex < 0) {
        return IndexOld;
    }
    if (document.getElementsByTagName("ytd-ad-slot-renderer")[0] != undefined) {
        // console.log("sudasssss" + ` ${NewIndex}`);
        VideoSuggestions = Suggestions();
    }
    try{
        for (var x =0; x< List.length; x++) {
            
            List[x].style.backgroundColor = "";
        }
    } catch (error) {
        console.warn(`previous not found ${error}`)
    }
    
    List[NewIndex].style.backgroundColor = BgColor;
    List[NewIndex].style.borderRadius = "13px";

    List[NewIndex].scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest"})
    // console.log(`Dabartinis yra = ${NewIndex} VSugg = ${VideoSuggestions.length}, ${List}`)
    return NewIndex;
}

function StartPage(i, event) {
    var href = VideoSuggestions[i].getElementsByTagName("a")[0].getAttribute("href");
    // console.log(href);

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

    var Newindex = ChangeBoder(GlobalIndex + i, GlobalIndex, VideoSuggestions);
    return GlobalIndex + i;
}

function GoToCreator() 
{
    var href = document.querySelectorAll("ytd-video-owner-renderer")[0].getElementsByTagName("a")[0].getAttribute("href");
    if (href != null) {
        window.location.href = href + "/videos";
    }
}