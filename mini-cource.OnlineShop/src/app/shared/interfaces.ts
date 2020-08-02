export interface User {
  email:              string
  password:           string
  returnSecureToken?: boolean
}

export interface firebaseAuth {
  idToken:   string
  expiresIn: string
}

export interface firebaseResponse {
  name: string
}

export interface Product {
  id?:   string
  type:  string
  title: string
  photo: string
  info:  string
  price: string
  date?: Date
}

export interface userOrder {
  id?:     string
  name:    string
  phone:   string
  address: string
  payment: string
  price:   number | string
  orders:  any
  date:    Date
}
