import scrabbleDictionary from '../assets/wordbank/scrabbleDictionary.txt';
import sixLetterWordBank from '../assets/wordbank/6letterWordBank.txt';
import sevenLetterWordBank from '../assets/wordbank/7letterWordBank.txt';

export const createDictionary = async () => {
    let wordSet;
    await fetch(scrabbleDictionary).then((response) => response.text()).then((result) => {
        const wordArr = result.split("\r\n");
        wordSet = new Set(wordArr);
    });

    return {wordSet};
}

export const createRandomSixLetterWord = async () => {
    let wordsSet;
    let currentWord;
    await fetch(sixLetterWordBank)
        .then((response) => response.text())
        .then((result) => {
            const wordArray = result.split("\n");
            wordsSet = new Set(wordArray);
            currentWord = wordArray[Math.floor(Math.random() * wordArray.length)];
        });
    return { currentWord, wordsSet };
}

export const createRandomSevenLetterWord = async () => {
    let wordsSet;
    let currentWord;
    await fetch(sevenLetterWordBank)
        .then((response) => response.text())
        .then((result) => {
            const wordArray = result.split("\n");
            wordsSet = new Set(wordArray);
            currentWord = wordArray[Math.floor(Math.random() * wordArray.length)];
        });
    return { currentWord, wordsSet };
}