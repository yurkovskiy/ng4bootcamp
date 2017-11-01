import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html'
})
export class GroupItemComponent {
  @Input() group;
}
