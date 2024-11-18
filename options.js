document.addEventListener("DOMContentLoaded", () => {
    console.log("wtf");
    // Retrieve stored settings
    browser.storage.local.get(["enableFeature", "bgColor"]).then(result => {
        document.getElementById("enableFeature").checked = result.enableFeature || false;
        document.getElementById("bgColor").value = result.bgColor || "#ffffff";
    });

    // Save settings when the user clicks the save button
    document.getElementById("saveSettings").addEventListener("click", () => {
        const enableFeature = document.getElementById("enableFeature").checked;
        const bgColor = document.getElementById("bgColor").value;

        // Save the settings to local storage
        browser.storage.local.set({
            enableFeature: enableFeature,
            bgColor: bgColor
        }).then(() => {
            alert("Settings saved!");
        });
    });
});