const ErrorListener = require("events");
const errorListener = new ErrorListener();

errorListener.on("error",(err) => {
    console.log(`!ОШИБКА! --> ${err}`);
})

module.exports = {
    errorListener
}
