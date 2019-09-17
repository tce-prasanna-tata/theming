import { Component, OnInit, isDevMode } from '@angular/core';
import { AppConfig } from './service/app.config.service';
import { DOCUMENT } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit {

  ngOnInit() {

    if (isDevMode()) {
      console.log('TCE: AppComponent -> ngOnInit -> isDevMode yesssss ::: ', isDevMode());


      // document.getElementById('theme').setAttribute('href', './assets/styles2.css');

      // import('./assets/styles2.css').then(file => {
      //   // perform additional interactions after the resource has been asynchronously fetched
      // });

      // require("style-loader!./assets/styles2.css");
    } else {
      console.log('TCE: AppComponent -> ngOnInit -> isDevMode false ::::::::: ', isDevMode());
      // require("style-loader!./assets/styles.css");
    }
  }
  title = 'Dynamic theme from external CSS';
  theme: any = {
    url: ""
  };
  constructor() {
    const apiUrl = AppConfig.Settings.url.apiUrl;
    this.theme = AppConfig.Settings.theme;
    console.log('TCE: AppComponent -> constructor -> theme', this.theme);
    console.log('TCE: AppComponent -> constructor -> apiUrl', apiUrl);
    this.setTheme(this.theme)
  }

  setTheme(myTheme) {
    window.localStorage.setItem('theme', JSON.stringify(myTheme));
    let link = document.getElementById("css-theme");
    console.log('TCE: AppComponent -> setTheme -> link', link);
    if (link) {
      link['href'] = myTheme.url;
    } else {
      let node = document.createElement('link');
      console.log('TCE: AppComponent -> setTheme -> node', node);
      node.href = myTheme.url; // insert url in between quotes
      node.rel = 'stylesheet';
      node.id = 'css-theme';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }

}

