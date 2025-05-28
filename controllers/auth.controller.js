import jwt from "jsonwebtoken";

const hardcodedAdmin = {
  username: "admin",
  password: "admin123",
};

export const login = (req, res) => {
  const { username, password } = req.body;

  if (
    username === hardcodedAdmin.username &&
    password === hardcodedAdmin.password
  ) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000, // 1 hour
      })
      .json({ success: true, message: "Login successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("token")
    .json({ success: true, message: "Logged out successfully" });
};
