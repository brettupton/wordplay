const IPAVowel: IPAChart = {
    Front: {
        High: ['i', 'ɪ'],
        Mid: ['e', 'ɛ'],
        Low: ['æ', '']
    },
    Central: {
        High: ['', ''],
        Mid: ['ɚ', 'ɜ'],
        Low: ['ʌ', '']
    },
    Back: {
        High: ['u', 'ʊ'],
        Mid: ['o', 'ɔ'],
        Low: ['ɑ', '']
    }
}

const IPAConsonant: IPAChart = {
    Plosive: {
        Bilabial: ['p', 'b'],
        Labiodental: ['', ''],
        Dental: ['', ''],
        Alveolar: ['t', 'd'],
        Postalveolar: ['', ''],
        Palatal: ['', ''],
        Velar: ['k', 'g'],
        Glottal: ['ʔ', '']
    },
    Nasal: {
        Bilabial: ['m', ''],
        Labiodental: ['', ''],
        Dental: ['', ''],
        Alveolar: ['n', ''],
        Postalveolar: ['', ''],
        Palatal: ['', ''],
        Velar: ['ŋ', ''],
        Glottal: ['', '']
    },
    'Tap or Flap': {
        Bilabial: ['', ''],
        Labiodental: ['', ''],
        Dental: ['', ''],
        Alveolar: ['ɾ', ''],
        Postalveolar: ['', ''],
        Palatal: ['', ''],
        Velar: ['', ''],
        Glottal: ['', '']
    },
    Fricative: {
        Bilabial: ['', ''],
        Labiodental: ['f', 'v'],
        Dental: ['θ', 'ð'],
        Alveolar: ['s', 'z'],
        Postalveolar: ['ʃ', 'ʒ'],
        Palatal: ['', ''],
        Velar: ['', ''],
        Glottal: ['h', '']
    },
    Approximant: {
        Bilabial: ['', ''],
        Labiodental: ['', ''],
        Dental: ['', ''],
        Alveolar: ['ɹ', ''],
        Postalveolar: ['', ''],
        Palatal: ['j', ''],
        Velar: ['w', ''],
        Glottal: ['', '']
    },
    'Lat. Approximant': {
        Bilabial: ['', ''],
        Labiodental: ['', ''],
        Dental: ['', ''],
        Alveolar: ['l', ''],
        Postalveolar: ['', ''],
        Palatal: ['', ''],
        Velar: ['', ''],
        Glottal: ['', '']
    }
}

const IPADiphthong: IPAChart = {
    Closing: {
        Front: ['aɪ', 'eɪ'],
        Central: ['aʊ', 'oʊ']
    },
    Centering: {
        Front: ['ɪə', 'eə'],
        Central: ['', '']
    }
}

export { IPAConsonant, IPAVowel, IPADiphthong }