class RangeSlider {
  constants: {
    MAX_VALUE: number;
    MIN_VALUE: number;
    RANGE_STEP: number;
    HANDLE_SIZE: number;
    readonly RANGE: number;
  };

  elements: {
    progress: HTMLElement;
    minRange: HTMLInputElement;
    maxRange: HTMLInputElement;
    handles: NodeListOf<HTMLElement>;
  };

  constructor() {
    this.constants = {
      MAX_VALUE: this.getGlobalCssValue("--max-value"),
      MIN_VALUE: this.getGlobalCssValue("--min-value"),
      RANGE_STEP: this.getGlobalCssValue("--range-step"),
      HANDLE_SIZE: this.getGlobalCssValue("--handle-size"),
      get RANGE() {
        return this.MAX_VALUE - this.MIN_VALUE;
      },
    };

    this.elements = {
      progress: document.querySelector(".progress") as HTMLElement,
      minRange: document.querySelector(".min-range") as HTMLInputElement,
      maxRange: document.querySelector(".max-range") as HTMLInputElement,
      handles: document.querySelectorAll(".handle") as NodeListOf<HTMLElement>,
    };

    this.elements.minRange.addEventListener("input", (e) => {
      this.setStartValue(+(e.target as HTMLInputElement).value);
    });

    this.elements.maxRange.addEventListener("input", (e) => {
      this.setEndValue(+(e.target as HTMLInputElement).value);
    });
  }

  getGlobalCssValue(key: string): number {
    const property = getComputedStyle(
      document.documentElement
    ).getPropertyValue(key);
    return property ? parseFloat(property) : 0;
  }

  init({ min, max }: { min: number; max: number }) {
    const { MIN_VALUE, MAX_VALUE, RANGE_STEP } = this.constants;
    const { minRange, maxRange } = this.elements;

    minRange.min = maxRange.min = MIN_VALUE.toString();
    minRange.max = maxRange.max = MAX_VALUE.toString();
    minRange.step = maxRange.step = RANGE_STEP.toString();

    // Initialize values
    minRange.value = min.toString();
    maxRange.value = max.toString();

    this.setStartValue(min);
    this.setEndValue(max);
  }

  setHandlePos(range: HTMLInputElement, handle: HTMLElement) {
    const { MIN_VALUE, RANGE, HANDLE_SIZE } = this.constants;
    const percentage = (parseFloat(range.value) - MIN_VALUE) / RANGE;
    const offset = HANDLE_SIZE / 2 - HANDLE_SIZE * percentage;
    const left = `calc(${percentage * 100}% + ${offset}px)`;
    handle.style.left = left;
  }

  setStartValue(v: number) {
    const { minRange, maxRange, progress, handles } = this.elements;
    if (v >= +maxRange.value) {
      v = +maxRange.value - this.constants.RANGE_STEP;
      minRange.value = v.toString();
    }
    const value = this.getCurrStep(v) * this.constants.RANGE_STEP;
    progress.style.left = `${(value / this.constants.RANGE) * 100}%`;
    this.setHandlePos(minRange, handles[0]);
  }

  setEndValue(v: number) {
    const { minRange, maxRange, progress, handles } = this.elements;
    if (v <= +minRange.value) {
      v = +minRange.value + this.constants.RANGE_STEP;
      maxRange.value = v.toString();
    }
    const value = this.getCurrStep(v) * this.constants.RANGE_STEP;
    progress.style.right = `${100 - (value / this.constants.RANGE) * 100}%`;
    this.setHandlePos(maxRange, handles[1]);
  }

  getCurrStep(v: number): number {
    return (v - this.constants.MIN_VALUE) / this.constants.RANGE_STEP;
  }
}

const slider = new RangeSlider();
slider.init({ min: 10, max: 150 });
