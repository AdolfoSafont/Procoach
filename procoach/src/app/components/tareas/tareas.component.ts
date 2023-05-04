import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Tarea } from 'src/app/interfaces/tarea.interface';
import { TareasService } from 'src/app/services/tareas.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss']
})
export class TareasComponent implements OnInit {

  dataUser: any;
  tareas: Tarea[];

  constructor(
    private tareasServices: TareasService,
    private afAuth: AngularFireAuth,
  ) { 
    this.tareas = [];
  }

  ngOnInit(): void {
    this.afAuth.currentUser.then(user => {
      if(user){
        this.dataUser = user;       
        var userId = this.dataUser.uid;

        this.tareasServices.getTareas(userId).subscribe(tareas => {
          
          this.tareas = tareas;
          console.log(this.tareas);
        });
      }    
    });
  }

  async onClickDelete (tarea: Tarea) {
    await this.tareasServices.deleteTarea(tarea, this.dataUser.uid);
  }

  descargarImagen (tarea: Tarea) {
    var downloadInstance = document.createElement('a');
    downloadInstance.href = tarea.imagen;
    downloadInstance.download = tarea.nombre + '.png';
    downloadInstance.click();
  }

  descargarPDF (tarea: Tarea) {
    
    const doc = new jsPDF();

    const bufferX = 15;
    const bufferY = 15;
    const imgProps = (doc as any).getImageProperties(tarea.imagen);
    const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    doc.setFontSize(22);
    doc.setFont("arial");
    
    doc.text('Nombre: ' + tarea.nombre, 15, 150);
    doc.text('Categoría: '+ tarea.categoria, 15, 170);
    doc.text('Duración: ' + tarea.duracion.toString(), 15, 190);
    var split = doc.splitTextToSize('Descripción: ' + tarea.descripcion, 180);
    doc.text(split, 15, 210);
    doc.addImage(tarea.imagen, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
     
    
    doc.save(tarea.nombre + '.pdf');
  }
}
