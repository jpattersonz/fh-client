import url from './landing.html'
import * as ng from 'angular'

export class ComponentOptions implements ng.IComponentOptions {
    controller = Controller as ng.Injectable<ng.IControllerConstructor>;
    static selector = 'landing' as 'landing';
    templateUrl = url;
}

export interface Card {
    name: string;
    description: string;
    icon: string;
    link: string;
    color: string;
}

export class Controller {
    cards: Card[] = [
        { name: "Clients", description: "Manage your clients!", icon: 'fa-user', link: 'client-list', color: 'yellow' },
    ]
}