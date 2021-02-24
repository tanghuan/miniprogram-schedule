import React, { useState } from "react";
import { View, Text, Image } from "remax/wechat";
import clsx from "clsx";
import Icon from "remax-iconfont-component";
import { zhCN } from "date-fns/locale";
import format from "date-fns/format";
import addDays from "date-fns/addDays";
import addWeeks from "date-fns/addWeeks";
import addMonths from "date-fns/addMonths";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import compareAsc from "date-fns/compareAsc";
import compareDesc from "date-fns/compareDesc";
import isSameDay from "date-fns/isSameDay";
import getMonth from "date-fns/getMonth";
import styles from "./index.css";

// https://medium.com/@moodydev/create-a-custom-calendar-in-react-3df1bfd0b728

export default () => {
  // currentView day week month
  const [currentView, setCurrentView] = useState("week");
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState();

  const onDateClick = (date) => {
    console.log("onDateClick: ", date);
  };

  const onPrev = () => {
    if (currentView === "week") {
      setCurrentDate(addWeeks(currentDate, -1));
    }
    if (currentView === "month") {
      setCurrentDate(addMonths(currentDate, -1));
    }
  };

  const onNext = () => {
    if (currentView === "week") {
      setCurrentDate(addWeeks(currentDate, 1));
    }
    if (currentView === "month") {
      setCurrentDate(addMonths(currentDate, 1));
    }
  };
  const onToday = () => {
    setCurrentDate(new Date());
  };

  const onSelected = (date) => {
    console.log("onSelected: ", date);
    setSelectedDate(date);
  };

  const renderHeader = () => {
    return (
      <View className={styles.header}>
        <View className={styles.controlBar}>
          <View className={styles.controlBtn} onClick={onPrev}>
            <Icon className={styles.icon} type="icon-arrowleft" />
          </View>
          <View className={styles.controlBtn} onClick={onToday}>
            Today
          </View>
          <View className={styles.controlBtn} onClick={onNext}>
            <Icon className={styles.icon} type="icon-arrowright" />
          </View>
        </View>
        <View className={styles.viewBar}>
          <View
            className={styles.viewBtn}
            onClick={() => setCurrentView("week")}
          >
            Week
          </View>
          <View
            className={styles.viewBtn}
            onClick={() => setCurrentView("month")}
          >
            Month
          </View>
        </View>
      </View>
    );
  };

  const renderDays = () => {
    const dateFormat = "eee";
    const days = [];
    const startDate = startOfWeek(currentDate, {
      locale: zhCN,
    });
    const currentMonth = format(startDate, "M", { locale: zhCN });
    console.log("currentMonth: ", currentMonth);
    for (let i = 0; i < 7; i++) {
      const tempDate = addDays(startDate, i);
      days.push(
        <View className={clsx(styles.col, styles.colCenter)} key={i}>
          {currentView === "week" && (
            <View>{format(tempDate, "dd", { locale: zhCN })}</View>
          )}
          <View>{format(tempDate, "eee", { locale: zhCN })}</View>
        </View>
      );
    }
    return <View className={clsx(styles.days, styles.row)}>{days}</View>;
  };

  const renderCells = () => {
    const cells = [];

    if (currentView === "week") {
      for (let i = 8; i <= 23; i++) {
        cells.push(
          <View key={i} className={styles.time}>
            {i}:00
          </View>
        );
      }
      return <View>{cells}</View>;
    } else {
      const monthStart = startOfMonth(currentDate);
      const monthEnd = endOfMonth(currentDate);
      const startDate = startOfWeek(monthStart, { locale: zhCN });
      const endDate = endOfWeek(monthEnd, { locale: zhCN });

      for (let day = startDate; day <= endDate; ) {
        const dayOfYear = format(day, "DDD", { locale: zhCN });
        const dayOfMonth = format(day, `d`, { locale: zhCN });
        // day < monthStart return 1
        const compareWithStart = compareDesc(day, monthStart);

        // day > monthEnd return 1
        const compareWithEnd = compareAsc(day, monthEnd);

        const isCurrentDay = isSameDay(new Date(), day);
        const isSelected = selectedDate && isSameDay(selectedDate, day);

        const classes = clsx(
          styles.dayItem,
          (compareWithStart > 0 || compareWithEnd > 0) && styles.dayItemDisable,
          isCurrentDay && styles.currentDay,
          isSelected && styles.selectedDay
        );
        const itemDay = day;
        cells.push(
          <View
            key={dayOfYear}
            className={classes}
            onClick={() => onSelected(itemDay)}
          >
            {dayOfMonth}
          </View>
        );

        day = addDays(day, 1);
      }
      return <View className={styles.dayBox}>{cells}</View>;
    }
  };

  return (
    <View className={styles.calendar}>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </View>
  );
};
