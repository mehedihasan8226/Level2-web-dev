

type valueType = string | number | boolean

const formatValue  = function( value: valueType){

        if(typeof value === "string"){
            return value.toUpperCase()
        }
        else if(typeof value === "number"){
            return value*10;
        }
        else if(typeof value === 'boolean'){
            return !value
        }
}




type lengthValueType = string | unknown[]

function getLength(value: lengthValueType){

    if(typeof value === 'string'){
        return value.length;
    }
    else if(Array.isArray(value)){
        return value.length;
    }
}






class Person {
    name : string;
    age : number;

    constructor(name:string, age: number){
            this.name = name;
            this.age = age;
    }

    getDetails(){
        
        return `'Name: ${this.name}, Age: ${this.age}'`
    }
}

const person1 = new Person("M. X", 25)






type BookType = {          
  title: string;
  rating: number;
};


function filterByRating(arr: BookType[]){

      let filterRatingt = arr.filter(item => item.rating >= 4)

      return filterRatingt

}





type User = {
    id: number;
    name: String;
    email: string;
    isActive: boolean;
}

function filterActiveUsers(user: User[]){

    let filterUser = user.filter(user=> user.isActive=== true)

    return filterUser

}






interface Book {
    title: string
    author : string
    publishedYear : number
    isAvailable : boolean
}


function printBookDetails(myBook: Book){
        console.log(`Title: ${myBook.title}, Author: ${myBook.author}, Published: ${myBook.publishedYear}, Available: ${myBook.isAvailable? "Yes":"No"}`);
        
}






type arr<T> = T[]

function getUniqueValues<T>(array1: arr<T>, array2: arr<T>): arr<T>{

    return [...new Set([...array1, ...array2])]

}





type Product<T> = Array<T>

interface PriceInfo {
  price: number;
  quantity: number;
  discount?: number;
}


function calculateTotalPrice<T extends PriceInfo>(product: Product<T>): number{
  
      let products =  product.map((item)=>{
        
      let discount = item.discount ?? 0;
      return ((item.price * item.quantity)/100) *(100 - discount)
      }).reduce((acc, cur)=> acc + cur ,0)
    
      return products
      
}

