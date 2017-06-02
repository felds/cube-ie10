"use strict";

/**
 * @TODO update size based on viewport dimentions
 * @TODO add device rotation
 * @TODO add mouse rotation
 * @TODO add touch rotation
 * @TODO fix the fucking resolution!
 */

var transforms = {
    top: "translateY(-50%) rotateX(-90deg)",
    left: "translateX(-50%) rotateY(+90deg)",
    front: "rotateY(+90deg) translateX(+50%) rotateY(-90deg)",
    right: "translateX(+50%) rotateY(-90deg)",
    back: "rotateY(+90deg) translateX(-50%) rotateY(+90deg)",
    bottom: "translateY(+50%) rotateX(+90deg)"
};(function (rootElement) {
    // pre-select elements
    var faces = ['top', 'left', 'front', 'right', 'back', 'bottom'].reduce(function (acc, f) {
        acc[f] = {
            el: rootElement.querySelector("[data-face=" + f + "]"),
            transform: transforms[f]
        };
        return acc;
    }, {});

    var dragStart = void 0;
    function startDrag(x, y) {
        dragStart = { x: x, y: y };
    }
    function drag(x, y) {}
    function stopDrag() {}

    rootElement.addEventListener('mousedown', function (e) {});
    window.addEventListener('mousemove', function (e) {});
    window.addEventListener('mouseup', function (e) {}
    // rootElement.addEventListener('mousedown', e => {})
    // rootElement.addEventListener('mousedown', e => {})
    // rootElement.addEventListener('mousedown', e => {})


    /*
        Animate
     */
    );function animate() {
        Object.keys(faces).forEach(function (f) {
            var _faces$f = faces[f],
                el = _faces$f.el,
                transform = _faces$f.transform;


            var rotationY = 0;

            el.style.transform = "translateZ(600px) rotateY(" + rotationY + "deg) " + transform;
        });

        requestAnimationFrame(animate);
    }
    animate();
})(document.querySelector('#cube'));
