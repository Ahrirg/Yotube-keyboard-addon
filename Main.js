Print("LukoCode testign!!");

GetInfo();
var GlobalIndex = -1;

var lastUrl = ""; 

var MoveUpDown = 5;
var MoveLeftRight = 1;
try {
    MoveUpDown = parseInt(document.getElementsByTagName("ytd-rich-item-renderer")[0].getAttribute("items-per-row"));
    MoveLeftRight = 1;
    console.log(`test ${MoveUpDown} ${document.getElementsByTagName("ytd-rich-item-renderer")[0].getAttribute("row")}`)
} catch (err) {
    MoveUpDown = 5;
    MoveLeftRight = 1;
}
if (window.location.href.includes("watch?") || window.location.href.includes("results?")) {
    MoveUpDown = 1;
    MoveLeftRight = 0;
} else if (window.location.href.includes("/videos")) {
    MoveUpDown = 4;
    MoveLeftRight = 1;
}


const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        console.log("CHANGED")
        if ((window.location.href.includes("watch?") || window.location.href.includes("results?"))) {
            // console.log('SlowMove');
            MoveUpDown = 1;
            MoveLeftRight = 0;
        } else if (window.location.href.includes("/videos")) {
            // console.log('FastMove');
            MoveUpDown = 4;
            MoveLeftRight = 1;
        } else {
            // console.log('FastMove');
            MoveUpDown = parseInt(document.getElementsByTagName("ytd-rich-item-renderer")[0].getAttribute("items-per-row"));
            MoveLeftRight = 1;
            console.log(`test ${MoveUpDown}`)
        }

        if(mutation.type === 'childList' && window.location.href != lastUrl){
            lastUrl = window.location.href;
            // Print("Url Changed");
            GetInfo();
            GlobalIndex = -1;
            // console.log("DELETINAM");
        
        } else if (mutation.type === 'childList' && window.location.href == "https://www.youtube.com/") {
            // Print("Page Been restared");
            GetInfo();
            GlobalIndex = -1;
            EmptyOut();
            // console.log("DELETINAM");            
        
        }

    
    });
});
try {
    observer.observe(document.querySelector('title'), { childList: true });
} catch(err)
{
    console.warn(`SomeErr: ${err}`)
}


var UpKey;
var DownKey;
var LeftKey;
var RightKey;
var HomeKey;
var ProfileKey;
var EnterKey;

browser.storage.local.get(["UpKey", "DownKey", "LeftKey", "RightKey", "HomeKey", "ProfileKey", "EnterKey"]).then(result => {

    UpKey = result.UpKey || "ArrowUp";
    DownKey = result.DownKey || "ArrowDown";
    LeftKey = result.LeftKey || "ArrowLeft";
    RightKey = result.RightKey || "ArrowRight";

    HomeKey = result.HomeKey || "h";
    ProfileKey = result.ProfileKey || "p";
    EnterKey = result.EnterKey || "Enter";
});

document.onkeydown = function(event){
    if(event.key === RightKey){
        GlobalIndex = Calculator(MoveLeftRight, GlobalIndex);
    }
    if(event.key === LeftKey){
        GlobalIndex = Calculator(-MoveLeftRight, GlobalIndex);
    }
    if(event.key === UpKey){
        GlobalIndex = Calculator(-MoveUpDown, GlobalIndex);
    }
    if(event.key === DownKey){
        GlobalIndex = Calculator(MoveUpDown, GlobalIndex);
    }
    if(event.key === HomeKey){
        var CommentBarFocused = document.getElementById("creation-box");
        if (CommentBarFocused == null || CommentBarFocused.getAttribute("class").includes("not-focused")) {
            window.location.href = "https://www.youtube.com"
        }

    }
    if(event.key === ProfileKey){
        var CommentBarFocused = document.getElementById("creation-box");
        if (CommentBarFocused == null || CommentBarFocused.getAttribute("class").includes("not-focused")) {
            GoToCreator();
        }
    }
    if(event.key === EnterKey){
        var CommentBarFocused = document.getElementById("creation-box");
        if (CommentBarFocused == null || CommentBarFocused.getAttribute("class").includes("not-focused")) {
            StartPage(GlobalIndex, event);
        }
    }
    if(event.key === "l"){
        var CommentBarFocused = document.getElementById("creation-box");
        if (CommentBarFocused == null || CommentBarFocused.getAttribute("class").includes("not-focused")) {
            LikeDislike(event);
        }
    }
}