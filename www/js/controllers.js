angular.module('starter.controllers', [])



//Controlador para la pantalla Inicio. Definira una nueva instancia de Firebase y con ella definira un metodo para realizar el login
.controller('LoginCtrl',['$scope','FIREBASE_REF','$firebaseSimpleLogin','userSession',function($scope,FIREBASE_REF,$firebaseSimpleLogin,userSession){

    userSession.auth=$firebaseSimpleLogin(new Firebase(FIREBASE_REF));

    //red -> String que identifica la red social con la que se ha de hacer el login. 
    $scope.login=function(red){
        userSession.auth.$login(red);
    }

}])


//Controlador para la pestaña video. 
.controller('VideoCtrl',['$scope',function($scope){

   

}])

//Controlador para la pestaña tareas. 
.controller('TareasCtrl',['$scope','$ionicModal',function($scope,$ionicModal){

   //Array con las tareas, se recupera del localstorage
   $scope.tareas = JSON.parse(localStorage.tareas || '[]');


   //Creamos el Modal para almacenar nueva tarea
   $ionicModal.fromTemplateUrl('modals/nueva-tarea.html', function(modal) {
      	$scope.nuevaTareaModal = modal;
      }, {
       	scope: $scope,
       	animation: 'slide-in-up'
   });

   //Funcion para abrir el Modal
   $scope.abrirNuevaTarea = function() {
   		$scope.nuevaTareaModal.show();
   };


   //Funcion para cerrar el Modal
   $scope.cerrarNuevaTarea = function() {
   		$scope.nuevaTareaModal.hide();
   };

   //Funcion para crear nueva tarea, actualiza la lista y el localstorage
   $scope.crearTarea = function(tarea) {
   	  if (tarea.titulo != '') {
          $scope.tareas.push(
              {titulo : tarea.titulo}
          );
          localStorage.tareas = JSON.stringify($scope.tareas);
          tarea.titulo = '';
          $scope.nuevaTareaModal.hide();
      }
   }


   //Variable para almacenar si se esta editando o no
   $scope.editar = false;

   //Funcion para entrar o salir del modo de edicio
   $scope.editarTareas = function () {
      if (!$scope.editar) $scope.editar = true;
      else $scope.editar = false;
   }

   //Funcion para eliminar una tarea, la elimina de la lista y actualiza el localstorage
   $scope.eliminarTarea = function(tarea) {
      var index = $scope.tareas.indexOf(tarea);
      if (index > -1) {
        $scope.tareas.splice(index, 1);
        localStorage.tareas = JSON.stringify($scope.tareas);
      }
   }


}])

//Controlador para la pestaña comentarios. 
.controller('ComentariosCtrl',['$scope',function($scope){

  //Recupero los comentarios del localStorage
  $scope.comentarios = JSON.parse(localStorage.comentarios || '[]');

  //Mensaje inferior con el resultado del envio, de momento en blanco
  $scope.mensaje = "";

  //Inicio el objeto en el que se almacenan los campo
  $scope.data = {
    nombre : '',
    email : '',
    comentario : ''
  };

  //Funcion que guarda el comentario en el localstorage
  $scope.guardarComentario = function(data) {
    //Copruebo que esten todos los campos rellenados
    if (data.nombre == '' || data.email == '' || data.comentario == '') {
      $scope.mensaje = "Faltan datos por rellenar";
      return;
    }
    //Añado el objeto al array
    $scope.comentarios.push({
      nombre : data.nombre,
      email : data.email,
      comentario : data.comentario
    });
    //Vacio los campos
    data.nombre = '';
    data.email = '';
    data.comentario = '';
    //Actualizo el localStorage
    localStorage.comentarios = JSON.stringify($scope.comentarios);
    //Muestro le mensaje al usuaio
    $scope.mensaje = "Muchas gracias, su comentario ha sido guardado";
  }

}]);
