import { useEffect } from "react"

const imgFabricDetail = new URL("./assets/58cc7.jpg", import.meta.url).href
const imgFashionEditorial = new URL("./assets/132dc.jpg", import.meta.url).href
const imgPersonalStyleImage = new URL("./assets/7794c.jpg", import.meta.url)
  .href
const imgOutfitPhotograph = new URL("./assets/a315c.jpg", import.meta.url).href
const imgOutfitPhotograph1 = new URL("./assets/3e357.jpg", import.meta.url).href
const imgOutfitPhotograph2 = new URL("./assets/50034.jpg", import.meta.url).href
const imgPiecePhotograph = new URL("./assets/53b8a.jpg", import.meta.url).href
const imgPiecePhotograph1 = new URL("./assets/c1895.jpg", import.meta.url).href
const imgPiecePhotograph2 = new URL("./assets/d523d.jpg", import.meta.url).href
const imgSlowFashionEditorial = new URL("./assets/e8245.jpg", import.meta.url)
  .href
const imgFashionClosingDetail = new URL("./assets/cd557.jpg", import.meta.url)
  .href
const imgArrowUpRight = new URL("./assets/b46c4.svg", import.meta.url).href
const imgArrowDown = new URL("./assets/78621.svg", import.meta.url).href
const imgCheck = new URL("./assets/8dec4.svg", import.meta.url).href
const imgCheck1 = new URL("./assets/75c59.svg", import.meta.url).href
const imgCheck2 = new URL("./assets/585cb.svg", import.meta.url).href
const imgChevronDown = new URL("./assets/725a2.svg", import.meta.url).href
const imgLockKeyhole = new URL("./assets/c66d2.svg", import.meta.url).href
const imgBookmark = new URL("./assets/58697.svg", import.meta.url).href
const imgBookmark1 = new URL("./assets/27635.svg", import.meta.url).href
const imgSlidersHorizontal = new URL("./assets/c58ec.svg", import.meta.url).href
const imgBookmarkCheck = new URL("./assets/bfe11.svg", import.meta.url).href
const imgCheck3 = new URL("./assets/ee663.svg", import.meta.url).href
const imgArrowUpRight1 = new URL("./assets/0e259.svg", import.meta.url).href
const imgSlidersHorizontal1 = new URL("./assets/c5093.svg", import.meta.url)
  .href
const imgLockKeyhole1 = new URL("./assets/fd593.svg", import.meta.url).href
const imgShieldCheck = new URL("./assets/dc6ae.svg", import.meta.url).href
const imgBellOff = new URL("./assets/94acc.svg", import.meta.url).href
const imgMinus = new URL("./assets/c6c33.svg", import.meta.url).href
const imgPlus = new URL("./assets/4fca2.svg", import.meta.url).href

export default function App() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".site-root")
    if (!root) return

    const revealTargets = root.querySelectorAll<HTMLElement>(
      ":scope > div:not(.scroll-progress):not([data-name='Opening editorial']), [data-name='Journey step'], [data-name='Outfit recommendation'], [data-name='Privacy principle'], [data-name='Wardrobe piece']",
    )
    revealTargets.forEach((element, index) => {
      element.classList.add("scroll-reveal")
      element.style.setProperty("--reveal-delay", `${(index % 3) * 90}ms`)
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -8%" },
    )
    revealTargets.forEach((element) => observer.observe(element))

    const editorialHeadings = root.querySelectorAll<HTMLElement>(
      "[data-name='Title group'] > p:last-child, [data-node-id='1:277'], [data-node-id='1:335'], [data-node-id='1:364'], [data-node-id='1:371']",
    )
    editorialHeadings.forEach((element) => {
      element.classList.add("heading-reveal")
      observer.observe(element)
    })

    const parallaxImages = root.querySelectorAll<HTMLImageElement>(
      "[data-name='Fashion editorial'] img, [data-name='Personal style image'] img, [data-name='Outfit photograph'] img, [data-name='Slow fashion editorial'] img, [data-name='Fashion closing detail'] img",
    )
    parallaxImages.forEach((image) => image.classList.add("parallax-image"))
    const progress = root.querySelector<HTMLElement>(".scroll-progress")
    const scrubSections = Array.from(
      root.querySelectorAll<HTMLElement>(":scope > div:not(.scroll-progress)"),
    )

    let frame = 0
    const updateMotion = () => {
      frame = 0
      const viewportCenter = window.innerHeight / 2
      parallaxImages.forEach((image) => {
        const bounds = image.parentElement?.getBoundingClientRect()
        if (!bounds) return
        const offset = Math.max(
          -1,
          Math.min(
            1,
            (bounds.top + bounds.height / 2 - viewportCenter) /
              window.innerHeight,
          ),
        )
        image.style.setProperty("--parallax", `${offset * -28}px`)
      })

      const scrollRange =
        document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = scrollRange
        ? Math.min(1, Math.max(0, window.scrollY / scrollRange))
        : 0
      progress?.style.setProperty("--progress", `${scrollProgress}`)

      scrubSections.forEach((section) => {
        const bounds = section.getBoundingClientRect()
        const sectionProgress = Math.max(
          -1,
          Math.min(
            1,
            (bounds.top + bounds.height / 2 - viewportCenter) /
              (viewportCenter + bounds.height / 2),
          ),
        )
        section.style.setProperty(
          "--section-shift",
          `${sectionProgress * -18}px`,
        )
      })
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateMotion)
    }
    const onPointerMove = (event: PointerEvent) => {
      root.style.setProperty("--pointer-x", `${event.clientX}px`)
      root.style.setProperty("--pointer-y", `${event.clientY}px`)
      root.classList.add("has-pointer")
    }
    const onPointerLeave = () => {
      root.classList.remove("has-pointer")
    }
    updateMotion()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    root.addEventListener("pointermove", onPointerMove, { passive: true })
    root.addEventListener("pointerleave", onPointerLeave)

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      root.removeEventListener("pointermove", onPointerMove)
      root.removeEventListener("pointerleave", onPointerLeave)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      className="site-root bg-[#f8f5ef] content-stretch flex flex-col items-start relative size-full"
      data-node-id="1:2"
      data-name="FOLD — Your private style journey"
    >
      <div className="scroll-progress" aria-hidden="true" />
      <div
        className="bg-[#d8c3a8] content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full"
        data-node-id="1:3"
        data-name="Opening editorial"
      >
        <div
          className="content-stretch flex h-[96px] items-center justify-between overflow-clip px-[64px] relative shrink-0 w-full"
          data-node-id="1:4"
          data-name="Navigation"
        >
          <p
            className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#302820] text-[34px] whitespace-nowrap"
            data-node-id="1:5"
          >
            FOLD
          </p>
          <div
            className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal gap-[36px] items-center leading-[normal] not-italic overflow-clip relative shrink-0 text-[#302820] text-[13px] whitespace-nowrap"
            data-node-id="1:6"
            data-name="Navigation links"
          >
            <p className="relative shrink-0" data-node-id="1:7">
              The journey
            </p>
            <p className="relative shrink-0" data-node-id="1:8">
              Your style
            </p>
            <p className="relative shrink-0" data-node-id="1:9">
              The private edit
            </p>
            <p className="relative shrink-0" data-node-id="1:10">
              Your wardrobe
            </p>
          </div>
          <div
            className="content-stretch flex gap-[24px] items-center overflow-clip relative shrink-0"
            data-node-id="1:11"
            data-name="Account actions"
          >
            <p
              className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#302820] text-[13px] whitespace-nowrap"
              data-node-id="1:12"
            >
              Sign in
            </p>
            <div
              className="bg-[#302820] border border-[rgba(0,0,0,0)] border-solid content-stretch flex gap-[20px] h-[42px] items-center overflow-clip px-[18px] relative rounded-[2px] shrink-0"
              data-node-id="1:13"
              data-name="Action"
            >
              <p
                className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#f8f5ef] text-[13px] whitespace-nowrap"
                data-node-id="1:14"
              >
                Find your style
              </p>
              <div
                className="relative shrink-0 size-[16px]"
                data-node-id="1:15"
                data-name="arrow-up-right"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgArrowUpRight}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="content-stretch flex h-[696px] items-start overflow-clip relative shrink-0 w-full"
          data-node-id="1:17"
          data-name="Fashion campaign"
        >
          <div
            className="content-stretch flex flex-col h-full items-start justify-between overflow-clip pb-[40px] pl-[64px] pr-[60px] pt-[64px] relative shrink-0 w-[720px]"
            data-node-id="1:18"
            data-name="Editorial introduction"
          >
            <div
              className="content-stretch flex flex-col gap-[30px] items-start overflow-clip relative shrink-0 w-full"
              data-node-id="1:19"
              data-name="Opening copy"
            >
              <p
                className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#302820] text-[11px] whitespace-nowrap"
                data-node-id="1:20"
              >
                PERSONAL STYLE. PRIVATELY CONSIDERED.
              </p>
              <div
                className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] min-w-full not-italic relative shrink-0 text-[#302820] text-[64px] w-[min-content]"
                data-node-id="1:21"
              >
                <p className="leading-[1.02] mb-0">A little less</p>
                <p className="leading-[1.02] mb-0">noise. A little</p>
                <p className="leading-[1.02]">more you.</p>
              </div>
              <p
                className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.65] not-italic relative shrink-0 text-[#302820] text-[17px] w-[410px]"
                data-node-id="1:22"
              >
                An AI style companion that understands your wardrobe, your days,
                and the details that make you feel like yourself.
              </p>
              <div
                className="content-stretch flex gap-[22px] items-center overflow-clip relative shrink-0"
                data-node-id="1:23"
                data-name="Start journey"
              >
                <div
                  className="bg-[#302820] border border-[rgba(0,0,0,0)] border-solid content-stretch flex gap-[20px] h-[54px] items-center overflow-clip px-[24px] relative rounded-[2px] shrink-0"
                  data-node-id="1:24"
                  data-name="Action"
                >
                  <p
                    className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#f8f5ef] text-[14px] whitespace-nowrap"
                    data-node-id="1:25"
                  >
                    Begin your style journey
                  </p>
                  <div
                    className="relative shrink-0 size-[16px]"
                    data-node-id="1:26"
                    data-name="arrow-up-right"
                  >
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={imgArrowUpRight}
                    />
                  </div>
                </div>
                <p
                  className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#302820] text-[12px] whitespace-nowrap"
                  data-node-id="1:28"
                >
                  5 minutes. Entirely yours.
                </p>
              </div>
            </div>
            <div
              className="content-stretch flex items-end justify-between overflow-clip relative shrink-0 w-full"
              data-node-id="1:29"
              data-name="Editorial footnote"
            >
              <div
                className="content-stretch flex gap-[14px] h-[147px] items-center overflow-clip relative shrink-0 w-[452px]"
                data-node-id="1:30"
                data-name="Style detail"
              >
                <div
                  className="h-[115px] relative shrink-0 w-[106px]"
                  data-node-id="1:31"
                  data-name="Fabric detail"
                >
                  <img
                    alt=""
                    className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                    src={imgFabricDetail}
                  />
                </div>
                <div
                  className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-[#302820] text-[12px] w-[205px]"
                  data-node-id="1:32"
                >
                  <p className="leading-[1.55] mb-0">
                    Good style isn’t louder.
                  </p>
                  <p className="leading-[1.55]">It’s more intentional.</p>
                </div>
              </div>
              <div
                className="h-[36px] relative shrink-0 w-[24px]"
                data-node-id="1:33"
                data-name="arrow-down"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgArrowDown}
                />
              </div>
            </div>
          </div>
          <div
            className="content-stretch flex h-full items-start overflow-clip relative shrink-0 w-[720px]"
            data-node-id="1:35"
            data-name="Campaign portrait"
          >
            <div
              className="flex-[1_0_0] h-full min-w-px relative"
              data-node-id="1:36"
              data-name="Fashion editorial"
            >
              <img
                alt=""
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                src={imgFashionEditorial}
              />
            </div>
            <div
              className="[word-break:break-word] absolute bg-[rgba(48,40,32,0.8)] bottom-[32px] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between leading-[normal] left-[32px] not-italic overflow-clip p-[16px] text-[#f8f5ef] text-[11px] w-[656px] whitespace-nowrap"
              data-node-id="1:37"
              data-name="Photo caption"
            >
              <p className="relative shrink-0" data-node-id="1:38">
                THE EVERYDAY, ELEVATED
              </p>
              <p className="relative shrink-0" data-node-id="1:39">
                VOL. 01 / AUTUMN 2026
              </p>
            </div>
          </div>
        </div>
        <div
          className="[word-break:break-word] border-[#302820] border-solid border-t content-stretch flex font-['Inter:Regular'] font-normal h-[72px] items-center justify-between leading-[normal] not-italic overflow-clip px-[64px] relative shrink-0 text-[#302820] text-[10px] w-full whitespace-nowrap"
          data-node-id="1:40"
          data-name="Principles"
        >
          <p className="relative shrink-0" data-node-id="1:41">
            YOUR LIFE, NOT THE ALGORITHM
          </p>
          <p className="relative shrink-0" data-node-id="1:42">
            WARDROBE FIRST
          </p>
          <p className="relative shrink-0" data-node-id="1:43">
            THOUGHTFUL, NOT TREND-LED
          </p>
          <p className="relative shrink-0" data-node-id="1:44">
            PRIVATE BY DESIGN
          </p>
        </div>
      </div>
      <div
        className="[word-break:break-word] content-stretch flex flex-col font-['Inter:Regular'] font-normal gap-[48px] items-start not-italic overflow-clip px-[64px] py-[88px] relative shrink-0 w-full"
        data-node-id="1:45"
        data-name="Personal style journey"
      >
        <div
          className="content-stretch flex items-end justify-between overflow-clip relative shrink-0 w-full"
          data-node-id="1:46"
          data-name="Section introduction"
        >
          <div
            className="content-stretch flex flex-col gap-[20px] items-start overflow-clip relative shrink-0 w-[650px]"
            data-node-id="1:47"
            data-name="Title group"
          >
            <p
              className="leading-[normal] relative shrink-0 text-[#756b60] text-[11px] whitespace-nowrap"
              data-node-id="1:48"
            >
              01 / THE JOURNEY
            </p>
            <p
              className="leading-[1.1] min-w-full relative shrink-0 text-[#302820] text-[52px] w-[min-content]"
              data-node-id="1:49"
            >
              Style starts with listening.
            </p>
          </div>
          <p
            className="leading-[1.6] relative shrink-0 text-[#756b60] text-[15px] w-[340px]"
            data-node-id="1:50"
          >
            No endless feeds. No one-size-fits-all advice. Just a clearer sense
            of what works for you.
          </p>
        </div>
        <div
          className="content-stretch flex gap-[32px] items-start overflow-clip relative shrink-0 w-full"
          data-node-id="1:51"
          data-name="Journey steps"
        >
          <div
            className="border-[#d7cdc0] border-solid border-t content-stretch flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-px overflow-clip pt-[24px] relative"
            data-node-id="1:52"
            data-name="Journey step"
          >
            <p
              className="leading-[normal] relative shrink-0 text-[#756b60] text-[13px] whitespace-nowrap"
              data-node-id="1:53"
            >
              01
            </p>
            <p
              className="leading-[normal] relative shrink-0 text-[#302820] text-[25px] whitespace-nowrap"
              data-node-id="1:54"
            >
              Start with you.
            </p>
            <p
              className="leading-[1.65] min-w-full relative shrink-0 text-[#756b60] text-[15px] w-[min-content]"
              data-node-id="1:55"
            >
              Your taste, your routines, your non-negotiables. A few thoughtful
              questions, not a personality box.
            </p>
            <p
              className="leading-[normal] relative shrink-0 text-[#302820] text-[10px] whitespace-nowrap"
              data-node-id="1:56"
            >
              A 5-MINUTE STYLE PORTRAIT
            </p>
          </div>
          <div
            className="border-[#d7cdc0] border-solid border-t content-stretch flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-px overflow-clip pt-[24px] relative"
            data-node-id="1:57"
            data-name="Journey step"
          >
            <p
              className="leading-[normal] relative shrink-0 text-[#756b60] text-[13px] whitespace-nowrap"
              data-node-id="1:58"
            >
              02
            </p>
            <p
              className="leading-[normal] relative shrink-0 text-[#302820] text-[25px] whitespace-nowrap"
              data-node-id="1:59"
            >
              Bring what you own.
            </p>
            <p
              className="leading-[1.65] min-w-full relative shrink-0 text-[#756b60] text-[15px] w-[min-content]"
              data-node-id="1:60"
            >
              Add pieces from links or photos whenever you want. Start with one
              item, add more later, and see new combinations as your digital
              wardrobe grows.
            </p>
            <p
              className="leading-[normal] relative shrink-0 text-[#302820] text-[10px] whitespace-nowrap"
              data-node-id="1:61"
            >
              ADD BY LINK OR PHOTO
            </p>
          </div>
          <div
            className="border-[#d7cdc0] border-solid border-t content-stretch flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-px overflow-clip pt-[24px] relative"
            data-node-id="1:62"
            data-name="Journey step"
          >
            <p
              className="leading-[normal] relative shrink-0 text-[#756b60] text-[13px] whitespace-nowrap"
              data-node-id="1:63"
            >
              03
            </p>
            <p
              className="leading-[normal] relative shrink-0 text-[#302820] text-[25px] whitespace-nowrap"
              data-node-id="1:64"
            >
              Make it your own.
            </p>
            <p
              className="leading-[1.65] min-w-full relative shrink-0 text-[#756b60] text-[15px] w-[min-content]"
              data-node-id="1:65"
            >
              Receive a small, considered edit. Save what feels right; tell us
              what doesn’t. Your style keeps evolving.
            </p>
            <p
              className="leading-[normal] relative shrink-0 text-[#302820] text-[10px] whitespace-nowrap"
              data-node-id="1:66"
            >
              AN EDIT THAT LEARNS WITH YOU
            </p>
          </div>
        </div>
      </div>
      <div
        className="bg-[#ede5d9] content-stretch flex flex-col gap-[40px] items-start overflow-clip px-[64px] py-[88px] relative shrink-0 w-full"
        data-node-id="1:67"
        data-name="Your style portrait"
      >
        <div
          className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-end justify-between not-italic overflow-clip relative shrink-0 w-full"
          data-node-id="1:68"
          data-name="Section introduction"
        >
          <div
            className="content-stretch flex flex-col gap-[20px] items-start leading-[normal] overflow-clip relative shrink-0 w-[700px]"
            data-node-id="1:69"
            data-name="Title group"
          >
            <p
              className="relative shrink-0 text-[#756b60] text-[11px] whitespace-nowrap"
              data-node-id="1:70"
            >
              02 / YOUR STYLE, IN THE DETAILS
            </p>
            <p
              className="min-w-full relative shrink-0 text-[#302820] text-[52px] w-[min-content]"
              data-node-id="1:71"
            >
              A portrait. Not a category.
            </p>
          </div>
          <p
            className="leading-[1.6] relative shrink-0 text-[#756b60] text-[15px] w-[330px]"
            data-node-id="1:72"
          >
            Try a sample profile below. Every preference can change as your life
            does.
          </p>
        </div>
        <div
          className="content-stretch flex gap-[32px] items-start overflow-clip relative shrink-0 w-full"
          data-node-id="1:73"
          data-name="Profile workspace"
        >
          <div
            className="content-stretch flex flex-col h-[604px] items-start overflow-clip relative shrink-0 w-[416px]"
            data-node-id="1:74"
            data-name="Style inspiration"
          >
            <div
              className="h-[488px] relative shrink-0 w-full"
              data-node-id="1:75"
              data-name="Personal style image"
            >
              <img
                alt=""
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                src={imgPersonalStyleImage}
              />
            </div>
            <div
              className="[word-break:break-word] bg-[#d8c3a8] content-stretch flex flex-col font-['Inter:Regular'] font-normal gap-[10px] items-start leading-[normal] not-italic overflow-clip p-[24px] relative shrink-0 text-[#302820] w-full whitespace-nowrap"
              data-node-id="1:76"
              data-name="Style summary"
            >
              <p className="relative shrink-0 text-[24px]" data-node-id="1:77">
                Soft structure, quiet confidence.
              </p>
              <p className="relative shrink-0 text-[12px]" data-node-id="1:78">
                Relaxed tailoring · Natural textures · Warm neutrals
              </p>
            </div>
          </div>
          <div
            className="bg-[#fffdf8] content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-w-px overflow-clip p-[32px] relative self-stretch"
            data-node-id="1:79"
            data-name="Preference controls"
          >
            <div
              className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between leading-[normal] not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap"
              data-node-id="1:80"
              data-name="Profile header"
            >
              <p
                className="relative shrink-0 text-[#302820] text-[20px]"
                data-node-id="1:81"
              >
                Your personal style notes
              </p>
              <p
                className="relative shrink-0 text-[#756b60] text-[10px]"
                data-node-id="1:82"
              >
                SAMPLE PROFILE / ALEX
              </p>
            </div>
            <div
              className="content-stretch flex flex-col gap-[12px] items-start overflow-clip relative shrink-0 w-full"
              data-node-id="1:83"
              data-name="Preference field"
            >
              <p
                className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#302820] text-[13px] whitespace-nowrap"
                data-node-id="1:84"
              >
                What feels most like you?
              </p>
              <div
                className="content-start flex flex-wrap gap-[8px] items-start overflow-clip relative shrink-0 w-full"
                data-node-id="1:85"
                data-name="Choices"
              >
                <div
                  className="bg-[#302820] border border-[#302820] border-solid content-stretch flex gap-[8px] items-center overflow-clip px-[16px] py-[11px] relative rounded-[2px] shrink-0"
                  data-node-id="1:86"
                  data-name="Preference"
                >
                  <div
                    className="relative shrink-0 size-[12px]"
                    data-node-id="1:87"
                    data-name="check"
                  >
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={imgCheck}
                    />
                  </div>
                  <p
                    className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#f8f5ef] text-[13px] whitespace-nowrap"
                    data-node-id="1:89"
                  >
                    Minimal
                  </p>
                </div>
                <div
                  className="bg-[#302820] border border-[#302820] border-solid content-stretch flex gap-[8px] items-center overflow-clip px-[16px] py-[11px] relative rounded-[2px] shrink-0"
                  data-node-id="1:90"
                  data-name="Preference"
                >
                  <div
                    className="relative shrink-0 size-[12px]"
                    data-node-id="1:91"
                    data-name="check"
                  >
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={imgCheck}
                    />
                  </div>
                  <p
                    className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#f8f5ef] text-[13px] whitespace-nowrap"
                    data-node-id="1:93"
                  >
                    Relaxed tailoring
                  </p>
                </div>
                <div
                  className="bg-[rgba(0,0,0,0)] border border-[#d7cdc0] border-solid content-stretch flex items-center overflow-clip px-[16px] py-[11px] relative rounded-[2px] shrink-0"
                  data-node-id="1:94"
                  data-name="Preference"
                >
                  <p
                    className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#302820] text-[13px] whitespace-nowrap"
                    data-node-id="1:95"
                  >
                    Expressive
                  </p>
                </div>
                <div
                  className="bg-[rgba(0,0,0,0)] border border-[#d7cdc0] border-solid content-stretch flex items-center overflow-clip px-[16px] py-[11px] relative rounded-[2px] shrink-0"
                  data-node-id="1:96"
                  data-name="Preference"
                >
                  <p
                    className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#302820] text-[13px] whitespace-nowrap"
                    data-node-id="1:97"
                  >
                    Classic
                  </p>
                </div>
              </div>
            </div>
            <div
              className="content-stretch flex flex-col gap-[12px] items-start overflow-clip relative shrink-0 w-full"
              data-node-id="1:98"
              data-name="Preference field"
            >
              <p
                className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#302820] text-[13px] whitespace-nowrap"
                data-node-id="1:99"
              >
                What are you dressing for?
              </p>
              <div
                className="content-start flex flex-wrap gap-[8px] items-start overflow-clip relative shrink-0 w-full"
                data-node-id="1:100"
                data-name="Choices"
              >
                <div
                  className="bg-[#302820] border border-[#302820] border-solid content-stretch flex gap-[8px] items-center overflow-clip px-[16px] py-[11px] relative rounded-[2px] shrink-0"
                  data-node-id="1:101"
                  data-name="Preference"
                >
                  <div
                    className="relative shrink-0 size-[12px]"
                    data-node-id="1:102"
                    data-name="check"
                  >
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={imgCheck}
                    />
                  </div>
                  <p
                    className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#f8f5ef] text-[13px] whitespace-nowrap"
                    data-node-id="1:104"
                  >
                    Workdays
                  </p>
                </div>
                <div
                  className="bg-[#302820] border border-[#302820] border-solid content-stretch flex gap-[8px] items-center overflow-clip px-[16px] py-[11px] relative rounded-[2px] shrink-0"
                  data-node-id="1:105"
                  data-name="Preference"
                >
                  <div
                    className="relative shrink-0 size-[12px]"
                    data-node-id="1:106"
                    data-name="check"
                  >
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={imgCheck}
                    />
                  </div>
                  <p
                    className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#f8f5ef] text-[13px] whitespace-nowrap"
                    data-node-id="1:108"
                  >
                    Weekends
                  </p>
                </div>
                <div
                  className="bg-[rgba(0,0,0,0)] border border-[#d7cdc0] border-solid content-stretch flex items-center overflow-clip px-[16px] py-[11px] relative rounded-[2px] shrink-0"
                  data-node-id="1:109"
                  data-name="Preference"
                >
                  <p
                    className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#302820] text-[13px] whitespace-nowrap"
                    data-node-id="1:110"
                  >
                    Evenings
                  </p>
                </div>
                <div
                  className="bg-[rgba(0,0,0,0)] border border-[#d7cdc0] border-solid content-stretch flex items-center overflow-clip px-[16px] py-[11px] relative rounded-[2px] shrink-0"
                  data-node-id="1:111"
                  data-name="Preference"
                >
                  <p
                    className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#302820] text-[13px] whitespace-nowrap"
                    data-node-id="1:112"
                  >
                    Travel
                  </p>
                </div>
              </div>
            </div>
            <div
              className="content-stretch flex flex-col gap-[12px] items-start overflow-clip relative shrink-0 w-full"
              data-node-id="1:113"
              data-name="Palette field"
            >
              <p
                className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#302820] text-[13px] whitespace-nowrap"
                data-node-id="1:114"
              >
                The colours you come back to
              </p>
              <div
                className="content-stretch flex gap-[20px] items-start overflow-clip relative shrink-0"
                data-node-id="1:115"
                data-name="Colour preferences"
              >
                <div
                  className="content-stretch flex flex-col gap-[7px] items-center overflow-clip relative shrink-0"
                  data-node-id="1:116"
                  data-name="Colour choice"
                >
                  <div
                    className="bg-[#eae2d4] border border-[#302820] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[100px] shrink-0 size-[36px]"
                    data-node-id="1:117"
                    data-name="Swatch"
                  >
                    <div
                      className="relative shrink-0 size-[14px]"
                      data-node-id="1:118"
                      data-name="check"
                    >
                      <img
                        alt=""
                        className="absolute block inset-0 max-w-none size-full"
                        src={imgCheck1}
                      />
                    </div>
                  </div>
                  <p
                    className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#756b60] text-[10px] whitespace-nowrap"
                    data-node-id="1:120"
                  >
                    Cream
                  </p>
                </div>
                <div
                  className="content-stretch flex flex-col gap-[7px] items-center overflow-clip relative shrink-0"
                  data-node-id="1:121"
                  data-name="Colour choice"
                >
                  <div
                    className="bg-[#bba487] border border-[#302820] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[100px] shrink-0 size-[36px]"
                    data-node-id="1:122"
                    data-name="Swatch"
                  >
                    <div
                      className="relative shrink-0 size-[14px]"
                      data-node-id="1:123"
                      data-name="check"
                    >
                      <img
                        alt=""
                        className="absolute block inset-0 max-w-none size-full"
                        src={imgCheck1}
                      />
                    </div>
                  </div>
                  <p
                    className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#756b60] text-[10px] whitespace-nowrap"
                    data-node-id="1:125"
                  >
                    Sand
                  </p>
                </div>
                <div
                  className="content-stretch flex flex-col gap-[7px] items-center overflow-clip relative shrink-0"
                  data-node-id="1:126"
                  data-name="Colour choice"
                >
                  <div
                    className="bg-[#3c3029] border border-[#302820] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[100px] shrink-0 size-[36px]"
                    data-node-id="1:127"
                    data-name="Swatch"
                  >
                    <div
                      className="relative shrink-0 size-[14px]"
                      data-node-id="1:128"
                      data-name="check"
                    >
                      <img
                        alt=""
                        className="absolute block inset-0 max-w-none size-full"
                        src={imgCheck2}
                      />
                    </div>
                  </div>
                  <p
                    className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#756b60] text-[10px] whitespace-nowrap"
                    data-node-id="1:130"
                  >
                    Espresso
                  </p>
                </div>
                <div
                  className="content-stretch flex flex-col gap-[7px] items-center overflow-clip relative shrink-0"
                  data-node-id="1:131"
                  data-name="Colour choice"
                >
                  <div
                    className="bg-[#73745a] border border-[#d7cdc0] border-solid relative rounded-[100px] shrink-0 size-[36px]"
                    data-node-id="1:132"
                    data-name="Swatch"
                  />
                  <p
                    className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#756b60] text-[10px] whitespace-nowrap"
                    data-node-id="1:133"
                  >
                    Olive
                  </p>
                </div>
                <div
                  className="content-stretch flex flex-col gap-[7px] items-center overflow-clip relative shrink-0"
                  data-node-id="1:134"
                  data-name="Colour choice"
                >
                  <div
                    className="bg-[#7a8181] border border-[#d7cdc0] border-solid relative rounded-[100px] shrink-0 size-[36px]"
                    data-node-id="1:135"
                    data-name="Swatch"
                  />
                  <p
                    className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#756b60] text-[10px] whitespace-nowrap"
                    data-node-id="1:136"
                  >
                    Slate
                  </p>
                </div>
              </div>
            </div>
            <div
              className="content-stretch flex gap-[24px] items-start overflow-clip relative shrink-0 w-full"
              data-node-id="1:137"
              data-name="Practical preferences"
            >
              <div
                className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-w-px overflow-clip relative"
                data-node-id="1:138"
                data-name="Budget"
              >
                <p
                  className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#302820] text-[13px] whitespace-nowrap"
                  data-node-id="1:139"
                >
                  Budget per new piece
                </p>
                <div
                  className="border border-[#d7cdc0] border-solid content-stretch flex items-start justify-between overflow-clip p-[14px] relative shrink-0 w-full"
                  data-node-id="1:140"
                  data-name="Budget selector"
                >
                  <p
                    className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#302820] text-[13px] whitespace-nowrap"
                    data-node-id="1:141"
                  >
                    $50 – $150
                  </p>
                  <div
                    className="relative shrink-0 size-[14px]"
                    data-node-id="1:142"
                    data-name="chevron-down"
                  >
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={imgChevronDown}
                    />
                  </div>
                </div>
                <p
                  className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#756b60] text-[11px] whitespace-nowrap"
                  data-node-id="1:144"
                >
                  Never suggest above my budget
                </p>
              </div>
              <div
                className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-w-px overflow-clip relative"
                data-node-id="1:145"
                data-name="Comfort"
              >
                <p
                  className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#302820] text-[13px] whitespace-nowrap"
                  data-node-id="1:146"
                >
                  Comfort comes first
                </p>
                <div
                  className="border border-[#d7cdc0] border-solid content-stretch flex items-start justify-between overflow-clip p-[14px] relative shrink-0 w-full"
                  data-node-id="1:147"
                  data-name="Comfort value"
                >
                  <p
                    className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#302820] text-[13px] whitespace-nowrap"
                    data-node-id="1:148"
                  >
                    Relaxed fit · Flat shoes
                  </p>
                  <div
                    className="relative shrink-0 size-[14px]"
                    data-node-id="1:149"
                    data-name="chevron-down"
                  >
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={imgChevronDown}
                    />
                  </div>
                </div>
                <p
                  className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#756b60] text-[11px] whitespace-nowrap"
                  data-node-id="1:151"
                >
                  Soft fabrics, no restrictive cuts
                </p>
              </div>
            </div>
            <div
              className="content-stretch flex items-center justify-between overflow-clip pt-[8px] relative shrink-0 w-full"
              data-node-id="1:152"
              data-name="Profile actions"
            >
              <p
                className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#756b60] text-[11px] whitespace-nowrap"
                data-node-id="1:153"
              >
                Only used to shape your private edit.
              </p>
              <div
                className="bg-[#302820] border border-[rgba(0,0,0,0)] border-solid content-stretch flex gap-[20px] h-[42px] items-center overflow-clip px-[18px] relative rounded-[2px] shrink-0"
                data-node-id="1:154"
                data-name="Action"
              >
                <p
                  className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#f8f5ef] text-[13px] whitespace-nowrap"
                  data-node-id="1:155"
                >
                  Create my edit
                </p>
                <div
                  className="relative shrink-0 size-[16px]"
                  data-node-id="1:156"
                  data-name="arrow-up-right"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgArrowUpRight}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="bg-[#f8f5ef] content-stretch flex flex-col gap-[32px] items-start overflow-clip px-[64px] py-[88px] relative shrink-0 w-full"
        data-node-id="1:158"
        data-name="Personalized outfit edit"
      >
        <div
          className="content-stretch flex items-end justify-between overflow-clip relative shrink-0 w-full"
          data-node-id="1:159"
          data-name="Section introduction"
        >
          <div
            className="[word-break:break-word] content-stretch flex flex-col font-['Inter:Regular'] font-normal gap-[20px] items-start not-italic overflow-clip relative shrink-0 w-[1060px]"
            data-node-id="1:160"
            data-name="Title group"
          >
            <p
              className="leading-[normal] relative shrink-0 text-[#756b60] text-[11px] whitespace-nowrap"
              data-node-id="1:161"
            >
              03 / THE PRIVATE EDIT
            </p>
            <p
              className="leading-[1.1] min-w-full relative shrink-0 text-[#302820] text-[60px] w-[min-content]"
              data-node-id="1:162"
            >
              Considered for your real life.
            </p>
          </div>
          <div
            className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0"
            data-node-id="1:163"
            data-name="Private status"
          >
            <div
              className="relative shrink-0 size-[14px]"
              data-node-id="1:164"
              data-name="lock-keyhole"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgLockKeyhole}
              />
            </div>
            <p
              className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#756b60] text-[12px] whitespace-nowrap"
              data-node-id="1:166"
            >
              Visible only to you
            </p>
          </div>
        </div>
        <div
          className="[word-break:break-word] border-[#d7cdc0] border-b border-solid content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip pb-[24px] pt-[4px] relative shrink-0 w-full"
          data-node-id="1:167"
          data-name="Personal edit summary"
        >
          <p
            className="leading-[1.6] relative shrink-0 text-[#756b60] text-[15px] w-[670px]"
            data-node-id="1:168"
          >
            Alex, here are three ways to wear your week. Warm neutrals, relaxed
            fits, flat shoes — and your own pieces, first.
          </p>
          <p
            className="[text-underline-position:from-font] decoration-from-font decoration-solid leading-[normal] relative shrink-0 text-[#302820] text-[12px] underline whitespace-nowrap"
            data-node-id="1:169"
          >
            Your style notes ↗
          </p>
        </div>
        <div
          className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full"
          data-node-id="1:170"
          data-name="Edit filters"
        >
          <div
            className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0"
            data-node-id="1:171"
            data-name="Occasion filters"
          >
            <div
              className="bg-[#302820] border border-[#302820] border-solid content-stretch flex gap-[8px] items-center overflow-clip px-[16px] py-[11px] relative rounded-[2px] shrink-0"
              data-node-id="1:172"
              data-name="Preference"
            >
              <div
                className="relative shrink-0 size-[12px]"
                data-node-id="1:173"
                data-name="check"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgCheck}
                />
              </div>
              <p
                className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#f8f5ef] text-[13px] whitespace-nowrap"
                data-node-id="1:175"
              >
                For your week
              </p>
            </div>
            <div
              className="bg-[rgba(0,0,0,0)] border border-[#d7cdc0] border-solid content-stretch flex items-center overflow-clip px-[16px] py-[11px] relative rounded-[2px] shrink-0"
              data-node-id="1:176"
              data-name="Preference"
            >
              <p
                className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#302820] text-[13px] whitespace-nowrap"
                data-node-id="1:177"
              >
                Work
              </p>
            </div>
            <div
              className="bg-[rgba(0,0,0,0)] border border-[#d7cdc0] border-solid content-stretch flex items-center overflow-clip px-[16px] py-[11px] relative rounded-[2px] shrink-0"
              data-node-id="1:178"
              data-name="Preference"
            >
              <p
                className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#302820] text-[13px] whitespace-nowrap"
                data-node-id="1:179"
              >
                Weekend
              </p>
            </div>
            <div
              className="bg-[rgba(0,0,0,0)] border border-[#d7cdc0] border-solid content-stretch flex items-center overflow-clip px-[16px] py-[11px] relative rounded-[2px] shrink-0"
              data-node-id="1:180"
              data-name="Preference"
            >
              <p
                className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#302820] text-[13px] whitespace-nowrap"
                data-node-id="1:181"
              >
                Evening
              </p>
            </div>
          </div>
          <p
            className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#756b60] text-[11px] whitespace-nowrap"
            data-node-id="1:182"
          >
            3 OUTFITS / A SMALLER, BETTER EDIT
          </p>
        </div>
        <div
          className="content-stretch flex gap-[24px] items-start overflow-clip relative shrink-0 w-full"
          data-node-id="1:183"
          data-name="Recommendation grid"
        >
          <div
            className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative"
            data-node-id="1:184"
            data-name="Outfit recommendation"
          >
            <div
              className="content-stretch flex h-[440px] items-start overflow-clip relative shrink-0 w-full"
              data-node-id="1:185"
              data-name="Outfit editorial"
            >
              <div
                className="flex-[1_0_0] h-full min-w-px relative"
                data-node-id="1:186"
                data-name="Outfit photograph"
              >
                <img
                  alt=""
                  className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                  src={imgOutfitPhotograph}
                />
              </div>
              <div
                className="absolute bg-[#f8f5ef] content-stretch flex items-start left-[16px] overflow-clip px-[12px] py-[8px] top-[16px]"
                data-node-id="1:187"
                data-name="Wardrobe badge"
              >
                <p
                  className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#302820] text-[11px] whitespace-nowrap"
                  data-node-id="1:188"
                >
                  3 pieces you own
                </p>
              </div>
              <div
                className="absolute bg-[#f8f5ef] content-stretch flex items-center justify-center overflow-clip right-[16.33px] size-[36px] top-[16px]"
                data-node-id="1:189"
                data-name="Save outfit"
              >
                <div
                  className="relative shrink-0 size-[17px]"
                  data-node-id="1:190"
                  data-name="bookmark"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgBookmark}
                  />
                </div>
              </div>
            </div>
            <div
              className="content-stretch flex flex-col gap-[14px] items-start overflow-clip py-[24px] relative shrink-0 w-full"
              data-node-id="1:192"
              data-name="Outfit details"
            >
              <p
                className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#756b60] text-[10px] whitespace-nowrap"
                data-node-id="1:193"
              >
                WORK / SMART CASUAL
              </p>
              <p
                className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] min-w-full not-italic relative shrink-0 text-[#302820] text-[26px] w-[min-content]"
                data-node-id="1:194"
              >
                The unhurried workday
              </p>
              <p
                className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] min-w-full not-italic relative shrink-0 text-[#756b60] text-[12px] w-[min-content]"
                data-node-id="1:195"
              >
                Tuesday · Office to coffee · 18°C
              </p>
              <p
                className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.6] min-w-full not-italic relative shrink-0 text-[#302820] text-[13px] w-[min-content]"
                data-node-id="1:196"
              >
                Your sand blazer + ivory tee + wide-leg trousers + loafers
              </p>
              <div
                className="[word-break:break-word] bg-[#ede5d9] content-stretch flex flex-col font-['Inter:Regular'] font-normal gap-[9px] items-start min-h-[132px] not-italic overflow-clip p-[18px] relative shrink-0 w-full"
                data-node-id="1:197"
                data-name="Recommendation rationale"
              >
                <p
                  className="leading-[normal] relative shrink-0 text-[#302820] text-[10px] whitespace-nowrap"
                  data-node-id="1:198"
                >
                  WHY THIS FEELS LIKE YOU
                </p>
                <p
                  className="leading-[1.65] min-w-full relative shrink-0 text-[#756b60] text-[13px] w-[min-content]"
                  data-node-id="1:199"
                >
                  Your favourite blazer, with a softer silhouette. Flat loafers
                  keep the 20-minute commute comfortable.
                </p>
              </div>
              <div
                className="[word-break:break-word] content-stretch flex items-start justify-between leading-[normal] not-italic overflow-clip py-[8px] relative shrink-0 w-full whitespace-nowrap"
                data-node-id="1:200"
                data-name="Shopping summary"
              >
                <p
                  className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#756b60] text-[12px]"
                  data-node-id="1:201"
                >
                  Optional additions
                </p>
                <p
                  className="font-['Inter:Medium'] font-medium relative shrink-0 text-[#302820] text-[13px]"
                  data-node-id="1:202"
                >
                  $89
                </p>
              </div>
              <div
                className="content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0 w-full"
                data-node-id="1:203"
                data-name="Recommendation actions"
              >
                <div
                  className="bg-[rgba(0,0,0,0)] border border-[#d7cdc0] border-solid content-stretch flex gap-[20px] h-[42px] items-center overflow-clip px-[18px] relative rounded-[2px] shrink-0"
                  data-node-id="1:204"
                  data-name="Action"
                >
                  <p
                    className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#302820] text-[13px] whitespace-nowrap"
                    data-node-id="1:205"
                  >
                    Save outfit
                  </p>
                  <div
                    className="relative shrink-0 size-[16px]"
                    data-node-id="1:206"
                    data-name="bookmark"
                  >
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={imgBookmark1}
                    />
                  </div>
                </div>
                <div
                  className="bg-[rgba(0,0,0,0)] border border-[#d7cdc0] border-solid content-stretch flex gap-[20px] h-[42px] items-center overflow-clip px-[18px] relative rounded-[2px] shrink-0"
                  data-node-id="1:208"
                  data-name="Action"
                >
                  <p
                    className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#302820] text-[13px] whitespace-nowrap"
                    data-node-id="1:209"
                  >
                    Refine
                  </p>
                  <div
                    className="relative shrink-0 size-[16px]"
                    data-node-id="1:210"
                    data-name="sliders-horizontal"
                  >
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={imgSlidersHorizontal}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative"
            data-node-id="1:212"
            data-name="Outfit recommendation"
          >
            <div
              className="content-stretch flex h-[440px] items-start overflow-clip relative shrink-0 w-full"
              data-node-id="1:213"
              data-name="Outfit editorial"
            >
              <div
                className="flex-[1_0_0] h-full min-w-px relative"
                data-node-id="1:214"
                data-name="Outfit photograph"
              >
                <img
                  alt=""
                  className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                  src={imgOutfitPhotograph1}
                />
              </div>
              <div
                className="absolute bg-[#f8f5ef] content-stretch flex items-start left-[16px] overflow-clip px-[12px] py-[8px] top-[16px]"
                data-node-id="1:215"
                data-name="Wardrobe badge"
              >
                <p
                  className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#302820] text-[11px] whitespace-nowrap"
                  data-node-id="1:216"
                >
                  4 pieces you own
                </p>
              </div>
              <div
                className="absolute bg-[#f8f5ef] content-stretch flex items-center justify-center overflow-clip right-[16.33px] size-[36px] top-[16px]"
                data-node-id="1:217"
                data-name="Save outfit"
              >
                <div
                  className="relative shrink-0 size-[17px]"
                  data-node-id="1:218"
                  data-name="bookmark-check"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgBookmarkCheck}
                  />
                </div>
              </div>
            </div>
            <div
              className="content-stretch flex flex-col gap-[14px] items-start overflow-clip py-[24px] relative shrink-0 w-full"
              data-node-id="1:220"
              data-name="Outfit details"
            >
              <p
                className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#756b60] text-[10px] whitespace-nowrap"
                data-node-id="1:221"
              >
                WEEKEND / EVERYDAY
              </p>
              <p
                className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] min-w-full not-italic relative shrink-0 text-[#302820] text-[26px] w-[min-content]"
                data-node-id="1:222"
              >
                Saturday, softly
              </p>
              <p
                className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] min-w-full not-italic relative shrink-0 text-[#756b60] text-[12px] w-[min-content]"
                data-node-id="1:223"
              >{`Saturday · Gallery & lunch · 16°C`}</p>
              <p
                className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.6] min-w-full not-italic relative shrink-0 text-[#302820] text-[13px] w-[min-content]"
                data-node-id="1:224"
              >
                Your ivory knit + straight denim + suede loafers + tote
              </p>
              <div
                className="[word-break:break-word] bg-[#ede5d9] content-stretch flex flex-col font-['Inter:Regular'] font-normal gap-[9px] items-start min-h-[132px] not-italic overflow-clip p-[18px] relative shrink-0 w-full"
                data-node-id="1:225"
                data-name="Recommendation rationale"
              >
                <p
                  className="leading-[normal] relative shrink-0 text-[#302820] text-[10px] whitespace-nowrap"
                  data-node-id="1:226"
                >
                  WHY THIS FEELS LIKE YOU
                </p>
                <p
                  className="leading-[1.65] min-w-full relative shrink-0 text-[#756b60] text-[13px] w-[min-content]"
                  data-node-id="1:227"
                >
                  A little texture, no extra effort. Your knit balances the
                  straight denim; every piece is already in your wardrobe.
                </p>
              </div>
              <div
                className="[word-break:break-word] content-stretch flex items-start justify-between leading-[normal] not-italic overflow-clip py-[8px] relative shrink-0 w-full whitespace-nowrap"
                data-node-id="1:228"
                data-name="Shopping summary"
              >
                <p
                  className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#756b60] text-[12px]"
                  data-node-id="1:229"
                >
                  No new pieces needed
                </p>
                <p
                  className="font-['Inter:Medium'] font-medium relative shrink-0 text-[#302820] text-[13px]"
                  data-node-id="1:230"
                >
                  $0
                </p>
              </div>
              <div
                className="content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0 w-full"
                data-node-id="1:231"
                data-name="Recommendation actions"
              >
                <div
                  className="bg-[#302820] border border-[rgba(0,0,0,0)] border-solid content-stretch flex gap-[20px] h-[42px] items-center overflow-clip px-[18px] relative rounded-[2px] shrink-0"
                  data-node-id="1:232"
                  data-name="Action"
                >
                  <p
                    className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#f8f5ef] text-[13px] whitespace-nowrap"
                    data-node-id="1:233"
                  >
                    Saved to your edit
                  </p>
                  <div
                    className="relative shrink-0 size-[16px]"
                    data-node-id="1:234"
                    data-name="check"
                  >
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={imgCheck3}
                    />
                  </div>
                </div>
                <div
                  className="bg-[rgba(0,0,0,0)] border border-[#d7cdc0] border-solid content-stretch flex gap-[20px] h-[42px] items-center overflow-clip px-[18px] relative rounded-[2px] shrink-0"
                  data-node-id="1:236"
                  data-name="Action"
                >
                  <p
                    className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#302820] text-[13px] whitespace-nowrap"
                    data-node-id="1:237"
                  >
                    Refine
                  </p>
                  <div
                    className="relative shrink-0 size-[16px]"
                    data-node-id="1:238"
                    data-name="sliders-horizontal"
                  >
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={imgSlidersHorizontal}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative"
            data-node-id="1:240"
            data-name="Outfit recommendation"
          >
            <div
              className="content-stretch flex h-[440px] items-start overflow-clip relative shrink-0 w-full"
              data-node-id="1:241"
              data-name="Outfit editorial"
            >
              <div
                className="flex-[1_0_0] h-full min-w-px relative"
                data-node-id="1:242"
                data-name="Outfit photograph"
              >
                <img
                  alt=""
                  className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                  src={imgOutfitPhotograph2}
                />
              </div>
              <div
                className="absolute bg-[#f8f5ef] content-stretch flex items-start left-[16px] overflow-clip px-[12px] py-[8px] top-[16px]"
                data-node-id="1:243"
                data-name="Wardrobe badge"
              >
                <p
                  className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#302820] text-[11px] whitespace-nowrap"
                  data-node-id="1:244"
                >
                  2 pieces you own
                </p>
              </div>
              <div
                className="absolute bg-[#f8f5ef] content-stretch flex items-center justify-center overflow-clip right-[16px] size-[36px] top-[16px]"
                data-node-id="1:245"
                data-name="Save outfit"
              >
                <div
                  className="relative shrink-0 size-[17px]"
                  data-node-id="1:246"
                  data-name="bookmark"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgBookmark}
                  />
                </div>
              </div>
            </div>
            <div
              className="content-stretch flex flex-col gap-[14px] items-start overflow-clip py-[24px] relative shrink-0 w-full"
              data-node-id="1:248"
              data-name="Outfit details"
            >
              <p
                className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#756b60] text-[10px] whitespace-nowrap"
                data-node-id="1:249"
              >
                EVENING / DINNER
              </p>
              <p
                className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] min-w-full not-italic relative shrink-0 text-[#302820] text-[26px] w-[min-content]"
                data-node-id="1:250"
              >
                An evening, understated
              </p>
              <p
                className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] min-w-full not-italic relative shrink-0 text-[#756b60] text-[12px] w-[min-content]"
                data-node-id="1:251"
              >
                Friday · Neighbourhood dinner · 14°C
              </p>
              <p
                className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.6] min-w-full not-italic relative shrink-0 text-[#302820] text-[13px] w-[min-content]"
                data-node-id="1:252"
              >
                Your cream knit + satin midi + flat slingbacks + gold hoops
              </p>
              <div
                className="[word-break:break-word] bg-[#ede5d9] content-stretch flex flex-col font-['Inter:Regular'] font-normal gap-[9px] items-start min-h-[132px] not-italic overflow-clip p-[18px] relative shrink-0 w-full"
                data-node-id="1:253"
                data-name="Recommendation rationale"
              >
                <p
                  className="leading-[normal] relative shrink-0 text-[#302820] text-[10px] whitespace-nowrap"
                  data-node-id="1:254"
                >
                  WHY THIS FEELS LIKE YOU
                </p>
                <p
                  className="leading-[1.65] min-w-full relative shrink-0 text-[#756b60] text-[13px] w-[min-content]"
                  data-node-id="1:255"
                >
                  The rich brown stays in your palette. A fluid skirt brings the
                  occasion; flat slingbacks keep it unmistakably you.
                </p>
              </div>
              <div
                className="[word-break:break-word] content-stretch flex items-start justify-between leading-[normal] not-italic overflow-clip py-[8px] relative shrink-0 w-full whitespace-nowrap"
                data-node-id="1:256"
                data-name="Shopping summary"
              >
                <p
                  className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#756b60] text-[12px]"
                  data-node-id="1:257"
                >
                  Optional additions
                </p>
                <p
                  className="font-['Inter:Medium'] font-medium relative shrink-0 text-[#302820] text-[13px]"
                  data-node-id="1:258"
                >
                  $120
                </p>
              </div>
              <div
                className="content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0 w-full"
                data-node-id="1:259"
                data-name="Recommendation actions"
              >
                <div
                  className="bg-[rgba(0,0,0,0)] border border-[#d7cdc0] border-solid content-stretch flex gap-[20px] h-[42px] items-center overflow-clip px-[18px] relative rounded-[2px] shrink-0"
                  data-node-id="1:260"
                  data-name="Action"
                >
                  <p
                    className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#302820] text-[13px] whitespace-nowrap"
                    data-node-id="1:261"
                  >
                    Save outfit
                  </p>
                  <div
                    className="relative shrink-0 size-[16px]"
                    data-node-id="1:262"
                    data-name="bookmark"
                  >
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={imgBookmark1}
                    />
                  </div>
                </div>
                <div
                  className="bg-[rgba(0,0,0,0)] border border-[#d7cdc0] border-solid content-stretch flex gap-[20px] h-[42px] items-center overflow-clip px-[18px] relative rounded-[2px] shrink-0"
                  data-node-id="1:264"
                  data-name="Action"
                >
                  <p
                    className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#302820] text-[13px] whitespace-nowrap"
                    data-node-id="1:265"
                  >
                    Refine
                  </p>
                  <div
                    className="relative shrink-0 size-[16px]"
                    data-node-id="1:266"
                    data-name="sliders-horizontal"
                  >
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={imgSlidersHorizontal}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="border-[#d7cdc0] border-solid border-t content-stretch flex items-center justify-between overflow-clip pt-[8px] relative shrink-0 w-full"
          data-node-id="1:268"
          data-name="Edit note"
        >
          <p
            className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#756b60] text-[12px] whitespace-nowrap"
            data-node-id="1:269"
          >
            Selected for your preferences, never paid placement. New purchases
            are always optional.
          </p>
          <div
            className="bg-[rgba(0,0,0,0)] border border-[#d7cdc0] border-solid content-stretch flex gap-[20px] h-[42px] items-center overflow-clip px-[18px] relative rounded-[2px] shrink-0"
            data-node-id="1:270"
            data-name="Action"
          >
            <p
              className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#302820] text-[13px] whitespace-nowrap"
              data-node-id="1:271"
            >
              See my saved edit
            </p>
            <div
              className="relative shrink-0 size-[16px]"
              data-node-id="1:272"
              data-name="arrow-up-right"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgArrowUpRight1}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="bg-[#302820] content-stretch flex gap-[64px] items-center overflow-clip px-[64px] py-[88px] relative shrink-0 w-full"
        data-node-id="1:274"
        data-name="Wardrobe aware styling"
      >
        <div
          className="content-stretch flex flex-col gap-[28px] items-start overflow-clip relative shrink-0 w-[420px]"
          data-node-id="1:275"
          data-name="Wardrobe introduction"
        >
          <p
            className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#d8c3a8] text-[11px] whitespace-nowrap"
            data-node-id="1:276"
          >
            04 / ALREADY YOURS
          </p>
          <div
            className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] min-w-full not-italic relative shrink-0 text-[#f8f5ef] text-[58px] w-[min-content]"
            data-node-id="1:277"
          >
            <p className="leading-[1.05] mb-0">A fresh eye.</p>
            <p className="leading-[1.05] mb-0">Not a whole</p>
            <p className="leading-[1.05]">new wardrobe.</p>
          </div>
          <p
            className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.7] min-w-full not-italic relative shrink-0 text-[#d8c3a8] text-[16px] w-[min-content]"
            data-node-id="1:278"
          >
            Start with one piece. Add more whenever you like. Your saved pieces
            stay here.
          </p>
          <div
            className="bg-[#f8f5ef] border border-[rgba(0,0,0,0)] border-solid content-stretch flex gap-[20px] h-[54px] items-center overflow-clip px-[24px] relative rounded-[2px] shrink-0"
            data-node-id="1:279"
            data-name="Action"
          >
            <p
              className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#302820] text-[14px] whitespace-nowrap"
              data-node-id="1:280"
            >
              Add my first pieces
            </p>
            <div
              className="relative shrink-0 size-[16px]"
              data-node-id="1:281"
              data-name="arrow-up-right"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgArrowUpRight1}
              />
            </div>
          </div>
          <p
            className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#d8c3a8] text-[12px] whitespace-nowrap"
            data-node-id="1:283"
          >
            Paste a product link or add photos. Review the details before
            saving.
          </p>
        </div>
        <div
          className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-w-px overflow-clip relative"
          data-node-id="1:284"
          data-name="Wardrobe preview"
        >
          <div
            className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between leading-[normal] not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap"
            data-node-id="1:285"
            data-name="Wardrobe header"
          >
            <p
              className="relative shrink-0 text-[#f8f5ef] text-[22px]"
              data-node-id="1:286"
            >
              Your wardrobe, reimagined
            </p>
            <p
              className="relative shrink-0 text-[#d8c3a8] text-[11px]"
              data-node-id="1:287"
            >
              24 PIECES ADDED
            </p>
          </div>
          <div
            className="content-stretch flex gap-[16px] items-start overflow-clip relative shrink-0 w-full"
            data-node-id="1:288"
            data-name="Wardrobe grid"
          >
            <div
              className="content-stretch flex flex-[1_0_0] flex-col gap-[14px] items-start min-w-px overflow-clip relative"
              data-node-id="1:289"
              data-name="Wardrobe piece"
            >
              <div
                className="h-[270px] relative shrink-0 w-full"
                data-node-id="1:290"
                data-name="Piece photograph"
              >
                <img
                  alt=""
                  className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                  src={imgPiecePhotograph}
                />
              </div>
              <p
                className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] min-w-full not-italic relative shrink-0 text-[#f8f5ef] text-[15px] w-[min-content]"
                data-node-id="1:291"
              >
                The sand blazer
              </p>
              <p
                className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#d8c3a8] text-[11px] whitespace-nowrap"
                data-node-id="1:292"
              >
                12 outfit possibilities
              </p>
            </div>
            <div
              className="content-stretch flex flex-[1_0_0] flex-col gap-[14px] items-start min-w-px overflow-clip relative"
              data-node-id="1:293"
              data-name="Wardrobe piece"
            >
              <div
                className="h-[270px] relative shrink-0 w-full"
                data-node-id="1:294"
                data-name="Piece photograph"
              >
                <img
                  alt=""
                  className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                  src={imgPiecePhotograph1}
                />
              </div>
              <p
                className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] min-w-full not-italic relative shrink-0 text-[#f8f5ef] text-[15px] w-[min-content]"
                data-node-id="1:295"
              >
                The everyday knit
              </p>
              <p
                className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#d8c3a8] text-[11px] whitespace-nowrap"
                data-node-id="1:296"
              >
                8 outfit possibilities
              </p>
            </div>
            <div
              className="content-stretch flex flex-[1_0_0] flex-col gap-[14px] items-start min-w-px overflow-clip relative"
              data-node-id="1:297"
              data-name="Wardrobe piece"
            >
              <div
                className="h-[270px] relative shrink-0 w-full"
                data-node-id="1:298"
                data-name="Piece photograph"
              >
                <img
                  alt=""
                  className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                  src={imgPiecePhotograph2}
                />
              </div>
              <p
                className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] min-w-full not-italic relative shrink-0 text-[#f8f5ef] text-[15px] w-[min-content]"
                data-node-id="1:299"
              >
                The leather loafer
              </p>
              <p
                className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#d8c3a8] text-[11px] whitespace-nowrap"
                data-node-id="1:300"
              >
                15 outfit possibilities
              </p>
            </div>
          </div>
          <div
            className="border border-[#61564a] border-solid content-stretch flex gap-[14px] items-center overflow-clip p-[20px] relative shrink-0 w-full"
            data-node-id="1:301"
            data-name="Wardrobe insight"
          >
            <div
              className="relative shrink-0 size-[20px]"
              data-node-id="1:302"
              data-name="sparkles"
            />
            <p
              className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[1.65] min-w-px not-italic relative text-[#d8c3a8] text-[13px]"
              data-node-id="1:303"
            >
              Your sand blazer works with 6 pieces you already own. Start there,
              before adding anything new.
            </p>
          </div>
        </div>
      </div>
      <div
        className="bg-[#ede5d9] content-stretch flex gap-[96px] items-center overflow-clip px-[64px] py-[88px] relative shrink-0 w-full"
        data-node-id="1:304"
        data-name="Refine your suggestions"
      >
        <div
          className="bg-[#fffdf8] content-stretch flex flex-col gap-[24px] items-start overflow-clip p-[32px] relative shrink-0 w-[620px]"
          data-node-id="1:305"
          data-name="Refinement sample"
        >
          <div
            className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full"
            data-node-id="1:306"
            data-name="Refinement header"
          >
            <p
              className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#302820] text-[22px] whitespace-nowrap"
              data-node-id="1:307"
            >
              Let’s make it more you.
            </p>
            <div
              className="relative shrink-0 size-[20px]"
              data-node-id="1:308"
              data-name="sliders-horizontal"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgSlidersHorizontal1}
              />
            </div>
          </div>
          <p
            className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#756b60] text-[12px] whitespace-nowrap"
            data-node-id="1:310"
          >
            REFINING / THE UNHURRIED WORKDAY
          </p>
          <p
            className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#302820] text-[14px] whitespace-nowrap"
            data-node-id="1:311"
          >
            What would you change?
          </p>
          <div
            className="content-start flex flex-wrap gap-[8px] items-start overflow-clip relative shrink-0 w-full"
            data-node-id="1:312"
            data-name="Quick adjustments"
          >
            <div
              className="bg-[#302820] border border-[#302820] border-solid content-stretch flex gap-[8px] items-center overflow-clip px-[16px] py-[11px] relative rounded-[2px] shrink-0"
              data-node-id="1:313"
              data-name="Preference"
            >
              <div
                className="relative shrink-0 size-[12px]"
                data-node-id="1:314"
                data-name="check"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgCheck}
                />
              </div>
              <p
                className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#f8f5ef] text-[13px] whitespace-nowrap"
                data-node-id="1:316"
              >
                More relaxed
              </p>
            </div>
            <div
              className="bg-[rgba(0,0,0,0)] border border-[#d7cdc0] border-solid content-stretch flex items-center overflow-clip px-[16px] py-[11px] relative rounded-[2px] shrink-0"
              data-node-id="1:317"
              data-name="Preference"
            >
              <p
                className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#302820] text-[13px] whitespace-nowrap"
                data-node-id="1:318"
              >
                Less formal
              </p>
            </div>
            <div
              className="bg-[rgba(0,0,0,0)] border border-[#d7cdc0] border-solid content-stretch flex items-center overflow-clip px-[16px] py-[11px] relative rounded-[2px] shrink-0"
              data-node-id="1:319"
              data-name="Preference"
            >
              <p
                className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#302820] text-[13px] whitespace-nowrap"
                data-node-id="1:320"
              >
                Warmer layers
              </p>
            </div>
            <div
              className="bg-[rgba(0,0,0,0)] border border-[#d7cdc0] border-solid content-stretch flex items-center overflow-clip px-[16px] py-[11px] relative rounded-[2px] shrink-0"
              data-node-id="1:321"
              data-name="Preference"
            >
              <p
                className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#302820] text-[13px] whitespace-nowrap"
                data-node-id="1:322"
              >
                Lower budget
              </p>
            </div>
          </div>
          <div
            className="[word-break:break-word] border border-[#d7cdc0] border-solid content-stretch flex flex-col font-['Inter:Regular'] font-normal gap-[12px] items-start not-italic overflow-clip p-[18px] relative shrink-0 w-full"
            data-node-id="1:323"
            data-name="Personal note"
          >
            <p
              className="leading-[normal] relative shrink-0 text-[#756b60] text-[11px] whitespace-nowrap"
              data-node-id="1:324"
            >
              OR TELL US IN YOUR OWN WORDS
            </p>
            <p
              className="leading-[1.6] min-w-full relative shrink-0 text-[#302820] text-[14px] w-[min-content]"
              data-node-id="1:325"
            >
              “I like the colours, but I’d prefer a softer waist and something I
              can walk in all day.”
            </p>
          </div>
          <div
            className="[word-break:break-word] bg-[#ede5d9] content-stretch flex flex-col font-['Inter:Regular'] font-normal gap-[10px] items-start not-italic overflow-clip p-[18px] relative shrink-0 w-full"
            data-node-id="1:326"
            data-name="Companion response"
          >
            <p
              className="leading-[normal] relative shrink-0 text-[#302820] text-[10px] whitespace-nowrap"
              data-node-id="1:327"
            >
              A NOTE FROM FOLD
            </p>
            <p
              className="leading-[1.7] min-w-full relative shrink-0 text-[#756b60] text-[13px] w-[min-content]"
              data-node-id="1:328"
            >
              Understood. I’ll keep your palette, try a pull-on trouser, and
              stay with flat loafers. No need to change what’s already working.
            </p>
          </div>
          <div
            className="bg-[#302820] border border-[rgba(0,0,0,0)] border-solid content-stretch flex gap-[20px] h-[42px] items-center overflow-clip px-[18px] relative rounded-[2px] shrink-0"
            data-node-id="1:329"
            data-name="Action"
          >
            <p
              className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#f8f5ef] text-[13px] whitespace-nowrap"
              data-node-id="1:330"
            >
              Update this outfit
            </p>
            <div
              className="relative shrink-0 size-[16px]"
              data-node-id="1:331"
              data-name="arrow-up-right"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgArrowUpRight}
              />
            </div>
          </div>
        </div>
        <div
          className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col font-['Inter:Regular'] font-normal gap-[28px] items-start min-w-px not-italic overflow-clip relative"
          data-node-id="1:333"
          data-name="Refinement introduction"
        >
          <p
            className="leading-[normal] relative shrink-0 text-[#756b60] text-[11px] whitespace-nowrap"
            data-node-id="1:334"
          >
            05 / A CONVERSATION, NOT A VERDICT
          </p>
          <h2
            className="leading-[1.08] min-w-full relative shrink-0 text-[#302820] text-[55px] w-[min-content]"
            data-node-id="1:335"
          >
            “Almost right” is a good place to start.
          </h2>
          <p
            className="leading-[1.7] min-w-full relative shrink-0 text-[#756b60] text-[16px] w-[min-content]"
            data-node-id="1:336"
          >
            Taste is personal. Tell FOLD what feels off — the fit, the mood, the
            price — and your next suggestion becomes a little more considered.
          </p>
          <p
            className="leading-[1.6] min-w-full relative shrink-0 text-[#302820] text-[15px] w-[min-content]"
            data-node-id="1:337"
          >
            You always have the final say.
          </p>
        </div>
      </div>
      <div
        className="content-stretch flex flex-col gap-[44px] items-start overflow-clip px-[64px] py-[80px] relative shrink-0 w-full"
        data-node-id="1:338"
        data-name="Private by design"
      >
        <div
          className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-end justify-between leading-[normal] not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap"
          data-node-id="1:339"
          data-name="Section introduction"
        >
          <div
            className="content-stretch flex flex-col gap-[20px] items-start overflow-clip relative shrink-0 w-[750px]"
            data-node-id="1:340"
            data-name="Title group"
          >
            <p
              className="relative shrink-0 text-[#756b60] text-[11px]"
              data-node-id="1:341"
            >
              06 / DISCRETION IS PART OF THE DESIGN
            </p>
            <p
              className="relative shrink-0 text-[#302820] text-[52px]"
              data-node-id="1:342"
            >
              Your style is yours to keep.
            </p>
          </div>
          <p
            className="[text-underline-position:from-font] decoration-from-font decoration-solid relative shrink-0 text-[#302820] text-[13px] underline"
            data-node-id="1:343"
          >
            Our privacy promise ↗
          </p>
        </div>
        <div
          className="content-stretch flex gap-[40px] items-start overflow-clip relative shrink-0 w-full"
          data-node-id="1:344"
          data-name="Privacy principles"
        >
          <div
            className="border-[#d7cdc0] border-solid border-t content-stretch flex flex-[1_0_0] flex-col gap-[18px] items-start min-w-px overflow-clip pt-[24px] relative"
            data-node-id="1:345"
            data-name="Privacy principle"
          >
            <div
              className="relative shrink-0 size-[22px]"
              data-node-id="1:346"
              data-name="lock-keyhole"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgLockKeyhole1}
              />
            </div>
            <p
              className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] min-w-full not-italic relative shrink-0 text-[#302820] text-[21px] w-[min-content]"
              data-node-id="1:348"
            >
              An edit, not a public feed.
            </p>
            <p
              className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.7] min-w-full not-italic relative shrink-0 text-[#756b60] text-[14px] w-[min-content]"
              data-node-id="1:349"
            >
              Your wardrobe, photos, and saved outfits stay in your private
              space. Nothing is shared by default.
            </p>
          </div>
          <div
            className="border-[#d7cdc0] border-solid border-t content-stretch flex flex-[1_0_0] flex-col gap-[18px] items-start min-w-px overflow-clip pt-[24px] relative"
            data-node-id="1:350"
            data-name="Privacy principle"
          >
            <div
              className="relative shrink-0 size-[22px]"
              data-node-id="1:351"
              data-name="shield-check"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgShieldCheck}
              />
            </div>
            <p
              className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] min-w-full not-italic relative shrink-0 text-[#302820] text-[21px] w-[min-content]"
              data-node-id="1:353"
            >
              Personal, never intrusive.
            </p>
            <p
              className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.7] min-w-full not-italic relative shrink-0 text-[#756b60] text-[14px] w-[min-content]"
              data-node-id="1:354"
            >
              Share only what helps. Body photos are optional, and you can edit
              or remove your information at any time.
            </p>
          </div>
          <div
            className="border-[#d7cdc0] border-solid border-t content-stretch flex flex-[1_0_0] flex-col gap-[18px] items-start min-w-px overflow-clip pt-[24px] relative"
            data-node-id="1:355"
            data-name="Privacy principle"
          >
            <div
              className="relative shrink-0 size-[22px]"
              data-node-id="1:356"
              data-name="bell-off"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgBellOff}
              />
            </div>
            <p
              className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] min-w-full not-italic relative shrink-0 text-[#302820] text-[21px] w-[min-content]"
              data-node-id="1:358"
            >
              On your terms.
            </p>
            <p
              className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.7] min-w-full not-italic relative shrink-0 text-[#756b60] text-[14px] w-[min-content]"
              data-node-id="1:359"
            >
              No pressure to buy. No noisy notifications. Choose if and when
              you’d like a new edit.
            </p>
          </div>
        </div>
      </div>
      <div
        className="bg-[#d8c3a8] content-stretch flex h-[480px] items-start overflow-clip relative shrink-0 w-full"
        data-node-id="1:360"
        data-name="The FOLD philosophy"
      >
        <div
          className="h-full relative shrink-0 w-[560px]"
          data-node-id="1:361"
          data-name="Slow fashion editorial"
        >
          <img
            alt=""
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            src={imgSlowFashionEditorial}
          />
        </div>
        <div
          className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col h-full items-start justify-between min-w-px not-italic overflow-clip px-[72px] py-[64px] relative text-[#302820]"
          data-node-id="1:362"
          data-name="Brand philosophy"
        >
          <p
            className="font-['Inter:Regular'] font-normal leading-[normal] relative shrink-0 text-[11px] whitespace-nowrap"
            data-node-id="1:363"
          >
            07 / A MORE CONSIDERED WAY TO DRESS
          </p>
          <p
            className="font-['Inter:Regular'] font-normal leading-[1.15] min-w-full relative shrink-0 text-[48px] w-[min-content]"
            data-node-id="1:364"
          >
            Style isn’t becoming someone else. It’s feeling a little more at
            home in yourself.
          </p>
          <div
            className="content-stretch flex items-center justify-between leading-[normal] overflow-clip relative shrink-0 w-full whitespace-nowrap"
            data-node-id="1:365"
            data-name="Editorial signature"
          >
            <p
              className="font-['Inter:Regular'] font-normal relative shrink-0 text-[13px]"
              data-node-id="1:366"
            >
              The FOLD philosophy
            </p>
            <p
              className="font-['Inter:Medium'] font-medium relative shrink-0 text-[28px]"
              data-node-id="1:367"
            >
              FOLD
            </p>
          </div>
        </div>
      </div>
      <div
        className="content-stretch flex gap-[96px] items-start overflow-clip px-[64px] py-[88px] relative shrink-0 w-full"
        data-node-id="1:368"
        data-name="Questions before you begin"
      >
        <div
          className="[word-break:break-word] content-stretch flex flex-col font-['Inter:Regular'] font-normal gap-[24px] items-start not-italic overflow-clip relative shrink-0 w-[420px]"
          data-node-id="1:369"
          data-name="Questions introduction"
        >
          <p
            className="leading-[normal] relative shrink-0 text-[#756b60] text-[11px] whitespace-nowrap"
            data-node-id="1:370"
          >
            08 / A FEW THINGS TO KNOW
          </p>
          <p
            className="leading-[1.08] min-w-full relative shrink-0 text-[#302820] text-[52px] w-[min-content]"
            data-node-id="1:371"
          >
            Before you step inside.
          </p>
          <p
            className="leading-[1.6] min-w-full relative shrink-0 text-[#756b60] text-[15px] w-[min-content]"
            data-node-id="1:372"
          >
            A thoughtful journey should feel simple from the start.
          </p>
          <p
            className="[text-underline-position:from-font] decoration-from-font decoration-solid leading-[normal] relative shrink-0 text-[#302820] text-[13px] underline whitespace-nowrap"
            data-node-id="1:373"
          >
            Ask us a question ↗
          </p>
        </div>
        <div
          className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative"
          data-node-id="1:374"
          data-name="Questions"
        >
          <div
            className="border-[#d7cdc0] border-b border-solid border-t content-stretch flex flex-col gap-[16px] items-start overflow-clip py-[24px] relative shrink-0 w-full"
            data-node-id="1:375"
            data-name="Expanded question"
          >
            <div
              className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full"
              data-node-id="1:376"
              data-name="Question title"
            >
              <p
                className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#302820] text-[18px] whitespace-nowrap"
                data-node-id="1:377"
              >
                How does my first edit work?
              </p>
              <div
                className="relative shrink-0 size-[18px]"
                data-node-id="1:378"
                data-name="minus"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgMinus}
                />
              </div>
            </div>
            <p
              className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.7] not-italic relative shrink-0 text-[#756b60] text-[14px] w-full"
              data-node-id="1:380"
            >
              Start with a few questions about your taste, daily life, budget,
              and comfort. Add pieces if you like. FOLD brings it together in a
              small set of outfits, with a clear reason for every suggestion.
            </p>
          </div>
          <div
            className="border-[#d7cdc0] border-b border-solid content-stretch flex items-center justify-between overflow-clip py-[24px] relative shrink-0 w-full"
            data-node-id="1:381"
            data-name="Question row"
          >
            <p
              className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#302820] text-[17px] whitespace-nowrap"
              data-node-id="1:382"
            >
              Do I need to upload my entire wardrobe?
            </p>
            <div
              className="relative shrink-0 size-[18px]"
              data-node-id="1:383"
              data-name="plus"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgPlus}
              />
            </div>
          </div>
          <div
            className="border-[#d7cdc0] border-b border-solid content-stretch flex items-center justify-between overflow-clip py-[24px] relative shrink-0 w-full"
            data-node-id="1:385"
            data-name="Question row"
          >
            <p
              className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#302820] text-[17px] whitespace-nowrap"
              data-node-id="1:386"
            >
              Can I set a firm budget?
            </p>
            <div
              className="relative shrink-0 size-[18px]"
              data-node-id="1:387"
              data-name="plus"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgPlus}
              />
            </div>
          </div>
          <div
            className="border-[#d7cdc0] border-b border-solid content-stretch flex items-center justify-between overflow-clip py-[24px] relative shrink-0 w-full"
            data-node-id="1:389"
            data-name="Question row"
          >
            <p
              className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#302820] text-[17px] whitespace-nowrap"
              data-node-id="1:390"
            >
              Is FOLD only for one kind of style?
            </p>
            <div
              className="relative shrink-0 size-[18px]"
              data-node-id="1:391"
              data-name="plus"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgPlus}
              />
            </div>
          </div>
          <div
            className="border-[#d7cdc0] border-b border-solid content-stretch flex items-center justify-between overflow-clip py-[24px] relative shrink-0 w-full"
            data-node-id="1:393"
            data-name="Question row"
          >
            <p
              className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#302820] text-[17px] whitespace-nowrap"
              data-node-id="1:394"
            >
              What happens to my photos and preferences?
            </p>
            <div
              className="relative shrink-0 size-[18px]"
              data-node-id="1:395"
              data-name="plus"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgPlus}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="bg-[#ede5d9] content-stretch flex h-[456px] items-start overflow-clip relative shrink-0 w-full"
        data-node-id="1:397"
        data-name="Begin your journey"
      >
        <div
          className="content-stretch flex flex-col gap-[28px] h-full items-start justify-center overflow-clip p-[64px] relative shrink-0 w-[880px]"
          data-node-id="1:398"
          data-name="Invitation copy"
        >
          <p
            className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#756b60] text-[11px] whitespace-nowrap"
            data-node-id="1:399"
          >
            09 / YOUR NEXT CHAPTER
          </p>
          <div
            className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] min-w-full not-italic relative shrink-0 text-[#302820] text-[64px] w-[min-content]"
            data-node-id="1:400"
          >
            <p className="leading-[1.06] mb-0">Get dressed with</p>
            <p className="leading-[1.06]">a little more certainty.</p>
          </div>
          <p
            className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.6] min-w-full not-italic relative shrink-0 text-[#756b60] text-[16px] w-[min-content]"
            data-node-id="1:401"
          >
            Begin with you. We’ll help with the possibilities.
          </p>
          <div
            className="content-stretch flex gap-[24px] items-center overflow-clip relative shrink-0"
            data-node-id="1:402"
            data-name="Invitation actions"
          >
            <div
              className="bg-[#302820] border border-[rgba(0,0,0,0)] border-solid content-stretch flex gap-[20px] h-[54px] items-center overflow-clip px-[24px] relative rounded-[2px] shrink-0"
              data-node-id="1:403"
              data-name="Action"
            >
              <p
                className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#f8f5ef] text-[14px] whitespace-nowrap"
                data-node-id="1:404"
              >
                Create my style portrait
              </p>
              <div
                className="relative shrink-0 size-[16px]"
                data-node-id="1:405"
                data-name="arrow-up-right"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgArrowUpRight}
                />
              </div>
            </div>
            <p
              className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#756b60] text-[12px] whitespace-nowrap"
              data-node-id="1:407"
            >
              5 minutes · No purchase required
            </p>
          </div>
        </div>
        <div
          className="flex-[1_0_0] h-full min-w-px relative"
          data-node-id="1:408"
          data-name="Fashion closing detail"
        >
          <img
            alt=""
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            src={imgFashionClosingDetail}
          />
        </div>
      </div>
      <div
        className="[word-break:break-word] bg-[#302820] content-stretch flex flex-col gap-[56px] items-start not-italic overflow-clip pb-[32px] pt-[64px] px-[64px] relative shrink-0 w-full whitespace-nowrap"
        data-node-id="1:409"
        data-name="Footer"
      >
        <div
          className="content-stretch flex items-start justify-between overflow-clip relative shrink-0 w-full"
          data-node-id="1:410"
          data-name="Footer navigation"
        >
          <div
            className="content-stretch flex flex-col gap-[16px] items-start overflow-clip relative shrink-0"
            data-node-id="1:411"
            data-name="Brand signature"
          >
            <p
              className="font-['Inter:Medium'] font-medium leading-none relative shrink-0 text-[#f8f5ef] text-[68px]"
              data-node-id="1:412"
            >
              FOLD
            </p>
            <p
              className="font-['Inter:Regular'] font-normal leading-[normal] relative shrink-0 text-[#d8c3a8] text-[13px]"
              data-node-id="1:413"
            >
              Personal style. Privately considered.
            </p>
          </div>
          <div
            className="content-stretch flex font-['Inter:Regular'] font-normal gap-[88px] items-start leading-[normal] overflow-clip relative shrink-0"
            data-node-id="1:414"
            data-name="Footer links"
          >
            <div
              className="content-stretch flex flex-col gap-[16px] items-start overflow-clip relative shrink-0"
              data-node-id="1:415"
              data-name="Link group"
            >
              <p
                className="relative shrink-0 text-[#d8c3a8] text-[10px]"
                data-node-id="1:416"
              >
                EXPLORE
              </p>
              <p
                className="relative shrink-0 text-[#f8f5ef] text-[13px]"
                data-node-id="1:417"
              >
                The journey
              </p>
              <p
                className="relative shrink-0 text-[#f8f5ef] text-[13px]"
                data-node-id="1:418"
              >
                Your style portrait
              </p>
              <p
                className="relative shrink-0 text-[#f8f5ef] text-[13px]"
                data-node-id="1:419"
              >
                The private edit
              </p>
            </div>
            <div
              className="content-stretch flex flex-col gap-[16px] items-start overflow-clip relative shrink-0"
              data-node-id="1:420"
              data-name="Link group"
            >
              <p
                className="relative shrink-0 text-[#d8c3a8] text-[10px]"
                data-node-id="1:421"
              >
                WITH CARE
              </p>
              <p
                className="relative shrink-0 text-[#f8f5ef] text-[13px]"
                data-node-id="1:422"
              >
                Our philosophy
              </p>
              <p
                className="relative shrink-0 text-[#f8f5ef] text-[13px]"
                data-node-id="1:423"
              >
                Privacy promise
              </p>
              <p
                className="relative shrink-0 text-[#f8f5ef] text-[13px]"
                data-node-id="1:424"
              >
                Get in touch
              </p>
            </div>
          </div>
        </div>
        <div
          className="border-[#61564a] border-solid border-t content-stretch flex font-['Inter:Regular'] font-normal items-start justify-between leading-[normal] overflow-clip pt-[24px] relative shrink-0 text-[#d8c3a8] text-[11px] w-full"
          data-node-id="1:425"
          data-name="Colophon"
        >
          <p className="relative shrink-0" data-node-id="1:426">
            © 2026 FOLD. A more considered way to dress.
          </p>
          <div
            className="content-stretch flex gap-[24px] items-start overflow-clip relative shrink-0"
            data-node-id="1:427"
            data-name="Legal links"
          >
            <p className="relative shrink-0" data-node-id="1:428">
              Terms
            </p>
            <p className="relative shrink-0" data-node-id="1:429">
              Privacy
            </p>
            <p className="relative shrink-0" data-node-id="1:430">
              Cookie preferences
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
