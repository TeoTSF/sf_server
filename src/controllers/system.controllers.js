const catchError = require("../utils/catchError");
const Users = require("../models/Users");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendMail");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { guardarFormulario, obtenerRegistros } = require("../utils/firebase");
const { welcomeEmail } = require("../utils/welcomeEmail");

//ENDPOINT SYSTEM 1 --- LOGIN
const login = catchError(async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({
    where: {
      email,
      signDeclare: true,
      status: true,
    },
  });
  if (!user)
    return res.status(404).json({ message: "user not found or disabled" });
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ message: "Invalid credentials" });
  const token = jwt.sign({ user }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRES_IN,
  });
  res.status(200).json({ user, token });
});

//ENDPOINT SYSTEM 2 --- RESET PASSWORD
const resetPaswwordMail = catchError(async (req, res) => {
  const { email, frontBaseUrl } = req.body;

  const user = await Users.findOne({
    where: {
      email,
      signDeclare: true,
      status: true,
    },
  });
  if (!user) return res.status(404).json({ message: "User no found" });
  const tokenToVerify = jwt.sign(
    { user: user.dataValues.name },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );
  await Users.update({ resetCode: tokenToVerify }, { where: { id: user.id } });
  await sendEmail({
    to: user.email,
    subject: "Reset password",
    html: ` <h3>Estas intentanto recuperar tu contraseña</h3>
            <a href="${frontBaseUrl}/${tokenToVerify}">Click en el enlace para resetear tu contraseña</a>`,
  });
  res.json({ success: true });
});

//ENDPOINT SYSTEM 3 --- UPDATE PASSWORD
const updatePassword = catchError(async (req, res) => {
  const { password, token } = req.body;
  const user = await Users.findOne({ where: { resetCode: token } });
  if (!user)
    return res.status(401).json({ message: "Unauthorized" });
  jwt.verify(token, process.env.TOKEN_SECRET);
  const hashedPassword = await bcrypt.hash(password, 10);
  await Users.update(
    {
      password: hashedPassword,
      resetCode: null,
      passwordChangeAt: Math.floor(Date.now() / 1000),
    },
    { where: { id: user.id } }
  );
  res.status(201).json({ success: true });
});

// ENDPOINT DEL SISTEMA 4 --- OBTENER USUARIO LOGUEADO
const getMe = catchError(async (req, res) => {
  const { id } = req.user;
  const sessionAge = req.iat;
  const user = await Users.findByPk(id);
  if (user.passwordChangeAt > sessionAge || !user.status)
    return res.status(401).json({ message: "Unauthorized" });
  res.json({ success: true, user });
});

// ENDPOINT DEL SISTEMA 4 --- VERIFICAR EMAIL
const verifyEmail = catchError(async (req, res) => {
  const { token } = req.params;
  const data = jwt.verify(token, process.env.TOKEN_SECRET);
  await Users.update({ isVerified: true }, { where: { id: data.result.id } });
  res.json({ success: true });
});

// ENDPOINT DEL SISTEMA 18 --- SOLICITUD PARA VERIFICAR EMAIL
const requestEmailVerification = catchError(async (req, res) => {
  const { email, frontBaseUrl } = req.body;
  const user = await Users.findOne({ where: { email } });
  if (!user || !user.status)
    return res.status(404).json({ message: "user no found or inactive state" });
  const tokenToVerify = jwt.sign({ user }, process.env.TOKEN_SECRET, {
    expiresIn: "24h",
  });
  await sendEmail({
    to: result.email,
    subject: "Verificación de Email",
    html: `
    <a href="${frontBaseUrl}/verify_email/${tokenToVerify}">Click en el enlace para verificar E-mail</a>
    `,
  });
  return res.status(201).json({ success: true });
});

const handleSaveForm = async (req, res) => {
  try {
    const {email} = req.body;
    const result = await guardarFormulario(req.body);
    await sendEmail({
      to: email,
      subject: "Confirmación de Registro",
      html: welcomeEmail(),
    });
    if (result.success) {
      res.status(200).json({ success: true, id: result.id });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const handleGetUsers = async (req, res) => {
  try {
    const result = await obtenerRegistros();
    if (result.success) {
      res.status(200).json({ success: true, usuarios: result.usuarios });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


module.exports = {
  login,
  resetPaswwordMail,
  updatePassword,
  verifyEmail,
  getMe,
  requestEmailVerification,
  handleSaveForm,
  handleGetUsers
};
