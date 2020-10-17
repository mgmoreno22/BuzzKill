$.getJSON("https://api.covidtracking.com/v1/us/current.json", data => {
  console.log(data[0]);
});
