import React from "react"; 
import Observer from "../../../util/Observer";

export const coupleScrollEvent = new Observer("scroll");

export default function useScrollCouple(closedHeight = 120, openHeight = 420) {
  /**
   * scrollerRef attaches to the scrolling div to allow the
   * addEventListener call later
   */
  const scrollerRef = React.useRef(null);
  const [scrollOffset, setScrollOffset] = React.useState(0);
  const [scrollerState, setScrollerState] = React.useState(0);
  // const { playerState, screenSize, sitrep } = React.useContext(PlayerContext);
  // const { selectedId } = playerState;
  // const { small } = screenSize;

  /**
   * scrolling div fires the coupleScrollEvent observer
   */
  const reportScroll = React.useCallback(() => {
    const scroller = scrollerRef.current;
    const { scrollTop, scrollHeight, clientHeight } = scroller;
    // console.log(scrollTop);
    coupleScrollEvent.next(scrollTop);
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      coupleScrollEvent.next(openHeight);
    }
  }, [openHeight]);

  /**
   * hook both fires and responds to the same event, since
   * the scroller is firing and the header is responding
   */
  React.useEffect(() => {
    const scroller = scrollerRef.current || scrollerState;
    const settings = { passive: true };

    if (scroller) {
      // console.log("attached!");
      scroller.addEventListener("scroll", reportScroll, settings);
    } else {
      console.log("not attached!");
    }

    // if (!scroller) {
    //   return console.log("No scroller was found.");
    // }
    // console.log("attached!");
    setScrollerState(scroller);
    !!scroller && scroller.addEventListener("scroll", reportScroll, settings);
    const sub = coupleScrollEvent.subscribe(setScrollOffset);
    return () => {
      sub.unsubscribe();
      !!scroller &&
        scroller.removeEventListener("scroll", reportScroll, settings);
    };
  }, [scrollerRef, reportScroll, scrollerState]);

  /**
   * outer/inner styles derived from the scroller offset
   * and the current size of the footer
   */
  const playheadHeight = 60; // !!selectedId?.track ? 120 : 60;
  const footerHeight = 0; //small ? playheadHeight : 0;

  const maxHeight = "calc(100vh - var(--header-offset) - var(--footer-offset))";
  const innerStyle = { maxHeight, overflow: "auto" };
  const outerStyle = {
    "--footer-offset": footerHeight + "px",
    "--scroll-offset": scrollOffset + "px",
    "--header-offset": closedHeight + "px",
  };
  return { scrollerRef, outerStyle, innerStyle };
}
