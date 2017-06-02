/**
 * @TODO update size based on viewport dimentions
 * @TODO add device rotation
 * @TODO add mouse rotation
 * @TODO add touch rotation
 * @TODO fix the fucking resolution!
 */

const transforms = {
    top:    "translateY(-50%) rotateX(-90deg)",
    left:   "translateX(-50%) rotateY(+90deg)",
    front:  "rotateY(+90deg) translateX(+50%) rotateY(-90deg)",
    right:  "translateX(+50%) rotateY(-90deg)",
    back:   "rotateY(+90deg) translateX(-50%) rotateY(+90deg)",
    bottom: "translateY(+50%) rotateX(+90deg)",
}

;(rootElement => {
    // pre-select elements
    const faces = [ 'top', 'left', 'front', 'right', 'back', 'bottom' ]
        .reduce((acc, f) => {
            acc[f] = {
                el: rootElement.querySelector(`[data-face=${f}]`),
                transform: transforms[f],
            }
            return acc
        }, {})


    let dragAcc = { x: 0, y: 0 }
    let dragCurrent = { x: 0, y: 0 }
    let dragStart
    const dragMultiplier = 0.1
    function startDrag(x, y) {
        dragStart = { x, y }
    }
    function drag(x, y) {
        if (!dragStart) return

        dragCurrent = {
            x: x - dragStart.x,
            y: y - dragStart.y,
        }
    }
    function stopDrag() {
        if (!dragStart) return

        dragAcc = {
            x: dragAcc.x + dragCurrent.x,
            y: dragAcc.y + dragCurrent.y,
        }
        dragCurrent =  { x: 0, y: 0 }
        dragStart = undefined
    }


    rootElement.addEventListener('mousedown', e => {
        startDrag(e.pageX, e.pageY)
    })
    window.addEventListener('mousemove', e => {
        drag(e.pageX, e.pageY)
    })
    window.addEventListener('mouseup', e => {
        stopDrag()
    })
    // rootElement.addEventListener('mousedown', e => {})
    // rootElement.addEventListener('mousedown', e => {})
    // rootElement.addEventListener('mousedown', e => {})


    /*
        Animate
     */
    function getGlobalRotation() {
        const mouseYaw = -(dragAcc.x + dragCurrent.x) * dragMultiplier
        const mousePitch = (dragAcc.y + dragCurrent.y) * dragMultiplier

        return {
            yaw: (mouseYaw) % 360,
            pitch: Math.min(70, Math.max(-70, mousePitch)),
        }
    }
    function animate() {
        Object.keys(faces).forEach(f => {
            const { el, transform } = faces[f]
            const rotation = getGlobalRotation()
            const perspective = "600px"

            el.style.transform =
                `translateZ(${perspective}) rotateX(${rotation.pitch}deg) rotateY(${rotation.yaw}deg) ${transform}`
        });

        requestAnimationFrame(animate)
    }
    animate()

})(document.querySelector('#cube'))
