// 生成正态分布随机数
function normalDistribution(mean, stdDev) {
    let u1 = 0,
        u2 = 0;
    // 利用Box-Muller变换生成标准正态分布随机数
    while (u1 === 0) u1 = Math.random(); // Converting [0,1) to (0,1)
    while (u2 === 0) u2 = Math.random();
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    // z1 是一个独立的标准正态分布随机数
    // 我们将 z0 转换为具有给定平均值和标准差的正态分布随机数
    return z0 * stdDev + mean;
}

export default function generateFishWeightData(fishCountData) {
    // 定义每种鱼的平均重量、标准差和最小/最大重量
    const fishStats = {
        "金枪鱼": { mean: 140, stdDev: 20, min: 80, max: 200 },
        "鲈鱼": { mean: 110, stdDev: 15, min: 60, max: 150 },
        "鳕鱼": { mean: 90, stdDev: 10, min: 40, max: 120 },
        "鲑鱼": { mean: 180, stdDev: 25, min: 100, max: 250 },
        "马哈鱼": { mean: 220, stdDev: 30, min: 120, max: 300 }
    };

    // 计算所有鱼的平均重量和标准差
    let totalFishCount = 0;
    let totalWeight = 0;
    let totalWeightSquared = 0;
    for (const fish of fishCountData) {
        totalFishCount += fish.value;
        const { mean, stdDev } = fishStats[fish.name];
        totalWeight += mean * fish.value;
        totalWeightSquared += (stdDev * stdDev + mean * mean) * fish.value;
    }
    const overallMean = totalWeight / totalFishCount;
    const overallStdDev = Math.sqrt(totalWeightSquared / totalFishCount - overallMean * overallMean);

    // 生成随机重量数据
    const fishWeightData = fishCountData.map(fish => {
        const { name, value } = fish;
        const { mean, stdDev, min, max } = fishStats[name];
        const weights = [];
        for (let i = 0; i < value; i++) {
            let weight = normalDistribution(overallMean, overallStdDev);
            weight = Math.max(min, Math.min(max, weight)); // 限制重量在最小值和最大值之间
            weights.push(Math.round(weight));
        }
        return { name, weights };
    });

    return fishWeightData;
}
