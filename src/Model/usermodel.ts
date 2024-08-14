export interface City {
    name: string;
}
export interface User {
    // id:number;
    // fname:string;
    // lname:string;
    // date: Date;
    // gender:string;
    // mobile:number;
    // email:string;
    // password:string;
    // address:{
    //     city : string;
    //     post : string;
    //     ps : string;
    //     pinno : number;
    //     state : {
    //         name : string;
    //     } 
    // }
    id:number;
    fname: string;
    lname: string;
    date: Date;
    gender: string;
    mobile: number;
    email: string;
    password: string;
    address: {
      city: string;
      post: string;
      ps: string;
      pinno: number;
      state : {
                name : string;
            }
    }
}
