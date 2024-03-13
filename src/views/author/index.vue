

<template>
  <div class="relative">
    <header class="z-100 bg-#f4f6f9  transform-translate-x-0px  sticky top-0px w-100%">
      <div class="topBar  top-4px bg-#fff">
        <div class="bar-inner flex items-center max-w-1156px min-w-1000px  box-border">
          <el-image src="/src/assets/images/author/zhihu.png" fit="cover"
            class="w-116px h-50px cursor-pointer"></el-image>
          <div class="bar-tabs m-r-15px">
            <TabLine tab-margin="6px" :tab-list="TopBarList" pad="0px" text-color="#8491a5" />
          </div>

          <div class="bar-search flex-1 flex">
            <el-input>
              <template #suffix>
                <div class="i-mingcute:search-2-line w-1.3em h-1.3em"></div>
              </template>
            </el-input>
            <el-button type="primary" :round="true" class="m-l-12px">提问</el-button>

          </div>
          <div class="bar-userInfo flex items-center m-l-30px">
            <div class="info userInfo-msg">
              <div class="i-mingcute:notification-fill w-1.3em h-1.3em"></div>
              <div class="infoText">消息</div>
            </div>
            <div class="info userInfo-mail">
              <div class="i-mingcute:message-4-fill w-1.3em h-1.3em"></div>
              <div class="infoText">私信</div>
            </div>
            <DropDown :dropdownList="profileDrop" color="#8491a5">
              <el-image src="/src/assets/images/people/avator.jpg" fit="cover"
                class="w-30px h-30px border-rd-5px cursor-pointer m-l-8px" :lazy="true"></el-image>
            </DropDown>

          </div>
        </div>
      </div>
    </header>
    <div class="content flex">
      <div class="left content-card ">
        <el-card shadow="always" :body-style="{ padding: '20px' }">
          <template #header>
            <TabLine :tab-list="ContentBarList" default="recommend" tab-margin="12px" :show-line="false"
              active-color="#1772f6" @click-tab="(e: string) => $router.push({ path: `/author/${e}` })" />
          </template>
          <!-- card body -->
          <router-view></router-view>
        </el-card>
      </div>
      <div class="right  content-card flex-auto max-w-368px">
        <el-card shadow="always" :body-style="{ padding: '20px' }">
          <template #header>
            <div class="flex">
              <div class="flex-1 flex items-center  font-s-13">
                <SvgIcon name="mingcute:user-edit-fill" :size="16" />

                <span class="m-l-6px">创作中心</span>
              </div>
              <div class="flex-1 flex justify-end font-s-12 color-#8491a5">
                <span>草稿箱</span>
              </div>
            </div>
          </template>
          <div class="flex content-card-inner flex-col">
            <div class="flex justify-center">
              <button class="content-card-button flex flex-col justify-center items-center" v-for="item in iconList"
                :key="item.label" @click="">
                <SvgIcon :name="item.icon" :size="40" />
                <div class="font-s-12 m-t-2px">{{ item.label }}</div>
              </button>
            </div>

            <div class="createTip flex  items-center bg-#f9f9fa mt-12px">
              <div class="tipText flex-1">
                <div class="font-s-16">开启你的知乎创作之旅</div>
                <p class="break-after-all font-s-12 color-#8491a5">你可以通过知乎创作平台，发布你的知识、经验和见解，并与志同道合的人交流和分享。</p>
              </div>
              <el-image src="/src/assets/images/author/dog.png" fit="cover" class="w-61px h-60px p-l-6px"></el-image>

            </div>
            <el-button type="primary" plain>
              <SvgIcon name="mingcute:add-line" />
              <!-- <svg-icon name="mingcute:add-line"></svg-icon> -->
              开始创作
            </el-button>
            <!-- card body -->


          </div>
        </el-card>
        <el-card shadow="always" :body-style="{ padding: '20px' }" class="m-t-10px">
          <template #header>
            <div class="flex">
              <div class="flex-1 flex items-center  font-s-13">
                <SvgIcon name="mingcute:user-add-2-fill" :size="16" />
                <span class="m-l-6px">推荐关注</span>
              </div>
            </div>
          </template>
          <!-- card body -->
          <div class="recommend flex flex-col">
            <div class="recommend_item flex m-3px" v-for="i in 4">
              <div class="left flex-1 flex">
                <img src="/src/assets/images/author/recommend.png" alt="" class="w-38px h-38px m-3px">
                <div class="flex-1 m-3px">
                  <div class="recommend_item-title font-s-13">每日人物</div>
                  <div class="font-s-12 color-#8491a5 mt-3px">123</div>
                </div>
              </div>
              <el-button type="primary" size="default" plain>
                <SvgIcon name="mingcute:add-line" :size="16" />
                <span class="ml-4px">关注</span>
              </el-button>
            </div>
            <div class="recommend-bt-swiper flex  justify-center items-center color-#8491a5">
              <div class="cursor-pointer" @click="pageChange()">
                <SvgIcon name="bx:left-arrow" :size="12" />
              </div>
              <div class="m-l-12px m-r-12px font-s-12">
                {{ pageSize.current }}/{{ pageSize.pages }}
              </div>
              <div class="cursor-pointer" @click="pageChange(true)">
                <SvgIcon name="bx:right-arrow" :size="12" />
              </div>
            </div>
          </div>
        </el-card>
        <el-card shadow="always" :body-style="{ padding: '20px' }" class="m-t-10px">
          <div class="category grid gap-18px grid-cols-3 ">
            <div v-for="item in categoryList" class="category-item  grid justify-center content-center cursor-pointer"
              :style="{ color: item.color }">
              <div class="svgBox h-32px text-center">
                <SvgIcon :name="item.icon" :size="32" :color="item.color" />
              </div>
              <div class="category--desc mt-8px font-s-14 text-center color-#8491a5">
                <a :href="item.href" target="_blank" class="decoration-none color-current"><span>{{ item.desc
                }}</span></a>
              </div>
            </div>
          </div>
        </el-card>
        <el-card shadow="always" :body-style="{ padding: '0px' }" class="m-t-10px">
          <div class="flex flex-col color-#8491a5">
            <div class="flex items-center justify-between hover:bg-#f8f8fa p6px">
              <div class="flex items-center h-40px ">
                <SvgIcon name="bx:bxs-category" :size="20" class="m-r-10px" />
                <span class="font-s-14">分类</span>
              </div>
              <div class="bg-#f8f8fa p5px font-s-14">0</div>
            </div>
          </div>
        </el-card>

      </div>

    </div>
    <Modal :show="isModalShow">
      <template #header>123</template>
    </Modal>>
  </div>
</template>

<script setup lang="ts">
import TabLine from 'S/components/TabLine.vue';
import DropDown from 'S/components/DropDown.vue';
import SvgIcon from 'S/components/SvgIcon.vue'
import { ref, reactive } from 'vue';

const isModalShow = ref(false)
const TopBarList = [
  { name: '首页', label: 'index' },
  { name: '知乎知学堂', label: 'class' },
  { name: '发现', label: 'find' },
  { name: '等你来答', label: 'response' }
]
const ContentBarList = [
  { name: '关注', label: 'follow' },
  { name: '推荐', label: 'recommend' },
  { name: '热榜', label: 'hot' },
  { name: '视频', label: 'zvideo' }
]
const iconList = [
  { icon: 'tp', label: '回答问题' },
  { icon: 'video', label: '发视频' },
  { icon: 'write', label: '写文章' },
  { icon: 'think', label: '写想法' }
]
const profileDrop = ref([
  { icon: 'ri:user-3-fill', label: '我的主页', path: 'people' },
  { icon: 'ri:settings-4-fill', label: '设置', path: 'setting' },
  { icon: 'ri:question-answer-fill', label: '帮助中心', path: 'help' },
  { icon: 'wpf:shutdown', label: '退出' },

])
const categoryList = reactive([
  { icon: 'lets-icons:lightning-duotone', desc: 'live', color: '#ffcf00', href: 'https://www.zhihu.com/lives' },
  { icon: 'gridicons:book', desc: '书店', color: '#43d480', href: 'https://www.zhihu.com/pubs' },
  { icon: 'ion:flower-outline', desc: '圆桌', color: '#0066ff', href: 'https://www.zhihu.com/roundtable' },
  { icon: 'mage:pen', desc: '专栏', color: '#0f88eb', href: 'https://zhuanlan.zhihu.com' },
  { icon: 'ri:money-cny-box-fill', desc: '付费咨询', color: '#5478f0', href: 'https://www.zhihu.com/consult' },
  { icon: 'simple-icons:bookstack', desc: '百科', color: '#5868d1', href: 'https://www.zhihu.com/wiki' }
])
const pageSize = reactive({
  current: 1,
  pages: 3
})

const pageChange = (type: boolean = false) => {
  if (type) {
    if (pageSize.current >= pageSize.pages) {
      return;
    }
    pageSize.current++
  } else {
    if (pageSize.current <= 1) {
      return;
    }
    pageSize.current--
  }
}

</script>

<style scoped lang="scss">
$el-btn-primary-text-color: #409eff;

$el-btn-bg-color: '';

.topBar {
  .bar-inner {
    margin: 0 auto;
    padding: 0 40px 0 20px;

    .bar-userInfo {
      .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #8491a5;
        margin: 0 10px;

        .infoText {
          margin-top: 1px;
          font-size: 12px;
          font-weight: 550;

        }
      }
    }
  }
}

.bar-search :deep(.el-input__wrapper) {
  border-radius: 18px;
}

.recommend_item :deep(.el-button--primary),
.content-card-inner :deep(.el-button--primary) {

  color: $el-btn-primary-text-color;

  background-color: transparent;
}

.recommend_item :deep(.el-button--primary) {
  border: none;
  font-size: 12px;
  font-weight: 520;
}


.content {
  margin: 60px 15% 0;

  .left {
    flex: 2;
  }

  &-card {
    margin: 0 5px;

    &-inner {
      .createTip {
        padding: 20px 8px;

      }
    }

    &-button {
      margin: 0 3px;
      background: transparent;
      border: none;

    }

    .category-item:hover {
      .category--desc {
        color: currentColor !important;
      }
    }
  }
}</style>