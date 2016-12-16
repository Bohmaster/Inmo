var app = angular.module("Inmo", [
    'ngResource',
    'lbServices',
    'ui.router',
    'ui.bootstrap',
    'angular-carousel'
]);

var API_URL = "http://localhost:3000/api/"

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/app');

    $stateProvider
        .state('app', {
            abstract: true,
            url: '/app',
            templateUrl: 'app/views/app.html'
        })
        .state('app.home', {
            url: '',
            templateUrl: 'app/views/home.html',
            controller: 'HomeController'
        })
        .state('app.propiedades', {
            url: '/propiedades',
            templateUrl: 'app/views/lista.html',
            controller: 'PropiedadController',
            params: {
                filter: null
            }
        })
        .state('app.detail', {
            url: '/propiedad/:propId',
            templateUrl: 'app/views/detalle.html',
            controller: 'PropiedadController'
        });
        
});

app.controller('HomeController', function($rootScope, $scope, Propiedad) {
    console.log('running');

    $scope.data = {};

    $scope.destacados = [];

    $scope.containerURL = API_URL + 'containers/images/download/';

    $scope.operaciones = [
        {
            label: 'Alquiler',
            value: 'alquiler'
        },
        {
            label: 'Venta',
            value: 'venta'
        }
    ];

    $scope.data.operacion = $scope.operaciones[0];

    $scope.tipo_propiedad = [
        {
            label: 'Casa',
            value: 'casa'
        },
        {
            label: 'Departamento',
            value: 'departamento'
        },
        {
            label: 'Terrenos',
            value: 'terrenos'
        },
        {
            label: 'Barrio privado',
            value: 'barrio_privado'
        },
        {
            label: 'Locales/oficinas',
            value: 'locales/oficinas'
        },
        {
            label: 'Campos',
            value: 'campos'
        },
        {
            label: 'Galpones',
            value: 'galpones'
        },
        {
            label: 'Cocheras',
            value: 'cocheras'
        },
        {
            label: 'Emprendimiento',
            value: 'emprendimiento'
        }
   
    ];

    $scope.data.tipo_propiedad = $scope.tipo_propiedad[0];

    $scope.dormitorios = [
        {
            label: 'Ninguno',
            value: 'ninguno'
        },
        {
            label: 'Monoambiente',
            value: 'monoambiente'
        },
        {
            label: '1 Dormitorio',
            value: '1dorm'
        },
        {
            label: '2 Dormitorios',
            value: '2dorm'
        },
        {
            label: '3 Dormitorios',
            value: '3dorm'
        },
        {
            label: '4 Dormitorios ó más',
            value: '4dorm'
        }    
    ];

    $scope.data.dormitorios = $scope.dormitorios[1];

    $scope.localidades = [
        {
            label: 'Rosario',
            value: 'rosario'
        },
        {
            label: 'San Lorenzo',
            value: 'sanLorenzo'
        },
        {
            label: 'Puerto San Martín',
            value: 'sanLorenzo'
        },
        { value: 'funes', label: 'Funes' },
        { value: 'roldan', label: 'Roldán' },
        { value: 'beltran', label: 'Fray Luis Beltrán' },
        { value: 'bermudez', label: 'Capitán Bermúdez' },
        { value: 'uruguay', label: 'Uruguay' },
        { value: 'costa', label: 'Costa atlántica' },
        { value: 'otros', label: 'Otros' }  
    ];

    $scope.data.localidad = $scope.localidades[0];
    
    $scope.selected = function() {
        console.log($scope.data);
    };

    function loadDestacado() {
        Propiedad.find({
            filter: {
                where: {
                    destacado: true
                }
            }
        }, function(data) {
            $scope.destacados = data[0];
        });
    }

    loadDestacado();
    
});

app.controller('PropiedadController', function($scope, $stateParams, $modal, Propiedad) {
    console.log('HERE', $stateParams);

    $scope.containerURL = API_URL + 'containers/images/download/';

    $scope.propiedad = {};

    $scope.openModal = function() {
        console.log(1);
        $modal.open({
            templateUrl: 'views/gustavo.html'
        })
    };

    if ($stateParams.propId) {

        Propiedad.find({
            filter: {
                where: {
                    id: $stateParams.propId
                },
                include: 'contacto'
            }
        }, function(prop) {
            $scope.propiedad = prop[0];
        }, function(err) {
            console.log(err);
        });

    } else {

        $scope.data = {};

        $scope.propiedades = [];

        $scope.operaciones = [
            {
                label: 'Alquiler',
                value: 'alquiler'
            },
            {
                label: 'Venta',
                value: 'venta'
            }
        ];

        $scope.data.operacion = $scope.operaciones[0];

        $scope.tipo_propiedad = [
            {
                label: 'Casa',
                value: 'casa'
            },
            {
                label: 'Departamento',
                value: 'departamento'
            },
            {
                label: 'Terrenos',
                value: 'terrenos'
            },
            {
                label: 'Barrio privado',
                value: 'barrio_privado'
            },
            {
                label: 'Locales/oficinas',
                value: 'locales/oficinas'
            },
            {
                label: 'Campos',
                value: 'campos'
            },
            {
                label: 'Galpones',
                value: 'galpones'
            },
            {
                label: 'Cocheras',
                value: 'cocheras'
            },
            {
                label: 'Emprendimiento',
                value: 'emprendimiento'
            }
    
        ];

        $scope.data.tipo_propiedad = $scope.tipo_propiedad[0];

        $scope.dormitorios = [
            {
                label: 'Ninguno',
                value: 'ninguno'
            },
            {
                label: 'Monoambiente',
                value: 'monoambiente'
            },
            {
                label: '1 Dormitorio',
                value: '1dorm'
            },
            {
                label: '2 Dormitorios',
                value: '2dorm'
            },
            {
                label: '3 Dormitorios',
                value: '3dorm'
            },
            {
                label: '4 Dormitorios ó más',
                value: '4dorm'
            }    
        ];

        $scope.data.dormitorios = $scope.dormitorios[1];

        $scope.localidades = [
            {
                label: 'Rosario',
                value: 'rosario'
            },
            {
                label: 'San Lorenzo',
                value: 'sanLorenzo'
            },
            {
                label: 'Puerto San Martín',
                value: 'sanLorenzo'
            },
            { value: 'funes', label: 'Funes' },
            { value: 'roldan', label: 'Roldán' },
            { value: 'beltran', label: 'Fray Luis Beltrán' },
            { value: 'bermudez', label: 'Capitán Bermúdez' },
            { value: 'uruguay', label: 'Uruguay' },
            { value: 'costa', label: 'Costa atlántica' },
            { value: 'otros', label: 'Otros' }  
        ];

        $scope.data.localidad = $scope.localidades[0];
        
        $scope.selected = function() {
            console.log($scope.data);
        };

        console.log('x');

        if ($stateParams.filter) {            
            var params = $stateParams.filter;
            console.log('It has filter', params);

            var query = {
                filter: {
                    where: {
                        operacion: params.operacion.value,
                        tipo_propiedad: params.tipo_propiedad.value,
                        dormitorios: params.dormitorios.value,
                        localidad: params.localidad.value
                    }
                }
            };

            console.log(1, query);
        }

        Propiedad.find(query, function(data) {
            console.log(data);

            $scope.propiedades = data;
        }, function(err) {
            console.log(err);
        });
    }
});

app.run(function($rootScope) {
    $rootScope.$on('$viewContentLoaded', function () {
        setTimeout(function() {
            Webflow.ready();
            console.log('Ready!');
        }, 10000);
        console.log('route changed');
    });

    $rootScope.$on('$stateChangeSuccess', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
    
});

app.directive('mapa', function() {
    return {
        restrict: 'E',
        template: '<div id="map" data-ix="telefono" class="divMapa mapa" style="width: 100%; height: 330px !important; border: 10px solid white;"></div>',
        link: function (scope, elem, attrs) {

            var geocoder;
            var map;

            attrs.$observe('dir', function (value) {
                //console.log(value);

                geocoder = new google.maps.Geocoder();
                geocoder.geocode({ 'address': value + ', Rosario, Argentina' }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        mapOptions = {
                            zoom: 17,
                            center: results[0].geometry.location
                        };

                        map = new google.maps.Map(document.getElementById("map"), mapOptions);
                        marker = new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location
                        });
                    } else {
                        //console.log(status);
                    }
                });
            });
        }
    }
});

app.directive('testy', ['$filter', '$sce', function($filter, $sce) {
  return {
    restrict: 'A',    
    scope: {
      obj: '@',
      name: '@'
    },
    link: function(scope, element, attrs) {
      scope.onGetJson = function() {
        return $sce.trustAsHtml($filter('json')(scope.json));
      }

      attrs.$observe('obj', function(value) {
          console.log('HERE', value);

          var serializedObject = JSON.parse(element.context.innerHTML);
          var serializedValue  = JSON.parse(value);

          serializedObject.items[0].url = 'api/containers/images/download/' + serializedValue[scope.name];

          console.log('scope', attrs, attrs.name, attrs.obj);
            
          var innerHTML = JSON.stringify(serializedObject);

          console.log('PRE', innerHTML);

          element.context.innerHTML = innerHTML;

          console.log('YEAH', element.context.innerHTML);
      });

    },
    replace: true
  };
}]);