const fsPromises = require("fs/promises");
const fs = require("fs");
const { errorListener } = require("../events/errorListener");

const file = "textLogDev.txt";

const checkLog = async (log) => {
  try {
    const dataLog = await fsPromises.readFile(file, "utf-8");
    const lines = dataLog.split("\n");
    
    const found = lines.some(line => line.includes(log));

    return found;
  } catch (error) {
    return false;
  }
}

async function logSpecial(log,isShow = 0) {  
  const isDevelopment = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
  
  if(isDevelopment) {
      const now = new Date();
      const timestamp = now.toLocaleString('ru-RU', {
        year: 'numeric',
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      const logWithTimestamp = `[${timestamp}] ${log}`;
      
      const isWas = await checkLog(log);
      
      if (isWas) {
        console.log(`Лог "${log}" уже существует, пропускаем`);
        return; 
      }
      
      try {
        await fsPromises.access(file);
        await fsPromises.appendFile(file, logWithTimestamp + "\n\n", "utf-8"); 
      } catch (e) {
        console.log(`\n ---[создаю файл ${file}]`);
        await fsPromises.writeFile(file, logWithTimestamp + "\n\n", "utf-8");
      }
      finally {
        console.log("\n ---[лог записан]");
      }
  } else {
    if(isShow) console.log(log);
  }
}

async function getLogs(count) {

  try {
    await fsPromises.access(file);
  } catch (error) {
    try {
      await fsPromises.writeFile(file, '', 'utf-8');
      return [];
    } catch (createError) {
      throw createError;
    }
  }

  return new Promise((resolve, reject) => {
    const logs = [];
    let buffer = '';

    const streamRead = fs.createReadStream(file, "utf-8");
    
    streamRead.on("data", (data) => {
      buffer += data;
      const lines = buffer.split('\n\n');
      buffer = lines.pop() || '';

      for (let i = 0; i < lines.length && logs.length < count; i++) {
        const line = lines[i].trim();
        if (line) { 
          logs.push(line);
        }
      }

      if (logs.length >= count) {
        streamRead.destroy();
        resolve(logs);
      }
    });

    streamRead.on("error", (error) => {
      errorListener.emit("error", error);
      reject(error);
    });
  });
}

module.exports = {
  logSpecial,
  getLogs
}