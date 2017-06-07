/**
 * @TODO add device rotation
 */

;(rootElement => {
    const computedStyles = window.computedStyles

    /*

        Setup

     */

    // Array.prototype.slice.call(...) = Array.from(...)
    const faces = Array.prototype.slice.call(rootElement.children).map(el => ({
        el,
    }))




    /*

        Mouse interaction

     */

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
    rootElement.addEventListener('touchstart', e => {
        startDrag(e.touches[0].pageX * 2, e.touches[0].pageY * 2)
        e.stopPropagation()
        e.preventDefault()
    }, true)
    rootElement.addEventListener('touchmove', e => {
        drag(e.touches[0].pageX * 2, e.touches[0].pageY * 2)
        e.stopPropagation()
        e.preventDefault()
    }, true)
    rootElement.addEventListener('touchend', e => {
        stopDrag()
    })




    /*

        Animate

     */

    function getGlobalRotation() {
        const mouseYaw   = -(dragAcc.x + dragCurrent.x) * dragMultiplier
        const mousePitch = (dragAcc.y + dragCurrent.y) * dragMultiplier

        return {
            yaw: (mouseYaw) % 360,
            pitch: Math.min(70, Math.max(-70, mousePitch)),
        }
    }
    function animate() {
        const size          = Math.max(rootElement.parentElement.offsetWidth, rootElement.parentElement.offsetHeight)
        const fov           = (parseInt(rootElement.getAttribute('fov')) || 50) / 100
        const perspective   = `${Math.floor(size * fov)}px`

        rootElement.style.width         = `${size}px`
        rootElement.style.height        = `${size}px`
        rootElement.style.perspective   = perspective

        // rootElement.style
        faces.forEach(f => {
            const { el } = f
            const rotation = getGlobalRotation()

            let initialTransform
            switch (el.getAttribute('data-face')) {
                case 'top':
                    initialTransform = `translateY(-${size / 2 - 1}px) rotateX(-90deg)`; break
                case 'left':
                    initialTransform = `translateX(-${size / 2 - 1}px) rotateY(+90deg)`; break
                case 'front':
                    initialTransform = `translateZ(-${size / 2 - 1}px)`; break
                case 'right':
                    initialTransform = `translateX(${size / 2 - 1}px) rotateY(-90deg)`; break
                case 'back':
                    initialTransform = `translateZ(${size / 2 - 1}px) rotateY(+180deg)`; break
                case 'bottom':
                    initialTransform = `translateY(${size / 2 - 1}px) rotateX(+90deg)`; break
                default:
                    initialTransform = `translateZ(-${size / 2 - 1}px)`
            }


            let yaw, pitch
            if (yaw = -parseFloat(el.getAttribute('data-yaw'))) {
                initialTransform = `rotateY(${yaw}deg) ${initialTransform}`
            }
            if (pitch = -parseFloat(el.getAttribute('data-pitch'))) {
                initialTransform = `rotateX(${pitch}deg) ${initialTransform}`
            }


            el.style.transform =
                `translateZ(${perspective}) rotateX(${rotation.pitch}deg) rotateY(${rotation.yaw}deg) ${initialTransform}`
            el.style.backgroundSize = `${size}px ${size}px`
        });

        requestAnimationFrame(animate)
    }
    animate()

})(document.querySelector('#cube'))
