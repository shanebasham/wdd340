import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  standalone: false,
  templateUrl: './servers.html',
  styles: `
    h2 {
      color: darkblue;
    }
  `
})

export class Servers implements OnInit {
  allowNewServer = false;
  serverCreationStatus = 'No server was created!'
  serverName = 'TestServer';
  serverCreated = false;
  serverList = ['TestServer', 'TestServer 2'];

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit() {
  }

  onCreateServer() {
    this.serverCreated = true;
    this.serverList.push(this.serverName);
    this.serverCreationStatus = 'Server: ' + this.serverName + ' was created!';
  }
  onUpdateServerName(event: Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }
}
