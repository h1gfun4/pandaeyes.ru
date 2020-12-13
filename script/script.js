// Начало слайдера
function Sim(sldrId) {
  let id = document.getElementById(sldrId);
  if (id) {
    this.sldrRoot = id;
  } else {
    this.sldrRoot = document.querySelector(".sim-slider");
  }

  // Карусель объектов
  this.sldrList = this.sldrRoot.querySelector(".sim-slider-list");
  this.sldrElements = this.sldrList.querySelectorAll(".sim-slider-element");
  this.sldrElemFirst = this.sldrList.querySelector(".sim-slider-element");
  this.leftArrow = this.sldrRoot.querySelector("div.sim-slider-arrow-left");
  this.rightArrow = this.sldrRoot.querySelector("div.sim-slider-arrow-right");
  this.indicatorDots = this.sldrRoot.querySelector("div.sim-slider-dots");

  // инициализация
  this.options = Sim.defaults;
  Sim.initialize(this);
}

Sim.defaults = {
  // Варианты по умолчанию для карусели
  loop: true, // Бесконечное зацикливание слайдера
  auto: true, // Автоматическое пролистывание
  interval: 5000, // Интервал между пролистыванием элементов (мс)
  arrows: true, // Пролистывание стрелками
  dots: true, // Индикаторные точки
};

Sim.prototype.elemPrev = function (num) {
  num = num || 1;

  let prevElement = this.currentElement;
  this.currentElement -= num;
  if (this.currentElement < 0) this.currentElement = this.elemCount - 1;

  if (!this.options.loop) {
    if (this.currentElement == 0) {
      this.leftArrow.style.display = "none";
    }
    this.rightArrow.style.display = "block";
  }

  this.sldrElements[this.currentElement].style.opacity = "1";
  this.sldrElements[prevElement].style.opacity = "0";

  if (this.options.dots) {
    this.dotOn(prevElement);
    this.dotOff(this.currentElement);
  }
};

Sim.prototype.elemNext = function (num) {
  num = num || 1;

  let prevElement = this.currentElement;
  this.currentElement += num;
  if (this.currentElement >= this.elemCount) this.currentElement = 0;

  if (!this.options.loop) {
    if (this.currentElement == this.elemCount - 1) {
      this.rightArrow.style.display = "none";
    }
    this.leftArrow.style.display = "block";
  }

  this.sldrElements[this.currentElement].style.opacity = "1";
  this.sldrElements[prevElement].style.opacity = "0";

  if (this.options.dots) {
    this.dotOn(prevElement);
    this.dotOff(this.currentElement);
  }
};

Sim.prototype.dotOn = function (num) {
  this.indicatorDotsAll[num].style.cssText =
    "background-color:#BBB; cursor:pointer;";
};

Sim.prototype.dotOff = function (num) {
  this.indicatorDotsAll[num].style.cssText =
    "background-color:#556; cursor:default;";
};

Sim.initialize = function (that) {
  // Константы
  that.elemCount = that.sldrElements.length; // Количество элементов

  // переменные
  that.currentElement = 0;
  let bgTime = getTime();

  // Функции
  function getTime() {
    return new Date().getTime();
  }
  function setAutoScroll() {
    that.autoScroll = setInterval(function () {
      let fnTime = getTime();
      if (fnTime - bgTime + 10 > that.options.interval) {
        bgTime = fnTime;
        that.elemNext();
      }
    }, that.options.interval);
  }

  // Начать инициализацию
  if (that.elemCount <= 1) {
    // Отключить навигацию
    that.options.auto = false;
    that.options.arrows = false;
    that.options.dots = false;
    that.leftArrow.style.display = "none";
    that.rightArrow.style.display = "none";
  }
  if (that.elemCount >= 1) {
    // показать первый элемент
    that.sldrElemFirst.style.opacity = "1";
  }

  if (!that.options.loop) {
    that.leftArrow.style.display = "none"; // отключить левую стрелку
    that.options.auto = false; // отключить автопркрутку
  } else if (that.options.auto) {
    // инициализация автопрокруки
    setAutoScroll();
    // Остановка прокрутки при наведении мыши на элемент
    that.sldrList.addEventListener(
      "mouseenter",
      function () {
        clearInterval(that.autoScroll);
      },
      false
    );
    that.sldrList.addEventListener("mouseleave", setAutoScroll, false);
  }

  if (that.options.arrows) {
    // инициализация стрелок
    that.leftArrow.addEventListener(
      "click",
      function () {
        let fnTime = getTime();
        if (fnTime - bgTime > 1000) {
          bgTime = fnTime;
          that.elemPrev();
        }
      },
      false
    );
    that.rightArrow.addEventListener(
      "click",
      function () {
        let fnTime = getTime();
        if (fnTime - bgTime > 1000) {
          bgTime = fnTime;
          that.elemNext();
        }
      },
      false
    );
  } else {
    that.leftArrow.style.display = "none";
    that.rightArrow.style.display = "none";
  }

  if (that.options.dots) {
    // инициализация индикаторных точек
    let sum = "",
      diffNum;
    for (let i = 0; i < that.elemCount; i++) {
      sum += '<span class="sim-dot"></span>';
    }
    that.indicatorDots.innerHTML = sum;
    that.indicatorDotsAll = that.sldrRoot.querySelectorAll("span.sim-dot");
    // Назначаем точкам обработчик события 'click'
    for (let n = 0; n < that.elemCount; n++) {
      that.indicatorDotsAll[n].addEventListener(
        "click",
        function () {
          diffNum = Math.abs(n - that.currentElement);
          if (n < that.currentElement) {
            bgTime = getTime();
            that.elemPrev(diffNum);
          } else if (n > that.currentElement) {
            bgTime = getTime();
            that.elemNext(diffNum);
          }
          // Если n == that.currentElement ничего не делаем
        },
        false
      );
    }
    that.dotOff(0); // точка[0] выключена, остальные включены
    for (let i = 1; i < that.elemCount; i++) {
      that.dotOn(i);
    }
  }
};

new Sim();
// Конец слайдера

// Начало второго слайдера
("use strict");
let multiItemSlider = (function () {
  function _isElementVisible(element) {
    let rect = element.getBoundingClientRect(),
      vWidth = window.innerWidth || doc.documentElement.clientWidth,
      vHeight = window.innerHeight || doc.documentElement.clientHeight,
      elemFromPoint = function (x, y) {
        return document.elementFromPoint(x, y);
      };
    if (
      rect.right < 0 ||
      rect.bottom < 0 ||
      rect.left > vWidth ||
      rect.top > vHeight
    )
      return false;
    return (
      element.contains(elemFromPoint(rect.left, rect.top)) ||
      element.contains(elemFromPoint(rect.right, rect.top)) ||
      element.contains(elemFromPoint(rect.right, rect.bottom)) ||
      element.contains(elemFromPoint(rect.left, rect.bottom))
    );
  }

  return function (selector, config) {
    let _mainElement = document.querySelector(selector), // основный элемент блока
      _sliderWrapper = _mainElement.querySelector(".slider__wrapper"), // обертка для .slider-item
      _sliderItems = _mainElement.querySelectorAll(".slider__item"), // элементы (.slider-item)
      _sliderControls = _mainElement.querySelectorAll(".slider__control"), // элементы управления
      _sliderControlLeft = _mainElement.querySelector(".slider__control_left"), // кнопка "LEFT"
      _sliderControlRight = _mainElement.querySelector(
        ".slider__control_right"
      ), // кнопка "RIGHT"
      _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), // ширина обёртки
      _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width), // ширина одного элемента
      _positionLeftItem = 0, // позиция левого активного элемента
      _transform = 0, // значение транфсофрмации .slider_wrapper
      _step = (_itemWidth / _wrapperWidth) * 100, // величина шага (для трансформации)
      _items = [], // массив элементов
      _interval = 0,
      _html = _mainElement.innerHTML,
      _states = [
        { active: false, minWidth: 0, count: 1 },
        { active: false, minWidth: 980, count: 2 },
      ],
      _config = {
        isCycling: false, // автоматическая смена слайдов
        direction: "right", // направление смены слайдов
        interval: 5000, // интервал между автоматической сменой слайдов
        pause: true, // устанавливать ли паузу при поднесении курсора к слайдеру
      };

    for (let key in config) {
      if (key in _config) {
        _config[key] = config[key];
      }
    }

    // наполнение массива _items
    _sliderItems.forEach(function (item, index) {
      _items.push({ item: item, position: index, transform: 0 });
    });

    let _setActive = function () {
      let _index = 0;
      let width = parseFloat(document.body.clientWidth);
      _states.forEach(function (item, index, arr) {
        _states[index].active = false;
        if (width >= _states[index].minWidth) _index = index;
      });
      _states[_index].active = true;
    };

    let _getActive = function () {
      let _index;
      _states.forEach(function (item, index, arr) {
        if (_states[index].active) {
          _index = index;
        }
      });
      return _index;
    };

    let position = {
      getItemMin: function () {
        let indexItem = 0;
        _items.forEach(function (item, index) {
          if (item.position < _items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getItemMax: function () {
        let indexItem = 0;
        _items.forEach(function (item, index) {
          if (item.position > _items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getMin: function () {
        return _items[position.getItemMin()].position;
      },
      getMax: function () {
        return _items[position.getItemMax()].position;
      },
    };

    let _transformItem = function (direction) {
      let nextItem;
      if (!_isElementVisible(_mainElement)) {
        return;
      }
      if (direction === "right") {
        _positionLeftItem++;
        if (
          _positionLeftItem + _wrapperWidth / _itemWidth - 1 >
          position.getMax()
        ) {
          nextItem = position.getItemMin();
          _items[nextItem].position = position.getMax() + 1;
          _items[nextItem].transform += _items.length * 100;
          _items[nextItem].item.style.transform =
            "translateX(" + _items[nextItem].transform + "%)";
        }
        _transform -= _step;
      }
      if (direction === "left") {
        _positionLeftItem--;
        if (_positionLeftItem < position.getMin()) {
          nextItem = position.getItemMax();
          _items[nextItem].position = position.getMin() - 1;
          _items[nextItem].transform -= _items.length * 100;
          _items[nextItem].item.style.transform =
            "translateX(" + _items[nextItem].transform + "%)";
        }
        _transform += _step;
      }
      _sliderWrapper.style.transform = "translateX(" + _transform + "%)";
    };

    let _cycle = function (direction) {
      if (!_config.isCycling) {
        return;
      }
      _interval = setInterval(function () {
        _transformItem(direction);
      }, _config.interval);
    };

    // обработчик события click для кнопок "назад" и "вперед"
    let _controlClick = function (e) {
      if (e.target.classList.contains("slider__control")) {
        e.preventDefault();
        let direction = e.target.classList.contains("slider__control_right")
          ? "right"
          : "left";
        _transformItem(direction);
        clearInterval(_interval);
        _cycle(_config.direction);
      }
    };

    // обработка события изменения видимости страницы
    let _handleVisibilityChange = function () {
      if (document.visibilityState === "hidden") {
        clearInterval(_interval);
      } else {
        clearInterval(_interval);
        _cycle(_config.direction);
      }
    };

    let _refresh = function () {
      clearInterval(_interval);
      _mainElement.innerHTML = _html;
      _sliderWrapper = _mainElement.querySelector(".slider__wrapper");
      _sliderItems = _mainElement.querySelectorAll(".slider__item");
      _sliderControls = _mainElement.querySelectorAll(".slider__control");
      _sliderControlLeft = _mainElement.querySelector(".slider__control_left");
      _sliderControlRight = _mainElement.querySelector(
        ".slider__control_right"
      );
      _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width);
      _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width);
      _positionLeftItem = 0;
      _transform = 0;
      _step = (_itemWidth / _wrapperWidth) * 100;
      _items = [];
      _sliderItems.forEach(function (item, index) {
        _items.push({ item: item, position: index, transform: 0 });
      });
    };

    let _setUpListeners = function () {
      _mainElement.addEventListener("click", _controlClick);
      if (_config.pause && _config.isCycling) {
        _mainElement.addEventListener("mouseenter", function () {
          clearInterval(_interval);
        });
        _mainElement.addEventListener("mouseleave", function () {
          clearInterval(_interval);
          _cycle(_config.direction);
        });
      }
      document.addEventListener(
        "visibilitychange",
        _handleVisibilityChange,
        false
      );
      window.addEventListener("resize", function () {
        let _index = 0,
          width = parseFloat(document.body.clientWidth);
        _states.forEach(function (item, index, arr) {
          if (width >= _states[index].minWidth) _index = index;
        });
        if (_index !== _getActive()) {
          _setActive();
          _refresh();
        }
      });
    };

    // инициализация
    _setUpListeners();
    if (document.visibilityState === "visible") {
      _cycle(_config.direction);
    }
    _setActive();

    return {
      right: function () {
        // метод right
        _transformItem("right");
      },
      left: function () {
        // метод left
        _transformItem("left");
      },
      stop: function () {
        // метод stop
        _config.isCycling = false;
        clearInterval(_interval);
      },
      cycle: function () {
        // метод cycle
        _config.isCycling = true;
        clearInterval(_interval);
        _cycle();
      },
    };
  };
})();

let slider = multiItemSlider(".slider", {
  isCycling: true,
});
//Конец второго слайдера
