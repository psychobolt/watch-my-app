// libs
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// app
import { BaseComponent, RouterExtensions } from '../../frameworks/core/index';
import { IAppState, getEndpoints } from '../../frameworks/ngrx/index';
import URL_REGEX from '../app.url.regex';

// module
import { AddAction, RemoveAction, InitEndpointsAction } from '../../frameworks/monitor/actions/endpoint-list.action';
import { EndpointModel, EndpointStatus } from '../../frameworks/monitor/models/endpoint.model';


@BaseComponent({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent {
  public endpoints$: Observable<Array<EndpointModel>>;
  public newEndpoint: string = '';
  public URL_REGEX = URL_REGEX;

  constructor(
    private store: Store<IAppState>, 
    public routerext: RouterExtensions
  ) {
    this.store.dispatch(new InitEndpointsAction());
    this.endpoints$ = store.let(getEndpoints);
  }

  getLabelStyle(endpoint: EndpointModel) {
    switch (endpoint.status) {
      case EndpointStatus.OFFLINE:
        return 'offline-status-label';
      case EndpointStatus.ONLINE:
        return 'online-status-label';
      case EndpointStatus.HIGH_LATENCY:
        return 'high-latency-status-label';
      default:
        return 'pinging-status-label';
    }
  }

  /*
   * @param newEndpoint  any text as input.
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  addEndpoint(): boolean {
    this.store.dispatch(new AddAction(this.newEndpoint));
    this.newEndpoint = '';
    return false;
  }

  removeEndpoint(endpoint: EndpointModel): boolean {
    this.store.dispatch(new RemoveAction(endpoint));
    return false;
  }
}
