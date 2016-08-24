(function daysSinceEvent() {
    var numberOfDaysElement = document.getElementById("numberOfDays");
    var descriptionElement = document.getElementById("eventDescription");
    var eventDateString = getQueryVariable("eventDate");
    var eventDescriptionString = getQueryVariable("eventDescription");
    var daysSinceEvent = getDaysSinceDate(eventDateString);

    if (typeof eventDateString !== "undefined") {
        numberOfDaysElement.innerHTML = daysSinceEvent;
    }
    if (typeof eventDescriptionString !== "undefined") {
        descriptionElement.innerHTML = eventDescriptionString;
    }

    var daysBeforeAlertingInt = parseInt(getQueryVariable("daysBeforeAlerting"));
    var daysBeforeWarningInt = parseInt(getQueryVariable("daysBeforeWarning"));
    if (daysSinceEvent > daysBeforeAlertingInt) {
    	numberOfDaysElement.parentElement.classList.add("alert");
    } else if (daysSinceEvent > daysBeforeWarningInt) {
    	numberOfDaysElement.parentElement.classList.add("warning");
    }

    function getDaysSinceDate(eventDateString) {

        var eventDate = new Date(eventDateString);
        var currentDate = new Date();
        var daysSinceEvent = Math.floor((currentDate - eventDate)/(1000*60*60*24));
        return daysSinceEvent;
    }

    function getQueryVariable(variable) {

        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return unescape(pair[1]);
            }
        } 
    }
})();
