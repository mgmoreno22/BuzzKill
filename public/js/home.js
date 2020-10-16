$(document).ready(function() {
    $('#datetimepicker1').datetimepicker();

    $('.reportBtn').click(() => {
        // Need to get user's name or email from cookie
        //find the user's ID for report
        const userId = "";
        const eventName = $('#event-type').val()
        const address = $('input#address').val().trim()
        const locationType = $('#location-type').val()
        const reportDate = $('#datetimepicker1').val()
        const note = $('#eventNotes').val()

        console.log("user: " + userId)
        console.log(eventName)
        console.log("address: " + address)
        console.log("location: " + locationType)
        console.log("Report Date: " + reportDate)
        console.log("Note: " + note)

        // Switch cases
    })
});