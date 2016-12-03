// libs
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// app
import { BaseComponent, RouterExtensions } from '../../frameworks/core/index';
import { IAppState } from '../../frameworks/ngrx/index';
import URL_REGEX from '../app.url.regex';

// module
import { 
  AddAction,
  RemoveAction,
  InitEndpointsAction,
  EndpointModel,
  EndpointStatus,
  PingStatus,
  getEndpoints,
  getPingServiceStatus
} from '../../frameworks/monitor/index';

@BaseComponent({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent {

  public endpoints$: Observable<Array<EndpointModel>>;
  public pingServiceStatus$: Observable<String>;
  public newEndpoint: string = '';
  public URL_REGEX = URL_REGEX;

  constructor(
    private store: Store<IAppState>, 
    public routerext: RouterExtensions
  ) {
    this.endpoints$ = store.let<any>(getEndpoints);
    this.pingServiceStatus$ = store.let(getPingServiceStatus);

    this.store.dispatch(new InitEndpointsAction());
  }

  getLabelStyle(status): string {
    switch (status) {
      case 'DISCONNECTED':
      case 'DOWN':
        return 'warning-label';
      case EndpointStatus.OFFLINE:
        return 'offline-status-label';
      case EndpointStatus.ONLINE:
        return 'online-status-label';
      case EndpointStatus.HIGH_LATENCY:
        return 'high-latency-status-label';
      case 'ACTIVE':
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
