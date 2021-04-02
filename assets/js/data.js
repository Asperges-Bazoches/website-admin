var cmd_data = []

function cmdStatisticLoaded(){
  console.log('iframe with data loaded')

  cmd_data = JSON.parse(document.getElementById("cmd_stat").contentDocument.getElementById('res').innerText);
  chart.data = cmd_data['detail'];
  time_chart.data = cmd_data['rep-hour'];
  for(key of ['active', 'pending', 'accepted', 'refused']){
    document.getElementById('stat-'+key).innerText = cmd_data['overview'][key]
  }
}

// AVAILABILITY

var availability = {'aspb' : true, 'aspv' : true, 'fraise' : true}
const colorBkg = {'aspb' : "white", 'aspv' : "green", 'fraise' : "red"}
const colorI = {'aspb' : "green", 'aspv' : "white", 'fraise' : "white"}

function updateAvailability(){
  for (item of ['aspb', 'aspv', 'fraise']) {
    if(availability[item]){
      document.getElementById(item+'-container').classList.remove('w3-teal')
      document.getElementById(item+'-container').classList.add('w3-'+colorBkg[item])
      document.getElementById(item+'-container').childNodes[3].childNodes[1].childNodes[0].style.color=colorI[item]
      document.getElementById(item+'-container').childNodes[3].childNodes[1].childNodes[0].classList.remove('fa-spinner')
      document.getElementById(item+'-container').childNodes[3].childNodes[1].childNodes[0].classList.remove('fa-times-circle')
      document.getElementById(item+'-container').childNodes[3].childNodes[1].childNodes[0].classList.add('fa-check-circle')
    } else {
      document.getElementById(item+'-container').classList.remove('w3-'+colorBkg[item])
      document.getElementById(item+'-container').classList.add('w3-teal')
      document.getElementById(item+'-container').childNodes[3].childNodes[1].childNodes[0].style.color="red"
      document.getElementById(item+'-container').childNodes[3].childNodes[1].childNodes[0].classList.remove('fa-spinner')
      document.getElementById(item+'-container').childNodes[3].childNodes[1].childNodes[0].classList.remove('fa-check-circle')
      document.getElementById(item+'-container').childNodes[3].childNodes[1].childNodes[0].classList.add('fa-times-circle')
    }
  }
}

$.get("https://api.champ-ramard.fr/settings.php", function(result){
  for(var k in result) {
    if(result[k]['STR_KEY']=='aspb' | result[k]['STR_KEY']=='aspv' | result[k]['STR_KEY']=='fraise'){
      if(result[k]['STR_VALUE']=='true'){
        availability[result[k]['STR_KEY']] = true
      }else if(result[k]['STR_VALUE']=='false'){
        availability[result[k]['STR_KEY']] = false
      }else{
        availability[result[k]['STR_KEY']] = result[k]['STR_VALUE']
      }
    }
  }
  updateAvailability()
})
