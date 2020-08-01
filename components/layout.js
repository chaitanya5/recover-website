import Link from 'next/link'
import { useLayoutEffect, useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { slide as Menu } from 'react-burger-menu'

import Button from './elements/button'

function useResponsive() {
  const [isClient, setIsClient] = useState(false);

  const isMobile = useMediaQuery({
    maxWidth: '1224px'
  })

  const isDesktop = useMediaQuery({
    minWidth: '1224px'
  })

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') setIsClient(true);
  }, [])

  return {
    isDesktop: isClient ? isDesktop : true,
    isMobile: isClient ? isMobile : false
  }
}

function Scroll({setTop, isTop}) {
  useEffect(function onFirstMount() {
    function onScroll() {
      window.document.addEventListener('scroll', () => {
        if ((window.scrollY < 30) !== isTop) {
          setTop(false)
        } else {
          setTop(true)
        }
      })
    }

    window.addEventListener("scroll", onScroll);
  }, []) // empty dependencies array means "run this once on first mount"

  return null
}

const Layout = ({ children }) => {
  const { isMobile } = useResponsive()

  const [isTop, setTop] = useState(true)

  Scroll({setTop, isTop})

  return (
    <>
      <nav suppressHydrationWarning={true}>{/* FIXME: remove this props to mute warning. */}
        {
          isMobile ? (
            <div className="header-menu-small">
              <img className="header-menu-logo" src="/RECOVER-logo.svg" alt="Recover Logo" />
              <Menu>
                <a href="https://app.recover.ws/" target="_blank">APPLICATION</a>
                <Link href="/blog"><a>BLOG</a></Link>
                <Link href="/about"><a>ABOUT</a></Link>
              </Menu>
            </div>
          ) : (
            <div className={`header-menu ${isTop ? 'header-menu__isTop' : ''}`}>
              <div><img className="header-menu-logo" src="RECOVER-logo.svg" alt="Recover Logo" /></div>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{padding: '0 40px'}}><a href="https://app.recover.ws/" target="_blank">APPLICATION</a></div>
                <div style={{padding: '0 40px'}}><Link href="/blog"><a>BLOG</a></Link></div>
                <div style={{padding: '0 40px'}}><Link href="/about"><a>ABOUT</a></Link></div>
              </div>
              <div><Link href="/about"><Button isPrimary={true}>Get Your Loser Box</Button></Link></div>
            </div>
          )
        }
      </nav>

      <main role="main">
        <div className="container">{children}</div>
      </main>

      <div style={{margin: '30px 0 10px 0', textAlign: 'center'}}>
        <footer>
          @RECOVER 2020
        </footer>
      </div>

      <style jsx global>
        {`
          @import url('https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700');
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap');

          body, html {
            min-width: 100vw;
            min-height: 100hw;
          }

          *, *::after, *::before {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
          }

          body {
            font-family: Montserrat, Roboto, sans-serif;
            text-rendering: optimizeLegibility;
            color: #444;
          }

          a {
            text-decoration: none;
            color: #444;
            font-weight: 500;
          }

          .header-menu {
            display: flex;
            justify-content: space-between;
            position: fixed;
            min-width: 100vw;
            padding: 2px calc((100vw - 1250px) / 2) 0 calc((100vw - 1250px) / 2);
            line-height: 58px;
            color: #444;
            box-shadow: 0px 1px 10px #999;
            background: #fff;
            z-index: 1000;
          }
          
          .header-menu__isTop {
            position: absolute;
            margin-top: 30px;
            box-shadow: 0 0 0 #fff;
            z-index: 1000;
          }

          .header-menu-logo {
            position: relative;
            top: 7px;
          }

          .header-menu-small {
            position: fixed;
            box-shadow: 0px 1px 10px #999;
            background: #fff;
            line-height: 60px;
            min-width: 100%;
            color: #444;
            z-index: 100;
          }

          /* Position and sizing of burger button */
          .bm-burger-button {
            position: fixed;
            width: 36px;
            height: 30px;
            right: 36px;
            top: 16px;
          }

          /* Color/shape of burger icon bars */
          .bm-burger-bars {
            background: #444;
          }

          /* Color/shape of burger icon bars on hover*/
          .bm-burger-bars-hover {
            background: #444;
          }

          /* Position and sizing of clickable cross button */
          .bm-cross-button {
            height: 24px;
            width: 24px;
          }

          /* Color/shape of close button cross */
          .bm-cross {
            background: #444;
          }

          /*
          Sidebar wrapper styles
          Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
          */
          .bm-menu-wrap {
            position: fixed;
            height: 100%;
          }

          /* General sidebar styles */
          .bm-menu {
            background: #fff;
            padding: 2.5em 1.5em 0;
            font-size: 1.15em;
          }

          /* Wrapper for item list */
          .bm-item-list {
            color: #444;
            padding: 0.8em;
          }

          /* Individual item */
          .bm-item {
            display: inline-block;
          }

          /* Styling of overlay */
          .bm-overlay {
            background: rgba(0, 0, 0, 0.3);
          }

          .container {
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            padding-top: 200px;
          }

          div[id^="rcc"] {
            padding: 8px 0;
            border-bottom: 1px solid #efefef;
          }

          .additionalClassForHead {
            padding: 5px 0;
            background: #fff !important;
            color: #444 !important;
            font-weight: 300 !important;
          }

          .additionalClassForHead h3 {
            font-family: Montserrat;
            font-size: 22px !important;
            font-weight: 200 !important;
            margin: 0;
            padding: 0;
          }
  
          .additionalClassForHead:hover, .active-accordion {
            color: #444 !important;
            background: #fff !important;
          }
  
          .additionalClassForContent {
            background: #fff !important;
            margin: 0 !important;
            padding: 17px 0 !important;
            line-height: 24px !important;
          }

          .additionalClassForContent p {
            padding: 7px 0;
          }
        `}
      </style>
    </>
  )
}
  
export default Layout