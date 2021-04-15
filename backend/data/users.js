import bcrypt from "bcryptjs";

const users = [
    {
        name: "Admin User",
        email: "admin@example.com",
        password: bcrypt.hashSync("123456"),
        isAdmin: true,
    },
    {
        name: "John Smith",
        email: "john.smith@example.com",
        password: bcrypt.hashSync("123456"),
    },
    {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        password:  bcrypt.hashSync("123456"),
    },
]

export default users;