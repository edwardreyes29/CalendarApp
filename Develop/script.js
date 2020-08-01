var events = []; // To store events


// $("textarea").on("click", function () {
//     // Only concatenate firstNumber while operator has not been pressed
//     console.log($(this).val());
// })
function initEvents() {
    var storedEvents = JSON.parse(localStorage.getItem("events"));
    // If there are no events, exit function
    if (storedEvents === null) {
        return;
    }
    
    storedEvents.forEach(element => events.push(element));
    renderEvents();
    // $("textarea[data-hour*='" + hour + "']").addClass("present");
}
initEvents();

function renderEvents() {
    if (events.length === 0) {
        return;
    }
    // render events to each appropriate time-block
    for (var i = 0; i < events.length; i++) {
        var textarea = $("textarea[data-hour*='" + events[i].dataHour + "']");
        textarea[0].textContent = events[i].description;
    }
}

$("button").on("click", function () {
    // Get the previous sibling
    var textarea = $(this).prev()[0]; 

    // Get the data-hour attribute
    var dataHour = textarea.getAttribute('data-hour')
    var description = textarea.value.trim();

    // If event is empty, exit function
    if (description.length === 0) {
        alert("Event empty");
        return;
    }

    var event = {
        description: description,
        dataHour: dataHour
    }

    events.push(event);

    localStorage.setItem("events", JSON.stringify(events))
    

})

