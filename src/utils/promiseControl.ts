const  promise = (promiseList:(()=>Promise<any>)[],limit:number,cb:Function) =>{
   const promises = promiseList.slice()
     
   const  superveneNums = Math.min(promiseList.length,limit)
    let  count = 0
  const runTask = () => {
    let i = 0 
    while(i < superveneNums) {
      middlewareRun()
    }
  } 
  const middlewareRun  = () => { 
    const task = promises.shift()
       task && run(task)
  }
  const run =async (task:()=>Promise<any>) => { 
    try {
      count++
      await task()    
    }
    catch (err) { 
  console.log(err);
  
    }finally {
   count--
     salve()
    }
  }
  const salve = () => {
    if(count<superveneNums && promiseList.length>0) {
      middlewareRun()
  } else if(count==0 && promiseList.length == 0 ) {
    cb && cb()
  }
 } 
 runTask()
}