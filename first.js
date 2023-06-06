const products = document.querySelector(".products");
const statistic = document.querySelector(".statistic");
const addButton = document.querySelector(".addButton");

addButton.addEventListener("click", addProduct);


function addProduct(){
   let productName = document.getElementById("productName").value;

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
      minusButton.setAttribute("class", "minusButton disabled");
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

      let productStatistic = statistic.querySelector(".productStatistic");
      let item = document.createElement("section");
      let itemName = document.createElement("article");
      itemName.setAttribute("class", "itemName");
      let amountOfItem = document.createElement("section");
      item.setAttribute("class", "item");
      itemName.textContent = productName;
      amountOfItem.setAttribute("class", "amountOfItem");
      amountOfItem.textContent = "1";

      item.appendChild(itemName);
      item.appendChild(amountOfItem);

      productStatistic.appendChild(item);

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

const operationForm = document.querySelector(".operationForm");
   operationForm.addEventListener("click", function(event){
   let button = event.target;
   switch(button.className){
      case "minusButton":
         minusButtonClicked(button);
         break;
      case "plusButton":
         plusButtonClicked(button);
         break;
      case "button":
         buyButtonClicked(button);
         break;
      case "button bought":
         unpurchasedButtonClicked(button);
         break;
      case "cancelButton":
         cancelButtonClicked(button);
         break;
      case "label":
         labelClicked(button);
         break;
   }
});

function minusButtonClicked(button){
   let blockOfButtons = button.parentNode;
   let blockOfAmount = blockOfButtons.querySelector(".blockOfAmount");
   let amount = blockOfAmount.textContent;
   if(amount > 1){
      blockOfAmount.textContent = --amount;
      if(amount - 1 == 1)
         button.setAttribute("class" , "minusButton disabled");
   }
   let name = blockOfButtons.parentNode.querySelector(".label").textContent;
   
   let productStatistic = statistic.querySelector(".productStatistic");
   let items = productStatistic.querySelectorAll(".item");
   
   for(let i = 0; i < items.length; i++){
      let itemName = items[i].querySelector(".itemName").textContent;
      if(itemName == name){
         let amountOfItem = items[i].querySelector(".amountOfItem");
         amountOfItem.textContent = amount;
         break;
      }
   }
}

function plusButtonClicked(button){
   let blockOfButtons = button.parentNode;
   let blockOfAmount = blockOfButtons.querySelector(".blockOfAmount");
   let amount = blockOfAmount.textContent;
   blockOfAmount.textContent = ++amount;
   if(amount > 1){
      let minusButton = blockOfButtons.querySelector(".minusButton");
      minusButton.setAttribute("class", "minusButton");
   }
   let name = blockOfButtons.parentNode.querySelector(".label").textContent;
   
   let productStatistic = statistic.querySelector(".productStatistic");
   let items = productStatistic.querySelectorAll(".item");
   
   for(let i = 0; i < items.length; i++){
      let itemName = items[i].querySelector(".itemName").textContent;
      if(itemName == name){
         let amountOfItem = items[i].querySelector(".amountOfItem");
         amountOfItem.textContent = amount;
         break;
      }
   }
}



function labelClicked(button){
   let nameOfProduct = button.parentNode;
   let currentName = button.textContent;
   nameOfProduct.removeChild(button);

   let input = document.createElement("input");
   input.setAttribute("type", "text");
   input.setAttribute("name", "productName");
   input.setAttribute("class", "productInput new");
   input.addEventListener("blur", function(){
      if(input.value != ""){
         if(checkName(input.value)){
            let name = document.createElement("p");
            name.setAttribute("class", "label");
            name.textContent = input.value;
            nameOfProduct.appendChild(name);
            nameOfProduct.removeChild(input);
   
            let productStatistic = statistic.querySelector(".productStatistic");
            let items = productStatistic.querySelectorAll(".item");
   
            for(let i = 0; i < items.length; i++){
               let itemName = items[i].querySelector(".itemName");
               if(currentName == itemName.textContent){
                  let item = itemName.parentNode;
                  item.removeChild(itemName);
                  let newItemName = document.createElement("article");
                  newItemName.setAttribute("class", "itemName");
                  newItemName.textContent = input.value;
                  item.prepend(newItemName);
                  break;
               }
            }
         }else{
            alert("Даний товар вже існує");
            let name = document.createElement("p");
            name.setAttribute("class", "label");
            name.textContent = currentName;
            nameOfProduct.appendChild(name);
            nameOfProduct.removeChild(input);
         }
      }else{
         let name = document.createElement("p");
         name.setAttribute("class", "label");
         name.textContent = currentName;
         nameOfProduct.appendChild(name);
         nameOfProduct.removeChild(input);
      }
   })
   nameOfProduct.appendChild(input);

}

function buyButtonClicked(button){
   let product = button.parentNode.parentNode;
   let name = product.querySelector(".label").textContent;
   let amount = product.querySelector(".blockOfAmount").textContent;
   product.removeChild(product.querySelector(".nameOfProduct"));
   product.removeChild(product.querySelector(".buttonBlockOne"));
   product.removeChild(product.querySelector(".buttonBlockTwo"));
   
   let nameOfProduct = document.createElement("section");
   nameOfProduct.setAttribute("class", "nameOfProduct");
   let label = document.createElement("p");
   label.setAttribute("class", "label crossedOut");
   label.textContent = name;
   nameOfProduct.appendChild(label);
   product.appendChild(nameOfProduct);
   
   let buttonGroupOne = document.createElement("section");
   buttonGroupOne.setAttribute("class", "buttonBlockOne");
   let blockOfAmount = document.createElement("section");
   blockOfAmount.setAttribute("class", "blockOfAmount");
   blockOfAmount.textContent = amount;
   buttonGroupOne.appendChild(blockOfAmount);
   product.appendChild(buttonGroupOne);
   
   let buttonBlockTwo = document.createElement("section");
   buttonBlockTwo.setAttribute("class", "buttonBlockTwo");
   let buyButton = document.createElement("button");
   buyButton.setAttribute("class", "button bought");
   buyButton.textContent = " Не Куплено";
   buttonBlockTwo.appendChild(buyButton);
   product.appendChild(buttonBlockTwo);

   let productStatistic = statistic.querySelector(".productStatistic");
   let items = productStatistic.querySelectorAll(".item");
   
   for(let i = 0; i < items.length; i++){
      let itemName = items[i].querySelector(".itemName");
      if(name == itemName.textContent){
         productStatistic.removeChild(items[i]);

         let productStatisticBought = statistic.querySelector(".productStatistic.bought");
         let boughtItem = document.createElement("section");
         let itemName = document.createElement("article");
         itemName.setAttribute("class", "itemName");
         let amountOfItem = document.createElement("section");
         boughtItem.setAttribute("class", "item bought");
         itemName.textContent = name;
         amountOfItem.setAttribute("class", "amountOfItem");
         amountOfItem.textContent = amount;

         boughtItem.appendChild(itemName);
         boughtItem.appendChild(amountOfItem);

         productStatisticBought.appendChild(boughtItem);
         break;
      }
   }
}

function unpurchasedButtonClicked(button){
   let product = button.parentNode.parentNode;
   let name = product.querySelector(".label").textContent;
   let amount = product.querySelector(".blockOfAmount").textContent;
   product.removeChild(product.querySelector(".nameOfProduct"));
   product.removeChild(product.querySelector(".buttonBlockOne"));
   product.removeChild(product.querySelector(".buttonBlockTwo"));
   
   let nameOfProduct = document.createElement("section");
   nameOfProduct.setAttribute("class", "nameOfProduct");
   let label = document.createElement("p");
   label.setAttribute("class", "label");
   label.textContent = name;
   nameOfProduct.appendChild(label);
   product.appendChild(nameOfProduct);
   
   let buttonGroupOne = document.createElement("section");
   buttonGroupOne.setAttribute("class", "buttonBlockOne");
   let minusButton = document.createElement("button");
   if(amount > 1)
      minusButton.setAttribute("class", "minusButton");
   else
      minusButton.setAttribute("class", "minusButton disabled");
   minusButton.textContent = "–";
   let blockOfAmount = document.createElement("section");
   blockOfAmount.setAttribute("class", "blockOfAmount");
   blockOfAmount.textContent = amount;
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

   let productStatisticBought = statistic.querySelector(".productStatistic.bought");
   let items = productStatisticBought.querySelectorAll(".item");
   
   for(let i = 0; i < items.length; i++){
      let itemName = items[i].querySelector(".itemName");
      if(name == itemName.textContent){
         productStatisticBought.removeChild(items[i]);

         let productStatistic = statistic.querySelector(".productStatistic");
         let item = document.createElement("section");
         let itemName = document.createElement("article");
         itemName.setAttribute("class", "itemName");
         let amountOfItem = document.createElement("section");
         item.setAttribute("class", "item");
         itemName.textContent = name;
         amountOfItem.setAttribute("class", "amountOfItem");
         amountOfItem.textContent = amount;

         item.appendChild(itemName);
         item.appendChild(amountOfItem);

         productStatistic.appendChild(item);
         break;
      }
   }
}

function cancelButtonClicked(button){
   let product = button.parentNode.parentNode;
   let name = product.querySelector(".label").textContent;
   console.log(name);
   products.removeChild(product);



   let productStatisticBought = statistic.querySelector(".productStatistic.bought");
   let items = productStatisticBought.querySelectorAll(".item");
   
   for(let i = 0; i < items.length; i++){
      let itemName = items[i].querySelector(".itemName");
      if(name == itemName.textContent){
         productStatisticBought.removeChild(items[i]);
         break;
      }
   }

   let productStatistic = statistic.querySelector(".productStatistic");
   items = productStatistic.querySelectorAll(".item");
   
   for(let i = 0; i < items.length; i++){
      let itemName = items[i].querySelector(".itemName");
      if(name == itemName.textContent){
         productStatistic.removeChild(items[i]);
         break;
      }
   }
}
