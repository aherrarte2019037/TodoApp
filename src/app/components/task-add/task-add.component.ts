import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Task } from 'src/app/models/task.model';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import { FormValidation } from 'src/app/utils/form-validation.util.';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {
  minDate: string = this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;
  createTaskForm: FormGroup = this.buildCreateTaskForm();

  constructor(
    private taskService: TaskService,
    private toast: ToastrService,
    private fmBuilder: FormBuilder,
    public fmValidation: FormValidation,
    private authService: AuthService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(){
    this.fmValidation.setForm(this.createTaskForm);
  }

  buildCreateTaskForm() {
    return this.fmBuilder.group({
      name       : ['', Validators.required],
      description: ['', Validators.required],
      completeAt : [this.minDate, Validators.required],
      userId     : [this.authService.getUserLoggedId(), Validators.required]
    });
  };

  createTask() {
    this.createTaskForm.markAllAsTouched();
    if (this.createTaskForm.invalid) return;

    const task: Task = {
      name: this.createTaskForm.get('name')?.value,
      description: this.createTaskForm.get('description')?.value,
      completeAt: this.createTaskForm.get('completeAt')?.value,
      userId: this.createTaskForm.get('userId')?.value,
    }

    this.taskService.create(task).subscribe(
      data => {
        this.toast.success('Tarea creada', 'Aviso');
        this.createTaskForm.reset();
      }
    );
  }

}
