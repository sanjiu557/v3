onmessage =async (e)=>{
const handler =  await navigator.storage.getDirectory()
console.log(e.data.handler);
}