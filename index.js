
class CitiBikeTable {
  constructor(doc, win) {
    this.root = doc.querySelector(".ed-table_trip");
    this.win = win
  }

  toCSV (win) {
    let csvContent = "data:text/csv;charset=utf-8,";
    this.body().forEach((row) => {
      let rowString = row.join(',') + '\n';
      csvContent += rowString;
    });
    let encodedUri = this.win.encodeURI(csvContent);
    console.log(encodedUri);
    window.open(encodedUri);
  }

  body () {
    if (this._body == null) {
      this._body = [
        ["start_date", "end_date", "start_station", "end_station", "duration"]
      ];
      debugger;
      let elements = this.root.querySelectorAll('.ed-table__item');
      elements.forEach((rowElement) => {
        let newRow = [];
        let startText = rowElement.childNodes[0].innerText.split("\n").filter(s => s != "");
        newRow.push(startText.pop());
        let endText = rowElement.childNodes[1].innerText.split("\n").filter(s => s != "");
        newRow.push(endText.pop());
        newRow.push(new Date(startText.pop()));
        newRow.push(new Date(endText.pop()));
        newRow.push(rowElement.childNodes[2].innerText);
        this._body.push(newRow);
      });
    }
    return this._body;
  }
}

module.exports = {
  CitiBikeTable: CitiBikeTable
};
