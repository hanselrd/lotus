if (window && window.process && window.process.type) {
    window.electron = require('electron');
    window.fs = require('fs');
    window.os = require('os');
    window.si = require('systeminformation');
}
