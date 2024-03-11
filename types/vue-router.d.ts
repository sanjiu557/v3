import 'vue-router'

declare  module 'vue-router' {
 interface RouterMeta {
  isUser?: boolean;
 }
}
export  {}