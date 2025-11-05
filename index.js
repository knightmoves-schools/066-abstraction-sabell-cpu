class TaxCalculator{
    #rate;
    constructor(){
        this.#rate = 15;
        this.state = 'TX';
        this.exempt = false;
    }

    #calculateExempt(amount){
        return amount;
    }

    #calculateNonExempt(amount){
        return amount + (amount * this.#rate / 100);
    }

    calculate(){
        if(this.exempt){
            return this.#calculateExempt(1.37);
        }else{
            return this.#calculateNonExempt(5.72);
        }
    }
}
