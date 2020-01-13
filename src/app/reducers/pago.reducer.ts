import { createReducer, on } from '@ngrx/store';
import * as states from '../actions/pago.actions';

export const initial = 0;
const _pagoReducer = createReducer(
    initial,
    on(states.inc, (state, { num }) => state + num),
    on(states.dec, (state, { num }) => state - num),
    on(states.reset, state => 0),
);

export function pagoReducer(state, action) {
    return _pagoReducer(state, action);
}

