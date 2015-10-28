'use strict'

const cleverCore = require('clever-core')
const Package = cleverCore.Package

// Defining the Package
var DashboardAdminPackage = new Package('dashboard-admin')

// All CLEVER packages require registration
DashboardAdminPackage
  .attach({
    where: '/'
  })
  .routes(['app', 'config'])
  .models()
  .register()
