import { h } from 'hyperapp';
import actions from '../actions';
import statuses from '../state/statuses';

const answerCorrectness = (correctness, question, answer) =>
    <li>{answer} {correctness ? 'correct' : `incorrect, answer: ${question}`}</li>;
const focusAnswerBox = () =>
    setTimeout(() => {
        const answerBox = document.getElementById('answerBox');
        if (answerBox === null) { return; }
        answerBox.focus();
    }, 50);
const submitOnEnter = (state, evt) => (evt.key === 'Enter' ? actions.submit : state);

const StartButton = ({ firstTime }) =>
    <button onclick={[actions.prepare, focusAnswerBox]} class="start">{firstTime ? 'Start' : 'Start again'}</button>;
const Question = ({ state }) =>
    <div>
        <div class="question-row">
            <h2>Question {state.questionIndex + 1}</h2>
            <button class="speak-icon" onclick={actions.sayQuestion}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                </svg>
            </button>
        </div>
        <div class="help-text">Type the number you hear</div>
        <div class="answer-row">
            <input id="answerBox" type="number" min="0" max="99" minlength="1" maxlength="2"
                onchange={actions.setAnswerText} value={state.answerText} onkeyup={submitOnEnter}
                spellcheck="false" autocomplete="off" />
            <button onclick={[actions.submit, focusAnswerBox]} class="submit">Submit</button>
        </div>
    </div>;
const Results = ({ state }) =>
    <ul>
        {state.questions.map((question, i) => answerCorrectness(state.correctness[i], question, state.answers[i]))}
    </ul>;


export default (state) =>
    <section>
        <h1>French number quiz</h1>
        {state.status === statuses.ended
            ? <Results state={state} />
            : null}
        {state.status === statuses.pending || state.status === statuses.ended
            ? <StartButton firstTime={state.status === statuses.pending} />
            : null}
        {state.status === statuses.playing
            ? <Question state={state} />
            : null}
    </section>;
