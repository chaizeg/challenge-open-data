(async () => {
  const mapData = await new Promise(resolve => {
    $.getJSON(
      "https://cors-anywhere.herokuapp.com/http://challengeopendata.herokuapp.com/mapData",
      (data) => {
        const arr = new Uint8Array(data.data);
        const raw = new TextDecoder("utf-8").decode(arr);
        resolve(JSON.parse(raw));
      }
    );
  });

  const salaries = {
    "41": 12.820982142857131,
    "2": 13.081481481481479,
    "54": 12.732738095238098,
    "72": 13.069892473118285,
    "82": 14.456603773584895,
    "11": 17.326296296296302,
    "24": 13.423318385650228,
    "25": 12.70672268907563,
    "43": 12.774418604651158,
    "91": 12.810980392156859,
    "21": 12.62962962962963,
    "73": 13.580434782608698,
    "3": 14.212500000000002,
    "52": 12.685853658536587,
    "42": 13.75925925925926,
    "93": 14.120923076923075,
    "83": 13.024137931034483,
    "26": 12.696330275229359,
    "53": 12.756049382716037,
    "23": 13.709600000000002,
    "4": 12.226086956521739,
    "31": 13.203636363636363,
    "1": 13.061538461538463,
    "22": 13.332876712328765,
    "74": 12.649019607843139
  };

  var mymap = L.map('mapid', { zoomControl: false }).setView([46.5, 2.2137], 5);
  mymap.doubleClickZoom.disable();
  mymap.scrollWheelZoom.disable();
  mymap.boxZoom.disable();
  mymap.keyboard.disable();
  mymap.dragging.disable();
  L.tileLayer(
    'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
    {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox.streets'
    },
  ).addTo(mymap);


  function colorMap(value) {
    return value <= 13.568962963 ? '#cae6e3' :
      value <= 14.5082962963 ? '#96cec8' :
        value <= 15.44762962963 ? '#387972' :
          '#1c3c39';
  }
  function getColor(feature) {
    const sal = salaries[feature.properties.code];
    return colorMap(sal);
  }

  function getStyle(feature) {
    return {
      fillColor: getColor(feature),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  }

  var geojson;
  var selected = [];

  function highlightFeature(e) {
    const code = e.target.feature.properties.code;
    if (!selected.find((value) => value === code)) {
      var layer = e.target;

      layer.setStyle({
        fillColor: '#88b2c0',
        weight: 5,
        color: '#576866',
        dashArray: '',
        fillOpacity: 0.7
      });

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    }
  }

  function resetHighlight(e) {
    const code = e.target.feature.properties.code;
    if (!selected.find((value) => value === code)) {
      geojson.resetStyle(e.target);
    }
  }

  function clickFeature(e) {
    const code = e.target.feature.properties.code;
    if (selected.find((value) => value === code)) {
      geojson.resetStyle(e.target);

      selected = selected.filter((value) => value !== code);
      refreshCallback(selected);
    } else if (selected.length < 3) {

      let cpt = 0;
      if (document.getElementById('Sexe').checked) cpt++;
      if (document.getElementById('Poste').checked) cpt++;
      if (document.getElementById('Age').checked) cpt++;
      if (cpt > 1 && selected.length >= 1) return;

      var layer = e.target;

      layer.setStyle({
        fillColor: '#576866',
        weight: 2,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
      });
      selected.push(code);
      refreshCallback(selected);
    }
    else {
      // alert('Limite maximum de régions choisies : 3');
    }


  }

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: clickFeature,
    });
  }

  var legend = L.control({ position: 'bottomright' });

  legend.onAdd = (map) => {
    var div = L.DomUtil.create('div', 'info legend'),
      grades = [0, 13.5, 14.5, 15.5],
      labels = [];
    div.innerHTML += 'Salaire moyen<br><br>';
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
        '<i style="background:' + colorMap(grades[i]) + '"></i> ' +
        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br><br>' : '+');
    }

    return div;
  }

  legend.addTo(mymap);

  geojson = L.geoJSON(
    mapData,
    {
      style: getStyle,
      onEachFeature: onEachFeature,
    },
  ).bindTooltip((layer) => layer.feature.properties.nom)
    .addTo(mymap);


  document.getElementById('Sexe').addEventListener('click', function () {
    let optionsSexe = document.getElementsByClassName('optionsSexe');
    //disable or enable suboptions depending on whether the option is selected or not 
    if (document.getElementById('Sexe').checked) {
      document.getElementById('sexeChoice').style.display = 'block';
      if (selected.length > 1 && (document.getElementById('Age').checked || document.getElementById('Poste').checked)) {
        document.getElementById('Sexe').checked = false;
        document.getElementById('sexeChoice').style.display = 'none';
      }
    }
    else document.getElementById('sexeChoice').style.display = 'none';

    for (var i = 0; i < optionsSexe.length; i++) {
      optionsSexe[i].checked = document.getElementById('Sexe').checked;
      if (document.getElementById('Sexe').checked == false) {
        optionsSexe[i].disabled = true;
      }
      else {
        optionsSexe[i].disabled = false;
      }
    }

    refreshCallback(selected);

  });

  document.getElementById('Age').addEventListener('click', function () {
    //processing age data
    let optionsAge = document.getElementsByClassName('optionsAge');
    for (var i = 0; i < optionsAge.length; i++) {
      optionsAge[i].checked = document.getElementById('Age').checked;
      if (document.getElementById('Age').checked == false) {
        optionsAge[i].disabled = true;
      }
      else {
        optionsAge[i].disabled = false;
      }
    }
    if (document.getElementById('Age').checked) {
      //disabling jobcat filters
      if (document.getElementById('Poste').checked || (selected.length > 1 && (document.getElementById('Sexe').checked) || document.getElementById('Poste').checked)) {
        document.getElementById('Age').checked = false;
      }
      else {
        document.getElementById('ageChoice').style.display = 'block';
      }
    }
    else {
      document.getElementById('ageChoice').style.display = 'none';
    }
    refreshCallback(selected);
  });



  document.getElementById('Poste').addEventListener('click', function () {
    //unable/disable sub-options for job categories
    let optionsPoste = document.getElementsByClassName('optionsPoste');
    for (var i = 0; i < optionsPoste.length; i++) {
      optionsPoste[i].checked = document.getElementById('Poste').checked;
      if (document.getElementById('Poste').checked == false) {
        optionsPoste[i].disabled = true;
      }
      else {
        optionsPoste[i].disabled = false;
      }
    }
    //check if jobcat is crossed with sex filter or not+ necessary processing
    if (document.getElementById('Poste').checked) {
      //disable age filters
      if (document.getElementById('Age').checked || (selected.length > 1 && (document.getElementById('Sexe').checked) || document.getElementById('Age').checked)) document.getElementById('Poste').checked = false;
      else {
        document.getElementById('posteChoice').style.display = 'block';
      }
    }
    else {
      document.getElementById('posteChoice').style.display = 'none';
    }

    refreshCallback(selected);
  });

  document.getElementById('femme').addEventListener('click', function () {
    if (!document.getElementById('femme').checked && !document.getElementById('homme').checked) {
      document.getElementById('Sexe').checked = false;
      document.getElementById('femme').checked = false;
      document.getElementById('homme').checked = false;
      document.getElementById('femme').disabled = true;
      document.getElementById('homme').disabled = true;
      if (!(document.getElementById('Age').checked)) {
        document.getElementById('Poste').disabled = false;
      }
    }
    refreshCallback(selected);
  });

  document.getElementById('homme').addEventListener('click', function () {
    if (!document.getElementById('femme').checked && !document.getElementById('homme').checked) {
      document.getElementById('Sexe').checked = false;
      document.getElementById('femme').checked = false;
      document.getElementById('homme').checked = false;
      document.getElementById('femme').disabled = true;
      document.getElementById('homme').disabled = true;
      if (!(document.getElementById('Age').checked)) {
        document.getElementById('Poste').disabled = false;
      }
    }
    refreshCallback(selected);



  });

  document.getElementById('18').addEventListener('click', function () {
    if (document.getElementById('50').checked == false && document.getElementById('26').checked == false
      && document.getElementById('18').checked == false) {
      document.getElementById('Age').checked = false;
      document.getElementById('18').checked = false;
      document.getElementById('26').checked = false;
      document.getElementById('50').checked = false;
      document.getElementById('18').disabled = true;
      document.getElementById('26').disabled = true;
      document.getElementById('50').disabled = true;
    }
    refreshCallback(selected);
  });

  document.getElementById('26').addEventListener('click', function () {
    if (document.getElementById('50').checked == false && document.getElementById('26').checked == false
      && document.getElementById('18').checked == false) {
      document.getElementById('Age').checked = false;
      document.getElementById('18').checked = false;
      document.getElementById('26').checked = false;
      document.getElementById('50').checked = false;
      document.getElementById('18').disabled = true;
      document.getElementById('26').disabled = true;
      document.getElementById('50').disabled = true;
    }
    refreshCallback(selected);
  });

  document.getElementById('50').addEventListener('click', function () {
    if (document.getElementById('50').checked == false && document.getElementById('26').checked == false
      && document.getElementById('18').checked == false) {
      document.getElementById('Age').checked = false;
      document.getElementById('18').checked = false;
      document.getElementById('26').checked = false;
      document.getElementById('50').checked = false;
      document.getElementById('18').disabled = true;
      document.getElementById('26').disabled = true;
      document.getElementById('50').disabled = true;
    }
    refreshCallback(selected);
  });

  document.getElementById('pdg').addEventListener('click', function () {
    if (document.getElementById('pdg').checked == false && document.getElementById('middleManager').checked == false
      && document.getElementById('employee').checked == false && document.getElementById('worker').checked == false) {
      document.getElementById('Poste').checked = false;
      document.getElementById('pdg').checked = false;
      document.getElementById('middleManager').checked = false;
      document.getElementById('employee').checked = false;
      document.getElementById('worker').checked = false;
      document.getElementById('pdg').disabled = true;
      document.getElementById('middleManager').disabled = true;
      document.getElementById('employee').disabled = true;
      document.getElementById('worker').disabled = true;
    }
    refreshCallback(selected);
  });

  document.getElementById('employee').addEventListener('click', function () {
    if (document.getElementById('pdg').checked == false && document.getElementById('middleManager').checked == false
      && document.getElementById('employee').checked == false && document.getElementById('worker').checked == false) {
      document.getElementById('Poste').checked = false;
      document.getElementById('pdg').checked = false;
      document.getElementById('middleManager').checked = false;
      document.getElementById('employee').checked = false;
      document.getElementById('worker').checked = false;
      document.getElementById('pdg').disabled = true;
      document.getElementById('middleManager').disabled = true;
      document.getElementById('employee').disabled = true;
      document.getElementById('worker').disabled = true;
    }
    refreshCallback(selected);
  });

  document.getElementById('middleManager').addEventListener('click', function () {
    if (document.getElementById('pdg').checked == false && document.getElementById('middleManager').checked == false
      && document.getElementById('employee').checked == false && document.getElementById('worker').checked == false) {
      document.getElementById('Age').checked = false;
      document.getElementById('18').checked = false;
      document.getElementById('26').checked = false;
      document.getElementById('50').checked = false;
      document.getElementById('18').disabled = true;
      document.getElementById('26').disabled = true;
      document.getElementById('50').disabled = true;
    }
    refreshCallback(selected);
  });

  document.getElementById('worker').addEventListener('click', function () {
    if (document.getElementById('pdg').checked == false && document.getElementById('middleManager').checked == false
      && document.getElementById('employee').checked == false && document.getElementById('worker').checked == false) {
      document.getElementById('Poste').checked = false;
      document.getElementById('pdg').checked = false;
      document.getElementById('middleManager').checked = false;
      document.getElementById('employee').checked = false;
      document.getElementById('worker').checked = false;
      document.getElementById('pdg').disabled = true;
      document.getElementById('middleManager').disabled = true;
      document.getElementById('employee').disabled = true;
      document.getElementById('worker').disabled = true;
    }
    refreshCallback(selected);
  });
}
)();