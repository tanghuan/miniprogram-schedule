import clsx from "clsx";
import React, { useState, useRef } from "react";
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
import { addMonths } from "date-fns";

// 参考资料
// https://medium.com/@moodydev/create-a-custom-calendar-in-react-3df1bfd0b728
// https://developers.weixin.qq.com/community/develop/doc/000a2496f38b8065f9e8974f451c00
// * https://blog.csdn.net/sinat_33184880/article/details/96145086

const weeks = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

const Calendar = () => {
  const nowDate = new Date();
  const [currentDot, setCurrentDot] = useState(0);
  const [lastTapDate, setLastTapDate] = useState();
  const [months, setMonths] = useState(() => {
    const prevMonth = addMonths(nowDate, -1);
    const nextMonth = addMonths(nowDate, 1);
    return [nowDate, nextMonth, prevMonth];
  });

  const handleChange = (event) => {
    const current = event.detail.current;

    // 向左滑动
    // 0 => 1
    if (currentDot === 0 && current === 1) {
      const temp = [...months];
      temp[2] = addMonths(temp[1], 1);
      setMonths(temp);
    }

    // 1 => 2
    if (currentDot === 1 && current === 2) {
      const temp = [...months];
      temp[0] = addMonths(temp[2], 1);
      setMonths(temp);
    }

    // 2 => 0
    if (currentDot === 2 && current === 0) {
      const temp = [...months];
      temp[1] = addMonths(temp[0], 1);
      setMonths(temp);
    }

    // 向右滑动
    // 0 => 2
    if (currentDot === 0 && current === 2) {
      const temp = [...months];
      temp[1] = addMonths(temp[2], -1);
      setMonths(temp);
    }

    // 2 => 1
    if (currentDot === 2 && current === 1) {
      const temp = [...months];
      temp[0] = addMonths(temp[1], -1);
      setMonths(temp);
    }

    // 1 => 0
    if (currentDot === 1 && current === 0) {
      const temp = [...months];
      temp[2] = addMonths(temp[0], -1);
      setMonths(temp);
    }
    setCurrentDot(current);
  };

  const onDoubleTap = (event) => {
    if (lastTapDate) {
      if (event.timeStamp - lastTapDate < 300) {
        const now = new Date();
        const prevMonth = addMonths(now, -1);
        const nextMonth = addMonths(now, 1);
        setMonths([now, nextMonth, prevMonth]);
        if (currentDot) {
          setCurrentDot(0);
        }
      }
    }
    setLastTapDate(event.timeStamp);
  };

  const renderHeader = () => {
    const cols = weeks.map((week) => (
      <View key={week} className={styles.col}>
        {week}
      </View>
    ));
    return <View className={styles.row}>{cols}</View>;
  };

  const renderBody = (date) => {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);

    const startDate = startOfWeek(monthStart, { locale: zhCN });
    const endDate = endOfWeek(monthEnd, { locale: zhCN });

    const rows = [];
    for (let date = startDate; date <= endDate; ) {
      const cols = [];
      for (let i = 0; i < 7; i++) {
        const dayOfMonth = format(date, `d`, { locale: zhCN });
        const sameDay = isSameDay(nowDate, date);
        const isDisabled = date < monthStart || date > monthEnd;
        const classes = clsx(
          styles.col,
          styles.cell,
          sameDay && styles.currentDay,
          isDisabled && styles.disabled
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
    <Swiper
      className={styles.calendar}
      circular={true}
      onAnimationFinish={handleChange}
      current={currentDot}
    >
      {months.map((date) => (
        <SwiperItem key={date}>
          <View className={styles.header}>{renderHeader(date)}</View>
          <View className={styles.body} onTap={onDoubleTap}>
            {renderBody(date)}
            <View className={styles.background}>
              {format(date, "yyyy/MM", { locale: zhCN })}
            </View>
          </View>
        </SwiperItem>
      ))}
    </Swiper>
  );
};

export default Calendar;
