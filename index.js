

const io = require("./io");
const http = require("./http");

const Warehouse = new io("./db/warehouse.json")


const result = async () => {
    const products = await Warehouse.read()

    const action = process.argv[2]

    if (action === "show") {
        console.table(products);

    }
    else if (action === "sell") {
        const name = process.argv[3]
        const count = +process.argv[4]

        const all = products.map(product => {
            if (product.fruit === name && product.count >= count) {

                product.count -= count
            }
            return product
        })
        Warehouse.write(all)
    } else if (action === "buy") {
        const name = process.argv[3]
        const count = +process.argv[4]

        const findProduct = products.find((product) => product.fruit == name)
        let all;
        if (findProduct) {
            all = products.map(product => {
                if (product.fruit === name) {

                    product.count += count
                } else {
                    all = [...products, { fruit: name, count: count }]
                }
                return product
            })
        }
        Warehouse.write(all)
    }

}
result();


http.