
class CitiBikeTable {
  constructor(doc, win) {
    this.root = doc.querySelector(".ed-table_trip");
    this.win = win
  }

  toCSV (win) {
    let csvContent = "data:text/csv;charset=utf-8,";
    this.body().forEach((row) => {
      let rowString = row.join(', ') + '\n';
      csvContent += rowString;
    });
    let encodedUri = this.win.encodeURI(csvContent);
    console.log(encodedUri);
    window.open(encodedUri);
  }

  body () {
    if (this._body == null) {
      this._body = [
        ["start_station", "end_station", "start_date", "end_date", "duration_in_seconds"]
      ];
      let elements = this.root.querySelectorAll('.ed-table__item');
      elements.forEach((rowElement) => {
        let newRow = [];
        let startText = rowElement.childNodes[0].innerText.split("\n").filter(s => s != "");
        newRow.push(startText.pop());
        let endText = rowElement.childNodes[1].innerText.split("\n").filter(s => s != "");
        newRow.push(endText.pop());
        newRow.push(new Date(startText.pop()));
        newRow.push(new Date(endText.pop()));
        newRow.push(this.durationStringToSecondsNumber(rowElement.childNodes[2].innerText));
        this._body.push(newRow);
      });
    }
    return this._body;
  }

  durationStringToSecondsNumber(duration) {
    let durationArray = duration.split(/.[a-z]/).filter( s => s.trim() != "").map(s => Number(s.trim()));
    let seconds = durationArray.pop();
    let minutesToSeconds = durationArray.pop() * 60;
    let hoursToSeconds = ((hours) => hours != null ? hours * 3600 : 0)(durationArray.pop());
    return seconds + minutesToSeconds + hoursToSeconds;
  }
}

module.exports = {
  CitiBikeTable: CitiBikeTable
};
