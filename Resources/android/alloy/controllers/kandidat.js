function Controller() {
    function loadKandidat() {
        var httpclient = "http://api.pemiluapi.org/candidate/api/caleg?apiKey=fea6f7d9ec0b31e256a673114792cb17&";
        var dapil = "dapil=" + args[1];
        httpclient = httpclient.concat(dapil);
        var tahun = "&tahun=" + args[3];
        httpclient = httpclient.concat(tahun);
        var lembaga = "&lembaga=" + args[2];
        httpclient = httpclient.concat(lembaga);
        var provinsi = "&provinsi=" + args[0];
        httpclient = httpclient.concat(provinsi);
        Ti.API.log(httpclient);
        kandidatHTTPClient.open("GET", httpclient);
        kandidatHTTPClient.send();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "kandidat";
    var __parentSymbol = arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __alloyId4 = [];
    $.__views.master = Alloy.createController("master", {
        id: "master",
        __parentSymbol: __parentSymbol
    });
    $.__views.beritaTab = Ti.UI.createTab({
        window: $.__views.master.getViewEx({
            recurse: true
        }),
        title: "Berita",
        id: "beritaTab",
        icon: "KS_nav_ui.png"
    });
    __alloyId4.push($.__views.beritaTab);
    $.__views.__alloyId6 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        navBarHidden: true,
        id: "__alloyId6"
    });
    $.__views.kandidatTableView = Ti.UI.createTableView({
        id: "kandidatTableView"
    });
    $.__views.__alloyId6.add($.__views.kandidatTableView);
    $.__views.kandidatTab = Ti.UI.createTab({
        window: $.__views.__alloyId6,
        title: "Kandidat",
        id: "kandidatTab",
        icon: "KS_nav_views.png",
        active: "true"
    });
    __alloyId4.push($.__views.kandidatTab);
    $.__views.partaiTWin = Ti.UI.createWindow({
        backgroundColor: "#fff",
        navBarHidden: true,
        id: "partaiTWin",
        title: "Partai"
    });
    $.__views.__alloyId7 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        text: "Partai",
        id: "__alloyId7"
    });
    $.__views.partaiTWin.add($.__views.__alloyId7);
    $.__views.partaiTab = Ti.UI.createTab({
        window: $.__views.partaiTWin,
        title: "Partai",
        id: "partaiTab",
        icon: "KS_nav_views.png",
        active: "false"
    });
    __alloyId4.push($.__views.partaiTab);
    $.__views.tentangWin = Ti.UI.createWindow({
        backgroundColor: "#fff",
        navBarHidden: true,
        id: "tentangWin",
        title: "Tentang"
    });
    $.__views.__alloyId8 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        text: "Tentang",
        id: "__alloyId8"
    });
    $.__views.tentangWin.add($.__views.__alloyId8);
    $.__views.tentangTab = Ti.UI.createTab({
        window: $.__views.tentangWin,
        title: "Tentang",
        id: "tentangTab",
        icon: "KS_nav_views.png",
        active: "false"
    });
    __alloyId4.push($.__views.tentangTab);
    $.__views.tabGroup = Ti.UI.createTabGroup({
        tabs: __alloyId4,
        id: "tabGroup"
    });
    $.__views.tabGroup && $.addTopLevelView($.__views.tabGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.tabGroup.setActiveTab(1);
    Titanium.UI.currentWindow;
    var kandidatTableView = $.kandidatTableView;
    var data = [];
    var kandidatHTTPClient = Titanium.Network.createHTTPClient({
        onload: function() {
            var jsonObject = JSON.parse(this.responseText);
            jsonObject.data.results;
            var caleg = jsonObject.data.results.caleg;
            var total = jsonObject.data.results.count;
            alert(total);
            for (var i = 0; total > i; i++) {
                var aFeed = caleg[i];
                var row = Titanium.UI.createTableViewRow({
                    _nama: aFeed.nama,
                    _id: aFeed.id,
                    hasChild: true,
                    className: "module-row",
                    filter: aFeed.module_name,
                    height: "auto",
                    backgroundColor: "#fff"
                });
                var titleLabel = Titanium.UI.createLabel({
                    text: aFeed.nama,
                    font: {
                        fontSize: 14,
                        fontWeight: " bold"
                    },
                    left: 70,
                    top: 5,
                    height: 20,
                    width: 210,
                    color: "#232"
                });
                row.add(titleLabel);
                var descriptionLabel = Titanium.UI.createLabel({
                    text: aFeed.lembaga,
                    font: {
                        fontSize: 10,
                        fontWeight: " normal "
                    },
                    left: 70,
                    top: titleLabel.height + 10,
                    width: 200,
                    color: "#9a9"
                });
                row.add(descriptionLabel);
                var image = aFeed.foto_url;
                var iconImage = Titanium.UI.createImageView({
                    image: image,
                    width: 50,
                    height: 50,
                    left: 10,
                    top: 10
                });
                row.add(iconImage);
                data.push(row);
            }
            kandidatTableView.data = data;
            if (true == reloading) {
                moduleTable.setContentInsets({
                    top: 0
                }, {
                    animated: true
                });
                reloading = false;
                statusLabel.text = "Pull to refresh...";
                actIndicator.hide();
                arrowImage.backgroundImage = "img/refreshArrow.png";
                arrowImage.show();
            }
            isLoad = true;
        },
        onerror: function(e) {
            reloading = false;
            pulling = false;
            arrowImage.hide();
            actIndicator.hide();
            statusLabel.text = "";
            moduleTable.setContentInsets({
                top: 0
            }, {
                animated: true
            });
            Ti.API.debug(e.error);
            alert("Failed to retrieve data. \n Please make sure you're connected to internet.");
            isLoad || (isLoad = false);
        },
        timeout: 7e3
    });
    kandidatTableView.addEventListener("scroll", function() {});
    kandidatTableView.addEventListener("dragEnd", function() {});
    kandidatTableView.addEventListener("click", function(e) {
        var selectedRow = e.rowData;
        var detailWindow = Titanium.UI.createWindow({
            _title: selectedRow._title,
            _id: selectedRow._id,
            _moduleSlug: selectedRow.moduleSlug,
            _username: selectedRow.username,
            id_user: selectedRow.id_user,
            backgroundColor: "#fff",
            url: "detailModule.js",
            title: selectedRow._title,
            id: 0
        });
        Titanium.UI.currentTab.open(detailWindow);
    });
    loadKandidat();
    Ti.API.log(args[0]);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;