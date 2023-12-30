const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const { ctrlWrapper, HttpError, sendEmail } = require("../helpers");
const { User } = require("../models/user");

const { v4: uuidv4 } = require("uuid");
const Jimp = require("jimp");

const { SECRET_KEY, BASE_URL } = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  // подтверждение адресса
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a>`,
  };
  //  отправляем письмо
  await sendEmail(verifyEmail);

  res.status(200).json({
    email: newUser.email,
    subscription: newUser.subscription,
    avatarURL,
    verificationToken,
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.status(200).json({
    message: "Verification successful",
  });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(400, "missing required field email");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verify email send success",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!user || !passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  console.log("user.verify=>", user.verify);

  if (!user.verify) {
    throw HttpError(401, "Email not verified");
  }
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  // const newUser = await User.
  await User.findByIdAndUpdate(
    user._id,
    { token },
    { select: "-token -password -createdAt -updateAt" }
  );
  res.status(200).json({
    token,

    user: {
      email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  if (!email) {
    throw HttpError(401, "Not authorized");
  }

  res.status(200).json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({
    message: "Logout success",
  });
};

const updateStatusSubscription = async (req, res, next) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  if (!["starter", "pro", "business"].includes(subscription)) {
    throw HttpError(400, "Invalid subscription value");
  }
  const updatedUser = await User.findOneAndUpdate(
    _id,
    { subscription },
    {
      new: true,
    }
  );

  if (!updatedUser) {
    throw HttpError(404, "User not found");
  }
  res.status(200).json({
    email: updatedUser.email,

    subscription: updatedUser.subscription,
  });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  try {
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);

    const avatar = await Jimp.read(resultUpload);

    await avatar.resize(250, 250).write(resultUpload);

    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
      avatarURL,
    });
  } catch (error) {
    // delete tempUpload file
    await fs.unlink(req.file.path);
    throw error;
  }
};
module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateStatusSubscription: ctrlWrapper(updateStatusSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
