function addMethodsToObjects() {
    Segment.prototype.hideTxt = function () {

        if (this.textColor === this.basicTxtColor) {
            this.textColor = color(0, 0);
        } else {
            this.textColor = this.basicTxtColor;
        }
    }

    Segment.prototype.basicTxtColor = settings.squareTextColor;
    Index.prototype.basicTxtColor = settings.squareTextColor;

    Segment.prototype.changeContent = function (val) {
        if (val) {
            this.txt = val;
        } else {
            this.txt = this.basicContent;
        }
    }

    Segment.prototype.basicContent = "";
    Index.prototype.basicContent = Index["iteratorIndex.x"]

    Segment.prototype.changeColor = function (val) {
        if (val) {
            this.fill = val;
            this.stroke = "transparent"
        } else {
            this.fill = this.basicFillColor;
            this.stroke = this.basicStrokeColor
        }
    }

    Segment.prototype.basicFillColor = settings.squareFill;
    Index.prototype.basicFillColor = settings.indexFill;

    Segment.prototype.basicStrokeColor = settings.squareStroke;
    Index.prototype.basicStrokeColor = settings.indexStroke;

    Segment.prototype.retriveBasicValues = function () {
        this.changeContent();
    }

    action.showModal = function (value) {
        let el;

        select(".modal-body").html("");

        switch (value) {
            case "changeSet":
                select(".modal-title").html("Zmiana opisu pól");

                el = createSelect();
                el.option("Numeracja");
                el.option("Adresowanie");
                el.option("Kolory");
                el.option("Brak");

                if (settings.currentIndexType) el.value(settings.currentIndexType);

                el.addClass("custom-select switchIndexType");

                el.changed(this.switchIndexType);

                select(".modal-body").html("");
                select(".modal-body").child(el);
                break;

            default:
                break;
        }
    }

    action.refreshColorSets = function () {
        settings.colorsSchemesInList = [];
        for (let i = 0; i < settings.colorSchemes.length - 1; i++) {
            settings.colorsSchemesInList.push(`Zestaw ${i+1}`);
        }
    }

    action.switchColorScheme = function () {
        settings["currentColorScheme"] = select(".switchColorScheme").value();

        if (settings.currentColorScheme == "Domyślny") {
            settings.activeColorScheme = 0;
            userInterface.generateColorContrainer()
        } else {
            let pos = settings.colorsSchemesInList.indexOf(settings.currentColorScheme);
            pos++;

            settings.activeColorScheme = pos;
            userInterface.generateColorContrainer()
        }

    }

    settings.addValues({})

    userInterface.executeQueue = {
        displayAxis: () => {}
    }

    action.saveImg = function () {
        let data = new Date();
        saveCanvas(`plansza-${data.getHours()}-${data.getMinutes()}-${data.getSeconds()}`, 'png');
    }

    action.resetBoard = function () {
        for (let s of userInterface.board) {
            if (!(s instanceof Index)) {
                s.retriveBasicValues()
                s.changeColor();
            }
        }
    }

    settings.colorSchemes = [
        ['green', 'deepskyblue', 'purple', 'khaki', 'red', 'greenyellow', 'black', 'white', 'saddlebrown', 'darkorange', '#C0C0C0'],
        ['green', 'deepskyblue', 'purple', 'yellow', 'red', 'greenyellow', 'black', 'white', 'blue', 'darkorange', '#C0C0C0']
    ];

}

function setup() {
    addMethodsToObjects();

    userInterface.createInterface().generateBoard();
    for (let segment of userInterface.board) {
        segment.display();
    }
    noLoop();
}

function draw() {
    userInterface.refreshBoard();
    for (let segment of userInterface.board) {
        segment.display();
    }
}

function mouseClicked() {
    userInterface.checkBoardClicks();
    redraw();
}