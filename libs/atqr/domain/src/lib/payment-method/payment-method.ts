import { Controller, Get, Post } from "@nestjs/common"
import { Guid } from "guid-typescript"

export interface CardData {
    type: 'credit' | 'debit' 
    number: string 
    holder_name: string 
    exp_month: number
    exp_year: number 
    cvv: string
    country: string
    cpf: string
    zipCode: string
}

export enum PaymentMethodEnum {
    
    

    'creditCard'='creditCard', 
    'debitCard'='debitCard'    

}

const cardType = PaymentMethodEnum

export class PaymentMethodEntity implements CardData{
    id: Guid
    method: PaymentMethodEnum
    paymentService: `pagar.me` | `pagseguro`

    type: 'credit' | 'debit'
    number: string 
    holder_name: string 
    exp_month: number
    exp_year: number 
    cvv: string
    country: string
    cpf: string
    zipCode: string
    token: string
    
 
    constructor (id: Guid, method: PaymentMethodEnum, paymentService: `pagar.me` | `pagseguro`, token: string)
    {
        this.id = id 
        this.method = method
        this.paymentService = paymentService
        this.token = token
    }

    
    @Get()
    getCreditCard() {
        return this.id 
    }
    
    @Post()
    setNewCreditCard(newCardData: CardData) {
        newCardData = new PaymentMethodEntity (this.id, this.method, this.paymentService, this.token)
   }


    
}