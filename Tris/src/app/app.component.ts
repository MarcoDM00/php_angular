import { Component } from '@angular/core';
import { ServerService } from './server.service';
import { Record } from './record';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  caselle:{src:number, nascondi:boolean}[] = [];
  turno:number = 1;
  mosse:number = 0;
  win:boolean = false;
  records:Record[] = [];
  success:string = "";
  error:string = "";

  constructor(public server: ServerService) {
    for (let i = 0; i < 9; i++) {
      this.caselle.push({src:0, nascondi:true});
    }
    this.turno = Math.floor(Math.random() * 2) + 1;
    this.getRecords();
  }

  click(id:number) {
    if (this.win) return;
    if (this.caselle[id].src != 0) return;
    this.caselle[id].src = this.turno;
    this.caselle[id].nascondi = false;
    this.mosse++;
    this.controllo();
    if (!this.win) this.turno = this.turno == 1 ? 2 : 1;
  }

  controllo() {
    for (let i = 0; i < 7; i+=3) {
      if (this.caselle[i].src == 0) continue;
       if (this.caselle[i].src == this.caselle[i+1].src && this.caselle[i].src == this.caselle[i+2].src) this.vinto();
    }
    for (let i = 0; i < 3; i++) {
      if (this.caselle[i].src == 0) continue;
      if (this.caselle[i].src == this.caselle[i+3].src && this.caselle[i].src == this.caselle[i+6].src) this.vinto();
    }
    if (this.caselle[0].src != 0) {
      if (this.caselle[0].src == this.caselle[4].src && this.caselle[0].src == this.caselle[8].src) this.vinto();
    }
    if (this.caselle[2].src != 0) {
      if (this.caselle[2].src == this.caselle[4].src && this.caselle[2].src == this.caselle[6].src) this.vinto();
    }
  }

  vinto() {
    this.win = true;
    window.scrollTo(0, 0);
    this.addRecord();
  }

  getRecords() {
    this.server.getAll().subscribe(
      (data: Record[]) => {
        this.records = data;
        this.success = 'successful retrieval of the list';
      },
      (err) => {
        this.error = err.error;
      }
    );
  }

  addRecord() {
    this.resetEsiti();

    this.server.store(this.mosse, this.turno).subscribe(
      (res: Record) => {
        this.records.push(res);

        this.success = 'Created successfully';
      },
      (err) => (this.error = err.message)
    );
  }

  deleteRecord(id: number) {
    if (id == -1) alert("Valore nullo");
    this.resetEsiti();
    this.server.delete(id).subscribe(
      (res) => {
        this.records = this.records.filter(function (item) {
          return item['id'] && +item['id'] !== +id; //controlla se questo item è diverso da quello eliminato. Se è diverso, allora lo tiene nella lista sennò non lo salva
        });

        this.success = 'Deleted successfully';
      },
      (err) => this.error = err
    );
  }

  resetEsiti() {
    this.success = "";
    this.error = "";
  }

  reset() {
    this.resetEsiti();
    this.win = false;
    for (let i = 0; i < 9; i++) {
      this.caselle[i].src = 0;
      this.caselle[i].nascondi = true;
    }
    this.turno = Math.floor(Math.random() * 2) + 1;
    this.mosse = 0;
  }
}