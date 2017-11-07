import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-student',
  templateUrl: './add-new-student.component.html',
  styleUrls: ['./add-new-student.component.scss']
})
export class AddNewStudentComponent implements OnInit {
  addresses = [];
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: {value: null, disabled: false}, // ['test', Validators.email],
      password: [null, Validators.required]
    });

    // this.form.valueChanges.subscribe(data => {
    //   console.log(data);
    // });
    this.form.get('password').valueChanges.subscribe(data => {
      this.form.get('email').reset();
    });

    // this.form = new FormGroup({
    //   email: new FormControl(
    //     'test',
    //     Validators.email
    //   ),
    //   password: new FormControl('123456')
    // });
  }

  makeEnabled(): void {
    this.form.get('email').enable();
  }

  setDefault(): void {
    // this.form.patchValue({
    //   password: '12345'
    // });
    this.form.get('email').setValue('test@test');
  }

  saveData(): void {
    console.log(this.form.value);
    this.form.reset();
  }

}
