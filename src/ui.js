const $input = $("#url-input");
const $input_conter = $("#input-counter");
const $output = $("#output");
const $loading = $("#loading");

export const switchProgress = (bool, goTo = "#run") => {
    $loading.appendTo(goTo);
    if(bool) {
        $loading.removeClass("hidden");
        $("input, button, select, textarea").attr("disabled", "disabled");
    } else {
        $loading.addClass("hidden");
        $("input, button, select, textarea").removeAttr("disabled");
    }
}

export const setProgress = (progress) => {
    $loading.css("--prc", progress);
}

export const download = (data, name) => {
    const a = document.createElement("a");
    a.href = data;
    a.download = name;
    a.click();
}

export const getInput = () => {
    const input = $input.val().split("\n");
    return input;
}
export const changeInputLineCounter = (count) => {
    $input_conter.text(`${count} lines`);
}

export const clearOutput = () => {
    $output.empty();
}
export const addToOutput = (elem) => {
    $output.append(elem);
}
