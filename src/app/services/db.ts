import * as ng from 'angular'

export enum Gender {
    Male = 1,
    Female = 2,
}

export type Inches = 1|2|3|4|5|6|7|8|9|10|11|12

export interface Height {
    feet: number;
    inches: Inches;
}

export type Ounces = 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16

export interface Weight {
    pounds: number;
    ounces: Ounces;
}

export interface Client {
    id: number;
    firstName: string,
    lastName: string,
    dob: Date,
    height: Height,
    weight: Weight,
    gender: Gender,
}

export class Db {
    static serviceName = 'db';

    static $inject = ['$window']
    public constructor(private $window: ng.IWindowService) {
        //this.$window.localStorage.clear();
        const clients = this.$window.localStorage.getItem("clients");
        if (clients === null || clients.length == 0) {
            this.Seed();
            this.Save();
        } else {
            this.Clients = ng.fromJson(clients);
        }
    }

    Clients: Client[];

    Save = () => {
        this.$window.localStorage.setItem("clients", ng.toJson(this.Clients));
    }

    private Seed = () => {
        function random<T>(source: T[]) {
            return source[Math.floor(Math.random() * source.length)];
        }

        function flatMap<T, TResult>(source: T[], selector: (x: T) => TResult[]): TResult[] {
            return source.reduce((a, b) => a.concat(selector.call(source, b)), []);
        }

        const dobFactory = function () {
            const oldest = new Date(1945, 1, 1).getTime();
            const youngest = new Date(1999, 1, 1).getTime();
            return () => new Date(oldest + Math.random() * (youngest - oldest));
        }();

        const inches = [...Array(11).keys()] as Inches[];
        const feet = [ 4, 5, 6, 7];
        const pounds = [...Array(150).keys()].map(x => x + 50);
        const ounces = [...Array(15).keys()] as Ounces[];
        
        const lastNames = ['Doe', 'Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'];
        const boys = ['James', 'John', 'Robert', 'Micheal', 'William', 'David', 'Richard', 'Joseph']
            .map(firstName => { return { firstName, gender: Gender.Male} });
        const girls = ['Mary', 'Patricia', 'Jennifer', 'Elizabeth', 'Linda', 'Barbara', 'Susan', 'Jessica']
            .map(firstName => { return { firstName, gender: Gender.Female} });        

        this.Clients = flatMap(lastNames, last =>
            boys.concat(girls)
            .map((x, i) => {
                return {
                    id: i,
                    lastName: last,
                    dob: dobFactory(),
                    height: {
                        feet: random(feet),
                        inches: random(inches),
                    },
                    weight: {
                        pounds: random(pounds),
                        ounces: random(ounces),
                    },
                    ...x,
                };
            })
        );
    }
}