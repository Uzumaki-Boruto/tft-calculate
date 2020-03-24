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

app.controller('generalCtrl', ['$scope', '$window', '$filter', function ($scope, $window, $filter) {

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
        [12, 20, 35, 25, 7],
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

    $scope.baseData = [
        {
            champName: "Caitlyn",
            tier: 0,
            class: [$scope.classes[2]],
            origin: [$scope.origins[8]]
        },
        {
            champName: "Fiora",
            tier: 0,
            class: [$scope.classes[1]],
            origin: [$scope.origins[0]]
        },
        {
            champName: "Graves",
            tier: 0,
            class: [$scope.classes[10]],
            origin: [$scope.origins[3]]
        },
        {
            champName: "Jarvan IV",
            tier: 0,
            class: [$scope.classes[6]],
            origin: [$scope.origins[7]]
        },
        {
            champName: "Kha'Zix",
            tier: 0,
            class: [$scope.classes[0]],
            origin: [$scope.origins[9]]
        },
        {
            champName: "Leona",
            tier: 0,
            class: [$scope.classes[8]],
            origin: [$scope.origins[0]]
        },
        {
            champName: "Malphite",
            tier: 0,
            class: [$scope.classes[11]],
            origin: [$scope.origins[2]]
        },
        {
            champName: "Poppy",
            tier: 0,
            class: [$scope.classes[8]],
            origin: [$scope.origins[5]]
        },
        {
            champName: "Twisted Fate",
            tier: 0,
            class: [$scope.classes[4]],
            origin: [$scope.origins[8]]
        },
        {
            champName: "Xayah",
            tier: 0,
            class: [$scope.classes[1]],
            origin: [$scope.origins[1]]
        },
        {
            champName: "Ziggs",
            tier: 0,
            class: [$scope.classes[5]],
            origin: [$scope.origins[2]]
        },
        {
            champName: "Zoe",
            tier: 0,
            class: [$scope.classes[4]],
            origin: [$scope.origins[5]]
        },
        {
            champName: "Ahri",
            tier: 1,
            class: [$scope.classes[4]],
            origin: [$scope.origins[5]]
        },
        {
            champName: "Annie",
            tier: 1,
            class: [$scope.classes[4]],
            origin: [$scope.origins[6]]
        },
        {
            champName: "Blitzcrank",
            tier: 1,
            class: [$scope.classes[11]],
            origin: [$scope.origins[8]]
        },
        {
            champName: "Darius",
            tier: 1,
            class: [$scope.classes[12]],
            origin: [$scope.origins[3]]
        },
        {
            champName: "Kai'Sa",
            tier: 1,
            class: [$scope.classes[0]],
            origin: [$scope.origins[4]]
        },
        {
            champName: "Lucian",
            tier: 1,
            class: [$scope.classes[10]],
            origin: [$scope.origins[0]]
        },
        {
            champName: "Mordekaiser",
            tier: 1,
            class: [$scope.classes[8]],
            origin: [$scope.origins[7]]
        },
        {
            champName: "Rakan",
            tier: 1,
            class: [$scope.classes[6]],
            origin: [$scope.origins[1]]
        },
        {
            champName: "Shen",
            tier: 1,
            class: [$scope.classes[1]],
            origin: [$scope.origins[8]]
        },
        {
            champName: "Sona",
            tier: 1,
            class: [$scope.classes[7]],
            origin: [$scope.origins[2]]
        },
        {
            champName: "Xin Zhao",
            tier: 1,
            class: [$scope.classes[6]],
            origin: [$scope.origins[1]]
        },
        {
            champName: "Yasuo",
            tier: 1,
            class: [$scope.classes[1]],
            origin: [$scope.origins[2]]
        },
        {
            champName: "Ashe",
            tier: 2,
            class: [$scope.classes[2]],
            origin: [$scope.origins[1]]
        },
        {
            champName: "Ezreal",
            tier: 2,
            class: [$scope.classes[10]],
            origin: [$scope.origins[8]]
        },
        {
            champName: "Jayce",
            tier: 2,
            class: [$scope.classes[8]],
            origin: [$scope.origins[3]]
        },
        {
            champName: "Karma",
            tier: 2,
            class: [$scope.classes[7]],
            origin: [$scope.origins[7]]
        },
        {
            champName: "Kassadin",
            tier: 2,
            class: [$scope.classes[12]],
            origin: [$scope.origins[1]]
        },
        {
            champName: "Lux",
            tier: 2,
            class: [$scope.classes[4]],
            origin: [$scope.origins[7]]
        },
        {
            champName: "Master Yi",
            tier: 2,
            class: [$scope.classes[1]],
            origin: [$scope.origins[2]]
        },
        {
            champName: "Neeko",
            tier: 2,
            class: [$scope.classes[6]],
            origin: [$scope.origins[5]]
        },
        {
            champName: "Rumble",
            tier: 2,
            class: [$scope.classes[5]],
            origin: [$scope.origins[6]]
        },
        {
            champName: "Shaco",
            tier: 2,
            class: [$scope.classes[0]],
            origin: [$scope.origins[7]]
        },
        {
            champName: "Syndra",
            tier: 2,
            class: [$scope.classes[4]],
            origin: [$scope.origins[5]]
        },
        {
            champName: "Vi",
            tier: 2,
            class: [$scope.classes[11]],
            origin: [$scope.origins[0]]
        },
        // Tướng 4 tiền ở dưới     
        {
            champName: "Wukong",
            tier: 3,
            class: [$scope.classes[8]],
            origin: [$scope.origins[8]]
        },
        {
            champName: "Irelia",
            tier: 3,
            class: [$scope.classes[1], $scope.classes[12]],
            origin: [$scope.origins[0]]
        },
        {
            champName: "Jhin",
            tier: 3,
            class: [$scope.classes[2]],
            origin: [$scope.origins[7]]
        },
        {
            champName: "Fizz",
            tier: 3,
            class: [$scope.classes[0]],
            origin: [$scope.origins[6]]
        },
        {
            champName: "Jinx",
            tier: 3,
            class: [$scope.classes[10]],
            origin: [$scope.origins[2]]
        },
        {
            champName: "Soraka",
            tier: 3,
            class: [$scope.classes[7]],
            origin: [$scope.origins[5]]
        },
        {
            champName: "Kayle",
            tier: 3,
            class: [$scope.classes[1]],
            origin: [$scope.origins[4]]
        },
        {
            champName: "Velkoz",
            tier: 3,
            class: [$scope.classes[4]],
            origin: [$scope.origins[9]]
        },
        {
            champName: "Cho'gath",
            tier: 3,
            class: [$scope.classes[11]],
            origin: [$scope.origins[9]]
        },



        // Tướng 5 tiền ở dưới
        {
            champName: "Lulu",
            tier: 4,
            class: [$scope.classes[7]],
            origin: [$scope.origins[1]]
        },
        {
            champName: "Ekko",
            tier: 4,
            class: [$scope.classes[0]],
            origin: [$scope.origins[0]]
        },
        {
            champName: "Thresh",
            tier: 4,
            class: [$scope.classes[12]],
            origin: [$scope.origins[8]]
        },
        {
            champName: "Aurelion Sol",
            tier: 4,
            class: [$scope.classes[3]],
            origin: [$scope.origins[2]]
        },
        {
            champName: "Gangplank",
            tier: 4,
            class: [$scope.classes[5], $scope.classes[9]],
            origin: [$scope.origins[3]]
        },
        {
            champName: "Miss Fortune",
            tier: 4,
            class: [$scope.classes[9], $scope.classes[10]],
            origin: [$scope.origins[4]]
        },
    ];

    $scope.calculateData = [];

    $scope.player = {
        level: 2
    }

    for (const champ of $scope.baseData) {
        $scope.calculateData.push({
            count: 0,
            champName: champ.champName,
            tier: champ.tier
        });
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
    }

    $scope.levelUp = () => {
        if ($scope.player.level == 9) return;
        $scope.player.level++;
    }

    $scope.levelDown = () => {
        if ($scope.player.level == 1) return;
        $scope.player.level--;
    }

    $scope.getTierClass = (tier) => "tier-" + (tier + 1);
}]);