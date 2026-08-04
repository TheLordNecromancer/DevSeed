const title = document.getElementById("titulo-scramble");

const originalText = title.textContent;
const chars = "ABCDEF@HIJ_LM%OPQR^WX#YZa#b+cdefgh*iqrxyz0123456789";

const scrambleSpeed = 50;
const scrambleDuration = 0.5;
const revealDuration = 1.5;

let activeScrambleId = 0;

function randomChar() {
  return chars[Math.floor(Math.random() * chars.length)];
}

function scrambleReveal(element, text, scrambleTime, revealTime) {
  const runId = ++activeScrambleId;
  const start = performance.now();
  let lastTick = 0;

  function loop(now) {
    if (runId !== activeScrambleId) return;

    if (now - lastTick < scrambleSpeed) {
      requestAnimationFrame(loop);
      return;
    }

    lastTick = now;

    const elapsed = (now - start) / 1000;

    if (elapsed < scrambleTime) {
      let output = "";

      for (let i = 0; i < text.length; i++) {
        output += text[i] === " " ? " " : randomChar();
      }

      element.textContent = output;
      requestAnimationFrame(loop);
      return;
    }

    const progress = Math.min((elapsed - scrambleTime) / revealTime, 1);
    const revealCount = Math.floor(progress * text.length);

    let output = "";

    for (let i = 0; i < text.length; i++) {
      if (text[i] === " ") {
        output += " ";
      } else {
        output += i < revealCount ? text[i] : randomChar();
      }
    }

    element.textContent = output;

    if (progress < 1) {
      requestAnimationFrame(loop);
    } else {
      element.textContent = text;
    }
  }

  requestAnimationFrame(loop);
}

window.addEventListener("load", () => {
  scrambleReveal(title, originalText, scrambleDuration, revealDuration);
});