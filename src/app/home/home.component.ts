import { Component, OnInit } from "@angular/core";
import { PostModel } from "../shared/post-model";
import { PostService } from "../shared/post.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  posts: Array<PostModel> = [];
  private loadMoreNumber: number = 0;
  private noMoreData: boolean = false;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.fetchPosts(this.loadMoreNumber);
  }

  onLoadMore() {
    this.loadMoreNumber += 1;
    this.fetchPosts(this.loadMoreNumber);
  }

  fetchPosts(page: number) {
    this.postService.getAllPosts(page).subscribe((post: PostModel[]) => {
      this.posts.push.apply(this.posts, post);
      if (post.length < 2) {
        this.noMoreData = true;
      }
    });
  }
}
