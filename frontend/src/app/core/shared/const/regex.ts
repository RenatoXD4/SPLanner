

// se le agrega "export" antes de la const para que se pueda llevar el objeto a otros componentes y de esa forma reciclar codigo 
// para uso de buenas practicas.
export const expresiones = {  

    //// Expresiones regulares para validación de formularios
	//nombre : /^[A-Z][a-zA-Z\s]{3,20}$/,
	nombre: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // Letras y espacios, pueden llevar acentos.
	password : /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{4,15}$/, // 4 a 15 digitos + numeros pd: al menos una letra debe ser mayuscula (si o si)
	//password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,

}