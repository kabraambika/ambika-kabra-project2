import scrabbleDictionary from '../assets/wordbank/scrabbleDictionary.txt';
import sixLetterWordBank from '../assets/wordbank/6letterWordBank.txt';
import sevenLetterWordBank from '../assets/wordbank/7letterWordBank.txt';

// fetch function to create set for all possible words from scrabbleDictionary.txt
export const createDictionary = async () => {
    let wordSet;
    await fetch(scrabbleDictionary).then((response) => response.text()).then((result) => {
        const wordArr = result.split("\r\n");
        wordSet = new Set(wordArr);
    });

    return {wordSet};
}

// fetch function to get random 6 letters word and its wordset from 6letterWordBank.txt
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

// fetch function to get random 7 letters word and its wordset from 6letterWordBank.txt
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