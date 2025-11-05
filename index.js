class TaxCalculator{
    
    constructor(){
        this.rate = 15;
        this.state = 'TX';
        this.exempt = false;
    }
    
    calculate(){
        if(this.exempt){
            return calculateExempt(1.37);
        }else{
            return calculateNonExempt(5.72);
        }
    }
}
