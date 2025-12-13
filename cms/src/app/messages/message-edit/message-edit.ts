import { Component, Output, EventEmitter, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-edit',
  standalone: false,
  templateUrl: './message-edit.html',
  styleUrl: './message-edit.css'
})

export class MessageEdit implements OnInit {
  // @ViewChild('subject') subjectInputRef!: ElementRef;
  // @ViewChild('msgText') msgTextInputRef!: ElementRef;
  id: string;
  editMode = false;
  messageForm: FormGroup
  // @Output() addMessageEvent = new EventEmitter<Message>();

  originalMessage: Message;
  message: Message;
  currentSender: string = '19';

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        if (this.editMode) {
          this.originalMessage = this.messageService.getMessage(this.id);
          this.message = JSON.parse(JSON.stringify(this.originalMessage));
        }
        this.initForm();
    });
  }
  
  onSubmit() {
    const formValue = this.messageForm.value;
    const newMessage: Message = {
      id: this.editMode 
        ? this.originalMessage.id 
        : this.messageService.getMaxId(),
      subject: formValue.subject,
      msgText: formValue.msgText,
      sender: "101"
    };
    if (this.editMode) {
      this.messageService.updateMessage(this.originalMessage, newMessage, () => {
        this.router.navigate(['/messages']);
      });
    } else {
      this.messageService.addMessage(newMessage, () => {
        this.router.navigate(['/messages']);
      });
    }
    this.onClear();
  }
  private initForm() {
    let messageSubject = '';
    let messageText = '';
    let messageSender = '';

    if (this.editMode) {
      messageSubject = this.message.subject;
      messageText = this.message.msgText;
      messageSender = this.message.sender;
    }

    this.messageForm = new FormGroup({
      subject: new FormControl(messageSubject, Validators.required),
      msgText: new FormControl(messageText, Validators.required),
      sender: new FormControl(messageSender)
    });
  }
  // onSendMessage() {
  //   const subject = this.subjectInputRef.nativeElement.value;
  //   const msgText = this.msgTextInputRef.nativeElement.value;
  //   if (!subject || !msgText) {
  //     return;
  //   }
  //   const newMessage = new Message('0', subject, msgText, this.currentSender);
  //   this.messageService.addMessage(newMessage);
  //   this.addMessageEvent.emit(newMessage);
  //   console.log('Message sent:', newMessage);
  //   this.subjectInputRef.nativeElement.value = '';
  //   this.msgTextInputRef.nativeElement.value = '';
  // }
  onClear() {
    console.log('Message Deleted');
    this.messageForm.reset();
  }
  
  get subject() {
    return this.messageForm.get('subject');
  }
  get msgText() {
    return this.messageForm.get('msgText');
  }
  // get subject() {
  //   return this.messageForm.get('subject');
  // }
  // get message() {
  //   return this.messageForm.get('message');
  // }
}
