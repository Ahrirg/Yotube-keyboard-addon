Print("LukoCode MainSiteTES");


GetInfo();
var GlobalIndex = -1;

var lastUrl = ""; 

var MoveUpDown = 5;
var MoveLeftRight = 1;

const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {

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
            MoveUpDown = 5;
            MoveLeftRight = 1;
        }

        if(mutation.type === 'childList' && window.location.href != lastUrl){
            lastUrl = window.location.href;
            // Print("Url Changed");
            GetInfo();
            GlobalIndex = -1;
        } else if (mutation.type === 'childList' && window.location.href == "https://www.youtube.com/") {
            // Print("Page Been restared");
            GetInfo();
            GlobalIndex = -1;
        }
    });
});
observer.observe(document.querySelector('title'), { childList: true });

document.onkeydown = function(event){
    if(event.key === "ArrowRight"){
        GlobalIndex = Calculator(MoveLeftRight, GlobalIndex);
    }
    if(event.key === "ArrowLeft"){
        GlobalIndex = Calculator(-MoveLeftRight, GlobalIndex);
    }
    if(event.key === "ArrowUp"){
        GlobalIndex = Calculator(-MoveUpDown, GlobalIndex);
    }
    if(event.key === "ArrowDown"){
        GlobalIndex = Calculator(MoveUpDown, GlobalIndex);
    }
    if(event.key === "h"){
        window.location.href = "https://www.youtube.com"
    }
    if(event.key === "p"){
        GoToCreator();       
    }
    if(event.key === "Enter"){
        StartPage(GlobalIndex, event);
    }
}