const http = require("http");

const bodyParser = (req) => {

    return new Promise((resolve, reject) => {
        req.on("data", (data) => {
            resolve(JSON.parse(data));
        })
        req.on("error", (err) => {
            reject(err)
        })
    })


}
let users = []
http
    .createServer(async (req, res) => {

        res.setHeader("Content-Type", "aplication/json");
        if (req.url === "/todos" && req.method === "GET") {
            res.writeHead(400)
            res.end(JSON.stringify(users))
        } else if (req.url === "/todos" && req.method === "POST") {
            req.body = await bodyParser(req);
            users.push(req.body)
            res.statusCode = 201
            res.end(JSON.stringify({ message: "SUCCESS" }))

        } else if (req.url === "/todos" && req.method === "PUT") {
            req.body = await bodyParser(req);
            const { todos, isComplate } = req.body
            const newTodos = users.map((user) => {
                if (user.todos == todos && user.isComplate == isComplate) {
                    user.isComplate = isComplate
                    user.todos = todos
                }
                else if (user.todos == todos) {
                    user.isComplate = isComplate
                } else if (user.isComplate == isComplate) {
                    user.todos = todos
                }
                return user
            })
            users = [...newTodos]
            res.end(JSON.stringify({ message: "SUCCESS" }))
        } else if (req.url === "/todos" && req.method === "DELETE") {
            req.body = await bodyParser(req);
            const { todos, isComplate } = req.body
            const newUser =
                users.filter((user) => user.todos !== todos)
            users = newUser
            res.end(JSON.stringify({ message: "SUCCESS" }))
        }

        else {
            res.statusCode = 404
            res.end(JSON.stringify({ message: "NOT FOUND" }))
        }
    })
    .listen(4000, "localhost", () => {
        console.log("Server ishladi ");
    });