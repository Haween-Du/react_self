import dayjs, { Dayjs } from "dayjs";
import { WeekDataType } from "./interface";

export function getweekData(curYear: number | undefined) {
  //   默认当前是那年
  const defaultYear = dayjs().year();
  // 当前第几周
  const defaultWeek = dayjs().week();
  // console.log(dayjs().week(), "weekkkkkk");
  //   点击选择的年份
  const year = String(curYear ? curYear : defaultYear);
  const date: Dayjs = dayjs(`${year}-01-01`);

  //  当前月份的星期几 (今年第一天星期几)
  const day = date.startOf("month").day();

  //   这年有多少天
  const dayOfThisYear = dayjs(`${year}-12-31`).dayOfYear();
  //   console.log(dayOfThisYear, "dayOfThisYear");
  //  可以利用dayjs的add方法对日期天数进行加

  //   第一周几天
  const firstWeekOfDay = 7 - (day === 0 ? day : day - 1);
  //  计算第一周结束的日期
  const firstWeek = {
    week: "1",
    startDate: "01月01日",
    subEndDate: `01-0${firstWeekOfDay}`,
    endDate: `01月0${firstWeekOfDay}日`,
    year: year,
  };
  //   console.log(firstWeekOfDay, "firstWeekOfDay");

  //   计算最后一周结束的日期
  const lastWeekOfDay = (dayOfThisYear - firstWeekOfDay) % 7;
  //   console.log(lastWeekOfDay, "lastWeekOfDay");

  //   console.log(firstWeek, lastWeek, "firstWeek");

  //  全年除去第一周和最后一周所剩的天数
  const leftDays = dayOfThisYear - firstWeekOfDay - lastWeekOfDay;
  //   console.log(leftDays, "leftDays");

  const dataArr: WeekDataType[] = [firstWeek];
  //   全年天数除去第一周

  // 如果跳出了for循环，最后不要push本年最后一周的数据  还没有到那个时间
  let flag = true;

  for (let i = 1; i < leftDays / 7 + 1; i++) {
    dataArr[i] = {};
    dataArr[i].week = String(i + 1);
    // 开始的日期 等一上一个结束
    // dataArr[i].startDate = date.add(7 * i, "day").format("MM月DD日");
    dataArr[i].startDate = dataArr[i - 1].endDate;

    // 上个结束的,等于这个开始的
    const temp = dayjs(
      `${curYear ? curYear : defaultYear}-${dataArr[i - 1].subEndDate}`
    );
    // 结束的日期
    dataArr[i].endDate = temp.add(7, "day").format("MM月DD日");
    // console.log(date.add(7 * i, "day").format("YYYY-MM-DD"), "2222", i);
    // console.log(date.add(7 * i, "day").format("MM月DD日"), "2222", 111111);
    dataArr[i].subEndDate = temp.add(7, "day").format("MM-DD");
    dataArr[i].year = year;

    //
    if ((curYear === defaultYear || !curYear) && i > defaultWeek - 2) {
      // 是否本周的标识
      dataArr[i].isCurWeek = true;
      flag = false;
      break;
    }
  }
  //
  if (flag) {
    const lastWeek = {
      week: String(dataArr.length + 1),
      startDate: dataArr[dataArr.length - 1].endDate,
      endDate: `12月31日`,
      year: year,
    };
    dataArr.push(lastWeek);
  }
  console.log(dataArr, "dataArr");
  //   返回倒序
  return dataArr.reverse();
}
