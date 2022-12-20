console.log("agora");



window.addEventListener("DOMContentLoaded", (event) => {
    // Split text into spans
    let typeSplit = new SplitType("[text-split]", {
      types: "words, chars",
      tagName: "span"	
    });
  
    // Link timelines to scroll position
    function createScrollTrigger(triggerElement, timeline) {
      // Reset tl when scroll out of view past bottom of screen
      ScrollTrigger.create({
        trigger: triggerElement,
        start: "top bottom",
        onLeaveBack: () => {
          timeline.progress(0);
          timeline.pause();
        }
      });
      // Play tl when scrolled into view (60% from top of screen)
      ScrollTrigger.create({
        trigger: triggerElement,
        start: "top 100%",
        onEnter: () => timeline.play().delay(.2)
      });
    }
    
    
    // LETTERS SLIDE UP
    //———————————————————————————————————————————————————————
    //———————————————————————————————————————————————————————
    $("[letters-slide-up]").each(function (index) {
      let tl = gsap.timeline({ paused: true });
      tl.from($(this).find(".char"), { yPercent: 200, rotation:35, duration: 0.5, ease: "power2.out", stagger: { amount: 0.5 } });
      createScrollTrigger($(this), tl);
    });
  
  
    // SCRUB
    //———————————————————————————————————————————————————————
    //———————————————————————————————————————————————————————
    $("[scrub-each-word]").each(function (index) {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: $(this),
          start: "top 95%",
          end: "top 80%",
         // markers: true,
          scrub: true
        }
      });
      tl.from($(this).find(".char"), { opacity: 0.1, duration: 0.3, ease: "power1.out", stagger: { each: 0.5 } });
    });
    
    
    
    
    // ———————————————————————————————
    // Button hover
   
    // ———————————————————————————————
    // Button hover
   
   function PlayBtn(bottom, top) {
      const btnTl = gsap.timeline({ paused: true });
      btnTl.fromTo(
          top.chars,
          {
              y: "0%",
          },
          {
              y: "-100%",
              stagger: { amount: 0.4 },
              duration: 0.4,
              ease: "power2.out",
          }
      ).fromTo(
          bottom.chars,
          {
              y: "100%",
          },
          {
              y: "0%",
              stagger: { amount: 0.5 },
              duration: 0.4,
              ease: "power2.out",
          },
          "<"
      );
  
      return btnTl;
  }
  
  
  
  
  const btnList = document.querySelectorAll('.btn-anim');
  btnList.forEach((button, index) => {
      const bottomText = button.querySelector(".button-mask .button-absolute-bottom");
      const topText = button.querySelector(".button-mask .button-absolute-text");
      const bottomSplitTxt = new SplitType(bottomText);
      const topSplitTxt = new SplitType(topText);
      
      
  
      $(button).mouseleave(function () {
       PlayBtn(bottomSplitTxt,topSplitTxt ).clear();
       console.log("in");
           });
      
       $(button).mouseenter(function () {
             PlayBtn(bottomSplitTxt,topSplitTxt).play();
         console.log("out");
              });
  })
      
  
    
  
    // Avoid flash of unstyled content
    gsap.set("[text-split]", { opacity: 1 });
  });