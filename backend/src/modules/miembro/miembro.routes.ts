import { Router } from "express";

import { MiembroController } from "./miembro.controller.js";

const routerMiembro = Router();
const miembroController = new MiembroController();

routerMiembro.get('/users/search', miembroController.buscarUsuarioPorEmail.bind(miembroController));
routerMiembro.post('/members/invitar', miembroController.invitarUsuarioAProyecto.bind(miembroController));
routerMiembro.get('/members/proyecto/:proyectoId', miembroController.obtenerMiembrosProyecto.bind(miembroController));
routerMiembro.delete('/members/eliminar', miembroController.eliminarMiembroProyecto.bind(miembroController));
routerMiembro.patch('/members/rol/:miembroId', miembroController.actualizarRolMiembro.bind(miembroController));
export default routerMiembro;