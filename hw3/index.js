/* 
- When you hold down the left mouse button over a square and move the mouse, the square moves behind the mouse
- Right-clicking changes the color of the square (random or from the list of available colors)
- Shift + LMC resizes the square (by adding / removing the .box-large class)
- Double-clicking LMB creates another square that has the same functionality. Each new square must have a unique number.
- Alt + Double-click LMB deletes a square (the last square on the page should not be deleted)
*/

// import "System"


let elements = document.getElementsByClassName('box-container')

let isMoving = false;
let elementCount = 1;

function downHandler(event) {
    isMoving = true;
}

function moveHandler(event) {
    if (isMoving === true) {
        console.log("moving", event.pageX, event.pageY, event.offsetX, event.offsetY)
        console.log(event.target)
        event.target.style.top = event.clientY + 'px';
        event.target.style.left = event.clientX + 'px';
    }
}

document.addEventListener('mouseup', e => {
    isMoving = false;
});

colors = ["red", "green", "blue", "yellow", "black"]
function colorHandler(event) {
    console.log("[LOG]: coloring")

    let color = event.target.style.background;
    let new_color = color;
    while (new_color === color) {
        new_color = colors[Math.floor(Math.random() * colors.length)];
    }
    event.target.style.background = new_color;
}

function resizeHandler(event) {
    if (!event.shiftKey) return
    console.log("[LOG]: resizing")

    let element = event.target;
    element.classList.toggle("box-large")
}

function createHandler(event) {
    console.log("[LOG]: creating")

    elementCount++;
    let node = document.createElement("div");
    node.className = "box";
    node.innerHTML = elementCount;
    node.style.top = Math.floor(Math.random() * window.innerHeight) + 'px';
    node.style.left = Math.floor(Math.random() * window.innerWidth) + 'px';

    elements[0].appendChild(node);
    setBox(node);
}

function deleteHandler(event) {
    if (!event.altKey) return
    console.log("[LOG]: deleting")

    if (elementCount === 0) {
        console.log("[FATAL]: no nodes left");
        return;
    }

    let to_remove = null;
    for (node of elements[0].children) {
        if (node.innerHTML == elementCount) {
            to_remove = node;
            break;
        }
    }
    elements[0].removeChild(to_remove);

    elementCount--;
}

function setBox(box) {
    box.addEventListener('contextmenu', colorHandler)
    box.addEventListener('mousedown', downHandler)
    box.addEventListener('mousemove', moveHandler)
    box.addEventListener('click', resizeHandler)
}


for (box of elements[0].children) {
    setBox(box)
}

document.addEventListener('click', deleteHandler)
document.addEventListener('dblclick', createHandler)
