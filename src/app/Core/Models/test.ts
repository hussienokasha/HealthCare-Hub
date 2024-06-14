import { Lab } from "./lab";

export interface Test{
  id:number
  name:string;
  imageUrl:string;
  description:string;
  price:number;
  lab?:Lab;

}



