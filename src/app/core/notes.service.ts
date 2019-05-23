import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

export interface INote {
  id: number,
  title: string,
  text: string
};


@Injectable({
  providedIn: 'root'
})
export class NotesService {
  notes$ = new BehaviorSubject<INote[]>([{
    id: 1,
    title: 'Groceries',
    text: 'dont forget to buy milk and eggs'
  }]);

  /**
   * Class constructor.
   */
  constructor () { }

  /**
   * Add a new note.
   */
  add (note: INote) {
    this.notes$.pipe(take(1)).subscribe((allNotes) => {
      this.notes$.next(allNotes.concat([note]));
    });
  }

  /**
   * Delete note by id.
   */
  delete (noteId: number) {
    this.notes$.pipe(take(1)).subscribe((allNotes) => {
      let index = allNotes.findIndex(n => n.id === noteId);
      if (index !== -1) allNotes.splice(index, 1);

      this.notes$.next(allNotes);
    });
  }
}
