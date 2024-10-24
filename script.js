function typeWriter(text, elementId, delay = 100, callback, onProgress) {
    let i = 0;
    const element = document.getElementById(elementId);
    element.textContent = '';
    element.classList.add('typing');

    function typing() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            if (onProgress) onProgress(i, text.length);
            setTimeout(typing, delay);
        } else {
            element.classList.remove('typing');
            if (callback) callback();
        }
    }
    typing();
}

window.onload = function() {
    const mainTitleText = "Mikhail Okhrimenko";
    const subTitleText = "Student of Far East Federal University,\nInstitute of Mathematics and Computer Technologies.";

    const typingDelay = 55; 

    const mainTitleDuration = mainTitleText.length * typingDelay;
    const subTitleDuration = subTitleText.length * typingDelay;

    const totalTypingDuration = mainTitleDuration + subTitleDuration;

    const appearanceDelay = 100; 
    const appearanceDuration = totalTypingDuration - appearanceDelay; 

    typeWriter(mainTitleText, 'main-title', typingDelay, function() {
        typeWriter(subTitleText, 'sub-title', typingDelay, function() {
            
            showElement('.content__links');
        }, function(currentIndex, totalLength) {
            if (currentIndex === 1) { 
                const dividerLine = document.querySelector('.divider-line');
                dividerLine.classList.add('animate');

                
                const remainingTime = (totalLength - currentIndex) * typingDelay;
                dividerLine.style.animationDuration = (remainingTime + typingDelay) + 'ms';
            }
        });
    });

    setTimeout(function() {
        const transitionStyle = 'opacity ' + (appearanceDuration / 1000) + 's ease-in-out';
        const avatarElement = document.querySelector('.content__img');
        avatarElement.style.transition = transitionStyle;
        showElement('.content__img');
    }, appearanceDelay);
};

function showElement(selector, callback) {
    const element = document.querySelector(selector);
    element.style.opacity = 1;

    if (callback) {
        const computedStyle = getComputedStyle(element);
        let transitionDuration = parseFloat(computedStyle.transitionDuration) * 1000;
        if (isNaN(transitionDuration) || transitionDuration === 0) {
            transitionDuration = 1000;
        }

        setTimeout(function() {
            callback();
        }, transitionDuration);
    }
}
