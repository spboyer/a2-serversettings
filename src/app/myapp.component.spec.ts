import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { MyappAppComponent } from '../app/myapp.component';

beforeEachProviders(() => [MyappAppComponent]);

describe('App: Myapp', () => {
  it('should create the app',
      inject([MyappAppComponent], (app: MyappAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'myapp works!\'',
      inject([MyappAppComponent], (app: MyappAppComponent) => {
    expect(app.title).toEqual('myapp works!');
  }));
});
