import { fileURLToPath } from 'url';
import path from 'path';
import bcrypt from 'bcrypt'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const crearHash = contrasena => bcrypt.hashSync(contrasena, bcrypt.genSaltSync(10));

export const esValidaContrasena = (usuario, contrasena) => bcrypt.compareSync(contrasena, usuario.contrasenas);

export default __dirname;