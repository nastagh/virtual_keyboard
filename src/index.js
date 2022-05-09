// import { internalIP } from 'webpack-dev-server';
import './styles.css';

const keyboardLanguage = localStorage.getItem('language') || 'english';

const container = document.createElement('div');
const headerText = document.createElement('h1');
const textarea = document.createElement('textarea');
const containerKeyboard = document.createElement('div');
let capsLockSwich = true;
let cursorPosition = 0;
let onLang = true;
let onShift = true;
let isRightShift = false;
textarea.addEventListener('click', () => {
  cursorPosition = textarea.selectionStart;
});
container.classList.add('container');
document.body.appendChild(container);

headerText.innerText = 'Virtual Keyboard';
container.appendChild(headerText);

textarea.setAttribute('rows', 15);
container.appendChild(textarea);

containerKeyboard.classList.add('containerKeyboard');
container.appendChild(containerKeyboard);

const keyboard = [[96, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61], [113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 91, 93, 92], [97, 115, 100, 102, 103, 104, 106, 107, 108, 59, 39], [122, 120, 99, 118, 98, 110, 109, 44, 46, 47]];
const upperKeyboard = [[96, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61], [81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 91, 93, 92], [83, 68, 70, 71, 72, 74, 75, 76, 108, 59, 39], [90, 88, 67, 86, 66, 78, 77, 44, 46, 47]];
const upperRusKeyboard = [[1025, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61], [1049, 1062, 1059, 1050, 1045, 1053, 1043, 1064, 1065, 1047, 1061, 1066, 92], [1060, 1067, 1042, 1040, 1055, 1056, 1054, 1051, 1044, 1046, 1069], [1071, 1063, 1057, 1052, 1048, 1058, 1068, 1041, 1070, 46]];
const rusKeyboard = [[1105, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61], [1081, 1094, 1091, 1082, 1077, 1085, 1075, 1096, 1097, 1079, 1093, 1098, 92], [1092, 1099, 1074, 1072, 1087, 1088, 1086, 1083, 1076, 1078, 1101], [1103, 1095, 1089, 1084, 1080, 1090, 1100, 1073, 1102, 46]];
const upperKeyboardShift = [[1156, 33, 64, 35, 36, 37, 94, 38, 42, 40, 41, 45, 43], [81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 123, 125, 47], [83, 68, 70, 71, 72, 74, 75, 76, 108, 58, 34], [90, 88, 67, 86, 66, 78, 77, 60, 62, 63]];
const upperRusKeyboardShift = [[1025, 33, 34, 8470, 59, 37, 58, 63, 42, 40, 41, 45, 43], [1049, 1062, 1059, 1050, 1045, 1053, 1043, 1064, 1065, 1047, 1061, 1066, 47], [1060, 1067, 1042, 1040, 1055, 1056, 1054, 1051, 1044, 1046, 1069], [1071, 1063, 1057, 1052, 1048, 1058, 1068, 1041, 1070, 39]];
const rusKeyboardShift = [[1105, 33, 34, 8470, 59, 37, 58, 63, 42, 40, 41, 45, 43], [1081, 1094, 1091, 1082, 1077, 1085, 1075, 1096, 1097, 1079, 1093, 1098, 92], [1092, 1099, 1074, 1072, 1087, 1088, 1086, 1083, 1076, 1078, 1101], [1103, 1095, 1089, 1084, 1080, 1090, 1100, 1073, 1102, 39]];
const keyboardShift = [[1156, 33, 64, 35, 36, 37, 94, 38, 42, 40, 41, 45, 43], [113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 123, 125, 47], [97, 115, 100, 102, 103, 104, 106, 107, 108, 58, 34], [122, 120, 99, 118, 98, 110, 109, 60, 62, 63]];

function addChar(char) {
  const text = textarea.value;
  textarea.value = text.substring(0, cursorPosition) + char + text.substring(cursorPosition, text.length);
  cursorPosition += 1;
}

const infText = document.createElement('h4');
infText.innerText = 'Virtual keyboard created in Window OS';
container.appendChild(infText);
const infLang = document.createElement('h4');
infLang.innerText = 'Press Ctrl+Alt to change language';
container.appendChild(infLang);

function creatKeyboard(dictionary) {
  containerKeyboard.innerHTML = '';
  for (let i = 0; i < dictionary.length; i += 1) {
    const keyRow = document.createElement('div');
    keyRow.classList.add('keyRow');
    containerKeyboard.appendChild(keyRow);

    for (let j = 0; j < dictionary[i].length; j += 1) {
      const key = document.createElement('div');
      key.classList.add('key');
      key.setAttribute('data', dictionary[i][j]);

      key.innerText = String.fromCharCode(dictionary[i][j]);
      keyRow.appendChild(key);

      key.onmousedown = () => {
        addChar(key.textContent);
      };

      key.onmouseup = () => {
        key.classList.remove('active');
      };
    }
  }
  createSpecialKeys();
}

if (keyboardLanguage === 'english') {
  creatKeyboard(keyboard);
} else {
  creatKeyboard(rusKeyboard);
}

function switchShift() {
  onShift = !onShift;
  if (onShift) {
    if (onLang) {
      if (capsLockSwich) {
        creatKeyboard(keyboard);
      } else {
        creatKeyboard(upperKeyboard);
      }
    } else if (capsLockSwich) {
      creatKeyboard(rusKeyboard);
    } else {
      creatKeyboard(upperRusKeyboard);
    }
  } else if (onLang) {
    if (capsLockSwich) {
      creatKeyboard(upperKeyboardShift);
    } else {
      creatKeyboard(keyboardShift);
    }
  } else if (capsLockSwich) {
    creatKeyboard(upperRusKeyboardShift);
  } else {
    creatKeyboard(rusKeyboardShift);
  }
}

document.onkeyup = (event) => {
  document.querySelectorAll('.key').forEach((element) => {
    element.classList.remove('active');
  });

  if (event.code === 'ShiftLeft') {
    switchShift();
  }
  if (event.code === 'ShiftRight') {
    isRightShift = false;
    switchShift();
  }
  return event;
};

function switchCase() {
  capsLockSwich = !capsLockSwich;
  if (capsLockSwich) {
    if (onLang) {
      creatKeyboard(keyboard);
    } else {
      creatKeyboard(rusKeyboard);
    }
  } else if (onLang) {
    creatKeyboard(upperKeyboard);
  } else {
    creatKeyboard(upperRusKeyboard);
  }
}

function switchLanguage() {
  onLang = !onLang;
  if (onLang) {
    localStorage.setItem('language', 'english');
    if (capsLockSwich) {
      creatKeyboard(keyboard);
    } else {
      creatKeyboard(upperKeyboard);
    }
  } else {
    localStorage.setItem('language', 'russian');
    if (capsLockSwich) {
      creatKeyboard(rusKeyboard);
    } else {
      creatKeyboard(upperRusKeyboard);
    }
  }
}

function createSpecialKeys() {
  const backspace = document.createElement('div');
  backspace.classList.add('key');
  backspace.classList.add('specialButton');
  backspace.classList.add('mouseActive');
  backspace.innerText = 'Backspace';
  document.getElementsByClassName('keyRow')[0].appendChild(backspace);

  const tab = document.createElement('div');
  tab.classList.add('key');
  tab.classList.add('specialButton');
  tab.classList.add('mouseActive');
  tab.innerText = 'Tab';
  document.getElementsByClassName('keyRow')[1].prepend(tab);

  const del = document.createElement('div');
  del.classList.add('key');
  del.classList.add('specialButton');
  del.classList.add('mouseActive');
  del.innerText = 'Del';
  document.getElementsByClassName('keyRow')[1].appendChild(del);

  const capsLock = document.createElement('div');
  capsLock.classList.add('key');
  capsLock.classList.add('specialButton');
  if (capsLockSwich) {
    capsLock.classList.toggle('capsLk');
  }
  capsLock.classList.toggle('capsLk');
  capsLock.classList.add('mouseActive');
  capsLock.innerText = 'CapsLock';
  document.getElementsByClassName('keyRow')[2].prepend(capsLock);

  const enter = document.createElement('div');
  enter.classList.add('key');
  enter.classList.add('specialButton');
  enter.classList.add('mouseActive');
  enter.innerText = 'Enter';
  document.getElementsByClassName('keyRow')[2].appendChild(enter);

  const shiftLeft = document.createElement('div');
  shiftLeft.classList.add('key');
  shiftLeft.classList.add('specialButton');

  if (!onShift && !isRightShift) {
    shiftLeft.classList.toggle('capsLk');
  }

  shiftLeft.classList.add('mouseActive');
  shiftLeft.innerText = 'Shift';
  document.getElementsByClassName('keyRow')[3].prepend(shiftLeft);

  const arrowTopContainer = document.createElement('div');
  arrowTopContainer.classList.add('key');
  arrowTopContainer.classList.add('arrowContainer');
  arrowTopContainer.classList.add('mouseActive');
  const arrowTop = document.createElement('div');
  arrowTop.classList.add('treangle_top');
  arrowTopContainer.appendChild(arrowTop);
  document.getElementsByClassName('keyRow')[3].appendChild(arrowTopContainer);

  const shiftRight = document.createElement('div');
  shiftRight.classList.add('key');
  shiftRight.classList.add('specialButton');
  if (!onShift && isRightShift) {
    shiftRight.classList.toggle('capsLk');
  }
  shiftRight.classList.add('mouseActive');
  shiftRight.innerText = 'Shift';
  document.getElementsByClassName('keyRow')[3].appendChild(shiftRight);

  const keyRow = document.createElement('div');
  keyRow.classList.add('keyRow');
  const keyLeftcontainer = document.createElement('div');
  keyLeftcontainer.classList.add('keyRow');
  const ctrlLeft = document.createElement('div');
  ctrlLeft.classList.add('key');
  ctrlLeft.classList.add('specialButton');
  ctrlLeft.classList.add('mouseActive');
  ctrlLeft.innerText = 'Ctrl';
  const win = document.createElement('div');
  win.classList.add('key');
  win.classList.add('specialButton');
  win.classList.add('mouseActive');
  win.innerText = 'Win';
  const altLeft = document.createElement('div');
  altLeft.classList.add('key');
  altLeft.classList.add('specialButton');

  altLeft.classList.add('mouseActive');
  altLeft.innerText = 'Alt';

  keyLeftcontainer.appendChild(ctrlLeft);
  keyLeftcontainer.appendChild(win);
  keyLeftcontainer.appendChild(altLeft);

  const space = document.createElement('div');
  space.classList.add('key');
  space.classList.add('specialButton');
  space.classList.add('mouseActive');

  const keyRightcontainer = document.createElement('div');
  keyRightcontainer.classList.add('keyRow');

  const altRight = document.createElement('div');
  altRight.classList.add('key');
  altRight.classList.add('specialButton');
  altRight.classList.add('mouseActive');
  altRight.innerText = 'Alt';

  const arrowLeftContainer = document.createElement('div');
  arrowLeftContainer.classList.add('key');
  arrowLeftContainer.classList.add('arrowContainer');
  arrowLeftContainer.classList.add('mouseActive');
  const arrowLeft = document.createElement('div');
  arrowLeft.classList.add('treangle_left');
  arrowLeftContainer.appendChild(arrowLeft);

  const arrowBottomContainer = document.createElement('div');
  arrowBottomContainer.classList.add('key');
  arrowBottomContainer.classList.add('arrowContainer');
  arrowBottomContainer.classList.add('mouseActive');
  const arrowBottom = document.createElement('div');
  arrowBottom.classList.add('treangle_bottom');
  arrowBottomContainer.appendChild(arrowBottom);

  const arrowRightContainer = document.createElement('div');
  arrowRightContainer.classList.add('key');
  arrowRightContainer.classList.add('arrowContainer');
  arrowRightContainer.classList.add('mouseActive');
  const arrowRight = document.createElement('div');
  arrowRight.classList.add('treangle_right');
  arrowRightContainer.appendChild(arrowRight);

  const ctrlRight = document.createElement('div');
  ctrlRight.classList.add('key');
  ctrlRight.classList.add('specialButton');
  ctrlRight.classList.add('mouseActive');
  ctrlRight.innerText = 'Ctrl';

  keyRightcontainer.appendChild(altRight);
  keyRightcontainer.appendChild(arrowLeftContainer);
  keyRightcontainer.appendChild(arrowBottomContainer);
  keyRightcontainer.appendChild(arrowRightContainer);
  keyRightcontainer.appendChild(ctrlRight);

  keyRow.appendChild(keyLeftcontainer);
  keyRow.appendChild(space);
  keyRow.appendChild(keyRightcontainer);

  containerKeyboard.appendChild(keyRow);

  document.onkeydown = (event) => {
    event.preventDefault();
    const text = textarea.value;

    if (event.altKey && event.ctrlKey) {
      switchLanguage();
    }

    switch (event.code) {
      case 'Backspace':
        backspace.classList.add('active');
        textarea.value = text.substring(0, cursorPosition - 1) + text.substring(cursorPosition, text.length);
        if (cursorPosition) {
          cursorPosition -= 1;
        }
        break;
      case 'Tab':
        tab.classList.add('active');
        addChar('\t');
        break;
      case 'Enter':
        enter.classList.add('active');
        addChar('\n');
        break;
      case 'ShiftLeft':
        shiftLeft.classList.toggle('capsLk');
        switchShift();
        break;
      case 'ShiftRight':
        shiftRight.classList.toggle('capsLk');
        isRightShift = true;
        switchShift();
        break;
      case 'ControlLeft':
        ctrlLeft.classList.add('active');
        break;
      case 'ControlRight':
        ctrlRight.classList.add('active');
        break;
      case 'AltLeft':
        altLeft.classList.add('active');
        break;
      case 'AltRight':
        altRight.classList.add('active');
        break;
      case 'CapsLock':
        capsLock.classList.add('active');
        switchCase();
        break;
      case 'Space':
        space.classList.add('active');
        addChar(' ');
        break;
      case 'ArrowLeft':
        arrowLeftContainer.classList.add('active');
        addChar('\u2190');
        break;
      case 'ArrowUp':
        arrowTopContainer.classList.add('active');
        addChar('\u2191');
        break;
      case 'ArrowRight':
        arrowRightContainer.classList.add('active');
        addChar('\u2192');
        break;
      case 'ArrowDown':
        arrowBottomContainer.classList.add('active');
        addChar('\u2193');
        break;
      case 'Delete':
        del.classList.add('active');
        textarea.value = text.substring(0, cursorPosition) + text.substring(cursorPosition + 1, text.length);
        break;
      case 'MetaLeft':
        win.classList.add('active');
        break;
      default:
        if (document.querySelector(`.key[data="${event.key.charCodeAt()}"]`)) {
          document.querySelector(`.key[data="${event.key.charCodeAt()}"]`).classList.add('active');
          addChar(event.key);
        }
    }
    textarea.setSelectionRange(cursorPosition, cursorPosition);
  };

  const mouseActive = Array.from(document.getElementsByClassName('mouseActive'));
  mouseActive.forEach((e) => {
    e.onmousedown = () => {
      e.classList.add('active');
      const text = textarea.value;

      if (e === backspace) {
        textarea.value = text.substring(0, cursorPosition - 1) + text.substring(cursorPosition, text.length);
        if (cursorPosition) {
          cursorPosition -= 1;
        }
      } else if (e === capsLock) {
        switchCase();
      } else if (e === space) {
        cursorPosition += 1;
        addChar(' ');
      } else if (e === del) {
        textarea.value = text.substring(0, cursorPosition) + text.substring(cursorPosition + 1, text.length);
      } else if (e === arrowLeftContainer) {
        cursorPosition += 1;
        addChar('\u2190');
      } else if (e === arrowRightContainer) {
        cursorPosition += 1;
        addChar('\u2192');
      } else if (e === arrowTopContainer) {
        cursorPosition += 1;
        addChar('\u2191');
      } else if (e === arrowBottomContainer) {
        cursorPosition += 1;
        addChar('\u2193');
      } else if (e === enter) {
        cursorPosition += 1;
        addChar('\n');
      } else if (e === tab) {
        cursorPosition += 1;
        addChar('\t');
      } else if (e === shiftLeft) {
        switchShift();
      } else if (e === shiftRight) {
        isRightShift = true;
        switchShift();
      }
    };
    e.onmouseup = () => {
      if (e === shiftLeft) {
        switchShift();
      }
      if (e === shiftRight) {
        isRightShift = false;
        switchShift();
      }
      e.classList.remove('active');
    };
  });
}
