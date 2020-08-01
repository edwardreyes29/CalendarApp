$("textarea").on("click", function () {
    // Only concatenate firstNumber while operator has not been pressed
    console.log($(this).val());
})

$("button").on("click", function () {
    // Only concatenate firstNumber while operator has not been pressed
    console.log($(this).prev()[0].value);
})

