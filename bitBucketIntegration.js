function observeEditorsInBitBucket() {
// Callback function to be executed when the element is found
    const mutationCallback = function (mutationsList, observer) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0 && document.querySelectorAll(".akEditor:not([class*='commentator-extension'])").length > 0) {
                const allEditors = document.querySelectorAll(".akEditor")
                allEditors.forEach(editor => editor.classList.add("commentator-extension"))
                console.log(`num of editors are ${allEditors.length}`)
            }
        }
    };

// Create a MutationObserver with the callback function
    const observer = new MutationObserver(mutationCallback);

// Configure and start observing the target element
    const observerConfig = {childList: true, subtree: true};
// Target element to observe
    observer.observe(document, observerConfig);
}

console.log("script loaded")
observeEditorsInBitBucket()