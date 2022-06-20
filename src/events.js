import { zip } from "./exporter.js";
import { on } from "./io.js";
import * as UI from "./ui.js";

export default globals => {
//
on.settingChange = setting => {
    globals.param[setting.key] = setting.value;
}
on.inputChange = input => {
    UI.changeInputLineCounter(input.split("\n").length);
}

on.run = () => {
    UI.switchProgress(true, "#run");
    UI.clearOutput();
    globals.input = UI.getInput();
    globals.output = [];
    for(let i = 0; i < globals.input.length; i++) {
        const input = globals.input[i];
        const output = document.createElement("div");
        new QRCode(output, {
            text: input,
            width: globals.param.size,
            height: globals.param.size,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H,
        });
        const img = $(output).find("img")[0];
        globals.output.push(img);
        UI.addToOutput(img);
        UI.setProgress((i + 1) / globals.input.length * 100);
    }
    UI.switchProgress(false);
}

on.download = async () => {
    UI.switchProgress(true, "#download-output");
    const zipped = await zip([
        globals.output,
        globals.input,
        globals.param,
    ], (item, progress) => {
        UI.setProgress(progress);
    });
    UI.download(zipped, "qr-codes.zip");
    UI.switchProgress(false);
}

}