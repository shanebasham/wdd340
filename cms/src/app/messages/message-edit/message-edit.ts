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
  id: number;
  editMode = false;
  messageForm: FormGroup
  // @Output() addMessageEvent = new EventEmitter<Message>();

  currentSender: string = '19';

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
    });
  }

  onSubmit() {
    const formValue = this.messageForm.value;

    // Ensure current user is always "You"
    const newMessage: Message = {
      subject: formValue.subject,
      msgText: formValue.msgText,
      sender: 'you' // <-- force the sender
    };

    if (this.editMode) {
      this.messageService.updateMessage(this.id, newMessage);
    } else {
      this.messageService.addMessage(newMessage);
    }

    this.onClear();
  }
  private initForm() {
    let messageSubject = '';
    let messageText = '';
    let messageSender = '';

    if (this.editMode) {
      const message = this.messageService.getMessage(this.id);
      messageSubject = message.subject;
      messageText = message.msgText;
      messageSender = message.sender;
    }

    this.messageForm = new FormGroup({
      subject: new FormControl(messageSubject, Validators.required),
      msgText: new FormControl(messageText, Validators.required),
      sender: new FormControl(messageSender, Validators.required)
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

  get message() {
    return this.messageForm.get('message');
  }
}
