import React from "react";
import { View } from "remax/wechat";

import Calendar from "@/components/Calendar";

import styles from "./index.css";

export default () => {
  return (
    <View className={styles.body}>
      <Calendar />
    </View>
  );
};
