import jwt from "jsonwebtoken"

const KEY = "TOKENKEY1234"

export default function(req, res) {

    const { token } = req.body

    const { admin } = jwt.verify(token, KEY)

    if(admin) {
        res.json({ secretAdminKey: 1337 })
    } else {
        res.json({ admin: false })
    }

}