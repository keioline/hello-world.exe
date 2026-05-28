const modes = {
  basic: {
    era: "1977",
    label: "home computer ritual",
    command: "RUN BASIC_HELLO.BAS",
    code: '10 PRINT "HELLO WORLD"\n20 GOTO 10',
    caption: "The infinite loop version: friendly, stubborn, and absolutely committed to the bit.",
  },
  c: {
    era: "1978",
    label: "portable small spell",
    command: "CC HELLO.C && HELLO",
    code: '#include <stdio.h>\n\nint main(void) {\n  puts("Hello, World!");\n  return 0;\n}',
    caption: "The canonical handshake: a tiny program wearing a very serious pair of braces.",
  },
  python: {
    era: "1991",
    label: "one-line clarity",
    command: "PYTHON HELLO.PY",
    code: 'print("Hello, World!")',
    caption: "No ceremony. No boilerplate. Just a sentence with a pulse.",
  },
  enterprise: {
    era: "2026",
    label: "mission-critical greeting infrastructure",
    command: "DEPLOY --ENV=PROD --GREETING=HELLO",
    code:
      "POST /api/v1/greetings\n" +
      "{\n" +
      '  "message": "Hello, World!",\n' +
      '  "observability": true,\n' +
      '  "meetingsRequired": 4\n' +
      "}",
    caption: "Guaranteed highly available, horizontally scalable, and still somehow just Hello World.",
  },
  esolang: {
    era: "????",
    label: "beautifully unnecessary",
    command: "INTERPRET HWL",
    code: "summon hello\namplify world\nship it",
    caption: "A fictional language with three commands and suspiciously strong product-market fit.",
  },
};

const buttons = document.querySelectorAll(".mode");
const program = document.querySelector("#program code");
const era = document.querySelector("#era");
const label = document.querySelector("#label");
const caption = document.querySelector("#caption");
const typedCommand = document.querySelector("#typed-command");
const reboot = document.querySelector("#reboot");
const clock = document.querySelector("#clock");

let activeMode = "basic";
let typingTimer;

function setClock() {
  clock.textContent = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
}

function typeCommand(text) {
  clearInterval(typingTimer);
  typedCommand.textContent = "";

  let index = 0;
  typingTimer = setInterval(() => {
    typedCommand.textContent = text.slice(0, index);
    index += 1;

    if (index > text.length) {
      clearInterval(typingTimer);
    }
  }, 34);
}

function renderMode(modeName) {
  const mode = modes[modeName];
  activeMode = modeName;

  buttons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.mode === modeName);
  });

  era.textContent = mode.era;
  label.textContent = mode.label;
  program.textContent = mode.code;
  caption.textContent = mode.caption;
  typeCommand(mode.command);
}

buttons.forEach((button) => {
  button.addEventListener("click", () => renderMode(button.dataset.mode));
});

reboot.addEventListener("click", () => {
  document.body.classList.add("rebooting");
  renderMode(activeMode);
  window.setTimeout(() => document.body.classList.remove("rebooting"), 220);
});

setClock();
window.setInterval(setClock, 1000);
renderMode("basic");
