import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from openpyxl import Workbook
from openpyxl.utils.dataframe import dataframe_to_rows

np.random.seed(0)
# 设置2023年日期范围
start_date = datetime(2023, 1, 1)
end_date = datetime(2023, 12, 31)
date_range = pd.date_range(start=start_date, end=end_date)

# 每个月的平均值
evaporation_avg = [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
precipitation_avg = [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
temperature_avg = [14.0, 14.2, 15.3, 16.5, 18.3, 22.2, 32.3, 35.4, 35.0, 28.5, 24.0, 18.2]

# 函数生成每天的值，确保每月的平均值
def generate_daily_values(month_days, monthly_avg):
    daily_values = []
    for index, days in enumerate(month_days):
        month_values = np.random.normal(loc=monthly_avg[index], scale=5, size=days)
        month_values_process = [max(x, 0) for x in month_values]
        daily_values.extend(month_values_process)
    return daily_values

# 计算每个月的天数
month_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

# 生成每天的蒸发量、降水量和温度
evaporation_values = generate_daily_values(month_days, evaporation_avg)
precipitation_values = generate_daily_values(month_days, precipitation_avg)
temperature_values = generate_daily_values(month_days, temperature_avg)

# 创建DataFrame
data = pd.DataFrame({
    '日期': date_range,
    '蒸发量': evaporation_values,
    '降水量': precipitation_values,
    '温度': temperature_values
})

# 创建Excel工作簿
wb = Workbook()
ws = wb.active
ws.title = "2023年数据"

# 将DataFrame写入Excel工作表
for r in dataframe_to_rows(data, index=False, header=True):
    ws.append(r)

# 格式化日期列
for cell in ws['A'][1:]:  # 跳过标题行
    cell.number_format = 'YYYY/MM/DD'

# 保存为Excel文件
wb.save('2023_weather_data.xlsx')

print("Excel文件已生成并保存为 '2023_weather_data.xlsx'")
