var cmd_data = []

function cmdStatisticLoaded(){
  console.log('iframe with data loaded')

  cmd_data = JSON.parse(document.getElementById("cmd_stat").contentDocument.getElementById('res').innerText);
  chart.data = cmd_data['detail'];
  for(key of ['active', 'pending', 'accepted', 'refused']){
    document.getElementById('stat-'+key).innerText = cmd_data['overview'][key]
  }
}
