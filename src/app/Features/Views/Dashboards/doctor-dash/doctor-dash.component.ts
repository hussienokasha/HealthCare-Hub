import { Component } from '@angular/core';

@Component({
  selector: 'app-doctor-dash',
  templateUrl: './doctor-dash.component.html',
  styleUrls: ['./doctor-dash.component.scss']
})
export class DoctorDashComponent {
  dataSource: any[] = [
    { position: 1, name: 'Hydrogen' ,symbol: 'H' },
    { position: 2, name: 'Helium', symbol: 'He' },
    { position: 3, name: 'Lithium',  symbol: 'Li' },
    { position: 4, name: 'Beryllium',  symbol: 'Be' },
    { position: 5, name: 'Boron',  symbol: 'H' },
    { position: 6, name: 'Carbon',  symbol: 'C' },
    { position: 7, name: 'Nitrogen',  symbol: 'N' },
    { position: 8, name: 'Oxygen', symbol: 'O' },
    { position: 9, name: 'Fluorine',  symbol: 'F' },
    { position: 10, name: 'Neon',  symbol: 'Ne' },];


  displayedColumns: string[] = ['position', 'name','symbol'];
}
