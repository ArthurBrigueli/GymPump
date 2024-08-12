export const codeGenerate = ()=>{
    let numbers = '1234567890'
    let code = ''

    for (i=0; i<4; i++){
        const number = Math.floor(Math.random() * numbers.length)
        code += numbers[number]
    }


    return code
}