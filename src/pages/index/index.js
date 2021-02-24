import React, { useState } from "react";
import { View } from "remax/wechat";

import addWeeks from "date-fns/addWeeks";
import addMonths from "date-fns/addMonths";

import CalendarHeader from "@/components/CalendarHeader";
import CalendarContent from "@/components/CalendarContent";
import styles from "./index.css";
// https://medium.com/@moodydev/create-a-custom-calendar-in-react-3df1bfd0b728
// https://developers.weixin.qq.com/community/develop/doc/000a2496f38b8065f9e8974f451c00

export default () => {
  const [currentView, setCurrentView] = useState("month");
  const [currentDate, setCurrentDate] = useState(() => new Date());

  const onSwitch = () => {
    if (currentView === "week") {
      setCurrentView("month");
    } else {
      setCurrentView("week");
    }
  };

  const onPrev = () => {
    if (currentView === "week") {
      const date = addWeeks(currentDate, -1);
      setCurrentDate(date);
    } else {
      const date = addMonths(currentDate, -1);
      setCurrentDate(date);
    }
  };

  const onNext = () => {
    if (currentView === "week") {
      const date = addWeeks(currentDate, 1);
      setCurrentDate(date);
    } else {
      const date = addMonths(currentDate, 1);
      setCurrentDate(date);
    }
  };

  return (
    <View className={styles.body}>
      <View className={styles.bars}>
        <View onClick={onPrev}>Prev</View>
        <View onClick={() => setCurrentDate(new Date())}>Today</View>
        <View onClick={onNext}>Next</View>
        <View onClick={onSwitch}>Switch</View>
      </View>

      <View className={styles.calendar}>
        <CalendarHeader currentView={currentView} currentDate={currentDate} />
        <View className={styles.calendarContent}>
          <CalendarContent
            currentView={currentView}
            currentDate={currentDate}
          />
        </View>
      </View>
    </View>
  );
};
