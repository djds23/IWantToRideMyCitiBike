class CitiBikeTable {
  constructor(doc) {
    this.root = doc.querySelector(".ed-table_trip");
  }

  toCSV () {
    return {
      "headers": this.headers(),
      "body": this.body()
    };
  }

  headers () {
    if (this._helders == null) {
      this._headers = [];
      let elements = this.root.querySelectorAll('.ed-table__header');
      elements.forEach((e) => this._headers.push(e.innerHTML));
    }
    return this._headers
  }

  body () {
    if (this._body == null) {
      this._body = [];
      let elements = this.root.querySelectorAll('.ed-table__item');
      elements.forEach((rowElement) => {
        let row = [];
        rowElement.childNodes.forEach((column) => {
          row.push(column.innerText);
        })
        this._body.push(row);
      });
    }
    return this._body;
  }
}

module.exports = {
  CitiBikeTable: CitiBikeTable
};
