// libs
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// app
import { BaseComponent, RouterExtensions } from '../../frameworks/core/index';
import { IAppState, getEndpoints } from '../../frameworks/ngrx/index';
import * as endpointList from '../../frameworks/monitor/index';


@BaseComponent({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent {
  public endpoints$: Observable<Array<endpointList.EndpointModel>>;
  public newEndpoint: string = '';

  constructor(
    private store: Store<IAppState>, 
    public routerext: RouterExtensions
  ) {
    this.endpoints$ = store.let(getEndpoints);
  }

  /*
   * @param newEndpoint  any text as input.
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  addEndpoint(): boolean {
    this.store.dispatch(new endpointList.AddAction(this.newEndpoint));
    this.newEndpoint = '';
    return false;
  }

  validate() {
    this.store.dispatch(new endpointList.ValidateEndpointsAction())
  }
}
