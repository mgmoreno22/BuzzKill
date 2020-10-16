$(document).ready(function() {
    $('#datetimepicker1').datetimepicker();

    $('.reportBtn').click(() => {
        // Need to get user's name or email from cookie
        //find the user's ID for report
        const userId = 1;
        const eventName = $('#event-type').val()
        const address = $('input#address').val().trim()
        const locationType = $('#location-type').val()
        const reportDate = $('#reportDate').val()
        const note = $('#eventNotes').val()

        console.log("user: " + userId)
        console.log("event: " + eventName)
        console.log("address: " + address)
        console.log("location: " + locationType)
        console.log("Report Date: " + reportDate)
        console.log("Note: " + note)

        var reportData = {
            user_id: userId,
            event_id: eventName,
            address: address,
            location_id: locationType,
            start_time: reportDate,
            notes: note
        }

        postReport(reportData.user_id, reportData.event_id, reportData.address, reportData.location_id, reportData.start_time, reportData.notes)
    })

    function postReport(user, event, address, location, time, note) {
        $.post("/api/reports", {
            user_id: user,
            event_id: event,
            address: address,
            location_id: location,
            start_time: time,
            notes: note
        })
        .then(() => {
            window.location.replace("/home")
        })
        .catch(err => {
            console.log(err)
            resizeBy.status(401).json(err)
        })
    }
});