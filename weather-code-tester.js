let codes = [
  0,
  1,
  2,
  3,
  10,
  21,
  22,
  23,
  24,
  29,
  38,
  39,
  45,
  49,
  50,
  51,
  56,
  57,
  60,
  61,
  62,
  63,
  64,
  65,
  66,
  67,
  68,
  69,
  70,
  71,
  72,
  73,
  74,
  75,
  79,
  80,
  81,
  82,
  83,
  84,
  85,
  86,
  87,
  88,
  91,
  92,
  93,
  94
];

let codeFreq = codes.map(code => {
  return { code: code, freq: 0, err: null };
});

let error = false;

codeFreq.forEach(code => {
  if (code.code == 0) code.freq++;
  if (code.code >= 1 && code.code <= 3) code.freq++;
  if (code.code == 10 || code.code == 45) code.freq++;
  if (
    (code.code >= 21 && code.code <= 29) ||
    (code.code >= 50 && code.code <= 65) ||
    (code.code >= 80 && code.code <= 82) ||
    code.code == 91 ||
    code.code == 92
  )
    code.freq++;
  if (
    (code.code >= 66 && code.code <= 79) ||
    (code.code >= 83 && code.code <= 88) ||
    code.code == 38 ||
    code.code == 39 ||
    code.code == 49 ||
    code.code == 93 ||
    code.code == 94
  )
    code.freq++;

  if (code.freq != 1) {
    code.err = "Frequency is not equal to 1";
    error = true;
  }
});

console.log(codeFreq);
error
  ? console.log("\nFAILED. Error encountered. See outpout")
  : console.log("\nNo collisions. PASSED.");
