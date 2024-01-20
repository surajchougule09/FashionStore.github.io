let elementsel=document.querySelector(".elements")
let cartitemsel=document.querySelector(".cartitems");
let subtotalel=document.querySelector(".subtotal");
let itemsincartel=document.querySelector(".btn-white sup");
const products=[
    {
        id:9,
        name:'Cosmetics',
        desc:'Metalic Lipstick(crimson)',
        price:12.99,
        qty:0,
        stock:5
    },
    {
        id:26,
        name:'Shoes',
        desc:'Textile Platform Sneakers',
        price:59.99,
        qty:0,
        stock:10
    },
    {
        id:27,
        name:'Accessories',
        desc:'Polarized Sunglasses',
        price:17.99,
        qty:0,
        stock:8
    },
    {
        id:28,
        name:'Shoes',
        desc:'Leather Platform Sandals',
        price:79.99,
        qty:0,
        stock:15
    },
    {
        id:29,
        name:'Shorts',
        desc:'Shorts Chino Shorts',
        price:24.99,
        qty:0,
        stock:10
    },
    {
        id:30,
        name:'T-Shirts',
        desc:'T-shirts with Motif',
        price:13.99,
        qty:0,
        stock:7
    },
    {
        id:32,
        name:'Hats & Caps',
        desc:'Cap with Applique',
        price:15.99,
        qty:0,
        stock:5
    },
    {
        id:33,
        name:'T-shirts',
        desc:'Regular Fit Cotton Shirt',
        price:19.99,
        qty:0,
        stock:9
    },
    {
        id:34,
        name:'Accessories',
        desc:'Polarized Sunglasses',
        price:37.99,
        qty:0,
        stock:3
    },
    {
        id:35,
        name:'Shoes',
        desc:'Leather Mens Sneakers',
        price:45.99,
        qty:0,
        stock:10
    },
    {
        id:36,
        name:'Bags',
        desc:'Swedish Bagpack',
        price:68.95,
        qty:0,
        stock:6
    },
    {
        id:37,
        name:'Accessories',
        desc:'Stainless Steel Watches',
        price:542.80,
        qty:0,
        stock:18
    },
    {
        id:40,
        name:'Clothing',
        desc:'Girls Denim Jacket',
        price:24.99,
        qty:0,
        stock:4
    },
    {
        id:41,
        name:'Shoes',
        desc:'Textile Ballett Flats',
        price:16.50,
        qty:0,
        stock:9
    },
    {
        id:42,
        name:'T-shirts',
        desc:'Boys T-shirts with Motif',
        price:17.99,
        qty:0,
        stock:10
    },
    {
        id:43,
        name:'Accessories',
        desc:'Dotted Shoulder Bag',
        price:23.00,
        qty:0,
        stock:2
    }    
]
function displayproducts()
{
    products.forEach((product)=>{
        elementsel.innerHTML+=`
        <div class="col">
              <div class="card shadow">
                <div style="text-align: right;"><i class="fa-regular fa-heart bg-light"></i></div>
                <img src="${product.id}.jpg" class="card-img-top" alt="..." height="150" width="100">
                <div class="card-body">
                  
                  <p class="card-text text-muted" style="font-size: 14px;">${product.name}</p>
                  <h6 class="card-title" style="font-size: 14px;">${product.desc}</h6>
                  <p class="text-primary d-inline"style="font-size: 12px;">$${product.price}</p>
                  <span class="text-warning float-end" style="font-size: 14px;"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star-half-stroke"></i><i class="fa-regular fa-star"></i></span>
                    <button type="button" class="btn btn-danger" onclick="addtocart(${product.id})"><i class="fa-solid fa-cart-shopping"></i>Add to Cart</button>
                    
                </div>
                </div>
              </div>           
          `;
    });
}
displayproducts();

let cart=JSON.parse(localStorage.getItem("CART")) || [];
updatecart();
function addtocart(id)
{
    // check if product already exist
    if(cart.some((item)=>item.id===id))
    {
        changeqty("plus",id);
    }
    else
    {
        const item=products.find((product)=>product.id===id);
    cart.push({
        ...item,
        qty:1
    });
    
    }
   updatecart(); 
}
function updatecart()
{
    rendercartitems();
    rendersubtotal();
    localStorage.setItem("CART",JSON.stringify(cart));
}
function rendercartitems()
{
    cartitemsel.innerHTML="";
    cart.forEach((item)=>{
cartitemsel.innerHTML+=`
                  <table class="table w-100">
                  <tbody>
                    <tr><td><img src="${item.id}.jpg" height=30 width=30></td>
                    <td><p style="font-size:13px;">${item.name}</p></td>
                    <td>$${item.price}</td>
                    <td><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16" onclick="changeqty('minus',${item.id})">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                  </svg> ${item.qty} <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16" onclick="changeqty('plus',${item.id})">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                  </svg></td>
                    <td><i class="fa-solid fa-trash text-primary" onclick="removeitem(${item.id})"></i></td>
                  </tr></tbody></table>`

    })
}
function changeqty(action,id)
{
    cart=cart.map((item)=>{
        let qty=item.qty;
        if(item.id===id)
        {
            if(action==="minus" && qty>1)
            {
                qty--;
            }
            else if(action==="plus" && qty<item.stock)
            {
                qty++;
            }
        }
        return {
            ...item,
            qty,
        };
    })
    updatecart();
}
function rendersubtotal()
{
    let totalprice=0,totalitems=0;
    cart.forEach((item)=>{
        totalprice+=item.price*item.qty;
        totalitems+=item.qty;
    });
    subtotalel.innerHTML=`${totalitems}:$${totalprice.toFixed(2)}`
    itemsincartel.innerHTML= totalitems;            
}
function removeitem(id)
{
    cart=cart.filter((item)=>item.id!==id);
    updatecart();
}