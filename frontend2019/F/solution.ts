class Arrow {
    readonly id: string;
    rotateFactor?: number;
    weight?: number;
    length?: number;
    color?: string;
    _getPos: () => number | undefined;

    constructor(id, { length = 90, weight = 1, color = "#000" }) {
        if (!(typeof id === "string") || !id) {
            throw new Error(`invalir arrow id: ${id}`);
        }
        this.id = id;
        this.rotateFactor = 0;
        this.weight = weight;
        this.length = length;
        this.color = color;
    }
    get pos() {
        return this._getPos ? ((this._getPos() % 360) + 360) % 360 : undefined;
    }
}

class Button {
    text: string;
    onPress: () => undefined;

    constructor(text, onPress) {
        this.text = text;
        this.onPress = onPress;
    }
}

function addElement(className: string, container): HTMLElement {
    const el: HTMLElement = document.createElement("div");
    el.className = className;
    container.appendChild(el);
    return el;
}
class Clock {
    arrows: [];
    buttons: [];

    constructor() {
        this.arrows = [];
        this.buttons = [];
    }
    onBeforeTick() {}
    onAfterTick() {}
}
class Ticker {
    start(onAfterTick) {
        return setInterval(onAfterTick, INTERVAL);
    }
    stop(timerId) {
        clearInterval(timerId);
    }
}
// tick spacing
const INTERVAL = 100;
// arrow rotation speed when rotateFactor is 1 (degrees per tick)
const SPEED = 30;
// maximum arrow speed
const MAX_SPEED = 115;
const render = (clock, container, ticker) => {
    const body = addElement("clock", container);
    const t = ticker || new Ticker();
    const arrows = clock.arrows.map((props) => {
        const el = addElement("arrow", body);
        el.style.transition = `transform ${INTERVAL}ms linear`;
        el.style.height = `${props.weight}px`;
        el.style.width = `${props.length}px`;
        el.style.backgroundColor = props.color;
        const arrowData = { el, props, pos: 0 };
        props._getPos = () => arrowData.pos;
        return arrowData;
    });
    clock.buttons.forEach((b) => {
        const el = addElement("button", container);
        el.innerText = b.text;
        el.onclick = b.onPress;
    });
    const onAfterTick = () => {
        clock.onBeforeTick();
        arrows.forEach((arrow) => {
            const distance = SPEED * arrow.props.rotateFactor;

            if (Math.abs(distance) > Math.abs(MAX_SPEED))
                throw new Error("maximum permissible speed exceeded");
            const newPos = arrow.pos + distance;
            arrow.pos = newPos;
            arrow.el.style.transform = `rotate(${newPos - 90}deg)`;
        });
        clock.onAfterTick();
    };
    const timerId = t.start(onAfterTick);
    return () => {
        t.stop(timerId);
    };
};

const Framework = {
    INTERVAL,
    SPEED,
    MAX_SPEED,
    Arrow,
    Button,
    Clock,
    Ticker,
    render,
};

Object.freeze(Framework);

const ONE_SECOND_DEGREES = 6;
const ONE_MINUTE_DEGREES = 30;
const ONE_SECOND_FACTOR = (1 / Framework.SPEED) * ONE_SECOND_DEGREES;
const ONE_MINUTE_FACTOR = (1 / Framework.SPEED) * ONE_MINUTE_DEGREES;
const TPS = 1000 / Framework.INTERVAL;
const MAX_FACTOR = Framework.MAX_SPEED / Framework.SPEED;

// @ts-ignore
class MyClock extends Framework.Clock {
    tick;
    arrows;
    buttons;
    reset;

    constructor() {
        super();

        this.arrows.push(
            new Framework.Arrow("seconds", {
                color: "red",
            })
        );

        this.arrows.push(
            new Framework.Arrow("minutes", {
                weight: 3,
                length: 80,
            })
        );

        this.arrows.push(
            new Framework.Arrow("hours", {
                weight: 3,
                length: 60,
            })
        );

        this.arrows.push(
            new Framework.Arrow("days", {
                weight: 3,
                length: 60,
            })
        );

        this.buttons.push(
            new Framework.Button("Reset", () => {
                this.reset = true;
            })
        );

        this.tick = 0;
        this.reset = false;
    }

    set pos(val) {
        this.pos = val;
    }

    onBeforeTick() {
        const [seconds, minutes, hours, days] = this.arrows;

        if (this.reset) {
            this.reset = false;
            this.tick = 0;
            this.arrows.forEach((arrow) => {
                if (arrow.pos !== 0) {
                    let angle = 360 - arrow.pos;
                    let factor = angle / Framework.SPEED;
                    arrow.rotateFactor =
                        factor > MAX_FACTOR ? MAX_FACTOR : factor;
                    this.reset = true;
                } else {
                    arrow.rotateFactor = 0;
                }
            });
        } else {
            this.tick += 1;
            seconds.rotateFactor = this.tick % TPS ? 0 : ONE_SECOND_FACTOR;
            minutes.rotateFactor =
                this.tick % (TPS * 60) ? 0 : ONE_SECOND_FACTOR;
            hours.rotateFactor =
                this.tick % (TPS * 60 * 60) ? 0 : ONE_MINUTE_FACTOR;
            days.rotateFactor =
                this.tick % (TPS * 60 * 60 * 24) ? 0 : ONE_SECOND_FACTOR;
        }
    }
}
