import path from 'node:path'
import os from 'node:os'
import {exec,execSync} from 'child_process'
// console.log(path.dirname("D:\\workspace\\study\\v3\\node.js"));
// console.log(process)
// console.log(path.extname("node.js"))
//  console.log(os.cpus().length)
// console.log(os.platform());
// console.log(os.arch())
// console.log(os.hostname())
// console.log(os.homedir())
// console.log(os.networkInterfaces())
// console.log(os.tmpdir())

  // esm模式下用不了__dirname  可以使用cwd代替
  // process 直接挂载在globalthis上，所以不用引入，可以直接使用
console.log(process.cwd());
