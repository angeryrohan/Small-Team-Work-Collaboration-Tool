$(document).ready(function() {
    // Breakpoint System
    let width = window.innerWidth;
    var bp_xs = 480, bp_s  = 760, bp_m  = 990, bp_l  = 1200;
    function bp(breakpoint) {
      width = window.innerWidth;
      
      let breakpoints = {
        xs: width < bp_xs ? true : false,
        s: width >= bp_xs && width < bp_s ? true : false,
        m: width >= bp_s  && width < bp_m ? true : false,
        l: width >= bp_m  && width < bp_l ? true : false,
        d: width > bp_l ? true : false
      }
      
      return breakpoints[breakpoint];
    }
    
    
    // ----------------------------------------------------------
    // Nav Menu Open/Close | Mobile -----------------------------
    $('#nav-menu').click(function() {
      $(this).toggleClass('open');
      $('#header #nav ul').toggleClass('show-nav');
    });
    
    
    // ----------------------------------------------------------
    // Nav Dropdown Menu | Open/Close ---------------------------
    // DESKTOP
    $('#nav-links li.dropdown-category').mouseenter(function() {
      // If Desktop/Tablet
      if ( bp('m') || bp('l') || bp('d') ) { $(this).addClass('show'); }
    });
    $('#nav-links li.dropdown-category').mouseleave(function() {
      // If Desktop/Tablet
      if ( bp('m') || bp('l') || bp('d') ) { $(this).removeClass('show'); }
    });
    
    // MOBILE
    $('#nav-links li.dropdown-category a').click(function() {
      // if Mobile
      if ( bp('xs') || bp('s') ) { $(this).parent().toggleClass('show'); }
    });
  });
  google.charts.load("current", {packages:["corechart"]});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
          var data = google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            ['Completed',     1],
            ['Pending',      3],
          ]);
  
          var options = {
            title: '',
            is3D: true,
            legend: {position: 'none'},
            slices: [{color: 'cadetblue'}, {color: 'grey'}],
            backgroundColor: 'transparent'
          };
  
          var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
          chart.draw(data, options);
        }