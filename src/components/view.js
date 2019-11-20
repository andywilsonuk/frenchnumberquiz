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

const StartButton = () => <button onclick={[actions.prepare, focusAnswerBox]} class="start">Start</button>;
const Question = ({ state }) =>
    <div>
        <h2>Question {state.questionIndex + 1}</h2>
        <input id="answerBox" type="number" min="0" max="99" minlength="1" maxlength="2"
            onchange={actions.setAnswerText} value={state.answerText} onkeyup={submitOnEnter}
            spellcheck="false" autocomplete="off" />
        <button onclick={[actions.submit, focusAnswerBox]} class="submit">Submit</button>
    </div>;
const Results = ({ state }) =>
    <ul>
        {state.questions.map((question, i) => answerCorrectness(state.correctness[i], question, state.answers[i]))}
    </ul>;


export default (state) =>
    <section>
        <h1>French number quiz</h1>
        {state.status === statuses.pending || state.status === statuses.ended
            ? <StartButton />
            : null}
        {state.status === statuses.playing
            ? <Question state={state} />
            : null}
        {state.status === statuses.ended
            ? <Results state={state} />
            : null}
    </section>;
