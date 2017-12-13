$(document).ready(function(){
  console.log("Profile JQuery Loaded")
  // Initialize Materialze Tabs
  $('ul.tabs').tabs();

  //C Convert Repo date string to readable date
  $('.repo-time span').each(function(){
    let date = new Date($(this).text()).toLocaleDateString()
    $(this).text(date);
  })

  // Ajax calls to run on profile page to load information
  if($('#profile-container').length){
    $.ajax({
      method: 'GET',
      url:`/api/profile/languages`,
      success: profileLanguageSuccess,
      failure: profileLanguageFailure
    })

    $.ajax({
      method: 'GET',
      url:`/api/profile/followers`,
      success: profileFollowersSuccess,
      failure: profileFollowersFailure
    })

    $.ajax({
      method: 'GET',
      url:`/api/profile/following`,
      success: profileFollowingSuccess,
      failure: profilefollowingFailure
    })
  }

  // Ajax call to only run on repo page
  if($('#repo-container').length){
    $.ajax({
      method: 'GET',
      url:`/api/repo/${$('#repo-container').attr('repo')}/languages`,
      success: repoLanguageSuccess,
      failure: repoLanguageFailure
    })
  }

})// End document ready

// Run once profile language breakdown info is loaded and build out graph
function profileLanguageSuccess(data){
  data = data.reverse()
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
    $('#language-week-breakdown').append(dateContainerHMTL);
  })

  // Button to allow exapnsion view of graphs
  $('#graph-show-button').on('click',function(e){
    e.preventDefault()
    $('.language-graph').toggleClass('active')
    $(this).text(function(i, text){
      return text === "Show More" ? "Show Less" : "Show More"
    })

  })
}

function profileLanguageFailure(data){
  console.log(data)
}

// Once follower data is loaded this will take data and hit google charts API to produce history graph
function profileFollowersSuccess(data){
  let chartData = [['Time','Followers']]
  data.forEach(function(log){
    let time = new Date(log.date).toLocaleTimeString()
    chartData.push([time, log.followerCount])
  })
  let dataFlip = data.slice(0).reverse()
  if(dataFlip.length > 1 ){
    if(dataFlip[0].followerCount > dataFlip[1].followerCount){
      let percentIncrease = ((dataFlip[0].followerCount - dataFlip[1].followerCount)/dataFlip[1].followerCount)*100
      $('#followers-container h3').append(` <span class="increase">+${Math.round(percentIncrease*100)/100}%</span>`)
    }else{
      let percentDecrease = ((dataFlip[1].followerCount - dataFlip[0].followerCount)/dataFlip[1].followerCount)*100
      $('#followers-container h3').append(` <span class="decrease">-${Math.round(percentDecrease*100)/100}%</span>`)
    }
  }
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable(chartData);
    var options = {
      curveType: 'function',
      legend: { position: 'bottom' },
      chartArea:{width:'80%',height:'80%'}
    };
    var chart = new google.visualization.LineChart(document.getElementById('followers-chart'));
    chart.draw(data, options);
  }
}

function profileFollowersFailure(data){
  console.log(data)
}

// Once following data is loaded this will take data and hit google charts API to produce history graph
function profileFollowingSuccess(data){
  let chartData = [['Time','Following']]
  data.forEach(function(log){
    let time = new Date(log.date).toLocaleTimeString()
    chartData.push([time, log.followingCount])
  })
  let dataFlip = data.slice(0).reverse()
  if(dataFlip.length > 1){
    if(dataFlip.length > 1 && dataFlip[0].followingCount > dataFlip[1].followingCount){
      let percentIncrease = ((dataFlip[0].followingCount - dataFlip[1].followingCount)/dataFlip[1].followingCount)*100
      $('#following-container h3').append(` <span class="increase">+${Math.round(percentIncrease*100)/100}%</span>`)
    }else{
      let percentDecrease = ((dataFlip[1].followingCount - dataFlip[0].followingCount)/dataFlip[1].followingCount)*100
      $('#following-container h3').append(` <span class="decrease">-${Math.round(percentDecrease*100)/100}%</span>`)
    }
  }

  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable(chartData);
    var options = {
      curveType: 'function',
      legend: { position: 'bottom' },
      chartArea:{width:'80%',height:'80%'}
    };
    var chart = new google.visualization.LineChart(document.getElementById('following-chart'));
    chart.draw(data, options);
  }
}
function profilefollowingFailure(data){
  console.log(data)
}

// Sort repo language breakdown and create pie chart on repo page
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
  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = google.visualization.arrayToDataTable(langChart);
    var options = {
      pieHole: 0.4,
      chartArea:{left:0,top:0,width:'95%',height:'100%'}
    };
    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
  }
}

function repoLanguageFailure(data){
  console.log(data)
}
