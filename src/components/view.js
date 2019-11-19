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

export default (state) =>
    <section>
        <h1>French number quiz</h1>
        {state.status === statuses.pending || state.status === statuses.ended
            ? <button onclick={[actions.prepare, focusAnswerBox]} class="start">Start</button>
            : null}
        {state.status === statuses.playing
            ? <div>
                <h2>Question {state.questionIndex + 1}</h2>
                <input id="answerBox" type="text" onchange={actions.setAnswerText} value={state.answerText} maxlength="2" />
                <button onclick={[actions.submit, focusAnswerBox]} class="submit">Submit</button>
            </div>
            : null}
        {state.status === statuses.ended
            ? <ul>
                {state.questions.map((question, i) => answerCorrectness(state.correctness[i], question, state.answers[i]))}
            </ul>
            : null}
    </section>;
