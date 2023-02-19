type CoffeeMachineDebugInfo = {
    /**
     * Идентификатор конкретной кофе-машины — строка из маленьких
     * и больших латинских букв и цифр, строго 10 символов
     */
    id: string;
    /**
     * Код ошибки — целое число от 0 до 999
     */
    code: number;
    /**
     * Сообщение об ошибке — строка из маленьких и больших
     * латинских букв, цифр и пробелов (от 0 до 34 символов)
     */
    message: string;
};

/**
 * Отрисовать отладочную информацию кофемашины в element
 * @param debugInfo {CoffeeMachineDebugInfo} - отладочная информация
 * @param element {HTMLDivElement} - div с фиксированным размером 300x96 пикселей,
 *     в который будет отрисовываться баркод
 */
function renderBarcode(
    debugInfo: CoffeeMachineDebugInfo,
    element: HTMLDivElement
): void {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const width = 300;
    const height = 96;
    const borderWidth = 22;
    const squareInRow = 32;

    canvas.setAttribute("width", String(width));
    canvas.setAttribute("height", String(height));
    drawBorder(context, 0, height); // left
    drawBorder(context, width - borderWidth, height); // right

    const debugString =
        debugInfo.id +
        String(debugInfo.code).padStart(3, "0") +
        debugInfo.message.padEnd(34, " ");

    const binary = getBinString(debugString);

    for (let i = 0; i < binary.length; i++) {
        let row = Math.floor(i / squareInRow) * 8;
        let margin = ((8 * i) % (8 * squareInRow)) + borderWidth;
        context.fillStyle = binary[i] === "0" ? "white" : "black";
        context.fillRect(margin, row, 8, 8);
    }

    element.append(canvas);
}

function getBinString(debugString) {
    let binary = "";
    const encoder = new TextEncoder();
    const bits = encoder.encode(debugString + String.fromCharCode(0));
    bits[47] = bits.reduce((sum, bit) => sum ^ bit);

    bits.forEach((bit) => {
        binary += bit.toString(2).padStart(8, "0");
    });

    return binary;
}

function drawBorder(
    context: CanvasRenderingContext2D,
    fromPos: number,
    height: number
): void {
    context.fillStyle = "black";
    context.fillRect(fromPos, 0, 4, height);
    fromPos += 4;

    context.fillStyle = "white";
    context.fillRect(fromPos, 0, 5, height);
    fromPos += 5;

    context.fillStyle = "black";
    context.fillRect(fromPos, 0, 4, height);
    fromPos += 4;

    context.fillStyle = "white";
    context.fillRect(fromPos, 0, 5, height);
    fromPos += 5;

    context.fillStyle = "black";
    context.fillRect(fromPos, 0, 4, height);
}

// module.exports = renderBarcode;
