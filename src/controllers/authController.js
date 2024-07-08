import { pool } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import { JWT_SECRET } from "../config.js";
import { validateRegisterSchema,validateLoginSchema } from "../schemas/schema.js";

const register = async (req, res) => {
  const { username, email, password } = req.body;

  // Validar datos
  const validationResult = validateRegisterSchema(req.body);
  if (!validationResult.success) {
    return res.status(400).json({ error: validationResult.error });
  }

  try {
    // Hashear la contraseña
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Insertar usuario en la base de datos
    const result = await pool.query(
      "INSERT INTO users (name_user, user_password, user_email) VALUES ($1, $2, $3)",
      [username, hashedPassword, email]
    );

    // Verificar si el usuario fue creado correctamente
    if (result.rowCount === 1) {
      return res.status(201).json({ message: "User created successfully" });
    } else {
      return res.status(500).json({ error: "User creation failed" });
    }
  } catch (error) {
    // Manejar errores específicos
    if (error.code === '23505') {
      return res.status(409).json({ error: "Username or email already exists" });
    }

    // Enviar respuesta genérica para otros errores
    return res.status(500).json({ error: "Internal server error" });
  }
};


const login = async (req, res) => {
  // Extraer datos del body
  const { email, password } = req.body;

  // Validar datos
  const validationResult = validateLoginSchema(req.body);
  if (!validationResult.success) {
    return res.status(400).json({ error: validationResult.error });
  }

  try {
    // Buscar usuario en la base de datos
    const result = await pool.query(
      "SELECT * FROM users WHERE user_email = $1",
      [email]
    );

    // Si no existe, enviar error
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Extraer usuario
    const user = result.rows[0];

    // Comparar contraseñas
    const isMatch = bcrypt.compareSync(password, user.user_password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generar token
    const token = jwt.sign(
      { id: user.id_user, username: user.name_user, email: user.user_email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Configurar cookie
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    // Enviar respuesta
    res.json({ message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
};



const logout = (req, res) => {
  res.clearCookie("access_token");
  res.send("Logged out");
}




export { register, login ,logout};