import './App.css'
import BorderGlow from './BorderGlow'
import LiquidBackground from './LiquidBackground'
import TiltedCard from './TiltedCard'
import usePortfolioAnimations from './usePortfolioAnimations'

const workflowTags = ['脚本策划', '拍摄执行', '剪辑统筹', 'AI 提效']

const profileStats = [
  {
    label: '主责剪辑消耗',
    value: '557.87 万',
  },
  {
    label: '累计展示',
    value: '8964.63 万',
  },
  {
    label: '累计点击',
    value: '79.92 万',
  },
  {
    label: '项目覆盖',
    value: '华泰 / 广发 / 五矿 / 方正',
    detail: '主力项目深耕 + 多项目并行支持',
  },
]

const featuredProjects = [
  {
    title: '金融投放视频素材体系',
    category: '视频编导 / 广告素材',
    image:
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
    description:
      '围绕金融投放场景，独立推进脚本策划、拍摄执行与后期剪辑，持续产出可复用、可放量的广告素材内容。',
    metrics: '主责剪辑累计 557.87 万消耗 / 8964.63 万展示',
  },
  {
    title: '产品与商业内容拍摄交付',
    category: '拍摄执行 / 口播短视频',
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80',
    description:
      '兼顾画面质感、卖点表达与交付效率，适配高频次、多版本、多场景的视频内容制作需求。',
    metrics: '覆盖多品类拍摄执行与后期内容整合',
  },
  {
    title: 'AI 辅助内容提效流程',
    category: 'AI 提效 / 内容策划',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    description:
      '将 AI 融入脚本提纲、文案优化、分镜整理与素材梳理流程，提升多项目并行状态下的内容生产效率。',
    metrics: 'AI 辅助脚本、文案、分镜与素材整理',
  },
]

const strengths = [
  {
    title: '项目统筹能力',
    text: '能从脚本、排期、沟通、拍摄到后期交付完整推进项目，不只停留在单点执行。',
  },
  {
    title: '商业内容理解',
    text: '长期服务投放视频与广告素材场景，能把产品卖点、转化导向与镜头表达结合起来。',
  },
  {
    title: '多岗位协同经验',
    text: '既能承担主责剪辑，也能参与脚本与拍摄，适应编导、拍摄、剪辑协同推进的工作模式。',
  },
  {
    title: '数据复盘意识',
    text: '会结合结果复盘内容表现，提炼可复用方法，不只交付视频，也关注效果反馈。',
  },
  {
    title: 'AI 工具应用',
    text: '熟悉用 AI 辅助脚本生成、文案改写、分镜梳理与表达优化，提升内容生产速度与质量。',
  },
  {
    title: '管理成长潜力',
    text: '具备任务分配、外部沟通、现场统筹与流程梳理经验，适合继续往编导与内容管理方向成长。',
  },
]

const experienceItems = [
  '近阶段主要服务金融广告 / 期货行业投放项目，独立负责脚本、拍摄、剪辑全流程。',
  '主责剪辑阶段累计实现 557.87 万消耗、8964.63 万展示、79.92 万点击。',
  '覆盖华泰、广发、五矿、方正等多个项目，兼具主力项目深耕与多项目并行支持能力。',
]

const dossierItems = [
  {
    label: '当前身份',
    value: '视频编导 / 拍摄剪辑 / 内容策划',
  },
  {
    label: '阶段数据',
    value: '1176 个主责素材 / 5 个项目并行覆盖',
  },
  {
    label: '目标方向',
    value: '品牌内容制作 / 视频编导 / 内容管理',
  },
]

function App() {
  usePortfolioAnimations()

  return (
    <div className="site-shell">
      <LiquidBackground />
      <header className="top-nav">
        <div className="nav-inner">
          <a className="brand" href="#hero">
            Qiaoan Huang
          </a>
          <nav className="nav-links">
            <a href="#about">个人经历</a>
            <a href="#projects">精选项目</a>
            <a href="#strengths">个人优势</a>
            <a href="#contact">联系方式</a>
          </nav>
          <a className="nav-cta" href="#contact">
            立即联系
          </a>
        </div>
      </header>

      <main>
        <section className="hero-section" id="hero">
          <div className="hero-backdrop">
            <div className="hero-grid" />
            <div className="hero-noise" />
          </div>

          <div className="container hero-stage">
            <div className="hero-copy-column">
              <div className="eyebrow">VIDEO DIRECTOR · CONTENT CREATOR · AI-ENABLED WORKFLOW</div>
              <h1>
                <span className="hero-line-mask">
                  <span className="hero-line hero-line-main">让内容从想法到结果</span>
                </span>
                <span className="hero-line-mask">
                  <span className="hero-line hero-line-accent">形成可持续放量的</span>
                </span>
                <span className="hero-line-mask">
                  <span className="hero-line hero-line-accent hero-line-final">商业视频系统</span>
                </span>
              </h1>
              <p className="hero-copy">
                黄乔安，聚焦短视频编导、商业内容制作与拍摄剪辑整合执行。我希望做的不只是“把视频做出来”，而是让内容从脚本、镜头到投放结果，都更有方向感、效率感和完成度。
              </p>

              <div className="hero-stats">
                {profileStats.map((item) => (
                  <div className={`hero-stat${item.detail ? ' hero-stat-compact' : ''}`} key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                    {item.detail ? <p>{item.detail}</p> : null}
                  </div>
                ))}
              </div>

              <div className="hero-actions">
                <a className="primary-btn" href="#projects">
                  查看精选项目
                </a>
                <a className="ghost-btn" href="#about">
                  了解我的经历
                </a>
              </div>

              <div className="hero-tags">
                {workflowTags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>

            <div className="hero-visual-column">
              <div className="hero-glow hero-glow-rose" />
              <div className="hero-glow hero-glow-gold" />
              <div className="hero-glow hero-glow-violet" />
              <div className="hero-beam" />

              <div className="hero-portrait-shell">
                <TiltedCard
                  imageSrc="/profile-photo-hero.jpg"
                  altText="黄乔安个人形象照"
                  captionText="Qiaoan Huang · Video Director"
                  containerHeight="720px"
                  containerWidth="620px"
                  imageHeight="720px"
                  imageWidth="520px"
                  rotateAmplitude={10}
                  scaleOnHover={1.04}
                  showTooltip={true}
                  displayOverlayContent={true}
                  overlayContent={null}
                />
              </div>
            </div>

          </div>
        </section>

        <section className="about-section" id="about" data-animate-section>
          <div className="container about-grid">
            <div className="profile-panel">
              <div className="profile-card" data-stagger-item>
                <div className="profile-card-head">
                  <div className="profile-avatar-ring">
                    <img src="/profile-photo-avatar.jpg" alt="黄乔安头像" loading="lazy" decoding="async" />
                  </div>
                  <div>
                    <div className="section-tag">个人名片</div>
                    <h3>黄乔安</h3>
                    <p>视频编导 / 拍摄剪辑 / 商业内容制作</p>
                  </div>
                </div>

                <div className="profile-dossier">
                  {dossierItems.map((item) => (
                    <div className="dossier-row" key={item.label}>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </div>
                  ))}
                </div>

                <div className="profile-contact">
                  <span>联系方式</span>
                  <strong>1982530781@qq.com</strong>
                  <strong>广州 · 在职 · 可沟通新机会</strong>
                </div>
              </div>
            </div>

            <div className="about-content">
              <div className="section-tag">个人经历</div>
              <div className="section-display-wrap">
                <div className="section-display" data-section-display>
                  EXPERIENCE
                </div>
              </div>
              <h2>
                从产品理解到商业内容落地
                <br />
                我更擅长整合而不是单点执行
              </h2>
              <p>
                我具备 6 年以上视觉内容相关经验，经历过产品摄影、珠宝摄影、电商视频拍摄，到现在的金融广告投放素材制作。这让我在做内容时，不只考虑画面是否好看，也会同步考虑卖点表达、投放逻辑、镜头节奏与实际转化场景。
              </p>

              <ul className="about-list">
                {experienceItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="contact-and-data">
                <div className="mini-card" data-stagger-item>
                  <span>工作风格</span>
                  <strong>能独立推进项目</strong>
                  <strong>也能适配团队协作</strong>
                </div>
                <div className="mini-card" data-stagger-item>
                  <span>内容能力</span>
                  <strong>脚本、拍摄、剪辑一体化</strong>
                  <strong>兼顾结果导向与画面表达</strong>
                </div>
                <div className="mini-card" data-stagger-item>
                  <span>成长方向</span>
                  <strong>视频编导 / 内容策划</strong>
                  <strong>品牌内容与内容管理</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="projects-section" id="projects" data-animate-section>
          <div className="container">
            <div className="section-heading">
              <div className="section-tag">精选项目</div>
              <div className="section-display-wrap">
                <div className="section-display" data-section-display>
                  FEATURED WORK
                </div>
              </div>
              <h2>把项目经验做成看得见的作品呈现</h2>
              <p>
                这一版先用大卡片承载内容结构，后续你给我真实作品截图和参考站点后，我们再把视觉表现和项目细节进一步拉满。
              </p>
            </div>

            <div className="project-grid">
              {featuredProjects.map((project) => (
                <BorderGlow
                  backgroundColor="#171216"
                  borderRadius={30}
                  className="project-glow-wrap"
                  colors={['#d7b67a', '#8a557d', '#4c84d4']}
                  edgeSensitivity={26}
                  glowColor="42 68 74"
                  glowIntensity={0.72}
                  glowRadius={30}
                  key={project.title}
                >
                  <article className="project-card" data-stagger-item>
                    <div className="project-image-wrap" data-reveal-image>
                      <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
                    </div>
                    <div className="project-body">
                      <span className="project-category">{project.category}</span>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="project-metric">{project.metrics}</div>
                    </div>
                  </article>
                </BorderGlow>
              ))}
            </div>
          </div>
        </section>

        <section className="strengths-section" id="strengths" data-animate-section>
          <div className="container">
            <div className="section-heading">
              <div className="section-tag">个人优势</div>
              <div className="section-display-wrap">
                <div className="section-display" data-section-display>
                  CAPABILITIES
                </div>
              </div>
              <h2>我能提供的不只是剪辑执行，而是更完整的内容推进能力</h2>
            </div>

            <div className="strength-grid">
              {strengths.map((item) => (
                <article className="strength-card" data-stagger-item key={item.title}>
                  <div className="strength-chip" />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact" data-animate-section>
          <div className="contact-bg-orb orb-left" />
          <div className="contact-bg-orb orb-right" />
          <div className="container contact-content">
            <div className="section-display-wrap contact-display-wrap">
              <div className="section-display" data-section-display>
                CONTACT
              </div>
            </div>
            <h2>如果你正在寻找一个能独立推进商业短视频项目的人</h2>
            <p>
              欢迎和我聊聊视频编导、广告素材、内容策划与商业视频制作相关机会。我希望进入一个更规范、更稳定，也更重视内容价值的团队。
            </p>
            <div className="contact-links">
              <div className="section-tag">联系方式</div>
              <a href="mailto:1982530781@qq.com">1982530781@qq.com</a>
              <a href="tel:15816966836">15816966836</a>
              <span>广州 · 可沟通线下 / 远程面谈</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
