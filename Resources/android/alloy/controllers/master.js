function Controller() {
    function __alloyId10() {
        $.__views.master.removeEventListener("open", __alloyId10);
        if ($.__views.master.activity) $.__views.master.activity.onCreateOptionsMenu = function(e) {
            var __alloyId9 = {
                title: "Refresh",
                icon: "/refresh_icon.png",
                id: "__alloyId8"
            };
            $.__views.__alloyId8 = e.menu.add(_.pick(__alloyId9, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId8.applyProperties(_.omit(__alloyId9, Alloy.Android.menuItemCreateArgs));
            refreshRss ? $.__views.__alloyId8.addEventListener("click", refreshRss) : __defers["$.__views.__alloyId8!click!refreshRss"] = true;
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }
    function openDetail(e) {
        $.trigger("detail", e);
    }
    function refreshRss() {
        rss.loadRssFeed({
            success: function(data) {
                var rows = [];
                _.each(data, function(item) {
                    rows.push(Alloy.createController("row", {
                        articleUrl: item.link,
                        image: item.image,
                        title: item.title,
                        date: item.pubDate
                    }).getView());
                });
                $.table.setData(rows);
            }
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "master";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.master = Ti.UI.createWindow({
        backgroundColor: "#fff",
        navBarHidden: true,
        exitOnClose: true,
        title: "RSS Reader",
        id: "master"
    });
    $.__views.master && $.addTopLevelView($.__views.master);
    $.__views.master.addEventListener("open", __alloyId10);
    $.__views.table = Ti.UI.createTableView({
        id: "table"
    });
    $.__views.master.add($.__views.table);
    openDetail ? $.__views.table.addEventListener("click", openDetail) : __defers["$.__views.table!click!openDetail"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var rss = require("rss");
    refreshRss();
    __defers["$.__views.__alloyId8!click!refreshRss"] && $.__views.__alloyId8.addEventListener("click", refreshRss);
    __defers["$.__views.refreshButton!click!refreshRss"] && $.__views.refreshButton.addEventListener("click", refreshRss);
    __defers["$.__views.table!click!openDetail"] && $.__views.table.addEventListener("click", openDetail);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;