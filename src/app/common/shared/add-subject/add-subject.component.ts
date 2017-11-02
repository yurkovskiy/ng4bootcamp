import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent implements OnInit {
  @Input() data;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
    setTimeout(() => {
      this.activeModal.close(true);
    }, 1000);
  }

}
