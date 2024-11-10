Print("LukoCode MainSiteTES");

GetInfo();
var GlobalIndex = -1;

var lastUrl = "";

const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if(mutation.type === 'childList' && window.location.href != lastUrl){
            lastUrl = window.location.href;
            Print("Url Changed");
            GetInfo();
            GlobalIndex = -1;
        } else if (mutation.type === 'childList' && window.location.href == "https://www.youtube.com/") {
            Print("Page Been restared");
            GetInfo();
            GlobalIndex = -1;
        }
    });
});
observer.observe(document.querySelector('title'), { childList: true });

document.onkeydown = function(event){
    if(event.key === "ArrowRight"){
        GlobalIndex = Calculator(1, GlobalIndex);
    }
    if(event.key === "ArrowLeft"){
        GlobalIndex = Calculator(-1, GlobalIndex);
    }
    if(event.key === "ArrowUp"){
        GlobalIndex = Calculator(-5, GlobalIndex);
    }
    if(event.key === "ArrowDown"){
        GlobalIndex = Calculator(5, GlobalIndex);
    }
    if(event.key === "h"){
        window.location.href = "https://www.youtube.com"
    }
    if(event.key === "Enter"){
        StartPage(GlobalIndex, event);
    }
}
