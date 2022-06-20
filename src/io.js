export const on = {
    run: () => {},
    download: () => {},
    settingChange: (setting) => {},
    inputChange: (input) => {},
}

const $input = $("#url-input");
const $download = $("#download");
const $run = $("#run");

const $param_size = $("#param-size");
const $param_format = $("#param-format");

$input.on("input", () => {
    on.inputChange($input.val());
}).on("keydown", (e) => {
    on.inputChange($input.val());
});

$download.on("click", () => {
    on.download();
});
$run.on("click", () => {
    on.run();
});

$param_size.on("input", () => {
    on.settingChange({
        key: "size",
        value: parseInt($param_size.val()),
    });
});
$param_format.on("input", () => {
    on.settingChange({
        key: "format",
        value: $param_format.val(),
    });
});
