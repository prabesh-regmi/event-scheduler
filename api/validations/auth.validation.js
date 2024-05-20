const Joi = require('joi');
const { password } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.email': 'Please provide a valid email address.',
      'any.required': 'Email is required.',
    }),
    password: Joi.string().required().custom(password).messages({
      'any.required': 'Password is required.',
    }),
    name: Joi.string().required().messages({
      'any.required': 'Name is required.',
    }),
    role: Joi.string().valid('user', 'admin').messages({
      'any.only': 'Role must be either "user" or "admin".',
    }),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().messages({
      'any.required': 'Email is required.',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Password is required.',
    }),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required().messages({
      'any.required': 'Refresh token is required.',
    }),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required().messages({
      'any.required': 'Refresh token is required.',
    }),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address.',
      'any.required': 'Email is required.',
    }),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required().messages({
      'any.required': 'Reset token is required.',
    }),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password).messages({
      'any.required': 'Password is required.',
    }),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required().messages({
      'any.required': 'Verification token is required.',
    }),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
