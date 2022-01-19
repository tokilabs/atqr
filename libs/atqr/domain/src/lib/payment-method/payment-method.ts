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

export class PaymentMethodEntity implements CardData{
    id: Guid
    method: PaymentMethodEnum

    type: 'credit' | 'debit'
    number: string 
    holder_name: string 
    exp_month: number
    exp_year: number 
    cvv: string
    country: string
    cpf: string
    zipCode: string
 
    constructor (id: Guid, number: string, holder_name: string, exp_month: number, exp_year: number, cvv: string, cpf: string)
    {
        this.id = id 
        this.number = number 
        this.holder_name = holder_name
        this.exp_month = exp_month
        this.exp_year = exp_year
        this.cvv = cvv
        this.cpf = cpf
    }

    getCreditCard() {
        return this.id 
    }
}