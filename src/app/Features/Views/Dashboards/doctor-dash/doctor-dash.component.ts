import { Component } from '@angular/core';

@Component({
  selector: 'app-doctor-dash',
  templateUrl: './doctor-dash.component.html',
  styleUrls: ['./doctor-dash.component.scss']
})
export class DoctorDashComponent {
  dataSource: any[] = [
    { position: 1, name: 'Hydrogen', age: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', age: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', age: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', age: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', age: 10.811, symbol: 'H' },
    { position: 6, name: 'Carbon', age: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', age: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', age: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', age: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', age: 20.1797, symbol: 'Ne' },];


  displayedColumns: string[] = ['position', 'name', 'age', 'date','condition'];
}
