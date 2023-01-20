export interface SignUp{
    name: string,
    email: string,
    password: string,
}


export interface Login{
    email: string,
    password: string,
}

export interface Product{
    name: string,
    price: string,
    category: string,
    color: string,
    description: string,
    image: string,
    quantity: undefined|number;
    id: number,
    productId:undefined|number
}

export interface SignUpUser{
    name: string,
    email: string,
    password: string,
}

export interface LoginUser{
    email: string,
    password: string,
}

export interface Cart{
    name: string,
    price: string,
    category: string,
    color: string,
    description: string,
    image: string,
    quantity: undefined|number;
    id: number| undefined,
    userId: number,
    productId: number
}

export interface priceSummary{
    price: number,
    discount: number,
    tax: number,
    delivery: number,
    total: number
}

export interface Order {
    name: string,
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    status: string;
    userId:string,
    id:number
  }