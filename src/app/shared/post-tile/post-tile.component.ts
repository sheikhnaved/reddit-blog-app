import { Component, OnInit, Input } from "@angular/core";
import {
  faArrowDown,
  faArrowUp,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import { PostModel } from "../post-model";
import { PostService } from "../post.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-post-tile",
  templateUrl: "./post-tile.component.html",
  styleUrls: ["./post-tile.component.css"],
})
export class PostTileComponent implements OnInit {
  faComments = faComments;
  @Input() posts: PostModel[];

  constructor(private router: Router) {}

  ngOnInit() {}

  goToPost(id: number) {
    this.router.navigateByUrl("view-post/" + id);
  }
}
