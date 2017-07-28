import url from './list.html'
import * as ng from 'angular'
import { Observable } from 'rxjs'
import { Db, Client } from 'app/services/db'

export class ComponentOptions implements ng.IComponentOptions {
    controller = Controller as ng.Injectable<ng.IControllerConstructor>;
    static selector = 'clientList' as 'clientList';
    templateUrl = url;
}

class Controller {
    static $inject = ['db', '$state', '$mdDialog'];
    constructor(private db: Db, private $state: ng.ui.IStateService, private $mdDialog: ng.material.IDialogService) { }
    
    data = this.db.Clients;
    query = { limit: 10, page: 1, filter: '', order: '' };

    delete = (client: Client, $event: MouseEvent) => {
        const dialog = this.$mdDialog.confirm()
            .ok("Yes")
            .cancel("No")
            .textContent("Are you sure you would like to delete this item?")
            .targetEvent($event);
        this.$mdDialog.show(dialog).then(() => {
            this.data.splice(this.data.indexOf(client), 1);
            this.db.Save()
        });
    }

    create = ($event: MouseEvent) => {
        const dialog = this.$mdDialog.alert()
            .textContent("Ummm, who said anything about adding?  :)")
            .ok("Shucks")
            .targetEvent($event);
        this.$mdDialog.show(dialog);
    }
}
