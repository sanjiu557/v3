type  User =  {
  name:string,
  age:number,
  gender:string,
  address?:string,
  phone?:string,
  email?:string
}
declare interface  piniaState extends  User {
 count:number
}

interface RestaurantItem {
  value: string
  link: string
}
declare type Rest = Record<string,any>
declare type isRest = RestaurantItem extends Rest ? true : false


