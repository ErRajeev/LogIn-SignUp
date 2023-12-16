const speakeasy = require("speakeasy");
const nodemailer = require("nodemailer");
const User = require("../model/userModel");
const users = {};
let _name, _password, _email;

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  _name = name;
  _password = password;
  _email = email;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    if (await User.findOne({ email })) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const secret = speakeasy.generateSecret({
      length: 4,
      name: "Node-Mail-Service",
      symbols: false,
    });

    users[email] = {
      secret: secret.base32,
      encoding: "base32",
      verified: false,
    };

    const otp = speakeasy.totp({
      secret: users[email].secret.base32,
      encoding: "base32",
    });

    await sendOTPEmail(email, otp);

    res.json({ success: true });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "er.rajeev.mca@gmail.com",
      pass: "tpxwssmhvkuexuqx",
    },
  });

  const mailOptions = {
    from: "er.rajeev.mca@gmail.com",
    to: email,
    subject: "OTP Verification",
    text: `Your OTP is: ${otp}. Use this code to complete the verification.`,
  };

  return transporter.sendMail(mailOptions);
};

const otpVerification = async (req, res) => {
  const { email, token } = req.body;

  const user = users[email];
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  try {
    const verified = speakeasy.totp.verify({
      secret: user.secret.base32,
      encoding: "base32",
      token,
      window: 2,
    });

    if (verified) {
      user.verified = true;
      try {
        await User.create({
          name: _name,
          email: _email,
          password: _password,
        });
        res
          .status(200)
          .json({ message: `OTP verification successful. ${_name} Added!` });
      } catch (error) {
        res.status(500).json({ error: "Can't Create Account" });
      }
    } else {
      res.status(401).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error during verification" });
  }
};

module.exports = {
  createUser,
  otpVerification,
};
