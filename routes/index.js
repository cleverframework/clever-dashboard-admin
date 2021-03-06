'use strict'

// Dependencies
const router = require('express').Router()
const jwtDecode = require('jwt-decode')

// Require CleverCore
const CleverCore = require('clever-core')

// Load the config from the core
const config = CleverCore.loadConfig()

// check if jwt-cookie exists
function isLogged(req, res, next) {
  // NB: we don't need a high security check
  // since this module don't handle any data.
  // The check is done in the API (called by the REDUX application).
  const jwt = req.cookies[config.auth.jwt.cookie]
  if (!jwt) return res.redirect('/auth')

  // Decode jwt
  res.locals.user = jwtDecode(jwt)
  next()
}

// Exports
module.exports = function(DashboardPackage, app, config) {

  router.get('/dashboard', isLogged, (req, res, next) => {
    res.redirect('/')
  })

  router.get('/', isLogged, (req, res, next) => {
    // TODO: Change clever-core for auto passing res.locals to render
    res.send(DashboardPackage.render('dashboard', res.locals))
  })

  return router

}
