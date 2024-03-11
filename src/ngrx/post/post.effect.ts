import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { PostService } from '../../app/service/post/post.service';
import * as PostActions from './post.action';

@Injectable()
export class PostEffect {
  constructor(
    private action$: Actions,
    private postService: PostService,
  ) { }

  createPost$ = createEffect(() =>
    this.action$.pipe(
      ofType(PostActions.create),
      switchMap((action) =>
        this.postService.create(action.post).pipe(
          map(() => PostActions.createSuccess()),
          catchError((error) =>
            of(PostActions.createFailure({ createErrorMessage: error })),
          ),
        ),
      ),
    ),
  );

  updatePost$ = createEffect(() =>
    this.action$.pipe(
      ofType(PostActions.update),
      switchMap((action) =>
        this.postService.update(action.post).pipe(
          map(() => PostActions.updateSuccess()),
          catchError((error) =>
            of(PostActions.updateFailure({ updateErrorMessage: error })),
          ),
        ),
      ),
    ),
  );

  deletePost$ = createEffect(() =>
    this.action$.pipe(
      ofType(PostActions.deletePost),
      switchMap((action) =>
        this.postService.delete(action.id).pipe(
          map(() => PostActions.deletePostSuccess()),
          catchError((error) =>
            of(PostActions.deletePostFailure({ deleteErrorMessage: error })),
          ),
        ),
      ),
    ),
  );

  getAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(PostActions.getAll),
      switchMap(() =>
        this.postService.getAll().pipe(
          map((postResponse) => PostActions.getAllSuccess({ postResponse })),
          catchError((error) =>
            of(PostActions.getAllFailure({ errorGetAllMessage: error })),
          ),
        ),
      ),
    ),
  );

  getMine$ = createEffect(() =>
    this.action$.pipe(
      ofType(PostActions.getMine),
      switchMap((action) =>
        this.postService.getMine(action.page, action.size).pipe(
          map((postResponse) => PostActions.getMineSuccess({ postResponse })),
          catchError((error) =>
            of(PostActions.getMineFailure({ errorGetMineMessage: error })),
          ),
        ),
      ),
    ),
  );

  getByShare$ = createEffect(() =>
    this.action$.pipe(
      ofType(PostActions.getByShare),
      switchMap((action) =>
        this.postService.getByShare(action.page, action.size).pipe(
          map((postResponse) =>
            PostActions.getByShareSuccess({ postResponse }),
          ),
          catchError((error) =>
            of(
              PostActions.getByShareFailure({ errorGetByShareMessage: error }),
            ),
          ),
        ),
      ),
    ),
  );

  getByMention$ = createEffect(() =>
    this.action$.pipe(
      ofType(PostActions.getByMention),
      switchMap((action) =>
        this.postService.getByMention(action.page, action.size).pipe(
          map((postResponse) =>
            PostActions.getByMentionSuccess({ postResponse }),
          ),
          catchError((error) =>
            of(
              PostActions.getByMentionFailure({
                errorGetByMentionMessage: error,
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
