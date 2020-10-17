$(document).ready(function() {

    var reportList = $(".report-container")
    var fullReport = $(".fullReport")

    getReports()
    // Delete this
    showReport(3)

    function getReports() {
        $.get("/api/reports", renderReportCards);
    }
    
    function showReport(id) {
        $.ajax({
            method: "GET",
            url: "/api/reports/" + id
        }).then((data) => {renderReport(data)});
    }

    function renderReportCards(data) {
        reportList.empty();
        var cardsToAdd =[];
        for (var i=0; i < data.length; i++) {
            cardsToAdd.push(createReportCard(data[i]));
            // console.log(data[i])
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

    function renderReport(report) {
        // find event title
        var eventTitle = "";
        if (report.event_id == 1) {
            eventTitle = "Adult Party"
        }
        else if (report.event_id == 2) {
            eventTitle = "Children's Party"
        }
        else if (report.event_id == 3) {
            eventTitle = "Holiday Party"
        }
        else if (report.event_id == 4) {
            eventTitle = "Wedding Ceremony/Party"
        }

        //find location type
        var locationType = "";
        switch (report.location_id) {
            case 1: locationType = "Public Park"; break;
            case 2: locationType = "Food/Dining"; break;
            case 3: locationType = "Bar/Brewery"; break;
            case 4: locationType = "Lounge/Nightclub"; break;
            case 5: locationType = "Indoor Activity Spot"; break;
            case 6: locationType = "Outdoor Activity Spot"; break;
            case 7: locationType = "Other"; break;
        }

        //Create map src url
        var mapSrc = "https://maps.google.com/maps?q=";
        mapSrc += report.address;
        mapSrc += "&t=&z=13&ie=UTF8&iwloc=&output=embed"

        $('#reportEvent').text(eventTitle)
        $('#gmap_canvas').attr('src', mapSrc)
        $('#reportAddress').text(report.address)
        $('#reportLocation').text(locationType)
        $('#reportTime').text(report.start_time)
        $('#reportNote').text(report.notes)
    }

    $(".report-card").on('click', function() {

        var id = $(this).attr('id');
        // 
        console.log("ID - " + id);
  
        // Pull Data
        var repAddress = $("#"+id+" .report-address").text();
        var repLocationType = $("#"+id+" .report-location-type").text();
        var repStart = $("#"+id+" .report-start-type").text();
        var repReportedBy = $("#"+id+" .report-reported-by").text();
        var repNotes = $("#"+id+" .report-notes").text();
  
        console.log("repAddress " +repAddress);
        console.log("repLocationType " +repLocationType);
        console.log("repStart " +repStart);
        console.log("repReportedBy " +repReportedBy);
        console.log("repNotes " +repNotes);
  
  
        // Push Data
        $("#card-address").text(repAddress);
        $("#card-type").text(repLocationType);
        $("#card-time").text(repStart);
        $("#card-name").text(repReportedBy);
        $("#card-notes").text(repNotes);
  
        // Show Details
        $("#covid-data").removeClass("d-block");
        $("#covid-data").addClass("d-none");
        
        $("#reportContainer").removeClass("d-none");
        $("#reportContainer").addClass("d-block");
  
    });

    $("#reportClose").click(() => {
  
        // Show Details
        $("#covid-data").removeClass("d-none");
        $("#covid-data").addClass("d-block");
        
        $("#reportContainer").removeClass("d-block");
        $("#reportContainer").addClass("d-none");
  
    }); 


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