// need this for async/await in tests
import "regenerator-runtime/runtime";

/**
 * Return the node version.
 *
 * See: https://stackoverflow.com/a/20798760/1337474
 *
 * @returns {object} - The node version. { version, major, minor, patch }
 *
 * @example
 * global.node_version().major >= 19 // true if node version is >= 19
 * global.node_version().version // "v14.17.0"
 */
global.node_version = () => {
    const parsed_version = process.version.match(/^v(\d+)\.(\d+)\.(\d+)/);
    console.log(parsed_version);
    return {
        version: parsed_version[0],
        major: parseInt(parsed_version[1]),
        minor: parseInt(parsed_version[2]),
        patch: parseInt(parsed_version[3]),
    };
};

/**
 * Conditional Jest tests
 *
 * See: https://stackoverflow.com/a/60438234/1337474
 *
 * @param {boolean} condition - The condition to test.
 * @returns {function} - it or it.skip
 *
 * @example
 *
 * global.itif(global.node_version().major >= 19)("should do something", () => {
 *      // test code
 * });
 */
global.itif = (condition) => (condition ? it : it.skip);

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
