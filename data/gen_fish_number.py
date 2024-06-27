import pandas as pd
import numpy as np
from datetime import datetime
from openpyxl import Workbook
from openpyxl.utils.dataframe import dataframe_to_rows
import matplotlib.pyplot as plt

plt.rcParams['font.family'] = 'SimHei'
plt.rcParams['axes.unicode_minus'] = False

# 设置起始日期和结束日期
start_date = datetime(2021, 6, 30)
end_date = datetime(2024, 6, 30)

# 生成日期范围
date_range = pd.date_range(start=start_date, end=end_date)

# 生成平滑的鱼群数量
np.random.seed(13)  # 设置随机种子以确保结果可复现
initial_count = 650
fish_counts = [initial_count]
for _ in range(1, len(date_range)):
    change = np.random.randint(-20, 20)  # 每天鱼群数量变化在-5到5之间
    fish_counts.append(fish_counts[-1] + change)

# 创建DataFrame
data = pd.DataFrame({
    '日期': date_range,
    '鱼群数量': fish_counts
})

data.plot(x='日期', y = '鱼群数量')
plt.show()

# 创建Excel工作簿
wb = Workbook()
ws = wb.active
ws.title = "Sheet1"

# 将DataFrame写入Excel工作表
for r in dataframe_to_rows(data, index=False, header=True):
    ws.append(r)

# 格式化日期列
for cell in ws['A'][1:]:  # 跳过标题行
    cell.number_format = 'YYYY年MM月DD日'

# 保存为Excel文件
wb.save('fish_population_history.xlsx')

print("Excel文件已生成并保存为 'fish_population_history.xlsx'")
