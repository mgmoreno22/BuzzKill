$.getJSON("http://api.covidtracking.com/v1/us/current.json", data => {
  // console.log(data);
  $(".US1").text(data[0].positive);
  $(".US2").text(data[0].recovered);
  $(".US3").text(data[0].death);
});

//const state = "";
//const x =  $( "#covid-states option:selected" )
//if($(.value)= "CA")
apiCall("ca");
$("#covid-states").change(() => {
  const x = $("#covid-states option:selected").text();
  $(".state-name").text(x);
  const y = $("#covid-states option:selected").val();
  console.log(x);
  console.log(y);

  apiCall(y);
});

function apiCall(state) {
  $.getJSON(
    "http://api.covidtracking.com/v1/states/" + state + "/current.json",
    data => {
      console.log(data);
      $(".CA1").text(data.positive);

      if (data.recovered === null) {
        $(".CA2").text("Not yet known");
      } else {
        $(".CA2").text(data.recovered);
      }
      //$(".CA2").text(data.recovered);
      $(".CA3").text(data.death);
    }
  );
}
