if (window && window.process && window.process.type) {
    window._electron = require('electron');
    window._si = require('systeminformation');
    window._crypto = require('crypto');
    window._fs = require('fs');
    window._os = require('os');
}
