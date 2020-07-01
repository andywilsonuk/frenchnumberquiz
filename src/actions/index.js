import randomInt from 'random-int';
import statuses from '../state/statuses';

const questionCount = 10;
let voice;
let voicesLoaded = false;

const loadVoices = () => {
    const voices = speechSynthesis.getVoices();
    voicesLoaded = true;
    voice = voices.find((x) => x.lang === 'fr-FR' || x.lang === 'fr_FR');
};

loadVoices();

window.speechSynthesis.onvoiceschanged = () => {
    loadVoices();
};

const getNumbers = (count) => {
    const numbers = [];
    while (numbers.length < count) {
        const number = randomInt(0, 99);
        if (numbers.indexOf(number) !== -1) {
            continue;
        }
        numbers.push(number);
    }
    return numbers;
};

const speakQuestion = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
};

export default {
    prepare: (state) => {
        const questions = getNumbers(questionCount);

        try {
            if (voice === undefined) {
                throw new Error(`${voicesLoaded ? 'Voices loaded' : 'Voices not loaded'}. Cannot find French voice using speechSynthesis`);
            }
            speakQuestion(questions[0]);
        } catch (err) {
            alert(err);
            throw err;
        }

        return {
            ...state, questions, questionIndex: 0, answers: [], status: statuses.playing, correctness: [], answerText: null,
        };
    },
    setAnswerText: (state, event) => ({ ...state, answerText: event.target.value }),
    submit: (state) => {
        const isCorrect = `${state.questions[state.questionIndex]}` === state.answerText;
        const questionIndex = state.questionIndex;
        const updatedAnswers = [...state.answers, state.answerText];
        const updatedCorrectness = [...state.correctness, isCorrect];
        const isEnded = questionIndex === questionCount - 1;

        if (isEnded) {
            return {
                ...state, answers: updatedAnswers, correctness: updatedCorrectness, status: statuses.ended,
            };
        }
        speakQuestion(state.questions[state.questionIndex + 1]);
        return {
            ...state, answers: updatedAnswers, correctness: updatedCorrectness, questionIndex: questionIndex + 1, answerText: null,
        };
    },
    sayCurrentQuestion: (state) => {
        speakQuestion(state.questions[state.questionIndex]);
        return state;
    },
    sayQuestion: (state, index) => {
        speakQuestion(state.questions[index]);
        return state;
    },
};
