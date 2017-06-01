"use strict";

var rotateYRegex = /rotateY\((-?[0-9.]+)deg\)/gm;
var transforms = {
    top: "translateY(-50%) rotateX(-90deg)",
    left: "translateX(-50%) rotateY(+90deg)",
    front: "rotateY(+90deg) translateX(+50%) rotateY(-90deg)",
    right: "translateX(+50%) rotateY(-90deg)",
    back: "rotateY(+90deg) translateX(-50%) rotateY(+90deg)",
    bottom: "translateY(+50%) rotateX(+90deg)"
};(function (rootElement) {

    var m = 0.05;

    // const faces = ['top', 'left', 'front', 'right', 'back', 'bottom']
    var faces = ['left', 'front', 'right', 'back'].reduce(function (acc, f) {
        acc[f] = {
            el: rootElement.querySelector("[data-face=" + f + "]"),
            transform: transforms[f]
        };

        return acc;
    }, {}

    // console.log(faces)

    );var startTime = Date.now();

    function animate() {
        var rotationY = (Date.now() - startTime) * m % 360;
        // const rotationY = -30

        Object.keys(faces).forEach(function (f) {
            var _faces$f = faces[f],
                el = _faces$f.el,
                transform = _faces$f.transform;


            el.style.transform = "translateZ(600px) rotateY(" + rotationY + "deg) " + transform;
            el.style.display = isFacingBack(el) ? 'block' : 'none';
            // console.log("\n\n\n\n")
        });

        requestAnimationFrame(animate);
    }
    animate();
})(document.querySelector('#cube'));

function isFacingBack(el) {
    var rY = sumRotateY(el.style.transform);
    return rY < 110 || rY > 250;
}

function sumRotateY(str) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    rotateYRegex.lastIndex = offset;

    var match = rotateYRegex.exec(str);

    return match !== null ? (parseFloat(match[1]) + sumRotateY(str, match.index + 1)) % 360 : 0;
}
