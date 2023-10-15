const containerDiv = document.getElementById('container');
const paper = document.getElementById('paper');
const can = document.getElementById('cans');
const plastic = document.getElementById('plastic');
const banana = document.getElementById('general');
const aTrash = [paper, can, plastic, banana];
const value = {PAPER: "paper", PLASTIC: "plastic", GENERAL: "general", CANS: "cans"}
const spawnInterval = 250;
const lifespan = 5000;

function makeDraggable(clone) {
    let offsetX, offsetY;
    let isDragging = false;

    clone.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - clone.getBoundingClientRect().left;
        offsetY = e.clientY - clone.getBoundingClientRect().top;
        clone.style.cursor = 'grabbing';
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            clone.style.cursor = 'grab';

            // Start the deletion timer after the drag ends
            setTimeout(() => {
                containerDiv.removeChild(clone);
            }, lifespan);
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const newX = e.clientX - offsetX - containerDiv.getBoundingClientRect().left;
            const newY = e.clientY - offsetY - containerDiv.getBoundingClientRect().top;

            const maxX = containerDiv.clientWidth - clone.offsetWidth;
            const maxY = containerDiv.clientHeight - clone.offsetHeight;

            // Constrain the element's movement within the container
            const clampedX = Math.min(maxX, Math.max(0, newX));
            const clampedY = Math.min(maxY, Math.max(0, newY));

            // Update the element's position
            clone.style.left = clampedX + 'px';
            clone.style.top = clampedY + 'px';
        }
    });
}

function trashspawn() {
    let num = Math.floor(Math.random() * aTrash.length);
    let obj = aTrash[num];
    const clone = obj.cloneNode(true);
    let isBeingDragged = false;

    // Make the cloned element visible
    clone.style.display = 'block';
    clone.style.position = 'absolute';
    clone.style.cursor = 'grab';

    // Set position for the cloned element within the path
    const containerWidth = 750;
    const containerHeight = 180;
    const maxX = containerWidth - clone.offsetWidth;
    const maxY = containerHeight - clone.offsetHeight;

    clone.style.position = 'absolute';
    clone.style.left = Math.floor(Math.random() * maxX) + 'px';
    clone.style.top = Math.floor(Math.random() * maxY) + 180 + 'px';

    makeDraggable(clone);

    containerDiv.appendChild(clone);

    // Set the "isBeingDragged" flag when the element is grabbed
    clone.addEventListener('mousedown', () => {
        isBeingDragged = true;
    });

    // Clear the "isBeingDragged" flag when the drag ends
    document.addEventListener('mouseup', () => {
        isBeingDragged = false;
    });

    // Start the deletion timer only if the element is not being dragged
    setTimeout(() => {
        if (!isBeingDragged) {
            containerDiv.removeChild(clone);
        }
    }, lifespan);

    clone.addEventListener('dragover', (e) => {
        e.preventDefault(); // Allow drop events
    });

    clone.addEventListener('drop', (e) => {
        // Check if the dropped element is on top of a specific div
        const targetElement = document.elementFromPoint(e.clientX, e.clientY);
        console.log(targetElement)

        if (targetElement && targetElement.id === clone) {
            // Increase the score by 1
            score++;
            // Update the scoreboard
            scoreboard.innerText = `Score: ${score}`;
        }

        // Remove the cloned element
        containerDiv.removeChild(clone);
    });
}

setInterval(trashspawn, spawnInterval);
