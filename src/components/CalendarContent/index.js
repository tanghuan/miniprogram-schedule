import clsx from "clsx";
import React, { useState } from "react";
import { View, ScrollView } from "remax/wechat";

import { zhCN } from "date-fns/locale";
import format from "date-fns/format";
import addDays from "date-fns/addDays";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import compareAsc from "date-fns/compareAsc";
import compareDesc from "date-fns/compareDesc";
import isSameDay from "date-fns/isSameDay";

import styles from "./index.css";

const CalendarContent = (props) => {
  const { currentView, currentDate } = props;
  const isWeekView = currentView === "week";
  const currentMonth = format(currentDate, "M", { locale: zhCN });
  const now = new Date();

  const [selectedDate, setSelectedDate] = useState();

  const onSelected = (date) => setSelectedDate(date);

  const renderWeekContent = () => {
    const rows = [];

    for (let i = 8; i <= 23; i++) {
      rows.push(
        <View className={styles.timeRow} key={i}>
          <View className={clsx(styles.timeCol, styles.timeText)}>{i}:00</View>
          <View className={styles.timeCol}>
            <View className={styles.timeCell}></View>
            <View className={styles.timeCell}></View>
          </View>
          <View className={styles.timeCol}>
            <View className={styles.timeCell}></View>
            <View className={styles.timeCell}></View>
          </View>
          <View className={styles.timeCol}>
            <View className={styles.timeCell}></View>
            <View className={styles.timeCell}></View>
          </View>
          <View className={styles.timeCol}>
            <View className={styles.timeCell}></View>
            <View className={styles.timeCell}></View>
          </View>
          <View className={styles.timeCol}>
            <View className={styles.timeCell}></View>
            <View className={styles.timeCell}></View>
          </View>
          <View className={styles.timeCol}>
            <View className={styles.timeCell}></View>
            <View className={styles.timeCell}></View>
          </View>
          <View className={styles.timeCol}>
            <View className={styles.timeCell}></View>
            <View className={styles.timeCell}></View>
          </View>
        </View>
      );
    }
    return rows;
  };

  const renderMonthContent = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart, { locale: zhCN });
    const endDate = endOfWeek(monthEnd, { locale: zhCN });
    const rows = [];
    for (let day = startDate; day <= endDate; ) {
      const cols = [];
      for (let i = 0; i < 7; i++) {
        const dayOfYear = format(day, "DDD", { locale: zhCN });
        const dayOfMonth = format(day, `d`, { locale: zhCN });
        // day < monthStart return 1
        const compareWithStart = compareDesc(day, monthStart);

        // day > monthEnd return 1
        const compareWithEnd = compareAsc(day, monthEnd);

        const isCurrentDay = isSameDay(now, day);
        const isSelected = selectedDate && isSameDay(selectedDate, day);

        const classes = clsx(
          styles.col,
          (compareWithStart > 0 || compareWithEnd > 0) && styles.outRange,
          isCurrentDay && styles.currentDay,
          isSelected && styles.selectedDay
        );
        const date = day;
        cols.push(
          <View
            key={dayOfYear}
            className={classes}
            onClick={() => onSelected(date)}
          >
            {dayOfMonth}
          </View>
        );
        day = addDays(day, 1);
      }

      rows.push(
        <View className={styles.row} key={day}>
          {cols}
        </View>
      );
    }
    return rows;
  };

  return (
    <View className={styles.content}>
      {isWeekView ? renderWeekContent() : renderMonthContent()}
      {!isWeekView && <View className={styles.monthBg}>{currentMonth}</View>}
    </View>
  );
};

export default CalendarContent;
