const pool = require('./db')

const express = require("express")
const validator = require("validator")
const cors = require("cors")
const bcrypt = require("bcryptjs")
const cookieParser = require("cookie-parser")
const authMiddleware =require("./middleware/authmiddleware")
const {jwt, SECRET_KEY_ACCESS,SECRET_KEY_REFRESH} = require("./config/jwt")

const app = express()

//middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

//post method
app.post("/todos",authMiddleware,async(req,res)=>
{
    try{
        const {judul,deadline,isiCatatan} = req.body
        const userId = req.user.id
        if (!judul || !isiCatatan) {
          return res.status(400).json({
            message: "title dan isiCatatan wajib diisi"
          });
        }

        const newToDo = await pool.query(`
          INSERT INTO todos(judul,deadline,isi_catatan,user_id)
          VALUES ($1,$2,$3,$4) 
          RETURNING *`,[judul,deadline,isiCatatan,userId])

        res.status(200).json(newToDo.rows[0])
    }

    catch(err){
        res.status(500).json({message:"gagal menambahkan catatan"})
    }
})

app.post("/register", async(req,res)=>{
    try{
        const {username,email,password} = req.body

        if(!validator.isEmail(email)){
          return res.status(400).json({message:"Your input is not an Email"})
        }

        const exist = await pool.query(`SELECT id FROM users WHERE username=$1 OR email=$2`,[username,email])

        if(exist.rows.length > 0) {
          return res.status(400).json({message:"Username/Email already in use"})}
        
        const hashedPw = await bcrypt.hash(password,10)

        await pool.query(
          `INSERT INTO users(username,email,password)
          VALUES ($1,$2,$3)`,[username,email,hashedPw])

        res.status(201).json({ message: "Registration is success, please login first" })
    } 
    catch {
        res.status(500).json({ message: "Register gagal" })
    }
})


app.post("/login",async(req,res)=>{
  try{
    const {identifier,password} = req.body

    const result = await pool.query(`SELECT * FROM users WHERE username=$1 OR email=$1`,[identifier])

    if(result.rows.length==0) return res.status(401).json({message : "Email or password is wrong"})
    
    const user = result.rows[0]

    const isValid = await bcrypt.compare(password,user.password)

    if(!isValid)return res.status(401).json({message:"Email or password is wrong"})

    const tokenAccess = jwt.sign(
        {id:user.id, username:user.username},
        SECRET_KEY_ACCESS,
        {expiresIn :"15m"}
    )
    const tokenRefresh = jwt.sign(
      {id:user.id, username:user.username},
      SECRET_KEY_REFRESH,
      {expiresIn:"7d"}

    )
    res.cookie("tokenRefresh",tokenRefresh,{
      httpOnly:true,
      sameSite:"strict",
      maxAge: 7*24*60*60*1000,
    })
    res.json({ tokenAccess })
  } 

  catch {
    res.status(500).json({ message: "Login gagal" })
  }
    
})

app.post("/refresh", async (req,res)=>{
  const tokenRefresh = req.cookies.tokenRefresh

  if(!tokenRefresh) return res.sendStatus(401) //sendStatus digunakan jika tidak ada pesan yang dikirim
    try{
      const decode = jwt.verify(tokenRefresh,SECRET_KEY_REFRESH)
      const newTokenAccess = jwt.sign(
        {id:decode.id, username :decode.username},
        SECRET_KEY_ACCESS,
        {expiresIn:"15m"}
      )
      res.json({newTokenAccess})
    }
    catch{
      res.sendStatus(401)
    }
})

app.post("/logout",async(req,res)=>{
  res.clearCookie("tokenRefresh",{httpOnly:true,sameSite:"strict"})
  res.status(200).json({message:"Berhasil Logout"})
})

app.get("/todos",authMiddleware,async(req,res)=>{
    try{
      const userId = req.user.id
      const {search,sort} = req.query
      let query = `SELECT * FROM todos WHERE user_id =$1 `
      const values = [userId]
      let idx = 2
      if(search) {
        query+= `AND judul ILIKE $${idx} `
        values.push(`%${search}%`)
        idx++
      }
      const sortMap={
        title:"judul",
        deadline:"deadline",
        input :"id",
      }
      if(sort && sortMap[sort]){
        query+=`ORDER BY ${sortMap[sort]} ASC`
      }
      else{
        query +=`ORDER BY id ASC`
      }
      const result = await pool.query(query,values)
      res.json(result.rows)
    }
    catch(err){
        console.error(err)
        res.status(500).json({message:"gagal ambil data"})
    }
})

app.get("/todos/:id",authMiddleware,async(req,res)=>{
  const todoId = Number(req.params.id)
  const userId = req.user.id

  const result =await pool.query(`SELECT * FROM todos WHERE id=$1 AND user_id=$2`,[todoId,userId])

  res.json(result.rows[0])

})

app.get("/me", authMiddleware, (req, res) => {
  res.json({
    username: req.user.username,
  });
});


app.delete("/todos", authMiddleware, async (req, res) => {
  try {

    const userId = req.user.id

    await pool.query(`DELETE FROM todos WHERE user_id = $1`,[userId])

    res.sendStatus(204);
  
  } catch {
    res.status(500).json({ message: "Gagal hapus semua todo" });
  }

});


app.delete("/todos/:id", authMiddleware, async (req, res) => {
  try {
    const id = Number(req.params.id)
    const userId = req.user.id
    const result = await pool.query(`DELETE FROM todos WHERE id=$1 AND user_id=$2 RETURNING *`,[id,userId])


    if (result.rows.length === 0){
      return res.status(404).json({message:"Todos ini bukan milikmu"})
    }

    res.sendStatus(204);
  } catch {
    res.status(500).json({ message: "Gagal hapus" });
  }
});


app.put("/todos/:id",authMiddleware,async (req,res)=>{

  try{
  const todoId = Number(req.params.id)
  const userId = req.user.id
  const {judul,deadline,isiCatatan} = req.body

  if(!judul || !isiCatatan){
    return res.status(500).json({message:"Please enter your Title's to-do and to-do first"})
  }

  const result = await pool.query(
    `UPDATE todos 
    SET judul = $1,
    deadline = $2,
    isi_catatan = $3
    WHERE user_id = $4 AND id = $5
    RETURNING *
    `, [judul,deadline||null,isiCatatan,userId,todoId])
  
  if (result.rows.length === 0) {
    return res.status(404).json({message: "Todo tidak ditemukan atau bukan milikmu"})}
  res.json(result.rows[0])
  
}
  catch (err) {
    console.error(err)
    res.status(500).json({ message: "Gagal update todo" })
  }

})

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});