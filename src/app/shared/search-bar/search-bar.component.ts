import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TagsService} from "../../service/tags.service";
import {TagModel} from "../../service/models/tag-model";


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})


export class SearchBarComponent implements OnInit{

  @Output() onEmitJSON: EventEmitter<any> = new EventEmitter()
  @Output() onEmitReset: EventEmitter<any> = new EventEmitter()

  min: number;
  max: number;
  dateStart: Date;
  dateEnd: Date;
  jsonArray: any =[];
  hiddeOptions: boolean = false;
  tagsList: Array<TagModel> = [];
  providedTagList: Array<TagModel> = [];

  constructor(private tagsService: TagsService) {
  }
  ngOnInit(): void {
    this.getAllTags();
  }

  private getAllTags() {
    this.tagsService.getAllTags().subscribe(tag => this.tagsList = tag)
  }

  generateBeforeEmit(){
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
    if (this.dateStart != null) {
      let searchCriteria: SearchCriteria = {
        key: 'date',
        value: new Date(this.dateStart).toISOString(),
        operation: 'DATE_GREATER_THAN_EQUAL'
      }
      this.jsonArray.push(searchCriteria)
    }
    if (this.dateEnd != null) {
      let searchCriteria: SearchCriteria = {
        key: 'date',
        value: new Date(this.dateEnd).toISOString(),
        operation: 'DATE_LESS_THAN_EQUAL'

      }
      console.log(this.dateStart)
      this.jsonArray.push(searchCriteria)
    }
    if (this.providedTagList != null) {
      this.providedTagList.forEach(value => {
        let searchCriteria: SearchCriteria = {
          key: 'tags',
          value: value.id,
          operation: 'TAG_OBJECT'
        }
        this.jsonArray.push(searchCriteria)
      })

    }
  }
  emitJSON(){
    this.jsonArray = []
    this.generateBeforeEmit();
    this.onEmitJSON.emit(this.jsonArray)

  }

  emitReset() {
    this.jsonArray = []
    this.providedTagList = []
    this.onEmitReset.emit()
  }

  menuShow() {
    this.hiddeOptions = !this.hiddeOptions
  }

}
export interface SearchCriteria{
  key: String;
  value: any;
  operation: String;
}
