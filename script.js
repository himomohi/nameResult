const form = document.querySelector('form');
const resultDiv = document.querySelector('#result');

function calculateCompatibility(event) {
  event.preventDefault();

  // 이름 가져오기
  const name1 = document.querySelector('#name1').value.trim();
  const name2 = document.querySelector('#name2').value.trim();

  // 이름 획수 구하기
  let strokes1 = 0;
  let strokes2 = 0;

  for (let i = 0; i < name1.length; i++) {
    const c = name1.charAt(i);
    if (/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(c)) {
      strokes1 += getStrokes(c);
    }
  }

  for (let i = 0; i < name2.length; i++) {
    const c = name2.charAt(i);
    if (/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(c)) {
      strokes2 += getStrokes(c);
    }
  }

  // 이름 획수로 계산하기
  const compatibility = calculateCompatibilityScore(strokes1, strokes2);

  // 결과 표시하기
  const resultText = `${name1}과(와) ${name2}의 궁합은 ${compatibility}% 입니다.`
  resultDiv.textContent = resultText;
}

function getStrokes(c) {
  // 글자의 획수를 반환하는 함수
  // 이 함수에서는 간단하게 2, 3, 4로 분류하여 계산합니다.
  const code = c.charCodeAt(0);
  if (0x1100 <= code && code <= 0x11ff) {  // 초성
    return 2;
  } else if (0x3131 <= code && code <= 0x318e) {  // 자음
    return 2;
  } else if (0x1161 <= code && code <= 0x1175) {  // 중성
    return 3;
  } else if (0x11a8 <= code && code <= 0x11c2) {  // 종성
    return 4;
  } else {
    return 0;
  }
}

function calculateCompatibilityScore(strokes1, strokes2) {
  // 이름 궁합 계산하는 함수
  const ratio = strokes1 / strokes2;
  const compatibility = Math.round(100 * Math.min(ratio, 1/ratio));
  return compatibility;
}

form.addEventListener('submit', calculateCompatibility);
