export class Beneficiary {

  dept: number;

  constructor(public code: string
            , public name: string
            , public relation: string
            , public mobile?: string
            , public email?: string) { }

}
