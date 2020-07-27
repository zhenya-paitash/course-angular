import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  inputValue = "";
  secondInput = '';
  twowaybinding = '';
  customStyle = true;
  arr = [1, 1, 2, 3, 5, 8, 13];
  obj = [
    {id: 1, post: "Post 1", comments: [
        {comID: 1, text: "COM 1"},
        {comID: 2, text: "COM 2"},
        {comID: 3, text: "COM 3"},
      ]},
    {id: 2, post: "Post 2", comments: [
        {comID: 4, text: "COM 1"},
        {comID: 5, text: "COM 2"},
        {comID: 6, text: "COM 3"},
      ]},
    {id: 3, post: "Post 3", comments: [
        {comID: 7, text: "COM 1"},
        {comID: 8, text: "COM 2"},
        {comID: 9, text: "COM 3"},
      ]},
  ];
  title = 'hello world!';
  reactLogo = "https://www.digest.pro/wp-content/uploads/2019/12/Izuchit-biblioteku-React-JS-1024x576.png";
  angularLogo = "https://miro.medium.com/max/480/1*VKY-Ldkt-iHobItql7G_5w.png";

  constructor () {
    setTimeout(() => {
      console.log("Timeout is out...");
      this.reactLogo = this.angularLogo;
      this.title = "ANGULAR is COOL!";
    }, 5000)
  }

  // onInput(event?: any) {
  //   this.inputValue = event.target.value;
  // }
  onInput(event: KeyboardEvent) {
    this.inputValue = (<HTMLInputElement>event.target).value;
  }
  btnClick() {
    console.log(" BTN clicked ")
  }
  onBlur(str: string) {
    this.inputValue = str;
  }

  secondINP (event: any) {
    this.secondInput = event.target.value;
  }
}
