import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../shared/shared.service'; // Adjust the path as needed



@Component({
  selector: 'app-question-of-the-day',
  templateUrl: './question-of-the-day.component.html',
  styleUrls: ['./question-of-the-day.component.css'],
})
export class QuestionOfTheDayComponent {
  question: string = 'What is your favorite programming language and why?';
  questionResponseForm: FormGroup;
  loggedInId: number = 0;

  constructor(private fb: FormBuilder,private sharedService:SharedService) {
    this.questionResponseForm = this.fb.group({
      response: ['', Validators.required]

    });
    
  }

  ngOnInit(){
    this.loggedInId = Number(localStorage.getItem('userId'));
    console.log(this.loggedInId);
  }

  formatText(formatType: string) {
    const textarea = document.getElementById('userResponse') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = this.questionResponseForm.get('response')?.value.substring(start, end);

    let formattedText = '';

    switch (formatType) {
      case 'bold':
        formattedText = `<strong>${selectedText}</strong>`;
        break;
      case 'italic':
        formattedText = `<em>${selectedText}</em>`;
        break;
      case 'underline':
        formattedText = `<u>${selectedText}</u>`;
        break;
      case 'code':
        formattedText = `<code>${selectedText}</code>`;
        break;
      case 'link':
        const url = prompt('Enter the URL:');
        if (url) {
          formattedText = `<a href="${url}" target="_blank">${selectedText}</a>`;
        } else {
          return;
        }
        break;
      default:
        return;
    }

    const newValue =
      this.questionResponseForm.get('response')?.value.substring(0, start) +
      formattedText +
      this.questionResponseForm.get('response')?.value.substring(end);

    this.questionResponseForm.get('response')?.setValue(newValue);

    const newCursorPos = start + formattedText.length;
    textarea.setSelectionRange(newCursorPos, newCursorPos);
  }

  onSubmit() {
    console.log(this.questionResponseForm.value);
    if (this.questionResponseForm.valid) {
      console.log('User Response:', this.questionResponseForm.value.response);
      alert('Thank you for your response!');
      this.questionResponseForm.reset();
    } else {
      alert('Please enter a response before submitting.');
    }

    

    this.sharedService.questionSubmission(this.questionResponseForm.value,this.loggedInId).subscribe(()=>console.log("submitted"))
  }


}