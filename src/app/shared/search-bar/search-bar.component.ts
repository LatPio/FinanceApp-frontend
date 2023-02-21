import {Component, EventEmitter, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})


export class SearchBarComponent implements OnInit{

  @Output() onEmitJSON: EventEmitter<any> = new EventEmitter()
  @Output() onEmitReset: EventEmitter<any> = new EventEmitter()

  // searchCriteria: SearchCriteria;
  min: number;
  max: number;

  jsonArray: any =[];
  jsonArrayTest = {
    "key": "amount",
    "value": "10000000",
    "operation": "LESS_THAN"
  };

  ngOnInit(): void {

  }
  testBeforeEmit(){
    if (this.min != null) {
      let searchCriteria: SearchCriteria = {
        key: 'amount',
        value: this.min,
        operation: 'GREATER_THAN_EQUAL'
      }
      this.jsonArray.push(searchCriteria)
    }
    if (this.max != null) {
      let searchCriteria: SearchCriteria = {
        key: 'amount',
        value: this.max,
        operation: 'LESS_THAN'
      }
      this.jsonArray.push(searchCriteria)
    }
  }
  emitJSON(){

    this.testBeforeEmit();
    this.onEmitJSON.emit(this.jsonArray)
  }


  emitReset() {
    this.jsonArray = []
    this.onEmitReset.emit()
  }
}
export interface SearchCriteria{
  key: String;
  value: any;
  operation: String;
}
