function shorterTitle(name, val){
  if($(window).width()<880){
    document.getElementById('header-title').innerText = 'Champ-Ramard.fr'
  } else {
    document.getElementById('header-title').innerText = 'Administration de Champ-Ramard.fr'
  }
}
$(window).on("resize", shorterTitle);
shorterTitle();


for (iframe in document.getElementsByClassName('iframe-resize')){
  iframe.onload = function() {
     try {
       div.style.height = div.contentWindow.document.body.scrollHeight + 'px';
     } catch (e) {
       // nothing
     }
  }
}
