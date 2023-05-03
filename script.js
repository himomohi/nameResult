function decomposeKoreanSyllable(syllable) {
  const initialConsonants = [
    'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
  ];
  const medialVowels = [
    'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'
  ];
  const finalConsonants = [
    '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
  ];

  const code = syllable.charCodeAt(0) - 0xAC00;

  const initialConsonantIndex = Math.floor(code / (21 * 28));
  const medialVowelIndex = Math.floor((code % (21 * 28)) / 28);
  const finalConsonantIndex = code % 28;

  return [
    initialConsonants[initialConsonantIndex],
    medialVowels[medialVowelIndex],
    finalConsonants[finalConsonantIndex]
  ];
}
function calculateCompatibilityScore(name1, name2) {
  let totalScore1 = 0;
  let totalScore2 = 0;

  for (const char of name1) {
    const [initial, medial, final] = decomposeKoreanSyllable(char);
    totalScore1 += initial.charCodeAt(0) + medial.charCodeAt(0) + (final ? final.charCodeAt(0) : 0);
  }

  for (const char of name2) {
    const [initial, medial, final] = decomposeKoreanSyllable(char);
    totalScore2 += initial.charCodeAt(0) + medial.charCodeAt(0) + (final ? final.charCodeAt(0) : 0);
  }

  const compatibility = Math.round(Math.abs(totalScore1 - totalScore2) * 100 / (totalScore1 + totalScore2));

  return compatibility;
}
