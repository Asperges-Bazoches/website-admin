// Get the Sidebar
var mySidebar = document.getElementById("mySidebar");
// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");

// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open() {
  if (mySidebar.style.display === 'block') {
    mySidebar.style.display = 'none';
    overlayBg.style.display = "none";
  } else {
    mySidebar.style.display = 'block';
    overlayBg.style.display = "block";
  }
}
// Close the sidebar with the close button
function w3_close() {
  mySidebar.style.display = "none";
  overlayBg.style.display = "none";
}


function displayClass(name, val){
  for (elem of document.getElementsByClassName(name)){
    elem.style.display = val;
  }
}


const link2print = {
    "#ordernow" : "https://api.champ-ramard.fr/secure/build_table.php?template=today&print=1",
    "#ordertomorrow" : "https://api.champ-ramard.fr/secure/build_table.php?template=tomorrow&print=1",
    "#order" : "https://api.champ-ramard.fr/secure/build_table.php?print=1"
}

function locationHashChanged() {
  var selectedElem = false;

  // Hide everything
  displayClass('tab-content', 'none')
  displayClass('printable', 'none')

  // Get new Hash
  hash = (location.hash != '') ? location.hash : '#home'

  // Retrieve selected button and disabled the others
  for (elem of document.getElementsByClassName('w3-button')){
    if(elem.getAttribute('href') === hash){
      selectedElem = elem
      selectedElem.classList.add("w3-blue");
    } else {
      elem.classList.remove("w3-blue");
    }
  }

  // Print tool section if needed
  if (selectedElem!==false){
    if (selectedElem.classList.contains('isprintable')){
      displayClass('printable', 'block')
      document.getElementById('toprint').setAttribute("href", link2print[location.hash])
    }
  }

   // Display content associated to hash
   displayClass(hash.replace('#', ''), 'block')
   // Scroll to top
   window.scrollTo(0, 0);
}
window.onhashchange = locationHashChanged;
locationHashChanged()
