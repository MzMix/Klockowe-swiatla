class PresetSettings {
    constructor() {
        this.squareSize = 80;
        this.squareSpacer = 10;
        this.squaresBySideH = 4;
        this.squaresBySideW = 4;

        this.squareCurvature = 1;

        this.squareFill = '#D3D3D3';
        this.squareStroke = color(255, 255, 255, 125);
        this.squareTextColor = "black";
        this.squareTextStrokeColor = "black";

        this.squareTextSize = 15;
        this.squareTextWeight = 0;

        this.indexFill = 'white';
        this.indexStroke = 'black';

        this.indexTextSize = 25;
        this.indexTextWeight = 0;

        this.indexTextColor = "black";
        this.indexTextStrokeColor = "white";

        this.indexCurvature = 2;
    }

    addValues(valueObj) {
        for (const el in valueObj) {
            this[el] = valueObj[el];
        }
    }
}

const settings = new PresetSettings();