// Create a resizable div
var resizableDiv = document.createElement('div');
resizableDiv.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 800px; height: 600px; background-color: lightblue; border: 2px solid #333; resize: both; overflow: auto;';

// Add event listeners for resizing functionality
var startX, startY, startWidth, startHeight;

resizableDiv.addEventListener('mousedown', initResize, false);

function initResize(e) {
    startX = e.clientX;
    startY = e.clientY;
    startWidth = parseInt(document.defaultView.getComputedStyle(resizableDiv).width, 10);
    startHeight = parseInt(document.defaultView.getComputedStyle(resizableDiv).height, 10);
    document.addEventListener('mousemove', doResize, false);
    document.addEventListener('mouseup', stopResize, false);
}

function doResize(e) {
    resizableDiv.style.width = startWidth + e.clientX - startX + 'px';
    resizableDiv.style.height = startHeight + e.clientY - startY + 'px';
}

function stopResize() {
    document.removeEventListener('mousemove', doResize, false);
    document.removeEventListener('mouseup', stopResize, false);
}

// Append the resizable div to the document body
document.body.appendChild(resizableDiv);
