import clsx from "clsx";
import React, { useState } from "react";
import { View, Swiper, SwiperItem } from "remax/wechat";

import { zhCN } from "date-fns/locale";
import format from "date-fns/format";
import endOfMonth from "date-fns/endOfMonth";
import startOfMonth from "date-fns/startOfMonth";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import addDays from "date-fns/addDays";
import isSameDay from "date-fns/isSameDay";

import styles from "./index.css";

// 参考资料
// https://medium.com/@moodydev/create-a-custom-calendar-in-react-3df1bfd0b728
// https://developers.weixin.qq.com/community/develop/doc/000a2496f38b8065f9e8974f451c00

const weeks = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

const Calendar = () => {
  const nowDate = new Date();
  const [currentDate, setCurrentDate] = useState(nowDate);

  const renderHeader = () => {
    const cols = weeks.map((week) => (
      <View key={week} className={styles.col}>
        {week}
      </View>
    ));
    return <View className={styles.row}>{cols}</View>;
  };

  const renderBody = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);

    const startDate = startOfWeek(monthStart, { locale: zhCN });
    const endDate = endOfWeek(monthEnd, { locale: zhCN });

    const rows = [];
    for (let date = startDate; date <= endDate; ) {
      const cols = [];
      for (let i = 0; i < 7; i++) {
        const dayOfMonth = format(date, `d`, { locale: zhCN });
        const sameDay = isSameDay(nowDate, date);
        const classes = clsx(
          styles.col,
          styles.cell,
          sameDay && styles.currentDay
        );
        cols.push(
          <View className={classes} key={date}>
            {dayOfMonth}
          </View>
        );
        date = addDays(date, 1);
      }
      rows.push(
        <View className={styles.row} key={date}>
          {cols}
        </View>
      );
    }

    return rows;
  };

  return (
    <Swiper className={styles.calendar}>
      <SwiperItem>
        <View className={styles.header}>{renderHeader()}</View>
        <View className={styles.body}>{renderBody()}</View>
      </SwiperItem>
      <SwiperItem>
        <View className={styles.header}>{renderHeader()}</View>
        <View className={styles.body}>{renderBody()}</View>
      </SwiperItem>
      <SwiperItem>
        <View className={styles.header}>{renderHeader()}</View>
        <View className={styles.body}>{renderBody()}</View>
      </SwiperItem>
    </Swiper>
  );
};

export default Calendar;
