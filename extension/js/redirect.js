const mode = document.currentScript?.dataset.mode ?? "popup";
window.location.replace(`panel.html?mode=${encodeURIComponent(mode)}`);
