import { createAction, props } from '@ngrx/store';

export const inc = createAction('AdicionTotal',
    props<{ num: number }>()
);
export const dec = createAction('RestaTotal',
    props<{ num: number }>()
);
export const reset = createAction('Reiniciar');
