var fs = require('fs')
module.exports = function (filePath, options, callback) {
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(err)
    let modifiedContent = content.toString()
    modifiedContent = modifiedContent.split(/\#\(|\)\#/g) //regex that detects '#(' or ')#'
    modifiedContent.forEach((block, index) => {
      if (index % 2 !== 0) {
        modifiedContent[index] = options[block]
      }
    })
    modifiedContent = modifiedContent.join('')

    modifiedContent = modifiedContent.split(/\$\(|\)\$/g) //regex that detects '$(' or ')$'
    modifiedContent.forEach((block, index) => {
      if (index % 2 !== 0) {
        modifiedContent[index] = eval(block) //eval() is where we get the "insecure" from in tie (terrible insecure engine) gets it's name
      }
    })
    modifiedContent = modifiedContent.join('')
    return callback(null, modifiedContent)
  })
}