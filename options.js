document.addEventListener("DOMContentLoaded", () => {
    // console.log("wtf");
    // Retrieve stored settings
    browser.storage.local.get(["bgColor", "UpKey", "DownKey", "LeftKey", "RightKey", "HomeKey", "ProfileKey", "EnterKey"]).then(result => {
        document.getElementById("bgColor").value = result.bgColor || "#2586fc";

        document.getElementById("UpKey").value = result.UpKey || "ArrowUp";
        document.getElementById("DownKey").value = result.DownKey || "ArrowDown";
        document.getElementById("LeftKey").value = result.LeftKey || "ArrowLeft";
        document.getElementById("RightKey").value = result.RightKey || "ArrowRight";

        document.getElementById("HomeKey").value = result.HomeKey || "h";
        document.getElementById("ProfileKey").value = result.ProfileKey || "p";
        document.getElementById("EnterKey").value = result.ProfileKey || "Enter";
    });

    // Save settings when the user clicks the save button
    document.getElementById("saveSettings").addEventListener("click", () => {
        const bgColor = document.getElementById("bgColor").value;
        const UpKey = document.getElementById("UpKey").value;
        const DownKey = document.getElementById("DownKey").value;
        const LeftKey = document.getElementById("LeftKey").value;
        const RightKey = document.getElementById("RightKey").value;

        const HomeKey = document.getElementById("HomeKey").value;
        const ProfileKey = document.getElementById("ProfileKey").value;
        const EnterKey = document.getElementById("EnterKey").value;

        

        // Save the settings to local storage
        browser.storage.local.set({
            bgColor: bgColor,
            UpKey: UpKey,            
            DownKey: DownKey,
            LeftKey: LeftKey,
            RightKey: RightKey,
            ProfileKey: ProfileKey,
            HomeKey: HomeKey,
            EnterKey: EnterKey
        }).then(() => {
            var button = document.getElementById("saveSettings");
            button.textContent = "Saved!";
            button.style.backgroundColor = "#8be78b";
            button.style.borderRadius = "8px";
        });
    });
});