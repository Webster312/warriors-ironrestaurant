const mongoose = require("mongoose");

const Pizza = require("./models/Pizza.model");


mongoose
  .connect("mongodb://127.0.0.1/warriors-bites")
  .then((x) => {
    console.log(`Connected to Mongo! Database Name: "${x.connections[0].name}"`);

    //create a new document (a new pizza)
    const myNewPizza = { 
        name: "margarita",
        dough: "thin",
        price: 12
    };

    return Pizza.create(myNewPizza);
  })
  .then( (pizzaFromDB) => {
    
    const pizzasArr = [
        {
            name: "veggie",
            price: 15,
            isVeggie: true
        },
        {
            name: "seafood",
            price: 20,
            isVeggie: false
        }
    ];

    return Pizza.insertMany(pizzasArr);
  })
  .then( pizzasFromDB => {
    return Pizza.find({price: {$gt: 14} })
  })
  .then( (pizzasArr) => {
    console.log(`currently, we have ${pizzasArr.length} pizzas that meet your search criteria`);
    const amount = 20;
    const total = amount * 5;

    return Pizza.findByIdAndUpdate("64132a789f2b20427d573685", {price: 54}, { returnDocument: 'after' });
  })
  .then( (responseFromMongoose) => {
    return Pizza.findByIdAndRemove("64132a789f2b20427d573688");
  })
  .then( (deletedDocument) => {
    console.log("this pizza was deleted...");
    console.log(deletedDocument)
  })
  .catch((err) => console.error("Error connecting to DB", err));












  

// async function runDbQueries(){
//     try {
//         const x = await mongoose.connect("mongodb://127.0.0.1/warriors-bites")
//         console.log(`Connected to Mongo! Database Name: "${x.connections[0].name}"`);
    
//         //create a new document (a new pizza)
//         const myNewPizza = { name: "margarita" };
    
//         const pizzaFromDB = await Pizza.create(myNewPizza);
    
//         const pizzasArr = [
//             {name: "veggie"},
//             {name: "seafood"}
//         ];
    
//         const pizzasFromDB = await Pizza.insertMany(pizzasArr);
//         console.log(pizzasFromDB);
        
//     } catch (err) {
//         console.error("Error connecting to DB", err)
//     }
// }


// runDbQueries();
