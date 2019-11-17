import {
  EventEmitter
} from 'events';
import api from '@core/api';


class UserStore extends EventEmitter {
  _init = (client) => {
    this.client = client;

    console.warn('USER STORAGE INITED');

    this.reset();

    this.addTdLibListener();
    this.setMaxListeners(Infinity);
  }

  reset = () => {
    this.items = new Map();
    this.fullInfoItems = new Map();
  };

  onUpdate = update => {
    switch (update['_']) {
      case 'updateAuthorizationState':
        {
          const {
            authorization_state
          } = update;
          if (!authorization_state) break;

          switch (authorization_state['_']) {
            case 'authorizationStateClosed':
              {
                this.reset();
                break;
              }
          }

          break;
        }
      case 'updateUser':
        {
          this.set(update.user);

          this.emit(update['_'], update);
          break;
        }
      case 'updateUserFullInfo':
        this.setFullInfo(update.user_id, update.user_full_info);

        this.emit(update['_'], update);
        break;
      case 'updateUserStatus':
        {
          let user = this.get(update.user_id);
          if (user) {
            this.assign(user, {
              status: update.status
            });
          }

          this.emit(update['_'], update);
          break;
        }
      default:
        break;
    }
  };

  onClientUpdate = update => {
    switch (update['_']) {
      case 'clientUpdateOpenUser':
        {
          this.emit(update['_'], update);
          break;
        }
      default:
        break;
    }
  };

  addTdLibListener = () => {
    this.client.addListener('update', this.onUpdate);
    this.client.addListener('clientUpdate', this.onClientUpdate);
  };

  removeTdLibListener = () => {
    this.client.removeListener('update', this.onUpdate);
    this.client.removeListener('clientUpdate', this.onClientUpdate);
  };

  assign(source1, source2) {
    Object.assign(source1, source2);
    //this.set(Object.assign({}, source1, source2));
  }

  get(userId) {
    return this.items.get(userId);
  }

  set(user) {
    this.items.set(user.id, user);
  }

  getFullInfo(id) {
    return this.fullInfoItems.get(id);
  }

  setFullInfo(id, fullInfo) {
    this.fullInfoItems.set(id, fullInfo);
  }
}

const store = new UserStore();
window.user = store;
export default store;
