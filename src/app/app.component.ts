import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "app";

  questions=[];
  allQuestions=[];
  reviews=[];
  showAnswer = false;

  constructor() {

    this.readFile();
  }
  readFile() {
    this.questions = [];
    this.allQuestions = [];
    var self = this;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "assets/file1.txt", true);
    rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4) {
        var allText = rawFile.responseText;
        //document.getElementById("textSection").innerHTML = allText;
        self.intoArray(allText);
        //console.log(allText);
      }
    };
    rawFile.send();
  }

  intoArray(lines) {
    // splitting all text data into array "\n" is splitting data from each new line
    //and saving each new line as each element*
    var self = this;
    var lineArr = lines.split("\n");
    var str = "";

    var arr = [];

    lineArr.forEach(element => {

      if (element === "") return;
      var anwser = self.extractText(element);
      var q = {}
      q["question"] = element.replace('"' + anwser + '"', "_____");
      q["answer"] = anwser;
      q["ori"] = element;
      q["show"] = false;
      q["mark"] = false;
      self.allQuestions.push(q)
      console.log(element + " ");
    });
    self.shuffle(self.allQuestions);

    //console.log(JSON.stringify(self.allQuestions));
    for (var i = 0; i < 50; i++) {
      //var obj = self.randomItem(self.allQuestions);
      var obj = self.allQuestions[i];
      self.questions.push(obj);
    }
  }

  randomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  extractText(str) {
    var ret = "";

    if (/"/.test(str)) {
      ret = str.match(/"(.*?)"/)[1];
    } else {
      ret = str;
    }

    return ret;
  }

  showAnswer1(obj) {
    console.log(obj);

    var obj = this.questions[obj];
    obj["show"] = true;
  }

  reset() {
    this.readFile();
  }

  retry() {
    var obj = Object.create(this.reviews);
    this.questions=obj;
    this.reviews = [];
  }

  shuffle(arra1) {
    var ctr = arra1.length, temp, index;

// While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

  modelChanged(newObj, $event) {
    if (this.containsObject(newObj, this.reviews)) return;
    var obj = Object.create(newObj);
    obj["show"] = false;
    obj["mark"] = false;
    this.reviews.push(obj);
  }

  containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i]["ori"] === obj["ori"]) {
            return true;
        }
    }
    return false;
}

  mouseHover(obj) {
    obj["show"] = true;
  }
  mouseLeave(obj) {
    //obj["show"] = false;
  }
}
