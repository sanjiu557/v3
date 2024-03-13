<template>
  <div class="vsc-container bg-#1c1e27">
   <div class="header color-#a3acbc">
   <SvgIcon class="ml-8px" name="heroicons-outline:menu-alt-1" :size="25" color="currentColor"/>
   <span @click="openFilePicker">打开文件</span>
   <span class="ml-12px" @click="openDirectoryPicker">打开文件夹</span>
   </div>
   <div ref="directory" class="directory   overflow-auto flex">
<DirTree  :dirList="directoryList"/> 
<div class="resize-line w-3px"></div>
  </div>
   <div class="fileContent overflow-auto relative">
    <div class="absolute top-0 flex">
      <div v-for="(item,index) in openDirectoryList" @click="changeContent(item,index)" class="flex pt8px pb8px pl12px pr12px border-l border-t-0 border-b-0 border-r border-solid border-bluegray color-#8a8b8e">
        <div class=" ">{{ formatDirName(item.directory) }}</div>
       <SvgIcon @click="removeOpenDir(item,index)" name="material-symbols-light:close" class="ml8px" :size="16" color="#fff"/>
      </div>
    </div>
    <pre v-show="contentText" v-highlight class="h-100% m0 pt-20px box-border" >
      <code contenteditable="true" class="h-90%">
        {{ contentText }}
      </code>
    </pre>
   </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from 'S/components/SvgIcon.vue';
import DirTree from 'S/components/DirTree.vue';
import { ref,reactive,provide,onMounted,nextTick } from 'vue';
import type {Ref} from 'vue'
 interface IWindow extends Window {
  showOpenFilePicker: () => Promise<FileSystemFileHandle[]>;
  showDirectoryPicker: () => Promise<FileSystemDirectoryHandle>;
}

interface DirectoryList {
  name:string,isShow:boolean,kind:string,preName:string,children?:DirectoryList[]
}

const directory =ref<HTMLDivElement|undefined>()

const directoryList = ref<any[]>([])

const openDirectoryList = ref<any[]>([])

const currentIndex = ref<number>(0)

const worker = new Worker('src/utils/worker.js')

const contentText = ref<string>('')

const mousePosition = reactive({
  startX:0,
  moveX:0,
  endX:0,
})

const fileMap = new Map()


const handleMouseDown = (e:MouseEvent) =>{
  mousePosition.startX = e.clientX
  // document.body.addEventListener('mousemove',handleMouseMove)
  // document.body.addEventListener('mouseup',handleMouseUp)
}

const handleMouseMove = (e:MouseEvent) =>{
  console.log(e.target);
  
  if(e.target === e.currentTarget) {
    if(e.clientX<=0) {
    directory.value!.style.width = '0px'
  
    }
    mousePosition.moveX = e.clientX
    directory.value!.style.width = `${Math.abs(mousePosition.moveX - mousePosition.startX)}px`

  }
}
const handleMouseUp = (e:MouseEvent) =>{
  
  mousePosition.endX = e.clientX
  document.removeEventListener('mousemove',handleMouseMove)
}

const showContent =async (item:any)=>{

if(item.kind == 'file') {
  const file  =fileMap.get(`${item.name}/${item.kind}`)
  
  const text =await readText(file)
  // const text = await file.text()  // blob上的方法,总是以utf-8返回文件内容,fileReader可以指定格式
  contentText.value =text
}else {

}
  
}

const getFiles =async () =>{

const fileHandleList = await (window as unknown as IWindow).showOpenFilePicker()

return await Promise.all(fileHandleList.map(async (fileHandle)=>{
   const file = await fileHandle.getFile()
   const {name,kind} = fileHandle
   fileMap.set(`${name}/${kind}`,file)
    return {name,kind}
  }))

}

const readText = (file:File)=> {
  return new Promise<string>((resolve)=>{    
    const fileReader = new FileReader()
    fileReader.readAsArrayBuffer(file)
    fileReader.onload = (e) => {
      const blob = new Blob([e.target?.result as ArrayBuffer])
       if(blob) {
        fileReader.readAsText(blob)
        fileReader.onload = (e) => {
         resolve(e.target?.result as string)
        }
       }
    }

    
  })
  
}



const openFilePicker =async () => {
directoryList.value = await getFiles()
}

const getDirectory =async (directory:FileSystemDirectoryHandle,directoryName?:string) => {
  const res:any[] =[]
  const unless  =['.git','node_modules']
  for await (const handle of  directory.values()) {
    if(!unless.includes(handle.name)) {
      let result:DirectoryList= {name:handle.name,isShow:false,kind:handle.kind,preName:`${directoryName??''}/${handle.name}`}
      
       if(handle.kind === 'directory') {   
         
       result.children = await getDirectory(handle,result.preName)
    
       }else {
        fileMap.set(`${result.preName}/${result.kind}`,handle)
      }
      res.push(result) 
    }
  }
  
  return res
}


const openDirectoryPicker = async () => {
  const directoryHandle = await (window as unknown as IWindow).showDirectoryPicker()

  const directorys = await getDirectory(directoryHandle)

  directoryList.value = directorys
   
}

const formatDirName = (text:string) => text.split('/').at(-1)

const changeContent =(current:{directory:string,content:string},index:number) =>{
 contentText.value = current.content
 currentIndex.value = index
}

const removeOpenDir =async (current:{directory:string,content:string},curI:number)=> {
  const index = openDirectoryList.value.findIndex(item=>item.directory === current.directory)
  if(index===curI) return;
  openDirectoryList.value.splice(index,1)
  if(index>=1) {
    console.log(openDirectoryList.value[index-1]?.content);
    await nextTick()
    contentText.value =  openDirectoryList.value[index-1]?.content
  }else contentText.value = ''
}

const getText = async ({name,preName}:{name:string,preName:string}) => {
  //  worker.postMessage('name')
  const handle = fileMap.get(name)
  if(handle) {
    // const file = await handle.getFile()
    if(!openDirectoryList.value.includes(preName)) {
      const text = await readText(await handle.getFile())
      contentText.value = text
      openDirectoryList.value.push({directory:preName,content:text})
      currentIndex.value = openDirectoryList.value.length - 1
    }else {
      openDirectoryList.value.forEach((item,index)=>{
        if(item.directory === preName) {
          contentText.value = item.content
          currentIndex.value = index
        }
      })
    }

  }
  
}

const writeText = async (handler:FileSystemFileHandle,content:string)=>{
  const writable = await handler.createWritable()
  const result = await writable.write(content)
    writable.close()
}

const changeShowState =(select:{name:string,preName:string,state:boolean},list:any[] = directoryList.value) =>{

  list.forEach(item=>{
    if(item.name === select.name && item.preName === select.preName) {
      item.isShow = select.state
    }else {
      if(item.children?.length > 0) {
        changeShowState(select,item.children)
      }
    }
  })
}

provide('getContent',getText)
provide ('changeShowState',changeShowState)


 onMounted(() => {

 })

</script>

<style scoped lang="scss">
::-webkit-scrollbar {
  width: 10px;
  height: 10px;

}
::-webkit-scrollbar-thumb {
  background-color: #1e2129;
  border-radius: 5px;
  &:vertical {
   background-color: aquamarine; 
   opacity: 0.6;
  }
}
::-webkit-scrollbar-track {
  background-color: #272c36;
  border-radius: 5px;

}


.vsc-container{
  height: 100vh;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 40px 1fr;
  .header {
    background-color: #15171d;
    grid-column: 1/-1;
  }
  .directory {
    border-right: 1px solid #202328;
    &::-webkit-scrollbar {
  width: 0px;
}
.resize-line {
        &:hover {
          border-radius: 5px;
          cursor: col-resize;
          background: #f8f8f8;
          transform: all 0.5s;
        }
     }
  }
}
</style>