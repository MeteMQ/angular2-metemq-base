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

                const thing = Things.findOne({ _id: this.thingId });
                thing.act('print', 'print this for me...');

                return 'world!';
            }
        });
    }

    initFakeData(): void {
        if (DemoCollection.find({}).cursor.count() === 0) {
            const data: DemoDataObject[] = [{
                name: 'Dotan',
                age: 25
            }, {
                name: 'Liran',
                age: 26
            }, {
                name: 'Uri',
                age: 30
            }];

            data.forEach((obj: DemoDataObject) => {
                DemoCollection.insert(obj);
            });
        }
    }
}
