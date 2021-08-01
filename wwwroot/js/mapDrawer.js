var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class MapDrawer {
    constructor(selector, canvasHeight) {
        this.selector = selector;
        this.isObjectSelected = false;
        $(`#${selector}`).replaceWith(`<canvas id="${selector}" height=${canvasHeight}"></canvas>`);
        this.canvas = new fabric.Canvas(`${selector}`);
        this.drawers = [
            new LineDrawer()
        ];
        this._drawer = this.drawers[0 /* Line */];
        this.isDown = false;
        this.drawerOptions = {
            stroke: 'black',
            strokeWidth: 1,
            selectable: true,
            strokeUniform: true
        };
        this.initializeCanvasEvents();
    }
    initializeCanvasEvents() {
        this.canvas.on('mouse:down', (o) => {
            const e = o.e;
            const pointer = this.canvas.getPointer(o.e);
            this.mouseDown(pointer.x, pointer.y);
        });
        this.canvas.on('mouse:move', (o) => {
            const pointer = this.canvas.getPointer(o.e);
            this.mouseMove(pointer.x, pointer.y);
        });
        this.canvas.on('mouse:over', (o) => {
            if (this.isDown || this.isObjectSelected || o.target === null) {
                return;
            }
            if (o.target != null && o.target.selectable) {
                this.canvas.setActiveObject(o.target);
                this.canvas.renderAll();
            }
        });
        this.canvas.on('mouse:out', (o) => {
            if (this.isObjectSelected) {
                return;
            }
            this.canvas.discardActiveObject().renderAll();
        });
        this.canvas.on('mouse:up', (o) => {
            this.isDown = false;
        });
    }
    make(x, y) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._drawer.make(x, y, this.drawerOptions);
        });
    }
    mouseMove(x, y) {
        if (!this.isDown) {
            return;
        }
        this._drawer.resize(this.object, x, y);
        this.canvas.renderAll();
    }
    mouseDown(x, y) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isDown = true;
            this.object = yield this.make(x, y);
            this.canvas.add(this.object);
            this.canvas.renderAll();
        });
    }
}
class LineDrawer {
    constructor() {
        this.drawingMode = 0 /* Line */;
    }
    make(x, y, options, x2, y2) {
        return new Promise(resolve => {
            resolve(new fabric.Line([x, y, x2, y2], options));
        });
    }
    resize(object, x, y) {
        object.set({
            x2: x,
            y2: y
        }).setCoords();
        return new Promise(resolve => {
            resolve(object);
        });
    }
}
