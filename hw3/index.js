/* 
- When you hold down the left mouse button over a square and move the mouse, the square moves behind the mouse
- Right-clicking changes the color of the square (random or from the list of available colors)
- Shift + LMC resizes the square (by adding / removing the .box-large class)
- Double-clicking LMB creates another square that has the same functionality. Each new square must have a unique number.
- Alt + Double-click LMB deletes a square (the last square on the page should not be deleted)
*/

// import "System"


const elements = document.getElementsByClassName('box-container')

let isMoving = false;
let x = 0;
let y = 0;

function downHandler(event) {
    x = event.offsetX;
    y = event.offsetY;
    isMoving = true;
    console.log("down")
}

function moveHandler(event) {
    if (isMoving === true) {
        console.log("moving")
        x = event.offsetX;
        y = event.offsetY;
    }
}

document.addEventListener('mouseup', e => {
    if (isMoving === true) {
      x = 0;
      y = 0;
      isMoving = false;
    }
});

function colorHandler(event) {
    console.log("coloring")
}

function resizeHandler(event) {
    if (!event.shiftKey) return
    console.log("resizing")
}

function createHandler(event) {
    console.log("creating")
}

function deleteHandler(event) {
    if (!event.altKey) return
    console.log("deleting")
}


for (box of elements) {
    box.addEventListener('contextmenu', colorHandler)
    box.addEventListener('mousedown', downHandler)
    box.addEventListener('mousemove', moveHandler)
    box.addEventListener('click', resizeHandler)
    box.addEventListener('click', deleteHandler)
    box.addEventListener('dblclick', createHandler)
}
