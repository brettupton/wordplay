const vowels: IPAChart = {
    Close: {
        Front: ['i', 'y'],
        '': ['', ''],
        Central: ['ɨ', 'ʉ'],
        '': ['', ''],
        Back: ['ɯ', 'u']
    },
    '': {
        Front: ['', ''],
        '': ['ɪ', 'ʏ'],
        Central: ['', ''],
        '': ['', 'ʊ'],
        Back: ['', '']
    },
    'Close-mid': {
        Front: ['e', 'ø'],
        '': ['', ''],
        Central: ['ɘ', 'ɵ'],
        '': ['', ''],
        Back: ['ɤ', 'o']
    },
    '': {
        Front: ['', ''],
        '': ['', ''],
        Central: ['', 'ə'],
        '': ['', ''],
        Back: ['', '']
    },
    'Open-mid': {
        Front: ['ɛ', 'œ'],
        '': ['', ''],
        Central: ['ɜ', 'ɞ'],
        '': ['', ''],
        Back: ['ʌ', 'ɔ']
    },
    '': {
        Front: ['æ', ''],
        '': ['', ''],
        Central: ['', 'ɐ'],
        '': ['', ''],
        Back: ['', '']
    },
    Open: {
        Front: ['a', 'ɶ'],
        '': ['', ''],
        Central: ['', ''],
        '': ['', ''],
        Back: ['ɑ', 'ɒ']
    }
}

const pulmonicConsonant: IPAChart = {
    Bilabial: {
        Plosive: ['p', 'b'],
        Nasal: ['', 'm'],
        Trill: ['', 'ʙ'],
        'Tap or Flap': ['', ''],
        Fricative: ['ɸ', 'β'],
        'Lateral Fricative': ['', ''],
        Approximant: ['', ''],
        'Lateral Approximant': ['', '']
    },
    Labiodental: {
        Plosive: ['', ''],
        Nasal: ['', 'ɱ'],
        Trill: ['', ''],
        'Tap or Flap': ['', 'ⱱ'],
        Fricative: ['f', 'v'],
        'Lateral Fricative': ['', ''],
        Approximant: ['', 'ʋ'],
        'Lateral Approximant': ['', '']
    },
    Dental: {
        Plosive: ['', ''],
        Nasal: ['', ''],
        Trill: ['', ''],
        'Tap or Flap': ['', ''],
        Fricative: ['θ', 'ð'],
        'Lateral Fricative': ['', ''],
        Approximant: ['', ''],
        'Lateral Approximant': ['', '']
    },
    Alveolar: {
        Plosive: ['t', 'd'],
        Nasal: ['', 'n'],
        Trill: ['', 'r'],
        'Tap or Flap': ['', 'ɾ'],
        Fricative: ['s', 'z'],
        'Lateral Fricative': ['ɬ', 'ɮ'],
        Approximant: ['', 'ɹ'],
        'Lateral Approximant': ['', 'l']
    },
    Postalveolar: {
        Plosive: ['', ''],
        Nasal: ['', ''],
        Trill: ['', ''],
        'Tap or Flap': ['', ''],
        Fricative: ['ʃ', 'ʒ'],
        'Lateral Fricative': ['', ''],
        Approximant: ['', ''],
        'Lateral Approximant': ['', '']
    },
    Retroflex: {
        Plosive: ['ʈ', 'ɖ'],
        Nasal: ['', 'ɳ'],
        Trill: ['', ''],
        'Tap or Flap': ['', 'ɽ'],
        Fricative: ['ʂ', 'ʐ'],
        'Lateral Fricative': ['', ''],
        Approximant: ['', 'ɻ'],
        'Lateral Approximant': ['', 'ɭ']
    },
    Palatal: {
        Plosive: ['c', 'ɟ'],
        Nasal: ['', 'ɲ'],
        Trill: ['', ''],
        'Tap or Flap': ['', ''],
        Fricative: ['ç', 'ʝ'],
        'Lateral Fricative': ['', ''],
        Approximant: ['', 'j'],
        'Lateral Approximant': ['', 'ʎ']
    },
    Velar: {
        Plosive: ['k', 'ɡ'],
        Nasal: ['', 'ŋ'],
        Trill: ['', ''],
        'Tap or Flap': ['', ''],
        Fricative: ['x', 'ɣ'],
        'Lateral Fricative': ['', ''],
        Approximant: ['', 'ɰ'],
        'Lateral Approximant': ['', 'ʟ']
    },
    Uvular: {
        Plosive: ['q', 'ɢ'],
        Nasal: ['', 'ɴ'],
        Trill: ['', 'ʀ'],
        'Tap or Flap': ['', ''],
        Fricative: ['χ', 'ʁ'],
        'Lateral Fricative': ['', ''],
        Approximant: ['', ''],
        'Lateral Approximant': ['', '']
    },
    Pharyngeal: {
        Plosive: ['', ''],
        Nasal: ['', ''],
        Trill: ['', ''],
        'Tap or Flap': ['', ''],
        Fricative: ['ħ', 'ʕ'],
        'Lateral Fricative': ['', ''],
        Approximant: ['', ''],
        'Lateral Approximant': ['', '']
    },
    Glottal: {
        Plosive: ['ʔ', ''],
        Nasal: ['', ''],
        Trill: ['', ''],
        'Tap or Flap': ['', ''],
        Fricative: ['h', 'ɦ'],
        'Lateral Fricative': ['', ''],
        Approximant: ['', ''],
        'Lateral Approximant': ['', '']
    }
}

const clicks: IPAChart = {
    Clicks: {
        Bilabial: ['ʘ'],
        Dental: ['ǀ'],
        '(Post)alveolar': ['ǃ'],
        Palatoalveolar: ['ǂ'],
        'Alveolar lateral': ['ǁ']
    }
}

const voicedImplosives: IPAChart = {
    'Voiced Implosives': {
        Bibabial: ['ɓ'],
        'Dental/alveolar': ['ɗ'],
        Palatal: ['ʄ'],
        Velar: ['ɠ'],
        Uvular: ['ʛ']
    }
}

const ejectives: IPAChart = {
    Ejectives: {
        'Examples:': ['ʼ'],
        Bilabal: ['pʼ'],
        'Dental/alveolar': ['tʼ'],
        Velar: ['kʼ'],
        'Alveolar fricative': ['sʼ']
    }
}

const IPASounds: { [symbol: string]: string } = {
    'i': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/9/91/Close_front_unrounded_vowel.ogg/Close_front_unrounded_vowel.ogg.mp3',
    'ɪ': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/4/4c/Near-close_near-front_unrounded_vowel.ogg/Near-close_near-front_unrounded_vowel.ogg.mp3',
    'e': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/6/6c/Close-mid_front_unrounded_vowel.ogg/Close-mid_front_unrounded_vowel.ogg.mp3',
    'ɛ': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/7/71/Open-mid_front_unrounded_vowel.ogg/Open-mid_front_unrounded_vowel.ogg.mp3',
    'æ': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c9/Near-open_front_unrounded_vowel.ogg/Near-open_front_unrounded_vowel.ogg.mp3',
    'ə': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/d/d9/Mid-central_vowel.ogg/Mid-central_vowel.ogg.mp3',
    'ɜ': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/0/01/Open-mid_central_unrounded_vowel.ogg/Open-mid_central_unrounded_vowel.ogg.mp3',
    'ʌ': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/8/80/PR-open-mid_back_unrounded_vowel2.ogg/PR-open-mid_back_unrounded_vowel2.ogg.mp3',
    'u': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/5/5d/Close_back_rounded_vowel.ogg/Close_back_rounded_vowel.ogg.mp3',
    'ʊ': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/d/d5/Near-close_near-back_rounded_vowel.ogg/Near-close_near-back_rounded_vowel.ogg.mp3',
    'o': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/8/84/Close-mid_back_rounded_vowel.ogg/Close-mid_back_rounded_vowel.ogg.mp3',
    'ɔ': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/d/d0/PR-open-mid_back_rounded_vowel.ogg/PR-open-mid_back_rounded_vowel.ogg.mp3',
    'ɑ': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/0/0e/PR-open_front_unrounded_vowel.ogg/PR-open_front_unrounded_vowel.ogg.mp3',
    'p': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/5/51/Voiceless_bilabial_plosive.ogg/Voiceless_bilabial_plosive.ogg.mp3',
    'b': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/2/2c/Voiced_bilabial_plosive.ogg/Voiced_bilabial_plosive.ogg.mp3',
    't': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/0/02/Voiceless_alveolar_plosive.ogg/Voiceless_alveolar_plosive.ogg.mp3',
    'd': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/0/01/Voiced_alveolar_plosive.ogg/Voiced_alveolar_plosive.ogg.mp3',
    'k': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/e/e3/Voiceless_velar_plosive.ogg/Voiceless_velar_plosive.ogg.mp3',
    'g': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/1/12/Voiced_velar_plosive_02.ogg/Voiced_velar_plosive_02.ogg.mp3',
    'ʔ': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/4/4d/Glottal_stop.ogg/Glottal_stop.ogg.mp3',
    'm': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/a/a9/Bilabial_nasal.ogg/Bilabial_nasal.ogg.mp3',
    'n': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/2/29/Alveolar_nasal.ogg/Alveolar_nasal.ogg.mp3',
    'ŋ': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/3/39/Velar_nasal.ogg/Velar_nasal.ogg.mp3',
    'ɾ': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/a/a0/Alveolar_tap.ogg/Alveolar_tap.ogg.mp3',
    'f': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c7/Voiceless_labio-dental_fricative.ogg/Voiceless_labio-dental_fricative.ogg.mp3',
    'v': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/4/42/Voiced_labio-dental_fricative.ogg/Voiced_labio-dental_fricative.ogg.mp3',
    'θ': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/8/80/Voiceless_dental_fricative.ogg/Voiceless_dental_fricative.ogg.mp3',
    'ð': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/6/6a/Voiced_dental_fricative.ogg/Voiced_dental_fricative.ogg.mp3',
    's': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/a/ac/Voiceless_alveolar_sibilant.ogg/Voiceless_alveolar_sibilant.ogg.mp3',
    'z': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c0/Voiced_alveolar_sibilant.ogg/Voiced_alveolar_sibilant.ogg.mp3',
    'ʃ': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/c/cc/Voiceless_palato-alveolar_sibilant.ogg/Voiceless_palato-alveolar_sibilant.ogg.mp3',
    'ʒ': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/3/30/Voiced_palato-alveolar_sibilant.ogg/Voiced_palato-alveolar_sibilant.ogg.mp3',
    'h': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/d/da/Voiceless_glottal_fricative.ogg/Voiceless_glottal_fricative.ogg.mp3',
    'ɹ': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/1/1f/Alveolar_approximant.ogg/Alveolar_approximant.ogg.mp3',
    'j': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/e/e8/Palatal_approximant.ogg/Palatal_approximant.ogg.mp3',
    'w': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f2/Voiced_labio-velar_approximant.ogg/Voiced_labio-velar_approximant.ogg.mp3',
    'l': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/b/bc/Alveolar_lateral_approximant.ogg/Alveolar_lateral_approximant.ogg.mp3'
}

export const IPACharts = {
    vowels,
    pulmonicConsonant,
    clicks,
    voicedImplosives,
    ejectives
}