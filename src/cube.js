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


    let dragStart
    function startDrag(x, y) {
        dragStart = { x, y }
    }
    function drag(x, y) {
    }
    function stopDrag() {

    }


    rootElement.addEventListener('mousedown', e => {})
    window.addEventListener('mousemove', e => {})
    window.addEventListener('mouseup', e => {})
    // rootElement.addEventListener('mousedown', e => {})
    // rootElement.addEventListener('mousedown', e => {})
    // rootElement.addEventListener('mousedown', e => {})


    /*
        Animate
     */
    function animate() {
        Object.keys(faces).forEach(f => {
            const { el, transform } = faces[f]

            const rotationY = 0

            el.style.transform = `translateZ(600px) rotateY(${rotationY}deg) ${transform}`
        });

        requestAnimationFrame(animate)
    }
    animate()

})(document.querySelector('#cube'))
