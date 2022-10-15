// need this for async/await in tests
import "core-js/stable";
import "regenerator-runtime/runtime";

// pat-fullscreen
document.requestFullscreen = jest.fn();
document.exitFullscreen = jest.fn();
document.fullscreenElement = jest.fn();
document.fullscreenEnabled = jest.fn();
document.fullscreenchange = jest.fn();
document.fullscreenerror = jest.fn();

// resize-observer
global.ResizeObserver = function () {
    // Just do nothing for now...
    return { observe: () => {} };
};

global.IntersectionObserver = class IntersectionObserver {
    constructor(callback) {
        this.callback = callback;
        if (!global.__patternslib_test_intersection_observers) {
            global.__patternslib_test_intersection_observers = [];
        }
        this._el = null;
        this._do_observe = false;
        this._cnt = 0;
        global.__patternslib_test_intersection_observers.push(this);
    }
    observe(el) {
        this._el = el;
        this._do_observe = true;
        this._set_entry(false);
    }
    unobserve() {
        this._do_observe = false;
    }
    disconnect() {
        this._do_observe = false;
    }
    takeRecords() {}
    _set_entry(is_intersecting = true) {
        if (!this._do_observe) {
            return;
        }
        this.callback([
            {
                isIntersecting: is_intersecting,
                target: this._el,
                // entry.boundingClientRect
                // entry.intersectionRatio
                // entry.intersectionRect
                // entry.rootBounds
                // entry.time
            },
        ]);
        this._cnt++;
    }
};

// jsDOM does not add ``getClientRects`` or ``getBoundingClientRect`` to a ``document.createRange()``
// Originally from pat-tiptap to allow scroloing into the view when focusing the editor.
Range.prototype.getClientRects = () => [];
Range.prototype.getBoundingClientRect = () => {
    return { x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0 };
};

// Originally from pat-tinymce.
Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

// Define the close, show and showModal methods in dialog elements.
// Also see:
// - https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement
// - https://github.com/jsdom/jsdom/issues/3294
HTMLDialogElement.prototype.close = jest.fn().mockImplementation(function () {
    this.open = false;
});
HTMLDialogElement.prototype.show = jest.fn().mockImplementation(function () {
    this.open = true;
});
HTMLDialogElement.prototype.showModal = jest.fn().mockImplementation(function () {
    this.open = true;
});
