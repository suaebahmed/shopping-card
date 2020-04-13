module.exports = function Cart(initItems){
    this.items = initItems
    this.totalQty = 0;
    this.totalPrice = 0;

    if(Object.keys(initItems).length !== 0){
        let q = 0;
        let p = 0
        for(let obj in initItems){

            q += initItems[obj].Qty
            p += initItems[obj].price
        }
        this.totalPrice = p;
        this.totalQty = q
    }

    this.addCart = function(item,id){
        var store = this.items[id]
        if(!store){
            store = this.items[id] = {Qty: 0,price: 0,item: item}
        }
        // store can change the (this.items[id] qty and price) value
        store.Qty ++;
        store.price += store.item.price;

        this.totalQty++;
        this.totalPrice += store.item.price;
    }
    this.genarateArr=function(){
        var arr = [];
        for(let id in this.items){
            arr.push(this.items[id])
        }
        return arr;
    }
}
