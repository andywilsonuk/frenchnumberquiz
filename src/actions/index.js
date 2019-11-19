import randomInt from 'random-int';
import statuses from '../state/statuses';

const questionCount = 2;
const synth = window.speechSynthesis;
let voice;

const speakQuestion = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    synth.speak(utterance);
};

// TODO: Add speak again button
// TODO: Enter submits

export default {
    prepare: (state) => {
        const voices = synth.getVoices();
        voice = voices.find((x) => x.lang === 'fr-FR');
        if (voice === undefined) { throw new Error('Cannot find French voice'); }
        const newQuestions = [];
        for (let counter = 0; counter < questionCount; counter += 1) {
            newQuestions.push(randomInt(0, 99).toString());
        }
        speakQuestion(newQuestions[0]);
        return {
            ...state, questions: newQuestions, questionIndex: 0, answers: [], status: statuses.playing, correctness: [], answerText: null,
        };
    },
    setAnswerText: (state, event) => ({ ...state, answerText: event.target.value }),
    submit: (state) => {
        const isCorrect = state.questions[state.questionIndex] === state.answerText;
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
};
