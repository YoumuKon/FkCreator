<script setup>
import { useRouter } from 'vue-router';
import Next from '@/components/icons/Next.vue';
import Puzzle from '@/components/icons/Puzzle.vue';
import PC from '@/components/icons/PC.vue';
import Community from '@/components/icons/Community.vue';

const router = useRouter();

const helpUrl = '';
const tiebaUrl = '';
const githubUrl = '';

const gotoUrl = (url) => {
  window.open(url, '_blank');
};
</script>

<template>
  <div class="container">
    <div class="content">
      <div class="image-preview">编辑器、游戏内对比图占位</div>
      <div class="intro">
        <div class="title">新月杀扩展包制作器</div>
        <div class="description">新月工坊专注于实现技能效果，让用户抛开代码门槛，探索DIY的无限可能！</div>
        <div class="button" @click="router.push('/mod')">
          <span class="label">开始制作</span>
          <span class="icon">
            <Next />
          </span>
        </div>
      </div>
      <div class="details">
        <div class="detail-item">
          <div class="title">
            <span class="icon">
              <Puzzle />
            </span>
            <span class="label">关于引擎</span>
          </div>
          <div class="description">新月工坊主要使用Blockly提供如同搭积木般的技能实现体验。同时，生成的代码均可在新月杀中运行，并且可将拓展包分发、或创建自己的DIY服务器联机游玩。</div>
        </div>
        <div class="detail-item">
          <div class="preview">积木与生成代码对比图占位</div>
        </div>
        <div class="detail-item">
          <div class="title">
            <span class="icon">
              <PC />
            </span>
            <span class="label">开始制作</span>
          </div>
          <div class="description">
            从创建第一个Mod开始吧！遵循自己的创意，向Mod中添加更多的包、武将、技能等，构造出属于自己的DIY包吧。
            <div class="link" @click="gotoUrl(helpUrl)">查看帮助文档</div>
          </div>
        </div>
        <div class="detail-item">
          <div class="title">
            <span class="icon">
              <Community />
            </span>
            <span class="label">加入社区</span>
          </div>
          <div class="description">
            新月工坊用户论坛以及QQ群内聚集着活跃的DIYer，大家会交流工具的使用方法，以及对DIY的思路看法等。现在就加入进来吧！
            <div class="link" @click="gotoUrl(tiebaUrl)">贴吧</div>
          </div>
        </div>
      </div>
      <div class="contribute">
        <div class="title">参与贡献</div>
        <div>新月工坊以及新月杀开发团队一直面临着一系列的挑战，并且涉及了多个领域的技术方向。不论你是职业程序员，还是最近才接触编程的新手，抑或是一名普通玩家，都可以为新月杀做出贡献。</div>
        <div class="link" @click="gotoUrl(githubUrl)">github主页</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: calc(100vh - 64px);
  overflow-y: scroll;
  overflow-x: hidden;
  font-size: 1.4em;
  color: var(--text-color-title);
}

.content {
  height: fit-content;
  min-width: 800px;
  width: 70vw;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding-bottom: 80px;
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.image-preview {
  width: 100%;
  height: 300px;
  background: linear-gradient(135deg, #97c5c5, #4ecdc4);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  color: white;
  animation: slideInRight 1s ease-in-out;
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.intro {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 3em 1em;
}

.intro .title {
  font-size: 34px;
  font-weight: bold;
  text-shadow:
    0 0 1px var(--text-color-title),
    0 0 1px var(--text-color-title),
    2px 2px 1px #7f8ee9,
    2px 2px 1px #7f8ee9,
    -2px -2px 1px #3fc2e9,
    -2px -2px 1px #3fc2e9;
}

.intro .description {
  font-size: 18px;
  margin-top: 10px;
  color: var(--text-color-remark);
}

.intro .button {
  margin-top: 20px;
  padding: 15px 25px;
  border: 3px solid #7d8de9;
  color: #7d8de9;
  fill: #7d8de9;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 22px;
  display: flex;
  align-items: center;
  box-shadow: 6px 6px 8px rgba(125, 141, 233, 0.5);
  text-shadow: 0 0 1px #7d8de9;
}

.intro .button:hover {
  background-color: #7d8de9;
  color: white;
  fill: white;
  box-shadow: 0 0 10px rgba(125, 141, 233, 0.7);
  transform: translateX(3px) translateY(3px);
}

.intro .button .icon {
  padding-left: 4px;
  vertical-align: middle;
  width: 24px;
  height: 24px;
  display: flex;
}

.details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  border: 1px solid var(--el-color-primary);
  padding: 20px;
  border-radius: 20px;
  height: 220px;
  transition: all 0.3s ease;
  cursor: pointer;
  background-color: rgba(74, 144, 226, 0.05);
  animation: zoomIn 1s ease-in-out;
  user-select: none;
}

@keyframes zoomIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.detail-item:hover {
  box-shadow: 2px 2px 4px #409eff66;
  transform: translateY(-5px);
}

.detail-item .title {
  font-size: 0.9em;
  color: var(--el-color-primary);
  text-shadow:
    0 0 1px var(--el-color-primary),
    0 0 1px var(--el-color-primary);
  display: flex;
  align-content: center;
}

.detail-item .title .icon {
  display: inline-block;
  width: 30px;
  height: 30px;
  padding-right: 6px;
  fill: var(--el-color-primary);
}

.detail-item .title .label {
  display: flex;
  align-items: center;
}

.detail-item .description {
  font-size: 0.7em;
  color: var(--text-color-remark);
  line-height: 1.5em;
  padding: 1em 0.3em;
}

.detail-item .link {
  margin-top: 10px;
  cursor: pointer;
  text-decoration: underline;
}

.detail-item .preview {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #97c5c5, #4ecdc4);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  color: white;
}

.contribute {
  margin-top: 20px;
  padding: 20px;
  line-height: 1.4em;
  border-radius: 20px;
  font-size: 0.7em;
  box-shadow:
    0 0 6px var(--selected-background-color),
    0 0 6px var(--selected-background-color),
    0 0 6px var(--selected-background-color);
  user-select: none;
  color: var(--text-color-remark);
}

.contribute .title {
  font-size: 1.2em;
  font-weight: bold;
  color: var(--el-color-primary);
  text-shadow:
    0 0 1px var(--el-color-primary),
    0 0 1px var(--el-color-primary);
  margin-bottom: 10px;
}

.contribute .link {
  margin-top: 10px;
  cursor: pointer;
  text-decoration: underline;
}

.link {
  color: var(--el-color-primary);
  transition: 0.3s;
  width: fit-content;
}

.link:hover {
  text-shadow: 0 0 1px #7f8ee9;
}
</style>
