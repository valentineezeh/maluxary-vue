export type ProductTypes = {
  id: number
  title: string
  image_url: string
  price: number
}

export type CartItem = {
  id: number
  title: string
  image_url: string
  price: number
  quantity: number
  unitPrice: number
}

export type Store = {
  products: ProductTypes[]
  cart: CartItem[]
}
