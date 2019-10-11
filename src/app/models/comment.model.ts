export class Comment {
  constructor(
    public body: string,
    public id?: string,
    public subComment: {} = {
      comments: [],
      subComment: {}
    }
  ) {}
}
export class SubComment {
  constructor(
    public body: string,
    public id?: string,
  ) {}
}

export interface Comments {
  comments: Comment[];
}
