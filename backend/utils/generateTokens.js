import jtw from "jsonwebtoken";

const generateToken = (_id) => {
    return jtw.sign({ _id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
};

export default generateToken