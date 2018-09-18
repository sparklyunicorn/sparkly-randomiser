const ud = require('urban-dictionary')
 
export default () => {
    return ud.random().then((result) => {
        return result;
      }).catch((error) => {
        console.error(error.message)
      })
}
