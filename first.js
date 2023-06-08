const products = document.querySelector(".products");
const statistic = document.querySelector(".statistic");
const addButton = document.querySelector(".addButton");

addButton.addEventListener("click", addProduct);
const input = document.querySelector(".productInput");
input.addEventListener("keydown", (event) => {
   if(event.key == "Enter"){
      addProduct();
   }
})


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

      let tooltipSectionMinus = document.createElement("section");
      tooltipSectionMinus.setAttribute("class", "tooltipSection");
      let labelTooltipMinus = document.createElement("label");
      labelTooltipMinus.setAttribute("data-tooltip", "tooltip");
      labelTooltipMinus.setAttribute("for", "tooltip");
      labelTooltipMinus.textContent = "Зменшити кількість";
      tooltipSectionMinus.appendChild(labelTooltipMinus);
      minusButton.appendChild(tooltipSectionMinus);

      let blockOfAmount = document.createElement("section");
      blockOfAmount.setAttribute("class", "blockOfAmount");
      blockOfAmount.textContent = "1";
      let plusButton = document.createElement("button");
      plusButton.setAttribute("class", "plusButton");
      plusButton.textContent = "+";

      let tooltipSectionPlus = document.createElement("section");
      tooltipSectionPlus.setAttribute("class", "tooltipSection");
      let labelTooltipPlus = document.createElement("label");
      labelTooltipPlus.setAttribute("data-tooltip", "tooltip");
      labelTooltipPlus.setAttribute("for", "tooltip");
      labelTooltipPlus.textContent = "Збільшити кількість";
      tooltipSectionPlus.appendChild(labelTooltipPlus);
      plusButton.appendChild(tooltipSectionPlus);

      buttonGroupOne.appendChild(minusButton);
      buttonGroupOne.appendChild(blockOfAmount);
      buttonGroupOne.appendChild(plusButton);
      product.appendChild(buttonGroupOne);
   
      let buttonBlockTwo = document.createElement("section");
      buttonBlockTwo.setAttribute("class", "buttonBlockTwo");
      let buyButton = document.createElement("button");
      buyButton.setAttribute("class", "button");
      buyButton.textContent = "Куплено";

      let tooltipSectionBuy = document.createElement("section");
      tooltipSectionBuy.setAttribute("class", "tooltipSection buy");
      let labelTooltipBuy = document.createElement("label");
      labelTooltipBuy.setAttribute("data-tooltip", "tooltip");
      labelTooltipBuy.setAttribute("for", "tooltip");
      labelTooltipBuy.textContent = "Купити";
      tooltipSectionBuy.appendChild(labelTooltipBuy);
      buyButton.appendChild(tooltipSectionBuy);

      let cancelButton = document.createElement("button");
      cancelButton.setAttribute("class", "cancelButton");
      cancelButton.textContent = "\u2716";

      let tooltipSectionCancel = document.createElement("section");
      tooltipSectionCancel.setAttribute("class", "tooltipSection cancel");
      let labelTooltipCancel = document.createElement("label");
      labelTooltipCancel.setAttribute("data-tooltip", "tooltip");
      labelTooltipCancel.setAttribute("for", "tooltip");
      labelTooltipCancel.textContent = "Відмінити";
      tooltipSectionCancel.appendChild(labelTooltipCancel);
      cancelButton.appendChild(tooltipSectionCancel);


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
   productInput.focus();
   saveData();
}

function checkName(productName){
   const allProducts = document.querySelectorAll(".label");
   for(let i = 0; i < allProducts.length; i++){
      if(productName.toLowerCase() === allProducts[i].textContent.toLowerCase())
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
         saveData();
         break;
      case "plusButton":
         plusButtonClicked(button);
         saveData();
         break;
      case "button":
         buyButtonClicked(button);
         saveData();
         break;
      case "button bought":
         unpurchasedButtonClicked(button);
         saveData();
         break;
      case "cancelButton":
         cancelButtonClicked(button);
         saveData();
         break;
      case "label":
         labelClicked(button);
         saveData();
         break;
   }
});

function minusButtonClicked(button){
   let blockOfButtons = button.parentNode;
   let blockOfAmount = blockOfButtons.querySelector(".blockOfAmount");
   let amount = parseInt(blockOfAmount.textContent, 10);
   if(amount > 1){
      amount = amount - 1;
      blockOfAmount.textContent = amount;
      if(amount === 1)
         button.setAttribute("class" , "minusButton disabled");
   }
   let name = blockOfButtons.parentNode.querySelector(".label").textContent;
   
   let productStatistic = statistic.querySelector(".productStatistic");
   let items = productStatistic.querySelectorAll(".item");
   
   for(let i = 0; i < items.length; i++){
      let itemName = items[i].querySelector(".itemName").textContent;
      if(itemName === name){
         let amountOfItem = items[i].querySelector(".amountOfItem");
         amountOfItem.textContent = amount;
         break;
      }
   }
}

function plusButtonClicked(button){
   let blockOfButtons = button.parentNode;
   let blockOfAmount = blockOfButtons.querySelector(".blockOfAmount");
   let amount = parseInt(blockOfAmount.textContent, 10);
   amount = amount + 1;
   blockOfAmount.textContent = amount;
   if(amount > 1){
      let minusButton = blockOfButtons.querySelector(".minusButton");
      minusButton.setAttribute("class", "minusButton");
   }
   let name = blockOfButtons.parentNode.querySelector(".label").textContent;
   
   let productStatistic = statistic.querySelector(".productStatistic");
   let items = productStatistic.querySelectorAll(".item");
   
   for(let i = 0; i < items.length; i++){
      let itemName = items[i].querySelector(".itemName").textContent;
      if(itemName === name){
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
               if(currentName === itemName.textContent){
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
   input.focus();
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

   let tooltipSectionBought = document.createElement("section");
   tooltipSectionBought.setAttribute("class", "tooltipSection bought");
   let labelTooltipBought = document.createElement("label");
   labelTooltipBought.setAttribute("data-tooltip", "tooltip");
   labelTooltipBought.setAttribute("for", "tooltip");
   labelTooltipBought.textContent = "Не куплено";
   tooltipSectionBought.appendChild(labelTooltipBought);
   buyButton.appendChild(tooltipSectionBought);

   buttonBlockTwo.appendChild(buyButton);
   product.appendChild(buttonBlockTwo);

   let productStatistic = statistic.querySelector(".productStatistic");
   let items = productStatistic.querySelectorAll(".item");
   
   for(let i = 0; i < items.length; i++){
      let itemName = items[i].querySelector(".itemName");
      if(name === itemName.textContent){
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

   let tooltipSectionMinus = document.createElement("section");
   tooltipSectionMinus.setAttribute("class", "tooltipSection");
   let labelTooltipMinus = document.createElement("label");
   labelTooltipMinus.setAttribute("data-tooltip", "tooltip");
   labelTooltipMinus.setAttribute("for", "tooltip");
   labelTooltipMinus.textContent = "Зменшити кількість";
   tooltipSectionMinus.appendChild(labelTooltipMinus);
   minusButton.appendChild(tooltipSectionMinus);

   let blockOfAmount = document.createElement("section");
   blockOfAmount.setAttribute("class", "blockOfAmount");
   blockOfAmount.textContent = amount;
   let plusButton = document.createElement("button");
   plusButton.setAttribute("class", "plusButton");
   plusButton.textContent = "+";

   let tooltipSectionPlus = document.createElement("section");
   tooltipSectionPlus.setAttribute("class", "tooltipSection");
   let labelTooltipPlus = document.createElement("label");
   labelTooltipPlus.setAttribute("data-tooltip", "tooltip");
   labelTooltipPlus.setAttribute("for", "tooltip");
   labelTooltipPlus.textContent = "Збільшити кількість";
   tooltipSectionPlus.appendChild(labelTooltipPlus);
   plusButton.appendChild(tooltipSectionPlus);

   buttonGroupOne.appendChild(minusButton);
   buttonGroupOne.appendChild(blockOfAmount);
   buttonGroupOne.appendChild(plusButton);
   product.appendChild(buttonGroupOne);
   
   let buttonBlockTwo = document.createElement("section");
   buttonBlockTwo.setAttribute("class", "buttonBlockTwo");
   let buyButton = document.createElement("button");
   buyButton.setAttribute("class", "button");
   buyButton.textContent = "Куплено";

   let tooltipSectionBuy = document.createElement("section");
      tooltipSectionBuy.setAttribute("class", "tooltipSection buy");
      let labelTooltipBuy = document.createElement("label");
      labelTooltipBuy.setAttribute("data-tooltip", "tooltip");
      labelTooltipBuy.setAttribute("for", "tooltip");
      labelTooltipBuy.textContent = "Купити";
      tooltipSectionBuy.appendChild(labelTooltipBuy);
      buyButton.appendChild(tooltipSectionBuy);

   let cancelButton = document.createElement("button");
   cancelButton.setAttribute("class", "cancelButton");
   cancelButton.textContent = "\u2716";

   let tooltipSectionCancel = document.createElement("section");
   tooltipSectionCancel.setAttribute("class", "tooltipSection cancel");
   let labelTooltipCancel = document.createElement("label");
   labelTooltipCancel.setAttribute("data-tooltip", "tooltip");
   labelTooltipCancel.setAttribute("for", "tooltip");
   labelTooltipCancel.textContent = "Відмінити";
   tooltipSectionCancel.appendChild(labelTooltipCancel);
   cancelButton.appendChild(tooltipSectionCancel);

   buttonBlockTwo.appendChild(buyButton);
   buttonBlockTwo.appendChild(cancelButton);
   product.appendChild(buttonBlockTwo);

   let productStatisticBought = statistic.querySelector(".productStatistic.bought");
   let items = productStatisticBought.querySelectorAll(".item");
   
   for(let i = 0; i < items.length; i++){
      let itemName = items[i].querySelector(".itemName");
      if(name ===itemName.textContent){
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
      if(name === itemName.textContent){
         productStatisticBought.removeChild(items[i]);
         break;
      }
   }

   let productStatistic = statistic.querySelector(".productStatistic");
   items = productStatistic.querySelectorAll(".item");
   
   for(let i = 0; i < items.length; i++){
      let itemName = items[i].querySelector(".itemName");
      if(name === itemName.textContent){
         productStatistic.removeChild(items[i]);
         break;
      }
   }
}

function saveData() {
   const data = getIncomeRows().map((row) => {
     if (row.querySelector(".cancelButton")) {
       return {
         name: row.querySelector(".label").textContent.trim(),
         amount: row.querySelector(".blockOfAmount").textContent,
         buttonText: row.querySelector(".button").textContent.trim(),
         isSold: false,
       };
     } else {
       return {
         name: row.querySelector(".label.crossedOut").textContent.trim(),
         amount: row.querySelector(".blockOfAmount").textContent,
         buttonText: row.querySelector(".button.bought").textContent.trim(),
         isSold: true,
       };
     }
   });
 
   localStorage.setItem("products", JSON.stringify(data));
 }
 
 function getIncomeRows() {
   return Array.from(document.querySelectorAll(".products .product"));
 }

function getProducts() {
   let products;
   if (localStorage.getItem("products") === null) {
     products = [];
   } else {
     products = JSON.parse(localStorage.getItem("products"));
   }
   products.forEach(function (product) {
      const newProduct = document.createElement("section");
      newProduct.setAttribute("class", "product");
      let nameOfProduct = document.createElement("section");
      nameOfProduct.setAttribute("class", "nameOfProduct");
      let name = document.createElement("p");
      if (!product.isSold) {
         name.setAttribute("class", "label");
      } else {
         name.setAttribute("class", "label crossedOut");
      }
      name.textContent = product.name;
      nameOfProduct.appendChild(name);
      newProduct.appendChild(nameOfProduct);

      let buttonGroupOne = document.createElement("section");
      buttonGroupOne.setAttribute("class", "buttonBlockOne");
 
      if (!product.isSold) {
       let minusButton = document.createElement("button");
       if (product.amount > 1) {
         minusButton.setAttribute("class", "minusButton");
       } else {
         minusButton.setAttribute("class", "minusButton disabled");
       }
       minusButton.textContent = "–";

      let tooltipSectionMinus = document.createElement("section");
      tooltipSectionMinus.setAttribute("class", "tooltipSection");
      let labelTooltipMinus = document.createElement("label");
      labelTooltipMinus.setAttribute("data-tooltip", "tooltip");
      labelTooltipMinus.setAttribute("for", "tooltip");
      labelTooltipMinus.textContent = "Зменшити кількість";
      tooltipSectionMinus.appendChild(labelTooltipMinus);
      minusButton.appendChild(tooltipSectionMinus);

      let blockOfAmount = document.createElement("section");
      blockOfAmount.setAttribute("class", "blockOfAmount");
      blockOfAmount.textContent = product.amount;
 
      let plusButton = document.createElement("button");
      plusButton.setAttribute("class", "plusButton");
      plusButton.textContent = "+";

      let tooltipSectionPlus = document.createElement("section");
      tooltipSectionPlus.setAttribute("class", "tooltipSection");
      let labelTooltipPlus = document.createElement("label");
      labelTooltipPlus.setAttribute("data-tooltip", "tooltip");
      labelTooltipPlus.setAttribute("for", "tooltip");
      labelTooltipPlus.textContent = "Збільшити кількість";
      tooltipSectionPlus.appendChild(labelTooltipPlus);
      plusButton.appendChild(tooltipSectionPlus);

      buttonGroupOne.appendChild(minusButton);
      buttonGroupOne.appendChild(blockOfAmount);
      buttonGroupOne.appendChild(plusButton);
      newProduct.appendChild(buttonGroupOne);


      let buttonBlockTwo = document.createElement("section");
      buttonBlockTwo.setAttribute("class", "buttonBlockTwo");
      let buyButton = document.createElement("button");
      buyButton.setAttribute("class", "button");
      buyButton.textContent = "Куплено";

      let tooltipSectionBuy = document.createElement("section");
      tooltipSectionBuy.setAttribute("class", "tooltipSection buy");
      let labelTooltipBuy = document.createElement("label");
      labelTooltipBuy.setAttribute("data-tooltip", "tooltip");
      labelTooltipBuy.setAttribute("for", "tooltip");
      labelTooltipBuy.textContent = "Купити";
      tooltipSectionBuy.appendChild(labelTooltipBuy);
      buyButton.appendChild(tooltipSectionBuy);

      let cancelButton = document.createElement("button");
      cancelButton.setAttribute("class", "cancelButton");
      cancelButton.textContent = "\u2716";

      let tooltipSectionCancel = document.createElement("section");
      tooltipSectionCancel.setAttribute("class", "tooltipSection cancel");
      let labelTooltipCancel = document.createElement("label");
      labelTooltipCancel.setAttribute("data-tooltip", "tooltip");
      labelTooltipCancel.setAttribute("for", "tooltip");
      labelTooltipCancel.textContent = "Відмінити";
      tooltipSectionCancel.appendChild(labelTooltipCancel);
      cancelButton.appendChild(tooltipSectionCancel);

      buttonBlockTwo.appendChild(buyButton);
      buttonBlockTwo.appendChild(cancelButton);
      newProduct.appendChild(buttonBlockTwo);
   
     } else {

      let blockOfAmount = document.createElement("section");
      blockOfAmount.setAttribute("class", "blockOfAmount");
      blockOfAmount.textContent = product.amount;
 
      buttonGroupOne.appendChild(blockOfAmount);
 
      let buttonBlockTwo = document.createElement("section");
      buttonBlockTwo.setAttribute("class", "buttonBlockTwo");
      let buyButton = document.createElement("button");
      buyButton.setAttribute("class", "button bought");
      buyButton.textContent = " Не Куплено";

      let tooltipSectionBought = document.createElement("section");
      tooltipSectionBought.setAttribute("class", "tooltipSection bought");
      let labelTooltipBought = document.createElement("label");
      labelTooltipBought.setAttribute("data-tooltip", "tooltip");
      labelTooltipBought.setAttribute("for", "tooltip");
      labelTooltipBought.textContent = "Не куплено";
      tooltipSectionBought.appendChild(labelTooltipBought);
      buyButton.appendChild(tooltipSectionBought);

      buttonBlockTwo.appendChild(buyButton);
      newProduct.appendChild(buttonGroupOne);
      newProduct.appendChild(buttonBlockTwo);
     }
 
     document.querySelector(".products").appendChild(newProduct);
 
     if (product.isSold) {
      let productStatisticBought = statistic.querySelector(".productStatistic.bought");
      let boughtItem = document.createElement("section");
      let itemName = document.createElement("article");
      itemName.setAttribute("class", "itemName");
      let amountOfItem = document.createElement("section");
      boughtItem.setAttribute("class", "item bought");
      itemName.textContent = product.name;
      amountOfItem.setAttribute("class", "amountOfItem");
      amountOfItem.textContent = product.amount;

      boughtItem.appendChild(itemName);
      boughtItem.appendChild(amountOfItem);
      productStatisticBought.appendChild(boughtItem);
     } else {
      let productStatistic = statistic.querySelector(".productStatistic");
      let item = document.createElement("section");
      let itemName = document.createElement("article");
      itemName.setAttribute("class", "itemName");
      let amountOfItem = document.createElement("section");
      item.setAttribute("class", "item");
      itemName.textContent = product.name;
      amountOfItem.setAttribute("class", "amountOfItem");
      amountOfItem.textContent = product.amount;

      item.appendChild(itemName);
      item.appendChild(amountOfItem);

      productStatistic.appendChild(item);
     }
   });
 }

 
 document.addEventListener("DOMContentLoaded", getProducts);