import {Component, ContentChild, AfterContentChecked, Input, OnInit, OnChanges, AfterContentInit, SimpleChanges} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html'
})
export class GroupItemComponent implements OnInit, OnChanges, AfterContentInit, AfterContentChecked {
  @Input() data;
  @Input() test;
  @ContentChild('test') myInput;
  group;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((data) => {
      this.group = data.id;
    });
  }

  ngAfterContentInit(): void {
    console.log(this.myInput);
  }

  ngAfterContentChecked(): void {
    console.log(this.myInput);
  }

  ngOnChanges(data: SimpleChanges): void {
    // console.log(data);
  }
}
