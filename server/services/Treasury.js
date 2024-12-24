class Treasury{
    constructor(){
        this.balance = 0;
    }
    getbalance() {
        return this.balance;
    }

    deposit(amount){
        this.balance += amount;
        return;
    }

    withdraw(amount) /* Return true on success, false on failure */{
        if (amount <= this.balance){
            this.balance -= amount;
            return true;
        } else {
            return false;
        }
    }
}