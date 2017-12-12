$(document).ready(function(){
  console.log("Profile JQuery Loaded")

  $('.repo-time span').each(function(){
    let date = new Date($(this).text()).toLocaleDateString()
    $(this).text(date);
  })

  $.ajax({
    method: 'GET',
    url:`/api/repo/${$('#repo-container').attr('repo')}/languages`,
    success: repoLanguageSuccess,
    failure: repoLanguageFailure
  })

  function repoLanguageSuccess(data){
    let langChart = [['Language','Lines of Code']]
    for(let key in data){
      if(data.hasOwnProperty(key)){
        langChart.push([key, data[key]])
      }
    }
    googleCharts(langChart, 'Language Summary');
  }

  function repoLanguageFailure(data){
    console.log(data)
  }

  function googleCharts(languages,title){
    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = google.visualization.arrayToDataTable(languages);
      var options = {
        pieHole: 0.4,
        chartArea:{left:0,top:0,width:'100%',height:'100%'}
      };
      var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
      chart.draw(data, options);
    }
  }
})// End document ready
