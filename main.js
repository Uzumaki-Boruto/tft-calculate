// MIT License

// main.js is a part of tft-calculate project
// Copyright (c) 2020 Uzumaki Boruto

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.


var app = angular.module('TFT', []);

app.filter('resourceFilter', () => {
    return function (x) {
        return x.replace(" ", "-").replace("'", "").toLowerCase();
    };
});

app.filter('champFilter', () => {
    return function (models, filterModel) {
        if (!filterModel || angular.equals(filterModel, {})) return models;
        if (filterModel.name) {
            return models.filter(x => {
                return x.champName.toLowerCase().includes(filterModel.name.toLowerCase())
            });
        }
        if (filterModel.tier) {
            const tierList = [
                "1 Vàng", "2 Vàng", "3 Vàng", "4 Vàng", "5 Vàng"
            ];
            const tier = tierList.indexOf(filterModel.tier);
            return models.filter(x => x.tier == tier);
        }
        return models;
    };
});

app.controller('generalCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.tftFilter = {};

    $scope.tierList = [
        "1 Vàng", "2 Vàng", "3 Vàng", "4 Vàng", "5 Vàng"
    ];

    $scope.tierCount = [29, 22, 16, 12, 10];
    $scope.tierChampCount = [12, 12, 12, 9, 7];

    $scope.tierPercent = [
        [100, 0, 0, 0, 0],
        [100, 0, 0, 0, 0],
        [70, 30, 0, 0, 0],
        [50, 35, 15, 0, 0],
        [35, 40, 20, 5, 0],
        [20, 35, 35, 10, 0],
        [14, 30, 40, 15, 1],
        [13, 20, 35, 25, 6],
        [10, 15, 25, 35, 15]
    ]

    $scope.classes = [
        // 0             1           2          3         4          5
        "Mật thám", "Kiếm khách", "Xạ thủ", "Mẫu hạm", "Pháp sư", "Bộc phá",
        // 6       7           8             9            10          11       12
        "Hộ vệ", "Bí ẩn", "Tiên phong", "Ngoại binh", "Pháo thủ", "Đấu sĩ", "Ma tặc"
    ];

    $scope.origins = [
        // 0                 1          2          3              4
        "Siêu công nghệ", "Vũ trụ", "Nổi loạn", "Không tặc", "Thánh nữ",
        //  5                  6           7             8            9
        "Vệ binh tinh trùng", "Cơ giáp", "Hắc tinh", "Thời không", "Hư không"
    ];
    $scope.baseData = [];

    $http.get("data.json").then(response => {
        $scope.baseData = response.data;
        for (const champ of $scope.baseData) {
            $scope.calculateData.push({
                count: 0,
                champName: champ.champName,
                tier: champ.tier
            });
        }
    });

    $scope.calculateData = [];

    $scope.player = {
        level: 2
    }

    $scope.plusChampion = (champName) => {
        const champ = $scope.calculateData.find(x => x.champName == champName);
        if (champ == undefined || champ.count == $scope.tierCount[champ.tier]) {
            return;
        }
        $scope.calculateData.find(x => x.champName == champName).count++;
    };

    $scope.minusChampion = (champName) => {
        const champ = $scope.calculateData.find(x => x.champName == champName);
        if (champ == undefined || champ.count == 0) {
            return;
        }
        champ.count--;
    };

    $scope.getCount = (champName) => {
        return $scope.calculateData.find(x => x.champName == champName).count;
    }

    $scope.getPercent = (champ) => {
        const tier = champ.tier;
        const tierCount = $scope.tierCount[tier];
        const champRemainCount = tierCount - $scope.calculateData.find(x => x.champName == champ.champName).count;
        if (champRemainCount <= 0) {
            return 0;
        }
        const percentOfTier = $scope.tierPercent[$scope.player.level - 1][tier];
        if (percentOfTier <= 0) {
            return 0;
        }
        const totalChampCurrent = $scope.calculateData.filter(x => x.tier == champ.tier).map(x => x.count).reduce((a, b) => a + b, 0);
        if (totalChampCurrent == 0) {
            return percentOfTier / $scope.tierChampCount[tier];
        }
        const perchamp = percentOfTier / ($scope.tierChampCount[tier] * tierCount - totalChampCurrent);
        return perchamp * champRemainCount;
    };

    $scope.getRemaining = (champ) => {
        const tierCount = $scope.tierCount[champ.tier];
        return tierCount - $scope.calculateData.find(x => x.champName == champ.champName).count;
    };

    $scope.levelUp = () => {
        if ($scope.player.level == 9) return;
        $scope.player.level++;
    };

    $scope.levelDown = () => {
        if ($scope.player.level == 1) return;
        $scope.player.level--;
    };

    $scope.getTierClass = (tier) => "tier-" + (tier + 1);
    $scope.getTierTextClass = (tier) => "tier-" + tier + "-text";
    $scope.getMediaGrid = () => {
        if ($(window).width() > 1600) {
            return "col-xl-3";
        }
        return "col-xl-4";
    };
}]);