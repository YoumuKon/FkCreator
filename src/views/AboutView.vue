<template>
  <div class="container">
    <h1 style="color: #7f8ce9">关于我们</h1>
    <p>新月杀制作器意在对不懂编程者提供一个简洁的拓展包制作工具。</p>
    <h2 style="color: #3ec2e9">团队成员</h2>
    <ul>
      <li><strong>网站开发：</strong> <a href="https://github.com/Gxk96" target="_blank" style="color: #3ec2e9">Gxdord</a></li>
      <li><strong>美工：</strong> <a href="https://github.com" target="_blank" style="color: #3ec2e9">聆听</a></li>
      <li>
        <strong>新月杀技术支持：</strong> <a href="https://github.com/notify" target="_blank" style="color: #3ec2e9">notify</a>,
        <a href="https://github.com" target="_blank" style="color: #3ec2e9">Ralph</a>
      </li>
    </ul>
    <h2 style="color: #7f8ce9">加入我们</h2>
    <p>我们欢迎所有热爱游戏开发、设计和创新的人才加入我们的团队。无论是程序开发还是美术设计，甚至是为新月杀本身做出贡献，我们都期待着你的加入！</p>
  </div>
</template>

<style scoped>
.container {
  min-width: 800px;
  padding: 2em;
  width: 70vw;
  margin: 0 auto;
  height: calc(100vh - 64px);
  font-size: 1.1em;
  color: var(--text-color-title);
}

h1,
h2 {
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 15px;
}

a {
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: #7f8ce9;
}
</style>
