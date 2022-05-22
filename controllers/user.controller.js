const { AccountService, UserService } = require("../services")
const { sendConfirmationMail } = require("../utils/sendmail")
const createError = require('http-errors');

const registerView = async (req, res, next) => {
  res.render("index", {})
}

const register = async (req, res, next) => {
  try {
    const { firstname, lastname, email, phone, course, accountNumber } = req.body;

    const emailExists = await UserService.queryUser({ email });
    if (emailExists) {
      throw createError.Conflict({
        success: false,
        message: "Email already linked to existing registration"
      })
    };

    const account = await AccountService.queryAccount({ accountNumber });
    if (!account) {
      throw createError.NotFound({
        success: false,
        message: "Account Number does not exist"
      });
    };

    await sendConfirmationMail(email, firstname, lastname);

    const createdUser = await UserService.createUser({
      firstname,
      lastname,
      email,
      phone,
      course,
    })
    return res.status(201).json({
      success: true,
      createdUser,
      message: "User created successfully"
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  registerView,
  register
}