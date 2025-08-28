/******************************** 

    Kampus Fixer
    Version: 0.0.5

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
function findEditorContainer(){
    var editorOpen = false;

    waitForElm('eb-abitti-editor div.rich-text-editor.answer').then((editorContainer) => {
        console.log("container fouund, editor open: ", editorOpen);

        //disable å, ä and ö
        document.addEventListener("keydown", function(e){
            if (editorOpen){
                if (e.key == 'å' || e.key == 'ä' || e.key == 'ö'){
                    e.preventDefault();
                }
            }
        });


        //mutationobserver for text field to see when the math editor is open
        const observer = new MutationObserver(mutations => {
            if (editorContainer.querySelector('img.equation.active')) {
                editorOpen = true;
                console.log("editor open");
            } else {
                editorOpen = false;
                console.log("editor not open");
            }
        });

        observer.observe(editorContainer, {
            childList: true,
            subtree: true
        });
    });
}

function deleteTranslatorMenu(){
    waitForElm('div.cdk-overlay-connected-position-bounding-box div.cdk-overlay-pane').then((overLayBox) => {
        overLayBox.parentElement?.remove();
    });
}

function monitorUrlChanges() {
    let currentUrl = "";

    setInterval(() => {
        if (currentUrl !== window.location.href) {
            currentUrl = window.location.href;
        
            if (currentUrl.startsWith("https://kampus.sanomapro.fi/") && currentUrl.includes("/item/")) {
                findEditorContainer();
                deleteTranslatorMenu()
            }
        }
    }, 100); // Check every 100 ms
}

monitorUrlChanges();