import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compmas',
  templateUrl: './compmas.component.html',
  styleUrls: ['./compmas.component.scss'],
})
export class CompmasComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}
  
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  isModalOpen1 = false;

  setOpen1(isOpen1: boolean) {
    this.isModalOpen1 = isOpen1;
  }

  isModalOpen2 = false;

  setOpen2(isOpen2: boolean) {
    this.isModalOpen2 = isOpen2;
  }
  isModalOpen3 = false;

  setOpen3(isOpen3: boolean) {
    this.isModalOpen3 = isOpen3;
  }
  isModalOpen4 = false;

  setOpen4(isOpen4: boolean) {
    this.isModalOpen4 = isOpen4;
  }
}
