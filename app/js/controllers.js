'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone',
function($scope, Phone) {
$scope.phones = Phone.query();
$scope.orderProp = 'age';
}]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
function($scope, $routeParams, Phone) {
$scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
  $scope.mainImageUrl = phone.images[0];
});

$scope.setImage = function(imageUrl) {
  $scope.mainImageUrl = imageUrl;
}
}]);


jQuery.noConflict()

function UDashboardCtrl($scope) { }

function HeaderCtrl($scope) { 

jQuery(document).ready(function(){
jQuery("#txtFromDate").datepicker({
  numberOfMonths: 2,
  onSelect: function(selected) {
    jQuery("#txtToDate").datepicker("option","minDate", selected)
  }
});

jQuery("#txtToDate").datepicker({ 
  numberOfMonths: 2,
  onSelect: function(selected) {
   jQuery("#txtFromDate").datepicker("option","maxDate", selected)
 }

});  

});

}

function FooterCtrl($scope) { }

/******************************* OrdersGraphCtrl Start Here **************************/

function OrdersGraphCtrl($scope) { 

      jQuery(function () {
      jQuery('#orders').highcharts({
        chart: {
          type: 'column', 
          backgroundColor: '#2e526c',
          borderRadius : '3',
          animation: true,
        },

        colors: [
        '#77da3f',
        '#f19614'
        ],

        credits: {
          enabled: false
        },

        exporting: {
          enabled: false
        },

        title: {
          text: ''
        },

        subtitle: {
          text: ''
        },

        legend: {
          backgroundColor: '#FFFFFF',
          reversed: true
        },

        xAxis: {
          categories: [
                /*  'Jan',
                  'Feb',
                  'Mar',
                  'Apr',
                  'May',
                  'Jun',
                  'Jul',
                  'Aug',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec'*/
                  ]
                },

          yAxis: {
           min: 0,
           title: {
             text: ''
           }
         },

         tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },

        plotOptions: {
          column: {
            pointPadding: 0.1,
            borderWidth: 0,

          }
        },

        series: [{
          name: 'Orders',
          data: [300.3, 400.4, 500.5, 600.6, 700.7, 800.8, 900.9, 1000, 1100, 1200, 1300]

        }, {
          name: 'Abandoned',
          data: [500.5, 600.6, 700.7, 800.8, 900.9, 1000, 1100, 1200, 1300, 1400, 1500]

        },]
      });
});

}

/******************************** OrdersGraphCtrl End Here **************************/

/******************************* TrafficSourcesCtrl Start Here **************************/

function TrafficSourcesCtrl($scope) { 

          jQuery(function () {
          Highcharts.setOptions({
           colors: ['#14e3fb', '#4fa5f5', '#ed3127', '#fe8221']
          });

          jQuery('#trafficsources').highcharts({
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: true,
              showAxes:false,
              backgroundColor: '#7DADCA',
              borderRadius : '0',
              marginLeft: '-6',
              marginTop: '0',
            },

            credits: {
              enabled: false
            },

            exporting: {
              enabled: false,
            },

            title: {
              text: ''
            },

            tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },

            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
           // size:'100%',
           dataLabels: {
            enabled: true,
            color: '#FFF',
            connectorColor: '#FFF',
            format: '<b>{point.percentage:.1f} %</b>'
            // format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
          }
          },

          series: [{
          type: 'pie',
          name: 'Browser Share',
          data: [
          ['Twitter',   5],
          ['Facebook', 20],
          ['Yahoo',    10],
          ['Google',   65],

          ]
          }]

          });

          });

          }

/******************************* TrafficSourcesCtrl End Here **********************/

/******************************* LowStockCtrl Start Here **************************/

function LowStockCtrl($scope) {

    jQuery(function () {
        var catName = [];
        var countOfSearch = [];
        // ajax call for getting 
        jQuery.ajax({url:"http://localhost/magento18/api/rest/reportsapi/cat?type=rest",success:function(response){
            jQuery.each(response, function() {
              catName.push(this.cat_name);
              countOfSearch.push(this.lowStockProductCount);
            });

          var responseLength = countOfSearch.length;
          var equalPartsTemp = responseLength / 3;
          var colorSeparation = Math.round(equalPartsTemp);

var objArray = [];
var flag = 0;
var flag2 = 0;
/*setting data for low stock*/
for(var i = 0; i < countOfSearch.length; i++){
 var jsonArg1 = new Object();
    jsonArg1.y = countOfSearch[i];

    if(flag <= colorSeparation)
    {
         jsonArg1.color = '#fcc82e';
    }else if(flag > colorSeparation && flag <= colorSeparation+colorSeparation){
          jsonArg1.color = '#ff8321';
    }else{
          jsonArg1.color = '#f03f36';
    }
    flag++;

    objArray.push(jsonArg1);
}

var myJsonString = JSON.parse(JSON.stringify(objArray));


    jQuery('#lowStock').highcharts({
      chart: {
        type: 'bar',
        backgroundColor: '#2e526c',
        borderRadius: '3',
      },

      colors: [
      '#000',

      ],

      credits: {
        enabled: false
      },

      exporting: {
        enabled: false
      },

      title: {
            text: ''  //Stacked bar chart
          },

      xAxis: {
       // categories: ['Softwares', 'Audio', 'Video', 'Jeans', 'Polo Shirts', 'Shirts', 'Shoes', 'Acccessories', 'Trousers & Chinos', 'Watches']
       categories:catName
      },

      yAxis: {
        min: 0,
        title: {
          text: ''
        }
      },

      legend: {
        backgroundColor: '#FFFFFF',
        reversed: true,

      },

      plotOptions: {
        series: {
          stacking: 'normal',
          borderWidth: '0',
          pointPadding: 0.1,
         //colorByPoint: true
       },

     },

     series: [{
      name: 'Low Stock',
       // data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
       data: myJsonString
     }, ]
   });
  }}); // end of ajax call
});

  /*
   * dyanamic values for category drop down.
  */
jQuery(function () {
 jQuery.ajax({url:"http://localhost/magento18/api/rest/getcategory?type=rest",success:function(response){
  jQuery.each(response, function() {
            if(this.name != null){
            jQuery("#magentocatgegories").append(jQuery("<option>").attr("value", this.category_id).text(this.name));
            }
          });
  }}); 
});
  /*
   * dyanamic values for category drop down.
  */
 /* on category change*/

$scope.$watch('datepick', function(dateText, inst) {

     //   var date = jQuery(this).val();
        var time = angular.toJson(dateText);
        alert('on select triggered');
        /*$("#start").val(date + time.toString(' HH:mm').toString());
        console.log(date + time.toString(' HH:mm').toString());*/

});

  $scope.$watch('category', function(newValue) {
    //alert("newValue:" + angular.toJson(newValue))

    if(angular.toJson(newValue)){
      var catId = angular.toJson(newValue).replace ( /[^\d.]/g, '' );
        var catName = [];
        var countOfSearch = [];
        // ajax call for getting 
        jQuery.ajax({url:"http://localhost/magento18/api/rest/reportsapi/"+catId+"?type=rest",success:function(response){    
            jQuery.each(response, function() {
              catName.push(this.cat_name);
              countOfSearch.push(this.lowStockProductCount);
            });

          var responseLength = countOfSearch.length;
          var equalPartsTemp = responseLength / 3;

          var colorSeparation = Math.round(equalPartsTemp);
        //  alert(colorSeparation);

var objArray = [];
var flag = 0;
var flag2 = 0;
/*setting data for low stock*/
for(var i = 0; i < countOfSearch.length; i++){
 var jsonArg1 = new Object();
    jsonArg1.y = countOfSearch[i];

    if(responseLength < 3)
    {
        jsonArg1.color = '#f03f36';
    }else{
        if(flag <= colorSeparation)
        {
             jsonArg1.color = '#fcc82e';
        }else if(flag > colorSeparation && flag <= colorSeparation+colorSeparation){
              jsonArg1.color = '#ff8321';
        }else{
              jsonArg1.color = '#f03f36';
        }
        flag++;
    } 
   
    objArray.push(jsonArg1);
}

var text = "";
if(objArray.length == 0){  text = "No Data" ; }else{ text = "Low Stock" }
var myJsonString = JSON.parse(JSON.stringify(objArray));


    jQuery('#lowStock').highcharts({
      chart: {
        type: 'bar',
        backgroundColor: '#2e526c',
        borderRadius: '3',
      },

      colors: [
      '#000',

      ],

      credits: {
        enabled: false
      },

      exporting: {
        enabled: false
      },

      title: {
            text: ''  //Stacked bar chart
          },

      xAxis: {
       // categories: ['Softwares', 'Audio', 'Video', 'Jeans', 'Polo Shirts', 'Shirts', 'Shoes', 'Acccessories', 'Trousers & Chinos', 'Watches']
       categories:catName
      },

      yAxis: {
        min: 0,
        title: {
          text: ''
        }
      },

      legend: {
        backgroundColor: '#FFFFFF',
        reversed: true,

      },

      plotOptions: {
        series: {
          stacking: 'normal',
          borderWidth: '0',
          pointPadding: 0.1,
         //colorByPoint: true
       },

     },


     series: [{
      name: text,
       // data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
       data: myJsonString
     }, ]

   });


  }}); // end of ajax call





    } // if ends
 

  });   /* on category change -- ENDS -- */

}

/******************************* LowStockCtrl End Here **************************/

/******************************* TopsearchesCtrl Start Here *********************/

function TopsearchesCtrl($scope) {

      jQuery(function () {
        var searchTerm = [];
        var countOfSearchTemp = [];
        var countOfSearch = [];
        jQuery.ajax({url:"http://localhost/magento18/api/rest/topsearch/?type=rest",success:function(response){

            jQuery.each(response, function() {
              searchTerm.push(this.search_term);
              countOfSearch.push(parseFloat(this.result));
            });

        jQuery('#topsearches').highcharts({
        chart: {
          type: 'bar',
          borderRadius : '3',
        },

        colors: [
        '#67bff6',

        ],

        credits: {
          enabled: false
        },

        exporting: {
          enabled: false
        },

        title: {
              text: '' //Stacked bar chart
            },

            xAxis: {
              //categories: ['Bags', 'Jackets & Coats', 'Jeans', 'Polo Shirts', 'Shirts', 'Shoes & Trainers', 'Trousers & Chinos', 'Watches']
              categories: searchTerm
            },

            yAxis: {
              min: 0,
              title: {
                  text: ''  //Total fruit consumption
                }
              },

        legend: {
          backgroundColor: '#FFFFFF',
          reversed: true
        },

        plotOptions: {
          series: {
            stacking: 'normal'
          },

          column: {
            pointPadding: 0.2,
            borderWidth: 0,

          }
        },

       series: [{
          name: 'Result',
         data: countOfSearch
        }]

      });


       }}); // ajax call ends


      
});

}

/******************************* TopsearchesCtrl End Here **************************/

/******************************* TopProductsCtrl Start Here **************************/

function TopProductsCtrl($scope) {

      jQuery(function () {
        var productName = [];
        var countOfSearch = [];
        // ajax call for getting 
        jQuery.ajax({url:"http://localhost/magento18/api/rest/bestseller/?type=rest",success:function(response){
            jQuery.each(response, function() {
              productName.push(this.product_name);
              countOfSearch.push(parseFloat(this.qty_ordered));
            });
      jQuery('#toproducts').highcharts({
        chart: {
          type: 'bar',
          borderRadius : '3',
        },

        colors: [
        '#67bff6',
        ],

        credits: {
          enabled: false
        },

        exporting: {
          enabled: false
        },

        title: {
              text: '' //Stacked bar chart
            },

            xAxis: {
             //categories: ['Jackets & Coats', 'Jeans', 'Polo Shirts', 'Shirts', 'Shoes', 'Watches']
             categories:productName
            },

      yAxis: {
        min: 0,
        title: {
            text: ''  //Total fruit consumption
          }
        },

        legend: {
          backgroundColor: '#FFFFFF',
          reversed: true
        },

        plotOptions: {
          series: {
            stacking: 'normal'
          },

          column: {
            pointPadding: 0.2,
            borderWidth: 0,

          }
        },

        series: [{
          name: 'Top Products',
          data: countOfSearch
        },]
      });

   }}); // ajax call ends
});

}


/******************************* TopProductsCtrl End Here **************************/

