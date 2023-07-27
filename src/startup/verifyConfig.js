const config = require('config');
const colors = require('colors');

function verifyConfig() {
    try {
        console.log('Project Name:', config.get('project'));
        console.log('Mail Host:', config.get('mail.host'));
        console.log('Mail Password:', config.get('mail.password'));
        console.log('JWT Private Key:', config.get('jwt.privateKey'));
    } catch (ex) {
        console.error(colors.red('Error:', ex.message));
        process.exit(1);
    }
}

module.exports = verifyConfig;
