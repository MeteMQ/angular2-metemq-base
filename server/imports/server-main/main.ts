import { DemoCollection } from '../../../both/collections/demo-collection';
import { DemoDataObject } from '../../../both/models/demo-data-object';
import { source } from '../../../both/metemq/source';
import { Things } from 'meteor/metemq:metemq';

export class Main {
    constructor() {
    }

    start(): void {
        this.initFakeData();
        this.initPublish();
        this.initMethods();
    }

    initPublish(): void {
        source.publish('demo', function() {
            return DemoCollection.find();
        }, ['name', 'age']);
    }

    initMethods(): void {
        source.methods({
            hello() {
                console.log('Thing says "hello"');
                return 'world!';
            }
        });
    }

    initFakeData(): void {
        if (DemoCollection.find({}).count() === 0) {
            DemoCollection.insert(<DemoDataObject>{
                name: 'Dotan',
                age: 25
            });

            DemoCollection.insert(<DemoDataObject>{
                name: 'Liran',
                age: 26
            });

            DemoCollection.insert(<DemoDataObject>{
                name: 'Uri',
                age: 30
            });
        }
    }
}
