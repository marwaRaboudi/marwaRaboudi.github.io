import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() data: any;
  displayForm!: boolean;
  bookForm = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  openModal(): void {
    const modal = document.querySelector('.modal');
    if (modal) {
      modal.classList.add('open');
    }
  }

  closeModal(): void {
    this.bookForm.reset();
    const modal = document.querySelector('.modal');
    if (modal) {
      modal.classList.remove('open');
    }
  }

  showForm(): void {
    this.displayForm = true;
  }

  onSubmit(): void {
    console.log(this.bookForm.value);
    this.closeModal();
    this.showToast();
  }

  showToast(): void {
    const toast = document.getElementById('toast');
    if (toast) {
      toast.className = 'show';
      setTimeout(() => { toast.className = toast.className.replace('show', ''); }, 3000);
    }
  }

}
