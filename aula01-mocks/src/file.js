const { readFile } = require('fs/promises')
const { error } = require('./constants')
const DEFAULT_OPTION = {
    maxLines: 3,
    fields: [ 'id', 'name', 'profession', 'age']
}
const { join } = require('path')

class File {
    static async csvJson(filePath){
        const content = await File.getFileContent(filePath)
        const validation = File.isValid(content)
        if(!validation.valid) new Error(validation.error)
    
        return content
    }

    static async getFileContent(filePath){
        const filename = join(__dirname, filePath)
        return (await readFile(filename)).toString('utf-8')
    }

    static async isValid(csvString, options = DEFAULT_OPTION) {
        const {header, ...fileWithouHeader} = csvString.split('\n')
        const isHeaderValid = header === options.fields.join(',')
        if(!isHeaderValid){
            return {
                error: error.FILE_FILDS_ERROR_MESSAGE,
                valid: false
            }
        }
    }
}

(async () => {
    // const result = await File.csvJson('./../mocks/threeItems-valid.csv')
    const result = await File.csvJson('./../mocks/fourItems-invalid.csv')
    console.log('result: ', result)
})()

/* function mostrar (){
    const path1 = join(__dirname, './../mocks/threeItems-valid.csv')
    console.log(path1)
}

mostrar() */