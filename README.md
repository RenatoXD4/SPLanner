# SPLanner
Proyecto Kanban

## Comandos básicos de Git

#       TRAER CAMBIOS NUEVOS    --> hacer cada vez que se acepte un commit o quieras ver la rama de alguien mas

  --> git pull

# Ver el status de tus archivos

  - git status

# Añadir tus archivos para hacer commit

  - git add . (Si van a usar el git integrado en Visual Studio no es necesario esta parte)

# Hacer commit y push

  - git commit -m "tipomensaje (chore,fix,feat): mensaje"
  - git push (Esto se hace después de hacer commit los cambios, pero pueden utilizar el git integrado en Visual Studio)

# Ver rama en la que estás: 
  - git branch

# Cambiar de rama 
  - git switch nombreRama

# Crear una rama

  - Asegurarse de estar en la rama develop
  - Usar comando de ejemplo:  "git checkout -b feature/funcionalidad"
  - git status (Para asegurarse de si estás en la rama que creaste)

# Eliminar una rama
  ej:
  --> git branch -d feature/nombre


# Cambios en BD

  ej> npx prisma migrate dev --name relacion-etiquetas-proyecto                 --> esto crea todo normal si es que no tiene ningun dato la tabla
  ej> npx prisma migrate dev --name relacion-etiquetas-proyecto --create-only   --> esto es para crear el nuevo dato/relacion pero lo creara como opcional, luego tendras que aplicarlo de forma manual en la bd a cada dato el nuevo dato. Luego de eso podras ejecutar lo siguiente para normalizar todo --> npx prisma migrate dev
