import { CanDeactivateFn } from '@angular/router';

export const dashGuard: CanDeactivateFn<unknown> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {

  return false;
};
