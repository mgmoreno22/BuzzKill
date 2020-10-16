$(document).ready(function() {
    $('#datetimepicker1').datetimepicker();

    $('.reportBtn').onClick(() => {
        // Need to get user's name or email from cookie
        //find the user's ID for report
        const userId = "";
        const eventName = $('#event-type')
        const address = $('input#address')
        const locationType = $('#location-type')
        const reportDate = $('#datetimepicker1')
        const note = $('#eventNotes')

        console.log("user: " + userId)
        console.log("event: " + eventName)
        console.log("address: " + address)
        console.log("location: " + locationType)
        console.log("Report Date: " + reportDate)
        console.log("Note: " + note)

        // Switch cases
    })
});