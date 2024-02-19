let easyinvoice = require('easyinvoice')
//Import the built-in NodeJS fs library so we can interact with the file system to save our invoice
var fs = require('fs');
const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

// Return full date
let currentDate = `${day}-${month}-${year}`;


var data = {
  // Let's add a recipient
  //   mode: "development",
  client: {
    company: "Client Corp",
    address: "Clientstreet 456",
    zip: "Client zip code",
    city: "Client country",
    country: "country",
  },

  // Now let's add our own sender details
  sender: {
    company: "Company name",
    address: "Company Adress",
    zip: "Company zip code",
    city: "Company city",
    country: "Company Country",
  },

  images: {
    //      Logo:
    // 1.   Use a url
    logo: "https://www.discountrubberstamps.com/cdn/shop/products/501455.png?v=1591128916",
  },

  information: {
    // Invoice number
    number: "2024.0001",
    // Invoice data
    date: currentDate,
    // Invoice due date
    "due-date": "31-04-2024",
  },

  // Now let's add some products! Calculations will be done automatically for you.
  products: [
    {
      quantity: "2",
      description: "Product 1",
      "tax-rate": 6,
      price: 33.87,
    },
    {
      quantity: "4",
      description: "Product 2",
      "tax-rate": 21,
      price: 10.45,
    },
  ],

  // We will use bottomNotice to add a message of choice to the bottom of our invoice
  bottomNotice: "Kindly pay your invoice within 15 days.",

  // Here you can customize your invoice dimensions, currency, tax notation, and number formatting based on your locale
  settings: {
    currency: "USD",
  },
  translate: {
    /*
         "invoice": "FACTUUR",  // Default to 'INVOICE'
         "number": "Nummer", // Defaults to 'Number'
         "date": "Datum", // Default to 'Date'
         "due-date": "Verloopdatum", // Defaults to 'Due Date'
         "subtotal": "Subtotaal", // Defaults to 'Subtotal'
         "products": "Producten", // Defaults to 'Products'
         "quantity": "Aantal", // Default to 'Quantity'
         "price": "Prijs", // Defaults to 'Price'
         "product-total": "Totaal", // Defaults to 'Total'
         "total": "Totaal" // Defaults to 'Total'
         */
  },
  customize: {
    // "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html
  },
};

//Let's use the easyinvoice library and call the "createInvoice" function
easyinvoice.createInvoice(data, function (result) {
    //The response will contain a base64 encoded PDF file
    var pdf = result.pdf;

    //Now let's save our invoice to our local filesystem
    if (fs.existsSync("./invoice.pdf")) {
        fs.unlink("./invoice.pdf", (error) => {
            if (error) {
                console.log(error);
            }
        })
        fs.writeFileSync("invoice.pdf", pdf, 'base64');
    }
});
