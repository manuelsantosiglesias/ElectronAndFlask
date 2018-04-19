const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const rq = require('request-promise')
const subpy = require('child_process').spawn('python', ['./app/routes.py']);

// Modulo de electron para recargar la página cuando el contenido cambia
require('electron-reload')(__dirname, {electron: require('electron')});


let window = null

// Función para crear la ventana
function createWindow(){
    window = new BrowserWindow({
        width: 800,
        height: 600,
        icon: __dirname + '/python.ico'
    })

    // URL
    window.loadURL('http://localhost:12800')

    // DevTools
    //window.webContents.openDevTools()

    // En caso de tener varias ventanas controlar aquí el cierre
    window.on('closed', function () {
        mainWindow = null
    })

    // Función close terminamos el server
    window.on('close',function(){
        window = null;
        subpy.kill('SIGINT');
    })

    // No menu
    window.setMenu(null);

    // Hago un timeout para que se carge el servidor
    window.webContents.on('did-finish-load', function() {
        //console.log(subpy.stdout);
        setTimeout(() => window.show(), 1000);
    });

}

// Función anónima para crear la ventana app.once('ready', createWindow);
app.once('ready', () => {
    createWindow();
})

// Cerrar app si se cierran todas las ventanas
app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') {
        app.quit()
      }
})