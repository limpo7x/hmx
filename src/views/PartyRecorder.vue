<template>
  <main class="party-page">
    <section class="party-hero party-panel">
      <div class="party-bg" aria-hidden="true"></div>
      <div class="party-shell hero-grid">
        <div class="hero-copy">
          <span class="comic-label">微信小程序专题</span>
          <h1>聚会记录大师</h1>
          <p>从开局、拍照、视频、账本到时间线回忆，把一场聚会整理成可以保存和分享的漫画长卷。</p>
          <div class="hero-actions">
            <a href="#party-qr" class="comic-button">扫码体验</a>
            <a href="#party-timeline" class="comic-button ghost">看功能</a>
          </div>
        </div>

        <div class="hero-comic" aria-label="聚会记录大师漫画预览">
          <img src="/party-recorder/party-hero.png" alt="朋友聚会举杯场景" />
          <div class="burst-card primary">咔嚓！第一张照片进时间线</div>
          <div class="burst-card secondary">视频、账本、成员动态一起保存</div>
        </div>
      </div>
    </section>

    <section class="party-panel feature-panel">
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
          <strong>拍照即记录</strong>
          <p>现场照片进入本局相册，也能成为分享图素材。</p>
        </article>

        <article class="comic-frame">
          <span class="frame-index">02</span>
          <h3>每个成员都能加入</h3>
          <p>好友通过邀请进入同一场聚会，查看记录、相册、账本和分享内容。</p>
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
        </article>

        <article class="media-card album">
          <span>ALBUM</span>
          <h2>从现场素材生成分享图</h2>
          <p>分享预览基于真实照片、账本和时间线生成，底部附小程序二维码，方便好友回流。</p>
        </article>

        <article class="media-card ledger">
          <span>LEDGER</span>
          <h2>账本事件也进入回忆</h2>
          <p>聚会账本不再是孤立工具，变动会写入时间线，成为聚会过程的一部分。</p>
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
          <img src="/party-recorder/miniapp-code.png" alt="聚会记录大师小程序二维码" />
          <strong>微信扫码体验</strong>
          <span>二维码来源于聚会记录师项目真实小程序码素材</span>
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
.hero-grid { position: relative; display: grid; grid-template-columns: 0.82fr 1.18fr; gap: 48px; align-items: center; }
.comic-label { display: inline-flex; width: fit-content; margin-bottom: 18px; padding: 8px 14px; border: 3px solid #16110F; border-radius: 8px; color: #16110F; background: #FFFFFF; box-shadow: 5px 5px 0 #16110F; font-size: 14px; font-weight: 900; }
.hero-copy h1 { margin: 0 0 22px; font-size: clamp(54px, 8vw, 116px); line-height: 0.95; font-weight: 950; letter-spacing: 0; text-shadow: 6px 6px 0 #FFFFFF, 10px 10px 0 rgba(22, 17, 15, 0.18); }
.hero-copy p, .timeline-copy p, .qr-copy p { max-width: 650px; margin: 0 0 30px; color: #3F352F; font-size: 20px; line-height: 1.75; font-weight: 700; }
.hero-actions { display: flex; flex-wrap: wrap; gap: 14px; }
.comic-button { display: inline-flex; align-items: center; justify-content: center; min-height: 52px; padding: 0 28px; border: 3px solid #16110F; border-radius: 8px; color: #FFFFFF; background: #EF3340; box-shadow: 6px 6px 0 #16110F; font-weight: 900; transition: transform 0.22s ease, box-shadow 0.22s ease; }
.comic-button:hover { transform: translate(-2px, -2px); box-shadow: 8px 8px 0 #16110F; }
.comic-button.ghost { color: #16110F; background: #FFFFFF; }
.comic-button.dark { color: #FFFFFF; background: #16110F; box-shadow: 6px 6px 0 #FFCC33; }
.hero-comic { position: relative; padding: 18px; border: 4px solid #16110F; border-radius: 16px; background: #FFFFFF; box-shadow: 12px 12px 0 #16110F; transform: rotate(1.5deg); animation: comic-float 5.2s ease-in-out infinite; }
.hero-comic img { display: block; width: 100%; aspect-ratio: 16 / 9; object-fit: cover; border: 3px solid #16110F; border-radius: 10px; }
.burst-card { position: absolute; max-width: 260px; padding: 14px 16px; border: 3px solid #16110F; border-radius: 8px; background: #FFFFFF; box-shadow: 6px 6px 0 #16110F; font-size: 16px; font-weight: 900; }
.burst-card.primary { left: -22px; bottom: 26px; background: #FFEF5A; }
.burst-card.secondary { right: -18px; top: 26px; background: #52E2FF; }
.feature-panel { background: #FFF9D7; }
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
.camera-frame strong { margin-top: auto; font-size: 30px; font-weight: 950; }
.mini-flow { position: absolute; left: 30px; right: 30px; bottom: 30px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.mini-flow b { display: flex; align-items: center; justify-content: center; min-height: 58px; border: 3px solid #16110F; border-radius: 8px; color: #16110F; background: #FFFFFF; box-shadow: 4px 4px 0 #16110F; font-size: 18px; }
.timeline-panel { background: #17C8FF; }
.timeline-grid { display: grid; grid-template-columns: 0.86fr 1.14fr; gap: 54px; align-items: center; }
.timeline-board { position: relative; display: grid; gap: 16px; }
.timeline-board::before { content: ""; position: absolute; top: 28px; bottom: 28px; left: 88px; width: 7px; border-radius: 99px; background: #16110F; }
.timeline-card { position: relative; display: grid; grid-template-columns: 120px 1fr; gap: 12px 20px; align-items: center; min-height: 104px; padding: 18px 22px; border: 4px solid #16110F; border-radius: 14px; background: #FFFFFF; box-shadow: 8px 8px 0 #16110F; animation: timeline-pop 3.4s ease-in-out infinite; }
.timeline-card:nth-child(2n) { transform: translateX(28px); background: #FFF24D; animation-delay: 0.35s; }
.timeline-card:nth-child(3n) { background: #FFB0D7; animation-delay: 0.7s; }
.timeline-card time { font-size: 26px; font-weight: 950; }
.timeline-card strong { color: #16110F; font-size: 24px; font-weight: 950; }
.timeline-card span { grid-column: 2; color: #4C4038; font-weight: 700; }
.media-panel { background: #16110F; color: #FFFFFF; }
.media-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; grid-template-rows: 1fr 1fr; gap: 24px; }
.media-card { min-height: 280px; padding: 32px; border: 4px solid #FFFFFF; border-radius: 14px; box-shadow: 10px 10px 0 #FFCC33; overflow: hidden; }
.media-card span { display: block; margin-bottom: 28px; color: #16110F; font-size: 13px; font-weight: 950; }
.media-card p { color: rgba(22, 17, 15, 0.82); }
.media-card.video { grid-row: span 2; color: #16110F; background: linear-gradient(135deg, #52E2FF 0%, #FFF24D 100%); }
.media-card.album { color: #16110F; background: #FFB0D7; }
.media-card.ledger { color: #16110F; background: #FFFFFF; }
.qr-panel { background: #FFF24D; }
.qr-grid { display: grid; grid-template-columns: 0.95fr 1.05fr; gap: 54px; align-items: center; }
.qr-card { justify-self: center; width: min(460px, 100%); padding: 24px; border: 5px solid #16110F; border-radius: 18px; background: #FFFFFF; box-shadow: 14px 14px 0 #16110F; text-align: center; animation: qr-pulse 3.6s ease-in-out infinite; }
.qr-card img { display: block; width: 100%; margin-bottom: 18px; border: 3px solid #16110F; border-radius: 10px; }
.qr-card strong { display: block; margin-bottom: 8px; color: #16110F; font-size: 28px; font-weight: 950; }
.qr-card span { color: #5C514C; font-size: 14px; font-weight: 800; }
@keyframes comic-stripes { from { background-position: 0 0; } to { background-position: 160px 160px; } }
@keyframes comic-float { 0%, 100% { transform: rotate(1.5deg) translateY(0); } 50% { transform: rotate(-1deg) translateY(-14px); } }
@keyframes timeline-pop { 0%, 100% { translate: 0 0; } 50% { translate: 0 -8px; } }
@keyframes qr-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.025); } }
@media (prefers-reduced-motion: reduce) {
  .party-bg::before, .hero-comic, .timeline-card, .qr-card { animation: none; }
  .comic-button { transition: none; }
}
@media (max-width: 980px) {
  .party-panel { min-height: auto; padding: 84px 0; }
  .hero-grid, .comic-spread, .timeline-grid, .media-grid, .qr-grid { grid-template-columns: 1fr; }
  .media-card.video { grid-row: auto; }
  .hero-comic { transform: none; }
  .burst-card { position: static; max-width: none; margin-top: 12px; }
  .timeline-board::before { left: 30px; }
  .timeline-card, .timeline-card:nth-child(2n) { transform: none; grid-template-columns: 1fr; padding-left: 54px; }
  .timeline-card span { grid-column: auto; }
}
@media (max-width: 640px) {
  .party-shell { width: min(100% - 28px, 1180px); }
  .party-panel { padding: 72px 0; }
  .hero-copy h1 { font-size: 52px; }
  .hero-copy p, .timeline-copy p, .qr-copy p { font-size: 17px; }
  .comic-button { width: 100%; }
  .comic-frame, .media-card { min-height: auto; padding: 24px; }
  .comic-frame.large { min-height: 480px; }
  .camera-frame { min-height: 360px; }
  .mini-flow { grid-template-columns: 1fr; }
  .qr-card { box-shadow: 8px 8px 0 #16110F; }
}
</style>
