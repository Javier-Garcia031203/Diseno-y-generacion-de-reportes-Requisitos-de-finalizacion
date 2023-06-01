let database = new dataManager('products');

function dataManager(name){

    let DB = (localStorage.getItem(name))?JSON.parse(localStorage.getItem(name)):[];

    return{
        // obtener todos los datos de la coleccion
        get : ()=>{
            return DB;
        },
        // ingresar nuevos datos
        push  : (obj)=>{
            DB.push(obj);
            localStorage.setItem(name,JSON.stringify(DB));

        },
        // ingresar una nueva coleccion
        set : (collection)=>{
            DB = collection;
            localStorage.setItem(name,JSON.stringify(DB));
        },
        // eliminar todos los datos de la coleccion
        delete  : ()=>{
            DB = [];
            localStorage.setItem(name,JSON.stringify(DB));
        }
    }
}

function saveData(){

    const id = document.getElementById("id").value;
    const nombreProducto = document.getElementById("nombreProducto").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const brand = document.getElementById("brand").value;
    const category = document.getElementById("category").value;

    const product= {"id":`${id}`,"nombreProducto":`${nombreProducto}`,"description":`${description}`,"price":`${price}`,"brand":`${brand}`,"category":`${category}`};

    database.push(product);
    cleanForm()
    listData();
}

function cleanForm(){
    document.getElementById("id").value = "";
    document.getElementById("nombreProducto").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
    document.getElementById("brand").value = "";
    document.getElementById("category").value = "";
}

function listData(){
    event.preventDefault();
    let products = database.get('products');
    let table = document.getElementById("products");
    table.innerHTML = "";
    let i=0;
    products.forEach(product => {
        let row = table.insertRow(i);
        let cell = row.insertCell(0);
        cell.innerHTML = product.id;
        cell = row.insertCell(1);
        cell.innerHTML = product.nombreProducto;
        cell = row.insertCell(2);
        cell.innerHTML = product.description;
        cell = row.insertCell(3);
        cell.innerHTML = product.price;
        cell = row.insertCell(4);
        cell.innerHTML = product.brand;
        cell = row.insertCell(5);
        cell.innerHTML = product.category;
        cell = row.insertCell(6);
        let btn = document.createElement("button");
        btn.innerHTML = "Eliminar";
        btn.onclick = function() {
            deleteItem(products.indexOf(product));
        }
        cell.appendChild(btn);
        cell = row.insertCell(6);

        let btnEdit = document.createElement("button");
        btnEdit.innerHTML = "Editar";
        btnEdit.onclick = function() {
            editItem(products.indexOf(product));
            deleteItem(products.indexOf(product));
        }
        cell.appendChild(btnEdit);
        i++;
    });
}


function deleteData(){
    database.delete();
    listData()
}

function searchData() {

    const id = document.getElementById("id").value;
    const nombreProducto = document.getElementById("nombreProducto").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const brand = document.getElementById("brand").value;
    const category = document.getElementById("category").value;

    let products = database.get();
    noResults.innerHTML = "";

    if (id !== '') {
        products = products.filter(product => product.id === id);
    }

    if (nombreProducto !== '') {
      products = products.filter(product => product.nombreProducto === nombreProducto);
  }

    if (description !== '') {
        products = products.filter(product => product.description === description);
    }

    if (price !== '') {
        products = products.filter(product => product.price === price);
    }

    if (brand !== '') {
        products = products.filter(product => product.brand === brand);
    }

    if (category !== '') {
        products = products.filter(product => product.category === category);
    }
    
    cleanForm()

    let table = document.getElementById("products");
    table.innerHTML = "";
    let i = 0;
    products.forEach(product => {
        let row= table.insertRow(i);
        let cell = row.insertCell(0);
        cell.innerHTML = product.id;
        cell = row.insertCell(1);
        cell.innerHTML = product.description;
        cell = row.insertCell(2);
        cell.innerHTML = product.price;
        cell = row.insertCell(3);
        cell.innerHTML = product.brand;
        cell = row.insertCell(4);
        cell.innerHTML = product.category;
        i++;
    });
    if (products.length === 0) { // Si no hay productos, mostramos el mensaje
        noResults.innerHTML = "No se encontraron resultados.";
    }
    event.preventDefault(); // evita que la página se refresque al enviar el formulario
}

function deleteItem(index) {
    let products = database.get('products');
    products.splice(index, 1);
    database.set(products);
    listData();
}
function editItem(index) {
    let products = database.get('products');
    let product = products[index];
    document.getElementById("id").value = product.id;
    document.getElementById("nombreProducto").value = product.nombreProducto;
    document.getElementById("description").value = product.description;
    document.getElementById("price").value = product.price;
    document.getElementById("brand").value = product.brand;
    document.getElementById("category").value = product.category;
    document.getElementById("saveButton").setAttribute("onclick", `saveEditedData(${index})`
    );

}

function saveEditedData(index) {
    let products = database.get('products');
    let product = {
        "id": document.getElementById("id").value,
        "nombreProducto": document.getElementById("nombreProducto").value,
        "description": document.getElementById("description").value,
        "price": document.getElementById("price").value,
        "brand": document.getElementById("brand").value,
        "category": document.getElementById("category").value
    };
    products[index] = product;
    database.set(products);
    cleanForm();
    document.getElementById("saveButton").setAttribute("onclick", "saveData()");
    listData();
}