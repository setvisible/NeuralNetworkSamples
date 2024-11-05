/*
  Vavastien Website Theme
  www.vavastien.com
  Copyright 2024-present Vavastien. All right reserved.
*/

const CSS_ZOOMED = 'is-zoomed';

function initializeImage(thumbnailNodeID, zoomedNodeID) {
    // Initialize before all the images are loaded
    // document.addEventListener("DOMContentLoaded", function(){
    //     ...
    // });

    // Initialize after all the images are loaded
    window.addEventListener("load", function(){
        const thumbnailNode = document.getElementById(thumbnailNodeID);
        const zoomedNode = document.getElementById(zoomedNodeID);
        initializeZoom(thumbnailNode, zoomedNode);
    });
}

function initializeZoom(thumbnailNode, zoomedNode) {
    // Initialize thumbnail image
    thumbnailNode.style.position = 'relative';  

    // Initialize zoomed image
    zoomedNode.style.transform = 'scale(3)';
    zoomedNode.style.overflow = 'hidden';

    // Execute a function when someone moves the cursor over the image, or the lens
    thumbnailNode.addEventListener("click", (event) => {
        thumbnailNode.classList.toggle(CSS_ZOOMED);
        event.stopPropagation()      
        trackMovement(event, thumbnailNode, zoomedNode);
    });
    thumbnailNode.addEventListener('mouseout', (event) => {
        thumbnailNode.classList.remove(CSS_ZOOMED);
    });
    thumbnailNode.addEventListener('mousemove', (event) => {
        trackMovement(event, thumbnailNode, zoomedNode);
    });

    // And also for touch screens
    thumbnailNode.addEventListener("touchstart", (event) => {
        // Prevent context menu
        event.preventDefault(); 

        thumbnailNode.classList.toggle(CSS_ZOOMED);
        event.stopPropagation();
        trackMovement(event, thumbnailNode, zoomedNode);
    });
    thumbnailNode.addEventListener('touchend', (event) => {
        // Keep zoomed if the 'touchend' is above the thumbnail image
        event.stopPropagation();
    });
    document.addEventListener('touchend', (event) => {
        // Stop zoom if the 'touchend' is outside the thumbnail image
        thumbnailNode.classList.remove(CSS_ZOOMED);
    });
    thumbnailNode.addEventListener('touchmove', (event) => {
        // Prevent context menu
        event.preventDefault();

        // Keep zoomed if the 'touchend' is above the thumbnail image
        event.stopPropagation();

        trackMovement(event, thumbnailNode, zoomedNode);
    });
    document.addEventListener('touchmove', (event) => {
        // Stop zoom if the 'touchmove' is outside the thumbnail image
        thumbnailNode.classList.remove(CSS_ZOOMED);
    });
} 
 
function trackMovement(event, thumbnailNode, zoomedNode) {
    if (thumbnailNode.classList.contains(CSS_ZOOMED)) {
        // Prevent any other actions that may occur when moving over the image
        event.preventDefault();

        // Get the cursor's x and y positions
        const pos = getCursorPos(event, thumbnailNode);

        // Calculate the ratio between result DIV and lens
        const percent_x = Math.min(Math.max(pos.x / thumbnailNode.clientWidth * 100, 0), 100);
        const percent_y = Math.min(Math.max(pos.y / thumbnailNode.clientHeight * 100, 0), 100);

        // Set the position of the lens
        const x_axis = percent_x + '%';
        const y_axis = percent_y + '%';

        // Display what the lens sees
        zoomedNode.style.transformOrigin = x_axis + ' ' + y_axis;
    }
}

function getCursorPos(event, thumbnailNode) {
    // Get the x and y positions of the image
    const rect = thumbnailNode.getBoundingClientRect();

    // Convert mouse and touch events
    event = event || window.event;
    let pageX = 0;
    let pageY = 0;
    if (event.type == 'click' || event.type == 'mousemove') {
        // Mouse event
        pageX = event.pageX;
        pageY = event.pageY;

    } else if (event.type == 'touchstart' || event.type == 'touchmove') {
        // Touch event
        if (event.changedTouches.length > 0) {
            pageX = event.changedTouches[0].pageX;
            pageY = event.changedTouches[0].pageY;
        }
    } else {
        // ...
    }

    // Calculate the cursor's x and y coordinates, relative to the image
    let x = pageX - rect.left;
    let y = pageY - rect.top;

    // Consider any page scrolling
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;

    return {'x': x, 'y': y};
}
