window.jsPDF = window.jspdf.jsPDF;
class Product {
    constructor (id, name, category, price){
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
    }
}

function loadImage(url) {
  return new Promise(function (resolve, reject) {
    var img = new Image(50,50);
    img.crossOrigin = "anonymous"; 
    img.onload = function () {
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      canvas.width = 5;
      canvas.height = 5;
      canvas.lang = 20;
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL('image/jpeg');
      resolve(dataURL);
    };

    img.onerror = function () {
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
}

async function generateReport() {
  let products = database.get('products');
    const doc = new jsPDF();
    const id = document.getElementById("id").value;
    const nombreProducto = document.getElementById("nombreProducto").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const brand = document.getElementById("brand").value;
    const category = document.getElementById("category").value;
    let x=20; 
    let y=50;
    
    products.forEach( (product)=> {
        doc.text(product.id.toString(), x, y);
        doc.text(product.nombreProducto,x+50, y);
        doc.text(product.category, x+100, y);
        doc.text(product.price.toString(), x+250, y);
        y= y + 10;
    });
    //doc.addPage();
    //doc.text(20, 20, 'Do you like that?');
    imageUrl =  document.getElementById("url").value;
    const header = 'TIENDA GIFTSTORE';
    var dataURL = document.getElementById("grafica").toDataURL(); // await loadImage(imageUrl);
 
    try {     
      doc.autoHeaderFooter = function () {
        doc.setFontSize(13);
        doc.setTextColor(0, 0, 0);
        const xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(header) * doc.internal.getFontSize() / 2); 
       
        doc.text(header, xOffset, options.headerHeight - 5);
        doc.text(getPage(doc), xOffset, doc.internal.pageSize.height - options.footerHeight + 12);
      };
      
      doc.autoHeaderFooter();
      doc.text("Report of products stored and sold", 10,20);
      doc.addImage(dataURL, 'JPEG', 15, 150);
      doc.addPage();
      doc.autoHeaderFooter();
      doc.text("Other page", 10,20);
      } catch (error) {
      console.error(error);
    }
    
    doc.save("reporte.pdf");
}


const options = {
  theme: 'plain',
  headerHeight: 15,
  footerHeight: 15,
  align: 'center',
  margin: {
    left:10,
    right:10,
  }
};

const getPage= function(doc){
  return 'Page ' + doc.internal.getNumberOfPages();
}


