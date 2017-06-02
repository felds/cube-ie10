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

    var dragAcc = { x: 0, y: 0 };
    var dragCurrent = { x: 0, y: 0 };
    var dragStart = void 0;
    var dragMultiplier = 0.1;
    function startDrag(x, y) {
        dragStart = { x: x, y: y };
    }
    function drag(x, y) {
        if (!dragStart) return;

        dragCurrent = {
            x: x - dragStart.x,
            y: y - dragStart.y
        };
    }
    function stopDrag() {
        if (!dragStart) return;

        dragAcc = {
            x: dragAcc.x + dragCurrent.x,
            y: dragAcc.y + dragCurrent.y
        };
        dragCurrent = { x: 0, y: 0 };
        dragStart = undefined;
    }

    rootElement.addEventListener('mousedown', function (e) {
        startDrag(e.pageX, e.pageY);
    });
    window.addEventListener('mousemove', function (e) {
        drag(e.pageX, e.pageY);
    });
    window.addEventListener('mouseup', function (e) {
        stopDrag();
    });
    rootElement.addEventListener('touchstart', function (e) {
        startDrag(e.touches[0].pageX, e.touches[0].pageY);
    });
    rootElement.addEventListener('touchmove', function (e) {
        drag(e.touches[0].pageX, e.touches[0].pageY);
    });
    rootElement.addEventListener('touchend', function (e) {
        stopDrag();
    }

    /*
        Animate
     */
    );function getGlobalRotation() {
        var mouseYaw = -(dragAcc.x + dragCurrent.x) * dragMultiplier;
        var mousePitch = (dragAcc.y + dragCurrent.y) * dragMultiplier;

        return {
            yaw: mouseYaw % 360,
            pitch: Math.min(70, Math.max(-70, mousePitch))
        };
    }
    function animate() {
        Object.keys(faces).forEach(function (f) {
            var _faces$f = faces[f],
                el = _faces$f.el,
                transform = _faces$f.transform;

            var rotation = getGlobalRotation();
            var perspective = "600px";

            el.style.transform = "translateZ(" + perspective + ") rotateX(" + rotation.pitch + "deg) rotateY(" + rotation.yaw + "deg) " + transform;
        });

        requestAnimationFrame(animate);
    }
    animate();
})(document.querySelector('#cube'));
