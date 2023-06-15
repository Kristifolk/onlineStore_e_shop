const API ='https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


const app = new Vue({
    el: '#app',
    data: {
        userSearch: '',
        showCart: false,
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        cartItems: [],
        products: [],
        filtered: [],
        imgCatalog: 'https://placehold.it/200x150',
        imgCart: 'https://placehold.it/50x100'
    },
    methods: {
        getJson(url){
            return fetch(url)
            .then(result => result.json())
            .catch(error =>{
                console.log(error);
            })
        },
       
        addProduct(item){
            
            this.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if(data.result === 1){
                    let find = this.cartItems.find(el => el.id_product === item.id_product);
                    if(find){
                        find.quantity++;
                    }else{
                        let prod = Object.assign({quantity: 1}, item); 
                    }
                } else{
                    alert('Error');
                }
            })
            
        },
        remove(item){
            this.getJson(`${API}/deleteFromBasket.json`)
                .then(data =>{
                    if(data.result === 1){
                        if(item.quantity > 1){
                            item.quantity--;
                        }else{
                        this.cartItems.splice(this.cartItems.indexOf(item),1);
                        }
                    }
                })
        },
        filter(userSearch){
            
            let regexp = new RegExp(userSearch, 'i');
            
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
            console.log(this.filtered)
        }
    },   
    mounted(){
        this.getJson(`${API + this.catalogUrl}`)
            .then(data =>{
                for(let el of data){
                    this.$data.products.push(el);
                    this.$data.filtered.push(el);
                }
            });
            this.getJson(`${API + this.cartUrl}`)
            .then(data =>{
                for(let el of data.contents){
                    this.$data.cartItems.push(el);
                }
            });
            
            this.getJson(`getProducts.json`)
                .then(data =>{
                    for(let el of data){
                    this.$data.products.push(el);
                    this.$data.filtered.push(el);
                    }
                })
    }
});


