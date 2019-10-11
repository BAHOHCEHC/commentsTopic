import { Component, Input, OnInit, HostBinding } from '@angular/core';
import { CommentService } from '../comments.service';
import { Comment, SubComment } from '../models/comment.model';
import { fadeStateTrigger } from '../animations/fade.animations';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [fadeStateTrigger]
})
export class CommentsComponent implements OnInit {
  @Input() comment: Comment;
  text: string = '';
  subText: string = '';
  subSubText: string = '';
  themeTitle: string = '';

  constructor(private service: CommentService) {}
  ngOnInit(): void {
    this.theme();
  }
  remove(comment) {
    this.service.deleteComment(comment);
  }
  removeSubComment(comment, id) {
    for (let prop in comment) {
      if (comment[prop].comments) {
        comment[prop].comments = comment[prop].comments.filter(c => c.id !== id);
        if (comment[prop].comments.length === 0) {
          const sub = comment[prop].subComment;
          sub['comments'] = [];
        }
      }
      if (comment[prop].subComment) {
        const subSub = comment[prop].subComment;
        for (let prop in subSub) {
          if (prop == 'subComment') {
            subSub.comments = subSub.comments.filter(c => c.id !== id);
            if (subSub.comments.length === 0) {
              let sub = subSub.subComment;
              sub['comments'] = [];
            }
            if (subSub['subComment'].comments) {
              subSub['subComment'].comments = subSub['subComment'].comments.filter(c => c.id !== id);
            }
          }
        }
      }
    }

    this.service.updateComment(comment);
  }
  addComment(comment, id, textarea) {
    if (textarea === '') return;
    if (!comment.subComment.comments) {
      comment.subComment.comments = [];
      comment.subComment.subComment = {};
    }
    const subComment = new SubComment(textarea, `${id}.${comment.subComment.comments.length}`);
    comment.subComment.comments.push(subComment);

    this.service.updateComment(comment);
    this.text = '';
  }
  addSubComment(comment, id, textarea) {
    const item = comment.subComment.subComment;
    if (textarea === '') return;
    if (!item.comments) {
      item.comments = [];
      item.subComment = {};
    }
    const com = new SubComment(textarea, `${id}.${comment.subComment.comments.length}.${item.comments.length}`);
    item.comments.push(com);

    this.service.updateComment(comment);
    this.subText = '';
  }
  addSubSubComment(comment, id, textarea) {
    const item = comment.subComment.subComment.subComment;
    if (textarea === '') return;
    if (!item.comments) {
      item.comments = [];
    }
    const subComment = new SubComment(
      textarea,
      `${id}.${comment.subComment.comments.length}.${comment.subComment.subComment.comments.length}.${item.comments.length}`
    );
    item.comments.push(subComment);

    this.service.updateComment(comment);
    this.subSubText = '';
  }
  theme() {
    this.themeTitle =
      this.comment.body
        .split(' ')
        .slice(0, 2)
        .join(' ') + '...';
  }

}
