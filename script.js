const form = document.querySelector('form');
const resultDiv = document.querySelector('#result');

function calculateCompatibility(event) {
  event.preventDefault();

  // 이름 가져오기
  const name1 = document.querySelector('#name1').value.trim();
  const name2 = document.querySelector('#name2').value.trim();

  // 이름 궁합 계산하기
  const compatibility = calculateCompatibilityScore(name1, name2);

  // 결과 표시하기
  const resultText = `${name1}과(와) ${name2}의 궁합은 ${compatibility}% 입니다.`
  resultDiv.textContent = resultText;
}

function calculateCompatibilityScore(name1, name2) {
  // 이름 궁합 계산하는 함수
  let score = 0;

  for (let i = 0; i < name1.length; i++) {
    const c = name1.charAt(i);
    if (/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(c)) {
      score += getCompatibilityScore(c);
    }
  }

  for (let i = 0; i < name2.length; i++) {
    const c = name2.charAt(i);
    if (/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(c)) {
      score += getCompatibilityScore(c);
    }
  }

  // 최대 궁합 점수를 100으로 설정
  const maxScore = 100;

  // 점수 범위를 0에서 100 사이로 조정
  const compatibility = Math.round(score * maxScore / 66);

  return compatibility;
}

function getCompatibilityScore(c) {
  // 글자에 대응하는 궁합 점수를 반환하는 함수
  // 이 함수에서는 초성/중성/종성을 구분하여 각각에 대응하는 숫자를 더합니다.
  const code = c.charCodeAt(0);
  let score = 0;

  if (0x1100 <= code && code <= 0x115f) { // 초성
    score += 3;
  } else if (0x1160 <= code && code <= 0x11a7) { // 중성
    score += 5;
  } else if (0x11a8 <= code && code <= 0x11ff) { // 종성
    score += 4;
  } else { // 한글 자모가 아닌 경우 1을 더함
    score += 1;
  }

  return score;
}

form.addEventListener('submit', calculateCompatibility);
