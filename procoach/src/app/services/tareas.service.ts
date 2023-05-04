import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Tarea } from '../interfaces/tarea.interface';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  constructor( private firestore: Firestore ) { }

  addTarea (tarea: Tarea, userId: string) {
    const tareaRef = collection(this.firestore, 'usuarios/'+userId+'/tareas');
    return addDoc(tareaRef, tarea);
  }

  getTareas (userId: string): Observable<Tarea[]> {
    const tareaRef = collection(this.firestore, 'usuarios/'+userId+'/tareas');
    return collectionData(tareaRef, { idField: 'id'}) as Observable<Tarea[]>;
  }

  deleteTarea (tarea: Tarea, userId: string) {
    const tareaDocRef = doc(this.firestore, 'usuarios/'+userId+'/tareas/' + tarea.id);
    return deleteDoc(tareaDocRef);
  }
}
