import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fadeOutOnLeaveAnimation, zoomInOnEnterAnimation } from 'angular-animations';
import { ToastrService } from 'ngx-toastr';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import { FormValidation } from 'src/app/utils/form-validation.util.';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  animations: [
    zoomInOnEnterAnimation({ duration: 500 }),
    fadeOutOnLeaveAnimation({ duration: 300 })
  ]
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  editTaskForm: FormGroup = this.buildEditTaskForm();
  minDate: string = this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;
  showEditModal: boolean = false;

  constructor(
    private taskService: TaskService,
    private toast: ToastrService,
    public fmValidation: FormValidation,
    private fmBuilder: FormBuilder,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.fmValidation.setForm(this.editTaskForm);
    this.taskService.getUserLoggedTasks().subscribe(data => this.tasks = data);
  }

  buildEditTaskForm() {
    return this.fmBuilder.group({
      id         :  ['', Validators.required],
      name       : ['', Validators.required],
      description: ['', Validators.required],
      completeAt : [this.minDate, Validators.required],
    });
  }

  deleteTaskById(id: number) {
    this.taskService.deleteById(id).subscribe(
      data => {
        this.tasks = this.tasks.filter( task => task.id !== id );
        this.toast.success('Tarea eliminada', 'Aviso')
      },
      error => this.toast.error('Error al eliminar tarea', 'Aviso')
    );
  }

  updateCompletedValue(index: number, value: boolean) {
    const id = this.tasks[index].id!;

    this.taskService.updateCompletedValue(id, value).subscribe(
      data => {
        this.tasks[index].completed = value;

        if (value === true) {
          this.toast.success('Tarea completada', 'Felicidades');
          this.tasks[index].finishedAt = data.data.finishedAt;
        }
      }
    );
  }

  showHideModal(task?: Task) {
    this.showEditModal = !this.showEditModal;
    if (task) {
      this.editTaskForm.patchValue({...task})
    }
  }

  editById() {
    const task: Task = {
      id : this.editTaskForm.get('id')?.value,
      name: this.editTaskForm.get('name')?.value,
      description: this.editTaskForm.get('description')?.value,
      completeAt: this.editTaskForm.get('completeAt')?.value,
    }
    this.taskService.editById(task.id!, task).subscribe(
      data => {
        const index = this.tasks.findIndex( t => t.id! === task.id! );
        this.tasks[index] = data.data;
        this.toast.success('Tarea editada', 'Aviso')
      },
      error => this.toast.error('Error al eliminar tarea', 'Aviso')
    )
  }

}
