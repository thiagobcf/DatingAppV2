import { CanDeactivateFn } from '@angular/router';
import type { MemberEditComponent } from '../members/member-edit/member-edit.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEditComponent> = (component) => {
  if(component.editForm?.dirty) {
    return confirm('Are you sure you want to continue? Any unsave changes will be lost')
  }
  return true;
};
