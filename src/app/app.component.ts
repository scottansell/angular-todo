import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('collapseAnim', [
        state('show', style({ opacity: 1, transform: 'scaleY(1)' })), 
        state('hide', style({ opacity: 0, transform: 'scaleY(0)' })),
        transition('* => *', animate('.2s'))
    ])
  ]
})

export class AppComponent {

    tasks = [];

    newTask = {name: "", date: 0, checked: false, completed: false};

    hideNewTask: boolean = false;
    hideCompletedTasks: boolean = false;

    constructor(){
        this.initStorage();
    }

    initStorage(){

        let hideCompleted = localStorage.getItem('hideCompleted') || "false";
        let allTasks = JSON.parse(localStorage.getItem('tasks')) || [];

        localStorage.setItem('hideCompleted', hideCompleted.toString());
        localStorage.setItem('tasks', JSON.stringify(allTasks));

        this.hideCompletedTasks = (hideCompleted == 'true');
        this.tasks = allTasks;
        
    }

    addTask(){
        let task = JSON.parse(JSON.stringify(this.newTask));
        task.date = Date.now();
        
        this.tasks.push(task);
        this.saveTasks();

        this.newTask.name = "";
    }

    saveTasks(){
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    completeTask(date: number){
        for(let t = 0; t < this.tasks.length; t++){
            let complete = this.tasks[t];
            if(complete.date === date){
                this.tasks[t].completed = true;
                this.saveTasks();

                return;
            }
        }
    }

    removeTask(date: number){
        for(let t = 0; t < this.tasks.length; t++){
            let complete = this.tasks[t];
            if(complete.date === date){
                this.tasks.splice(t, 1);
                this.saveTasks();

                return;
            }
        }
    }

    hideOnBool(bool: boolean){
        if(bool === null) return 'show';
        return (bool ? 'hide': 'show');
    }

    toggleCompleted(){   
        this.hideCompletedTasks = !this.hideCompletedTasks;
        localStorage.setItem('hideCompleted', this.hideCompletedTasks.toString());
    }

}
