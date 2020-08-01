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
        currentEventHour = parseInt(events[i].dataHour);
        var textarea = $("textarea[value*='" + currentEventHour + "']");
        textarea[0].textContent = events[i].description;
    }
}

$("button").on("click", function () {
    // Get the previous sibling
    var textarea = $(this).prev()[0]; 

    // Get the data-hour attribute
    var dataHour = parseInt(textarea.getAttribute('value'));

    var description = textarea.value.trim();
    // If event is empty, exit function
    if (description.length === 0) {
        var saveNotify = $("div[value*='" + dataHour + "']");
        saveNotify[0].classList.remove("text-success");
        saveNotify[0].classList.add("text-danger");
        saveNotify[0].textContent = "Nothing was saved"
        saveNotify[0].style.display = "block";

        // Only show for 2 seconds
        setInterval(function() {
            saveNotify[0].classList.add("text-success");
            saveNotify[0].classList.remove("text-danger");
            saveNotify[0].textContent = ""
            saveNotify[0].style.display = "none";
        }, 2000);
        return;
    }

    var event = {
        description: description,
        dataHour: dataHour
    }

    events.push(event);

    localStorage.setItem("events", JSON.stringify(events))
    
    // send a notification that the event has been saved
    var saveNotify = $("div[value*='" + dataHour + "']");
    saveNotify[0].textContent = "Event has been saved"
    saveNotify[0].style.display = "block";

    // Only show for 2 seconds
    setInterval(function() {
        saveNotify[0].textContent = ""
    saveNotify[0].style.display = "none";
    }, 2000);
})

