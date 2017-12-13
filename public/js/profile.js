$(document).ready(function(){
  console.log("Profile JQuery Loaded")
  $('ul.tabs').tabs();
  $('.repo-time span').each(function(){
    let date = new Date($(this).text()).toLocaleDateString()
    $(this).text(date);
  })

  if($('#profile-container').length){
    $.ajax({
      method: 'GET',
      url:`/api/profile/languages`,
      success: profileLanguageSuccess,
      failure: profileLanguageFailure
    })
  }

  function profileLanguageSuccess(data){
    console.log(data)
    data.forEach(function(log){
      let dateContainerHMTL = $.parseHTML(`<div class='language-graph'>
        <h4>${new Date(log.date).toLocaleDateString()}</h4>
      </div>`)
      let graphHTML = $.parseHTML('<ul class="row"></ul>')
      for(let key in log.languageCounts){
        if(log.languageCounts.hasOwnProperty(key)){
          let percentage = (log.languageCounts[key]/log.repoTotal)*100
          let graphItem = $.parseHTML(`<li class="${key} graph-lang" style='width:${percentage}%'>
              <div class="graph-language-container">
                <span>${key}</span>
                <span>${(Math.round(percentage*100))/100}%</span>
              </div>
            </li>`)
          $(graphHTML).append(graphItem)
        }
      }
      $(dateContainerHMTL).append(graphHTML)
      $('#language-week-breakdown').prepend(dateContainerHMTL);
      console.log($('.graph-language-container').width())
    })
  }

  function profileLanguageFailure(data){
    console.log(data)
  }

  if($('#repo-container').length){
    $.ajax({
      method: 'GET',
      url:`/api/repo/${$('#repo-container').attr('repo')}/languages`,
      success: repoLanguageSuccess,
      failure: repoLanguageFailure
    })
  }

  function repoLanguageSuccess(data){
    let langChart = [['Language','Lines of Code']]
    for(let key in data){
      if(data.hasOwnProperty(key)){
        if(key === "null"){
          langChart.push(['Unclassified', data[key]])
        }else{
          langChart.push([key, data[key]])
        }
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
