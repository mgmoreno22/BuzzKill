$(document).ready(function() {
    // $('#datetimepicker1').datetimepicker();

    var reportList = $(".report-container")

    getReports()

    function getReports() {
        $.get("/api/reports", renderReportCards);
    }

    function renderReportCards(data) {
        // console.log(data[0])
        // if (!data.length) {
        //     window.location.href = "/home";
        // }
        reportList.empty();
        var cardsToAdd =[];
        for (var i=0; i < data.length; i++) {
            cardsToAdd.push(createReportCard(data[i]));
            console.log(data[i])
        }
        // console.log(cardsToAdd);
        reportList.prepend(cardsToAdd);
    }

    function createReportCard(report) {
        var imgSrc = "";
        var eventTitle = "";
        if (report.event_id == 1) {
            imgSrc = "images/icon-adult.png"
            eventTitle = "Adult Party"
        }
        else if (report.event_id == 2) {
            imgSrc = "images/icon-baby.png"
            eventTitle = "Children's Party"
        }
        else if (report.event_id == 3) {
            imgSrc = "images/icon-crowd.png"
            eventTitle = "Holiday Party"
        }
        else if (report.event_id == 4) {
            imgSrc = "images/icon-wedding.png"
            eventTitle = "Wedding Ceremony/Party"
        }

        var $newReportCard = $(
            [
                "<div class='report-card' id='",
                report.id,
                "'><img src='",
                imgSrc,
                "'><h3>",
                eventTitle,
                "</h3><p>",
                report.address,
                "</p>"
            ].join("")
        );

        return $newReportCard
    }

    // Listening for Full Report to close
    // $('#reportClose').click(()=> {
    //     console.log("are you trying to close?")
    //     $('#reportContainer').addClass('d-none')
    //     $('#covid-data').removeClass('d-none')
    // })

    //Listening to Generate Report
    // $('div.report-card').click(() => {
    //     console.log(this)
    //     console.log("Not a button")
    // })


    // Function that creates new report in database
    $('.reportBtn').click(() => {
        // Need to get user's name or email from cookie
        //find the user's ID for report
        const userId = 1;
        const eventName = $('#event-type').val()
        const address = $('input#address').val().trim()
        const locationType = $('#location-type').val()
        const reportDate = $('#reportDate').val()
        const note = $('#eventNotes').val()

        // console.log("user: " + userId)
        // console.log("event: " + eventName)
        // console.log("address: " + address)
        // console.log("location: " + locationType)
        // console.log("Report Date: " + reportDate)
        // console.log("Note: " + note)

        var reportData = {
            user_id: userId,
            event_id: eventName,
            address: address,
            location_id: locationType,
            start_time: reportDate,
            notes: note
        }

        $.ajax({method:"POST", url: "/api/reports", data:reportData})
        window.location.reload()
    })
});