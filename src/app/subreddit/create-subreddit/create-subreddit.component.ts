import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SubredditModel } from "../subreddit-response";
import { Router } from "@angular/router";
import { SubredditService } from "../subreddit.service";
import { throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-create-subreddit",
  templateUrl: "./create-subreddit.component.html",
  styleUrls: ["./create-subreddit.component.css"],
})
export class CreateSubredditComponent implements OnInit {
  createSubredditForm: FormGroup;
  subredditModel: SubredditModel;
  title = new FormControl("");
  description = new FormControl("");

  constructor(
    private router: Router,
    private subredditService: SubredditService,
    private toastr: ToastrService
  ) {
    this.createSubredditForm = new FormGroup({
      title: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
    });
    this.subredditModel = {
      name: "",
      description: "",
    };
  }

  ngOnInit() {}

  discard() {
    this.router.navigateByUrl("/");
  }

  createSubreddit() {
    this.subredditModel.name = this.createSubredditForm.get("title").value;
    this.subredditModel.description = this.createSubredditForm.get(
      "description"
    ).value;
    this.subredditService.createSubreddit(this.subredditModel).subscribe(
      (data) => {
        this.router.navigateByUrl("/list-subreddits");
        this.toastr.success("Subreddit Created successfully");
      },
      (err) => {
        console.log(err.error.message);
        this.toastr.error(err.error.message);
      }
    );
  }
}
