// NEEDS REFACTORING

// SIDE SCROLLING
(function () {
  init();

  let g_containerInViewport;
  function init() {
    setStickyContainersSize();
    bindEvents();
  }

  function bindEvents() {
    window.addEventListener("wheel", wheelHandler);
  }

  function setStickyContainersSize() {
    document
      .querySelectorAll(".sticky-container")
      .forEach(function (container) {
        const stikyContainerHeight =
          container.querySelector("main").scrollWidth;
        container.setAttribute(
          "style",
          "height: " + stikyContainerHeight + "px"
        );
      });
  }

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top <= 0 && rect.bottom > document.documentElement.clientHeight;
  }

  function wheelHandler(evt) {
    const containerInViewPort = Array.from(
      document.querySelectorAll(".sticky-container")
    ).filter(function (container) {
      return isElementInViewport(container);
    })[0];

    if (!containerInViewPort) {
      return;
    }

    var isPlaceHolderBelowTop =
      containerInViewPort.offsetTop < document.documentElement.scrollTop;
    var isPlaceHolderBelowBottom =
      containerInViewPort.offsetTop + containerInViewPort.offsetHeight >
      document.documentElement.scrollTop;
    let g_canScrollHorizontally =
      isPlaceHolderBelowTop && isPlaceHolderBelowBottom;

    if (g_canScrollHorizontally) {
      containerInViewPort.querySelector("main").scrollLeft += evt.deltaY;
    }
  }
})();

// HEADER FADE IN
const scrollElements = document.querySelectorAll(".js-scroll");

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().right;

  return (
    elementTop <=
    (window.innerWidth || document.documentElement.clientWidth) / dividend
  );
};

const elementOutofView = (el) => {
  const elementTop = el.getBoundingClientRect().right;

  return (
    elementTop > (window.innerWidth || document.documentElement.clientWidth)
  );
};

const displayScrollElement = (element) => {
  element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
  element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 0.75)) {
      displayScrollElement(el);
    } else if (elementOutofView(el)) {
      hideScrollElement(el);
    }
  });
};

window.addEventListener("scroll", () => {
  handleScrollAnimation();
});

// SERVICES ACCORDION
const faqs = document.querySelectorAll(".faq");
const questionBox = document.querySelectorAll(".question-box");
const answerBox = document.querySelectorAll(".answer-box");
const arrows = document.querySelectorAll(".arrow");
const targets = document.querySelectorAll(".target");

setBackgroundColor();

function setBackgroundColor() {
  questionBox.forEach((element) => {
    const elementData = +element.dataset.faqs;
    if (elementData % 2 !== 0) {
      element.closest(".faqs").classList.add("odd");
    }
  });
  setEventListenersFaqs();
}

function setEventListenersFaqs() {
  questionBox.forEach((question) => {
    question.addEventListener("click", (e) => {
      // Prevent reload
      e.preventDefault();
      // Stop other event triggers for the same click
      e.stopImmediatePropagation();
      // Send event to _questionClick method
      questionClick(e);
    });
  });
}

function questionClick(e) {
  const question = e.target.closest(".question-box");
  const clickedQuestion = question.dataset.faqs;
  const answer = document.querySelector(`#answer-${clickedQuestion}`);
  const arrow = document.querySelector(`#arrow-${clickedQuestion}`);
  if (answer.classList.contains("show")) {
    targets.forEach((element) => {
      element.classList.remove("show");
    });
  } else {
    targets.forEach((element) => {
      element.classList.remove("show");
    });
    answer.classList.add("show");
    arrow.classList.add("show");
  }
  question.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}
