import { useEffect } from 'react'

export default function usePortfolioAnimations() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const siteShell = document.querySelector('.site-shell')

    if (reduceMotion) {
      siteShell?.style.setProperty('visibility', 'visible')
      return undefined
    }

    let cleanup = () => {}
    let isCancelled = false

    async function setupAnimations() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])

      if (isCancelled) {
        return
      }

      gsap.registerPlugin(ScrollTrigger)

      const ctx = gsap.context(() => {
        const heroTitleLines = gsap.utils.toArray('.hero-copy-column .hero-line')
        const heroCopy = document.querySelector('.hero-copy')
        const heroStats = gsap.utils.toArray('.hero-stat')
        const heroActions = gsap.utils.toArray('.hero-actions a')
        const heroTags = gsap.utils.toArray('.hero-tags span')
        const heroEyebrow = document.querySelector('.eyebrow')
        const navInner = document.querySelector('.nav-inner')
        const portraitCard = document.querySelector('.tilted-card-inner')
        const heroBeam = document.querySelector('.hero-beam')

        gsap.set('.site-shell', { autoAlpha: 1 })
        gsap.set(heroTitleLines, {
          yPercent: 108,
          scaleY: 1.28,
          scaleX: 0.92,
          transformOrigin: '50% 100%',
        })
        gsap.set('.hero-line-mask', { clipPath: 'inset(0 0 100% 0 round 0px)' })

        const heroFadeTargets = [heroCopy, ...heroStats, ...heroActions, ...heroTags, heroEyebrow, portraitCard].filter(Boolean)
        if (heroFadeTargets.length) {
          gsap.set(heroFadeTargets, {
            y: 42,
            autoAlpha: 0,
          })
        }

        if (heroBeam) {
          gsap.set(heroBeam, {
            scaleX: 0.18,
            autoAlpha: 0,
            transformOrigin: '100% 50%',
          })
        }

        if (navInner) {
          gsap.set(navInner, {
            y: -24,
            autoAlpha: 0,
          })
        }

        if (portraitCard) {
          gsap.set(portraitCard, {
            x: 90,
            rotateZ: -4,
          })
        }

        const heroTimeline = gsap.timeline({
          defaults: {
            ease: 'power3.out',
          },
        })

        if (navInner) {
          heroTimeline.to(navInner, {
            y: 0,
            autoAlpha: 1,
            duration: 1,
          })
        }

        heroTimeline
          .to(
            '.hero-line-mask',
            {
              clipPath: 'inset(0 0 0% 0 round 0px)',
              duration: 1.45,
              stagger: 0.08,
              ease: 'power4.inOut',
            },
            '-=0.55',
          )
          .to(
            heroTitleLines,
            {
              yPercent: 0,
              scaleY: 1,
              scaleX: 1,
              duration: 1.55,
              stagger: 0.09,
              ease: 'power4.out',
            },
            '-=1.35',
          )

        if (heroBeam) {
          heroTimeline.to(
            heroBeam,
            {
              autoAlpha: 1,
              scaleX: 1,
              duration: 1.45,
              ease: 'expo.out',
            },
            '-=1.1',
          )
        }

        if (portraitCard) {
          heroTimeline.to(
            portraitCard,
            {
              x: 0,
              rotateZ: 0,
              autoAlpha: 1,
              duration: 1.35,
              ease: 'power4.out',
            },
            '-=1.15',
          )
        }

        heroTimeline
          .to(
            heroEyebrow,
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.9,
            },
            '-=1.2',
          )
          .to(
            heroCopy,
            {
              y: 0,
              autoAlpha: 1,
              duration: 1,
            },
            '-=0.95',
          )
          .to(
            heroStats,
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.95,
              stagger: 0.12,
            },
            '-=0.76',
          )
          .to(
            heroActions,
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.85,
              stagger: 0.1,
            },
            '-=0.62',
          )
          .to(
            heroTags,
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              stagger: 0.06,
            },
            '-=0.5',
          )

        const sections = gsap.utils.toArray('[data-animate-section]')
        sections.forEach((section) => {
          const sectionTitle = section.querySelector('[data-section-display]')
          const sectionTag = section.querySelector('.section-tag')
          const sectionHeading = section.querySelector('h2')
          const sectionBody = section.querySelectorAll('p, li')
          const staggerItems = section.querySelectorAll('[data-stagger-item]')
          const revealImages = section.querySelectorAll('[data-reveal-image]')

          if (sectionTitle) {
            gsap.set(sectionTitle, {
              yPercent: 100,
              scale: 1.16,
              autoAlpha: 0,
              transformOrigin: '0% 100%',
            })
          }

          const sectionHeaderTargets = [sectionTag, sectionHeading].filter(Boolean)
          if (sectionHeaderTargets.length) {
            gsap.set(sectionHeaderTargets, {
              y: 42,
              autoAlpha: 0,
            })
          }

          if (sectionBody.length) {
            gsap.set(sectionBody, {
              y: 28,
              autoAlpha: 0,
            })
          }

          if (staggerItems.length) {
            gsap.set(staggerItems, {
              y: 56,
              autoAlpha: 0,
              scale: 0.96,
            })
          }

          revealImages.forEach((wrap) => {
            const image = wrap.querySelector('img')
            gsap.set(wrap, {
              clipPath: 'inset(0 0 100% 0 round 28px)',
            })
            if (image) {
              gsap.set(image, {
                scale: 1.14,
                yPercent: 6,
              })
            }
          })

          const sectionTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              once: true,
            },
            defaults: {
              ease: 'power3.out',
            },
          })

          if (sectionTitle) {
            sectionTimeline.to(sectionTitle, {
              yPercent: 0,
              scale: 1,
              autoAlpha: 1,
              duration: 1.25,
              ease: 'power4.out',
            })
          }

          sectionTimeline
            .to(
              sectionTag,
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.8,
              },
              sectionTitle ? '-=0.95' : 0,
            )
            .to(
              sectionHeading,
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.95,
              },
              '-=0.62',
            )

          if (sectionBody.length) {
            sectionTimeline.to(
              sectionBody,
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.75,
                stagger: 0.06,
              },
              '-=0.66',
            )
          }

          if (staggerItems.length) {
            sectionTimeline.to(
              staggerItems,
              {
                y: 0,
                autoAlpha: 1,
                scale: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
              },
              '-=0.42',
            )
          }

          revealImages.forEach((wrap, index) => {
            const image = wrap.querySelector('img')
            sectionTimeline.to(
              wrap,
              {
                clipPath: 'inset(0 0 0% 0 round 28px)',
                duration: 0.92,
                ease: 'power4.inOut',
              },
              `-=${Math.max(0.52 - index * 0.06, 0.3)}`,
            )
            if (image) {
              sectionTimeline.to(
                image,
                {
                  scale: 1,
                  yPercent: 0,
                  duration: 1.12,
                  ease: 'power3.out',
                },
                '<',
              )
            }
          })
        })
      })

      cleanup = () => {
        ctx.revert()
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    }

    setupAnimations()

    return () => {
      isCancelled = true
      cleanup()
    }
  }, [])
}
