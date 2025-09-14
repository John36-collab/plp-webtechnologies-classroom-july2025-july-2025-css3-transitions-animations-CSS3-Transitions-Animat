// Part 2: JavaScript Functions — Scope, Parameters & Return Values

let globalCount = 0;

/**
 * Calculate the square of a number.
 * Returns the square.
 */
function calculateSquare(num) {
  let result = num * num;
  return result;
}

/**
 * Increment globalCount by a value.
 * Returns updated globalCount.
 */
function incrementGlobalCount(incrementBy) {
  globalCount += incrementBy;
  return globalCount;
}

/**
 * Closure generator that returns a counter function.
 */
function createCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const counter = createCounter();

/**
 * Function using default and rest parameters to sum numbers.
 */
function sumNumbers(a = 0, b = 0, ...others) {
  let total = a + b;
  for (const num of others) {
    total += num;
  }
  return total;
}

/**
 * Runs a callback function after specified delay.
 */
function runAfterDelay(callback, delay = 1000) {
  setTimeout(callback, delay);
}

/**
 * Slide in animation on an element with optional callback.
 */
function slideIn(element, callback) {
  element.classList.remove('slide-out');
  element.classList.add('slide-in');
  element.addEventListener('animationend', function handler(e) {
    if (e.target === element) {
      element.removeEventListener('animationend', handler);
      if (callback) callback();
    }
  });
}

/**
 * Slide out animation on an element with optional callback.
 */
function slideOut(element, callback) {
  element.classList.remove('slide-in');
  element.classList.add('slide-out');
  element.addEventListener('animationend', function handler(e) {
    if (e.target === element) {
      element.removeEventListener('animationend', handler);
      if (callback) callback();
    }
  });
}

/**
 * Fade in animation with callback.
 */
function fadeIn(element, callback) {
  element.classList.remove('fade-out');
  element.classList.add('fade-in');
  element.addEventListener('animationend', function handler(e) {
    if (e.target === element) {
      element.removeEventListener('animationend', handler);
      if (callback) callback();
    }
  });
}

/**
 * Fade out animation with callback.
 */
function fadeOut(element, callback) {
  element.classList.remove('fade-in');
  element.classList.add('fade-out');
  element.addEventListener('animationend', function handler(e) {
    if (e.target === element) {
      element.removeEventListener('animationend', handler);
      if (callback) callback();
    }
  });
}

// DOM references for Part 2
const numberInput = document.getElementById('numberInput');
const calcSquareBtn = document.getElementById('calcSquare');
const squareResult = document.getElementById('squareResult');

calcSquareBtn.addEventListener('click', () => {
  const num = Number(numberInput.value);
  if (isNaN(num)) {
    fadeOut(squareResult, () => {
      squareResult.textContent = 'Please enter a valid number.';
      slideIn(squareResult);
    });
  } else {
    const square = calculateSquare(num);
    fadeOut(squareResult, () => {
      squareResult.textContent = `Square of ${num} is ${square}`;
      slideIn(squareResult);
      incrementGlobalCount(1);
      console.log(`Global count is now: ${globalCount}`);
    });
  }
});

// Part 3: Combining CSS Animations with JavaScript

function triggerAnimations(element, animationClasses, onComplete) {
  animationClasses.forEach(cls => element.classList.remove(cls));
  void element.offsetWidth;
  animationClasses.forEach(cls => element.classList.add(cls));

  function onAnimEnd(e) {
    if (e.target === element) {
      animationClasses.forEach(cls => element.classList.remove(cls));
      element.removeEventListener('animationend', onAnimEnd);
      if (onComplete) onComplete();
    }
  }
  element.addEventListener('animationend', onAnimEnd);
}

const animateBoxBtn = document.getElementById('animateBoxBtn');
const animateBox = document.getElementById('animateBox');

animateBoxBtn.addEventListener('click', () => {
  triggerAnimations(animateBox, ['animate-move', 'animate-rotate', 'animate-color'], () => {
    console.log('Box animation completed');
  });
});

const flipCardBtn = document.getElementById('flipCardBtn');
const card = document.getElementById('card');

flipCardBtn.addEventListener('click', () => toggleCardFlip(card));

function toggleCardFlip(cardElement) {
  cardElement.classList.toggle('flipped');
}

const toggleLoadingBtn = document.getElementById('toggleLoadingBtn');
const loader = document.getElementById('loader');
let isLoading = false;

toggleLoadingBtn.addEventListener('click', () => {
  isLoading = !isLoading;
  if (isLoading) {
    loader.classList.add('loading');
    loader.style.animationPlayState = 'running';
    toggleLoadingBtn.textContent = 'Pause Loading Animation';
  } else {
    loader.style.animationPlayState = 'paused';
    toggleLoadingBtn.textContent = 'Resume Loading Animation';
  }
});

const showPopupBtn = document.getElementById('showPopupBtn');
const popup = document.getElementById('popup');
const closePopupBtn = document.getElementById('closePopupBtn');

showPopupBtn.addEventListener('click', () => showPopup(popup).then(() => console.log('Popup shown')));
closePopupBtn.addEventListener('click', () => hidePopup(popup).then(() => console.log('Popup hidden')));

function showPopup(popupElement) {
  return new Promise(resolve => {
    function onTransitionEnd(e) {
      if (e.target === popupElement) {
        popupElement.removeEventListener('transitionend', onTransitionEnd);
        resolve();
      }
    }
    popupElement.addEventListener('transitionend', onTransitionEnd);
    popupElement.classList.add('show');
  });
}
function hidePopup(popupElement) {
  return new Promise(resolve => {
    function onTransitionEnd(e) {
      if (e.target === popupElement) {
        popupElement.removeEventListener('transitionend', onTransitionEnd);
        resolve();
      }
    }
    popupElement.addEventListener('transitionend', onTransitionEnd);
    popupElement.classList.remove('show');
  });
}
