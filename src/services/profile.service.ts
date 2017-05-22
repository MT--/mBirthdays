import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as PouchDB from 'pouchdb';

import { User } from '../models/user';


@Injectable()
export class ProfileService {
  private db: any;
  private changes$: Subject<any>;

  constructor(public platform: Platform) {
    this.changes$ = new Subject();
    this.getAll().subscribe();
  }

  /**
   * open or create PouchDB instance
   * @return {Promise<any>}
   */
  public initDB(): Promise<any> {
    return this.platform.ready()
      .then(() => {
        this.db = new PouchDB('user', { adapter: 'websql' });
        this.db.changes({ live: true, since: 'now', include_docs: true })
          .on('change', change => {
            this.changes$.next(change.doc);
          });
      });
  }

  /**
   * update doc in PouchDB
   * @param {User} user
   * @return {Promise<any>}
   */
  public updateUser(user: User): Promise<any> {
    if ( user._id ) {
      return this.db.put(user);
    } else {
      return this.db.post(user);
    } // end if
  }

  /**
   * load all User docs from PouchDB
   * @return {Observable<any>}
   */
  public getAll(): Observable<any> {
    return Observable.fromPromise(
      this.initDB().then(
        () => this.db.allDocs({ include_docs: true })
      ).then(docs => {
          return docs.rows.map(row => {
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
