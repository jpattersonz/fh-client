import url from './edit.html'
import * as ng from 'angular'
import { Observable } from 'rxjs'

import { Db, Client } from '../../services/index'

export class ComponentOptions implements ng.IComponentOptions {
    controller = Controller as ng.Injectable<ng.IControllerConstructor>;
    bindings = {
        item: '<',
    };
    static selector = 'clientEdit' as 'clientEdit';
    templateUrl = url;
}

class Controller implements ng.IController {
    static $inject = ['db', '$state', '$mdDialog'];
    constructor(private db: Db, private $state: ng.ui.IStateService, private $mdDialog: ng.material.IDialogService) { }

    item: Client;
    private backup: Client;

    $onInit = () => this.backup = ng.copy(this.item);

    done = () => {
        this.db.Save();
        this.$state.back();
    }
    
    cancel = () => {
        ng.copy(this.backup, this.item);
        this.$state.back();
    }
}
