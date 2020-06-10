module.exports = function parseStringAsArray(arrayAsString){

    return arrayAsString.split(',').map(tech => tech.trim()); // serve pra receber o vetor de tecnlogias que informarem (até a virgula é uma posição), a parte do MAP 
                                                                        // serve pra caso o usuario dê espaços na hora de escrever, o trim serve pra tirar os espaços

}