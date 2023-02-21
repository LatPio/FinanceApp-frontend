import {Component, OnInit, Type} from '@angular/core';
import {IncomeService} from "../service/income.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {TagsService} from "../service/tags.service";
import {NgModalConfirm} from "../shared/NgModalConfiirm";
import {TagModel} from "../service/models/tag-model";
import {MatChipEditedEvent, MatChipInputEvent} from "@angular/material/chips";
import {TagRequestPayload} from "./update-tag/tag.request.payload";
import {COMMA, ENTER} from "@angular/cdk/keycodes";

const MODALS: {[name: string]: Type<any>}= {deleteModal: NgModalConfirm, addModal: NgModalConfirm};


@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit{

  tags: Array<TagModel> =[]
  tagPayload: TagRequestPayload;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(private tagsService: TagsService,
              private router: Router,
              private modalService: NgbModal,
              private  toastr: ToastrService) {
    this.tagPayload = {
      name:'',
    }
  }

  ngOnInit(): void {
    this.getAllTags();
  }

  private getAllTags() {
    this.tagsService.getAllTags().subscribe(tag => this.tags = tag)
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tagPayload.name = value;
      this.tagsService.createTag(this.tagPayload).subscribe({
        next: () => {
          this.getAllTags();
          this.toastr.success('Tag Created Successfully')
        },
        error: err => {
          this.toastr.error('Something Gone Wrong')
        }
      });
    }
    event.chipInput!.clear();
  }

  removeWithConformation(tag: any){
    this.modalService.open(MODALS['deleteModal'],
      {
        ariaLabelledBy: 'modal-basic-title'
      }).result.then((result)=>{
        this.remove(tag);
    },(reason)=> {});
  }

  remove(tag: TagModel) {
    this.tagsService
      .deleteTag(tag)
      .subscribe({
        next: ()=>{
          this.toastr.success("Expense Entry Deleted");
          this.getAllTags();
        },
        error: err => {
          this.toastr.error("something gone wrong")
        }
      })

    }


  edit(tag: TagModel, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(tag);
      return;
    }

    if (value) {
      tag.name = value
      this.tagsService.updateTag(tag).subscribe({
        next: () => {
          this.getAllTags();
          this.toastr.success('Tag Created Successfully')
        },
        error: err => {
          this.toastr.error('Something Gone Wrong')
        }
      });

    }
  }
}
