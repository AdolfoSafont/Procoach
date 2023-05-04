import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import { TareasService } from 'src/app/services/tareas.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Tarea } from 'src/app/interfaces/tarea.interface';

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.scss']
})
export class CrearTareaComponent implements OnInit {
  
  formTarea: FormGroup;
  dataUser: any;

  constructor(
    private tareasServices: TareasService,
    private afAuth: AngularFireAuth,
  ) { 
    this.formTarea = new FormGroup({
      nombre: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      duracion: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
    })   
  }

  

  ngOnInit(): void {
    this.afAuth.currentUser.then(user => {
        this.dataUser = user;
    })
  }

  async guardarTarea () {
    
    let tarea: Tarea = {
     /* nombre: this.formTarea.value.nombre,
      categoria: this.formTarea.value.categoria,
      duracion: this.formTarea.value.duracion,
      descripcion: this.formTarea.value.descripcion,*/
      ...this.formTarea.value,
      imagen: '',
    }

    await this.crearImagen(tarea);
    console.log(tarea);
    
    const response = await this.tareasServices.addTarea(tarea, this.dataUser.uid);
    console.log(response);

    this.eliminarElementos();
  }

  dropImgJugador () {
    console.log('Jugador');

    var newDiv = document.createElement('div');
    var imagenJugador = document.createElement('img');

    imagenJugador.src = '../../../assets/img/jugador.png';
    imagenJugador.style.height = '50px';
    imagenJugador.style.width = '50px';
    newDiv.id = 'elementoDrop';
    
    document.querySelector('.pizarra')?.appendChild(newDiv).appendChild(imagenJugador);

    imagenJugador.onmousedown = function(event) {

      let shiftX = event.clientX - imagenJugador.getBoundingClientRect().left;
      let shiftY = event.clientY - imagenJugador.getBoundingClientRect().top;
    
      imagenJugador.style.position = 'absolute';
      imagenJugador.style.zIndex = '1';
      document.querySelector('pizarra')?.append(imagenJugador);
    
      moveAt(event.pageX, event.pageY);
    
      // mueve la pelota a las coordenadas (pageX, pageY)
      // tomando la posición inicial en cuenta
      function moveAt(pageX: number, pageY: number) {
        imagenJugador.style.left = pageX - shiftX + 'px';
        imagenJugador.style.top = pageY - shiftY + 'px';
      }
    
      function onMouseMove(event: { pageX: any; pageY: any; }) {
        moveAt(event.pageX, event.pageY);
      }
    
      // mueve la pelota con mousemove
      document.addEventListener('mousemove', onMouseMove);
    
      // suelta la pelota, elimina el manejador innecesario
      imagenJugador.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        imagenJugador.onmouseup = null;
        
      };
    
    };
    
    imagenJugador.ondragstart = function() {
      return false;
    };
  }

  dropImgBalon () {
    console.log('Balon');

    var newDiv = document.createElement('div');
    var imagenBalon = document.createElement('img');

    imagenBalon.src = '../../../assets/img/balon.png';
    imagenBalon.style.height = '20px';
    imagenBalon.style.width = '20px';
    newDiv.id = 'elementoDrop';

    document.querySelector('.pizarra')?.appendChild(newDiv).appendChild(imagenBalon);

    imagenBalon.onmousedown = function(event) {

      let shiftX = event.clientX - imagenBalon.getBoundingClientRect().left;
      let shiftY = event.clientY - imagenBalon.getBoundingClientRect().top;
    
      imagenBalon.style.position = 'absolute';
      imagenBalon.style.zIndex = '1';
      document.querySelector('pizarra')?.append(imagenBalon);
    
      moveAt(event.pageX, event.pageY);
    
      // mueve la pelota a las coordenadas (pageX, pageY)
      // tomando la posición inicial en cuenta
      function moveAt(pageX: number, pageY: number) {
        imagenBalon.style.left = pageX - shiftX + 'px';
        imagenBalon.style.top = pageY - shiftY + 'px';
      }
    
      function onMouseMove(event: { pageX: any; pageY: any; }) {
        moveAt(event.pageX, event.pageY);
      }
    
      // mueve la pelota con mousemove
      document.addEventListener('mousemove', onMouseMove);
    
      // suelta la pelota, elimina el manejador innecesario
      imagenBalon.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        imagenBalon.onmouseup = null;
      };
    
    };
    
    imagenBalon.ondragstart = function() {
      return false;
    };
  }

  dropImgConoAzul () {
    console.log('Cono azul');

    var newDiv = document.createElement('div');
    var imagenConoAzul = document.createElement('img');

    imagenConoAzul.src = '../../../assets/img/cono-azul.png';
    imagenConoAzul.style.height = '20px';
    imagenConoAzul.style.width = '20px';
    newDiv.id = 'elementoDrop';

    document.querySelector('.pizarra')?.appendChild(newDiv).appendChild(imagenConoAzul);

    imagenConoAzul.onmousedown = function(event) {

      let shiftX = event.clientX - imagenConoAzul.getBoundingClientRect().left;
      let shiftY = event.clientY - imagenConoAzul.getBoundingClientRect().top;
    
      imagenConoAzul.style.position = 'absolute';
      imagenConoAzul.style.zIndex = '1';
      document.querySelector('pizarra')?.append(imagenConoAzul);
    
      moveAt(event.pageX, event.pageY);
    
      // mueve la pelota a las coordenadas (pageX, pageY)
      // tomando la posición inicial en cuenta
      function moveAt(pageX: number, pageY: number) {
        imagenConoAzul.style.left = pageX - shiftX + 'px';
        imagenConoAzul.style.top = pageY - shiftY + 'px';
      }
    
      function onMouseMove(event: { pageX: any; pageY: any; }) {
        moveAt(event.pageX, event.pageY);
      }
    
      // mueve la pelota con mousemove
      document.addEventListener('mousemove', onMouseMove);
    
      // suelta la pelota, elimina el manejador innecesario
      imagenConoAzul.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        imagenConoAzul.onmouseup = null;
      };
    
    };
    
    imagenConoAzul.ondragstart = function() {
      return false;
    };
  }

  dropImgConoRojo () {
    console.log('Cono Rojo');

    var newDiv = document.createElement('div');
    var imagenConoRojo = document.createElement('img');

    imagenConoRojo.src = '../../../assets/img/cono-rojo.png';
    imagenConoRojo.style.height = '20px';
    imagenConoRojo.style.width = '20px';
    newDiv.id = 'elementoDrop';

    document.querySelector('.pizarra')?.appendChild(newDiv).appendChild(imagenConoRojo);

    imagenConoRojo.onmousedown = function(event) {

      let shiftX = event.clientX - imagenConoRojo.getBoundingClientRect().left;
      let shiftY = event.clientY - imagenConoRojo.getBoundingClientRect().top;
    
      imagenConoRojo.style.position = 'absolute';
      imagenConoRojo.style.zIndex = '1';
      document.querySelector('pizarra')?.append(imagenConoRojo);
    
      moveAt(event.pageX, event.pageY);
    
      // mueve la pelota a las coordenadas (pageX, pageY)
      // tomando la posición inicial en cuenta
      function moveAt(pageX: number, pageY: number) {
        imagenConoRojo.style.left = pageX - shiftX + 'px';
        imagenConoRojo.style.top = pageY - shiftY + 'px';
      }
    
      function onMouseMove(event: { pageX: any; pageY: any; }) {
        moveAt(event.pageX, event.pageY);
      }
    
      // mueve la pelota con mousemove
      document.addEventListener('mousemove', onMouseMove);
    
      // suelta la pelota, elimina el manejador innecesario
      imagenConoRojo.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        imagenConoRojo.onmouseup = null;
      };
    
    };
    
    imagenConoRojo.ondragstart = function() {
      return false;
    };
  }

  dropImgEscalera () {
    console.log('Escalera');

    var newDiv = document.createElement('div');
    var imagenEscalera = document.createElement('img');

    imagenEscalera.src = '../../../assets/img/escaleras.png';
    imagenEscalera.style.height = '20px';
    imagenEscalera.style.width = '80px';
    newDiv.id = 'elementoDrop';

    document.querySelector('.pizarra')?.appendChild(newDiv).appendChild(imagenEscalera);

    imagenEscalera.onmousedown = function(event) {

      let shiftX = event.clientX - imagenEscalera.getBoundingClientRect().left;
      let shiftY = event.clientY - imagenEscalera.getBoundingClientRect().top;
    
      imagenEscalera.style.position = 'absolute';
      imagenEscalera.style.zIndex = '1';
      document.querySelector('pizarra')?.append(imagenEscalera);
    
      moveAt(event.pageX, event.pageY);
    
      // mueve la pelota a las coordenadas (pageX, pageY)
      // tomando la posición inicial en cuenta
      function moveAt(pageX: number, pageY: number) {
        imagenEscalera.style.left = pageX - shiftX + 'px';
        imagenEscalera.style.top = pageY - shiftY + 'px';
      }
    
      function onMouseMove(event: { pageX: any; pageY: any; }) {
        moveAt(event.pageX, event.pageY);
      }
    
      // mueve la pelota con mousemove
      document.addEventListener('mousemove', onMouseMove);
    
      // suelta la pelota, elimina el manejador innecesario
      imagenEscalera.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        imagenEscalera.onmouseup = null;
      };
    
    };
    
    imagenEscalera.ondragstart = function() {
      return false;
    };
  }

  async crearImagen (tarea: Tarea) {
    var capturaImagen;
    var divSeleccionado = document.querySelector('.pizarra') as HTMLElement;
    
    await html2canvas(divSeleccionado).then(canvas => {
      capturaImagen =  canvas.toDataURL('image/png');
      var a = document.createElement('a');
      a.href = capturaImagen;
      a.download = 'Prueba.png';
     // a.click();
      tarea.imagen = capturaImagen;
      console.log(capturaImagen);
    })
    
  }

  eliminarElementos () {
    var elementos = document.getElementById('pizarra');
    
    while (elementos?.firstChild) {
      elementos.removeChild(elementos.firstChild);
      console.log('elemento eliminado');
    }
  }

  
}
