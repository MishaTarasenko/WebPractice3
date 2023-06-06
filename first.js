const products = document.querySelector(".products");
const addButton = document.querySelector(".addButton");

addButton.addEventListener("click", addProduct);


function addProduct(){
   let productName = document.getElementById("productName").value;
   console.log("new name = " + productName);

   if(checkName(productName) == true){
      let product = document.createElement("section");
      product.setAttribute("class", "product");
   
      let nameOfProduct = document.createElement("section");
      nameOfProduct.setAttribute("class", "nameOfProduct");
      let name = document.createElement("p");
      name.setAttribute("class", "label");
      name.textContent = productName;
      nameOfProduct.appendChild(name);
      product.appendChild(nameOfProduct);
   
      let buttonGroupOne = document.createElement("section");
      buttonGroupOne.setAttribute("class", "buttonBlockOne");
      let minusButton = document.createElement("button");
      minusButton.setAttribute("class", "minusButton");
      minusButton.textContent = "–";
      let blockOfAmount = document.createElement("section");
      blockOfAmount.setAttribute("class", "blockOfAmount");
      blockOfAmount.textContent = "1";
      let plusButton = document.createElement("button");
      plusButton.setAttribute("class", "plusButton");
      plusButton.textContent = "+";
      buttonGroupOne.appendChild(minusButton);
      buttonGroupOne.appendChild(blockOfAmount);
      buttonGroupOne.appendChild(plusButton);
      product.appendChild(buttonGroupOne);
   
      let buttonBlockTwo = document.createElement("section");
      buttonBlockTwo.setAttribute("class", "buttonBlockTwo");
      let buyButton = document.createElement("button");
      buyButton.setAttribute("class", "button");
      buyButton.textContent = "Куплено";
      let cancelButton = document.createElement("button");
      cancelButton.setAttribute("class", "cancelButton");
      cancelButton.textContent = "\u2716";
      buttonBlockTwo.appendChild(buyButton);
      buttonBlockTwo.appendChild(cancelButton);
      product.appendChild(buttonBlockTwo);
   
      products.appendChild(product);
   }else{
      alert("Даний товар вже існує");
   }

   let productInput = document.getElementById("productName");
   productInput.value = "";
}

function checkName(productName){
   const allProducts = document.querySelectorAll(".label");
   for(let i = 0; i < allProducts.length; i++){
      if(productName.toLowerCase() == allProducts[i].textContent.toLowerCase())
         return false;
   }
   return true;
}








