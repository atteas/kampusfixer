/******************************** 

    Kampus Fixer
    Version: 0.0.6

    Programmer: atteas @ github

*******************************/

// functions
function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

// main
function deleteTranslatorMenu(){
    waitForElm('div.cdk-overlay-container').then(overLayContainer => {
        const observer = new MutationObserver(mutations => {
            console.log("MUTATION!!!!");
            if (overLayContainer.querySelector('div[role="menu"].mat-mdc-menu-panel')) {
                overLayContainer.querySelector('div[role="menu"].mat-mdc-menu-panel').remove();
            }
        });

        observer.observe(overLayContainer, {
            attributes: true,
            childList: true,
            subtree: true
        });
    });
}
deleteTranslatorMenu();