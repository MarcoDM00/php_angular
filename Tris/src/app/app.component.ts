import { Component } from '@angular/core';
import { ServerService } from './server.service';
import { Record } from './record';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  caselle:{src:number, nascondi:boolean, bck:string}[] = [];
  turno:number = 1;
  mosse:number = 0;
  win:boolean = false;
  records:Record[] = [];
  success:string = "";
  error:string = "";

  constructor(private server: ServerService) {
    for (let i = 0; i < 9; i++) {
      this.caselle.push({src:1, nascondi:true, bck:""});
    }
    this.turno = Math.floor(Math.random() * 2) + 1;
    this.server.getAll().subscribe(
      (data: any) => {
        this.records = data;
        this.success = 'successful retrieval of the list';
      },
      (err) => {
        this.error = err.error;
      }
    );
  }

  click(id:number) {
    if (this.win) return;
    if (this.caselle[id].src != 0) return;
    this.caselle[id].src = this.turno;
    this.caselle[id].nascondi = false;
    this.turno = this.turno == 1 ? 2 : 1;
    this.mosse++;
    this.controllo();
  }

  controllo() {
    for (let i = 0; i < 7; i+=3) {
      if (this.caselle[i].src == 0) continue;
       if (this.caselle[i].src == this.caselle[i+1].src && this.caselle[i].src == this.caselle[i+2].src) this.vinto([i, i+1, i+2]);
    }
    for (let i = 0; i < 3; i++) {
      if (this.caselle[i].src == 0) continue;
      if (this.caselle[i].src == this.caselle[i+3].src && this.caselle[i].src == this.caselle[i+6].src) this.vinto([i, i+3, i+6]);
    }
    if (this.caselle[0].src != 0) {
      if (this.caselle[0].src == this.caselle[4].src && this.caselle[0].src == this.caselle[8].src) this.vinto([0, 4, 8]);
    }
    if (this.caselle[2].src != 0) {
      if (this.caselle[2].src == this.caselle[4].src && this.caselle[2].src == this.caselle[6].src) this.vinto([2, 4, 6]);
    }
  }

  vinto(ids:number[]) {
    for (let i = 0; i < 3; i++) this.caselle[ids[i]].bck = "coral";
    this.win = true;
    
  }

  resetEsiti() {
    this.success = "";
    this.error = "";
  }
}