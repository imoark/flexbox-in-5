var flexbox;
(function (flexbox) {
    (function (_model) {
        var FlexItem = (function () {
            function FlexItem(model, index, flexGrow, flexShrink, flexBasis, alignSelf, backgroundColor) {
                if (typeof flexGrow === "undefined") { flexGrow = "1"; }
                if (typeof flexShrink === "undefined") { flexShrink = "1"; }
                if (typeof flexBasis === "undefined") { flexBasis = "100px"; }
                if (typeof alignSelf === "undefined") { alignSelf = "center"; }
                if (typeof backgroundColor === "undefined") { backgroundColor = "tomato"; }
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
            FlexItem.prototype.resetProps = function () {
                var currentProps = this.iPropsCurrent;
                var newProps = this.model.iPropsDefault;
                currentProps.flexGrow(newProps.flexGrow());
                currentProps.flexShrink(newProps.flexShrink());
                currentProps.flexBasis(newProps.flexBasis());
                currentProps.alignSelf(newProps.alignSelf());
            };

            FlexItem.prototype.destroySelf = function () {
                var index = parseInt(this.index(), 10);
                this.model.destroyItem(index);
            };
            return FlexItem;
        })();
        _model.FlexItem = FlexItem;
    })(flexbox.model || (flexbox.model = {}));
    var model = flexbox.model;
})(flexbox || (flexbox = {}));
var flexbox;
(function (flexbox) {
    (function (view) {
        var FlexContainer = (function () {
            function FlexContainer() {
                this.items = ko.observableArray([]);

                this.noItems = ko.computed(function () {
                    var array = this.items();
                    console.log(array);
                    if (array.length) {
                        return false;
                    } else {
                        return true;
                    }
                }, this);

                this.iPropsDefault = {
                    order: ko.observable("1"),
                    flexGrow: ko.observable("1"),
                    flexShrink: ko.observable("1"),
                    flexBasis: ko.observable("300px"),
                    alignSelf: ko.observable("center"),
                    width: ko.observable("300px"),
                    height: ko.observable("300px"),
                    backgroundColor: "blue",
                    margin: "10px"
                };

                this.defaultBtnText = ko.computed(function () {
                    var def = this.iPropsDefault;

                    if (def.flexGrow() === '1' && def.flexShrink() === '1' && def.flexBasis() === "300px" && def.alignSelf() === "center") {
                        return "reset all items";
                    } else {
                        return "update item defaults";
                    }
                }, this);

                this.cPropsDefault = {
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    backgroundColor: "yellow"
                };

                this.cPropsCurrent = {
                    display: ko.observable("flex"),
                    flexDirection: ko.observable("row"),
                    flexWrap: ko.observable("wrap"),
                    justifyContent: ko.observable("center"),
                    alignItems: ko.observable("center"),
                    alignContent: ko.observable("center"),
                    width: ko.observable("75%")
                };

                this.flexDirectionOptions = ['row', 'column'];
                this.flexWrapOptions = ['wrap', 'nowrap'];
                this.justifyContentOptions = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'];
                this.alignItemsOptions = ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'];
                this.alignContentOptions = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'stretch'];
                this.alignSelfOptions = ['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch', 'inherit'];
            }
            FlexContainer.prototype.newItem = function () {
                var index = this.getItemIndex();
                var newItem = new flexbox.model.FlexItem(this, index);
                this.items.push(newItem);
            };

            FlexContainer.prototype.oneLessItem = function () {
                this.items.pop();
            };

            FlexContainer.prototype.getItemIndex = function () {
                var currentLength = this.items().length;
                return currentLength + 1;
            };

            FlexContainer.prototype.resetItemProps = function () {
                var array = this.items();
                for (var i = 0; i < array.length; i++) {
                    array[i].resetProps();
                }
            };
            FlexContainer.prototype.destroyItem = function (index) {
                var self = this;
                self.items.splice((index - 1), 1);
                (function () {
                    var array = self.items();
                    for (var i = 0; i < array.length; i++) {
                        var newIndex = i + 1;
                        var stringIndex = newIndex.toString();
                        array[i].index(stringIndex);
                    }
                })();
            };

            FlexContainer.prototype.makeHolyGrail = function () {
                var index = this.getItemIndex();
                this.items([]);
                console.log('cleared the array completely');

                this.items.push(new flexbox.model.FlexItem(this, index++, "0", "1", "100%", "center", "green"), new flexbox.model.FlexItem(this, index++), new flexbox.model.FlexItem(this, index++), new flexbox.model.FlexItem(this, index++), new flexbox.model.FlexItem(this, index++, "0", "1", "100%", "center", "green"));
            };
            return FlexContainer;
        })();
        view.FlexContainer = FlexContainer;
    })(flexbox.view || (flexbox.view = {}));
    var view = flexbox.view;
})(flexbox || (flexbox = {}));
