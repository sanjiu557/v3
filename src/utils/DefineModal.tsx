import { ref,defineComponent } from "vue";
import { createApp } from "vue";
import type {ComponentPublicInstance} from 'vue'
import styles from "../styles/modal.module.scss"
interface  ModalProps {
  name : String;
  personList ?: Array<{name:string,age:number,sex:string}>;
  show:Boolean,
  width?:string, //宽度
  showFooter?:Boolean, //是否显示底部按钮
  showClose?:Boolean, //是否显示关闭按钮
}
const Modal = defineComponent(
   (props:ModalProps,{emit,slots})=>{ 
      const handleClose = ()=>{        
        emit('close')       
      }
      const confirm = ()=>{
        emit('confirm')
      }
  return ()=>(<>
  {props.show?
    <div class={[styles.modal,styles['flex_center']]} >
    <div class={[styles['modal-content'],styles['flex_center']]} style={{width: props.width ?? 'auto'}}>
       {slots.default ? slots.default() : 
       <>
       <div class={styles['modal-header']}>{slots.header && slots.header()}</div>
       <div class={styles['modal-body']}>{slots.body && slots.body()}</div>
       </>
       }
     
     {/* {slots.default && slots.default()}  */}
    <div class={[styles['modal-close'],props.showClose?false:styles.hide]} onClick={handleClose}></div>
    <div class={styles['modal-footer']}>    
    {(slots.footer && slots.footer()) ?? 
       props.showFooter?<button onClick={confirm}>确认</button>:''
       }
       </div>
 
    </div>
    </div>
    :false}

  
 
  </>)
    },{
props:['name','personList','show','showClose','width',"showFooter"],
emits:['confirm','close']
    }
)

const control = (modal:ComponentPublicInstance)=>{
  const root = document.createElement('div');
   const App =createApp(Modal)
  const show = ()=>{
    App.mount(root);
    document.body.appendChild(root);
  }
  const hide = ()=>{
     App.unmount()
     document.body.removeChild(root);
  }
  return {
    show,
    hide
  }
}

export default Modal;