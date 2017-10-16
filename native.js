if (window && window.process && window.process.type) {
  window.$ = window.jQuery = require('jquery');
  window.Popper = require('popper.js');
  require('bootstrap');

  window._electron = require('electron');
  window._si = require('systeminformation');
  window._crypto = require('crypto');
  window._fs = require('fs');
  window._os = require('os');
}
