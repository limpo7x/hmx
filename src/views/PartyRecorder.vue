<template>
  <main class="party-page">
    <section class="party-hero party-panel">
      <div class="party-bg" aria-hidden="true"></div>
      <div class="page-flow" aria-hidden="true">
        <i class="flow-node node-a"></i>
        <i class="flow-node node-b"></i>
        <i class="flow-node node-c"></i>
      </div>
      <div class="party-shell hero-grid">
        <div class="hero-copy">
          <div class="brand-lockup">
            <img src="/party-recorder/app-icon.png" alt="聚会记录大师 Logo" />
            <span class="comic-label">微信小程序专题</span>
          </div>
          <h1>聚会记录大师</h1>
          <p>从开局、拍照、视频、账本到时间线回忆，把一场聚会整理成可以保存和分享的漫画长卷。</p>
          <div class="hero-actions">
            <a href="#party-qr" class="comic-button">扫码体验</a>
            <a href="#party-timeline" class="comic-button ghost">看功能</a>
          </div>
        </div>

        <div class="hero-guide" aria-label="聚会记录大师卡通记录官导览">
          <div class="guide-figure">
            <img class="topic-guide-mascot" src="/party-recorder/app-icon-guide.png" alt="聚会记录大师卡通记录官" />
            <span class="guide-nameplate">聚会记录官</span>
          </div>
          <div class="topic-guide-bubble">跟着我走：先开一局，拍下照片和视频，再让时间线自动整理成可分享回忆。</div>
          <div class="topic-guide-route">
            <b>开局</b>
            <b>记录</b>
            <b>整理</b>
            <b>扫码分享</b>
          </div>
          <img class="memory-preview" src="/party-recorder/party-hero.png" alt="朋友聚会举杯场景" />
        </div>
      </div>
    </section>

    <section class="party-panel feature-panel">
      <div class="story-ribbon" aria-hidden="true"></div>
      <div class="party-shell comic-spread">
        <article class="comic-frame large">
          <span class="frame-index">01</span>
          <h2>三步开局，不让气氛等人</h2>
          <p>创建聚会、邀请好友、拍下第一张照片，主流程围绕真实聚会记录展开，不把入口藏进复杂菜单。</p>
          <div class="mini-flow">
            <b>创建</b>
            <b>邀请</b>
            <b>记录</b>
          </div>
        </article>

        <article class="comic-frame camera-frame">
          <img src="/party-recorder/comic-camera.png" alt="聚会拍照记录插画" />
          <i class="mini-character">摄影手</i>
          <strong>拍照即记录</strong>
          <p>现场照片进入本局相册，也能成为分享图素材。</p>
        </article>

        <article class="comic-frame">
          <span class="frame-index">02</span>
          <h3>每个成员都能加入</h3>
          <p>好友通过邀请进入同一场聚会，查看记录、相册、账本和分享内容。</p>
          <div class="crew-stack" aria-hidden="true">
            <b>记</b>
            <b>拍</b>
            <b>玩</b>
          </div>
        </article>
      </div>
    </section>

    <section id="party-timeline" class="party-panel timeline-panel">
      <div class="party-shell timeline-grid">
        <div class="timeline-copy">
          <span class="comic-label">时间线能力</span>
          <h2>把混乱的一晚，自动排成回忆时间线</h2>
          <p>照片、视频、账本变动、关键文案、分享图生成状态都按时间串起来。结束后不是一堆散图，而是一段可回看的故事。</p>
        </div>

        <div class="timeline-board">
          <div v-for="item in timelineItems" :key="item.time" class="timeline-card">
            <time>{{ item.time }}</time>
            <strong>{{ item.title }}</strong>
            <span>{{ item.desc }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="party-panel media-panel">
      <div class="party-shell media-grid">
        <article class="media-card video">
          <span>VIDEO</span>
          <h2>视频图文一起收进相册</h2>
          <p>支持照片与视频节点，适合记录开场、互动、祝福、精彩瞬间和聚会结尾。</p>
          <i class="media-person">视频记录员</i>
        </article>

        <article class="media-card album">
          <span>ALBUM</span>
          <h2>从现场素材生成分享图</h2>
          <p>分享预览基于真实照片、账本和时间线生成，底部附小程序二维码，方便好友回流。</p>
          <i class="media-person">相册整理员</i>
        </article>

        <article class="media-card ledger">
          <span>LEDGER</span>
          <h2>账本事件也进入回忆</h2>
          <p>聚会账本不再是孤立工具，变动会写入时间线，成为聚会过程的一部分。</p>
          <i class="media-person">账本监督员</i>
        </article>
      </div>
    </section>

    <section id="party-qr" class="party-panel qr-panel">
      <div class="party-shell qr-grid">
        <div class="qr-copy">
          <span class="comic-label">小程序入口</span>
          <h2>扫码打开聚会记录大师</h2>
          <p>适合饭局、同学会、团建、生日局和临时聚会。先开一局，再把过程交给时间线保存。</p>
          <router-link to="/" class="comic-button ghost dark">返回官网首页</router-link>
        </div>

        <div class="qr-card">
          <img class="qr-logo" src="/party-recorder/app-icon.png" alt="聚会记录大师 Logo" />
          <img class="qr-image" src="/party-recorder/miniapp-code.jpg" alt="聚会记录大师小程序二维码" />
          <strong>微信扫码体验</strong>
          <span>扫描进入聚会记录小程序</span>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
const timelineItems = [
  { time: "19:30", title: "创建聚会", desc: "发起人开局并邀请好友加入" },
  { time: "19:42", title: "第一张照片", desc: "现场照片进入聚会相册" },
  { time: "20:18", title: "视频记录", desc: "精彩片段成为时间线节点" },
  { time: "21:05", title: "账本变动", desc: "费用和互动事件同步记录" },
  { time: "22:10", title: "生成分享图", desc: "真实素材生成可保存回忆海报" }
]
</script>

<style scoped>
.party-page { color: #16110F; background: #FFF9D7; overflow: hidden; }
.party-shell { width: min(1180px, calc(100% - 40px)); margin: 0 auto; }
.party-panel { position: relative; min-height: 100svh; display: flex; align-items: center; padding: 94px 0; overflow: hidden; }
.party-bg { position: absolute; inset: 0; background: radial-gradient(circle at 12% 18%, rgba(255, 71, 87, 0.24), transparent 24%), radial-gradient(circle at 82% 10%, rgba(0, 201, 255, 0.28), transparent 26%), linear-gradient(135deg, #FFF24D 0%, #FF8F3D 45%, #12D0FF 100%); }
.party-bg::before { content: ""; position: absolute; inset: 0; opacity: 0.24; background-image: linear-gradient(135deg, #111 12%, transparent 12%, transparent 50%, #111 50%, #111 62%, transparent 62%); background-size: 18px 18px; mix-blend-mode: multiply; animation: comic-stripes 18s linear infinite; }
.page-flow { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.page-flow::before { content: ""; position: absolute; left: 6%; top: 24%; width: 88%; height: 54%; border-top: 7px solid rgba(22, 17, 15, 0.52); border-right: 7px solid rgba(22, 17, 15, 0.36); border-bottom: 7px solid rgba(255, 255, 255, 0.72); border-radius: 54% 46% 52% 48%; transform: rotate(-7deg); }
.flow-node { position: absolute; width: 18px; height: 18px; border: 3px solid #16110F; border-radius: 50%; background: #EF3340; box-shadow: 4px 4px 0 #16110F; }
.node-a { left: 8%; top: 32%; animation: page-flow-a 5.5s linear infinite; }
.node-b { right: 16%; top: 28%; background: #52E2FF; animation: page-flow-b 6.4s linear infinite; }
.node-c { left: 42%; bottom: 18%; background: #CCFF1A; animation: page-flow-c 7s linear infinite; }
.hero-grid { position: relative; display: grid; grid-template-columns: 0.82fr 1.18fr; gap: 48px; align-items: center; }
.brand-lockup { display: flex; align-items: center; gap: 14px; margin-bottom: 18px; }
.brand-lockup img { width: 72px; height: 72px; border: 3px solid #16110F; border-radius: 20px; background: #FFFFFF; box-shadow: 5px 5px 0 #16110F; animation: character-bob 4s ease-in-out infinite; }
.comic-label { display: inline-flex; width: fit-content; margin-bottom: 18px; padding: 8px 14px; border: 3px solid #16110F; border-radius: 8px; color: #16110F; background: #FFFFFF; box-shadow: 5px 5px 0 #16110F; font-size: 14px; font-weight: 900; }
.brand-lockup .comic-label { margin-bottom: 0; }
.hero-copy h1 { margin: 0 0 22px; font-size: clamp(54px, 8vw, 116px); line-height: 0.95; font-weight: 950; letter-spacing: 0; text-shadow: 6px 6px 0 #FFFFFF, 10px 10px 0 rgba(22, 17, 15, 0.18); }
.hero-copy p, .timeline-copy p, .qr-copy p { max-width: 650px; margin: 0 0 30px; color: #3F352F; font-size: 20px; line-height: 1.75; font-weight: 700; }
.hero-actions { display: flex; flex-wrap: wrap; gap: 14px; }
.comic-button { display: inline-flex; align-items: center; justify-content: center; min-height: 52px; padding: 0 28px; border: 3px solid #16110F; border-radius: 8px; color: #FFFFFF; background: #EF3340; box-shadow: 6px 6px 0 #16110F; font-weight: 900; transition: transform 0.22s ease, box-shadow 0.22s ease; }
.comic-button:hover { transform: translate(-2px, -2px); box-shadow: 8px 8px 0 #16110F; }
.comic-button.ghost { color: #16110F; background: #FFFFFF; }
.comic-button.dark { color: #FFFFFF; background: #16110F; box-shadow: 6px 6px 0 #FFCC33; }
.hero-guide { position: relative; min-height: 610px; padding: 18px; border: 4px solid #16110F; border-radius: 20px; background: #FFFFFF; box-shadow: 12px 12px 0 #16110F; transform: rotate(1.2deg); animation: comic-float 5.2s ease-in-out infinite; overflow: hidden; }
.hero-guide::before { content: ""; position: absolute; inset: 18px; border: 5px dashed rgba(22, 17, 15, 0.32); border-radius: 50%; animation: guide-orbit 8s linear infinite; }
.guide-figure { position: absolute; z-index: 2; left: 50%; top: 48%; width: min(72%, 470px); transform: translate(-50%, -50%); text-align: center; }
.topic-guide-mascot { display: block; width: 100%; border: 6px solid #16110F; border-radius: 52px; background: #FFFFFF; box-shadow: 14px 14px 0 #16110F; animation: guide-mascot-bounce 4.6s ease-in-out infinite; }
.guide-nameplate { display: inline-flex; align-items: center; justify-content: center; min-height: 44px; margin-top: -14px; padding: 0 18px; border: 3px solid #16110F; border-radius: 999px; color: #16110F; background: #FFEF5A; box-shadow: 5px 5px 0 #16110F; font-weight: 950; }
.topic-guide-bubble { position: absolute; z-index: 3; right: 24px; top: 24px; max-width: 330px; padding: 16px 18px; border: 4px solid #16110F; border-radius: 18px; color: #16110F; background: #FFFFFF; box-shadow: 7px 7px 0 #16110F; font-size: 18px; line-height: 1.45; font-weight: 950; }
.topic-guide-bubble::after { content: ""; position: absolute; left: 42px; bottom: -19px; width: 28px; height: 28px; border-right: 4px solid #16110F; border-bottom: 4px solid #16110F; background: #FFFFFF; transform: rotate(45deg); }
.topic-guide-route { position: absolute; z-index: 4; left: 24px; right: 24px; bottom: 22px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.topic-guide-route::before { content: ""; position: absolute; left: 7%; right: 7%; top: 50%; z-index: -1; height: 6px; border: 2px solid #16110F; border-radius: 999px; background: #EF3340; transform: translateY(-50%); }
.topic-guide-route b { display: inline-flex; align-items: center; justify-content: center; min-height: 54px; padding: 0 10px; border: 3px solid #16110F; border-radius: 999px; color: #16110F; background: #FFFFFF; box-shadow: 5px 5px 0 #16110F; font-size: 16px; }
.topic-guide-route b:nth-child(2) { background: #FFEF5A; }
.topic-guide-route b:nth-child(3) { background: #FFB0D7; }
.topic-guide-route b:nth-child(4) { background: #52E2FF; }
.memory-preview { position: absolute; z-index: 1; left: 22px; bottom: 96px; width: 220px; height: 128px; object-fit: cover; border: 4px solid #16110F; border-radius: 12px; box-shadow: 7px 7px 0 #16110F; transform: rotate(-5deg); }
.mini-character, .media-person { display: inline-flex; align-items: center; justify-content: center; min-height: 38px; padding: 0 13px; border: 3px solid #16110F; border-radius: 999px; color: #16110F; background: #FFFFFF; box-shadow: 4px 4px 0 #16110F; font-style: normal; font-weight: 950; }
.feature-panel { background: #FFF9D7; }
.story-ribbon { position: absolute; left: 5%; right: 5%; top: 50%; height: 34%; border-top: 7px solid rgba(239, 51, 64, 0.55); border-radius: 50% 50% 0 0; transform: rotate(4deg); pointer-events: none; }
.story-ribbon::after { content: ""; position: absolute; right: 14%; top: -14px; width: 22px; height: 22px; border: 3px solid #16110F; border-radius: 50%; background: #EF3340; box-shadow: 4px 4px 0 #16110F; animation: ribbon-runner 4.6s ease-in-out infinite; }
.comic-spread { display: grid; grid-template-columns: 1.25fr 0.9fr 0.85fr; gap: 24px; align-items: stretch; }
.comic-frame { position: relative; min-height: 320px; padding: 30px; border: 4px solid #16110F; border-radius: 14px; background: #FFFFFF; box-shadow: 10px 10px 0 #16110F; overflow: hidden; }
.comic-frame.large { min-height: 520px; background: #FF6B4A; color: #FFFFFF; }
.comic-frame.large p { color: rgba(255, 255, 255, 0.88); }
.frame-index { display: block; margin-bottom: 26px; font-size: 58px; line-height: 1; font-weight: 950; }
.comic-frame h2, .timeline-copy h2, .media-card h2, .qr-copy h2 { margin: 0 0 20px; font-size: clamp(34px, 5vw, 64px); line-height: 1.05; font-weight: 950; letter-spacing: 0; }
.comic-frame h3 { margin: 0 0 16px; font-size: 30px; line-height: 1.16; font-weight: 950; }
.comic-frame p, .media-card p { margin: 0; color: #4C4038; font-size: 17px; line-height: 1.75; font-weight: 700; }
.camera-frame { display: flex; flex-direction: column; justify-content: end; background: #CCFF1A; }
.camera-frame img { position: absolute; inset: 0; width: 100%; height: 62%; object-fit: cover; border-bottom: 4px solid #16110F; }
.mini-character { position: absolute; right: 18px; top: 18px; background: #FFB0D7; animation: chip-drift 4s ease-in-out infinite; }
.camera-frame strong { margin-top: auto; font-size: 30px; font-weight: 950; }
.mini-flow { position: absolute; left: 30px; right: 30px; bottom: 30px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.mini-flow b { display: flex; align-items: center; justify-content: center; min-height: 58px; border: 3px solid #16110F; border-radius: 8px; color: #16110F; background: #FFFFFF; box-shadow: 4px 4px 0 #16110F; font-size: 18px; }
.crew-stack { position: absolute; left: 28px; right: 28px; bottom: 28px; display: flex; gap: 12px; }
.crew-stack b { display: inline-flex; align-items: center; justify-content: center; width: 52px; height: 52px; border: 3px solid #16110F; border-radius: 50%; color: #16110F; background: #52E2FF; box-shadow: 4px 4px 0 #16110F; font-size: 22px; }
.crew-stack b:nth-child(2) { background: #FFB0D7; }
.crew-stack b:nth-child(3) { background: #CCFF1A; }
.timeline-panel { background: #17C8FF; }
.timeline-grid { display: grid; grid-template-columns: 0.86fr 1.14fr; gap: 54px; align-items: center; }
.timeline-board { position: relative; display: grid; gap: 16px; }
.timeline-board::before { content: ""; position: absolute; top: 28px; bottom: 28px; left: 88px; width: 7px; border-radius: 99px; background: #16110F; }
.timeline-board::after { content: ""; position: absolute; left: 80px; top: 28px; width: 23px; height: 23px; border: 3px solid #16110F; border-radius: 50%; background: #EF3340; box-shadow: 4px 4px 0 #16110F; animation: timeline-runner 5.2s ease-in-out infinite; }
.timeline-card { position: relative; display: grid; grid-template-columns: 120px 1fr; gap: 12px 20px; align-items: center; min-height: 104px; padding: 18px 22px; border: 4px solid #16110F; border-radius: 14px; background: #FFFFFF; box-shadow: 8px 8px 0 #16110F; animation: timeline-pop 3.4s ease-in-out infinite; }
.timeline-card:nth-child(2n) { transform: translateX(28px); background: #FFF24D; animation-delay: 0.35s; }
.timeline-card:nth-child(3n) { background: #FFB0D7; animation-delay: 0.7s; }
.timeline-card time { font-size: 26px; font-weight: 950; }
.timeline-card strong { color: #16110F; font-size: 24px; font-weight: 950; }
.timeline-card span { grid-column: 2; color: #4C4038; font-weight: 700; }
.media-panel { background: #16110F; color: #FFFFFF; }
.media-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; grid-template-rows: 1fr 1fr; gap: 24px; }
.media-card { min-height: 280px; padding: 32px; border: 4px solid #FFFFFF; border-radius: 14px; box-shadow: 10px 10px 0 #FFCC33; overflow: hidden; }
.media-card { position: relative; }
.media-card span { display: block; margin-bottom: 28px; color: #16110F; font-size: 13px; font-weight: 950; }
.media-card p { color: rgba(22, 17, 15, 0.82); }
.media-card.video { grid-row: span 2; color: #16110F; background: linear-gradient(135deg, #52E2FF 0%, #FFF24D 100%); }
.media-card.album { color: #16110F; background: #FFB0D7; }
.media-card.ledger { color: #16110F; background: #FFFFFF; }
.media-person { position: absolute; right: 24px; bottom: 24px; background: #FFFFFF; }
.media-card.video .media-person { background: #FFB0D7; }
.media-card.album .media-person { background: #CCFF1A; }
.media-card.ledger .media-person { background: #52E2FF; }
.qr-panel { background: #FFF24D; }
.qr-grid { display: grid; grid-template-columns: 0.95fr 1.05fr; gap: 54px; align-items: center; }
.qr-card { justify-self: center; width: min(460px, 100%); padding: 24px; border: 5px solid #16110F; border-radius: 18px; background: #FFFFFF; box-shadow: 14px 14px 0 #16110F; text-align: center; animation: qr-pulse 3.6s ease-in-out infinite; }
.qr-logo { display: block; width: 92px; height: 92px; margin: -64px auto 16px; border: 4px solid #16110F; border-radius: 24px; background: #FFFFFF; box-shadow: 6px 6px 0 #16110F; }
.qr-image { display: block; width: 100%; margin-bottom: 18px; border: 3px solid #16110F; border-radius: 10px; }
.qr-card strong { display: block; margin-bottom: 8px; color: #16110F; font-size: 28px; font-weight: 950; }
.qr-card span { color: #5C514C; font-size: 14px; font-weight: 800; }
@keyframes comic-stripes { from { background-position: 0 0; } to { background-position: 160px 160px; } }
@keyframes comic-float { 0%, 100% { transform: rotate(1.5deg) translateY(0); } 50% { transform: rotate(-1deg) translateY(-14px); } }
@keyframes timeline-pop { 0%, 100% { translate: 0 0; } 50% { translate: 0 -8px; } }
@keyframes qr-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.025); } }
@keyframes character-bob { 0%, 100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-8px) rotate(2deg); } }
@keyframes chip-drift { 0%, 100% { translate: 0 0; } 50% { translate: 8px -7px; } }
@keyframes guide-orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes guide-mascot-bounce { 0%, 100% { transform: translateY(0) rotate(-2deg) scale(1); } 50% { transform: translateY(-14px) rotate(2deg) scale(1.03); } }
@keyframes page-flow-a { 0% { transform: translate(0, 0) scale(0.8); opacity: 0; } 12% { opacity: 1; } 52% { transform: translate(44vw, 30vh) scale(1); } 100% { transform: translate(84vw, 16vh) scale(0.8); opacity: 0; } }
@keyframes page-flow-b { 0% { transform: translate(0, 0) scale(0.8); opacity: 0; } 15% { opacity: 1; } 54% { transform: translate(-36vw, 24vh) scale(1); } 100% { transform: translate(-78vw, 36vh) scale(0.8); opacity: 0; } }
@keyframes page-flow-c { 0%, 100% { transform: translate(0, 0); opacity: 0.4; } 50% { transform: translate(18vw, -18vh); opacity: 1; } }
@keyframes ribbon-runner { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(-54vw); } }
@keyframes timeline-runner { 0% { top: 28px; } 100% { top: calc(100% - 52px); } }
@media (prefers-reduced-motion: reduce) {
  .party-bg::before, .hero-guide, .timeline-card, .qr-card, .flow-node, .story-ribbon::after, .timeline-board::after, .brand-lockup img, .topic-guide-mascot, .mini-character { animation: none; }
  .comic-button { transition: none; }
}
@media (max-width: 980px) {
  .party-panel { min-height: auto; padding: 84px 0; }
  .hero-grid, .comic-spread, .timeline-grid, .media-grid, .qr-grid { grid-template-columns: 1fr; }
  .media-card.video { grid-row: auto; }
  .hero-guide { transform: none; }
  .burst-card { position: static; max-width: none; margin-top: 12px; }
  .timeline-board::before { left: 30px; }
  .timeline-board::after { left: 22px; }
  .timeline-card, .timeline-card:nth-child(2n) { transform: none; grid-template-columns: 1fr; padding-left: 54px; }
  .timeline-card span { grid-column: auto; }
}
@media (max-width: 640px) {
  .party-shell { width: min(100% - 28px, 1180px); }
  .party-panel { padding: 72px 0; }
  .brand-lockup { align-items: flex-start; flex-direction: column; }
  .hero-copy h1 { font-size: 52px; }
  .hero-copy p, .timeline-copy p, .qr-copy p { font-size: 17px; }
  .comic-button { width: 100%; }
  .comic-frame, .media-card { min-height: auto; padding: 24px; }
  .comic-frame.large { min-height: 480px; }
  .camera-frame { min-height: 360px; }
  .hero-guide { min-height: 540px; }
  .guide-figure { width: min(86%, 360px); }
  .topic-guide-bubble { position: relative; right: auto; top: auto; max-width: none; margin: 0 6px 14px; }
  .topic-guide-bubble::after { display: none; }
  .topic-guide-route { grid-template-columns: 1fr 1fr; }
  .memory-preview { display: none; }
  .media-person { position: static; margin-top: 18px; }
  .mini-flow { grid-template-columns: 1fr; }
  .qr-card { box-shadow: 8px 8px 0 #16110F; }
}
</style>
