import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import * as PouchDB from 'pouchdb';

import { Birthday } from '../models/birthday';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class BirthdayService {
  private db: any;
  private changes$: Subject<any>;

  constructor(public platform: Platform) {
    this.changes$ = new Subject();
  }

  /**
   * open or create PouchDB instance
   * @return {Promise<any>}
   */
  public initDB(): Promise<any> {
    return this.platform.ready()
      .then(() => {
        this.db = new PouchDB('birthday', { adapter: 'websql' });
        this.db.changes({ live: true, since: 'now', include_docs: true })
          .on('change', change => {
            change.doc.date = new Date(change.doc.date);
            this.changes$.next(change.doc);
          });
      });
  }

  /**
   * save to PouchDB instance
   * @param {Birthday} birthday
   * @return {Promise<any>}
   */
  public add(birthday: Birthday): Promise<any> {
    return this.db.post(birthday);
  }

  /**
   * update doc in PouchDB
   * @param {Birthday} birthday
   * @return {Promise<any>}
   */
  public update(birthday: Birthday): Promise<any> {
    return this.db.put(birthday);
  }

  /**
   * delete doc in PouchDB
   * @param {Birthday} birthday
   * @return {Promise<any>}
   */
  public delete(birthday: Birthday): Promise<any> {
    return this.db.remove(birthday);
  }

  /**
   * load all birthday docs from PouchDB
   * @return {Observable<any>}
   */
  public getAll(): Observable<any> {
    return Observable.fromPromise(
      this.initDB().then(
        () => this.db.allDocs({ include_docs: true })
      ).then(docs => {
          return docs[ 'rows' ].map(row => {
            row.doc.date = new Date(row.doc.date);
            return row.doc;
          });
        }
      )
    );
  }

  /**
   * listen for changes to PouchDB docs
   * @return {Subject<any>}
   */
  public getChanges(): Subject<any> {
    return this.changes$;
  }

}
