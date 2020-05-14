export interface Product {
    title:string
    description:string
    pictures:string[]
    id:string
    price:number
    categorie:string
    state:string
    createdAt:Date
    availability:Availability
    city:string
    averageStar:number
}

export interface Availability {
    available:boolean
    type:string
    feed ?:number
}