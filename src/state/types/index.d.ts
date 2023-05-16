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
type Rest = Record<string,any>
type res = RestaurantItem extends Rest ? true : false


