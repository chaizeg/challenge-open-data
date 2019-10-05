
    
    var color = Chart.helpers.color;
    var ctx = document.getElementById('canvas').getContext('2d');
    var ctx2 = document.getElementById('canvasTwo').getContext('2d');
    var barChartData = {};
    var regionNames = {"6": "Saint-Pierre-et-Miquelon", "22": "Picardie", "83": "Auvergne", "24": "Centre", "82": "Rh\u00f4ne-Alpes", "91": "Languedoc-Roussillon", "72": "Aquitaine", "25": "Basse-Normandie", "42": "Alsace", "94": "Corse", "73": "Midi-Pyr\u00e9n\u00e9es", "5": "Mayotte", "21": "Champagne-Ardenne", "1": "Guadeloupe", "23": "Haute-Normandie", "26": "Bourgogne", "11": "\u00cele-de-France", "74": "Limousin", "93": "Provence-Alpes-C\u00f4te d'Azur", "41": "Lorraine", "code_r\u00e9gion": "nom_r\u00e9gion", "2": "Martinique", "31": "Nord-Pas-de-Calais", "54": "Poitou-Charentes", "53": "Bretagne", "4": "La R\u00e9union", "52": "Pays de la Loire", "3": "Guyane", "43": "Franche-Comt\u00e9"};

    function compareKeys(a, b) {
      var aKeys = Object.keys(a).sort();
      var bKeys = Object.keys(b).sort();
      return JSON.stringify(aKeys) === JSON.stringify(bKeys);
    }

    plotStandard();

    window.onload = function() {
      window.myChart = new Chart(ctx, {
        type: 'bar',
        data: barChartData,
        options: {
          responsive: true,
          responsiveAnimationDuration:800,
          legend: {
            position: 'bottom',
          },
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0 
            }
          },
          title: {
            display: true,
            text: 'Salaire moyen par région'
          }
        }
      });
      window.myRadar = new Chart(ctx2, {});

    };

    function rebuildChart(data, title, additional='bar', context=ctx){
        if(additional != 'radar'){
          window.myChart.destroy();
          window.myChart = new Chart(context, {
              type: additional,
              data: data,
              options: {
                responsive: true,
                responsiveAnimationDuration:800,
                legend: {
                  position: 'bottom',
                },
                layout: {
                  padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0 
                  }
                },
                title: {
                  display: true,
                  text: title
                }
              }
          })
        window.myRadar = new Chart(ctx2, {});
        document.getElementById('canvasTwo').style.display = 'none';

        }
        else{
          window.myRadar.destroy();
          window.myRadar = new Chart(context, {
            type: additional,
            data: data,
            options: {
              responsive: true,
              responsiveAnimationDuration:800,
              legend: {
                position: 'bottom',
              },
              layout: {
                padding: {
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0 
                }
              },
              title: {
                display: true,
                text: title
              },
              scale: {
                ticks:{
                  beginAtZero: true 
                }
              }
            }
        }); 
        document.getElementById('canvasTwo').style.display = 'block';
        }
    }
    function plotStandard(){
      var data_general = {"41": 12.820982142857131, "2": 13.081481481481479, "54": 12.732738095238098, "72": 13.069892473118285, "82": 14.456603773584895, "11": 17.326296296296302, "24": 13.423318385650228, "25": 12.70672268907563, "43": 12.774418604651158, "91": 12.810980392156859, "21": 12.62962962962963, "73": 13.580434782608698, "3": 14.212500000000002, "52": 12.685853658536587, "42": 13.75925925925926, "93": 14.120923076923075, "83": 13.024137931034483, "26": 12.696330275229359, "53": 12.756049382716037, "23": 13.709600000000002, "4": 12.226086956521739, "31": 13.203636363636363, "1": 13.061538461538463, "22": 13.332876712328765, "74": 12.649019607843139};
      let keys = []
      let values = []
      for (var key in data_general) {
        keys.push(regionNames[key])
        values.push(data_general[key])
      }
      barChartData = {
        labels: keys,
        datasets: [{
          label: 'Region',
          backgroundColor: color(window.chartColors.green).alpha(0.5).rgbString(),
          borderColor: window.chartColors.green,
          borderWidth: 1,
          data: values
        }]

      };

    };
    
    function plotMenWomen(regions){
      var data_json_men = {"83": 13.990517241379315, "72": 14.17634408602151, "91": 13.816078431372546, "31": 14.180779220779234, "2": 13.792592592592595, "25": 13.669747899159665, "82": 15.830360205831907, "93": 15.492923076923079, "21": 13.525925925925925, "24": 14.46771300448431, "26": 13.653211009174308, "1": 13.684615384615386, "42": 15.120987654320984, "74": 13.466666666666672, "53": 13.755308641975326, "4": 12.569565217391306, "3": 14.6, "41": 13.950000000000008, "73": 14.732608695652196, "22": 14.26027397260274, "52": 13.698048780487811, "11": 18.896666666666658, "23": 14.7872, "43": 13.84651162790698, "54": 13.651785714285717};
      var data_json_women= {"72": 11.540501792114695, "1": 12.33076923076923, "73": 11.889999999999995, "83": 11.582758620689654, "25": 11.316806722689083, "42": 11.875925925925925, "54": 11.474404761904763, "21": 11.203703703703702, "52": 11.192682926829272, "4": 11.617391304347828, "22": 11.841095890410953, "82": 12.433276157804459, "93": 12.205230769230761, "91": 11.438039215686276, "3": 13.5, "26": 11.245871559633029, "53": 11.344197530864196, "23": 11.9608, "24": 11.914798206278022, "41": 11.158928571428577, "43": 11.162790697674415, "74": 11.474509803921567, "2": 12.233333333333334, "11": 15.091296296296296, "31": 11.536883116883116};
      let keysMen = [];
      let valuesMen = [],  valuesWomen = []
      for (var i=0; i< regions.length; i++) {
        keysMen.push(regionNames[regions[i]])
        valuesMen.push(data_json_men[regions[i]])
        valuesWomen.push(data_json_women[regions[i]])
      }
      if(regions.length >1){
        barChartData = {
          labels: keysMen,
          datasets: [{
            label: 'Homme',
            backgroundColor:  '#4FC3F7',
            borderColor:  '#4FC3F7',
            borderWidth: 1,
            data: valuesMen
          },
          {
            label: 'Femme',
            backgroundColor: '#F06292',
            borderColor: '#F06292',
            borderWidth: 1,
            data: valuesWomen
          }]
        };
      }
        
      else if(regions.length == 1){
          barChartData= {
            datasets: [{
              data: [
                valuesWomen[0],
                valuesMen[0]
              ],
              backgroundColor: [
                '#F06292',
                '#4FC3F7'
              ],
              label: 'Salaire moyen par critère de sexe'
            }],
            labels: [
              'Femme',
              'Homme'
            ]
          };
      }
    
    };

    function plotMen(regions){
      var data_json_men = {"83": 13.990517241379315, "72": 14.17634408602151, "91": 13.816078431372546, "31": 14.180779220779234, "2": 13.792592592592595, "25": 13.669747899159665, "82": 15.830360205831907, "93": 15.492923076923079, "21": 13.525925925925925, "24": 14.46771300448431, "26": 13.653211009174308, "1": 13.684615384615386, "42": 15.120987654320984, "74": 13.466666666666672, "53": 13.755308641975326, "4": 12.569565217391306, "3": 14.6, "41": 13.950000000000008, "73": 14.732608695652196, "22": 14.26027397260274, "52": 13.698048780487811, "11": 18.896666666666658, "23": 14.7872, "43": 13.84651162790698, "54": 13.651785714285717};
      let keysMen = []
      let valuesMen = []
      var init_data =data_json_men;
      for (var i=0; i< regions.length; i++) {
          var key =regions[i];
        keysMen.push(regionNames[key])
        valuesMen.push(data_json_men[key])
      }
      barChartData = {
        labels: keysMen,
        datasets: [{
          label: 'Homme',
          backgroundColor:  '#4FC3F7',
          borderColor:  '#4FC3F7',
          borderWidth: 1,
          data: valuesMen
        }]

      };
    };


    function plotWomen(regions){
      var data_json_women= {"72": 11.540501792114695, "1": 12.33076923076923, "73": 11.889999999999995, "83": 11.582758620689654, "25": 11.316806722689083, "42": 11.875925925925925, "54": 11.474404761904763, "21": 11.203703703703702, "52": 11.192682926829272, "4": 11.617391304347828, "22": 11.841095890410953, "82": 12.433276157804459, "93": 12.205230769230761, "91": 11.438039215686276, "3": 13.5, "26": 11.245871559633029, "53": 11.344197530864196, "23": 11.9608, "24": 11.914798206278022, "41": 11.158928571428577, "43": 11.162790697674415, "74": 11.474509803921567, "2": 12.233333333333334, "11": 15.091296296296296, "31": 11.536883116883116};
      let keysWomen = []
      let valuesWomen = []
      for (var i=0; i< regions.length; i++) {
        var key =regions[i];
        keysWomen.push(regionNames[key])
        valuesWomen.push(data_json_women[key])
      }
      barChartData = {
        labels: keysWomen,
        datasets: [
        {
          label: 'Femme',
          backgroundColor: '#F06292',
          borderColor: '#F06292',
          borderWidth: 1,
          data: valuesWomen
        }]

      };
    };

    function plotExec(regions){
      var data_exec_init = {"22": 23.40547945205478, "54": 23.138690476190476, "31": 22.768311688311687, "91": 22.57450980392157, "43": 23.174418604651162, "25": 23.464705882352945, "52": 22.62634146341464, "42": 23.978395061728392, "83": 23.145689655172408, "21": 23.465432098765447, "4": 23.31739130434783, "23": 24.19840000000001, "24": 23.695515695067265, "2": 24.82962962962963, "82": 24.488336192109763, "74": 22.69411764705882, "11": 26.51074074074076, "41": 23.152232142857144, "1": 24.434615384615377, "73": 23.04304347826086, "53": 22.693333333333342, "72": 23.374551971326166, "3": 25.875, "26": 23.08256880733945, "93": 24.276307692307697}
      let keysExec = []
      let valuesExec = []
      var data_exec= {};
      var init_data = data_exec_init;
      Object.keys(init_data).sort().forEach(function(key) {
        data_exec[key] = init_data[key];
      });
      for (var i=0; i< regions.length; i++) {
        var key =regions[i];
        keysExec.push(regionNames[key])
        valuesExec.push(data_exec[key])
      }
      barChartData = {
        labels: keysExec,
        datasets: [
        {
          label: 'PDG',
          backgroundColor: color(window.chartColors.green).alpha(0.5).rgbString(),
          borderColor: window.chartColors.green,
          borderWidth: 1,
          data: valuesExec
        }]

      };
    };


    function plotFemaleExec(regions){
      var data_exec_women = {"22": 20.180821917808217, "54": 19.62559523809524, "31": 19.320000000000018, "91": 19.458823529411767, "43": 19.319767441860453, "25": 19.92436974789916, "52": 19.26048780487804, "42": 20.328395061728397, "83": 19.892241379310356, "21": 19.86913580246914, "4": 20.613043478260874, "23": 20.651999999999997, "24": 20.265470852017923, "2": 21.718518518518522, "82": 20.75077186963978, "74": 19.711764705882352, "11": 22.902777777777803, "41": 19.812499999999982, "1": 21.626923076923074, "73": 19.757826086956523, "53": 19.356049382716037, "72": 19.60752688172044, "3": 23.575000000000003, "26": 19.770642201834864, "93": 20.4966153846154};
      let keysExecWomen = []
      let valuesExecWomen = []
      //ordering keys (no conflict in case of several plots)
      var ordered= {};
      var init_data = data_exec_women;
      Object.keys(init_data).sort().forEach(function(key) {
        ordered[key] = init_data[key];
      });

    for (var i=0; i< regions.length; i++) {
        var key =regions[i];
        keysExecWomen.push(regionNames[key])
        valuesExecWomen.push(ordered[key])
      }
      barChartData = {
        labels: keysExecWomen,
        datasets: [
        {
          label: 'PDG femme',
          backgroundColor: '#F06292',
          borderColor: '#F06292',
          borderWidth: 1,
          data: valuesExecWomen
        }]

      };
    };


    function plotMaleExec(regions){
      var data_exec_men = {"22": 24.73493150684932, "54": 24.792857142857137, "31": 24.03714285714285, "91": 23.977254901960777, "43": 24.666279069767448, "25": 25.047058823529408, "52": 23.904878048780454, "42": 25.44938271604939, "83": 24.544827586206903, "21": 24.862962962962968, "4": 24.860869565217396, "23": 25.700000000000017, "24": 25.176233183856503, "2": 26.866666666666667, "82": 26.039622641509443, "74": 24.068627450980394, "11": 28.355925925925902, "41": 24.440625000000015, "1": 26.319230769230778, "73": 24.414782608695667, "53": 24.068395061728406, "72": 25.01505376344085, "3": 26.925, "26": 24.47247706422018, "93": 25.952615384615385};
      let keysExecMen = []
      let valuesExecMen = []
      var init_data = data_exec_men ;
      var ordered= {};
      Object.keys(init_data).sort().forEach(function(key) {
        ordered[key] = init_data[key];
      });
      for (var i=0; i< regions.length; i++) {
        var key =regions[i];
        keysExecMen.push(regionNames[key])
        valuesExecMen.push(ordered[key])
      }
      barChartData = {
        labels: keysExecMen,
        datasets: [
        {
          label: 'PDG homme',
          backgroundColor:  '#4FC3F7',
          borderColor: '#4FC3F7',
          borderWidth: 1,
          data: valuesExecMen
        }]

      };
    };


    function plotMaleFemaleExec(regions){
      plotMaleExec(regions);
      var data_male = barChartData.datasets;
      var labels = barChartData.labels;
      plotFemaleExec(regions);
      var data_female = barChartData.datasets;
      barChartData.labels = labels;
      barChartData.datasets = (data_male.concat(data_female));
      window.myChart.type = 'bar';
    };


    function plotMgr(regions){
      var data_mgr_init = {"52": 13.889024390243913, "73": 14.217826086956517, "31": 14.386233766233772, "2": 15.233333333333336, "54": 14.068452380952378, "21": 14.327160493827169, "43": 14.070930232558139, "26": 14.286238532110099, "83": 14.167241379310347, "72": 14.206451612903226, "93": 14.894153846153841, "42": 14.618518518518512, "22": 14.667808219178083, "11": 16.120925925925913, "53": 13.948395061728403, "41": 14.358035714285725, "23": 15.0656, "4": 14.604347826086956, "91": 14.062352941176467, "82": 14.907718696397938, "1": 15.28076923076923, "74": 13.964705882352936, "3": 16.162499999999998, "25": 14.145378151260509, "24": 14.582062780269068};
      let keysMgr = []
      let valuesMgr = []
      var data_mgr= {};
      var init_data =data_mgr_init ;
      Object.keys(init_data).sort().forEach(function(key) {
        data_mgr[key] = init_data[key];
      });

    for (var i=0; i< regions.length; i++) {
        var key =regions[i];
        keysMgr.push(regionNames[key])
        valuesMgr.push(data_mgr[key])
      }
      barChartData = {
        labels: keysMgr,
        datasets: [
        {
          label: 'Manager',
          backgroundColor: color(window.chartColors.yellow).alpha(0.5).rgbString(),
          borderColor: window.chartColors.yellow,
          borderWidth: 1,
          data: valuesMgr
        }]

      };
    };


    function plotMaleMgr(regions){
      var data_mgr_men = {"52": 14.685121951219507, "73": 15.075217391304353, "31": 15.362337662337664, "2": 16.170370370370367, "54": 14.823214285714284, "21": 15.144444444444439, "43": 14.963953488372097, "26": 15.103669724770645, "83": 14.996551724137932, "72": 15.110752688172049, "93": 16.028307692307692, "42": 15.64753086419753, "22": 15.502739726027402, "11": 17.125000000000004, "53": 14.74716049382715, "41": 15.370982142857144, "23": 15.998400000000004, "4": 15.191304347826089, "91": 14.89960784313727, "82": 15.954202401372198, "1": 16.142307692307696, "74": 14.607843137254902, "3": 16.85, "25": 14.963025210084028, "24": 15.365919282511213};
      let keysMgrMen = []
      let valuesMgrMen = []
      var init_data = data_mgr_men;
      var ordered= {};
      Object.keys(init_data).sort().forEach(function(key) {
        ordered[key] = init_data[key];
      });

      for (var i=0; i< regions.length; i++) {
        var key =regions[i];
        keysMgrMen.push(regionNames[key])
        valuesMgrMen.push(ordered[key])
      }
      barChartData = {
        labels: keysMgrMen,
        datasets: [
        {
          label: 'Manager homme',
          backgroundColor: color(window.chartColors.yellow).alpha(0.5).rgbString(),
          borderColor: window.chartColors.yellow,
          borderWidth: 1,
          data: valuesMgrMen
        }]

      };

    };


    function plotFemaleMgr(regions){
      var data_mgr_women = {"52": 12.65682926829269, "73": 13.028695652173914, "31": 12.870909090909088, "2": 14.244444444444442, "54": 12.997023809523817, "21": 12.979012345679012, "43": 12.643023255813958, "26": 12.956880733944956, "83": 12.950000000000003, "72": 12.98387096774193, "93": 13.408615384615393, "42": 13.177777777777782, "22": 13.330821917808219, "11": 14.955000000000014, "53": 12.850123456790126, "41": 12.772767857142862, "23": 13.5008, "4": 13.778260869565214, "91": 12.965490196078425, "82": 13.407375643224702, "1": 14.403846153846159, "74": 13.084313725490205, "3": 15.124999999999998, "25": 12.948739495798321, "24": 13.382959641255603};
      let keysMgrWomen = []
      let valuesMgrWomen = []
      //ordering keys (no conflict in case of several plots)
      var init_data = data_mgr_women;
      var ordered= {};
      Object.keys(init_data).sort().forEach(function(key) {
        ordered[key] = init_data[key];
      });

    for (var i=0; i< regions.length; i++) {
        var key =regions[i];
        keysMgrWomen.push(regionNames[key])
        valuesMgrWomen.push(ordered[key])
      }
      barChartData = {
        labels: keysMgrWomen,
        datasets: [
        {
          label: 'Manager femme',
          backgroundColor: color(window.chartColors.purple).alpha(0.5).rgbString(),
          borderColor: window.chartColors.purple,
          borderWidth: 1,
          data: valuesMgrWomen
        }]

      };


    };

    function plotMaleFemaleMgr(regions){
      plotMaleMgr(regions);
      var data_male = barChartData.datasets;
      var labels = barChartData.labels;
      plotFemaleMgr(regions);
      var data_female = barChartData.datasets;
      barChartData.labels = labels;
      barChartData.datasets = (data_male.concat(data_female));
      window.myChart.type = 'bar';
    };

    

    function plotEmpl(regions){
      var data_empl_init = {"52": 10.27609756097561, "73": 10.302608695652179, "31": 10.371168831168838, "2": 10.748148148148145, "54": 10.28809523809523, "21": 10.188888888888885, "43": 10.27093023255814, "26": 10.177981651376145, "83": 10.304310344827586, "72": 10.32329749103942, "93": 10.56738461538461, "42": 10.551234567901231, "22": 10.606849315068493, "11": 11.957222222222214, "53": 10.227407407407409, "41": 10.112053571428572, "23": 10.511999999999997, "4": 10.395652173913042, "91": 10.161960784313726, "82": 10.839279588336192, "1": 10.97307692307692, "74": 10.15294117647059, "3": 11.1, "25": 10.101680672268909, "24": 10.537219730941713};
      let keysEmpl = []
      let valuesEmpl = []
      var data_empl= {};
      var init_data = data_empl_init;
      Object.keys(init_data).sort().forEach(function(key) {
        data_empl[key] = init_data[key];
      });

      for (var i=0; i< regions.length; i++) {
        var key =regions[i];
        keysEmpl.push(regionNames[key])
        valuesEmpl.push(data_empl[key])
      }
      barChartData = {
        labels: keysEmpl,
        datasets: [
        {
          label: 'Employé(e)',
          backgroundColor: color(window.chartColors.purple).alpha(0.5).rgbString(),
          borderColor: window.chartColors.purple,
          borderWidth: 1,
          data: valuesEmpl
        }]

      };
    };


    function plotFemaleEmpl(regions){
      var data_empl_women = {"52": 10.00999999999999, "73": 10.079130434782606, "31": 10.063896103896106, "2": 10.637037037037036, "54": 10.108333333333341, "21": 9.970370370370368, "43": 9.968604651162796, "26": 9.959633027522937, "83": 10.074137931034485, "72": 10.105376344086027, "93": 10.26676923076923, "42": 10.28765432098765, "22": 10.366438356164387, "11": 11.726666666666675, "53": 9.963950617283949, "41": 9.865625000000003, "23": 10.256800000000002, "4": 10.26086956521739, "91": 9.903921568627458, "82": 10.516809605488854, "1": 10.769230769230772, "74": 9.960784313725494, "3": 10.9125, "25": 9.88655462184874, "24": 10.329147982062777};
      let keysEmplWomen = []
      let valuesEmplWomen = []
      //ordering keys (no conflict in case of several plots)
      var init_data = data_empl_women;
      var ordered= {};
      Object.keys(init_data).sort().forEach(function(key) {
        ordered[key] = init_data[key];
      });

      for (var i=0; i< regions.length; i++) {
        var key =regions[i];
        keysEmplWomen.push(regionNames[key])
        valuesEmplWomen.push(ordered[key])
      }
      barChartData = {
        labels: keysEmplWomen,
        datasets: [
        {
          label: 'Employée femme',
          backgroundColor: color(window.chartColors.green).alpha(0.5).rgbString(),
          borderColor: window.chartColors.green,
          borderWidth: 1,
          data: valuesEmplWomen
        }]

      };

    };

    function plotMaleEmpl(regions){
      var data_empl_men = {"52": 11.143170731707318, "73": 10.938695652173914, "31": 11.11350649350651, "2": 10.94814814814815, "54": 10.809523809523808, "21": 10.809876543209876, "43": 11.170930232558142, "26": 10.819266055045876, "83": 10.991379310344833, "72": 10.948387096774193, "93": 11.340000000000009, "42": 11.399382716049384, "22": 11.180821917808222, "11": 12.440370370370351, "53": 10.99481481481482, "41": 10.885267857142855, "23": 11.222400000000004, "4": 10.569565217391306, "91": 10.791764705882358, "82": 11.768096054888515, "1": 11.42692307692308, "74": 10.656862745098044, "3": 11.525, "25": 10.643697478991593, "24": 11.150672645739908};
      let keysEmplMen = []
      let valuesEmplMen = []
      //ordering keys (no conflict in case of several plots)
      var init_data =  data_empl_men;            
      var ordered= {};
      Object.keys(init_data).sort().forEach(function(key) {
        ordered[key] = init_data[key];
      });

      for (var i=0; i< regions.length; i++) {
        var key =regions[i];
        keysEmplMen.push(regionNames[key])
        valuesEmplMen.push(ordered[key])
      }
      barChartData = {
        labels: keysEmplMen,
        datasets: [
        {
          label: 'Employé homme',
          backgroundColor: color(window.chartColors.grey).alpha(0.5).rgbString(),
          borderColor: window.chartColors.grey,
          borderWidth: 1,
          data: valuesEmplMen
        }]

      };


    };

    function plotMaleFemaleEmpl(regions){
      plotMaleEmpl(regions);
      var data_male = barChartData.datasets;
      var labels = barChartData.labels;
      plotFemaleEmpl(regions);
      var data_female = barChartData.datasets;
      barChartData.labels = labels;
      barChartData.datasets = (data_male.concat(data_female));
      window.myChart.type = 'bar';


    };

    function plotWorker(regions){
      var data_worker_init = {"52": 10.905365853658541, "73": 10.947391304347818, "31": 11.094545454545454, "2": 10.896296296296292, "54": 10.63035714285714, "21": 10.9037037037037, "43": 10.945348837209309, "26": 10.923853211009172, "83": 10.975862068965517, "72": 10.89139784946237, "93": 11.344307692307702, "42": 11.530864197530862, "22": 11.382876712328775, "11": 12.793148148148155, "53": 10.68592592592593, "41": 11.040178571428575, "23": 11.625599999999997, "4": 10.6, "91": 10.59372549019608, "82": 11.558662092624358, "1": 10.834615384615384, "74": 10.672549019607843, "3": 11.0, "25": 10.753781512605046, "24": 11.0372197309417};
      let keysWorker = []
      let valuesWorker = []
      var data_worker= {};
      var init_data = data_worker_init;
      Object.keys(init_data).sort().forEach(function(key) {
        data_worker[key] = init_data[key];
      });

      for (var i=0; i< regions.length; i++) {
        var key =regions[i];
        keysWorker.push(regionNames[key])
        valuesWorker.push(data_worker[key])
      }
      barChartData = {
        labels: keysWorker,
        datasets: [
        {
          label: 'Ouvrier(e)',
          backgroundColor: color(window.chartColors.orange).alpha(0.5).rgbString(),
          borderColor: window.chartColors.orange,
          borderWidth: 1,
          data: valuesWorker
        }]

      };

    };

    function plotFemaleWorker(regions){
      var data_worker_women = {"52": 9.61341463414634, "73": 9.69869565217391, "31": 9.403636363636368, "2": 9.174074074074074, "54": 9.547023809523806, "21": 9.704938271604938, "43": 9.654651162790701, "26": 9.653211009174315, "83": 9.725862068965515, "72": 9.412186379928313, "93": 9.754461538461541, "42": 10.049382716049385, "22": 10.01575342465753, "11": 11.087037037037033, "53": 9.597777777777772, "41": 9.43169642857143, "23": 10.024000000000003, "4": 8.886956521739133, "91": 9.37098039215686, "82": 10.053687821612346, "1": 9.073076923076922, "74": 9.613725490196082, "3": 9.175, "25": 9.622689075630253, "24": 10.022421524663674};
      let keysWorkerWomen = []
      let valuesWorkerWomen = []
      //ordering keys (no conflict in case of several plots)
      var init_data =  data_worker_women;            
      var ordered= {};
      Object.keys(init_data).sort().forEach(function(key) {
        ordered[key] = init_data[key];
      });

      for (var i=0; i< regions.length; i++) {
        var key =regions[i];
        keysWorkerWomen.push(regionNames[key])
        valuesWorkerWomen.push(ordered[key])
      }
      barChartData = {
        labels: keysWorkerWomen,
        datasets: [
        {
          label: 'Ouvrière femme',
          backgroundColor: '#ac7420',
          borderColor: '#ac7420',
          borderWidth: 1,
          data: valuesWorkerWomen
        }]

      };

    };

    function plotMaleWorker(regions){
      var data_worker_men = {"52": 11.180731707317074, "73": 11.165652173913045, "31": 11.342597402597399, "2": 11.177777777777779, "54": 10.836309523809524, "21": 11.166666666666666, "43": 11.281395348837206, "26": 11.198165137614678, "83": 11.20948275862069, "72": 11.14229390681004, "93": 11.590153846153845, "42": 11.878395061728387, "22": 11.655479452054797, "11": 13.0912962962963, "53": 10.91901234567901, "41": 11.35803571428572, "23": 11.902400000000002, "4": 10.756521739130434, "91": 10.776470588235298, "82": 11.85711835334479, "1": 11.065384615384618, "74": 10.886274509803922, "3": 11.137500000000001, "25": 10.994117647058822, "24": 11.287892376681603};
      let keysWorkerMen = []
      let valuesWorkerMen = []
      //ordering keys (no conflict in case of several plots)
      var init_data = data_worker_men;            
      var ordered= {};
      Object.keys(init_data).sort().forEach(function(key) {
        ordered[key] = init_data[key];
      });

      for (var i=0; i< regions.length; i++) {
        var key =regions[i];
        keysWorkerMen.push(regionNames[key])
        valuesWorkerMen.push(ordered[key])
      }
      barChartData = {
        labels: keysWorkerMen,
        datasets: [
        {
          label: 'Ouvrier homme',
          backgroundColor: color(window.chartColors.orange).alpha(0.5).rgbString(),
          borderColor: window.chartColors.orange,
          borderWidth: 1,
          data: valuesWorkerMen
        }]

      };


    };


    function plotMaleFemaleWorker(regions){
      plotMaleWorker(regions);
      var data_male = barChartData.datasets;
      var labels = barChartData.labels;
      plotFemaleWorker(regions);
      var data_female = barChartData.datasets;
      barChartData.labels = labels;
      barChartData.datasets = (data_male.concat(data_female));
      window.myChart.type = 'bar';


    };

    function plotPoste(regions){
      plotExec(regions);
      var data_exec = barChartData.datasets;
      var labels = barChartData.labels;
      plotMgr(regions);
      var data_mgr = barChartData.datasets;
      plotEmpl(regions);
      var data_empl = barChartData.datasets;
      plotWorker(regions);
      var data_worker = barChartData.datasets;
      barChartData = {
        labels: labels
      };
      barChartData.datasets = ((data_exec.concat(data_mgr)).concat(data_empl)).concat(data_worker);
      window.myChart.type = 'bar';

    };
    function plotRadarPoste(regions){
      plotExec(regions);
      var data_exec = barChartData.datasets;
      var labels = barChartData.labels;
      plotMgr(regions);
      var data_mgr = barChartData.datasets;
      plotEmpl(regions);
      var data_empl = barChartData.datasets;
      plotWorker(regions);
      var data_worker = barChartData.datasets;
        barChartData = {
          labels: ['PDG', 'Manager', 'Employé(e)', 'Ouvrier(e)'],
          datasets: []}
        var colorList = ['red', 'blue', 'green'];
        var currColor = '';
        for (var i = 0; i < regions.length; i++){
          currColor = colorList[i%3];
          barChartData.datasets.push({
            label: regionNames[regions[i]],
            backgroundColor: color(currColor).alpha(0.2).rgbString(),
            borderColor: currColor,
            pointBackgroundColor: currColor,
            data: [data_exec[0].data[i],
            data_mgr[0].data[i],
            data_empl[0].data[i],
            data_worker[0].data[i]]
          });
        }

    };


    function plot18(regions){
      var data_18_init = {"52": 9.391707317073168, "73": 9.47304347826087, "31": 9.698701298701302, "2": 9.066666666666668, "54": 9.273214285714289, "21": 9.554320987654318, "43": 9.445348837209304, "26": 9.4440366972477, "83": 9.386206896551723, "72": 9.316487455197137, "93": 9.461538461538458, "42": 9.55432098765432, "22": 9.532191780821917, "11": 10.182777777777785, "53": 9.38197530864197, "41": 9.375892857142855, "23": 9.730400000000001, "4": 9.021739130434783, "91": 9.188235294117643, "82": 9.733104631217847, "1": 9.123076923076923, "74": 9.307843137254899, "3": 9.6125, "25": 9.345378151260507, "24": 9.572197309417039};
      let keys18 = []
      let values18 = []
      //ordering keys (no conflict in case of several plots)
      var init_data = data_18_init;
      var ordered= {};
      Object.keys(init_data).sort().forEach(function(key) {
        ordered[key] = init_data[key];
      });

      for (var i=0; i< regions.length; i++) {
        var key =regions[i];
        keys18.push(regionNames[key])
        values18.push(ordered[key])
      }
      barChartData = {
        labels: keys18,
        datasets: [
        {
          label: '18-25 ans',
          backgroundColor: color(window.chartColors.yellow).alpha(0.5).rgbString(),
          borderColor: window.chartColors.yellow,
          borderWidth: 1,
          data: values18
        }]

      };

    };

    function plot26(regions){
      var data_26_init = {"52": 12.653170731707327, "73": 13.338695652173907, "31": 13.004675324675318, "2": 12.6, "54": 12.47738095238095, "21": 12.417283950617279, "43": 12.59186046511628, "26": 12.448623853211004, "83": 12.718965517241376, "72": 12.83189964157707, "93": 13.909846153846154, "42": 13.591975308641981, "22": 13.213013698630139, "11": 16.894074074074055, "53": 12.62691358024692, "41": 12.593750000000009, "23": 13.482400000000004, "4": 12.165217391304349, "91": 12.580784313725484, "82": 14.336535162950256, "1": 12.561538461538458, "74": 12.325490196078432, "3": 13.9, "25": 12.491596638655462, "24": 13.226457399103133};
      let keys26 = []
      let values26 = []
      //ordering keys (no conflict in case of several plots)
      var init_data = data_26_init;
      var ordered= {};
      Object.keys(init_data).sort().forEach(function(key) {
        ordered[key] = init_data[key];
      });

      for (var i=0; i< regions.length; i++) {
        var key =regions[i];
        keys26.push(regionNames[key])
        values26.push(ordered[key])
      }
      barChartData = {
        labels: keys26,
        datasets: [
        {
          label: '26-50 ans',
          backgroundColor: color(window.chartColors.orange).alpha(0.5).rgbString(),
          borderColor: window.chartColors.orange,
          borderWidth: 1,
          data: values26
        }]

      };

    };

    function plot50(regions){
      var data_50_init = {"52": 14.24512195121951, "73": 15.736521739130431, "31": 15.18883116883116, "2": 15.085185185185187, "54": 14.671428571428558, "21": 14.287654320987654, "43": 14.523255813953483, "26": 14.53853211009174, "83": 15.005172413793106, "72": 15.198924731182789, "93": 16.61876923076924, "42": 16.032098765432103, "22": 15.273972602739724, "11": 20.867222222222214, "53": 14.469135802469134, "41": 14.729910714285712, "23": 15.827200000000003, "4": 14.686956521739129, "91": 14.825098039215689, "82": 16.752658662092603, "1": 15.330769230769231, "74": 14.490196078431376, "3": 17.075, "25": 14.615126050420166, "24": 15.298206278026903};
      let keys50 = []
      let values50 = []
      //ordering keys (no conflict in case of several plots)
      var ordered= {};
      var init_data = data_50_init;
      Object.keys(init_data).sort().forEach(function(key) {
        ordered[key] = init_data[key];
      });

      for (var i=0; i< regions.length; i++) {
        var key =regions[i];
        keys50.push(regionNames[key])
        values50.push(ordered[key])
      }
      barChartData = {
        labels: keys50,
        datasets: [
        {
          label: '> 50 ans',
          backgroundColor: color(window.chartColors.purple).alpha(0.5).rgbString(),
          borderColor: window.chartColors.purple,
          borderWidth: 1,
          data: values50
        }]

      };
    };

    function plotAge(regions){
      plot18(regions);
      var data_18 = barChartData.datasets;
      var labels = barChartData.labels;
      plot26(regions);
      var data_26 = barChartData.datasets;
      plot50(regions);
      var data_50 = barChartData.datasets;
      barChartData = {
        labels: labels
      };
      barChartData.datasets = (data_18.concat(data_26)).concat(data_50);
      window.myChart.type = 'bar';
      
    };
    function plotRadarAge(regions){
      plot18(regions);
      var data_18 = barChartData.datasets;
      plot26(regions);
      var data_26 = barChartData.datasets;
      plot50(regions);
      var data_50 = barChartData.datasets;
      barChartData = {
        labels: ['18-25 ans', '26-50 ans', '> 50 ans'],
        datasets: []}
      var colorList = ['red', 'blue', 'green'];
      var currColor = '';
      for (var i = 0; i < regions.length; i++){
        currColor = colorList[i%3];
        barChartData.datasets.push({
          label: regionNames[regions[i]],
          backgroundColor: color(currColor).alpha(0.2).rgbString(),
          borderColor: currColor,
          pointBackgroundColor: currColor,
          data: [data_18[0].data[i],
          data_26[0].data[i],
          data_50[0].data[i]]
        });
      }

    };

    function plot1826(regions){
      plot18(regions);
      var data_18 = barChartData.datasets;
      var labels = barChartData.labels;
      plot26(regions);
      var data_26 = barChartData.datasets;
      barChartData.labels = labels;
      barChartData.datasets = (data_18.concat(data_26));
      window.myChart.type = 'bar';
      

    };

    function plot1850(regions){
      plot18(regions);
      var data_18 = barChartData.datasets;
      var labels = barChartData.labels;
      plot50(regions);
      var data_50 = barChartData.datasets;
      barChartData.datasets = (data_18.concat(data_50));
      window.myChart.type = 'bar'; 
    };

    function plot2650(regions){
      plot26(regions);
      var data_26 = barChartData.datasets;
      var labels = barChartData.labels;
      plot50(regions);
      var data_50 = barChartData.datasets;
      barChartData.labels = labels;
      barChartData.datasets = (data_26.concat(data_50));
      window.myChart.type = 'bar';
      
    };

    function plot18Men(regions){
      var data_init = {"52": 9.649512195121954, "73": 9.790434782608694, "31": 10.050909090909085, "2": 9.025925925925925, "54": 9.464880952380952, "21": 9.887654320987654, "43": 9.784883720930234, "26": 9.698165137614682, "83": 9.632758620689655, "72": 9.555197132616486, "93": 9.722769230769229, "42": 9.925925925925924, "22": 9.777397260273972, "11": 10.457037037037038, "53": 9.601481481481473, "41": 9.650892857142855, "23": 10.028000000000002, "4": 9.021739130434781, "91": 9.371372549019604, "82": 10.068267581475133, "1": 9.180769230769231, "74": 9.53529411764706, "3": 9.6375, "25": 9.568067226890758, "24": 9.818385650224217};
      let keys = []
      let values = []
      //ordering keys (no conflict in case of several plots)
      var ordered= {};
      var init_data = data_init;
      Object.keys(init_data).sort().forEach(function(key) {
        ordered[key] = init_data[key];
      });

      for (var i=0; i< regions.length; i++) {
        var key =regions[i];
        keys.push(regionNames[key])
        values.push(ordered[key])
      }
      barChartData = {
        labels: keys,
        datasets: [
        {
          label: 'Hommes entre 18 et 25 ans',
          backgroundColor: color(window.chartColors.purple).alpha(0.5).rgbString(),
          borderColor: window.chartColors.purple,
          borderWidth: 1,
          data: values
        }]

      };

    };

    function plot18Women(regions){
      var data_init = {"52": 9.017317073170732, "73": 8.972173913043477, "31": 9.163116883116889, "2": 9.144444444444446, "54": 8.99523809523809, "21": 9.046913580246919, "43": 8.991860465116272, "26": 9.075229357798165, "83": 9.014655172413795, "72": 8.969175627240146, "93": 9.10153846153847, "42": 9.071604938271605, "22": 9.157534246575343, "11": 9.848888888888895, "53": 9.058765432098772, "41": 9.005357142857148, "23": 9.258400000000007, "4": 9.017391304347827, "91": 8.937647058823535, "82": 9.242538593481987, "1": 9.069230769230769, "74": 8.964705882352941, "3": 9.5375, "25": 9.02016806722689, "24": 9.193273542600892};
      let keys = []
      let values = []
      //ordering keys (no conflict in case of several plots)
      var ordered= {};
      var init_data =data_init;
      Object.keys(init_data).sort().forEach(function(key) {
        ordered[key] = init_data[key];
      });

      for (var i=0; i< regions.length; i++) {
        var key =regions[i];
        keys.push(regionNames[key])
        values.push(ordered[key])
      }
      barChartData = {
        labels: keys,
        datasets: [
        {
          label: 'Femmes entre 18 et 25 ans',
          backgroundColor: '#F06292',
          borderColor: '#F06292',
          borderWidth: 1,
          data: values
        }]

      };

    };
    function plot18MenWomen(regions){
      plot18Men(regions);
      var data_male = barChartData.datasets;
      var labels = barChartData.labels;
      plot18Women(regions);
      var data_female = barChartData.datasets;
      barChartData.labels = labels;
      barChartData.datasets = (data_male.concat(data_female));
      window.myChart.type = 'bar';
    };


    function plot26Men(regions){
      var data_init = {"52": 13.582439024390238, "73": 14.356521739130427, "31": 13.853506493506487, "2": 13.15925925925926, "54": 13.282738095238095, "21": 13.177777777777775, "43": 13.539534883720926, "26": 13.295412844036697, "83": 13.523275862068967, "72": 13.814695340501798, "93": 15.095999999999993, "42": 14.783333333333328, "22": 14.03013698630137, "11": 18.152962962962935, "53": 13.51851851851851, "41": 13.551785714285709, "23": 14.4176, "4": 12.439130434782607, "91": 13.451764705882354, "82": 15.554545454545448, "1": 13.06153846153846, "74": 13.043137254901964, "3": 14.187499999999998, "25": 13.33529411764706, "24": 14.149775784753372};
      let keys = []
      let values = []
      //ordering keys (no conflict in case of several plots)
      var ordered= {};
      var init_data = data_init;
      Object.keys(init_data).sort().forEach(function(key) {
        ordered[key] = init_data[key];
      });

      
    for (var i=0; i< regions.length; i++) {
        var key =regions[i];
        keys.push(regionNames[key])
        values.push(ordered[key])
      }
      barChartData = {
        labels: keys,
        datasets: [
        {
          label: 'Hommes entre 26 et 50 ans',
          backgroundColor: color(window.chartColors.orange).alpha(0.5).rgbString(),
          borderColor: window.chartColors.orange,
          borderWidth: 1,
          data: values
        }]

      };

    };

    function plot26Women(regions){
      var data_init = {"52": 11.269268292682925, "73": 11.871739130434788, "31": 11.564155844155838, "2": 11.95925925925926, "54": 11.369047619047619, "21": 11.174074074074078, "43": 11.159302325581391, "26": 11.171559633027526, "83": 11.49310344827586, "72": 11.486021505376334, "93": 12.262153846153861, "42": 11.9432098765432, "22": 11.890410958904113, "11": 15.142407407407415, "53": 11.366172839506167, "41": 11.157589285714286, "23": 11.989599999999994, "4": 11.673913043478263, "91": 11.392549019607848, "82": 12.561749571183535, "1": 12.00769230769231, "74": 11.28627450980393, "3": 13.474999999999998, "25": 11.292436974789911, "24": 11.898206278026915};
      let keys = [];
      let values = [];
      //ordering keys (no conflict in case of several plots)
      var ordered= {};
      var init_data = data_init;
      Object.keys(init_data).sort().forEach(function(key) {
        ordered[key] = init_data[key];
      });

    for (var i=0; i< regions.length; i++) {
        var key =regions[i];
        keys.push(regionNames[key])
        values.push(ordered[key])
      }
      barChartData = {
        labels: keys,
        datasets: [
        {
          label: 'Femmes entre 26 et 50 ans',
          backgroundColor: color(window.chartColors.yellow).alpha(0.5).rgbString(),
          borderColor: window.chartColors.yellow,
          borderWidth: 1,
          data: values
        }]

      };

    };
    function plot26MenWomen(regions){
      plot26Men(regions);
      var data_male = barChartData.datasets;
      var labels = barChartData.labels;
      plot26Women(regions);
      var data_female = barChartData.datasets;
      barChartData.labels = labels;
      barChartData.datasets = (data_male.concat(data_female));
      window.myChart.type = 'bar';

    };



    function plot50Men(regions){
      var data_init = {"52": 15.807804878048785, "73": 17.518260869565214, "31": 16.61584415584416, "2": 16.270370370370372, "54": 16.18988095238095, "21": 15.676543209876543, "43": 16.219767441860462, "26": 16.04770642201835, "83": 16.59396551724138, "72": 16.961648745519717, "93": 18.799384615384636, "42": 18.225925925925925, "22": 16.66164383561645, "11": 23.31888888888889, "53": 16.10765432098765, "41": 16.51383928571428, "23": 17.490400000000005, "4": 15.286956521739128, "91": 16.475294117647053, "82": 18.94202401372215, "1": 16.330769230769228, "74": 15.827450980392156, "3": 17.674999999999997, "25": 16.164705882352948, "24": 16.98385650224214};
      let keys = []
      let values = []
      //ordering keys (no conflict in case of several plots)
      var ordered= {};
      var init_data = data_init;
      Object.keys(init_data).sort().forEach(function(key) {
        ordered[key] = init_data[key];
      });

      for (var i=0; i< regions.length; i++) {
        var key =regions[i];
        keys.push(regionNames[key])
        values.push(ordered[key])
      }
      barChartData = {
        labels: keys,
        datasets: [
        {
          label: 'Hommes âgés de plus de 50 ans',
          backgroundColor: color(window.chartColors.green).alpha(0.5).rgbString(),
          borderColor: window.chartColors.green,
          borderWidth: 1,
          data: values
        }]

      };

    };

    function plot50Women(regions){
      var data_init = {"52": 11.927804878048775, "73": 13.032173913043481, "31": 12.549870129870115, "2": 13.566666666666666, "54": 12.663690476190476, "21": 12.101234567901233, "43": 12.036046511627905, "26": 12.26697247706422, "83": 12.677586206896555, "72": 12.734408602150538, "93": 13.420307692307684, "42": 12.951851851851854, "22": 12.949315068493153, "11": 17.05333333333333, "53": 12.19432098765432, "41": 12.079017857142862, "23": 13.049600000000003, "4": 13.430434782608694, "91": 12.532156862745094, "82": 13.479416809605485, "1": 14.023076923076927, "74": 12.67058823529412, "3": 15.625000000000002, "25": 12.352941176470587, "24": 12.924215246636779};
      let keys = [];
      let values = [];
      //ordering keys (no conflict in case of several plots)
      var ordered= {};
      var init_data = data_init;
      Object.keys(init_data).sort().forEach(function(key) {
        ordered[key] = init_data[key];
      });

      for (var i=0; i< regions.length; i++) {
        var key =regions[i];
        keys.push(regionNames[key])
        values.push(ordered[key])
      }
      barChartData = {
        labels: keys,
        datasets: [
        {
          label: 'Femmes âgées de plus de 50 ans',
          backgroundColor: color(window.chartColors.grey).alpha(0.5).rgbString(),
          borderColor: window.chartColors.grey,
          borderWidth: 1,
          data: values
        }]

      };

    };
    function plot50MenWomen(regions){
      plot50Men(regions);
      var data_male = barChartData.datasets;
      var labels = barChartData.labels;
      plot2650Women(regions);
      var data_female = barChartData.datasets;
      barChartData.labels = labels;
      barChartData.datasets = ((data_male.concat(data_female)));
      window.myChart.type = 'bar';

    };

    function plot1826Men(regions){
        plotMaleAge(regions);
        barChartData.datasets.pop();
        window.myChart.type = 'bar';
        window.myChart.datasets = barChartData;
    };

    function plot2650Men(regions){
        plotMaleAge(regions);
        barChartData.datasets.splice(0,1);
        window.myChart.type = 'bar';
        window.myChart.datasets = barChartData;
    };

    function plot1850Men(regions){
        plotMaleAge(regions);
        barChartData.datasets.splice(1,1);
        window.myChart.type = 'bar';
        window.myChart.datasets = barChartData;
    };

    function plotMaleAge(regions){
      plot18Men(regions);
      var data_18 = barChartData.datasets;
      var labels = barChartData.labels;
      plot26Men(regions);
      var data_26 = barChartData.datasets;
      plot50Men(regions);
      var data_50 = barChartData.datasets;
      barChartData = {
        labels: labels
      };
      barChartData.datasets = ((data_18.concat(data_26)).concat(data_50));
      window.myChart.type = 'bar';
    };

    function plot1826Women(regions){
        plotFemaleAge(regions);
        barChartData.datasets.pop();
        window.myChart.type = 'bar';
        window.myChart.datasets = barChartData;
    };

    function plot2650Women(regions){
        plotFemaleAge(regions);
        barChartData.datasets.splice(0,1);
        window.myChart.type = 'bar';
        window.myChart.datasets = barChartData;
    };

    function plot1850Women(regions){
        plotFemaleAge(regions);
        barChartData.datasets.splice(1,1);
        window.myChart.type = 'bar';
        window.myChart.datasets = barChartData;
    };
    function plotFemaleAge(regions){
      plot18Women(regions);
      var data_18 = barChartData.datasets;
      var labels = barChartData.labels;
      plot26Women(regions);
      var data_26 = barChartData.datasets;
      plot50Women(regions);
      var data_50 = barChartData.datasets;
      barChartData = {
        labels: labels
      };
      barChartData.datasets = ((data_18.concat(data_26)).concat(data_50));
      window.myChart.type = 'bar';
    };

    function plot1826MenWomen(regions){
        plot1826Men(regions);
        var data_male = barChartData.datasets;
        plot1826Women(regions);
        var data_female = barChartData.datasets;
        barChartData.labels = ['18-25 ans', '26-50 ans'];
        barChartData.datasets = [
          {
            label: 'hommes',
            backgroundColor: '#4FC3F7',
            data : [data_male[0].data, 
                  data_male[1].data
                  ]
          },
          {
            label: 'femmes',
            backgroundColor: '#F06292',
            data : [data_female[0].data,
                  data_female[1].data
                  ]
          }
        ]
        window.myChart.type = 'bar';
      };
  
      function plot2650MenWomen(regions){
        plot2650Men(regions);
        var data_male = barChartData.datasets;
        plot2650Women(regions);
        var data_female = barChartData.datasets;
        barChartData.labels = ['26-50 ans', '> 50 ans'];
        barChartData.datasets = [
          {
            label: 'hommes',
            backgroundColor: '#4FC3F7',
            data : [data_male[0].data, 
                  data_male[1].data
                  ]
          },
          {
            label: 'femmes',
            backgroundColor: '#F06292',
            data : [data_female[0].data,
                  data_female[1].data
                  ]
          }
        ]
        window.myChart.type = 'bar';
      };
  
      
      function plot1850MenWomen(regions){
        plot1850Men(regions);
        var data_male = barChartData.datasets;
        plot1850Women(regions);
        var data_female = barChartData.datasets;
        barChartData.labels = ['18-25 ans', '> 50 ans'];
        barChartData.datasets = [
          {
            label: 'hommes',
            backgroundColor: '#4FC3F7',
            data : [data_male[0].data, 
                  data_male[1].data
                  ]
          },
          {
            label: 'femmes',
            backgroundColor: '#F06292',
            data : [data_female[0].data,
                  data_female[1].data
                  ]
          }
        ]
        window.myChart.type = 'bar';
      };
  
      
    

    function plotMaleFemaleAge(regions){
      plotFemaleAge(regions);
      var datasetFemale = barChartData.datasets;
      plotMaleAge(regions);
      barChartData.labels = ['18-25 ans', '26-50 ans', '> 50 ans'];
      barChartData.datasets = [
        {
          label: 'homme',
          backgroundColor: '#4FC3F7',
          data : [barChartData.datasets[0].data, 
                barChartData.datasets[1].data,
                barChartData.datasets[2].data
                ]
        },
        {
          label: 'femme',
          backgroundColor: '#F06292',
          data : [datasetFemale[0].data,
                datasetFemale[1].data,
                datasetFemale[2].data
                ]
        }
      ]
      window.myChart.type = 'bar';
    };

    function plotMalePoste(regions){
      plotMaleExec(regions);
      var data_exec = barChartData.datasets;
      var labels = barChartData.labels;
      plotMaleMgr(regions);
      var data_mgr = barChartData.datasets;
      plotMaleEmpl(regions);
      var data_empl = barChartData.datasets;
      plotMaleWorker(regions);
      var data_worker = barChartData.datasets;
      barChartData = {
        labels: labels
      };
      barChartData.datasets = (((data_exec.concat(data_mgr)).concat(data_empl))).concat(data_worker);
      window.myChart.type = 'bar';
    };

    function plotFemalePoste(regions){
      plotFemaleExec(regions);
      var data_exec = barChartData.datasets;
      var labels = barChartData.labels;
      plotFemaleMgr(regions);
      var data_mgr = barChartData.datasets;
      plotFemaleEmpl(regions);
      var data_empl = barChartData.datasets;
      plotFemaleWorker(regions);
      var data_worker = barChartData.datasets;
      barChartData.labels = labels;
      barChartData.datasets = (((data_exec.concat(data_mgr)).concat(data_empl))).concat(data_worker);
      window.myChart.type = 'bar';
    };

    function plotMaleFemalePoste(regions){
      plotFemalePoste(regions);
      var datasetFemale = barChartData.datasets;
      plotMalePoste(regions);
      barChartData.labels = ['PDG', 'Manager', 'Employé', 'Ouvrier'];
      barChartData.datasets = [
        {
          label: 'homme',
          backgroundColor: '#4FC3F7',
          data : [barChartData.datasets[0].data, 
                barChartData.datasets[1].data,
                barChartData.datasets[2].data,
                barChartData.datasets[3].data
                ]
        },
        {
          label: 'femme',
          backgroundColor: '#F06292',
          data : [datasetFemale[0].data,
                datasetFemale[1].data,
                datasetFemale[2].data,
                datasetFemale[3].data
                ]
        }
      ]
      window.myChart.type = 'bar';
    };



    /***
    * generates charts depending on which regions are selected 
    * and which filters are selected
    * @param regions: list of selected regions
    */
    function refreshCallback(regions){
      //filters
      var sexe = document.getElementById('Sexe');
      var age = document.getElementById('Age');
      var poste = document.getElementById('Poste');
      var femme = document.getElementById('femme');
      var homme = document.getElementById('homme');
      var pdg = document.getElementById('pdg');
      var middleManager = document.getElementById('middleManager');
      var employee = document.getElementById('employee');
      var worker = document.getElementById('worker');
      var young = document.getElementById('18');
      var mid = document.getElementById('26');
      var elderly = document.getElementById('50');

      var title = '';
      if(regions.length == 0){
          return;
      }

      //comparative mode (age-sex/jobcat-sex) forbidden for multiple regions
      if((regions != undefined && regions.length > 1)){
        if((sexe.checked && poste.checked) || (sexe.checked && age.checked)|| (poste.checked && age.checked)){
          alert('Le mode à filtre double/triple est interdit pour plus de 2 régions\n Veuillez déselectionner une région pour pouvoir activer ce mode.');
          return;
        }
      }
      if(!sexe.checked && !poste.checked && !age.checked){
        plotStandard();
        return;
      }
      //single filters only 
      if((sexe.checked && !age.checked && !poste.checked)|| (!sexe.checked && age.checked && !poste.checked)
          || (!sexe.checked && !age.checked && poste.checked)){
        //sex filter
        if(sexe.checked){
          if(homme.checked && femme.checked){
            plotMenWomen(regions);
            title = "Salaire moyen par critère de sexe";
          }
          else if(homme.checked){
            plotMen(regions);
            title = "Salaire moyen pour les hommes";
          }
          else if(femme.checked){
            plotWomen(regions);
            title = "Salaire moyen pour les femmes";
          }
          if(regions.length == 1 && homme.checked && femme.checked){
           rebuildChart(barChartData, title, 'pie');            
          }
          else{
            rebuildChart(barChartData, title);
          }
        }
        //age filter
        else if(age.checked){
          if(young.checked && mid.checked && elderly.checked){
            plotAge(regions);
            title = "Salaire moyen par critère d'âge";
          }
          else if(young.checked && mid.checked && !elderly.checked){
            plot1826(regions);
            title = "Salaire moyen par critère d'âge";
          }
          else if(young.checked && !mid.checked && elderly.checked){
            plot1850(regions);
            title = "Salaire moyen par critère d'âge";
          }
          else if(!young.checked && mid.checked && elderly.checked){
            plot2650(regions);
            title = "Salaire moyen par critère d'âge";
          }
          else if(young.checked){
            plot18(regions);
            title = "Salaire moyen pour la tranche d'âge : 18-25 ans";
          }
          else if(mid.checked){
            plot26(regions);
            title = "Salaire moyen pour la tranche d'âge : 26-50 ans";
          }
          else if(elderly.checked){
            plot50(regions);
            title = "Salaire moyen pour la tranche d'âge : > 50 ans";
          }
          rebuildChart(barChartData, title);
          if(regions.length > 1){
            plotRadarAge(regions);
            if(!elderly.checked){
              barChartData.labels.splice(2, 1);
              for(var i=0; i< regions.length; i++){
                barChartData.datasets[i].data.splice(2, 1);
              }
            }
            if(!mid.checked){
              barChartData.labels.splice(1, 1);
              for(var i=0; i< regions.length; i++){
                barChartData.datasets[i].data.splice(1, 1);
              }
            }
            if(!young.checked){
              barChartData.labels.splice(0, 1);
              for(var i=0; i< regions.length; i++){
                barChartData.datasets[i].data.splice(0, 1);
              }
            }
            rebuildChart(barChartData, 'Salaire moyen par critère d\'âge', 'radar', ctx2);
           
          }
          }
        //jobcat filter
        else if(poste.checked){
          plotPoste(regions);
          //deleting non-selected filters' data
        if(!worker.checked){
          barChartData.datasets.splice(3, 1);
        }
        if(!employee.checked){
           barChartData.datasets.splice(2, 1);
        } 
        if(!middleManager.checked){
          barChartData.datasets.splice(1, 1);
        } 
        if(!pdg.checked){
          barChartData.datasets.splice(0, 1);
        }
        title = "Salaire moyen par critère de poste";
        rebuildChart(barChartData, title);
        if(regions.length > 1){
          plotRadarPoste(regions);
          if(!worker.checked){
            barChartData.labels.splice(3,1);
            for(var i=0; i< regions.length; i++){
              barChartData.datasets[i].data.splice(3, 1);
            }
          }
          if(!employee.checked){
            barChartData.labels.splice(2, 1);
            for(var i=0; i< regions.length; i++){
               barChartData.datasets[i].data.splice(2, 1);
            }
          } 
          if(!middleManager.checked){
            barChartData.labels.splice(1, 1);
            for(var i=0; i< regions.length; i++){
             barChartData.datasets[i].data.splice(1, 1);
            }
          } 
          if(!pdg.checked){
            barChartData.labels.splice(0, 1);
            for(var i=0; i< regions.length; i++){
              barChartData.datasets[i].data.splice(0, 1);
            }
          }
          rebuildChart(barChartData, 'Salaire moyen par critère de poste', 'radar', ctx2);
        }

    }
  }
    //case of only one selected region and double filters: comparative mode enabled
    else{
      if(poste.checked && sexe.checked){
        //both sexes selected
        if(homme.checked && femme.checked){
          plotMaleFemalePoste(regions);
        if(pdg.checked && middleManager.checked && employee.checked && worker.checked){
        }
        else if(pdg.checked && middleManager.checked && employee.checked){
          barChartData.datasets[0].data.splice(3, 1);
          barChartData.datasets[1].data.splice(3, 1);
          barChartData.labels.splice(3, 1);
        }
        else if(middleManager.checked && employee.checked && worker.checked){
          barChartData.datasets[0].data.splice(0, 1);
          barChartData.datasets[1].data.splice(0, 1);
          barChartData.labels.splice(0, 1);
        }
        else if(pdg.checked && middleManager.checked && worker.checked){
          barChartData.datasets[0].data.splice(2, 1);
          barChartData.datasets[1].data.splice(2, 1);
          barChartData.labels.splice(2, 1);
        }
        else if(pdg.checked && employee.checked && worker.checked){
          barChartData.datasets[0].data.splice(1, 1);
          barChartData.datasets[1].data.splice(1, 1);
          barChartData.labels.splice(1, 1);
        }
        else if(pdg.checked && employee.checked){
          barChartData.datasets[0].data.splice(3, 1);
          barChartData.datasets[0].data.splice(1, 1);
          barChartData.datasets[1].data.splice(3, 1);
          barChartData.datasets[1].data.splice(1, 1);
          barChartData.labels.splice(3, 1);                 
          barChartData.labels.splice(1, 1);                 
        }
        else if(pdg.checked && middleManager.checked){
          barChartData.datasets[0].data.splice(2, 2);
          barChartData.labels.splice(2, 2); 
        }
        else if(pdg.checked && worker.checked){
          barChartData.datasets[0].data.splice(1, 2);
          barChartData.datasets[1].data.splice(1, 2);
          barChartData.labels.splice(1, 2);      
        }
        else if(middleManager.checked && employee.checked){
          barChartData.datasets[0].data.splice(3, 1);
          barChartData.datasets[0].data.splice(0, 1);
          barChartData.datasets[1].data.splice(3, 1);
          barChartData.datasets[1].data.splice(0, 1);
          barChartData.labels.splice(3, 1);                 
          barChartData.labels.splice(0, 1);  
        }
        else if(middleManager.checked && worker.checked){
          barChartData.datasets[0].data.splice(2, 1);
          barChartData.datasets[0].data.splice(0, 1);
          barChartData.datasets[1].data.splice(2, 1);
          barChartData.datasets[1].data.splice(0, 1);
          barChartData.labels.splice(2, 1);                 
          barChartData.labels.splice(0, 1);  
        }
        else if(employee.checked && worker.checked){
          barChartData.datasets[0].data.splice(0, 2);
          barChartData.datasets[1].data.splice(0, 2);
          barChartData.labels.splice(0, 2);   
        }
        else if(pdg.checked){
          plotMaleFemaleExec(regions);
        } 
        else if(middleManager.checked){
          plotMaleFemaleMgr(regions);
        }
        else if(employee.checked){
          plotMaleFemaleEmpl(regions);
        }
        else if(worker.checked){
          plotMaleFemaleWorker(regions);
        }
        else{
            console.log('error');
        }
        title = "Salaire moyen par critère de sexe et de poste pour la région:\n";
        title += regionNames[regions[0]] ;
        rebuildChart(barChartData, title);
      }

      else if(homme.checked){
        plotMalePoste(regions);
        if(pdg.checked && middleManager.checked && employee.checked && worker.checked){
        }
          else if(pdg.checked && middleManager.checked && employee.checked){
            barChartData.datasets.splice(3, 1);
          }
          else if(middleManager.checked && employee.checked && worker.checked){
            barChartData.datasets.splice(0, 1);
          }
          else if(pdg.checked && middleManager.checked && worker.checked){
            barChartData.datasets.splice(2, 1);
          }
          else if(pdg.checked && employee.checked && worker.checked){
            barChartData.datasets.splice(1, 1);
          }
          else if(pdg.checked && employee.checked){
            barChartData.datasets.splice(3, 1);
            barChartData.datasets.splice(1, 1);                  
          }
          else if(pdg.checked && middleManager.checked){
            barChartData.datasets.splice(3, 1);
            barChartData.datasets.splice(2, 1);
          }
          else if(pdg.checked && worker.checked){
            barChartData.datasets.splice(2, 1);
            barChartData.datasets.splice(1, 1);
          }
          else if(middleManager.checked && employee.checked){
            barChartData.datasets.splice(3, 1);
            barChartData.datasets.splice(0, 1);
          }
          else if(middleManager.checked && worker.checked){
            barChartData.datasets.splice(2, 1);
            barChartData.datasets.splice(0, 1);
          }
          else if(employee.checked && worker.checked){
            barChartData.datasets.splice(1, 1);
            barChartData.datasets.splice(0, 1);
          }
          else if(pdg.checked){
            plotMaleExec(regions);
          } 
          else if(middleManager.checked){
            plotMaleMgr(regions);
          }
          else if(employee.checked){
            plotMaleEmpl(regions);
          }
          else if(worker.checked){
            plotMaleWorker(regions);
          }
          title = "Salaire moyen pour les hommes par critère de poste";
          rebuildChart(barChartData, title);
        }
        else if(femme.checked){
            plotFemalePoste(regions);
          if(pdg.checked && middleManager.checked && employee.checked && worker.checked){
        }
          else if(pdg.checked && middleManager.checked && employee.checked){
            barChartData.datasets.splice(3, 1);
          }
          else if(middleManager.checked && employee.checked && worker.checked){
            barChartData.datasets.splice(0, 1);
          }
          else if(pdg.checked && middleManager.checked && worker.checked){
            barChartData.datasets.splice(2, 1);
          }
          else if(pdg.checked && employee.checked && worker.checked){
            barChartData.datasets.splice(1, 1);
          }
          else if(pdg.checked && employee.checked){
            barChartData.datasets.splice(3, 1);
            barChartData.datasets.splice(1, 1);                  
          }
          else if(pdg.checked && middleManager.checked){
            barChartData.datasets.splice(3, 1);
            barChartData.datasets.splice(2, 1);
          }
          else if(pdg.checked && worker.checked){
            barChartData.datasets.splice(2, 1);
            barChartData.datasets.splice(1, 1);
          }
          else if(middleManager.checked && employee.checked){
            barChartData.datasets.splice(3, 1);
            barChartData.datasets.splice(0, 1);
          }
          else if(middleManager.checked && worker.checked){
            barChartData.datasets.splice(2, 1);
            barChartData.datasets.splice(0, 1);
          }
          else if(employee.checked && worker.checked){
            barChartData.datasets.splice(1, 1);
            barChartData.datasets.splice(0, 1);
          }
          else if(pdg.checked){
            plotFemaleExec(regions);
          } 
          else if(middleManager.checked){
            plotFemaleMgr(regions);
          }
          else if(employee.checked){
            plotFemaleEmpl(regions);
          }
          else if(worker.checked){
            plotFemaleWorker(regions);
          }
          title = "Salaire moyen pour les femmes par critère de poste";
          rebuildChart(barChartData, title);
        }

    } 
    else if(age.checked && sexe.checked){
      if(homme.checked && femme.checked){
        if(young.checked && mid.checked && elderly.checked){
          plotMaleFemaleAge(regions);
        } else if(young.checked && mid.checked){
          plot1826MenWomen(regions);
        } else if(mid.checked && elderly.checked){
          plot2650MenWomen(regions);
        } else if(young.checked && elderly.checked){
          plot1850MenWomen(regions);
        } else if(young.checked){
          plot18MenWomen(regions);
        } else if(mid.checked){
          plot26MenWomen(regions);
        } else if(elderly.checked){
          plot50MenWomen(regions);
        } 
        title = "Salaire moyen critère de sexe et d'âge pour la région: \n";
        title += regionNames[regions[0]];
        rebuildChart(barChartData, title);
    }
     else if(homme.checked){
        if(young.checked && mid.checked && elderly.checked){
          plotMaleAge(regions);
        } else if(young.checked && mid.checked){
          plot1826Men(regions);
        } else if(mid.checked && elderly.checked){
          plot2650Men(regions);
        } else if(young.checked && elderly.checked){
          plot1850Men(regions);
        } else if(young.checked){
          plot18Men(regions);
        } else if(mid.checked){
          plot26Men(regions);
        } else if(elderly.checked){
          plot50Men(regions);
        }
        title = "Salaire moyen pour les hommes par critère d'âge";
        rebuildChart(barChartData, title);
    } 
    else if(femme.checked){
      if(young.checked && mid.checked && elderly.checked){
          plotFemaleAge(regions);
        } else if(young.checked && mid.checked){
          plot1826Women(regions);
        } else if(mid.checked && elderly.checked){
          plot2650Women(regions);
        } else if(young.checked && elderly.checked){
          plot1850Women(regions);
        } else if(young.checked){
          plot18Women(regions);
        } else if(mid.checked){
          plot26Women(regions);
        } else if(elderly.checked){
          plot50Women(regions);
        }
        title = "Salaire moyen pour les femmes par critère d'âge";
        rebuildChart(barChartData, title);
    }

    }
  }
  };

