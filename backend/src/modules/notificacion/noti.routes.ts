// backend/src/modules/notificacion/noti.routes.ts
import { Router } from 'express';
import { notificacionController } from './noti.controller.js';

const router = Router();

// ✅ RUTAS PRINCIPALES - CORREGIDAS
router.get('/', notificacionController.obtenerNotificaciones);
router.get('/contar-no-leidas', notificacionController.contarNoLeidas);
router.put('/:id/marcar-leida', notificacionController.marcarComoLeida);
router.put('/marcar-todas-leidas', notificacionController.marcarTodasComoLeidas);
router.delete('/:id', notificacionController.eliminarNotificacion);

// ✅ RUTAS DE NOTIFICACIONES AUTOMÁTICAS - CORREGIDAS PARA QUE COINCIDAN CON EL FRONTEND
router.post('/automatica/edicion-proyecto', notificacionController.notificarEdicionProyecto);
router.post('/automatica/edicion-tarea', notificacionController.notificarEdicionTarea);
router.post('/automatica/comentario', notificacionController.notificarComentarioTarea);
router.post('/automatica/cambio-estado', notificacionController.notificarCambioEstado);
router.post('/automatica/asignacion', notificacionController.notificarAsignacionTarea);
router.post('/automatica/cambio-responsable', notificacionController.notificarCambioResponsable);
router.post('/automatica/eliminacion-tarea', notificacionController.notificarEliminacionTarea);
router.post('/automatica/subida-archivo', notificacionController.notificarSubidaArchivo);
router.post('/automatica/creacion-tarea', notificacionController.notificarCreacionTarea);
router.post('/automatica/invitacion-proyecto', notificacionController.notificarInvitacionProyecto);

// ✅ RUTAS DE UTILIDAD
router.post('/prueba', notificacionController.crearNotificacionPrueba);
router.get('/debug/todas', notificacionController.obtenerTodasNotificaciones);

export default router;