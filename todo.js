//funktio jossa haetaan käyttäjän syöte ja siirretään se li elementteihin
function uusiTehtävä() {
//määritetään muuttujat, ensiksi sille mitä käyttäjä kirjoittaa, toiseksi ul elementille, kolmanneksi li elementtien luomiselle
	var tehtävä = document.getElementById("syöte").value;
	var lista = document.getElementById("lista");
	var listaItem = document.createElement("li");
  
//tarkistetaan onko syötekenttä tyhjä kun käyttäjä painaa nappia, jos niin, tulee alert tyyppinen hälytys
  if (tehtävä == "" || tehtävä.length == 0 || tehtävä == null){
	alert('Kenttä ei voi olla tyhjä!');
	}
//jos syöte ei ole tyhjä niin luodaan TextNodella ul listan (muuttuja lista) perään käyttäjän syöttämät todo tehtävät 
	else{
	listaItem.appendChild(document.createTextNode(tehtävä));
	lista.appendChild(listaItem);
//seuraavaksi tyhjennetään käyttäjän syöttämä teksti tekstikentästä
	document.getElementById("syöte").value = "";
//sitten onclick kuuntelija joka poistaa klikatun listaItem:in
	listaItem.onclick = poistaTehtävä;
	}
};
//funktio joka hoitaa listaItemien poistamisen
function poistaTehtävä(e) {
	e.target.parentElement.removeChild(e.target);
}
