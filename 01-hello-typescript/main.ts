var minhaVar = 'minha variavel';
function minhaFunc(x, y) {
    return x + y;
}
var num = 2;
var PI = 3.14;
var numeros = [1, 2, 3];
numeros.map(function (v) {
    return v + 1;
});
numeros.map(valor => valor * 2);

class Matematica{
    soma (x, y){
        return x+y;
    }
}