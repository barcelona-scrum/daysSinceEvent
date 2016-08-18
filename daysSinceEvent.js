(function daysSinceEvent() {
    var numberOfDaysElement = document.getElementById("numberOfDays");
    var descriptionElement = document.getElementById("eventDescription");
    var eventDateString = getQueryVariable("eventDate");
    var eventDescriptionString = getQueryVariable("eventDescription");

    if (typeof eventDateString !== "undefined") {
        numberOfDaysElement.innerHTML = getDaysSinceDate(eventDateString);
    }
    if (typeof eventDescription !== "undefined") {
        descriptionElement.innerHTML = eventDescriptionString;
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
