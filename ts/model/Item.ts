module flexbox {

    export module model {

        export class FlexItem {

            model: any;
            index: any;
            iPropsCurrent: any;

            constructor(model: any, index: any,flexGrow:string = "1",flexShrink:string="1",flexBasis:string = "100px",alignSelf:string = "center",backgroundColor:string = "tomato") {

                this.index = ko.observable(index);
                this.model = model;
                console.log(model);
                this.iPropsCurrent = {
                    order: ko.observable("1"),
                    flexGrow: ko.observable(flexGrow),
                    flexShrink: ko.observable(flexShrink),
                    flexBasis: ko.observable(flexBasis),
                    alignSelf: ko.observable(alignSelf),
                    height: ko.observable("300px"),
                    backgroundColor: ko.observable(backgroundColor),
                    margin: ko.observable("10px")
                };



            }

            resetProps(): void {
                var currentProps = this.iPropsCurrent;
                var newProps = this.model.iPropsDefault;
                currentProps.flexGrow(newProps.flexGrow());
                currentProps.flexShrink(newProps.flexShrink());
                currentProps.flexBasis(newProps.flexBasis());
                currentProps.alignSelf(newProps.alignSelf());
            }

            destroySelf(): void {
                var index = parseInt(this.index(),10);
                this.model.destroyItem(index);
                
            }

        }

    }

}
