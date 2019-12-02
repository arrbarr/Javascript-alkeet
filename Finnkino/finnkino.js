//Funktio jolla luodaan drop down menu johon ilmestyvät valittavissa olevat teatterit
function teatterit() {
//Haetaan XML tiedosto
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET","https://www.finnkino.fi/xml/TheatreAreas/",true);
	xmlhttp.send();

	xmlhttp.onreadystatechange=function() {
	if (xmlhttp.readyState==4 && xmlhttp.status==200){
	//Siirretään saatua tietoa muuttujiin
	var teatteritiedot = xmlhttp.responseXML;
	var teatterinimet = teatteritiedot.getElementsByTagName("Name");
	var teatteriID = teatteritiedot.getElementsByTagName("ID");
  	//for silmukan avulla luodaan valittavat menu vaihtoehdot
  	for (var i = 0; i < teatterinimet.length; i++) {
  	var menu = document.createElement('option');
  	menu.text = teatterinimet[i].innerHTML;
  	menu.value = teatteriID[i].innerHTML;
  	document.getElementById("valinta").add(menu);
  	
  }
}
}
}
//funktio joka tuo valikosta valitun teatterin näytökset ja niiden erinäisiä tietoja
function tuo(){
	//Haetaan valitun teatterin arvo ja liitetään se XML- hakulinkkiin saaden oikean teatterin tiedot haettua
	var sijoitus = document.getElementById("valinta").value;
	var info = "https://www.finnkino.fi/xml/Schedule/?area=" + sijoitus;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", info , true);
	xmlhttp.send();
	xmlhttp.onreadystatechange=function() {
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			//siirretään saadut tiedot muuttujiin
			var tiedot = xmlhttp.responseXML;
			var nimi = tiedot.getElementsByTagName("Title");
			var pituus = tiedot.getElementsByTagName("LengthInMinutes");
			var alku = tiedot.getElementsByTagName("dttmShowStart");
			var loppu = tiedot.getElementsByTagName("dttmShowEnd");
			var juliste = tiedot.getElementsByTagName("EventSmallImagePortrait");
			var kieli = tiedot.getElementsByTagName("PresentationMethodAndLanguage");
			var genre = tiedot.getElementsByTagName("Genres");
			var ikäraja = tiedot.getElementsByTagName("RatingImageUrl");
			//Rakennetaan HTML-rakenne sijoittaen tiedot siihen
			var näytökset = "<table>";
				for(var i = 0; i < nimi.length; i++) {
					näytökset +=  "<tr><td>" + "<h3>" + nimi[i].childNodes[0].nodeValue + "</h3>" + pituus[i].childNodes[0].nodeValue +" Minuuttia<br>Aloitusaika:<br>"+ alku[i].childNodes[0].nodeValue + "<br>Lopetusaika:<br>" 
							+ loppu[i].childNodes[0].nodeValue + "</td>"+ "<td>" + "<img src="+ juliste[i].childNodes[0].nodeValue + ">" +  "</td>" +
							"<td>"   + kieli[i].childNodes[0].nodeValue  + "<br>" + genre[i].childNodes[0].nodeValue + "<br>" + "<img src="+ ikäraja[i].childNodes[0].nodeValue + ">" + "</td></tr>";		
					}
			näytökset += "</table>";
			//Syötetään ylläoleva rakenne verkkosivulle
			document.getElementById("elokuvat").innerHTML = näytökset;
		}
	}
}
