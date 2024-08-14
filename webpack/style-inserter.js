function style_inserter(el) {
    // Insert element at the top of <head>
    // Used for injecting CSS via webpack before any other CSS
    var first_child = document.head.querySelectorAll("*")[0];
    if (first_child) {
        document.head.insertBefore(el, first_child);
    } else {
        document.head.append(el);
    }
}

module.exports = style_inserter;
