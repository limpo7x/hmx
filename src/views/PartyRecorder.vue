<template>
  <main class="party-page">
    <section class="party-hero" aria-labelledby="party-title">
      <div class="comic-track" aria-hidden="true">
        <i class="track-dot track-dot-a"></i>
        <i class="track-dot track-dot-b"></i>
        <i class="track-dot track-dot-c"></i>
      </div>

      <div class="party-shell hero-layout">
        <div class="hero-copy">
          <router-link to="/" class="back-link">返回官网首页</router-link>

          <div class="brand-lockup">
            <img src="/party-recorder/app-icon.png" alt="聚会记录大师 Logo" />
            <span>活动专题</span>
          </div>

          <h1 id="party-title">聚会记录大师</h1>
          <p>把开局、照片、视频和时间线放进同一场活动里，让每一次相聚都能被完整保存、继续回看。</p>

          <div class="mobile-hero-panel" aria-hidden="true">
            <img src="/party-recorder/mascot/mascot-wave-phone.png" alt="" />
            <span>开始记录</span>
          </div>

          <div class="hero-actions" aria-label="专题操作">
            <button type="button" class="comic-button" @click="scrollToSection('party-flow')">查看记录流程</button>
            <button type="button" class="comic-button ghost" @click="scrollToSection('party-qr')">直接扫码体验</button>
          </div>
        </div>

        <div class="hero-stage" aria-label="聚会记录大师卡通记录官导览">
          <img
            class="hero-mascot"
            src="/party-recorder/mascot/mascot-wave-phone.png"
            alt="聚会记录大师卡通记录官挥手展示手机"
          />
          <div class="speech-bubble hero-bubble">
            让你的回忆有了归宿。
          </div>
        </div>
      </div>
    </section>

    <section id="party-flow" class="story-section" aria-labelledby="flow-title">
      <div class="party-shell">
        <div class="section-intro">
          <span class="comic-label">记录流程</span>
          <h2 id="flow-title">从开局到分享，让回忆有了归宿</h2>
          <p>现场只管继续玩，聚会记录大师会把照片、视频、账本变化和关键节点归到同一条时间线里。</p>
        </div>

        <div class="story-scenes">
          <article
            v-for="(scene, index) in storyScenes"
            :key="scene.title"
            :class="['story-scene', scene.tone, { reverse: index % 2 === 1 }]"
          >
            <div class="scene-copy">
              <span class="scene-index">{{ scene.step }}</span>
              <span class="scene-kicker">{{ scene.kicker }}</span>
              <h3>{{ scene.title }}</h3>
              <p>{{ scene.desc }}</p>
              <div class="scene-tags" aria-label="功能点">
                <b v-for="tag in scene.tags" :key="tag">{{ tag }}</b>
              </div>
            </div>

            <div class="scene-art">
              <img class="scene-mascot" :src="scene.mascot" :alt="scene.alt" />
              <div class="speech-bubble scene-bubble">{{ scene.bubble }}</div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="feature-section" aria-labelledby="feature-title">
      <div class="party-shell feature-layout">
        <div class="feature-heading">
          <span class="comic-label">活动价值</span>
          <h2 id="feature-title">把现场碎片整理成一条完整故事线</h2>
        </div>

        <div class="feature-board">
          <article v-for="feature in featureCards" :key="feature.title" class="feature-card">
            <span>{{ feature.label }}</span>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="party-qr" class="qr-panel" aria-labelledby="qr-title">
      <div class="party-shell qr-layout">
        <div class="qr-copy">
          <span class="comic-label">小程序入口</span>
          <h2 id="qr-title">扫一下，让记录官进入你的聚会现场</h2>
          <p>适合饭局、同学会、生日局、团建和临时聚会。先开一局，照片、视频和时间线都会有地方放。</p>
          <div class="qr-actions">
            <button type="button" class="comic-button ghost" @click="scrollToSection('party-flow')">再看一遍功能</button>
            <router-link to="/" class="comic-button dark">返回官网首页</router-link>
          </div>
        </div>

        <div class="qr-stage">
          <div class="qr-card">
            <img class="qr-logo" src="/party-recorder/app-icon.png" alt="聚会记录大师 Logo" />
            <img class="qr-image" src="/party-recorder/miniapp-code.jpg" alt="聚会记录大师小程序二维码" />
            <strong>微信扫码体验</strong>
            <span>进入聚会记录大师小程序</span>
          </div>

          <img
            class="qr-mascot"
            src="/party-recorder/mascot/mascot-celebrate.png"
            alt="聚会记录大师卡通记录官完成记录后庆祝"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
const storyScenes = [
  {
    step: "01",
    kicker: "先把局建起来",
    title: "我先替你开一场聚会",
    desc: "发起人创建聚会，成员通过邀请进入同一场记录。现场不用解释流程，大家只要开始拍、开始玩。",
    tags: ["创建聚会", "邀请成员", "手机端进入"],
    mascot: "/party-recorder/mascot/mascot-wave-phone.png",
    alt: "聚会记录大师卡通记录官挥手展示手机",
    bubble: "先开局，后面的回忆才有地方放。",
    tone: "start"
  },
  {
    step: "02",
    kicker: "照片先到位",
    title: "精彩瞬间集中保存",
    desc: "合影、举杯、游戏和祝福都能沉淀到同一场活动里。图片不再散在每个人的聊天记录中。",
    tags: ["照片上传", "活动相册", "成员可见"],
    mascot: "/party-recorder/mascot/mascot-camera-shot.png",
    alt: "聚会记录大师卡通记录官拿相机拍照",
    bubble: "这一张别丢，等会儿会进时间线。",
    tone: "camera"
  },
  {
    step: "03",
    kicker: "视频也要留下",
    title: "动作、声音和气氛，都能补上",
    desc: "视频适合记录祝酒词、小游戏、生日吹蜡烛和临场反应，图文之外的气氛不会断掉。",
    tags: ["短视频节点", "现场片段", "回忆补充"],
    mascot: "/party-recorder/mascot/mascot-video-record.png",
    alt: "聚会记录大师卡通记录官横屏录视频",
    bubble: "这段会动的，留给明天回看。",
    tone: "video"
  },
  {
    step: "04",
    kicker: "自动整理过程",
    title: "按时间线自动整理",
    desc: "照片、视频、账本变动和关键节点按发生顺序串起来，结束后看到的是一段完整故事。",
    tags: ["时间线", "节点排序", "回忆长卷"],
    mascot: "/party-recorder/mascot/mascot-timeline-guide.png",
    alt: "聚会记录大师卡通记录官指向时间线",
    bubble: "开场、高潮、收尾，我都排好了。",
    tone: "timeline"
  },
  {
    step: "05",
    kicker: "扫码回到现场",
    title: "分享图带着二维码一起出去",
    desc: "活动分享图可以带小程序二维码，好友看到后能直接回到这场聚会记录，不只是一张静态海报。",
    tags: ["分享海报", "二维码回流", "好友继续看"],
    mascot: "/party-recorder/mascot/mascot-qr-share.png",
    alt: "聚会记录大师卡通记录官展示二维码分享卡",
    bubble: "扫这里，回到这场聚会。",
    tone: "share"
  },
  {
    step: "06",
    kicker: "最后留下回忆",
    title: "聚会结束，故事还在",
    desc: "现场散场之后，照片、视频和时间线还能继续被查看、补充和分享，回忆不会只停在聊天窗口里。",
    tags: ["持续查看", "二次传播", "活动沉淀"],
    mascot: "/party-recorder/mascot/mascot-celebrate.png",
    alt: "聚会记录大师卡通记录官跳起庆祝",
    bubble: "收工，今天的回忆留下了。",
    tone: "finish"
  }
]

const featureCards = [
  {
    label: "开局",
    title: "用一场活动承接所有素材",
    desc: "不是临时相册，也不是聊天记录堆叠，而是从开局就有明确归属。"
  },
  {
    label: "记录",
    title: "图文和视频按现场节奏进入",
    desc: "现场只要继续玩，素材会跟着事件节点自然沉淀。"
  },
  {
    label: "整理",
    title: "时间线让回忆有顺序",
    desc: "从谁先到、什么时候合影，到最后分享，所有节点可以被重新浏览。"
  },
  {
    label: "转化",
    title: "二维码把传播带回小程序",
    desc: "分享图不是终点，扫码可以让更多人回到同一场聚会记录。"
  }
]

const scrollToSection = (id) => {
  const target = document.getElementById(id)
  if (!target) return

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" })
}
</script>

<style scoped>
.party-page {
  --ink: #16110f;
  --paper: #fff7c8;
  --white: #ffffff;
  --red: #ef3340;
  --blue: #32cdf9;
  --yellow: #ffeb45;
  --pink: #ff99c9;
  --lime: #ccff1a;
  --shadow: rgba(22, 17, 15, 0.24);
  color: var(--ink);
  background: var(--paper);
  overflow: hidden;
}

.party-shell {
  width: min(1180px, calc(100% - 40px));
  margin: 0 auto;
}

.party-hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  padding: 96px 0 70px;
  overflow: hidden;
  background:
    linear-gradient(120deg, rgba(255, 235, 69, 0.96) 0%, rgba(255, 153, 201, 0.9) 48%, rgba(50, 205, 249, 0.92) 100%);
}

.party-hero::before,
.story-section::before,
.qr-panel::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.16;
  background-image: radial-gradient(var(--ink) 2px, transparent 2px);
  background-size: 22px 22px;
}

.party-hero::after {
  content: "";
  position: absolute;
  inset: -18% -10% auto;
  height: 46%;
  pointer-events: none;
  background-image: repeating-linear-gradient(-16deg, rgba(22, 17, 15, 0.18) 0 8px, transparent 8px 24px);
  animation: stripe-run 18s linear infinite;
}

.comic-track {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.comic-track::before {
  content: "";
  position: absolute;
  left: 5%;
  right: 4%;
  top: 23%;
  height: 52%;
  border-top: 7px solid rgba(22, 17, 15, 0.62);
  border-right: 7px solid rgba(22, 17, 15, 0.28);
  border-bottom: 7px solid rgba(255, 255, 255, 0.82);
  border-radius: 48%;
  transform: rotate(-6deg);
}

.track-dot {
  position: absolute;
  z-index: 2;
  width: 20px;
  height: 20px;
  border: 3px solid var(--ink);
  border-radius: 999px;
  background: var(--red);
  box-shadow: 5px 5px 0 var(--ink);
}

.track-dot-a {
  left: 9%;
  top: 32%;
  animation: route-dot-a 5.8s linear infinite;
}

.track-dot-b {
  right: 15%;
  top: 29%;
  background: var(--blue);
  animation: route-dot-b 6.6s linear infinite;
}

.track-dot-c {
  left: 44%;
  bottom: 18%;
  background: var(--lime);
  animation: route-dot-c 7.4s linear infinite;
}

.hero-layout {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 0.86fr 1.14fr;
  gap: 48px;
  align-items: center;
}

.back-link {
  display: inline-flex;
  align-items: center;
  min-height: 38px;
  margin-bottom: 20px;
  padding: 0 14px;
  border: 3px solid var(--ink);
  border-radius: 8px;
  color: var(--ink);
  background: var(--white);
  box-shadow: 5px 5px 0 var(--ink);
  font-size: 14px;
  font-weight: 900;
  transition: transform 0.22s ease, box-shadow 0.22s ease;
}

.back-link:hover {
  transform: translate(-2px, -2px);
  box-shadow: 7px 7px 0 var(--ink);
}

.brand-lockup {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
}

.brand-lockup img {
  width: 76px;
  height: 76px;
  border: 4px solid var(--ink);
  border-radius: 8px;
  background: var(--white);
  box-shadow: 6px 6px 0 var(--ink);
  animation: mascot-bob 4.5s ease-in-out infinite;
}

.brand-lockup span,
.comic-label,
.scene-kicker,
.feature-card span {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  min-height: 36px;
  padding: 0 13px;
  border: 3px solid var(--ink);
  border-radius: 8px;
  color: var(--ink);
  background: var(--white);
  box-shadow: 5px 5px 0 var(--ink);
  font-size: 14px;
  font-weight: 950;
}

.hero-copy h1 {
  max-width: 680px;
  margin: 0 0 22px;
  font-size: 96px;
  line-height: 0.92;
  font-weight: 950;
  letter-spacing: 0;
  text-wrap: balance;
  text-shadow: 6px 6px 0 var(--white), 11px 11px 0 rgba(22, 17, 15, 0.18);
}

.hero-copy p,
.section-intro p,
.scene-copy p,
.feature-card p,
.qr-copy p {
  max-width: 650px;
  margin: 0;
  color: #463a33;
  font-size: 20px;
  line-height: 1.72;
  font-weight: 760;
  text-wrap: pretty;
}

.hero-actions,
.qr-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 30px;
}

.comic-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 54px;
  padding: 0 26px;
  border: 4px solid var(--ink);
  border-radius: 8px;
  color: var(--white);
  background: var(--red);
  box-shadow: 7px 7px 0 var(--ink);
  font: inherit;
  font-weight: 950;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
}

.comic-button:hover {
  transform: translate(-2px, -2px);
  box-shadow: 9px 9px 0 var(--ink);
}

.comic-button:active {
  transform: translate(1px, 1px);
  box-shadow: 4px 4px 0 var(--ink);
}

.comic-button.ghost {
  color: var(--ink);
  background: var(--white);
}

.comic-button.dark {
  color: var(--white);
  background: var(--ink);
  box-shadow: 7px 7px 0 var(--yellow);
}

.hero-stage {
  position: relative;
  min-height: 680px;
}

.mobile-hero-panel {
  display: none;
}

.hero-stage::before {
  content: "";
  position: absolute;
  left: 12%;
  right: -8%;
  top: 12%;
  bottom: 5%;
  border: 5px solid var(--ink);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.62);
  box-shadow: 13px 13px 0 var(--ink);
  transform: rotate(2.4deg);
}

.hero-stage::after {
  content: "";
  position: absolute;
  left: 2%;
  right: 7%;
  top: 6%;
  bottom: 12%;
  border: 5px dashed rgba(22, 17, 15, 0.34);
  border-radius: 48%;
  animation: orbit-spin 11s linear infinite;
}

.hero-mascot {
  position: absolute;
  z-index: 3;
  right: -2%;
  bottom: -20px;
  width: auto;
  height: min(700px, 108%);
  max-width: none;
  filter: drop-shadow(15px 17px 0 var(--shadow));
  animation: hero-mascot-float 4.8s ease-in-out infinite;
}

.speech-bubble {
  position: relative;
  z-index: 4;
  border: 4px solid var(--ink);
  border-radius: 8px;
  color: var(--ink);
  background: var(--white);
  box-shadow: 7px 7px 0 var(--ink);
  font-weight: 950;
}

.speech-bubble::after {
  content: "";
  position: absolute;
  width: 24px;
  height: 24px;
  border-right: 4px solid var(--ink);
  border-bottom: 4px solid var(--ink);
  background: inherit;
  transform: rotate(45deg);
}

.hero-bubble {
  position: absolute;
  right: 42%;
  top: 16%;
  max-width: 280px;
  padding: 17px 18px;
  font-size: 20px;
  line-height: 1.42;
  animation: bubble-pop 3.6s ease-in-out infinite;
}

.hero-bubble::after {
  left: 38px;
  bottom: -18px;
}

.story-section {
  position: relative;
  padding: 112px 0 118px;
  background: var(--paper);
}

.section-intro {
  position: relative;
  z-index: 2;
  max-width: 860px;
  margin-bottom: 56px;
}

.section-intro .comic-label,
.feature-heading .comic-label,
.qr-copy .comic-label {
  margin-bottom: 18px;
}

.section-intro h2,
.feature-heading h2,
.qr-copy h2 {
  margin: 0 0 18px;
  font-size: 60px;
  line-height: 1.04;
  font-weight: 950;
  letter-spacing: 0;
  text-wrap: balance;
}

.story-scenes {
  position: relative;
  z-index: 2;
  display: grid;
  gap: 58px;
}

.story-scenes::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 60px;
  bottom: 60px;
  z-index: -1;
  width: 8px;
  border: 2px solid var(--ink);
  border-radius: 99px;
  background: var(--red);
  transform: translateX(-50%);
}

.story-scene {
  position: relative;
  min-height: 76svh;
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 42px;
  align-items: center;
  padding: 46px;
  border: 5px solid var(--ink);
  border-radius: 8px;
  background: var(--white);
  box-shadow: 14px 14px 0 var(--ink);
  overflow: hidden;
}

.story-scene::before {
  content: "";
  position: absolute;
  right: -92px;
  bottom: -92px;
  width: 250px;
  height: 250px;
  border: 5px dashed rgba(22, 17, 15, 0.3);
  border-radius: 50%;
  animation: orbit-spin 10s linear infinite;
}

.story-scene.reverse {
  grid-template-columns: 1.05fr 0.95fr;
}

.story-scene.reverse .scene-copy {
  order: 2;
}

.story-scene.reverse .scene-art {
  order: 1;
}

.story-scene.start {
  background: #fffdf0;
}

.story-scene.camera {
  background: var(--blue);
}

.story-scene.video {
  background: var(--yellow);
}

.story-scene.timeline {
  background: var(--pink);
}

.story-scene.share {
  background: #ffffff;
}

.story-scene.finish {
  background: var(--lime);
}

.scene-copy,
.scene-art {
  position: relative;
  z-index: 2;
}

.scene-index {
  display: block;
  margin-bottom: 18px;
  color: rgba(22, 17, 15, 0.16);
  font-size: 104px;
  line-height: 0.84;
  font-weight: 950;
}

.scene-kicker {
  margin-bottom: 18px;
}

.scene-copy h3,
.feature-card h3 {
  margin: 0 0 16px;
  font-size: 44px;
  line-height: 1.08;
  font-weight: 950;
  letter-spacing: 0;
  text-wrap: balance;
}

.scene-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 26px;
}

.scene-tags b {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 15px;
  border: 3px solid var(--ink);
  border-radius: 999px;
  color: var(--ink);
  background: var(--white);
  box-shadow: 5px 5px 0 var(--ink);
  font-size: 14px;
  font-weight: 950;
}

.scene-art {
  min-height: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scene-art::before {
  content: "";
  position: absolute;
  inset: 12% 4% 8% 7%;
  border: 4px solid var(--ink);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.56);
  box-shadow: 10px 10px 0 rgba(22, 17, 15, 0.2);
  transform: rotate(-3deg);
}

.scene-mascot {
  position: relative;
  z-index: 2;
  width: min(480px, 100%);
  max-height: 560px;
  object-fit: contain;
  filter: drop-shadow(11px 13px 0 var(--shadow));
  animation: scene-mascot-float 4.8s ease-in-out infinite;
}

.story-scene.reverse .scene-mascot {
  animation-delay: 0.35s;
}

.scene-bubble {
  position: absolute;
  left: 10px;
  bottom: 32px;
  max-width: 300px;
  padding: 16px 18px;
  font-size: 18px;
  line-height: 1.45;
}

.story-scene.reverse .scene-bubble {
  left: auto;
  right: 10px;
}

.scene-bubble::after {
  right: 42px;
  top: -16px;
  border: 0;
  border-left: 4px solid var(--ink);
  border-top: 4px solid var(--ink);
}

.feature-section {
  position: relative;
  padding: 108px 0;
  color: var(--white);
  background:
    repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.045) 0 2px, transparent 2px 18px),
    var(--ink);
}

.feature-layout {
  display: grid;
  grid-template-columns: 0.74fr 1.26fr;
  gap: 44px;
  align-items: start;
}

.feature-heading {
  position: sticky;
  top: 96px;
}

.feature-heading h2 {
  color: var(--white);
  text-shadow: 5px 5px 0 rgba(239, 51, 64, 0.64);
}

.feature-board {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.feature-card {
  min-height: 250px;
  padding: 28px;
  border: 4px solid var(--white);
  border-radius: 8px;
  color: var(--ink);
  background: var(--yellow);
  box-shadow: 9px 9px 0 var(--red);
  transform: rotate(-1deg);
}

.feature-card:nth-child(2) {
  background: var(--blue);
  box-shadow-color: var(--yellow);
  transform: rotate(1.3deg);
}

.feature-card:nth-child(3) {
  background: var(--pink);
  box-shadow-color: var(--blue);
  transform: rotate(1deg);
}

.feature-card:nth-child(4) {
  background: var(--white);
  box-shadow-color: var(--lime);
  transform: rotate(-1.2deg);
}

.feature-card span {
  margin-bottom: 22px;
  box-shadow: 4px 4px 0 var(--ink);
}

.feature-card p {
  font-size: 17px;
}

.qr-panel {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  padding: 104px 0;
  overflow: hidden;
  background:
    linear-gradient(130deg, rgba(255, 235, 69, 0.96), rgba(255, 153, 201, 0.86) 56%, rgba(50, 205, 249, 0.9));
}

.qr-layout {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 48px;
  align-items: center;
}

.qr-stage {
  position: relative;
  min-height: 640px;
}

.qr-mascot {
  position: absolute;
  z-index: 2;
  right: -1%;
  bottom: 2%;
  width: min(290px, 40%);
  filter: drop-shadow(10px 12px 0 var(--shadow));
  animation: scene-mascot-float 4.6s ease-in-out infinite;
}

.qr-card {
  position: absolute;
  z-index: 3;
  left: 0;
  top: 50%;
  width: min(440px, 66%);
  padding: 22px;
  border: 5px solid var(--ink);
  border-radius: 8px;
  background: var(--white);
  box-shadow: 14px 14px 0 var(--ink);
  text-align: center;
  transform: translateY(-50%) rotate(1.5deg);
  animation: qr-card-float 4s ease-in-out infinite;
}

.qr-logo {
  display: block;
  width: 86px;
  height: 86px;
  margin: -58px auto 14px;
  border: 4px solid var(--ink);
  border-radius: 8px;
  background: var(--white);
  box-shadow: 6px 6px 0 var(--ink);
}

.qr-image {
  display: block;
  width: 100%;
  margin-bottom: 16px;
  border: 4px solid var(--ink);
  border-radius: 8px;
}

.qr-card strong,
.qr-card span {
  display: block;
}

.qr-card strong {
  margin-bottom: 8px;
  font-size: 28px;
  font-weight: 950;
}

.qr-card span {
  color: #5c514c;
  font-size: 14px;
  font-weight: 850;
}

@keyframes stripe-run {
  from { background-position: 0 0; }
  to { background-position: 180px 120px; }
}

@keyframes route-dot-a {
  0% { transform: translate(0, 0) scale(0.7); opacity: 0; }
  12% { opacity: 1; }
  55% { transform: translate(45vw, 30vh) scale(1); }
  100% { transform: translate(84vw, 12vh) scale(0.7); opacity: 0; }
}

@keyframes route-dot-b {
  0% { transform: translate(0, 0) scale(0.7); opacity: 0; }
  14% { opacity: 1; }
  54% { transform: translate(-37vw, 26vh) scale(1); }
  100% { transform: translate(-78vw, 37vh) scale(0.7); opacity: 0; }
}

@keyframes route-dot-c {
  0%, 100% { transform: translate(0, 0); opacity: 0.45; }
  50% { transform: translate(18vw, -18vh); opacity: 1; }
}

@keyframes mascot-bob {
  0%, 100% { transform: translateY(0) rotate(-2deg); }
  50% { transform: translateY(-8px) rotate(2deg); }
}

@keyframes hero-mascot-float {
  0%, 100% { transform: translateY(0) rotate(-1deg); }
  50% { transform: translateY(-18px) rotate(2deg); }
}

@keyframes scene-mascot-float {
  0%, 100% { transform: translateY(0) rotate(-1.5deg); }
  50% { transform: translateY(-14px) rotate(1.5deg); }
}

@keyframes orbit-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes bubble-pop {
  0%, 100% { transform: scale(1) rotate(1deg); }
  50% { transform: scale(1.035) rotate(-1deg); }
}

@keyframes qr-card-float {
  0%, 100% { transform: translateY(-50%) rotate(1.5deg); }
  50% { transform: translateY(calc(-50% - 10px)) rotate(-1deg); }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}

@media (max-width: 1080px) {
  .hero-layout,
  .qr-layout,
  .feature-layout {
    grid-template-columns: 1fr;
  }

  .hero-copy h1 {
    font-size: 76px;
  }

  .hero-stage,
  .qr-stage {
    min-height: 600px;
  }

  .hero-mascot {
    right: 0;
    height: min(660px, 106%);
    width: auto;
  }

  .story-scene,
  .story-scene.reverse {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .story-scene.reverse .scene-copy,
  .story-scene.reverse .scene-art {
    order: initial;
  }

  .story-scenes::before {
    left: 22px;
  }

  .feature-heading {
    position: relative;
    top: auto;
  }
}

@media (max-width: 720px) {
  .party-shell {
    width: min(100% - 28px, 1180px);
  }

  .party-hero,
  .qr-panel {
    min-height: auto;
    padding: 78px 0;
  }

  .brand-lockup {
    align-items: flex-start;
    flex-direction: column;
  }

  .hero-copy h1 {
    font-size: 50px;
    line-height: 1;
  }

  .section-intro h2,
  .feature-heading h2,
  .qr-copy h2 {
    font-size: 38px;
  }

  .scene-copy h3,
  .feature-card h3 {
    font-size: 30px;
  }

  .hero-copy p,
  .section-intro p,
  .scene-copy p,
  .feature-card p,
  .qr-copy p {
    font-size: 17px;
  }

  .hero-actions,
  .qr-actions,
  .feature-board {
    grid-template-columns: 1fr;
  }

  .hero-actions,
  .qr-actions {
    display: grid;
  }

  .comic-button {
    width: 100%;
    white-space: normal;
  }

  .hero-stage {
    display: none;
  }

  .mobile-hero-panel {
    position: relative;
    display: block;
    min-height: 300px;
    margin: 20px 0 18px;
    border: 4px solid var(--ink);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.62);
    box-shadow: 8px 8px 0 var(--ink);
    overflow: hidden;
  }

  .mobile-hero-panel::before {
    content: "";
    position: absolute;
    inset: 18px;
    border: 4px dashed rgba(22, 17, 15, 0.28);
    border-radius: 50%;
  }

  .mobile-hero-panel img {
    position: absolute;
    right: -18%;
    bottom: -10px;
    height: 318px;
    width: auto;
    filter: drop-shadow(9px 11px 0 var(--shadow));
  }

  .mobile-hero-panel span {
    position: absolute;
    left: 14px;
    top: 14px;
    display: inline-flex;
    min-height: 40px;
    align-items: center;
    padding: 0 13px;
    border: 3px solid var(--ink);
    border-radius: 8px;
    background: var(--white);
    box-shadow: 5px 5px 0 var(--ink);
    font-weight: 950;
  }

  .story-section,
  .feature-section {
    padding: 76px 0;
  }

  .story-scenes {
    gap: 34px;
  }

  .story-scene {
    padding: 26px;
    box-shadow: 8px 8px 0 var(--ink);
  }

  .scene-index {
    font-size: 70px;
  }

  .scene-art {
    min-height: 390px;
  }

  .scene-mascot {
    width: min(370px, 100%);
  }

  .scene-bubble,
  .story-scene.reverse .scene-bubble {
    left: 0;
    right: auto;
    bottom: 0;
    max-width: 260px;
    font-size: 16px;
  }

  .qr-stage {
    min-height: auto;
    display: grid;
    gap: 18px;
  }

  .qr-mascot {
    position: relative;
    right: auto;
    bottom: auto;
    justify-self: center;
    width: min(220px, 70%);
  }

  .qr-card {
    position: relative;
    left: auto;
    top: auto;
    justify-self: center;
    width: min(310px, 92%);
    transform: rotate(1deg);
    animation: none;
  }
}
</style>
