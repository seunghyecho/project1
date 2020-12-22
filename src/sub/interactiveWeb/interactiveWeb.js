(() => {

    var actions = {
        birdFlies(key) {
                document.querySelector('[data-index="2"] .bird').style.transform = key ? `translateX(${window.innerWidth}px)` : "translateX(-100%)"
        },
        birdFlies2(key) {
            document.querySelector('[data-index="5"] .bird').style.transform = key ? `translate(${window.innerWidth}px, ${.7 * -window.innerHeight}px)` : "translateX(-100%)"
        }
    };

    console.log(actions)
    var stepElems = document.querySelectorAll('.step');
    var graphicElems = document.querySelectorAll('.graphic-item');
    var currentItem = graphicElems[0];
    var ioIndex;

    var io = new IntersectionObserver((entries, observer) => {
        ioIndex = entries[0].target.dataset.index * 1;
        console.log(ioIndex)
    });

    for (var i = 0; i < stepElems.length; i++) {

        io.observe(stepElems[i]);

        stepElems[i].dataset.index = i;
        graphicElems[i].dataset.index = i;
    }

    function activate(action) {
        currentItem.classList.add('visible');
        if(action){
            actions[action](true);
        }

    }
    function inactivate(action) {
        currentItem.classList.remove('visible');
        if(action){
            actions[action](false);
        }

    }

    window.addEventListener('scroll', () => {
        var step;
        var boundingRect;

        for (var i = ioIndex - 1; i < ioIndex + 2; i++) {
            step = stepElems[i];
            if (!step) continue;
            boundingRect = step.getBoundingClientRect();


            if (boundingRect.top > window.innerHeight * 0.1 &&
                boundingRect.top < window.innerHeight * 0.8) {
                // console.log(step.dataset.index)
                inactivate();
                currentItem = graphicElems[step.dataset.index];
                activate(currentItem.dataset.action);
            }
        }
    });

    window.addEventListener('load', () => {
        setTimeout(() => scrollTo(0, 0), 100);
    })

    activate();



})();