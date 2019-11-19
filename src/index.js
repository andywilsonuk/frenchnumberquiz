import { app } from 'hyperapp';
import state from './state';
import view from './components/view';
import './styles/app.css';

app({
    init: state,
    view,
    node: document.getElementById('app'),
});
