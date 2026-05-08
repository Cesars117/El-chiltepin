const { NodeSSH } = require('node-ssh');
const ssh = new NodeSSH();

async function deployTar() {
  try {
    console.log("Conectando al servidor SSH...");
    await ssh.connect({
      host: '145.223.77.3',
      port: 65002,
      username: 'u428779198',
      password: 'Radiamex2026!'
    });

    console.log("Subiendo la actualización de WhatsApp y textos...");
    await ssh.putFile('despliegue.tar.gz', 'domains/elchiltepinags.com/public_html/despliegue.tar.gz');

    console.log("Descomprimiendo con tar...");
    const cmd = `
      cd domains/elchiltepinags.com/public_html
      chmod -R 777 .next node_modules 2>/dev/null || true
      rm -rf .next node_modules public/images
      tar -xzf despliegue.tar.gz
      rm -f despliegue.tar.gz
      mkdir -p tmp
      touch tmp/restart.txt
    `;
    const result = await ssh.execCommand(cmd);
    
    console.log("STDOUT:\n" + result.stdout);
    if (result.stderr) console.log("STDERR:\n" + result.stderr);
    
    console.log("¡Despliegue finalizado con éxito!");
    ssh.dispose();
  } catch (err) {
    console.error("Error:", err.message || err);
    ssh.dispose();
  }
}

deployTar();
