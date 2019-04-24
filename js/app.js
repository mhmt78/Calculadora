var calculadora = {
	
	pantalla: document.getElementById("display"),
	valorPantalla: "0",
	operacion: "",
	primeroValor: 0,
	segundoValor: 0,
	ultimoValor: 0,
	resultado: 0,
	auxTeclaIgual: false,
	
	init: (function(){
		this.asignarEventosFormatoBoton(".tecla");
		this.asignarEventosaFuncion();
	}),
	
	asignarEventosFormatoBoton: function(selector){
		var x = document.querySelectorAll(selector);
		for (var i = 0; i<x.length;i++) {
			x[i].onmouseover = this.eventoReduceBoton;
			x[i].onmouseleave = this.eventoNormalBoton;
		};
	},

	eventoReduceBoton: function(event){
		calculadora.ReduceBoton(event.target);
	},

	eventoNormalBoton: function(event){
		calculadora.GrandeBoton(event.target);
	},
	
		ReduceBoton: function(elemento){
			var x = elemento.id;
			if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
				elemento.style.width = "30%";
				elemento.style.height = "60px";
			} else if(x=="mas") {
				elemento.style.width = "85%";
				elemento.style.height = "95%";
			} else {
			elemento.style.width = "20%";
			elemento.style.height = "60px";
			}
		},
	
		GrandeBoton: function(elemento){
			var x = elemento.id;
			if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
				elemento.style.width = "30%";
				elemento.style.height = "63px";
			} else if(x=="mas") {
				elemento.style.width = "90%";
				elemento.style.height = "100%";
			} else {
			elemento.style.width = "22%";
			elemento.style.height = "63px";
			}
		},
	
	asignarEventosaFuncion: function(){
		document.getElementById("0").addEventListener("click", function() {calculadora.ingresoNumero("0");});
		document.getElementById("1").addEventListener("click", function() {calculadora.ingresoNumero("1");});
		document.getElementById("2").addEventListener("click", function() {calculadora.ingresoNumero("2");});
		document.getElementById("3").addEventListener("click", function() {calculadora.ingresoNumero("3");});
		document.getElementById("4").addEventListener("click", function() {calculadora.ingresoNumero("4");});
		document.getElementById("5").addEventListener("click", function() {calculadora.ingresoNumero("5");});
		document.getElementById("6").addEventListener("click", function() {calculadora.ingresoNumero("6");});
		document.getElementById("7").addEventListener("click", function() {calculadora.ingresoNumero("7");});
		document.getElementById("8").addEventListener("click", function() {calculadora.ingresoNumero("8");});
		document.getElementById("9").addEventListener("click", function() {calculadora.ingresoNumero("9");});
		document.getElementById("on").addEventListener("click", function() {calculadora.borrarPantalla();});
		document.getElementById("sign").addEventListener("click", function() {calculadora.cambiarSigno();});
		document.getElementById("punto").addEventListener("click", function() {calculadora.ingresoDecimal();});
		document.getElementById("igual").addEventListener("click", function() {calculadora.verResultado();});
		document.getElementById("raiz").addEventListener("click", function() {calculadora.ingresoOperacion("raiz");});
		document.getElementById("dividido").addEventListener("click", function() {calculadora.ingresoOperacion("/");});
		document.getElementById("por").addEventListener("click", function() {calculadora.ingresoOperacion("*");});
		document.getElementById("menos").addEventListener("click", function() {calculadora.ingresoOperacion("-");});
		document.getElementById("mas").addEventListener("click", function() {calculadora.ingresoOperacion("+");});
	},
	
	borrarPantalla: function(){ 
	    this.valorPantalla = "0";
		this.operacion = "";
		this.primeroValor = 0;
		this.segundoValor = 0;
		this.resultado = 0;
		this.Operacion = "";
		this.auxTeclaIgual = false;
		this.ultimoValor = 0;
		this.updatePantalla();
	},
	
	cambiarSigno: function(){
		if (this.valorPantalla !="0") {
			var aux;
			if (this.valorPantalla.charAt(0)=="-") {
				aux = this.valorPantalla.slice(1);
			}	else {
				aux = "-" + this.valorPantalla;
			}
		this.valorPantalla = "";
		this.valorPantalla = aux;
		this.updatePantalla();
		}
	},
	
	ingresoDecimal: function(){
		if (this.valorPantalla.indexOf(".")== -1) {
			if (this.valorPantalla == ""){
				this.valorPantalla = this.valorPantalla + "0.";
			} else {
				this.valorPantalla = this.valorPantalla + ".";
			}
			this.updatePantalla();
		}
	},
	
	ingresoNumero: function(valor){
		if (this.valorPantalla.length < 8) {
		
			if (this.valorPantalla=="0") {
				this.valorPantalla = "";
				this.valorPantalla = this.valorPantalla + valor;
			} else {
				this.valorPantalla = this.valorPantalla + valor;
			}
		this.updatePantalla();
		}
	},
	
	ingresoOperacion: function(oper){
		this.primeroValor = parseFloat(this.valorPantalla);
		this.valorPantalla = "";
		this.operacion = oper;
		this.auxTeclaIgual = false;
		this.updatePantalla();
	},
	
	verResultado: function(){

		if(!this.auxTeclaIgual){ 
			this.segundoValor = parseFloat(this.valorPantalla);
			this.ultimoValor = this.segundoValor;
			this.realizarOperacion(this.primeroValor, this.segundoValor, this.operacion);
		
		} else {
			this.realizarOperacion(this.primeroValor, this.ultimoValor, this.operacion);
		}
	
		this.primeroValor = this.resultado;
		this.valor = "";
	
		if (this.resultado.toString().length < 9){
			this.valorPantalla = this.resultado.toString();
		} else {
			this.valorPantalla = this.resultado.toString().slice(0,8) + "...";
		}
	
		this.auxTeclaIgual = true;		
		this.updatePantalla();
	
	},
	
	realizarOperacion: function(primeroValor, segundoValor, operacion){
		switch(operacion){
			case "+": 
				this.resultado = eval(primeroValor + segundoValor);
			break;
			case "-": 
				this.resultado = eval(primeroValor - segundoValor);
			break;
			case "*": 
				this.resultado = eval(primeroValor * segundoValor);
			break;
			case "/": 
				this.resultado = eval(primeroValor / segundoValor);
			break;
			case "raiz":
				this.resultado = eval(Math.sqrt(primeroValor));
		}
	},
	
	updatePantalla: function(){
		this.pantalla.innerHTML = this.valorPantalla;
	}
	
};

calculadora.init();