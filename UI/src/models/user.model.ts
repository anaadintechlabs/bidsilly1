
export interface User {
    userId:number,
    email: string;
    token: string;
    username: string;
    userType:string;
    bio: string;
    imageUrl: string;
    enableMobileNumber:boolean;
    id:number;
    blocked:boolean;
    provider:any;

  }