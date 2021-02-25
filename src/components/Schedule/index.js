import clsx from "clsx";
import React, { useState } from "react";
import { View, Text, Swiper, SwiperItem } from "remax/wechat";

import { zhCN } from "date-fns/locale";
import format from "date-fns/format";
import startOfWeek from "date-fns/startOfWeek";
import addDays from "date-fns/addDays";
import addWeeks from "date-fns/addWeeks";
import isSameDay from "date-fns/isSameDay";

import styles from "./index.css";

const Schedule = () => {
  const nowDate = new Date();
  const [currentDot, setCurrentDot] = useState(0);
  const [lastTapDate, setLastTapDate] = useState();
  const [weeks, setWeeks] = useState(() => {
    const prevMonth = addWeeks(nowDate, -1);
    const nextMonth = addWeeks(nowDate, 1);
    return [nowDate, nextMonth, prevMonth];
  });

  const handleChange = (event) => {
    const current = event.detail.current;
    // 向左滑动
    // 0 => 1
    if (currentDot === 0 && current === 1) {
      const temp = [...weeks];
      temp[2] = addWeeks(temp[1], 1);
      setWeeks(temp);
    }

    // 1 => 2
    if (currentDot === 1 && current === 2) {
      const temp = [...weeks];
      temp[0] = addWeeks(temp[2], 1);
      setWeeks(temp);
    }

    // 2 => 0
    if (currentDot === 2 && current === 0) {
      const temp = [...weeks];
      temp[1] = addWeeks(temp[0], 1);
      setWeeks(temp);
    }

    // 向右滑动
    // 0 => 2
    if (currentDot === 0 && current === 2) {
      const temp = [...weeks];
      temp[1] = addWeeks(temp[2], -1);
      setWeeks(temp);
    }

    // 2 => 1
    if (currentDot === 2 && current === 1) {
      const temp = [...weeks];
      temp[0] = addWeeks(temp[1], -1);
      setWeeks(temp);
    }

    // 1 => 0
    if (currentDot === 1 && current === 0) {
      const temp = [...weeks];
      temp[2] = addWeeks(temp[0], -1);
      setWeeks(temp);
    }
    setCurrentDot(current);
  };

  // const onDoubleTap = (event) => {
  //   if (lastTapDate) {
  //     if (event.timeStamp - lastTapDate < 300) {
  //       const now = new Date();
  //       const prevWeek = addWeeks(now, -1);
  //       const nextWeek = addWeeks(now, 1);
  //       if (!isSameDay(weeks[currentDot], now)) {
  //         if (currentDot === 0 && weeks[currentDot] > now) {
  //           setWeeks([nextWeek, prevWeek, now]);
  //           setCurrentDot(2);
  //         }
  //         if (currentDot === 0 && weeks[currentDot] < now) {
  //           setWeeks([prevWeek, now, nextWeek]);
  //           setCurrentDot(1);
  //         }

  //         if (currentDot === 1 && weeks[currentDot] > now) {
  //           setWeeks([now, nextWeek, prevWeek]);
  //           setCurrentDot(0);
  //         }
  //         if (currentDot === 1 && weeks[currentDot] < now) {
  //           setWeeks([nextWeek, prevWeek, now]);
  //           setCurrentDot(2);
  //         }

  //         if (currentDot === 2 && weeks[currentDot] > now) {
  //           setWeeks([prevWeek, now, nextWeek]);
  //           setCurrentDot(1);
  //         }
  //         if (currentDot === 2 && weeks[currentDot] < now) {
  //           setWeeks([now, nextWeek, prevWeek]);
  //           setCurrentDot(0);
  //         }
  //       }
  //     }
  //   }
  //   setLastTapDate(event.timeStamp);
  // };

  const renderHeader = (date) => {
    const weekStart = startOfWeek(date, { locale: zhCN });

    const cols = [];
    for (let i = 0; i < 7; i++) {
      const day = addDays(weekStart, i);
      cols.push(
        <View className={styles.headerCol} key={day}>
          <View className={styles.headerColDay}>
            {format(day, "dd", { locale: zhCN })}
          </View>
          <View>{format(day, "eee", { locale: zhCN })}</View>
        </View>
      );
    }
    const currentMonth = format(weekStart, "M", { locale: zhCN });
    return (
      <View className={styles.row}>
        <View className={clsx(styles.firstCol, styles.monthCol)}>
          <Text className={styles.monthText}>{currentMonth}</Text>月
        </View>
        {cols}
      </View>
    );
  };

  const renderBody = (date) => {
    const weekStart = startOfWeek(date, { locale: zhCN });
    const cols = [];
    for (let i = 0; i < 7; i++) {
      const day = addDays(weekStart, i);
      const cells = [];
      const sameDay = isSameDay(nowDate, day);
      console.log(nowDate, day, sameDay);
      const cellStyles = clsx(styles.cell, sameDay && styles.today);
      for (let j = 8; j <= 23; j++) {
        cells.push(
          <View className={cellStyles} key={`${i}-${j}`}>
            <View className={styles.cellItem}></View>
            <View className={styles.cellItem}></View>
          </View>
        );
      }

      cols.push(
        <View className={styles.col} key={day}>
          {cells}
        </View>
      );
    }

    return (
      <View className={styles.bodyWrapper}>
        <View className={styles.firstCol}>
          <View className={styles.firstColCell}>8:00</View>
          <View className={styles.firstColCell}>9:00</View>
          <View className={styles.firstColCell}>10:00</View>
          <View className={styles.firstColCell}>11:00</View>
          <View className={styles.firstColCell}>12:00</View>
          <View className={styles.firstColCell}>13:00</View>
          <View className={styles.firstColCell}>14:00</View>
          <View className={styles.firstColCell}>15:00</View>
          <View className={styles.firstColCell}>16:00</View>
          <View className={styles.firstColCell}>17:00</View>
          <View className={styles.firstColCell}>18:00</View>
          <View className={styles.firstColCell}>19:00</View>
          <View className={styles.firstColCell}>20:00</View>
          <View className={styles.firstColCell}>21:00</View>
          <View className={styles.firstColCell}>22:00</View>
          <View className={styles.firstColCell}>23:00</View>
        </View>
        {cols}
      </View>
    );
  };
  return (
    <Swiper
      className={styles.schedule}
      circular={true}
      current={currentDot}
      onAnimationFinish={handleChange}
    >
      {weeks.map((week) => (
        <SwiperItem key={week}>
          <View className={styles.scheduleItem}>
            <View className={styles.header}>{renderHeader(week)}</View>
            <View className={styles.body}>{renderBody(week)}</View>
          </View>
        </SwiperItem>
      ))}
    </Swiper>
  );
};

export default Schedule;
