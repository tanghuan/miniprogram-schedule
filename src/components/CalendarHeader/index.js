import clsx from "clsx";
import React from "react";
import { Text, View } from "remax/wechat";
import { zhCN } from "date-fns/locale";
import format from "date-fns/format";
import addDays from "date-fns/addDays";
import addWeeks from "date-fns/addWeeks";
import addMonths from "date-fns/addMonths";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import startOfMonth from "date-fns/startOfMonth";
import styles from "./index.css";
// Schedule Header Component

const ScheduleHeader = (props) => {
  const { currentView, currentDate } = props;
  const isWeekView = currentView === "week";

  const startDate = startOfWeek(currentDate, {
    locale: zhCN,
  });

  const days = [];

  for (let i = 0; i < 7; i++) {
    const date = addDays(startDate, i);
    const dayOfYear = format(date, "DDD");
    days.push(
      <View className={clsx(styles.item, styles.weekItem)} key={dayOfYear}>
        {currentView === "week" && (
          <View className={styles.day}>
            {format(date, "dd", { locale: zhCN })}
          </View>
        )}
        <View>{format(date, "eee", { locale: zhCN })}</View>
      </View>
    );
  }

  const currentMonth = format(startDate, "M", { locale: zhCN });

  return (
    <View className={styles.header}>
      {isWeekView && (
        <View className={clsx(styles.item, styles.monthItem)}>
          <Text className={styles.monthText}>{currentMonth}</Text> 月
        </View>
      )}
      {days}
    </View>
  );
};

export default ScheduleHeader;
